"use client";
import { DataTable } from "@/components/ui/user/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import { columns } from "./columns";
import { Event } from '@/constants/data'

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
          description="Veja todos os eventos disponíveis"
        />
      </div>
      <Separator />
      <DataTable searchKey="eventName" searchName="evento" columns={columns} data={data} />
    </>
  );
};
