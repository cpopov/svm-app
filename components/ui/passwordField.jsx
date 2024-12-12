'use client'

import * as React from 'react'

import { Eye, EyeOff } from 'lucide-react'

import { cn } from '@/lib/utils'

const PasswordInput = React.forwardRef(({ className, type, ...props }, ref) => {
  const [visibility, setVisibility] = React.useState(false)
  return (
    <div className="relative">
      <input
        type={visibility ? 'text' : type}
        className={cn(
          'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
      <div
        role="button"
        onClick={e => {
          e.preventDefault()
          setVisibility(state => !state)
        }}
        className="absolute top-3 right-3 z-10">
        {visibility ? <Eye size={18} /> : <EyeOff size={18} />}
      </div>
    </div>
  )
})
PasswordInput.displayName = 'PasswordInput'

export { PasswordInput }
