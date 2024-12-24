'use client'

import { useEffect, useState } from 'react'

import { Skeleton } from './ui/skeleton'
import { cn } from '@/lib/utils'
import { getPlayerStats } from '@/actions'

export default function PlayerStats({
  playerData,
  period,
  variant = 'compact'
}) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  useEffect(() => {
    const fetchData = async (sportId, playerId) => {
      try {
        setLoading(true)
        setError(null)
        const res = await getPlayerStats(sportId, playerId, period)
        setData(res.data)
      } catch (err) {
        console.log('err', err)
        setError('Failed to fetch player stats.')
      } finally {
        setLoading(false)
      }
    }

    if (playerData) fetchData(playerData?.market, playerData?.playerId)
  }, [playerData, period])
  if (loading) return <Loader />
  if (variant === 'compact')
    return (
      <div className="flex flex-col gap-8 mb-10">
        {data && !error ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {data?.stats?.map(stat => (
              <StatsCard
                key={stat?.label}
                title={stat?.label}
                value={stat?.value}
              />
            ))}
          </div>
        ) : (
          <div className="bg-[#DAF1E9] p-3 rounded-sm flex flex-col justify-center items-center text-center w-full">
            No stats found
          </div>
        )}
      </div>
    )
  return (
    <div className="flex flex-col gap-8 mb-10">
      {data && !error ? (
        <div className="grid gap-4">
          {data?.stats?.map(stat => (
            <StatsCard
              className="bg-muted flex flex-row justify-between text-base"
              key={stat?.label}
              title={stat?.label}
              value={stat?.value}
            />
          ))}
        </div>
      ) : (
        <div className="bg-[#DAF1E9] p-3 rounded-sm flex flex-col justify-center items-center text-center w-full">
          No stats found
        </div>
      )}
    </div>
  )
}

function StatsCard({ title = '--', value, points = 0, className, ...props }) {
  if (value || value === 0)
    return (
      <div
        {...props}
        className={cn(
          'bg-[#DAF1E9] p-3 rounded-sm flex flex-col justify-center items-center text-center',
          className
        )}>
        <p className="md:text-xs">{title}</p>
        <p
          className={cn(
            'text-accent-success font-semibold',
            points < 0 && 'text-accent-warning'
          )}>
          <span className="text-lg font-bold">{value}</span>
          {points ? <span className="text-sm">{` (${points}pts)`}</span> : null}
        </p>
      </div>
    )
}
function Loader() {
  return (
    <div className="flex flex-col gap-8 mb-10">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="bg-[#DAF1E9] p-3 rounded-sm flex flex-col justify-center items-center text-center">
            <Skeleton className="h-3 w-16 mb-2" />
            <Skeleton className="h-5 w-12" />
          </div>
        ))}
      </div>
    </div>
  )
}
