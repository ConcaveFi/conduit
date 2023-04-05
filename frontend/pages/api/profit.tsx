import { ImageResponse } from '@vercel/og'
import { ProfitCard } from 'app/profit/transactioncard'
import { NextRequest } from 'next/server'

export const config = {
  runtime: 'edge',
}

let domain = ''
const fontUrls = [
  new URL('/public/assets/fonts/Aeonik/Aeonik-Regular.otf', import.meta.url),
  new URL('/public/assets/fonts/Aeonik/Aeonik-Regular.otf', import.meta.url),
  new URL('/public/assets/fonts/Aeonik/Aeonik-Bold.otf', import.meta.url),
]

const MontSerratFontsPromise = fontUrls.map(async (url) => {
  const res = await fetch(url)
  return await res.arrayBuffer()
})

export default async function handler(req: NextRequest) {
  domain = req.nextUrl.origin
  const [AeonikRegular, AeonikSemi, AeonikBold] = await Promise.all(MontSerratFontsPromise)
  const { searchParams } = new URL(req.url)
  const profit = searchParams.get('profit') || '0'
  const leverage = searchParams.get('leverage') || '0'
  const asset = searchParams.get('asset') || 'eth'
  const type = searchParams.get('type') || 'short'
  const width = 1920
  const height = 1080
  console.log(domain)
  //localhost:3000/assets/tokens/btc.png
  http: return new ImageResponse(
    (
      <>
        <ProfitCard
          domain={domain}
          profit={profit}
          leverage={leverage}
          asset={asset}
          type={type}
        ></ProfitCard>
      </>
    ),
    {
      width,
      debug: false,
      height,
      fonts: [
        {
          name: 'Montserrat',
          data: AeonikRegular,
          style: 'normal',
          weight: 400,
        },
        {
          name: 'Montserrat',
          data: AeonikSemi,
          style: 'normal',
          weight: 600,
        },

        {
          name: 'Montserrat',
          data: AeonikBold,
          style: 'normal',
          weight: 700,
        },
      ],
    },
  )
}
