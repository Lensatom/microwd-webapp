import { GET } from '@/shared/config/api/crud'
import QRCodeRecorder from '../components/partials/qrCodeRecorder'

async function RecordAttendance({attendanceToken}: {attendanceToken: string}) {
  try {
    if (!attendanceToken) throw new Error("No attendance token provided")
    
    const response = await GET({
      route: `/events/attendance/record?attendanceToken=${attendanceToken}`,
      isServer: true
    })
  
    console.log(response)
    
    return "Auto"
  } catch (error) {
    return <QRCodeRecorder />
  }
}

export default RecordAttendance