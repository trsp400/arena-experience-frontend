"use client";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Event } from "@/constants/data";
import { Checkbox } from "@/components/ui/checkbox";

export const columns: ColumnDef<Event>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Selecionar todos"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Selecionar linha"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: 'ID',
    enableHiding: true,

  },
  {
    accessorKey: "eventName",
    header: "Nome",
  },
  {
    accessorKey: "eventDate",
    header: "Data",
  },
  {
    accessorKey: "eventLocation",
    header: "Local",
  },
  {
    accessorKey: "eventStatus",
    header: "Status",
  },
  {
    accessorKey: "eventType",
    header: "Tipo",
  },
  {
    accessorKey: "eventParticipants",
    header: "Total de Participantes",
  },
  {
    accessorKey: "eventDetails",
    header: "Detalhes",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
