import axios from 'axios'

export const instanceOne = () => {
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
      'Content-type': 'application/json'
    }
  })

  return axiosInstance
}
export const instanceTwo = () => {
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL_STATS,
    headers: {
      'Content-type': 'application/json'
    }
  })

  return axiosInstance
}
