'use client'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { apiGetUserDetails, apiPostUserDetails } from '@/actions'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '../ui/input'
import { setLoginState } from '@/lib/redux'
import { toast } from '../ui/use-toast'
import useAuth from '@/lib/useAuth'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const FormSchema = z.object({
  fullName: z.string().min(1, { message: 'Full Name is required' }),
  displayName: z.string().min(1, { message: 'Display name is required' }),
  streetAddress: z.string().optional(),
  email: z.string().email({ message: 'Invalid email' }),
  marketing_email: z.boolean().default(false),
  marketing_phone: z.boolean().default(false),
  marketing_push: z.boolean().default(false),
  marketing_sms: z.boolean().default(false)
})

export default function AccountForm() {
  const { user, token } = useAuth()
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fullName: user?.fullName,
      displayName: user?.displayName,
      streetAddress: user?.streetAddress,
      email: user?.email,
      marketing_email: user?.marketing_email || false,
      marketing_phone: user?.marketing_phone || false,
      marketing_push: user?.marketing_push || false,
      marketing_sms: user?.marketing_sms || false
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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="fullName">Full Name</FormLabel>
                  <FormControl>
                    <Input
                      id="fullName"
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
            <p>Marketing Preferences</p>
            <FormField
              control={form.control}
              name="marketing_email"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-3">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Email Notifications</FormLabel>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="marketing_phone"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-3">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Phone Notifications</FormLabel>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="marketing_push"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-3">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Push Notifications</FormLabel>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="marketing_sms"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-3">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>SMS Notifications</FormLabel>
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
