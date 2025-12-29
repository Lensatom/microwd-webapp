import { RecordAttendance } from "@/features/attendance/pages";

type PageProps = {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
};

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const token = params.token as string;
  return <RecordAttendance attendanceToken={token} />;
}
