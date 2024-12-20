'use client'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { apiGetUserDetails, apiPostUserDetails } from '@/actions'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { setLoginState } from '@/lib/redux'
import { toast } from '../ui/use-toast'
import useAuth from '@/lib/useAuth'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const FormSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  displayName: z.string().min(1, { message: 'Display name is required' }),
  streetAddress: z.string().min(1, { message: 'Address is required' }),
  email: z.string().email({ message: 'Invalid email' }),
  marketingPreferences: z.enum([
    'none',
    'thirdPartyPromotions',
    'promosAndBonuses',
    'importantAnnouncements',
    'payoutSummary'
  ])
})

export default function AccountForm() {
  const { user, token } = useAuth()
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: user?.fullName,
      displayName: user?.displayName,
      streetAddress: user?.streetAddress,
      email: user?.email,
      marketingPreferences: 'none'
    }
  })
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const fetchUserData = async () => {
    try {
      let res = await apiGetUserDetails(token)
      dispatch(setLoginState(res.data))
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchUserData()
  }, [token])

  const onSubmit = async data => {
    setIsLoading(true)
    try {
      let res = await apiPostUserDetails(data, token)
      fetchUserData()
      setIsLoading(false)
      toast({
        title: 'Account updated successfully!'
      })
    } catch (error) {
      console.log('error', error)
      setIsLoading(false)
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was an issue updating your account.'
      })
    }
  }

  return (
    <div className="max-w-xl p-4">
      {/* <h2 className="text-2xl text-center mb-6">Account Information</h2> */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <FormControl>
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="displayName">Display Name</FormLabel>
                  <FormControl>
                    <Input
                      id="displayName"
                      type="text"
                      placeholder="johnny"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="streetAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="streetAddress">Address</FormLabel>
                  <FormControl>
                    <Input
                      id="streetAddress"
                      type="text"
                      placeholder="123 Main St, City, Country"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john.doe@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="marketingPreferences"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Marketing Preferences</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-3">
                      <FormItem className="flex items-center space-x-3">
                        <FormControl>
                          <RadioGroupItem value="thirdPartyPromotions" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Third party promotions
                        </FormLabel>
                      </FormItem>

                      <FormItem className="flex items-center space-x-3">
                        <FormControl>
                          <RadioGroupItem value="promosAndBonuses" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Promos and bonuses
                        </FormLabel>
                      </FormItem>

                      <FormItem className="flex items-center space-x-3">
                        <FormControl>
                          <RadioGroupItem value="importantAnnouncements" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Important announcements
                        </FormLabel>
                      </FormItem>

                      <FormItem className="flex items-center space-x-3">
                        <FormControl>
                          <RadioGroupItem value="payoutSummary" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Payout summary
                        </FormLabel>
                      </FormItem>

                      <FormItem className="flex items-center space-x-3">
                        <FormControl>
                          <RadioGroupItem value="none" />
                        </FormControl>
                        <FormLabel className="font-normal">None</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-[#057E6E]"
              disabled={isLoading}>
              {isLoading ? 'Updating...' : 'Update Account'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
