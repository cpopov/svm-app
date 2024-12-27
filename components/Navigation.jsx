'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from './ui/dropdown-menu'
import { guestNavLinks, userNavLinks } from '@/lib/constants'
import { usePathname, useRouter } from 'next/navigation'

import { Button } from './ui/button'
import Link from 'next/link'
import React from 'react'
import { setLogOutState } from '@/lib/redux'
import truncate from '@/lib/truncate'
import useAuth from '@/lib/useAuth'
import { useDispatch } from 'react-redux'

function Navigation() {
  const pathname = usePathname()
  const { isAuthenticate } = useAuth()
  const router = useRouter()

  const navLinks = isAuthenticate ? userNavLinks : guestNavLinks

  return (
    <>
      <div className="space-x-8 flex h-full">
        {navLinks.map(({ title, path }) => (
          <Link key={`header${title}`} href={path}>
            <div className="relative flex justify-center  items-center h-full w-[100px]">
              <p className="uppercase">{title}</p>
              {pathname === path && (
                <div className="h-1 absolute bottom-0 right-0 left-0 mx-auto gradient"></div>
              )}
            </div>
          </Link>
        ))}
      </div>
      <div className="gap-4 flex items-center">
        {isAuthenticate ? (
          // <Button
          //   onClick={() => dispatch(setLogOutState())}
          //   className="text-white bg-transparent w-[100px]"
          //   variant="outline">
          //   Logout
          // </Button>
          <UserDropDown />
        ) : (
          <Button
            onClick={() => router.push('/sign-in')}
            className="text-white bg-transparent w-[100px]"
            variant="outline">
            Login
          </Button>
        )}
      </div>
    </>
  )
}

export default Navigation
function UserDropDown() {
  const dispatch = useDispatch()
  const router = useRouter()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="text-white w-[100px]" variant="outline">
          Profile
        </Button>
        {/* <Button variant="ghost">Profile</Button> */}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-44">
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="cursor-pointer"
            role="button"
            onClick={() => {
              router.push('/profile/transactions')
            }}>
            Transactions
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            role="button"
            onClick={() => {
              router.push('/profile/account')
            }}>
            Account
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            role="button"
            onClick={() => {
              router.push('/profile/settings')
            }}>
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          role="button"
          onClick={() => dispatch(setLogOutState())}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
