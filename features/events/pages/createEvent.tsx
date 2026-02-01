"use client"

import { Input } from '@/shared/components/form'
import { Button } from '@/shared/components/ui'
import { useCreateEvent } from '../api'
import { useForm } from '@/shared/hooks/useForm';
import { Plus, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { validateCreateEvent } from '../helpers/validateCreateEvent';
import { IEvent } from '../types';

type INewEvent = Omit<IEvent, "_id"> & { newField: string };

function CreateEvent() {
  const router = useRouter();

  const { createEvent, isPending } = useCreateEvent();

  const initialValues: Omit<IEvent, "_id"> = {
    name: '',
    date: '',
    location: '',
    description: '',
    additionalInfoFields: [] as string[],
  }
  const {
    data,
    changeData,
    error,
    changeError
  } = useForm<Omit<IEvent, "_id">>(initialValues);

  const changeAdditionalInfoField = (index: number, value: string) => {
    const newFields = [...data.additionalInfoFields];
    newFields[index] = value;
    changeData("additionalInfoFields", newFields);
  }

  const addAdditionalInfoField = () => {
    changeData("additionalInfoFields", [...data.additionalInfoFields, '']);
  }

  const removeAdditionalInfoField = (index: number) => {
    const newFields = data.additionalInfoFields.filter((_, i) => i !== index);
    changeData("additionalInfoFields", newFields);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateCreateEvent(data, changeError)) return;
    await createEvent(data);
    router.replace('/');
  }
    
  return (
    <div className='w-full min-h-screen flex py-10 justify-center items-center bg-primary'>
      <div className='w-1/3 mx-auto py-6'>
        <div>
          <h1 className='font-bold text-2xl text-white'>Create an Event</h1>
          <p className='text-sm mt-1 text-primary-light'>Host an event to take attendance for on Microwd.</p>
        </div>
        <form className='flex flex-col items-start gap-6 mt-6' onSubmit={handleSubmit}>
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
            className='w-full'
          />
          <Input
            label="Event Description"
            placeholder="Describe your event"
            value={data.description}
            onChange={(e) => changeData("description", e.target.value)}
            error={error.description}
            className='w-full'
          />

          <p className='text-sm text-primary-light/50'>
            We will collect Email, First Name, and Last Name from attendees by default.
            What other additional information do you wish to collect?
          </p>

          {data.additionalInfoFields.map((field, index) => (
            <div key={index} className='flex items-center justify-between gap-2 border border-primary-light/50 rounded-md'>
              <Input placeholder="Additional info" className="flex-1 border-0!" value={field} onChange={(e) => changeAdditionalInfoField(index, e.target.value)} />
              <Button variant="ghost" size="sm" onClick={() => removeAdditionalInfoField(index)}><X className='text-red-400' /></Button>
            </div>
          ))}

          {error.additionalInfoFields && <p className="text-xs text-red-400">{error.additionalInfoFields}</p>}

          <Button variant="outline" size="sm" type="button" className='-mt-4' onClick={addAdditionalInfoField}>
            <Plus />
            Add additional fields
          </Button>
          
          <Button type="submit" isLoading={isPending} className="mt-2 px-8 py-2 bg-white text-primary rounded-md hover:bg-primary-dark transition">
            Create Event
          </Button>
        </form>
      </div>
    </div>
  )
}

export default CreateEvent