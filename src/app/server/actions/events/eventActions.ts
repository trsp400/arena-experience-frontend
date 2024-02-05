'use server'
import config from '@/utils/config';
import { getServerSession } from 'next-auth';
import { getSession } from 'next-auth/react'
import { nextAuthOptions } from '../../../api/auth/[...nextauth]/route';
import { revalidatePath } from 'next/cache';
import { action } from '../safe-action';
import { EventCreate } from '@/app/lib/eventSchemas';
const BACKEND_URL = config.BACKEND_URL

export const createSafeEvent = action(EventCreate, async (formData) => {
  const session = await getServerSession(nextAuthOptions);
  console.log(session)
  try {
    const response = await fetch(`${BACKEND_URL}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session?.token}`
      },
      body: JSON.stringify(formData)
    });

    console.log("´=================================")
    console.log("´=================================")
    console.log("´=================================")
    console.log("´=================================")
    console.log("´=================================")
    console.log(response)
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

// export default async function createEvent(formData: FormData) {
//   const session = await getServerSession(nextAuthOptions);
//   console.log(session)
//   try {
//     const response = await fetch(`${BACKEND_URL}/events`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${session?.token}`
//       },
//       body: JSON.stringify(formData)
//     });

//     console.log(response)
//     revalidatePath('/admin')

//     if (!response.ok) {
//       throw new Error(`Error: ${response.status}`);
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     throw error
//   }

// }