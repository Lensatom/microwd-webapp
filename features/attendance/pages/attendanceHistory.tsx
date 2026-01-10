
function AttendanceHistory() {
  return (
    <div className='px-44'>
      <header className='py-6 border-b border-b-gray-200 mb-6'>
        <h1 className='font-bold text-2xl text-primary'>Attendance History</h1>
        <p className='text-sm mt-1 text-gray-500'>Review past attendance records of events you attended.</p>
      </header>
      <div className='grid grid-cols-3 gap-6'>
        <div className='bg-gray-100 p-4'>
          <h2>Forge Conference 2025</h2>
          <p className='text-sm text-gray-500 mb-4'>12th October 2025</p>
        </div>
        <div className='bg-gray-100 p-4'>
          <h2>Forge Conference 2025</h2>
          <p className='text-sm text-gray-500 mb-4'>12th October 2025</p>
        </div>
        <div className='bg-gray-100 p-4'>
          <h2>Forge Conference 2025</h2>
          <p className='text-sm text-gray-500 mb-4'>12th October 2025</p>
        </div>
      </div>
    </div>
  )
}

export default AttendanceHistory