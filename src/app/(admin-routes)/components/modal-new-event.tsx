'use client'
import * as z from 'zod'
import { Controller, useForm } from 'react-hook-form';

import { Dialog, DialogTrigger, DialogContent, DialogClose, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Select, SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { DatePicker } from './date-picker';
import { TEventCreate } from '@/utils/types/events';
import { useAction } from 'next-safe-action/hooks';
import { createSafeEvent } from '@/app/server/actions/events/eventActions';
import { zodResolver } from '@hookform/resolvers/zod'
import { EventCreate } from '@/app/lib/eventSchemas';
import { Spinner } from '@/components/Spinner';
import { useState } from 'react';

export function ModalNewEvent() {

  const [modalOpen, setModalOpen] = useState(false)

  const { execute, result, status } = useAction(createSafeEvent, {
    onSuccess(data) {
      setModalOpen(false)
    },
    onExecute(data) {
    },
    onError(error) {
      console.log(error)
    }
  });

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof EventCreate>>({
    resolver: zodResolver(EventCreate)
  })

  const onSubmit = async (formData: z.infer<typeof EventCreate>) => {
    execute(formData)
  };

  return (
    <>
      <Dialog open={modalOpen} >
        <DialogTrigger>
          <Button onClick={() => setModalOpen(true)} >
            <PlusIcon size={20} />
            Novo Evento
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Novo Evento</DialogTitle>
            <DialogDescription>Criar um novo evento</DialogDescription>
          </DialogHeader>


          <form onSubmit={handleSubmit(onSubmit)} className='space-y-6' >
            <div className='flex flex-1 flex-col'>
              <div className='grid grid-cols-4 items-center'>
                <Label htmlFor='eventName'>
                  Nome
                </Label>
                <Input id='eventName' className='col-span-3' placeholder='Digite o nome do evento' {...register("eventName", { required: "Digite o nome do evento" })} />
              </div>
              {errors.eventName && (
                <div className="text-red-700">
                  <p >{errors.eventName.message}</p>
                </div>
              )}
            </div>

            <div className='flex flex-1 flex-col'>
              <div className='grid grid-cols-4 items-center'>
                <Label>
                  Data
                </Label>
                <Controller
                  name="eventDate"
                  control={control}
                  rules={{ required: 'Selecione uma data para o evento' }}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      onChange={(date: any) => field.onChange(date)}
                      selected={field.value}
                    />
                  )}
                />
              </div>
            </div>

            <div className='flex flex-1 flex-col'>

              <div className='grid grid-cols-4 items-center'>
                <Label htmlFor='eventDuration'>
                  Duração
                </Label>
                <Input id='eventDuration' className='col-span-3' placeholder='Digite a duração do evento' {...register("eventDuration", { required: "Digite a duração do evento" })} />

              </div>
              {errors.eventDuration && (
                <div className="text-red-700">
                  <p >{errors.eventDuration.message}</p>
                </div>
              )}
            </div>

            <div className='flex flex-1 flex-col'>
              <div className='grid grid-cols-4 items-center'>
                <Label htmlFor='eventLocation'>
                  Local
                </Label>
                <Input id='eventLocation' className='col-span-3' placeholder='Digite o local do evento' {...register('eventLocation', { required: "Digite o local do Evento" })} />
              </div>
              {errors.eventLocation && (
                <div className="text-red-700">
                  <p >{errors.eventLocation.message}</p>
                </div>
              )}
            </div>

            <div className='flex flex-1 flex-col'>
              <div className='grid grid-cols-4 items-center'>
                <Label htmlFor='eventType'>
                  Tipo
                </Label>
                <Controller
                  control={control}
                  name="eventType"
                  rules={{ required: 'Selecione o tipo do evento' }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger id='eventType' className="col-span-3">{field.value || "Selecione o tipo"}</SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Palavra">Palavra</SelectItem>
                        <SelectItem value="Pausa">Pausa</SelectItem>
                        <SelectItem value="Louvor">Louvor</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />

              </div>
              {errors.eventType && (
                <div className="text-red-700">
                  <p >{errors.eventType.message}</p>
                </div>
              )}
            </div>

            <div className='flex flex-1 flex-col'>
              <div className='grid grid-cols-4 items-center'>
                <Label htmlFor='eventStatus'>
                  Status
                </Label>
                <Controller
                  control={control}
                  name="eventStatus"
                  rules={{ required: 'Selecione o status do evento' }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger id='eventStatus' className="col-span-3">{field.value || "Selecione o status"}</SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Plenejado">Plenejado</SelectItem>
                        <SelectItem value="Finalizado">Finalizado</SelectItem>
                        <SelectItem value="Em andamento">Em andamento</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />

              </div>
              {errors.eventStatus && (
                <div className="text-red-700">
                  <p >{errors.eventStatus.message}</p>
                </div>
              )}
            </div>
            <div className='grid grid-cols-4 items-center'>
              <Label htmlFor='eventDetails'>
                Detalhes
              </Label>
              <Textarea id='eventNotes' className='col-span-3' placeholder='Detalhes extras sobre o evento' {...register('eventNotes')} />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type='button' variant={'outline'} disabled={status === 'executing'} onClick={() => setModalOpen(false)}>Cancelar</Button>
              </DialogClose>
              <Button type='submit' disabled={status === 'executing'} >
                {
                  status === 'executing' ? <Spinner /> : 'Salvar'
                }
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}