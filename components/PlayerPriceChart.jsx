'use client'

import React, { useEffect, useRef, useState } from 'react'
import { getPlayerPriceChart, getPlayerStats } from '@/actions'

import { createChart } from 'lightweight-charts'

const PlayerPriceChart = ({ sportId, playerId }) => {
  const [chartData, setChartData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const transformData = data => {
    return data.map(item => ({
      time: Math.floor(new Date(item.time).getTime() / 1000),
      value: item.price
    }))
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await getPlayerPriceChart(sportId, playerId)
        setChartData(transformData(res.data))
        setLoading(false)
      } catch (err) {
        setError(err)
        setLoading(false)
      }
    }

    fetchData()
  }, [sportId, playerId])
  const chartContainerRef = useRef(null)
  const chartRef = useRef(null)
  const seriesRef = useRef(null)

  // const [range, setRange] = useState('1D')
  // const rangeOptions = {
  //   '1D': chartData,
  //   '1W': weekData,
  //   '1M': monthData,
  //   '1Y': yearData,
  // }

  useEffect(() => {
    if (!chartContainerRef.current) return

    if (chartData) {
      // Initialize chart
      chartRef.current = createChart(chartContainerRef.current, {
        width: chartContainerRef.current.clientWidth,
        height: 300
      })

      // Add line series
      seriesRef.current = chartRef.current.addLineSeries()

      // Initial data load
      seriesRef.current.setData(chartData)
      // seriesRef.current.setData(rangeOptions[range])
    }

    return () => {
      // Cleanup chart on component unmount
      if (chartRef.current) {
        chartRef.current.remove()
        chartRef.current = null
      }
    }
  }, [chartData])

  // useEffect(() => {
  //   // Update chart data on range change
  //   if (seriesRef.current) {
  //     seriesRef.current.setData(rangeOptions[range])
  //   }
  // }, [range])

  // const handleRangeChange = newRange => {
  //   setRange(newRange)
  // }
  if (error || !chartData)
    return (
      <div className="bg-[#DAF1E9] p-3 rounded-sm flex flex-col justify-center items-center text-center w-full">
        Price chart not available
      </div>
    )
  if (loading) return <p>Loading price chart</p>
  if (chartData.length)
    return (
      <div>
        <div
          ref={chartContainerRef}
          style={{
            position: 'relative',
            marginBottom: '20px'
          }}
        />
        {/* <div style={{ textAlign: 'center' }}>
        {Object.keys(rangeOptions).map(key => (
          <button
            key={key}
            onClick={() => handleRangeChange(key)}
            style={{
              margin: '0 5px',
              padding: '8px 12px',
              background: range === key ? '#007bff' : '#ccc',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}>
            {key.toUpperCase()}
          </button>
        ))}
      </div> */}
      </div>
    )
}

export default PlayerPriceChart
