import * as z from 'zod';

export const UserRegisterSchema = z.object({
  email: z.string().min(2, {
    message: 'Digite seu email'
  }),
  church: z.string({ required_error: 'Selecione a Unidade' }).min(3, {
    message: 'Selecione a Unidade'
  }),
  birthdate: z.date({ required_error: 'Digite sua data de nascimento' }),
  phoneNumber: z.string().min(2, {
    message: 'Digite seu número de celular'
  }),
  fullName: z.string().min(2, {
    message: 'Digite seu Nome'
  }),
  password: z.string({ required_error: 'A senha precisa ter pelo menos 3 caracteres' }).min(3, {
    message: 'A senha precisa ter pelo menos 3 caracteres'
  })
})

export const CreateUserSchema = z.object({
  email: z.string().min(2, {
    message: 'Digite o email'
  }),
  church: z.string({ required_error: 'Selecione a Unidade' }).min(3, {
    message: 'Selecione a Unidade'
  }),
  birthdate: z.date({ required_error: 'Digite sua data de nascimento' }),
  phoneNumber: z.string().min(2, {
    message: 'Digite o número de celular'
  }),
  fullName: z.string().min(2, {
    message: 'Digite o Nome'
  }),
  password: z.string({ required_error: 'A senha precisa ter pelo menos 3 caracteres' }).min(3, {
    message: 'A senha precisa ter pelo menos 3 caracteres'
  })
})

export const UpdateUserSchema = z.object({
  id: z.number().optional(),
  fullName: z.string().min(3, { message: 'Seu nome precisa ter pelo menos 3 caracteres' }),
  email: z.string().email({ message: 'Digite um email válido' }).min(3, { message: 'Digite um email válido' }),
  church: z.string({ required_error: 'Selecione a Unidade' }).min(3, {
    message: 'Selecione a Unidade'
  }).optional(),
  phoneNumber: z.string().min(3, { message: 'Digite um número de celular válido' }),
  birthdate: z.date().optional(),
  password: z.string().optional()
})

export const UserSchema = z.object({
  fullName: z.string().min(3, { message: 'Seu nome precisa ter pelo menos 3 caracteres' }),
  email: z.string().email({ message: 'Digite um email válido' }).min(3, { message: 'Digite um email válido' }),
  phoneNumber: z.string().min(3, { message: 'Digite um número de celular válido' }),
  birthdate: z.date().optional(),
  password: z.string().optional()
})

export const ToggleParticipationSchema = z.object({
  eventId: z.number()
})

export const UserID = z.object({
  id: z.number()
})