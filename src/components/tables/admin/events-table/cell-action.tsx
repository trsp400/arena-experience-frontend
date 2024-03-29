"use client";
import { deleteSafeEvent } from "@/app/server/actions/events/eventActions";
import { AlertModal } from "@/components/modal/alert-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Event } from "@/constants/data";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface CellActionProps {
  data: Event;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const onConfirm = async () => { };

  const { execute, result, status } = useAction(deleteSafeEvent, {
    onSuccess(data) {
      console.log('data')
      console.log(data)
      toast.success('Evento deletado com sucesso com sucesso!');
    },
    onExecute(data) {
    },
    onError(error) {
      console.log('error')
      console.log(error)
      toast.error('Erro ao deletar o evento', {
        description: 'Tente novamente, se o erro persistir, entre em contato com seu líder.'
      })
    }
  });

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={execute}
        loading={loading}
        id={data?.id}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Abrir Menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Ações</DropdownMenuLabel>

          <DropdownMenuItem
            onClick={() => router.push(`/admin/events/${data?.id}`)}
          >
            <Edit className="mr-2 h-4 w-4" /> Atualizar Evento
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Deletar Evento
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
