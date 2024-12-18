'use client'

import withAuth from '@/lib/withAuth'

function Layout({ children }) {
  return <>{children}</>
}

export default withAuth(Layout)
