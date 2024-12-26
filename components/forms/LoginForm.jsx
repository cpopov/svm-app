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
import { apiGetUserDetails, apiLogin } from '@/actions'
import { setLoginState, setToken } from '@/lib/redux'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { PasswordInput } from '../ui/passwordField'
import { RotateCw } from 'lucide-react'
import { toast } from '../ui/use-toast'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'

const FormSchema = z.object({
  username: z.string().min(1, { message: 'Email is required' }),
  password: z.string().min(1, { message: 'Password is required' })
})

export function LoginForm() {
  const form = useForm({
    resolver: zodResolver(FormSchema)
  })
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch()
  const onSubmit = async data => {
    setIsLoading(true)
    try {
      apiLogin(data)
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
          error?.response?.data?.response?.message ||
          'There was a problem with your request.'
      })
    }
  }

  return (
    <Card className="md:mx-auto md:min-w-96 min-w-full">
      <CardHeader>
        <CardTitle className="text-2xl text-center">
          Sign in to your account
        </CardTitle>
        <CardDescription className="text-center">
          New to SVT?{' '}
          <Link className="text-accent" href="/sign-up">
            Create account
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
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center">
                      <FormLabel htmlFor="password">Password</FormLabel>
                      {/* <Link
                        href="#"
                        className="ml-auto inline-block text-sm underline">
                        Forgot your password?
                      </Link> */}
                    </div>
                    <FormControl>
                      <PasswordInput
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-[#057E6E]">
                {isLoading ? (
                  <RotateCw size={16} className="animate-spin" />
                ) : (
                  'Sign In'
                )}
              </Button>
            </div>
          </form>
        </Form>
        {/* <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{' '}
          <Link href="/sign-up" className="underline">
            Sign up
          </Link>
        </div> */}
      </CardContent>
    </Card>
  )
}
