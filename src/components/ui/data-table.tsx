"use client";

import {
  ColumnDef,
  ColumnResizeDirection,
  ColumnResizeMode,
  RowSelectionState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "./input";
import { Button } from "./button";
import { ScrollArea, ScrollBar } from "./scroll-area";
import { useState } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey: string;
  searchName: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  searchName
}: DataTableProps<TData, TValue>) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    'id': false,
  })
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

  const [columnResizeMode, setColumnResizeMode] =
    useState<ColumnResizeMode>('onChange');

  const [columnResizeDirection, setColumnResizeDirection] =
    useState<ColumnResizeDirection>('ltr')

  const table = useReactTable({
    data,
    columns,
    columnResizeMode,
    columnResizeDirection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      columnVisibility,
      rowSelection
    },
  });

  /* this can be used to get the selectedrows 
  console.log("value", table.getFilteredSelectedRowModel()); */

  return (
    <>
      <Input
        placeholder={`Pesquisar ${searchName}...`}
        value={(table.getColumn(searchKey)?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table.getColumn(searchKey)?.setFilterValue(event.target.value)
        }
        className="w-full md:max-w-sm"
      />
      <ScrollArea className="rounded-md border h-[calc(80vh-220px)]">
        <Table
        // {...{
        //   style: {
        //     width: table.getCenterTotalSize(),
        //   },
        // }}
        >
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      {...{
                        colSpan: header.colSpan,
                        style: {
                          width: header.getSize() + 100,
                        },
                      }
                      }
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                      <div
                        {...{
                          onDoubleClick: () => header.column.resetSize(),
                          onMouseDown: header.getResizeHandler(),
                          onTouchStart: header.getResizeHandler(),
                          className: `resizer ${table.options.columnResizeDirection
                            } ${header.column.getIsResizing() ? 'isResizing' : ''
                            }`,
                          style: {
                            transform:
                              columnResizeMode === 'onEnd' &&
                                header.column.getIsResizing()
                                ? `translateX(${(table.options.columnResizeDirection ===
                                  'rtl'
                                  ? -1
                                  : 1) *
                                (table.getState().columnSizingInfo
                                  .deltaOffset ?? 0)
                                }px)`
                                : '',
                          },
                        }}
                      />
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
                    <TableCell
                      key={cell.id}
                      {...{
                        style: {
                          width: cell.column.getSize(),
                        },
                      }}
                    >
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
      </ScrollArea>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} de{" "}
          {table.getFilteredRowModel().rows.length} linha(s) selecionadas.
        </div>
        {/* <div className="space-x-2">
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
        </div> */}
      </div>
    </>
  );
}
