'use client'

import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { Info, MoveRight, X } from 'lucide-react'
import React, { useState } from 'react'

import { Badge } from './ui/badge'
import Image from 'next/image'
import { PlayerStatsChart } from './PlayerStatsChart'
import { Skeleton } from './ui/skeleton'
import { getSportIcon } from '@/lib/constants'

function PlayerDetails({ data, loading = false }) {
  if (loading) return <Loader />
  if (!data) return <ErrorMessage />
  return (
    <div className="md:grid flex flex-col md:grid-cols-5 gap-5">
      <div className="md:col-span-2 flex w-full md:flex-row md:justify-normal justify-between flex-row-reverse gap-4">
        <div className="shrink-0 aspect-square relative w-36 h-36 rounded-full p-[4px] bg-gradient-to-r from-[#009694] to-[#65f53d] overflow-hidden">
          {data?.photo ? (
            <div className="w-full h-full rounded-full bg-white relative overflow-hidden">
              <Image
                sizes="auto"
                src={data?.photo}
                alt=""
                fill
                className="object-contain"
              />
            </div>
          ) : null}
        </div>
        <div className="flex flex-col justify-center">
          <h6 className="text-accent-dark font-bold">{data?.name}</h6>
          <GeneralDetails {...{ data }} />
          <div className="md:hidden mt-auto">
            <p className="font-bold text-accent-dark">MY PORTFOLIO</p>
            <p className="text-3xl font-semibold gradient-text">15,000.00</p>
          </div>
          <div className="hidden md:flex gap-2">
            <Image width={16} height={16} src={getSportIcon(data?.sport)} />
            {data?.position ? (
              <Badge
                className="rounded-full text-accent-dark font-normal bg-[#EBEDF0] w-fit h-fit text-sm"
                variant="outline">
                {data?.position}
              </Badge>
            ) : null}
          </div>
        </div>
      </div>
      <div className="hidden md:grid col-span-3 rounded-md gap-4 md:grid-cols-3">
        <div>
          <p className="font-bold text-accent-dark mb-2">ABOUT</p>
          <div className="flex gap-4 md:justify-start justify-between">
            <div>
              <p className="text-black/50 text-sm">Sport</p>
              <p className="text-black/50 text-sm">League</p>
              <p className="text-black/50 text-sm">Team</p>
              <p className="text-black/50 text-sm">Position</p>
            </div>
            <div>
              <p className="font-semibold text-sm text-left">{data?.sport}</p>
              <p className="font-semibold text-sm text-left">
                {data?.leagueName}
              </p>
              <p className="font-semibold text-sm text-left">
                {data?.teamName}
              </p>
              <p className="font-semibold text-sm text-left">
                {data?.position}
              </p>
            </div>
          </div>
        </div>
        <div>
          <p className="font-bold text-accent-dark mb-2">BIO</p>
          <div className="flex gap-4 md:justify-start justify-between">
            <div>
              <p className="text-black/50 text-sm">Age</p>
              <p className="text-black/50 text-sm">Weight</p>
              <p className="text-black/50 text-sm">Height</p>
              <p className="text-black/50 text-sm">Nationality</p>
            </div>
            <div>
              <p className="font-semibold text-sm text-left">{data?.age}</p>
              <p className="font-semibold text-sm text-left">{data?.weight}</p>
              <p className="font-semibold text-sm text-left">{data?.height}</p>
              <p className="font-semibold text-sm text-left">
                {data?.nationality}
              </p>
            </div>
          </div>
        </div>
        <div className="">
          <p className="font-bold text-accent-dark mb-2">
            AVG. GOALS BY SEASON
          </p>
          <PlayerStatsChart />
        </div>
      </div>
    </div>
  )
}
function Loader() {
  return (
    <div className="grid lg:grid-cols-5 gap-5">
      {/* Left Section */}
      <div className="col-span-2 flex gap-4">
        <div className="shrink-0 aspect-square relative md:w-36 md:h-36 w-20 h-20 rounded-full p-[2px] bg-gradient-to-r from-[#009694] to-[#65f53d] overflow-hidden">
          <div className="w-full h-full rounded-full bg-white relative overflow-hidden">
            <Skeleton className="w-full h-full object-contain rounded-full" />
          </div>
        </div>
        <div className="flex flex-col">
          <Skeleton className="h-6 w-32 mb-2" />
          <div className="flex gap-1 mt-2">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-20" />
          </div>
          <div className="flex gap-1 mt-2">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-20" />
          </div>
          <div className="mt-auto flex gap-2">
            <Skeleton className="h-5 w-28" />
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="col-span-3 rounded-md gap-4 grid md:grid-cols-3">
        {/* Bio Section */}
        <div>
          <Skeleton className="h-6 w-20 mb-2" />
          <div className="flex gap-4">
            <div>
              <Skeleton className="h-5 w-16 mb-1" />
              <Skeleton className="h-5 w-16 mb-1" />
              <Skeleton className="h-5 w-16 mb-1" />
              <Skeleton className="h-5 w-16 mb-1" />
              <Skeleton className="h-5 w-16 mb-1" />
            </div>
            <div>
              <Skeleton className="h-5 w-20 mb-1" />
              <Skeleton className="h-5 w-20 mb-1" />
              <Skeleton className="h-5 w-20 mb-1" />
              <Skeleton className="h-5 w-20 mb-1" />
              <Skeleton className="h-5 w-20 mb-1" />
            </div>
          </div>
        </div>

        {/* Avg Goals Section */}
        <div>
          <Skeleton className="h-6 w-40 mb-2" />
          <Skeleton className="h-24 w-full" />
        </div>

        {/* Portfolio Section */}
        <div className="flex flex-col">
          <Skeleton className="h-6 w-40 mb-2" />
          <Skeleton className="h-10 w-32 mt-auto mb-5" />
          <Skeleton className="h-8 w-28 border rounded-md" />
        </div>
      </div>
    </div>
  )
}

