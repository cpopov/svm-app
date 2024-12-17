import { useEffect, useState } from 'react'

import useAuth from './useAuth'
import { useRouter } from 'next/navigation'

const withAuth = WrappedComponent => {
  return function WithAuthComponent(props) {
    const router = useRouter()
    const { isAuthenticate, token } = useAuth()
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
      checkAuth()
    }, [token])

    const checkAuth = () => {
      if (isAuthenticate) {
        setIsAuthenticated(true)
      } else {
        router.push('/sign-in')
      }
    }

    // Only render wrapped component if authenticated
    return isAuthenticated ? <WrappedComponent {...props} /> : null
  }
}

export default withAuth
