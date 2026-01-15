import React from 'react'

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
    {children}
    <script src="https://accounts.google.com/gsi/client" async defer></script>
    </>
  )
}

export default AuthLayout