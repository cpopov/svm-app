import Navbar from '@/components/Navbar'
import React from 'react'

function Layout({ children }) {
  return (
    <div className="flex bg-cover bg-no-repeat h-screen w-full items-center justify-center px-4 bg-[url('/hero-bg.jpeg')]">
      <Navbar variant="guest" />
      {children}
    </div>
  )
}

export default Layout
