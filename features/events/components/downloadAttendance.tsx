"use client"

import { Button } from "@/shared/components/ui";
import { ArrowDownToLine } from "lucide-react";
import useDownloadCsv from "../hooks/useDownloadCsv";
import { IEvent } from "../types";

export default function DownloadAttendance({
  event,
  disabled = false,
}: { event: IEvent, disabled?: boolean }) {

  const { isLoading, handleDownloadCsv } = useDownloadCsv({ event });

  return (
    <Button disabled={isLoading || disabled} onClick={handleDownloadCsv} variant="outline" size="sm" className="flex items-center gap-2 mt-2 text-sm">
      <ArrowDownToLine /> {isLoading ? "Downloading..." : "Download CSV"}
    </Button>
  )
}