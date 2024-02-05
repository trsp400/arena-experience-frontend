import * as z from 'zod';

export const EventCreate = z.object({
  eventName: z.string(),
  eventDate: z.date(),
  eventLocation: z.string(),
  eventStatus: z.string(),
  eventDuration: z.string(),
  eventType: z.string(),
  eventNotes: z.string().optional(),
  eventImage: z.string().optional()
})

export const Event = z.object({
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
