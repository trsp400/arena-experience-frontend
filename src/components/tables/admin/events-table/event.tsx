"use client";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { columns } from "./columns";
import { Event } from '@/constants/data'
import { ModalNewEvent } from "@/app/(admin-routes)/components/modal-new-event";

interface EventsData {
  data: Event[];
}

export const EventScreen: React.FC<EventsData> = ({ data }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-start justify-between">
        <Heading
          title={`Eventos (${data?.length})`}
          description="Gerencie os eventos"
        />
        {/* <Button
          className="text-xs md:text-sm"
          onClick={() => router.push(`/dashboard/user/new`)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button> */}
        <ModalNewEvent />
      </div>
      <Separator />
      <DataTable searchKey="eventName" searchName="evento" columns={columns} data={data} />
    </>
  );
};
