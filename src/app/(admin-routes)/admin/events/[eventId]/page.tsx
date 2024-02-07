'use server'
import React from "react";
import BreadCrumb from "@/components/breadcrumb";
import { EditEventForm } from "@/components/forms/edit-event-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import config from '@/utils/config';
import { nextAuthOptions } from "@/utils/nextAuthOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
const BACKEND_URL = config.BACKEND_URL
import { toast } from "sonner";

const breadcrumbItems = [
  { title: "Eventos", link: "/admin" },
  { title: "Editar Evento", link: "/admin/events" },
];

export default async function Page({ params }: { params: { eventId: string } }) {
  const session = await getServerSession(nextAuthOptions);
  const eventId = params?.eventId;

  const response = await fetch(`${BACKEND_URL}/events/${eventId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${session?.token}`
    },
  });

  const event = await response.json();

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-5">
        <BreadCrumb items={breadcrumbItems} />
        <EditEventForm
          eventData={event}
        />
      </div>
    </ScrollArea>
  );
}
