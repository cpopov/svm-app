'use client'

import * as React from 'react'

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'

export function DatePicker({
  label = 'Pick a date',
  date,
  setDate = () => {}
}) {
  // const [date, setDate] = React.useState()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-[150px] justify-between text-left font-normal h-10',
            !date && 'text-muted-foreground'
          )}>
          <div>
            {date ? (
              <div>
                <p className="text-xs text-black/40">{label}</p>
                <p className="text-sm">{format(date, 'P')}</p>
              </div>
            ) : (
              <span>{label}</span>
            )}
          </div>
          <CalendarIcon size={20} className="text-black/40" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
