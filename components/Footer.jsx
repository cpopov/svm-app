import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Footer() {
  return (
    <footer className="bg-accent-dark text-white">
      <div className="container h-20 flex items-center w-full ">
        <Link className="ml-auto" href="/">
          <div className="h-8 w-24 relative">
            <Image
              fill
              alt="logo"
              sizes="auto"
              src="/svt_logo.png"
              className="object-contain"
            />
          </div>
        </Link>
      </div>
    </footer>
  )
}

export default Footer
