import { instanceOne, instanceTwo } from './axios'

const http = instanceOne()
const http2 = instanceTwo()

// apiSignUpUser
export const apiSignUpUser = data => http.post(`/users/register`, data)
export const apiLogin = data => http.post(`/users/login`, data)

export const getPlayersList = ({
  search,
  league,
  team,
  country,
  sort,
  dir,
  page,
  sport,
  pageSize
}) => http.get(`/market/${sport}?page=${page}&pageSize=${pageSize}`)

/**
 * Get the player details
 * @param address token address
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const getUserPortfolio = ({
  address,
  search,
  league,
  team,
  country,
  sort,
  sport,
  dir
}) =>
  http.get(
    `/portfolio/${address}?market=${sport}&search=${search}&country=${country}&league=${league}&team=${team}&sort=${sort}&dir=${dir}`
  )

export const getSportFilters = ({ sport, item }) =>
  http.get(`/markets/${sport}/${item}`)

export const getPlayerDetails = (sportId, playerId) =>
  http2.get(`/players/${sportId}/${playerId}`)

export const getPlayerStats = (sportId, playerId, period) =>
  http2.get(`/players/${sportId}/${playerId}/stats?period=${period}`)

export const getPlayerPriceChart = (sportId, playerId, period) =>
  http.get(`/tokens/${sportId}/${playerId}/prices`)
