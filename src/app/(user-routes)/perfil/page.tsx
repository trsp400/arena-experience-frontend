import { getUserById } from "@/app/server/actions/users/usersActions";
import BreadCrumb from "@/components/breadcrumb";
import { ProfileForm } from "@/components/forms/user-profile/profile-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { nextAuthOptions } from "@/utils/nextAuthOptions";
import { Session, getServerSession } from "next-auth";
import { useAction } from "next-safe-action/hooks";
import { UserSchema } from '@/lib/userSchemas'

const breadcrumbItems = [{ title: "Perfil", link: "/perfil" }];
export default async function ProfilePage() {
  const session = await getServerSession(nextAuthOptions) as Session;
  const userId = session?.user?.id;

  const profile = await getUserById({ id: userId });

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <ProfileForm profile={profile} />
      </div>
    </ScrollArea>
  );
}
