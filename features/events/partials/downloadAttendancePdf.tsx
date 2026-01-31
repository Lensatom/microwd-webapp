"use client"

import { DropdownMenuItem } from "@/shared/components/ui";
import { GET } from "@/shared/config/api/crud";
import { ArrowDownToLine } from "lucide-react";
import streamSaver from "streamsaver";
import { IEvent } from "../types";

export default function DowloadAttendancePDF({ event }: { event: IEvent }) {

  const {
    _id: eventId,
    name: eventName,
  } = event;

  async function downloadFile(url: string, filename: string) {
    const response = await fetch(url);

    const fileStream = streamSaver.createWriteStream(filename);
    if (response.body) {
      await response.body.pipeTo(fileStream);
    }
  }


  async function handleDownloadCsv() {
    try {
      const { url } = await GET({
        route: `/events/${eventId}/attendance-list/download`,
        authorization: true,
      });

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to download file");
      }

      const filename = `${eventName}_attendance_list.csv`;

      downloadFile(url, filename);

    } catch (error) {
      console.error('Error during CSV download:', error);
    }
  }

  return (
    <DropdownMenuItem onClick={handleDownloadCsv}>
      <ArrowDownToLine />Download Attendance List
    </DropdownMenuItem>
  )
}