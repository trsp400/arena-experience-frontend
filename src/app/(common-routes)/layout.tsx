import { getServerSession } from "next-auth"
import { ReactNode } from "react"
import { redirect } from "next/navigation";

import Header from "@/components/layout/header";
import { nextAuthOptions } from "@/utils/nextAuthOptions";
import Sidebar from "@/components/layout/sidebar";
import AdminLayout from '../(admin-routes)/layout'
import UserLayout from '../(user-routes)/layout'

interface AdminLayoutProps {
  children: ReactNode
}

export default async function CommonLayout({ children }: AdminLayoutProps) {
  const session = await getServerSession(nextAuthOptions);

  if (!session) {
    redirect('/login')
  }

  return <>
    <Header />
    <div>
      {
        (session?.user.role === 'admin') ? (
          <AdminLayout>
            {children}
          </AdminLayout>
        ) : (
          <UserLayout>
            {children}
          </UserLayout>
        )
      }
    </div>
  </>
}