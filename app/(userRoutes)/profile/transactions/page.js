'use client'

import { ArrowRight, ChevronDown } from 'lucide-react'
import { useEffect, useState } from 'react'

import { DatePicker } from '@/components/DatePicker'
import Filter from '@/components/Filter'
import FilterBadge from '@/components/FilterBadge'
import SearchBox from '@/components/SearchBox'
import SportFilter from '@/components/ui/SportFilter'
import TransactionTable from '@/components/TransactionTable'
import { apiTransactionList } from '@/actions'
import useAuth from '@/lib/useAuth'

function Home() {
  const [transactions, setTransactions] = useState([])
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState(new Date())
  const [sortBy, setSortBy] = useState('date')
  const [sport, setSport] = useState('football')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState()
  const [sortDirection, setSortDirection] = useState('asc')
  const [search, setSearch] = useState('')
  const [selectedLeague, setSelectedLeague] = useState('')
  const [selectedTeam, setSelectedTeam] = useState('')
  const [selectedCountry, setSelectedCountry] = useState('')
  const { token } = useAuth()

  const fetchTransaction = async () => {
    const payload = {
      from: startDate,
      to: endDate
      // sort: sortBy,
      // dir: sortDirection
    }
    try {
      const { data } = await apiTransactionList(payload, token)
      setTransactions(data)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      setError(error)
      console.log('error', error)
    }
  }
  useEffect(() => {
    console.log('sortDirection', sortDirection)
    console.log('sortBy', sortBy)
    fetchTransaction()
  }, [
    sortBy,
    sortDirection,
    search,
    sport,
    selectedLeague,
    selectedTeam,
    selectedCountry,
    startDate,
    endDate
  ])

  const handleSort = criteria => {
    if (sortBy === criteria) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(criteria)
      setSortDirection('asc')
    }
  }

  return (
    <main className="flex min-h-screen flex-col md:py-24 py-16">
      <div className="py-5 flex flex-col md:flex-row gap-5 md:justify-between container justify-center">
        <h5 className="md:text-left text-center">{`Transactions`}</h5>
        {/* <SportFilter {...{ sport, setSport }}>
          <div className="flex gap-1 items-center">
            <h5 className="text-left">
              <span className="capitalize">{`${sport} `}</span>market
            </h5>
            <ChevronDown />
          </div>
        </SportFilter> */}
        <div className="flex md:ml-auto flex-wrap items-center gap-4">
          {/* <div className="hidden md:flex gap-2 flex-wrap">
            <FilterBadge filter={selectedLeague} action={setSelectedLeague} />
            <FilterBadge filter={selectedTeam} action={setSelectedTeam} />
            <FilterBadge filter={selectedCountry} action={setSelectedCountry} />
          </div>
          <Filter
            {...{
              selectedCountry,
              selectedTeam,
              selectedLeague,
              setSelectedLeague,
              setSelectedTeam,
              setSelectedCountry
            }}
          />
          <div className="flex gap-2 flex-wrap md:hidden">
            <FilterBadge filter={selectedLeague} action={setSelectedLeague} />
            <FilterBadge filter={selectedTeam} action={setSelectedTeam} />
            <FilterBadge filter={selectedCountry} action={setSelectedCountry} />
          </div> */}
          <SearchBox
            className=" md:w-fit w-full"
            timeOut={400}
            setSearch={setSearch}
          />
        </div>
        <div className="flex items-center gap-2 md:mx-0 mx-auto">
          <DatePicker
            label="Start Date"
            date={startDate}
            setDate={setStartDate}
          />
          <ArrowRight className="text-black/50" />
          <DatePicker label="End Date" date={endDate} setDate={setEndDate} />
        </div>
      </div>
      <TransactionTable
        {...{ transactions, isLoading, sortBy, sortDirection, error }}
        onSort={handleSort}
      />
      {/* <PaginationComp {...{ totalPages, page, setPage }} /> */}
    </main>
  )
}
export default Home
