import { getServerSession } from "next-auth"
import { ReactNode } from "react"
import { redirect } from "next/navigation";

import Header from "@/components/layout/user-header";
import { nextAuthOptions } from "@/utils/nextAuthOptions";
import Sidebar from "@/components/layout/user-sidebar";

interface UserLayoutProps {
  children: ReactNode
}

export default async function Userlayout({ children }: UserLayoutProps) {
  const session = await getServerSession(nextAuthOptions);

  if (!session) {
    redirect('/login')
  }

  if (session?.user?.role === 'admin') {
    redirect('/admin')
  }

  return <>
    <Header />
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="w-full pt-16">{children}</main>
    </div>
  </>
}