'use client'

import { Circle, Menu, X } from 'lucide-react'
import React, { useState } from 'react'
import { guestNavLinks, userNavLinks } from '@/lib/constants'

import { Button } from './ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import truncate from '@/lib/truncate'
import { usePathname } from 'next/navigation'

function MobileNav({ balance = 0 }) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const navLinks = true ? userNavLinks : guestNavLinks

  return (
    <nav className="md:hidden block z-10 absolute top-0 right-0 left-0 m-auto bg-accent-dark text-white">
      <div className="container h-16 flex justify-between items-center ">
        <div className="flex items-center gap-2">
          <div onClick={() => setIsOpen(!isOpen)} className="">
            {isOpen ? <X /> : <Menu />}
          </div>
          <Link href="/">
            <div className="h-8 w-10 relative">
              <Image
                fill
                alt="logo"
                sizes="auto"
                src="/mobile-logo.png"
                className="object-contain"
              />
            </div>
          </Link>
        </div>
        <Button
          variant="outline"
          onClick={() => open()}
          // className="text-white bg-transparent w-[100px] border hover:border-none duration-300"
        >
          Login
        </Button>
      </div>
      <div
        className={`grid overflow-hidden transition-all duration-300 ease-in-out absolute w-full top-0 right-0 left-0 mx-auto ${
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}>
        <div className="overflow-hidden">
          <div className="w-full bg-accent-dark text-white flex flex-col items-center">
            <div className="text-lg font-medium bg-accent-dark w-full flex py-2 px-4 items-center justify-between border-b border-[1px] border-white/20">
              <div onClick={() => open()} className="flex items-center gap-3">
                <div className="h-8 w-8 relative">
                  <Image
                    fill
                    alt="logo"
                    sizes="auto"
                    src="/user-icon.png"
                    className="object-contain"
                  />
                </div>
                <div>bal</div>
              </div>
              <X onClick={() => setIsOpen(!isOpen)} role="" button />
            </div>
            {navLinks.map(({ title, path }) => (
              <Link
                onClick={() => setIsOpen(false)}
                className={`text-lg font-medium uppercase bg-accent-dark w-full flex h-14 px-4 items-center border-b border-[1px] border-white/20 ${
                  pathname === path ? 'gradient-button' : ''
                }`}
                href={path}
                key={`nav${title}`}>
                <div className="flex items-center gap-2">
                  <Circle
                    size={10}
                    className={cn(
                      'fill-none stroke-[2px]',
                      pathname === path && 'fill-white'
                    )}
                  />
                  <p>{title}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default MobileNav
