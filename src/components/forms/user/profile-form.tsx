"use client";
import { toast } from 'sonner';
import * as z from 'zod'
import { useAction } from 'next-safe-action/hooks';
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useSession } from 'next-auth/react';

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { UpdateUserSchema } from "@/lib/userSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from '@/components/ui/label';
import { DatePicker } from '@/components/date-picker';
import { deleteSafeUser, updateProfile } from '@/app/server/actions/users/usersActions';
import { Spinner } from '@/components/Spinner';
import {
  Select, SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import { useParams, useRouter } from 'next/navigation';
import { Trash } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertModal } from '@/components/modal/alert-modal';
import { useState } from 'react';

interface ProfileFormProps {
  profile: z.infer<typeof UpdateUserSchema>
}

interface ConfirmDeleteUserModalProps {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
  loading: boolean;
  userId: number
}

const ConfirmDeleteUsertModal: React.FC<ConfirmDeleteUserModalProps> = ({ isOpen, setOpen, loading, userId }) => {
  const router = useRouter();

  const { execute, result, status } = useAction(deleteSafeUser, {
    onSuccess(data) {
      console.log('data')
      console.log(data)
      toast.success('usuário deletado com sucesso com sucesso!');
      router.replace('/admin/users')
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
      {
        status == 'executing' ? (
          <Skeleton>
            <AlertModal
              isOpen={isOpen}
              onClose={() => setOpen(false)}
              onConfirm={execute}
              loading={loading}
              id={Number(userId)}
            />
          </Skeleton>
        ) : (
          <AlertModal
            isOpen={isOpen}
            onClose={() => setOpen(false)}
            onConfirm={execute}
            loading={loading}
            id={Number(userId)}
          />
        )
      }

    </>
  )
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ profile }) => {
  const router = useRouter()
  const params = useParams()
  const userId = params?.userId;

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);


  if (!userId || !profile?.id) {
    toast.error('Não foi possível encontrar este usuário');
    router.replace('/admin/users')
  }

  const { update } = useSession()

  const title = 'Perfil'
  const description = "Edite suas informações";

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof UpdateUserSchema>>({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      ...profile,
      birthdate: new Date(profile?.birthdate || '')
    }
  })

  const { execute, result, status } = useAction(updateProfile, {
    onSuccess(data) {
      console.log('data')
      console.log(data?.data)
      update({ fullName: data?.data?.fullName });
      toast.success('Atualizado com sucesso!')
    },
    onExecute(data) {
    },
    onError(error) {
      console.log('error')
      console.log(error)
      toast.error('Erro ao atualizar seu perfil', {
        description: 'Tente novamente, se o erro persistir, entre em contato com seu líder.'
      })
    }
  });

  const onSubmit: SubmitHandler<z.infer<typeof UpdateUserSchema>> = (data) => {
    const updateData = data?.password?.length ? {
      ...data
    } : {
      fullName: data?.fullName,
      church: data?.church,
      birthdate: data?.birthdate,
      email: data?.email,
      phoneNumber: data?.phoneNumber
    }
    execute(updateData)
  };

  return (
    <>
      <ConfirmDeleteUsertModal
        isOpen={open}
        setOpen={() => setOpen(false)}
        loading={loading}
        userId={Number(userId)}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        <Button
          variant="destructive"
          size="sm"
          onClick={() => setOpen(true)}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
      <Separator />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 w-full">
        <div className='flex flex-wrap -mx-3 mb-6 p-3'>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <Label htmlFor='fullName'>
              Nome Completo
            </Label>
            <Input
              id='fullName' className='col-span-3' placeholder='Digite seu nome completo' {...register("fullName")}
            />
            {errors.fullName && (
              <div className="text-red-500">
                <p >{errors.fullName.message}</p>
              </div>
            )}
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <Label htmlFor='email'>
              Email
            </Label>
            <Input
              id='email' className='col-span-3' placeholder='Digite seu email' {...register("email")}
            />
            {errors.email && (
              <div className="text-red-500">
                <p >{errors.email.message}</p>
              </div>
            )}
          </div>
        </div>

        <div className='flex flex-wrap -mx-3 mb-6 p-3'>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <Label htmlFor='phoneNumberl'>
              Celular/WhatsApp
            </Label>
            <Input
              id='phoneNumber' className='col-span-3' placeholder='Digite seu número de celular/WhatsApp' {...register("phoneNumber")}
            />
            {errors.phoneNumber && (
              <div className="text-red-500">
                <p >{errors.phoneNumber.message}</p>
              </div>
            )}
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <Label htmlFor='birthdate'>
              Data de Nascimento
            </Label>
            <Controller
              name='birthdate'
              control={control}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  onChange={(date: any) => field.onChange(date)}
                  selected={field.value}
                />
              )}
            />
            {errors.birthdate && (
              <div className="text-red-500">
                <p >{errors.birthdate.message}</p>
              </div>
            )}
          </div>
        </div>

        <div className='flex flex-wrap -mx-3 mb-6 p-3'>
          <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0 items-center'>
            <Label htmlFor='eventType'>
              Unidade
            </Label>
            <Controller
              control={control}
              name="church"
              rules={{ required: 'Selecione o tipo do evento' }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger id='eventType' className="col-span-3">{field.value || "Selecione a igreja"}</SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Sara Barra">Sara Barra</SelectItem>
                    <SelectItem value="Sara Freguesia">Sara Freguesia</SelectItem>
                    <SelectItem value="Sara Anil">Sara Anil</SelectItem>
                    <SelectItem value="Sara Cidade de Deus">Sara Cidade de Deus</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />

          </div>
          {errors.church && (
            <div className="text-red-500">
              <p >{errors.church.message}</p>
            </div>
          )}
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <Label htmlFor='password'>
              Nova Senha
            </Label>
            <Input
              id='password' type='password' className='col-span-3' placeholder='Crie uma nova senha' {...register("password")}
            />
            {errors.password && (
              <div className="text-red-500">
                <p >{errors.password.message}</p>
              </div>
            )}
          </div>
        </div>

        <div className='flex flex-wrap -mx-3 mb-6 p-3'>

          <Button className="ml-auto" type="submit" disabled={status === 'executing'}>
            {status === 'executing' ? <Spinner /> : 'Atualizar perfil'}
          </Button>
        </div>
      </form>
    </>
  );
};
