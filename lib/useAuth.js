'use client'

import { useSelector } from 'react-redux'

const useAuth = () => {
  const user = useSelector(state => state.user)
  return {
    isAuthenticate: Boolean(user?.token),
    user: user?.data,
    token: user?.token
  }
}

export default useAuth
