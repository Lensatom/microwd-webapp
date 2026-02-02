import { GET } from '@/shared/config/api/crud'
import DataSharePrompt from '../components/partials/dataSharePrompt'
import { redirect } from 'next/navigation'

async function RecordAttendance({
  eventId
}: {eventId: string}) {
  const response = await GET({
    route: `/events/${eventId}`,
    isServer: true
  })
  
  const eventDetails = response.event

  if (eventDetails.hasFilled) {
    // redirect(`/attendance/${eventId}/record/success`)
  }
  
  return <DataSharePrompt eventDetails={eventDetails} />
}

export default RecordAttendance