"use client";
import { toast } from 'sonner';
import * as z from 'zod'
import { useAction } from 'next-safe-action/hooks';
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { CreateUserSchema } from "@/lib/userSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from '@/components/ui/label';
import { DatePicker } from '@/components/date-picker';
import { createSafeUser } from '@/app/server/actions/users/usersActions';
import { Spinner } from '@/components/Spinner';
import {
  Select, SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import { useParams, useRouter } from 'next/navigation';

export const NewUserForm: React.FC = () => {
  const router = useRouter()
  const params = useParams()

  const title = 'Novo Usuário'
  const description = "Crie um novo usuário";

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof CreateUserSchema>>({
    resolver: zodResolver(CreateUserSchema),
  })

  const { execute, result, status } = useAction(createSafeUser, {
    onSuccess(data) {
      console.log('data')
      console.log(data)
      toast.success('Criado com sucesso!')
      router.replace('/admin/users')
    },
    onExecute(data) {
    },
    onError(error) {
      console.log('error')
      console.log(error)
      toast.error('Erro ao criar usuário', {
        description: 'Tente novamente, se o erro persistir, entre em contato com seu líder.'
      })
    }
  });

  const onSubmit: SubmitHandler<z.infer<typeof CreateUserSchema>> = (data) => {
    const createSchema = {
      fullName: data?.fullName,
      church: data?.church,
      birthdate: data?.birthdate,
      email: data?.email,
      phoneNumber: data?.phoneNumber,
      password: data?.password
    }
    console.log(createSchema)
    execute(createSchema)
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
      </div>
      <Separator />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 w-full">
        <div className='flex flex-wrap -mx-3 mb-6 p-3'>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <Label htmlFor='fullName'>
              Nome Completo
            </Label>
            <Input
              id='fullName' className='col-span-3' placeholder='Digite o nome completo' {...register("fullName")}
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
              id='email' className='col-span-3' placeholder='Digite o email' {...register("email")}
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
              id='phoneNumber' className='col-span-3' placeholder='Digite o número de celular/WhatsApp' {...register("phoneNumber")}
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
              Senha
            </Label>
            <Input
              id='password' type='password' className='col-span-3' placeholder='Crie uma senha' {...register("password")}
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
            {status === 'executing' ? <Spinner /> : 'Criar Usuário'}
          </Button>
        </div>
      </form>
    </>
  );
};
