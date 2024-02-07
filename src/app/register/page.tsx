'use client'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAction } from 'next-safe-action/hooks';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { UserRegisterSchema } from '../../lib/userSchemas';
import { registerSafeUser } from '../server/actions/users/usersActions';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DatePicker } from '@/components/date-picker';
import { Button } from '@/components/ui/button';
import {
  Select, SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import { toast } from 'sonner';

export default function RegisterPage() {

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof UserRegisterSchema>>({
    resolver: zodResolver(UserRegisterSchema)
  })

  const { execute, result, status } = useAction(registerSafeUser, {
    onSuccess(data) {
      console.log('success')
      console.log(data)
      toast.success('Conta criada com sucesso!', {
        description: 'Agora você já pode fazer login',

      })
      router.replace('/login')
    },
    onExecute(data) {
    },
    onError(error) {
      console.log('error')
      console.log(error)
    }
  });

  const router = useRouter()

  const onSubmit: SubmitHandler<z.infer<typeof UserRegisterSchema>> = async (data) => {
    execute(data)
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      {/* <Toaster richColors position='top-right' /> */}
      <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-bold text-center text-gray-700">Registrar</h1>
        <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <Label htmlFor="fullName" className="block text-sm font-semibold text-gray-800">
              Nome
            </Label>
            <Input
              type="text"
              id='fullName'
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              {...register("fullName")}
            />
            {errors.fullName && (
              <div className="text-red-500">
                <p >{errors.fullName.message}</p>
              </div>
            )}
          </div>
          <div className="mb-4">
            <Label htmlFor="email" className="block text-sm font-semibold text-gray-800">
              Email
            </Label>
            <Input
              type="email"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              {...register("email")}
            />
            {errors.email && (
              <div className="text-red-500">
                <p >{errors.email.message}</p>
              </div>
            )}
          </div>
          <div className='mb-4'>
            <div className='items-center'>
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
          </div>
          <div className="mb-4">
            <Label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-800">
              WhatsApp/Celular
            </Label>
            <Input
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              {...register("phoneNumber")}
            />
            {errors.phoneNumber && (
              <div className="text-red-500">
                <p >{errors.phoneNumber.message}</p>
              </div>
            )}
          </div>
          <div className="mb-4">
            <Label htmlFor="birthdate" className="block text-sm font-semibold text-gray-800">
              Data de Nascimento
            </Label>
            <Controller
              name="birthdate"
              control={control}
              rules={{ required: 'Selecione uma data para o evento' }}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  className="block w-full flex-1 px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
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
          <div className="mb-4">
            <Label htmlFor="password" className="block text-sm font-semibold text-gray-800">
              Escolha uma senha
            </Label>
            <Input
              type="password"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              {...register("password")}
            />
            {errors.password && (
              <div className="text-red-500">
                <p >{errors.password.message}</p>
              </div>
            )}
          </div>
          <div className="mt-4">
            <Button type="submit" className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
              Registrar
            </Button>
          </div>
        </form>
        <p className="mt-4 text-sm text-center text-gray-700">
          Já possui uma conta?{" "}
          <Link href="/login" className="font-medium text-blue-600 hover:underline">
            Faça login
          </Link>
        </p>
      </div>
    </div>
  );
}
