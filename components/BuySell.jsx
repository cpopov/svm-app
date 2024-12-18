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

const BuySell = ({ action = 'buy', data, setAction, setIsDialogOpen }) => {
  const [isSubmit, setIsSubmit] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [estimateBuyAmount, setEstimateBuyAmount] = useState(0)
  const [estimateSellAmount, setEstimateSellAmount] = useState(0)
  const [isfetch, setIsfetch] = useState(false)
  const { toast } = useToast()
  const { token } = useAuth()
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
      setIsDialogOpen(false)

      setIsLoading(false)
    } catch (error) {
      console.log(error.message)
      toast({
        variant: 'destructive',
        title: `Transaction failed!`
      })
      setIsDialogOpen(false)
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
                  <FormLabel>Enter amount of SVP</FormLabel>
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
                        You will get{' '}
                        {Number(form.getValues('amount') / data.price).toFixed(
                          2
                        )}{' '}
                        tokens
                      </span>
                    )}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <div className="flex text-sm border rounded-full px-2 w-fit mx-auto">
              <p className="font-thin">USDC Balance:</p>{' '}
              <p className="font-semibold ml-2">
                --
              </p>
            </div> */}

            <Button
              disabled={!form.formState.isValid || isSubmit || isError}
              className="w-full"
              type="submit">
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                'Buy'
              )}
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
                        You will get{' '}
                        {Number(form.getValues('amount') * data.price).toFixed(
                          2
                        )}{' '}
                        SVP
                      </span>
                    )}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <div className="flex text-sm border rounded-full px-2 w-fit mx-auto">
              <p className="font-thin">Token Balance:</p>{' '}
              <p className="font-semibold ml-2">--</p>
            </div> */}
            <Button
              disabled={!form.formState.isValid || isSubmit || isError}
              className="w-full"
              type="submit">
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                'Sell'
              )}
            </Button>
          </form>
        </TabsContent>
      </Form>
    </Tabs>
  )
}

export default BuySell
