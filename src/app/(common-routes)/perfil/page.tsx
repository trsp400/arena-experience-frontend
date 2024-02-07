import BreadCrumb from "@/components/breadcrumb";
import { ProfileForm } from "@/components/forms/user-profile/profile-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { nextAuthOptions } from "@/utils/nextAuthOptions";
import { Session, getServerSession } from "next-auth";
import config from '@/utils/config';
import { redirect } from 'next/navigation';
const BACKEND_URL = config.BACKEND_URL

const breadcrumbItems = [{ title: "Perfil", link: "/perfil" }];
export default async function ProfilePage() {
  const session = await getServerSession(nextAuthOptions) as Session;
  const userId = session?.user?.id;

  const response = await fetch(`${BACKEND_URL}/users/${userId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${session?.token}`
    },
  });

  if (!response.ok) {
    redirect('/login')
  }

  const profile = await response.json();

  if (!userId || !profile?.id) {
    redirect('/')
  }

  return !response.ok ? (
    <Skeleton>
      <ScrollArea className="h-full">
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
          <BreadCrumb items={breadcrumbItems} />
          <ProfileForm profile={profile} />
        </div>
      </ScrollArea>
    </Skeleton>
  ) : (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <ProfileForm profile={profile} />
      </div>
    </ScrollArea>
  );
}
