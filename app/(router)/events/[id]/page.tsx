import { EventDetails } from "@/features/events/pages";

export default async function EventDetailsWrapper({ params }: { params: { id: string } }) {
  const { id } = await params;
  return <EventDetails id={id} />
}