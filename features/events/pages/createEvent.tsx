"use client"

import { Input } from '@/shared/components/form';
import { Button } from '@/shared/components/ui';
import { useForm } from '@/shared/hooks/useForm';
import { CalendarDays, ChevronLeftCircle, Plus, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCreateEvent } from '../api';
import { validateCreateEvent } from '../helpers/validateCreateEvent';
import { IEvent } from '../types';

function CreateEvent() {
  const router = useRouter();
  const eventDateHelpId = "event-date-help";
  const eventDateErrorId = "event-date-error";
  const eventDateInputId = "event-date-input";
  const today = new Date().toISOString().split("T")[0];

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

  const openDatePicker = () => {
    const dateInput = document.getElementById(eventDateInputId) as (HTMLInputElement & { showPicker?: () => void }) | null;
    if (!dateInput) return;

    dateInput.focus();
    dateInput.showPicker?.();
  }

  const selectedDateLabel = data.date
    ? new Intl.DateTimeFormat(undefined, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date(`${data.date}T00:00:00`))
    : "No date selected";
    
  return (
    <div className='w-full min-h-screen flex py-10 justify-center items-center bg-primary'>
      <div className='lg:w-1/3 w-full px-4 lg:px-0 mx-auto py-6'>
        <div>
          <button onClick={() => router.back()} className='cursor-pointer'>
            <ChevronLeftCircle className='inline-block mr-2 mb-2 text-primary-light' />
          </button>
          <h1 className='font-bold text-2xl text-white'>
            Create an Event</h1>
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
            <div>
              <label htmlFor={eventDateInputId} className="text-sm text-primary-light">Event Date</label>
              <div className="relative mt-1">
                <input
                  id={eventDateInputId}
                  type="date"
                  min={today}
                  value={data.date}
                  onChange={(e) => changeData("date", e.target.value)}
                  aria-invalid={error.date ? "true" : "false"}
                  aria-describedby={`${eventDateHelpId}${error.date ? ` ${eventDateErrorId}` : ""}`}
                  className="file:text-foreground text-primary-light selection:bg-primary-light selection:text-primary-foreground border-input h-9 w-full min-w-0 rounded-md border border-primary-light/20 bg-transparent px-3 pr-10 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-primary-light"
                />
                <button
                  type="button"
                  onClick={openDatePicker}
                  aria-label="Open calendar picker"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-primary-light/70 hover:text-primary-light transition-colors"
                >
                  <CalendarDays size={16} />
                </button>
              </div>
              {error.date ? <p id={eventDateErrorId} className="mt-1 text-xs text-red-400">{error.date}</p> : null}
            </div>
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
          
          <Button type="submit" isLoading={isPending} className="w-full mt-2 px-8 py-2 bg-white text-primary rounded-md hover:bg-primary-dark transition">
            Create Event
          </Button>
        </form>
      </div>
    </div>
  )
}

export default CreateEvent