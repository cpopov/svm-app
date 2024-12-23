'use client'

import { ChevronLeft, Info, Router } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  apiAssetDetails,
  getPlayerDetails,
  getPlayerPriceChart,
  getPlayerStats
} from '@/actions'
import { useEffect, useState } from 'react'

import { Card } from '@/components/ui/card'
import Image from 'next/image'
import PeriodSelector from '@/components/PeriodSelector'
import PlayerData from '@/components/PlayerData'
import PlayerDetails from '@/components/PlayerDetails'
import PlayerPriceChart from '@/components/PlayerPriceChart'
import PlayerStats from '@/components/PlayerStats'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'

export default function Page({ params }) {
  const [data, setData] = useState(null)
  const [playerData, setPlayerData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [period, setPeriod] = useState('alltime')

  const router = useRouter()

  const periodList = [
    {
      key: 'game',
      label: 'Last Game'
    },
    // {
    //   key: 'week',
    //   label: 'Week'
    // },
    { key: 'month', label: 'Month' },
    { key: 'year', label: 'Season' },
    { key: 'alltime', label: 'All' }
  ]

  const transformData = data => {
    return data.map(item => ({
      time: Math.floor(new Date(item.time).getTime() / 1000),
      value: item.price
    }))
  }
  useEffect(() => {
    const fetchData = async (sportId, assetId) => {
      try {
        setLoading(true)
        const res = await getPlayerPriceChart(sportId, assetId)
        const response = await apiAssetDetails(sportId, assetId)
        setPlayerData(response.data)
        setData(transformData(res.data))
        setLoading(false)
      } catch (err) {
        setError(err)
        setLoading(false)
      }
    }

    fetchData(params.sportId, params.assetId)
  }, [params.sportId, params.assetId])
  return (
    <main className="flex min-h-screen flex-col md:py-24 py-16">
      <div className="py-5 flex flex-col md:flex-row gap-5 justify-between container">
        <div
          role="button"
          onClick={() => router.back()}
          className="flex gap-1 items-center">
          <ChevronLeft />
          <h5 className="text-left">Player overview</h5>
        </div>
        <PeriodSelector {...{ period, setPeriod, periodList }} />
      </div>
      <div className="md:container md:block">
        <Card className="md:p-10 p-5 rounded-none md:rounded-md">
          <PlayerDetails playerData={playerData} />
          <Separator className="md:hidden mt-5" />
          {/* <PlayerData
            data={statsData}
            error={statsError}
            loading={statsLoading}
          /> */}

          <div className="hidden md:flex mt-5 flex-col gap-8">
            <StatsHeader />
            <PlayerStats {...{ period, playerData }} />
          </div>
          <div className="hidden md:flex flex-col gap-8">
            <PriceChartHeader />
            <PlayerPriceChart {...{ data, loading }} />
          </div>
        </Card>
        <StatTabs
          {...{ playerData, data, period, loading }}
          className="md:hidden w-full my-10"
        />
      </div>
    </main>
  )
}
function ErrorMessage() {
  const router = useRouter()
  return (
    <main className="flex min-h-screen flex-col md:py-24 py-16 bg-white">
      <div className="py-5 flex flex-col md:flex-row gap-5 justify-between container">
        <div
          role="button"
          onClick={() => router.back()}
          className="flex gap-1 items-center">
          <ChevronLeft />
          <h5 className="text-left">Player overview</h5>
        </div>
      </div>
      <div className="container">
        <div className="bg-[#DAF1E9] p-3 h-28 rounded-sm flex justify-center items-center text-center w-full gap-2">
          <Info size={18} />
          <p>Player overview not available</p>
        </div>
      </div>
    </main>
  )
}
function StatTabs({ className, playerData, data, period, loading }) {
  return (
    <Tabs defaultValue="stats" className={cn('w-[400px]', className)}>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger
          className="data-[state=active]:bg-white data-[state=active]:text-accent rounded-none data-[state=active]:shadow-none -mb-4"
          asChild
          value="stats">
          <div role="button">
            <StatsHeader />
          </div>
        </TabsTrigger>
        <TabsTrigger
          asChild
          value="priceChart"
          className="data-[state=active]:bg-white data-[state=active]:text-accent rounded-none data-[state=active]:shadow-none -mb-4">
          <div role="button">
            <PriceChartHeader />
          </div>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="stats" className="p-5 bg-white">
        <PlayerStats variant="non-compact" {...{ period, playerData }} />
      </TabsContent>
      <TabsContent value="priceChart" className="p-5 bg-white">
        <PlayerPriceChart {...{ data, loading }} />
      </TabsContent>
    </Tabs>
  )
}
function StatsHeader() {
  return (
    <div className="flex gap-2 items-center">
      <div className="h-6 w-6 relative">
        <Image
          fill
          alt="logo"
          sizes="auto"
          src="/stats.svg"
          className="object-contain"
        />
      </div>
      <h6>Statistics</h6>
    </div>
  )
}
function PriceChartHeader() {
  return (
    <div className="flex gap-2 items-center">
      <div className="h-6 w-6 relative">
        <Image
          fill
          alt="logo"
          sizes="auto"
          src="/chart.svg"
          className="object-contain"
        />
      </div>
      <h6>Price Chart</h6>
    </div>
  )
}
