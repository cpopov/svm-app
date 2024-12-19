'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'

import { Badge } from './ui/badge'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Skeleton } from './ui/skeleton'
import Ticker from './Ticker'
import TradeButton from './TradeButton'

const PortfolioTable = ({
  isLoading,
  players = [],
  onSort,
  error,
  sport,
  sortBy,
  sortDirection,
  refetch
}) => {
  if (players.length)
    return (
      <div className="md:container">
        <TableWrapper {...{ onSort, sortBy, sortDirection }}>
          {players.map((player, index) => (
            <PlayerRow
              key={index}
              player={player}
              refetch={refetch}
              sport={sport}
            />
          ))}
        </TableWrapper>
      </div>
    )
  if (isLoading) return <Loader />
  if (error) return <ErrorMessage />
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
        <TableHead className="hidden md:table-cell md:pl-5">
          My Tokens
        </TableHead>
        <TableHead className="cursor-pointer" onClick={() => onSort('name')}>
          <div className="flex items-center gap-1">
            Player {renderSortArrow('name', sortBy, sortDirection)}
          </div>
        </TableHead>
        <TableHead className="hidden md:table-cell">Symbol</TableHead>
        <TableHead className="cursor-pointer" onClick={() => onSort('team')}>
          <div className="flex items-center md:justify-start justify-center gap-1">
            Team {renderSortArrow('team', sortBy, sortDirection)}
          </div>
        </TableHead>
        <TableHead className="hidden md:table-cell">Position</TableHead>
        <TableHead className="cursor-pointer" onClick={() => onSort('price')}>
          <div className="flex items-center md:justify-start justify-end gap-1">
            Price {renderSortArrow('price', sortBy, sortDirection)}
          </div>
        </TableHead>
        <TableHead className="hidden md:table-cell lg:max-w-16 md:pr-5">
          Action
        </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody className="bg-white">{children}</TableBody>
  </Table>
)

const PlayerRow = ({ player, sport, refetch, props }) => (
  <TableRow {...props} className="hover:bg-secondary group">
    <TableCell colSpan={4} className="md:hidden">
      <div className="flex items-center h-full">
        <Link href={`/player/${sport}/${player?.playerId}/${player?.assetId}`}>
          <div className="relative h-12 w-12 mr-2 rounded-full overflow-clip group-hover:border-accent border">
            <Image
              src={player.photo || '/player_image.jpg'}
              className="mr-2 object-contain"
              fill
              sizes="auto"
              alt=""
            />
          </div>
        </Link>
        <div>
          <div className="flex items-end">
            <p className="text-[#47A847] font-bold">
              {Number(player?.amount)?.toFixed(2)}
              {/* <span className="text-[#47A847] font-normal text-xs pl-1">
                SVC
              </span> */}
            </p>
          </div>
          <p className="text-accent-dark font-bold">{player.name}</p>
          <div className="flex gap-2 items-center">
            <Badge
              className="rounded-full text-accent-dark font-normal bg-[#EBEDF0] w-fit text-sm"
              variant="outline">
              {player.position}
            </Badge>
            <p>{player.team}</p>
          </div>
        </div>
        <div className="flex flex-col ml-auto pl-2">
          <p className="text-center">
            {player.price ? `$ ${player.price}` : ''}
          </p>
          <TradeButton
            variant="outline"
            className="!hover:gradient-button !hover:bg-white border-[#099F8C] text-[#099F8C]"
            data={player}
            name={player?.name}
            photo={player?.photo}
            team={player?.team}
            market={player?.market}
            position={player?.position}
            symbol={player?.symbol}
            price={player.price}
            assetId={player?.assetId}
            onSuccess={refetch}
          />
        </div>
      </div>
    </TableCell>
    <TableCell className="hidden md:table-cell md:pl-5">
      <div className="flex items-end">
        <p className="text-[#47A847] font-bold">
          {Number(player?.amount)?.toFixed(2)}
          {/* <span className="text-[#47A847] font-normal text-xs pl-1">SVC</span> */}
        </p>
      </div>
    </TableCell>
    <TableCell className="hidden md:table-cell">
      <Link href={`/player/${sport}/${player?.playerId}/${player?.assetId}`}>
        <div className="flex items-center h-full">
          <div className="relative h-14 w-14 mr-2 rounded-full overflow-clip group-hover:border-accent border">
            <Image
              src={player.photo || '/player_image.jpg'}
              className="mr-2 object-contain"
              fill
              sizes="auto"
              alt=""
            />
          </div>
          <p className="text-accent-dark font-bold">{player.name}</p>
        </div>
      </Link>
    </TableCell>
    <TableCell className="hidden md:table-cell">{player.symbol}</TableCell>
    <TableCell className="hidden md:table-cell">{player.team}</TableCell>
    <TableCell className="hidden md:table-cell">{player.position}</TableCell>
    <TableCell className="hidden md:table-cell">
      {player.price ? `$ ${player.price}` : ''}
    </TableCell>
    <TableCell className="hidden md:table-cell lg:max-w-16 md:pr-5">
      <TradeButton
        data={player}
        name={player?.name}
        photo={player?.photo}
        team={player?.team}
        market={player?.market}
        position={player?.position}
        symbol={player?.symbol}
        price={player.price}
        assetId={player?.assetId}
        onSuccess={refetch}
        className="gradient-button"
      />
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

function ErrorMessage() {
  return (
    <div className="md:container">
      <TableWrapper>
        <TableRow>
          <TableCell colSpan={7}>
            <div className="h-8 flex justify-center items-center">
              <p>No tokens found</p>
            </div>
          </TableCell>
        </TableRow>
      </TableWrapper>
    </div>
  )
}

export default PortfolioTable
