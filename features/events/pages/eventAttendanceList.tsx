import { IAttendance, IEventDetails } from '@/features/attendance/interfaces'
import { Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/components/ui'
import { GET } from '@/shared/config/api/crud'
import { ChevronLeftCircle, Download } from 'lucide-react'
import Link from 'next/link'
import DownloadAttendance from '../components/downloadAttendance'

async function EventAttendanceList({ id }: {id: string}) {
  try {
    const eventResponse = await GET({
      route: `events/${id}`,
      isServer: true
    })
    const eventDetails:IEventDetails = eventResponse.event

    const attendanceResponse = await GET({
      route: `events/${id}/attendance-list`,
      isServer: true
    })
    const attendanceList:(IAttendance & {_id: string})[] = attendanceResponse.data

    return (
      <div className='px-4 lg:px-44 bg-primary min-h-screen overflow-x-auto'>
        <header className='py-6 border-b'>
          <Link href={`/events/${id}`} className='cursor-pointer'>
            <ChevronLeftCircle className='inline-block mr-2 mb-2 text-primary-light' />
          </Link>
          <h1 className='font-bold text-xl text-white mt-2'>{eventDetails.name} Attendance List</h1>
          <DownloadAttendance event={eventDetails} />
        </header>
        <Table className='mt-4'>
          <TableHeader>
            <TableRow className='bg-primary-light/50'>
              <TableHead className='text-white'>Email</TableHead>
              <TableHead className='text-white'>Fullname</TableHead>
              {eventDetails.additionalInfoFields.map((field) => (
                <TableHead className='text-white' key={field}>{field}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {attendanceList.map((attendance) => (
              <TableRow key={attendance._id} className='bg-primary-light/20 text-primary-light'>
                <TableCell className="font-medium">{attendance.email}</TableCell>
                <TableCell>{attendance.first_name} {attendance.last_name}</TableCell>
                {eventDetails.additionalInfoFields.map((field) => {
                  const infoField = attendance.additionalInfoFields.find(info => info.field === field)
                  return (
                    <TableCell key={field}>{infoField ? infoField.value : ''}</TableCell>
                  )
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  } catch (error) {
    console.log(error)
    return <>Error</>
  }
}

export default EventAttendanceList