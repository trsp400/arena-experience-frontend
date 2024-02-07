'use server'
import config from '@/utils/config';
import { getServerSession } from 'next-auth';
import { nextAuthOptions } from '@/utils/nextAuthOptions';
import { revalidatePath } from 'next/cache';
import { redirect } from "next/navigation";
import { action } from '../safe-action';
import { EventCreateSchema, EventDeleteSchema, EventUpdateSchema } from '@/lib/eventSchemas';
const BACKEND_URL = config.BACKEND_URL

export const createSafeEvent = action(EventCreateSchema, async (formData) => {
  const session = await getServerSession(nextAuthOptions);
  try {
    const response = await fetch(`${BACKEND_URL}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session?.token}`
      },
      body: JSON.stringify(formData)
    });

    revalidatePath('/admin')

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error
  }
})

export const updateSafeEvent = action(EventUpdateSchema, async (formData) => {
  const session = await getServerSession(nextAuthOptions);

  const eventId = formData.id;
  const DTO = {
    eventName: formData?.eventName,
    eventDate: formData?.eventDate,
    eventLocation: formData?.eventLocation,
    eventDuration: formData?.eventDuration,
    eventType: formData?.eventType,
    eventNotes: formData?.eventNotes,
    eventStatus: formData?.eventStatus,
  }

  try {
    const response = await fetch(`${BACKEND_URL}/events/${eventId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session?.token}`
      },
      body: JSON.stringify(DTO)
    });

    revalidatePath('/admin/events')

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error
  }
})

export const deleteSafeEvent = action(EventDeleteSchema, async ({ id }) => {
  const session = await getServerSession(nextAuthOptions);

  try {
    const response = await fetch(`${BACKEND_URL}/events/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${session?.token}`
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    revalidatePath('/admin')

  } catch (error) {
    throw error
  }
})

export const listEvents = async () => {
  const session = await getServerSession(nextAuthOptions);
  try {
    const response = await fetch(`${BACKEND_URL}/events`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session?.token}`
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error
  }
}

export const getEventByID = async (id: number) => {
  const session = await getServerSession(nextAuthOptions);

  try {
    const response = await fetch(`${BACKEND_URL}/events/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${session?.token}`
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error
  }
}

