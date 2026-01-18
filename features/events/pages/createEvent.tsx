"use client"

import { Input } from '@/shared/components/form'
import { Button } from '@/shared/components/ui'
import { useCreateEvent } from '../api'
import { useForm } from '@/shared/hooks/useForm';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { validateCreateEvent } from '../helpers/validateCreateEvent';

type INewEvent = Omit<IEvent, "_id"> & { newField: string };

function CreateEvent() {
  const router = useRouter();

  const { createEvent, isPending } = useCreateEvent();

  const initialValues: INewEvent = {
    name: '',
    date: '',
    location: '',
    description: '',
    additionalInfoFields: [] as string[],
    newField: ''
  }
  const {
    data,
    changeData,
    error,
    changeError
  } = useForm<INewEvent>(initialValues);

  const addAdditionalInfoField = () => {
    changeData("additionalInfoFields", [...data.additionalInfoFields, data.newField]);
    changeData("newField", "");
  }

  const removeAdditionalInfoField = (index: number) => {
    const newFields = data.additionalInfoFields.filter((_, i) => i !== index);
    changeData("additionalInfoFields", newFields);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { newField, ...eventData } = data;
    if (!validateCreateEvent(eventData, changeError)) return;
    await createEvent(eventData);
    router.replace('/');
  }
    
  return (
    <div className='w-full min-h-screen flex py-10 justify-center items-center bg-primary-light/5'>
      <div className='w-1/3 mx-auto py-6'>
        <div>
          <h1 className='font-bold text-2xl text-primary'>Create an Event</h1>
          <p className='text-sm mt-1 text-gray-500'>Host an event to take attendance for on Microwd.</p>
        </div>
        <form className='flex flex-col gap-6 mt-6' onSubmit={handleSubmit}>
          <div className='grid grid-cols-2 gap-4'>
            <Input
              label="Event Name"
              placeholder='Ex: ABC Conference'
              value={data.name}
              onChange={(e) => changeData("name", e.target.value)}
              error={error.name}
            />
            <Input
              label="Event Date"
              placeholder="19/01/2024"
              type='date'
              value={data.date}
              onChange={(e) => changeData("date", e.target.value)}
              error={error.date}
            />
          </div>
          <Input
            label="Event Location"
            placeholder="10, ABC Street, City, Country"
            value={data.location}
            onChange={(e) => changeData("location", e.target.value)}
            error={error.location}
          />
          <Input
            label="Event Description"
            placeholder="Describe your event"
            value={data.description}
            onChange={(e) => changeData("description", e.target.value)}
            error={error.description}
          />

          <p className='text-sm text-gray-500'>
            We will collect Email, First Name, and Last Name from attendees by default.
            What other additional information do you wish to collect?
          </p>

          {data.additionalInfoFields.map((field, index) => (
            <div key={index} className='flex items-center gap-2 border border-input rounded-md'>
              <Input placeholder="Additional info" className="flex-1 border-0!" value={field} readOnly />
              <Button variant="ghost" size="sm" onClick={() => removeAdditionalInfoField(index)}><X className='text-red-400' /></Button>
            </div>
          ))}
          <Input
            placeholder="Add additional info"
            className=""
            value={data.newField}
            onChange={(e) => changeData("newField", e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addAdditionalInfoField();
              }
            }}
          />
          <Button type="submit" isLoading={isPending} className="mt-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition">
            Create Event
          </Button>
        </form>
      </div>
    </div>
  )
}

export default CreateEvent