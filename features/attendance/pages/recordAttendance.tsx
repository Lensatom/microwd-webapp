import { GET } from '@/shared/config/api/crud'
import { redirect } from 'next/navigation'
import DataSharePrompt from '../components/partials/dataSharePrompt'

async function RecordAttendance({
  eventId
}: {eventId: string}) {
  try {
    const response = await GET({
      route: `/events/${eventId}`,
      isServer: true
    })
  
    const eventDetails = response.event

    if (eventDetails.hasFilled) {
      redirect(`/attendance/${eventId}/record/success`)
    }
    
    return <DataSharePrompt eventDetails={eventDetails} />
  } catch (error) {
    return <>Error</>
  }
}

export default RecordAttendance