import Image from 'next/image'
import Navbar from '@/components/Navbar'
import React from 'react'

function Layout({ children }) {
  return (
    <div className="bg-black">
      <div className="flex bg-cover bg-no-repeat h-screen w-full items-center justify-center flex-col px-4 bg-[url('/sign-bg.png')]">
        <div className="h-8 w-24 relative mb-5 md:mb-10">
          <Image
            fill
            alt="logo"
            sizes="auto"
            src="/svt_logo.png"
            className="object-contain"
          />
        </div>
        {children}
      </div>
    </div>
  )
}

export default Layout
