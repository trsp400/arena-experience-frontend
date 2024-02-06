"use client";
import * as z from 'zod'
import { Button } from "@/components/ui/button";

import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { UpdateUserSchema } from "@/lib/userSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Label } from '@/components/ui/label';
import { DatePicker } from '@/components/date-picker';
import { getSession } from 'next-auth/react';
import { Session } from 'next-auth';
import { useAction } from 'next-safe-action/hooks';
import { updateProfile } from '@/app/server/actions/users/usersActions';
import { Spinner } from '@/components/Spinner';

interface ProfileFormProps {
  profile: z.infer<typeof UpdateUserSchema>
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ profile }) => {

  const title = 'Perfil'
  const description = "Edite suas informações";

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof UpdateUserSchema>>({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: profile
  })

  const { execute, result, status } = useAction(updateProfile, {
    onSuccess(data) {
      console.log('data')
      console.log(data)
    },
    onExecute(data) {
    },
    onError(error) {
      console.log('error')
      console.log(error)
    }
  });

  const onSubmit: SubmitHandler<z.infer<typeof UpdateUserSchema>> = (data) => {
    const updateData = data?.password?.length ? {
      ...data
    } : {
      fullName: data?.fullName,
      birthdate: data?.birthdate,
      email: data?.email,
      phoneNumber: data?.phoneNumber
    }
    execute(updateData)
  };

  console.log(errors)

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {/* <Button
          variant="destructive"
          size="sm"
        >
          <Trash className="h-4 w-4" />
        </Button> */}
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
