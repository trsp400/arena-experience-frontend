import * as z from 'zod';

export const EventCreateSchema = z.object({
  eventName: z.string().min(2, {
    message: 'Digite o nome do Evento'
  }),
  eventDate: z.date(),
  eventLocation: z.string().min(2, {
    message: 'Digite a localização do Evento'
  }),
  eventStatus: z.string({ required_error: "Selecione o Status inicial do Evento" }),
  eventDuration: z.string().min(2, {
    message: 'Digite a duração do Evento'
  }),
  eventType: z.string({ required_error: "Selection o tipo do Evento" }),
  eventNotes: z.string().optional(),
  eventImage: z.string().optional()
})

export const EventSchema = z.object({
  id: z.number(),
  eventName: z.string(),
  eventDate: z.date(),
  eventLocation: z.string(),
  eventStatus: z.string(),
  eventDuration: z.string(),
  eventType: z.string(),
  eventNotes: z.string(),
  eventImage: z.string().optional(),
  eventParticipants: z.number(),
})
