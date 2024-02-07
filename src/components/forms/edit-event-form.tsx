"use client";
import * as z from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { EventUpdateSchema } from "@/lib/eventSchemas";
import { AlertModal } from "../modal/alert-modal";
import { Spinner } from "../Spinner";
import { Label } from "../ui/label";
import { DatePicker } from "../date-picker";
import { Textarea } from "../ui/textarea";
import { useAction } from "next-safe-action/hooks";
import { deleteSafeEvent, updateSafeEvent } from "@/app/server/actions/events/eventActions";
import { toast } from "sonner";
import { Skeleton } from "../ui/skeleton";

interface EditEventFormProps {
  eventData: z.infer<typeof EventUpdateSchema>
}

interface ConfirmDeleteEventModalProps {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
  loading: boolean;
  eventId: number
}

const ConfirmDeleteEventModal: React.FC<ConfirmDeleteEventModalProps> = ({ isOpen, setOpen, loading, eventId }) => {
  const router = useRouter();

  const { execute, result, status } = useAction(deleteSafeEvent, {
    onSuccess(data) {
      console.log('data')
      console.log(data)
      toast.success('Evento deletado com sucesso com sucesso!');
      router.replace('/admin')
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
      {
        status == 'executing' ? (
          <Skeleton>
            <AlertModal
              isOpen={isOpen}
              onClose={() => setOpen(false)}
              onConfirm={execute}
              loading={loading}
              id={Number(eventId)}
            />
          </Skeleton>
        ) : (
          <AlertModal
            isOpen={isOpen}
            onClose={() => setOpen(false)}
            onConfirm={execute}
            loading={loading}
            id={Number(eventId)}
          />
        )
      }

    </>
  )
}

export const EditEventForm: React.FC<EditEventFormProps> = ({
  eventData
}) => {
  const params = useParams();
  const eventId = params?.eventId as unknown as number;
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!eventId || !eventData?.id) {
    toast.error('Evento não encontrado!')
    router.replace('/admin')
  }

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof EventUpdateSchema>>({
    resolver: zodResolver(EventUpdateSchema),
    defaultValues: {
      ...eventData,
      eventDate: new Date(eventData?.eventDate),
    }
  })

  const { execute, result, status } = useAction(updateSafeEvent, {
    onSuccess(data) {
      console.log('data')
      console.log(data)
      toast.success('Evento atualizado com sucesso!')
    },
    onExecute(data) {
    },
    onError(error) {
      console.log('error')
      console.log(error)
      toast.error('Erro ao atualizar o evento', {
        description: 'Tente novamente, se o erro persistir, entre em contato com seu líder.'
      })
    }
  });


  const onSubmit = async (formData: z.infer<typeof EventUpdateSchema>) => {
    execute(formData)
  };

  return (
    <>
      <ConfirmDeleteEventModal
        isOpen={open}
        setOpen={() => setOpen(false)}
        loading={loading}
        eventId={eventId}
      />
      <div className="flex items-center justify-between">
        <Heading title={'Editar Evento'} description={'Mude as informações do evento'} />
        <Button
          disabled={loading}
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
            <Label htmlFor='eventName'>
              Nome do Evento
            </Label>
            <Input
              id='eventName' className='col-span-3' placeholder='Digite seu nome completo' {...register("eventName")}
            />
            {errors.eventName && (
              <div className="text-red-500">
                <p >{errors.eventName.message}</p>
              </div>
            )}
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <Label htmlFor='eventLocation'>
              Localização
            </Label>
            <Input
              id='eventLocation' className='col-span-3' placeholder='Digite seu email' {...register("eventLocation")}
            />
            {errors.eventLocation && (
              <div className="text-red-500">
                <p >{errors.eventLocation.message}</p>
              </div>
            )}
          </div>
        </div>

        <div className='flex flex-wrap -mx-3 mb-6 p-3'>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <Label htmlFor='eventDuration'>
              Duração do evento
            </Label>
            <Input
              id='eventDuration' className='col-span-3' placeholder='Digite seu número de celular/WhatsApp' {...register("eventDuration")}
            />
            {errors.eventDuration && (
              <div className="text-red-500">
                <p >{errors.eventDuration.message}</p>
              </div>
            )}
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <Label htmlFor='eventDate'>
              Dia do Evento
            </Label>
            <Controller
              name='eventDate'
              control={control}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  onChange={(date: any) => field.onChange(date)}
                  selected={field.value}
                />
              )}
            />
            {errors.eventDate && (
              <div className="text-red-500">
                <p >{errors.eventDate.message}</p>
              </div>
            )}
          </div>
        </div>

        <div className='flex flex-wrap -mx-3 mb-6 p-3'>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <Label htmlFor='eventType'>
              Tipo do Evento
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
            {errors.eventType && (
              <div className="text-red-500">
                <p >{errors.eventType.message}</p>
              </div>
            )}
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <Label htmlFor='eventStatus'>
              Status do Evento
            </Label>
            <Controller
              control={control}
              name="eventStatus"
              rules={{ required: 'Selecione o status do evento' }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger id='eventStatus' className="col-span-3">{field.value || "Selecione o status"}</SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Planejado">Planejado</SelectItem>
                    <SelectItem value="Finalizado">Finalizado</SelectItem>
                    <SelectItem value="Em andamento">Em andamento</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.eventStatus && (
              <div className="text-red-500">
                <p >{errors.eventStatus.message}</p>
              </div>
            )}
          </div>
        </div>

        <div className='flex flex-wrap -mx-3 mb-6 p-3'>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <Label htmlFor='eventNotes'>
              Detalhes do evento
            </Label>
            <Textarea id='eventNotes' className='col-span-3' placeholder='Detalhes extras sobre o evento' {...register('eventNotes')} />
            {errors.eventNotes && (
              <div className="text-red-500">
                <p >{errors.eventNotes.message}</p>
              </div>
            )}
          </div>
        </div>


        <div className='flex flex-wrap -mx-3 mb-6 p-3'>

          <Button className="ml-auto" type="submit" disabled={status === 'executing'}>
            {status === 'executing' ? <Spinner /> : 'Atualizar evento'}
          </Button>
        </div>
      </form>
    </>
  );
};
