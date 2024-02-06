"use client";
import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { Event } from "@/constants/data";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";

export const columns: ColumnDef<Event>[] = [
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
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
    cell: (({ cell: { getValue } }) => {
      const value = getValue() as Date;
      return format(value, 'dd/MM/yyyy')
    })
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
    accessorKey: "isParticipating",
    header: "Participando",
    cell: (({ cell: { getValue } }) => {
      const value = getValue();
      return value ? 'Sim' : 'Não'
    })
  },
  {
    accessorKey: "eventDetails",
    header: "Detalhes",
  },

];
