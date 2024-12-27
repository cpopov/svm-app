'use client'

import Image from 'next/image'
import Link from 'next/link'
import MobileNav from './MobileNav'
import Navigation from './Navigation'

export default function Navbar({ variant = 'user' }) {
  if (variant === 'guest')
    return (
      <>
        <nav
          className={`md:block hidden absolute top-0 right-0 left-0 m-auto z-50 text-white`}>
          <div className="h-16 flex justify-between items-center md:px-14">
            <Link href="/">
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
            {/* <Navigation /> */}
          </div>
        </nav>
        {/* <MobileNav balance={0} /> */}
      </>
    )
  return (
    <>
      <nav
        className={`md:block hidden absolute top-0 right-0 left-0 m-auto z-50 bg-accent-dark text-white`}>
        <div className="h-16 flex justify-between items-center md:px-14">
          <Link href="/">
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
          <Navigation />
        </div>
      </nav>
      <MobileNav balance={0} />
    </>
  )
}
