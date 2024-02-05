import { getServerSession } from "next-auth"
import { ReactNode } from "react"
import { redirect } from "next/navigation";

import Header from "@/components/layout/header";
import { nextAuthOptions } from "../api/auth/[...nextauth]/route";
import Sidebar from "@/components/layout/sidebar";

interface AdminLayoutProps {
  children: ReactNode
}

export default async function Adminlayout({ children }: AdminLayoutProps) {
  const session = await getServerSession(nextAuthOptions);

  if (!session) {
    redirect('/login')
  }

  return <>
    <Header />
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="w-full pt-16">{children}</main>
    </div>
  </>
}