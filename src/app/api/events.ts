import config from '@/utils/config';
import { TEvent, TEventCreate } from '@/utils/types/events';
import { nextAuthOptions } from '@/utils/nextAuthOptions';
import { getSession } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';

const BACKEND_URL = config.BACKEND_URL

export async function createEvent(formData: TEventCreate): Promise<TEvent> {
  const session = await getSession();
  try {
    const response = await fetch(`${BACKEND_URL}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session?.token}`
      },
      body: JSON.stringify(formData)
    });

    console.log(response)

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error
  }
}

export async function listEvents() {
  const session = await getServerSession(nextAuthOptions);
  try {
    const response = await fetch(`${BACKEND_URL}/events`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session?.token}`
      },
    });

    revalidatePath('/')

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error
  }
}

