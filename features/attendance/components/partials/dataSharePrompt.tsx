"use client"

import { Input } from "@/shared/components/form"
import { Button } from "@/shared/components/ui"
import { UserContext } from "@/shared/contexts/userContext"
import { useContext, useState } from "react"
import { IAttendance, IEventDetails } from "../../interfaces"
import QRCodeRecorder from "./qrCodeRecorder"

function DataSharePrompt({
  eventDetails
}: {eventDetails: IEventDetails}) {
  const { user } = useContext(UserContext)!

  const [userData, setUserData] = useState<IAttendance>({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    additionalInfoFields: Array(eventDetails.additionalInfoFields.length).fill({ field: '', value: '' }),
  })
  const [isApproved, setIsApproved] = useState(false)
  
  const updateAdditionalInfoField = (index: number, value: string) => {
    const updatedFields = [...userData.additionalInfoFields];
    updatedFields[index] = { field: updatedFields[index].field, value };
    setUserData(prev => ({ ...prev, additionalInfoFields: updatedFields }));
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsApproved(true);
  }

  if (isApproved) return <QRCodeRecorder eventId={eventDetails._id} userData={userData} />

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen py-10">
      <h1 className="text-xl font-semibold text-gray-700">{eventDetails.name} wants to collect the following details</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4 w-full lg:w-1/4">
        <Input label="Firstname" value={userData.first_name} onChange={(e) => setUserData(prev => ({ ...prev, first_name: e.target.value }))} />
        <Input label="Lastname" value={userData.last_name} onChange={(e) => setUserData(prev => ({ ...prev, last_name: e.target.value }))} />
        <Input label="Email" value={userData.email} onChange={(e) => setUserData(prev => ({ ...prev, email: e.target.value }))} />
        {eventDetails.additionalInfoFields.map((field, index) => (
          <Input key={field} label={field} value={userData.additionalInfoFields[index].value || ''} onChange={(e) => updateAdditionalInfoField(index, e.target.value)} />
        ))}
        <Button type="submit">Continue</Button>
      </form>
    </div>
  )
}

export default DataSharePrompt