'use client'

import AccountForm from '@/components/forms/AccountForm'
import React from 'react'

function Account() {
  return (
    <main className="flex min-h-screen flex-col md:py-24 py-16">
      <div className="py-5 flex flex-col gap-5 md:justify-between container justify-center">
        <h5 className="md:text-left text-center">Account Details</h5>
        <AccountForm />
      </div>
    </main>
  )
}

export default Account
