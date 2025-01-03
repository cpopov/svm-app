'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import React, { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import BuySell from '@/components/BuySell'
import Image from 'next/image'
import { cn } from '@/lib/utils'

// import { balanceOf, balanceOfUsdc } from '@/lib/contract-utils'

function TradeButton({
  data,
  ctaText = 'TRADE',
  variant = 'default',
  className
}) {
  const cta =
    data.status === 'unlisted' || undefined
      ? 'PRE SALE'
      : data?.paused
      ? 'PAUSED'
      : ctaText
  const isDisabled =
    data.status === 'unlisted' || undefined ? true : data?.paused ? true : false
  // const { address, isConnected } = useAccount()
  const [action, setAction] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [balance, setBalance] = useState(0)
  const [balanceUsdc, setBalanceUsdc] = useState(0)
  const [refresh, setRefresh] = useState(new Date())

  // Reset action when dialog closed
  useEffect(() => {
    if (!isDialogOpen) {
      setAction('')
    }
  }, [isDialogOpen])

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant={variant}
          disabled={isDisabled}
          className={cn('my-auto w-20', className)}>
          {cta}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-medium">Trade</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="bg-muted rounded-md flex items-center gap-3 p-3">
            <div className="relative h-12 w-12 rounded-full overflow-clip border-accent border-2">
              <Image
                src={data?.photo || '/player_image.jpg'}
                className="mr-2 object-contain"
                fill
                sizes="auto"
                alt=""
              />
            </div>
            <div>
              <p className="text-accent-dark font-semibold">
                {data?.name}
                <span className="text-black/50">{` (${data?.symbol})`}</span>
              </p>
              <div className="flex text-sm font-medium gap-1 text-black/50">
                <p>{data?.team}</p>
                <p>.</p>
                <p>{data?.position}</p>
              </div>
            </div>
            <div className="ml-auto">
              <p className="text-sm uppercase text-right">Price</p>
              <p className="text-accent font-semibold">${data?.price}</p>
            </div>
          </div>
          {action ? (
            <BuySell
              {...{
                action,
                data,
                balance,
                setIsDialogOpen,
                setRefresh,
                setAction,
                balanceUsdc
              }}
            />
          ) : (
            <div className="flex flex-col gap-4 py-5 items-center justify-center">
              <div className="flex text-sm border rounded-full px-2 w-fit">
                <p className="font-thin">Current Balance: </p>
                <p className="font-semibold ml-2">
                  {/* {parseFloat(ethers.formatEther(balance?.toString())).toFixed(
                    3
                  )} */}
                </p>
              </div>
              <div className="flex gap-5">
                <Button className="w-[100px]" onClick={() => setAction('buy')}>
                  Buy
                </Button>
                <Button className="w-[100px]" onClick={() => setAction('sell')}>
                  Sell
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default TradeButton
