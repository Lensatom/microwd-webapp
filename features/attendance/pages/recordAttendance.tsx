import { GET } from '@/shared/config/api/crud'
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
      return <div className='p-10'>You have already recorded your attendance for this event. Thank you!</div>
    }
    
    return <DataSharePrompt eventDetails={eventDetails} />
  } catch (error) {
    return <>Error</>
  }
}

export default RecordAttendance