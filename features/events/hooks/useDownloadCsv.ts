import { GET } from "@/shared/config/api/crud";
import { useState } from "react";
import streamSaver from "streamsaver";

function useDownloadCsv({ event } : { event: any }) {

  const {
    _id: eventId,
    name: eventName,
  } = event;

  const [isLoading, setIsLoading] = useState(false);

  async function downloadFile(url: string, filename: string) {
    const response = await fetch(url);

    const fileStream = streamSaver.createWriteStream(filename);
    if (response.body) {
      await response.body.pipeTo(fileStream);
    }
    setIsLoading(false);
  }


  async function handleDownloadCsv() {
    try {
      setIsLoading(true);

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
      setIsLoading(false);
      console.error('Error during CSV download:', error);
    }
  }

  return {
    isLoading,
    handleDownloadCsv
  }
}

export default useDownloadCsv