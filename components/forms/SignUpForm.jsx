'use client'

import * as z from 'zod'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { apiGetUserDetails, apiSignUpUser } from '@/actions'
import { setLoginState, setToken } from '@/lib/redux'
import { toast, useToast } from '../ui/use-toast'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { PasswordInput } from '../ui/passwordField'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'

const FormSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: 'This is required' })
      .email('Enter a proper email'),
    username: z.string().min(2, { message: 'Username is required' }),
    fullName: z.string().min(1, { message: 'Full name is required' }),
    password: z
      .string()
      .min(8, {
        message: 'Password must be at least 8 characters long.'
      })
      .refine(val => /[A-Z]/.test(val), {
        message: 'Password must include at least one uppercase letter.'
      })
      .refine(val => /[a-z]/.test(val), {
        message: 'Password must include at least one lowercase letter.'
      })
      .refine(val => /[0-9]/.test(val), {
        message: 'Password must include at least one number.'
      })
      .refine(val => /[#?!@$%^&*-]/.test(val), {
        message: 'Password must include at least one special character.'
      }),
    confirmPassword: z.string().min(1, {
      message: 'Required.'
    })

    // referalCode: z.string().optional()
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
  })

export function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const form = useForm({
    resolver: zodResolver(FormSchema)
  })
  const dispatch = useDispatch()
  const onSubmit = async data => {
    const formData = {
      ...data
    }
    setIsLoading(true)
    try {
      apiSignUpUser(formData)
        .then(res => {
          setIsLoading(false)
          if (res?.data?.token) {
            toast({
              title: 'Login success!'
            })
            dispatch(setToken(res.data.token))
            return apiGetUserDetails(res.data.token)
          } else {
            toast({
              title: 'Login failed, no token returned.'
            })
            return Promise.reject('No token received')
          }
        })
        .then(res => {
          dispatch(setLoginState(res.data))
        })
        .catch(error => {
          setIsLoading(false)
          toast({
            title: 'An error occurred!',
            description: error.message || error || 'Please try again.'
          })
        })
    } catch (error) {
      setIsLoading(false)
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description:
          error?.response?.data?.error ||
          'There was a problem with your request.'
      })
    }
  }

  return (
    <Card className="md:mx-auto md:min-w-96 min-w-full">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Register account</CardTitle>
        <CardDescription className="text-center">
          Already have an account?{' '}
          <Link className="text-accent" href="/sign-in">
            Sign In
          </Link>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="username">Username</FormLabel>
                    <FormControl>
                      <Input
                        id="username"
                        type="text"
                        placeholder="john"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="fullName">Full name</FormLabel>
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        type="password"
                        placeholder="Enter password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="max-w-80" />
                    {/* <FormDescription>
                      <Link
                        className="text-primary hover:underline text-base"
                        href={'/password-reset'}>
                        Forgot password?
                      </Link>
                    </FormDescription> */}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full bg-[#057E6E]">
                Register Account
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
