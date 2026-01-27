import { IAttendance, IEventDetails } from '@/features/attendance/interfaces'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/shared/components/ui'
import { GET } from '@/shared/config/api/crud'

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
      <div className='px-44'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Fullname</TableHead>
              {eventDetails.additionalInfoFields.map((field) => (
                <TableHead key={field}>{field}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {attendanceList.map((attendance) => (
              <TableRow key={attendance._id}>
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