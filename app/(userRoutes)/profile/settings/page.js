'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import React, { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Trash2 } from 'lucide-react'
import { apiDeleteUser } from '@/actions'
import { setLogOutState } from '@/lib/redux'
import { toast } from '@/components/ui/use-toast'
import useAuth from '@/lib/useAuth'
import { useDispatch } from 'react-redux'

function Account() {
  const { token } = useAuth()
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false)
  const handleClick = async () => {
    try {
      await apiDeleteUser(token)
      toast({
        title: 'Your account has been successfully deleted.'
      })
      dispatch(setLogOutState())
    } catch (error) {
      console.log('error', error)
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
    <main className="flex min-h-screen flex-col md:py-24 py-16">
      <div className="py-5 flex flex-col gap-5 md:justify-between container justify-center">
        <h5 className="md:text-left text-center">Account Settings</h5>
        <Card className="p-5 space-y-4">
          <div className="space-y-1">
            <h4 className="text-sm font-medium leading-none">Delete account</h4>
            <p className="text-sm text-muted-foreground">
              Account deletion permanently removes your account, including all
              associated data and content. This action is irreversible.
            </p>
          </div>
          <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                Delete Account <Trash2 size={16} />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-600 hover:bg-red-800"
                  onClick={handleClick}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </Card>
      </div>
    </main>
  )
}

export default Account
