import { Suspense } from "react";
import { getServerSession } from "next-auth";
import BreadCrumb from "@/components/breadcrumb";
import config from '@/utils/config';
import { nextAuthOptions } from "@/utils/nextAuthOptions";
import { NewUserForm } from "./components/FormNewUser";

const BACKEND_URL = config.BACKEND_URL

const breadcrumbItems = [{ title: "Usuários", link: "/admin/users" }, { title: "Novo Usuário", link: "/admin/users/new" }];
export default async function UsersList() {
  const session = await getServerSession(nextAuthOptions);

  return (
    <>
      <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
        <BreadCrumb items={breadcrumbItems} />
        <Suspense>
          <NewUserForm />
        </Suspense>
      </div>
    </>
  );
}
