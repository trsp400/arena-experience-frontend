'use server'
import config from '@/utils/config';
import { getServerSession } from 'next-auth';
import { nextAuthOptions } from '@/utils/nextAuthOptions';
import { action } from '../safe-action';
import { ToggleParticipationSchema, UserID, UserRegisterSchema, UpdateUserSchema, CreateUserSchema } from '@/lib/userSchemas';
import { listEvents } from '../events/eventActions';
import { revalidatePath } from 'next/cache';
const BACKEND_URL = config.BACKEND_URL

export const registerSafeUser = action(UserRegisterSchema, async (formData) => {
  const session = await getServerSession(nextAuthOptions);
  try {
    const response = await fetch(`${BACKEND_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session?.token}`
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error
  }
})

export const createSafeUser = action(CreateUserSchema, async (formData) => {
  const session = await getServerSession(nextAuthOptions);

  try {
    const response = await fetch(`${BACKEND_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session?.token}`
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();

    revalidatePath('/admin/users')
    return data;
  } catch (error) {
    throw error
  }
})

export const toggleSafeParticipation = action(ToggleParticipationSchema, async (data) => {
  const session = await getServerSession(nextAuthOptions);
  const eventId = data?.eventId;

  if (!eventId) return;

  try {
    const response = await fetch(`${BACKEND_URL}/events/${eventId}/participate`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${session?.token}`
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    revalidatePath('/')

    const data = await response.json();
    await listEvents();

    return data;
  } catch (error) {
    throw error
  }
})

export const getUserById = action(UserID, async ({ id }) => {
  const session = await getServerSession(nextAuthOptions);

  try {
    const response = await fetch(`${BACKEND_URL}/users/${id}`, {
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
})

export const updateProfile = action(UpdateUserSchema, async (formData) => {
  const session = await getServerSession(nextAuthOptions);
  const userId = session?.user?.id as unknown as number;

  try {
    const response = await fetch(`${BACKEND_URL}/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session?.token}`
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();

    await getUserById({ id: userId as number })

    return data;
  } catch (error) {
    throw error
  }
})

export const updateUser = action(UpdateUserSchema, async (formData) => {
  const session = await getServerSession(nextAuthOptions);
  const userId = formData?.id

  delete formData?.id;
  try {
    const response = await fetch(`${BACKEND_URL}/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session?.token}`
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();

    await getUserById({ id: userId as number })

    return data;
  } catch (error) {
    throw error
  }
})

export const listUsers = async () => {
  const session = await getServerSession(nextAuthOptions);
  try {
    const response = await fetch(`${BACKEND_URL}/users`, {
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

export const deleteSafeUser = action(UserID, async ({ id }) => {
  const session = await getServerSession(nextAuthOptions);

  try {
    const response = await fetch(`${BACKEND_URL}/users/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${session?.token}`
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();

    revalidatePath('/admin/users')

    return data;
  } catch (error) {
    throw error
  }
})