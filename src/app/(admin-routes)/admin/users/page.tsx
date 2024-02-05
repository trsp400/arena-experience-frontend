import BreadCrumb from "@/components/breadcrumb";
import { UserClient } from "@/components/tables/user-tables/client";
import { users } from "@/constants/data";
import { Suspense } from "react";

const breadcrumbItems = [{ title: "Usuários", link: "/admin/users" }];
export default function page() {
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
