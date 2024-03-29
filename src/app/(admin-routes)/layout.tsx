import { getServerSession } from "next-auth"
import { ReactNode } from "react"
import { redirect } from "next/navigation";

import Header from "@/components/layout/header";
import { nextAuthOptions } from "@/utils/nextAuthOptions";
import Sidebar from "@/components/layout/sidebar";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

interface AdminLayoutProps {
  children: ReactNode
}

export default async function Adminlayout({ children }: AdminLayoutProps) {
  const session = await getServerSession(nextAuthOptions);

  if (!session) {
    redirect('/login')
  }

  if (session?.user?.role !== 'admin') {
    redirect('/')
  }

  return <>
    <Header />
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="w-full pt-16">{children}</main>
    </div>
  </>
}