import { Input } from '@/shared/components/form'
import { Button } from '@/shared/components/ui'

function CreateEvent() {
  return (
    <div className='w-full min-h-screen flex py-10 justify-center items-center bg-primary-light/5'>
      <div className='w-1/3 mx-auto py-6'>
        <div>
          <h1 className='font-bold text-2xl text-primary'>Create an Event</h1>
          <p className='text-sm mt-1 text-gray-500'>Host an event to take attendance for on Microwd.</p>
        </div>
        <form className='flex flex-col gap-6 mt-10'>
          <Input placeholder="Event Name" className="" />
          <Input type="date" placeholder="Event Date" className="" />
          <p className='text-sm text-gray-500'>
            We will collect Email, First Name, and Last Name from attendees by default.
            What other additional information do you wish to collect?
          </p>
          <Input placeholder="Additional info 1" className="" />
          <Button type="submit" className="mt-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition">
            Create Event
          </Button>
        </form>
      </div>
    </div>
  )
}

export default CreateEvent