export default PlayerDetails
function GeneralDetails({ data }) {
  const [open, setOpen] = useState(false)
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <div role="button">
          <p className="md:hidden flex items-center gap-1 text-accent">
            General details
            <span>
              <MoveRight size={18} className="mt-1" />
            </span>
          </p>
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <div className="w-full px-5">
          <div className="flex justify-between">
            <h6 className="text-accent">General details</h6>
            <X role="button" onClick={() => setOpen(false)} />
          </div>
          <div className="my-5 space-y-3">
            <div>
              <p className="font-bold text-accent-dark mb-2">ABOUT</p>
              <div className="flex gap-10">
                <div className="basis-1/2">
                  <p>Sport</p>
                  <p>League</p>
                  <p>Team</p>
                  <p>Position</p>
                </div>
                <div className="capitalize">
                  <p className="font-semibold text-left">{data?.sport}</p>
                  <p className="font-semibold text-left">{data?.leagueName}</p>
                  <p className="font-semibold text-left">{data?.teamName}</p>
                  <p className="font-semibold text-left">{data?.position}</p>
                </div>
              </div>
            </div>
            <div>
              <p className="font-bold text-accent-dark mb-2">BIO</p>
              <div className="flex gap-10">
                <div className="basis-1/2">
                  <p>Age</p>
                  <p>Weight</p>
                  <p>Height</p>
                  <p>Nationality</p>
                </div>
                <div>
                  <p className="font-semibold text-left">{data?.age}</p>
                  <p className="font-semibold text-left">{data?.weight}</p>
                  <p className="font-semibold text-left">{data?.height}</p>
                  <p className="font-semibold text-left">{data?.nationality}</p>
                </div>
              </div>
            </div>
            <div>
              <p className="font-bold text-accent-dark mb-2">
                AVG. GOALS BY SEASON
              </p>
              <PlayerStatsChart />
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
function ErrorMessage() {
  return (
    <div className="mb-5">
      <div className="bg-[#DAF1E9] p-3 h-28 rounded-sm flex justify-center items-center text-center w-full gap-2">
        <Info size={18} />
        <p>Player overview not available</p>
      </div>
    </div>
  )
}
