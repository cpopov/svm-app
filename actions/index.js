import { instanceOne, instanceThree, instanceTwo } from './axios'

const http = instanceOne()
const http2 = instanceTwo()
const http3 = instanceThree()

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
}) =>
  http.get(`/market/${sport}`, {
    params: {
      search,
      league,
      team,
      country,
      sort,
      dir,
      page,
      sport,
      pageSize
    }
  })

/**
 * Get the player details
 * @param address token address
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export const getUserPortfolio = (
  { search, league, team, country, sort, sport, dir },
  token
) =>
  http.get(
    `/users/portfolio?market=${sport}&search=${search}&country=${country}&league=${league}&team=${team}&sort=${sort}&dir=${dir}`,
    {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-type': 'application/json'
      }
    }
  )

export const getSportFilters = ({ sport, item }) =>
  http.get(`/market/${sport}/${item}`)

export const getPlayerDetails = (sportId, playerId) =>
  http2.get(`/players/${sportId}/${playerId}`)

export const getPlayerStats = (sportId, playerId, period) =>
  http2.get(`/players/${sportId}/${playerId}/stats?period=${period}`)

export const getPlayerPriceChart = (sportId, playerId, period) =>
  http3.get(`/market/${sportId}/${playerId}/prices`)
