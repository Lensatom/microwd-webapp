import { Button } from "@/shared/components/ui"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

function RecordAttendanceSuccess() {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <CheckCircle className="text-green-400 mb-2" size={48} />
      <h1 className="text-lg font-bold text-white/80">Attendance Recorded</h1>
      <p className="mt-2 text-xs text-primary-light/80 text-center">Your attendance has been successfully recorded. Thank you for participating!</p>
      <Button size="sm" variant="outline" className="mt-6" asChild>
        <Link href="/">Go Home</Link>
      </Button>
    </div>
  )
}

export default RecordAttendanceSuccess