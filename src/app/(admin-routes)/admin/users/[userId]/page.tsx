'use server'
import React from "react";
import BreadCrumb from "@/components/breadcrumb";
import { ProfileForm } from "@/components/forms/user/profile-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import config from '@/utils/config';
import { nextAuthOptions } from "@/utils/nextAuthOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
const BACKEND_URL = config.BACKEND_URL
import { toast } from "sonner";

const breadcrumbItems = [
  { title: "Usuários", link: "/admin/users" },
  { title: "Editar Usuário", link: "/admin/users" },
];

export default async function Page({ params }: { params: { userId: string } }) {
  const session = await getServerSession(nextAuthOptions);
  const userId = params?.userId;

  const response = await fetch(`${BACKEND_URL}/users/${userId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${session?.token}`
    },
  });

  const user = await response.json();

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-5">
        <BreadCrumb items={breadcrumbItems} />
        <ProfileForm
          profile={user}
        />
      </div>
    </ScrollArea>
  );
}
