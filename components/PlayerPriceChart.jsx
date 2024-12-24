'use client'

import React, { useEffect, useRef, useState } from 'react'

import { createChart } from 'lightweight-charts'

const PlayerPriceChart = ({ data: chartData, loading, error = null }) => {
  const chartContainerRef = useRef(null)
  const chartRef = useRef(null)
  const seriesRef = useRef(null)

  const [range, setRange] = useState('1D')

  // Function to filter chart data based on the range
  const filterDataByRange = range => {
    const now = new Date()
    switch (range) {
      case '1D':
        return chartData.slice(-1) // Show only the last data point
      case '1W': {
        const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        return chartData.filter(data => new Date(data.time) >= oneWeekAgo)
      }
      case '1M': {
        const oneMonthAgo = new Date(
          now.getFullYear(),
          now.getMonth() - 1,
          now.getDate()
        )
        return chartData.filter(data => new Date(data.time) >= oneMonthAgo)
      }
      case '1Y': {
        const oneYearAgo = new Date(
          now.getFullYear() - 1,
          now.getMonth(),
          now.getDate()
        )
        return chartData.filter(data => new Date(data.time) >= oneYearAgo)
      }
      case 'All Time':
        return chartData
      default:
        return chartData
    }
  }

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
      seriesRef.current.setData(filterDataByRange(range))

      // Adjust zoom to fit the data
      chartRef.current.timeScale().fitContent()
    }

    return () => {
      // Cleanup chart on component unmount
      if (chartRef.current) {
        chartRef.current.remove()
        chartRef.current = null
      }
    }
  }, [chartData])

  useEffect(() => {
    // Update chart data on range change
    if (seriesRef.current) {
      const filteredData = filterDataByRange(range)
      seriesRef.current.setData(filteredData)
    }
  }, [range, chartData])

  const handleRangeChange = newRange => {
    setRange(newRange)
  }

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
        <div style={{ textAlign: 'center' }}>
          {['1D', '1W', '1M', '1Y', 'All Time'].map(key => (
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
        </div>
      </div>
    )
}

export default PlayerPriceChart
