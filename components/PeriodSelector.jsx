import React from 'react'
import { cn } from '@/lib/utils'

function PeriodSelector({
  period = '',
  setPeriod = () => {},
  periodList = []
}) {
  return (
    <div
      className={`grid grid-cols-4 border border-accent rounded-md min-w-56 p-1`}>
      {periodList.map(({ key, label }) => {
        return (
          <div
            role="button"
            onClick={() => setPeriod(key)}
            key={key}
            className={cn(
              'px-2 py-1 flex justify-center items-center rounded-md hover:bg-white bg-bg-red-300 text-sm',
              key === period && 'gradient text-white'
            )}>
            {label}
          </div>
        )
      })}
    </div>
  )
}

export default PeriodSelector
