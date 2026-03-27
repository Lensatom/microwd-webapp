import { isTransientApiError } from '@/shared/config/api/axios'
import { GET } from '@/shared/config/api/crud'
import { IEventDetails } from '../interfaces'
import DataSharePrompt from '../components/partials/dataSharePrompt'
import { redirect } from 'next/navigation'

async function RecordAttendance({
  eventId
}: {eventId: string}) {
  let eventDetails: (IEventDetails & { hasFilled?: boolean }) | null = null;

  try {
    const response = await GET({
      route: `/events/${eventId}`,
      isServer: true
    })

    eventDetails = response.event as IEventDetails & { hasFilled?: boolean }
  } catch (error) {
    if (isTransientApiError(error)) {
      return <p className="text-primary-light text-center py-12">Server is waking up. Please refresh in a few seconds.</p>
    }

    throw error;
  }

  if (eventDetails?.hasFilled) {
    redirect(`/attendance/${eventId}/record/success`)
  }

  if (!eventDetails) {
    return null;
  }
  
  return <DataSharePrompt eventDetails={eventDetails} />
}

export default RecordAttendance