"use client";
import { deleteSafeUser } from "@/app/server/actions/users/usersActions";
import { AlertModal } from "@/components/modal/alert-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@/constants/data";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface CellActionProps {
  data: User;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const { execute, result, status } = useAction(deleteSafeUser, {
    onSuccess(data) {
      console.log('data')
      console.log(data)
      toast.success('Usuário deletado com sucesso com sucesso!');
      revalidatePath('/admin/users')
    },
    onExecute(data) {
    },
    onError(error) {
      console.log('error')
      console.log(error)
      toast.error('Erro ao deletar o usuário', {
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
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Ações</DropdownMenuLabel>

          <DropdownMenuItem
            onClick={() => router.push(`/admin/users/${data.id}`)}
          >
            <Edit className="mr-2 h-4 w-4" /> Atualizar Usuário
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" /> Deletar Usuário
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
