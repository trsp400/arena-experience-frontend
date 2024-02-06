'use client';

import Link from 'next/link';
import { useForm, SubmitHandler, UseControllerProps, useController } from "react-hook-form"
import { TLogin } from "@/utils/types/auth";
import { Spinner } from '@/components/Spinner';
import { getSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { toast } from 'sonner';


export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TLogin>()

  const router = useRouter()

  const onSubmit: SubmitHandler<TLogin> = async (data) => {

    const result = await signIn('credentials', {
      ...data,
      redirect: false
    })

    if (result?.error) {
      return;
    }

    toast.success('Logado com sucesso!')

    router.replace('/')
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
        <div className="flex justify-center">
          <Image src={'/sara-logo.png'} alt="Sara Nossa Terra - Logo" width={84} height={84} />
        </div>
        <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              id="email"
              placeholder='Digite seu email'
              type="email"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              {...register("email", { required: "Digite seu email" })}
            />
            {errors.email && (
              <div className="text-red-500">
                <p >{errors.email.message}</p>
              </div>
            )}
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Senha
            </label>
            <input
              id="password"
              placeholder='Digite sua senha'
              type="password"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              {...register("password", { required: 'Digite sua senha' })}
            />
            {errors.password && (
              <div className="text-red-500">
                <p >{errors.password.message}</p>
              </div>
            )}
          </div>
          <Link
            href="/forget"
            className="text-xs text-blue-600 hover:underline"
          >
            Esqueceu a senha?
          </Link>
          <div className="mt-2">
            <button disabled={isSubmitting} type='submit' className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
              {isSubmitting ? <Spinner /> : 'Login'}
            </button>
          </div>
        </form>
        <p className="mt-4 text-sm text-center text-gray-700">
          Ainda não tem uma conta?{" "}
          <Link
            href="/register"
            className="font-medium text-blue-600 hover:underline"
          >
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
}
