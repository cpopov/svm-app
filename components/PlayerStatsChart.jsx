'use client'

import { Bar, BarChart, XAxis, YAxis } from 'recharts'

import { ChartContainer } from '@/components/ui/chart'

const chartData = [
  { year: '24/25', desktop: 3 },
  { year: '23/24', desktop: 5 },
  { year: '22/23', desktop: 2.5 }
]

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: '#009694'
  }
}

export function PlayerStatsChart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[130px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <XAxis dataKey="year" />
        <YAxis />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={1} />
      </BarChart>
    </ChartContainer>
  )
}
