import { Suspense } from 'react';

import BreadCrumb from "@/components/breadcrumb";

import { EventScreen } from "@/components/tables/admin/events-table/event";
import { listEvents } from '@/app/server/actions/events/eventActions';

const breadcrumbItems = [{ title: "Admin", link: "/admin/events" }];

export const revalidate = 5;

export default async function AdminDashboard() {

  const eventList = await listEvents();

  return (
    <div className="flex-1 space-y-4  p-4 md:p-8 pt-6">
      <BreadCrumb items={breadcrumbItems} />

      <Suspense>
        <EventScreen data={eventList} />
      </Suspense>

    </div>
  );
};