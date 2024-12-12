import { Button } from './ui/button'
import React from 'react'
import { Skeleton } from './ui/skeleton'
import { Switch } from './ui/switch'

function PlayerData({ data, error, loading = false }) {
  if (loading) return <Loader />
  if (!data || error) return null
  return (
    <div className="lg:px-10 md:p-5 md:rounded-md flex flex-wrap md:justify-evenly gap-4 my-5 md:my-10 md:border md:shadow-md md:hover:shadow-none duration-300">
      <div className="hidden md:block">
        <p className="font-bold text-accent-dark">MY PORTFOLIO</p>
        <p className="text-3xl font-semibold gradient-text">15,000.00</p>
      </div>
      <div className="hidden flex-col justify-between md:flex">
        <p className="font-semibold">SCORE:</p>
        <p className="font-bold">
          <span className="pr-1">1,522</span>
          <span className="text-green-500">+0,121</span>
        </p>
      </div>
      <div className="hidden flex-col justify-between md:flex">
        <p className="font-semibold">PRICE:</p>
        <p className="font-bold">
          <span className="pr-1">1,522</span>
          <span className="text-green-500">+0,121</span>
        </p>
      </div>
      <div className="md:hidden flex justify-between w-full">
        <div className="flex flex-col justify-between">
          <p className="font-semibold">SCORE:</p>
          <div className="font-bold flex md:flex-row flex-col">
            <p className="pr-1">1,522</p>
            <p className="text-green-500">+0,121</p>
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <p className="font-semibold">PRICE:</p>
          <div className="font-bold flex md:flex-row flex-col">
            <p className="pr-1">1,522</p>
            <p className="text-green-500">+0,121</p>
          </div>
        </div>
        <div className="flex flex-col sm:justify-between">
          <p className="font-semibold">
            GET
            <br /> REWARDS
          </p>
          <Switch />
          {/* <Switch checked={field.value} onCheckedChange={field.onChange} /> */}
        </div>
      </div>
      <div className="hidden md:flex flex-col sm:justify-between">
        <p className="font-semibold">GET REWARDS</p>
        <Switch />
        {/* <Switch checked={field.value} onCheckedChange={field.onChange} /> */}
      </div>
      <div className="flex flex-row gap-0 mt-auto md:w-fit w-full">
        <Button
          className="rounded-r-none border-accent font-medium text-accent hover:text-white w-full"
          variant="outline">
          Auto import token
        </Button>
        <Button
          className="rounded-l-none border-accent font-medium text-accent hover:text-white w-full"
          variant="outline">
          Claim free tokens
        </Button>
      </div>
      <div className="flex mt-auto md:w-fit w-full">
        <Button className="bg-accent w-full md:w-28">Trade</Button>
      </div>
    </div>
  )
}
function Loader() {
  return (
    <div className="lg:px-10 p-5 rounded-md flex flex-wrap md:justify-evenly gap-4 my-10 border shadow-md hover:shadow-none duration-300">
      {/* Loading Section */}
      <div>
        <Skeleton className="h-6 w-32 mb-2" />
        <Skeleton className="h-8 w-40" />
      </div>

      <div className="hidden flex-col justify-between md:flex">
        <Skeleton className="h-6 w-20 mb-2" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-12" />
        </div>
      </div>

      <div className="hidden flex-col justify-between md:flex">
        <Skeleton className="h-6 w-20 mb-2" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-12" />
        </div>
      </div>

      <div className="md:hidden flex justify-between w-full">
        <div className="flex flex-col justify-between">
          <Skeleton className="h-6 w-20 mb-2" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-12" />
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <Skeleton className="h-6 w-20 mb-2" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-12" />
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:justify-between">
        <Skeleton className="h-6 w-32 mb-2" />
        <Skeleton className="h-8 w-20" />
      </div>

      <div className="flex sm:flex-row flex-col gap-4 sm:gap-0 mt-auto w-32">
        <Skeleton className="h-10 w-full sm:rounded-r-none" />
        <Skeleton className="h-10 w-full sm:rounded-l-none" />
      </div>

      <div className="flex mt-auto">
        <Skeleton className="h-10 w-28" />
      </div>
    </div>
  )
}

export default PlayerData
