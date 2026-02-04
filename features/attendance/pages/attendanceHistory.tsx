import { AnimatedList } from "@/shared/components/shared";
import { GET } from "@/shared/config/api/crud"
import { formatDate } from "@/shared/helpers/utils";
import { ChevronLeftCircle } from "lucide-react";
import Link from "next/link";

export async function AttendanceHistory() {
  try {
    const response = await GET({route: "/attendance/history", isServer: true});
    const attendance = response.data

    return (
      <div className='lg:px-44 px-4 bg-primary min-h-screen'>
        <header className='py-4 border-b border-primary-light/20'>
          <Link href="../" className='cursor-pointer'>
            <ChevronLeftCircle className='inline-block mr-2 mb-2 text-primary-light' />
          </Link>
          <h1 className='font-bold text-xl text-white mt-2'>Your Attendance History</h1>
          <p className='text-sm mt-1 text-primary-light/50'>Review past attendance records of events you attended.</p>
        </header>
        <div className='flex flex-col lg:-mx-4 gap-4 lg:gap-0 mt-4'>
          {attendance.length === 0 && (
            <p className="text-primary-light text-center mt-10">No attendance records found.</p>
          )}
          {attendance.map((record: any, index: number) => (
            <AnimatedList
              key={record._id}
              mainText={record.event.name}
              subText={record.event.location}
              endText={formatDate(record.created_at)}
              delayIndex={index}
            />
          ))}
        </div>
      </div>
    )
  } catch (error) {
    console.error("Failed to fetch attendance history:", error);
    return <>An unknown error occurred.</>
  }
}

export default AttendanceHistory