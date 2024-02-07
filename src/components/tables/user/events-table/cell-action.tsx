"use client";
import { listEvents } from "@/app/server/actions/events/eventActions";
import { toggleSafeParticipation } from "@/app/server/actions/users/usersActions";
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
import { Check, Edit, MoreHorizontal, Trash, X } from "lucide-react";
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


  const { execute, result, status } = useAction(toggleSafeParticipation, {
    onSuccess(data) {
      console.log('success')

    },
    onExecute(data) {
    },
    onError(error) {
      console.log('error')
      console.log(error)
    }
  });

  const onConfirm = async () => { };

  return (
    <>

      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
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
            onClick={() => {
              execute({ eventId: data?.id })
              if (data?.isParticipating) {
                toast.success('Participação desmarcada com sucesso!');
              } else {
                toast.success('Participação confirmada com sucesso!');
              }
            }}
          >
            {
              data.isParticipating ? (
                <>
                  <X className="mr-2 h-4 w-4" /> Cancelar Participação
                </>

              ) : (
                <>
                  <Check className="mr-2 h-4 w-4" /> Confirmar Participação
                </>
              )
            }

          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
