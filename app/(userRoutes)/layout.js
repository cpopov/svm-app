'use client'

import Navbar from '@/components/Navbar'
import withAuth from '@/lib/withAuth'

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <div>{children}</div>
    </>
  )
}

export default withAuth(Layout)
