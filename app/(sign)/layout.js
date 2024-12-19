'use client'

import React, { useLayoutEffect } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import useAuth from '@/lib/useAuth'
import { useRouter } from 'next/navigation'

function Layout({ children }) {
  const { isAuthenticate } = useAuth()
  const router = useRouter()
  useLayoutEffect(() => {
    if (isAuthenticate) {
      router.push('/')
    }
  }, [isAuthenticate])
  return (
    <div className="bg-black">
      <div className="flex bg-cover bg-no-repeat min-h-screen w-full items-center justify-center flex-col py-10 md:px-4 bg-[url('/sign-bg.png')]">
        <Link href="/">
          <div className="h-8 w-24 relative mb-5 md:mb-10">
            <Image
              fill
              alt="logo"
              sizes="auto"
              src="/svt_logo.png"
              className="object-contain"
            />
          </div>
        </Link>
        {children}
      </div>
    </div>
  )
}

export default Layout
