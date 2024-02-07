import ThemeToggle from "@/components/layout/ThemeToggle/theme-toggle";
import { cn } from "@/lib/utils";
import { MobileSidebar as UserMobileSidebar } from "./user-mobile-sidebar";
import { UserNav } from "./user-nav";
import Link from "next/link";
import Image from "next/image";
import { Session, getServerSession } from "next-auth";
import { nextAuthOptions } from "@/utils/nextAuthOptions";

export default async function Header() {
  const session = await getServerSession(nextAuthOptions) as Session
  return (
    <div className="fixed top-0 left-0 right-0 supports-backdrop-blur:bg-background/60 border-b bg-background/95 backdrop-blur z-20">
      <nav className="h-14 flex items-center justify-between px-4">
        <div className="hidden lg:block">
          <Link
            href={"https://saranossaterra.com.br/"}
            target="_blank"
          >
            <Image src={'/sara-logo.png'} alt="Sara Nossa Terra - Logo" width={64} height={64} />
          </Link>
        </div>
        <div className={cn("block lg:!hidden")}>
          <UserMobileSidebar />
        </div>

        <div className="flex items-center gap-2">
          <UserNav session={session} />
          <ThemeToggle />
        </div>
      </nav>
    </div>
  );
}
