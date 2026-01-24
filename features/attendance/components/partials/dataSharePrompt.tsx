"use client"

import { Input } from "@/shared/components/form"
import { Button } from "@/shared/components/ui"
import { UserContext } from "@/shared/contexts/userContext"
import { useContext, useState } from "react"
import { IEventDetails } from "../../interfaces"
import QRCodeRecorder from "./qrCodeRecorder"

function DataSharePrompt({
  eventDetails
}: {eventDetails: IEventDetails}) {
  const { user } = useContext(UserContext)!

  const [additionalInfoFields, setAdditionalInfoFields] = useState<{[key: string]: string}>({})
  const [isApproved, setIsApproved] = useState(false)

  if (isApproved) return <QRCodeRecorder eventId={eventDetails._id} />

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen py-10">
      <h1 className="text-xl font-semibold text-gray-700">{eventDetails.name} wants to collect the following details</h1>
      <div className="flex flex-col gap-4 mt-4 w-full lg:w-1/4">
        <Input label="Firstname" value={user.first_name} />
        <Input label="Lastname" value={user.last_name} />
        <Input label="Email" value={user.email} />
        {eventDetails.additionalInfoFields.map((field) => (
          <Input key={field} label={field} value={additionalInfoFields[field] || ''} onChange={(e) => setAdditionalInfoFields(prev => ({ ...prev, [field]: e.target.value }))} />
        ))}
        <Button onClick={() => setIsApproved(true)}>Continue</Button>
      </div>
    </div>
  )
}

export default DataSharePrompt