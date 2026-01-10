import { RecordAttendance } from "@/features/attendance/pages";

type PageProps = {
  params: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
};

export default async function Page({ params, searchParams }: PageProps) {
  const loadedParams = await params;
  const loadedSearchParams = await searchParams;
  const attendanceToken = loadedSearchParams.token as string;
  const eventId = loadedParams.id as string;
  return <RecordAttendance eventId={eventId} attendanceToken={attendanceToken} />;
}
