"use client"

import { Button, Loader } from "@/shared/components/ui";
import { ArrowDownToLine } from "lucide-react";
import useDownloadCsv from "../hooks/useDownloadCsv";
import { IEvent } from "../types";

export default function DownloadAttendance({
  event,
  disabled = false,
}: { event: IEvent, disabled?: boolean }) {

  const { isLoading, handleDownloadCsv } = useDownloadCsv({ event });

  const Icon = isLoading ? Loader : ArrowDownToLine;

  return (
    <Button disabled={isLoading || disabled} onClick={handleDownloadCsv} variant="outline" size="sm" className="flex items-center gap-2 mt-2 text-sm">
      <Icon /> {isLoading ? "Downloading..." : "Download CSV"}
    </Button>
  )
}