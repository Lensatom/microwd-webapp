import { GET } from "@/shared/config/api/crud"

export async function AttendanceHistory() {
  try {
    const response = await GET({route: "/attendance/history", isServer: true});
    const attendance = response.data

    return (
      <div className='px-44'>
        <header className='py-6 border-b border-b-gray-200 mb-6'>
          <h1 className='font-bold text-2xl text-primary'>Attendance History</h1>
          <p className='text-sm mt-1 text-gray-500'>Review past attendance records of events you attended.</p>
        </header>
        <div className='grid grid-cols-3 gap-6'>
          {attendance.map((record: any) => (
            <div key={record.id} className='bg-gray-100 p-4'>
              <h2>{record.event.name}</h2>
              <p className='text-sm text-gray-500'>{new Date(record.created_at).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>
    )
  } catch (error) {
    console.error("Failed to fetch attendance history:", error);
  }
}

export default AttendanceHistory