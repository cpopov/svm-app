'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { cn, extractTextInParentheses } from '@/lib/utils'

import { Badge } from './ui/badge'
import Image from 'next/image'
import React from 'react'
import { Skeleton } from './ui/skeleton'
import Ticker from './Ticker'
import TradeButton from './TradeButton'
import { format } from 'date-fns'

const TransactionTable = ({
  isLoading,
  transactions = [],
  onSort,
  error,
  sortBy,
  sortDirection
}) => {
  if (transactions.length)
    return (
      <div className="md:container">
        <TableWrapper {...{ onSort, sortBy, sortDirection }}>
          {transactions.map((transaction, index) => (
            <TransactionRow key={index} transaction={transaction} />
          ))}
        </TableWrapper>
      </div>
    )
  if (isLoading) return <Loader />
  if (error || !transactions.length) return <ErrorMessage />
}

const renderSortArrow = (criteria, sortBy, sortDirection) => {
  if (sortBy === criteria) {
    return sortDirection === 'asc' ? (
      <Ticker upFill="#099F8C" />
    ) : (
      <Ticker downFill="#099F8C" />
    )
  }
  return <Ticker fill="#778899" className="duration-300" />
}

const TableWrapper = ({ children, onSort, sortBy, sortDirection }) => (
  <Table>
    <TableHeader className="bg-[#DDEDE7]">
      <TableRow className="uppercase">
        <TableHead className="md:hidden">
          <div className="grid grid-cols-4">
            <div
              role="button"
              className="col-span-2"
              // onClick={() => onSort('name')}
            >
              <div className="flex items-center gap-1">
                {/* Date {renderSortArrow('name', sortBy, sortDirection)} */}
                Date
              </div>
            </div>
            <div
              className="flex justify-end"
              role="button"
              // onClick={() => onSort('type')}
            >
              <div className="flex items-center gap-1">
                Type
                {/* Type {renderSortArrow('type', sortBy, sortDirection)} */}
              </div>
            </div>
            <div
              className="flex justify-end"
              role="button"
              // onClick={() => onSort('price')}
            >
              <div className="flex items-center gap-1">
                Amount
                {/* Amount {renderSortArrow('price', sortBy, sortDirection)} */}
              </div>
            </div>
          </div>
        </TableHead>
        {/* <TableHead
          className="cursor-pointer hidden md:table-cell"
          onClick={() => onSort('name')}>
          <div className="flex items-center gap-1">
            Date {renderSortArrow('name', sortBy, sortDirection)}
          </div>
        </TableHead>
        <TableHead
          className="cursor-pointer hidden md:table-cell"
          onClick={() => onSort('type')}>
          <div className="flex items-center gap-1">
            Type {renderSortArrow('type', sortBy, sortDirection)}
          </div>
        </TableHead> */}
        <TableHead className="hidden md:pl-5 md:table-cell lg:max-w-16 md:pr-5">
          Date
        </TableHead>
        <TableHead className="hidden md:table-cell lg:max-w-16 md:pr-5">
          Type
        </TableHead>
        <TableHead className="hidden md:table-cell lg:max-w-16 md:pr-5">
          Details
        </TableHead>
        <TableHead className="hidden md:table-cell lg:max-w-16 md:pr-5">
          Amount
        </TableHead>
        <TableHead className="hidden md:table-cell lg:max-w-16 md:pr-5">
          Balance
        </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody className="bg-white">{children}</TableBody>
  </Table>
)

const TransactionRow = ({ transaction }) => (
  <TableRow className="hover:bg-secondary group">
    <TableCell colSpan={4} className="md:hidden">
      <div className="grid grid-cols-4 gap-2 items-center h-full">
        <div className="col-span-2">
          <p className="text-accent-dark font-bold">
            {extractTextInParentheses(transaction?.details)}
          </p>
          <p className="text-sm">{format(transaction?.txDate, 'P')}</p>
        </div>
        <div className="flex justify-end">
          <TypeBadge type={transaction?.type} />
        </div>
        <div className="flex justify-end">
          <p className="text-[#47A847] font-bold">
            {Number(transaction?.amount)?.toFixed(2)}
          </p>
        </div>
      </div>
    </TableCell>
    <TableCell className="hidden md:pl-5 md:table-cell">
      {format(transaction?.txDate, 'P')}
    </TableCell>
    <TableCell className="hidden md:table-cell">
      <TypeBadge type={transaction?.type} />
    </TableCell>
    <TableCell colSpan={1} className="hidden md:table-cell">
      {transaction?.details}
    </TableCell>
    <TableCell colSpan={1} className="hidden md:table-cell">
      {Number(transaction?.amount)?.toFixed(2)}
    </TableCell>
    <TableCell
      colSpan={1}
      className="font-bold text-accent hidden md:table-cell">
      {Number(transaction?.balance)?.toFixed(2)}
    </TableCell>
  </TableRow>
)

function Loader({ length = 3 }) {
  return (
    <div className="md:container">
      <TableWrapper>
        {[...Array(length)].map((_, index) => (
          <TableRow key={index}>
            <TableCell colSpan={7}>
              <Skeleton className="w-full h-20" />
            </TableCell>
          </TableRow>
        ))}
      </TableWrapper>
    </div>
  )
}
function TypeBadge({ type }) {
  return (
    <div
      className={cn(
        'border rounded-md bg-accent w-fit px-1 text-white',
        type === 'purchase' && 'bg-green-500',
        type === 'sale' && 'bg-amber-500'
      )}>
      <p className="text-center font-semibold text-xs uppercase">{type}</p>
    </div>
  )
}
function ErrorMessage() {
  return (
    <div className="md:container">
      <TableWrapper>
        <TableRow>
          <TableCell colSpan={7}>
            <div className="h-8 flex justify-center items-center">
              <p>No transactions found</p>
            </div>
          </TableCell>
        </TableRow>
      </TableWrapper>
    </div>
  )
}

export default TransactionTable
