import Link from 'next/link';
import { nextAuthOptions } from '@/utils/nextAuthOptions';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';


export default async function UserDashboard() {
  const session = await getServerSession(nextAuthOptions);

  if (!session) {
    redirect('/login')
  }

  if (session.user?.role == 'admin') redirect('/admin')

  return (
    <>
      <h1>You need to create an account first!</h1>
      <Link href='/login'>Create your account</Link>
    </>
  );
};
