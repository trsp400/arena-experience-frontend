"use client";

import {
  ColumnDef,
  Row,
  RowSelectionState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "../input";
import { Button } from "../button";
import { ScrollArea, ScrollBar } from "../scroll-area";
import { ReactNode, useState } from "react";
import { Label } from "../label";
import { AlertDialogProps } from "@radix-ui/react-alert-dialog";
import { Event } from "@/constants/data";
import { format } from "date-fns";
import { useAction } from "next-safe-action/hooks";
import { toggleSafeParticipation } from "@/app/server/actions/users/usersActions";
import { toast } from "sonner";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey: string;
  searchName: string;
}

interface ConfirmationModal extends AlertDialogProps {
  children?: ReactNode,
  event: Event
}

const ConfirmationModal = ({ children, event, ...props }: ConfirmationModal) => {

  const { execute, result, status, reset } = useAction(toggleSafeParticipation, {
    onSuccess(data) {
      console.log('success')
      reset();
    },
    onExecute(data) {
      reset();
    },
    onError(error) {
      console.log('error')
      console.log(error)
      toast.error("Algum erro aconteceu", {
        description: 'Tente novamente ou entre em contato com seu lider'
      });
      reset();
    }
  });

  return event?.isParticipating ? (
    <AlertDialog {...props}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Desmarcar Presença</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja desmarcar sua presença no evento {event?.eventName} - {format(event?.eventDate, 'dd/MM/yyyy')}?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Não</AlertDialogCancel>
          <AlertDialogAction onClick={() => {
            execute({ eventId: event.id })
            toast.success('Participação desmarcada com sucesso!');
          }}
          >
            Sim
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ) : (
    <AlertDialog {...props}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirmar Presença</AlertDialogTitle>
          <AlertDialogDescription>
            Você confirma sua presença no evento {event?.eventName} - {format(event?.eventDate, 'dd/MM/yyyy')}?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Não</AlertDialogCancel>
          <AlertDialogAction onClick={() => {
            execute({ eventId: event.id })
            toast.success('Participação confirmada com sucesso!');
          }}
          >
            Sim
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  searchName
}: DataTableProps<TData, TValue>) {

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Event>();

  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    'id': false,
  })

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      columnVisibility,
      rowSelection
    },
  });

  return (
    <>
      {
        selectedRow && <ConfirmationModal open={dialogOpen} onOpenChange={setDialogOpen} event={selectedRow} />
      }
      <Input
        placeholder={`Pesquisar ${searchName}...`}
        value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn(searchKey)?.setFilterValue(event.target.value)
        }
        className="w-full md:max-w-sm"
      />
      <ScrollArea className="rounded-md border h-[calc(80vh-220px)]">
        <Table className="relative">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selecionado(s)"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} onClick={() => {
                      if (cell.column.id !== 'actions') {
                        setDialogOpen(true)
                        setSelectedRow(row.original as Event)
                      }
                    }} >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Sem resultados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea >
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} de{" "}
          {table.getFilteredRowModel().rows.length} linha(s) selecionadas.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Próximo
          </Button>
        </div>
      </div>
    </>
  );
}
