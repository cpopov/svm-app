import { Button } from './ui/button'
import React from 'react'

function PortfolioBalance({ data, loading = false }) {
  return (
    <div className="container">
      <div className="md:px-10 p-5 rounded-md grid sm:grid-cols-2 md:flex md:flex-wrap md:justify-between gap-4 my-5 md:my-10 border shadow-md bg-white">
        <div>
          <p className="font-bold text-accent-dark">PLAYERS</p>
          <p className="text-3xl font-semibold gradient-text">
            {data?.tokens?.length ? data?.tokens?.length : 0}
          </p>
        </div>
        <div>
          <p className="font-bold text-accent-dark">USDC</p>
          <p className="text-3xl font-semibold gradient-text">
            ${' '}
            {data?.usdcBalance ? (
              String(data?.usdcBalance).includes('.') ? (
                <>
                  {Number(
                    String(data?.usdcBalance).split('.')[0]
                  ).toLocaleString()}
                  <span className="text-xl">
                    .{String(data?.usdcBalance).split('.')[1].slice(0, 2)}
                  </span>
                </>
              ) : (
                data?.usdcBalance
              )
            ) : (
              0
            )}
          </p>
        </div>
        <div>
          <p className="font-bold text-accent-dark">SVP</p>
          <p className="text-3xl font-semibold gradient-text">
            {data?.svpBlance ? (
              String(data?.svpBlance).includes('.') ? (
                <>
                  {Number(
                    String(data?.svpBlance).split('.')[0]
                  ).toLocaleString()}
                  <span className="text-xl">
                    .{String(data?.svpBlance).split('.')[1].slice(0, 2)}
                  </span>
                </>
              ) : (
                data?.svpBlance
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
            {data?.svcBalance ? (
              String(data?.svcBalance).includes('.') ? (
                <>
                  {Number(
                    String(data?.svcBalance).split('.')[0]
                  ).toLocaleString()}
                  <span className="text-xl">
                    .{String(data?.svcBalance).split('.')[1].slice(0, 2)}
                  </span>
                </>
              ) : (
                data?.svcBalance
              )
            ) : (
              0
            )}
          </p>
        </div>
        <div className="flex my-auto">
          <Button size="lg" variant="outline" className="border-accent">
            Claim free tokens
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PortfolioBalance
