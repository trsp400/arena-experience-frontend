export type TEvent = {
  id: number;
  eventName: string;
  eventDate: Date;
  eventLocation: string;
  eventStatus: string;
  eventDuration: string;
  eventParticipants: number;
  eventType: string;
  eventNotes: string | null;
  eventImage: string;
}

export type TEventCreate = {
  eventName: string;
  eventDate: Date;
  eventLocation: string;
  eventDuration: string;
  eventStatus: string;
  eventType: string;
  eventNotes?: string | null;
  eventImage?: string;
}

export type TEventUpdate = {
  eventName: string;
  eventDate: Date;
  eventLocation: string;
  eventDuration: string;
  eventStatus: string;
  eventType: string;
  eventNotes?: string | null;
}
