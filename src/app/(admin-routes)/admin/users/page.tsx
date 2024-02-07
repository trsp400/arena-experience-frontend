import { Suspense } from "react";
import BreadCrumb from "@/components/breadcrumb";
import { UserClient } from "@/components/tables/admin/user-tables/client";
import config from '@/utils/config';
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/utils/nextAuthOptions";
import { revalidatePath } from "next/cache";

const BACKEND_URL = config.BACKEND_URL

const breadcrumbItems = [{ title: "Usuários", link: "/admin/users" }];
export default async function UsersList() {
  const session = await getServerSession(nextAuthOptions);

  const response = await fetch(`${BACKEND_URL}/users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session?.token}`
    },
    cache: 'no-store'
  });

  if (!response.ok) {
    revalidatePath('/admin/users')
    throw new Error('Não foi possível obter a lista de usuários');
  }

  const users = await response.json();

  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <Suspense>
          <UserClient data={users} />
        </Suspense>
      </div>
    </>
  );
}
