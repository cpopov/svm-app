import { Button } from './ui/button'
import React from 'react'

function PortfolioBalance({ data, loading = false }) {
  return (
    <div className="container">
      <div className="md:px-10 p-5 rounded-md grid sm:grid-cols-2 md:flex md:flex-wrap md:justify-between gap-4 my-5 md:my-10 border shadow-md bg-white">
        <div>
          <p className="font-bold text-accent-dark uppercase">value</p>
          <p className="text-3xl font-semibold gradient-text">
            {data?.value ? (
              String(data?.value).includes('.') ? (
                <>
                  {Number(String(data?.value).split('.')[0]).toLocaleString()}
                  <span className="text-xl">
                    .{String(data?.value).split('.')[1].slice(0, 2)}
                  </span>
                </>
              ) : (
                data?.value
              )
            ) : (
              0
            )}
          </p>
        </div>
        <div>
          <p className="font-bold text-accent-dark uppercase">profit</p>
          <p className="text-3xl font-semibold gradient-text">
            ${' '}
            {data?.profit ? (
              String(data?.profit).includes('.') ? (
                <>
                  {Number(String(data?.profit).split('.')[0]).toLocaleString()}
                  <span className="text-xl">
                    .{String(data?.profit).split('.')[1].slice(0, 2)}
                  </span>
                </>
              ) : (
                data?.profit
              )
            ) : (
              0
            )}
          </p>
        </div>
        <div>
          <p className="font-bold text-accent-dark uppercase">payouts</p>
          <p className="text-3xl font-semibold gradient-text">
            {data?.payouts ? (
              String(data?.payouts).includes('.') ? (
                <>
                  {Number(String(data?.payouts).split('.')[0]).toLocaleString()}
                  <span className="text-xl">
                    .{String(data?.payouts).split('.')[1].slice(0, 2)}
                  </span>
                </>
              ) : (
                data?.payouts
              )
            ) : (
              0
            )}{' '}
            <span className="text-xl">POINTS</span>
          </p>
        </div>
        <div>
          <p className="font-bold text-accent-dark">SVC</p>
          <p className="text-3xl font-semibold gradient-text">
            {data?.balance ? (
              String(data?.balance).includes('.') ? (
                <>
                  {Number(String(data?.balance).split('.')[0]).toLocaleString()}
                  <span className="text-xl">
                    .{String(data?.balance).split('.')[1].slice(0, 2)}
                  </span>
                </>
              ) : (
                data?.balance
              )
            ) : (
              0
            )}
          </p>
        </div>
        {/* <div className="flex my-auto">
          <Button size="lg" variant="outline" className="border-accent">
            Claim free tokens
          </Button>
        </div> */}
      </div>
    </div>
  )
}

export default PortfolioBalance
