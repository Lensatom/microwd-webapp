import { EventAttendance } from "@/features/events/pages"

export default async function EventAttendanceWrapper({ params }: { params: { id: string } }) {
  const { id } = await params;
  return <EventAttendance id={id} />
}