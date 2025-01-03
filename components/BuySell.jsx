'use client'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import React, { useEffect, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react'
import { apiTransactToken } from '@/actions'
import { getTimestampInSeconds } from '@/lib/utils'
import useAuth from '@/lib/useAuth'
import { useForm } from 'react-hook-form'
import { useToast } from '@/components/ui/use-toast'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

// import {
//   buyTokenWithSign,
//   sellTokenWithSign,
//   readEstimate,
//   formatUSDC,
//   formatToken,
//   usdcAddress,
//   formatEth
// } from '@/lib/contract-utils'

const BuySell = ({
  action = 'buy',
  data,
  balance,
  balanceUsdc,
  setIsDialogOpen,
  setRefresh,
  setAction
}) => {
  const [isSubmit, setIsSubmit] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [estimateBuyAmount, setEstimateBuyAmount] = useState(0)
  const [estimateSellAmount, setEstimateSellAmount] = useState(0)
  const [isfetch, setIsfetch] = useState(false)
  const { toast } = useToast()
  const { token } = useAuth()
  // const { address } = useAccount()
  // const chainId = useChainId()
  // const signer = useEthersSigner({ chainId })
  const FormSchema = z.object({
    amount: z
      .number()
      .positive('Amount must be positive.')
      .min(0.01, 'Minimum amount is 0.01.')
  })
  const form = useForm({
    resolver: zodResolver(FormSchema),
    mode: 'onChange' // This will make validation run on every change
  })

  // const onSubmit = async (rowData, action) => {
  const onSubmit = async values => {
    console.log('select data', data)
    setIsLoading(true)

    try {
      // if (action === 'buy') {
      //   await apiTransactToken(
      //     signer,
      //     address,
      //     data.issuerAddr,
      //     rowData.amount,
      //     deadline,
      //     chainId
      //   )
      // } else {
      //   await sellTokenWithSign(
      //     signer,
      //     address,
      //     data.issuerAddr,
      //     rowData.amount,
      //     deadline,
      //     data.tokenAddr,
      //     chainId
      //   )
      // }

      // setIsDialogOpen(false)
      // setRefresh(new Date())
      const formData = {
        assetId: data?.id,
        direction: action,
        qty: values?.amount,
        market: data?.market
      }
      console.log('formData', formData)
      let res = await apiTransactToken(formData, token)
      toast({
        title: `Order has been submitted!`
      })

      setIsLoading(false)
    } catch (error) {
      console.log(error.message)
      toast({
        variant: 'destructive',
        title: `Transaction failed!`
      })
      setIsLoading(false)
    }
    setIsSubmit(false)
  }
  return (
    <Tabs
      defaultValue={action}
      className="w-full md:px-10"
      onValueChange={value => setAction(value)}>
      <TabsList className="grid w-fit grid-cols-2 mx-auto">
        <TabsTrigger className="w-[80px] px-3" value="buy">
          Buy
        </TabsTrigger>
        <TabsTrigger className="w-[80px] px-3" value="sell">
          Sell
        </TabsTrigger>
      </TabsList>
      <Form {...form}>
        <TabsContent value="buy">
          <form
            className="space-y-6"
            onSubmit={form.handleSubmit(data => onSubmit(data, 'buy'))}>
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter amount of USDC</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      {...field}
                      onChange={e => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription className="text-accent">
                    {form.getValues('amount') && (
                      <span>
                        You will get {form.getValues('amount') / data.price}{' '}
                        tokens
                      </span>
                    )}
                    {estimateBuyAmount > 0 && (
                      <span>
                        You will get{' '}
                        {isfetch ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin inline-block" />
                        ) : (
                          <b>{estimateBuyAmount}</b>
                        )}{' '}
                        (estimated) {data.name} tokens
                      </span>
                    )}
                    {estimateBuyAmount === 0 && isfetch && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin inline-block" />
                    )}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex text-sm border rounded-full px-2 w-fit mx-auto">
              <p className="font-thin">USDC Balance:</p>{' '}
              <p className="font-semibold ml-2">
                --
                {/* {parseFloat(formatEth(balanceUsdc?.toString())).toFixed(2)} */}
              </p>
            </div>

            <Button
              disabled={!form.formState.isValid || isSubmit || isError}
              className="w-full"
              type="submit">
              {isSubmit && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Buy
            </Button>
          </form>
        </TabsContent>
        <TabsContent value="sell">
          <form
            onSubmit={form.handleSubmit(data => onSubmit(data, 'sell'))}
            className="space-y-6">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter amount of tokens</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      {...field}
                      onChange={e => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription className="text-accent">
                    {form.getValues('amount') && (
                      <span>
                        You will get {form.getValues('amount') * data.price} $
                      </span>
                    )}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex text-sm border rounded-full px-2 w-fit mx-auto">
              <p className="font-thin">Token Balance:</p>{' '}
              <p className="font-semibold ml-2">
                --
                {/* {parseFloat(ethers.formatEther(balance?.toString())).toFixed(2)} */}
              </p>
            </div>
            <Button
              disabled={!form.formState.isValid || isSubmit || isError}
              className="w-full"
              type="submit">
              {isSubmit && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Sell
            </Button>
          </form>
        </TabsContent>
      </Form>
    </Tabs>
  )
}

export default BuySell
