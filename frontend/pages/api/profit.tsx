import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'
import { HTMLAttributes } from 'react'

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
  const [MontserratRegular, MontserratSemi, MontserratBold] = await Promise.all(
    MontSerratFontsPromise,
  )
  const { searchParams } = new URL(req.url)
  const profit = searchParams.get('profit') || '0'
  const leverage = searchParams.get('leverage') || '0'
  const asset = searchParams.get('asset') || 'eth'
  const type = searchParams.get('type') || 'Short'

  const width = 1920
  const height = 1080
  return new ImageResponse(
    (
      <>
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            fontFamily: '"Montserrat"',
            justifyContent: 'center',
            backgroundColor: 'white',
          }}
        >
          <Flex
            className="h-full w-full bg-gray-50 p-8 	"
            style={{
              backgroundImage: `url('${domain}/assets/background.png')`,
              backgroundSize: `cover`,
            }}
          >
            <Flex className={' w-full flex-col justify-between'}>
              <Header />
              <Content profit={profit} />
              <Footer asset={asset} leverage={leverage} type={type} />
            </Flex>
          </Flex>
        </div>
      </>
    ),
    {
      width,
      debug: false,
      height,
      fonts: [
        {
          name: 'Montserrat',
          data: MontserratRegular,
          style: 'normal',
          weight: 400,
        },
        {
          name: 'Montserrat',
          data: MontserratSemi,
          style: 'normal',
          weight: 600,
        },

        {
          name: 'Montserrat',
          data: MontserratBold,
          style: 'normal',
          weight: 700,
        },
      ],
    },
  )
}

const Flex = (props: HTMLAttributes<HTMLDivElement>) => {
  const className = 'flex ' + props.className
  return <div {...{ ...props, className, tw: className }}></div>
}

const Span = (props: HTMLAttributes<HTMLSpanElement>) => {
  return <span {...{ ...props, tw: props.className }}></span>
}

const Icon = ({
  asset,
  size,
  ...imgProps
}: { asset: string; size: number } & HTMLAttributes<HTMLImageElement>) => {
  const url = new URL(`/assets/tokens/${asset}.png`, domain)
  return <img src={url.toString()} tw="rounded-full" width={size} height={size} />
}

const Assets = ({ asset }) => {
  return (
    <Flex className="flex-row-reverse items-center justify-center">
      <Flex className="-ml-4 items-center justify-center rounded-full bg-white align-middle">
        <Icon size={100} asset={asset} />
      </Flex>
    </Flex>
  )
}

const backgrounds = {
  short: 'linear-gradient(90deg, #BF3131 0%, #A61CA0 100%)',
  long: 'linear-gradient(90deg, #34EDB3 0%, #00D1FF 100%)',
}

const Footer = ({ leverage, asset, type }) => {
  const background = backgrounds[type.toLowerCase()]

  return (
    <Flex className="h-fit w-full items-center justify-between">
      <Flex className="flex-col gap-8">
        <Span
          style={{
            backgroundImage: background, // 🤡 backgroundClip: 'text',
          }}
          className=" btn-red-gradient rounded-lg bg-clip-text p-10 py-5 text-3xl"
        >
          {` ${type.toLowerCase() === 'long' ? 'Long' : 'Short'} position leverage ${leverage}x`}
        </Span>
      </Flex>
      <Assets asset={asset} />
    </Flex>
  )
}

const Content = ({ profit }) => {
  return (
    <Flex className="w-full flex-col items-center  justify-center ">
      <Flex className="flex-col ">
        <Flex>
          <Span
            style={{
              backgroundImage: 'linear-gradient(to bottom,#34edb3,#00d1ff)', // 🤡 backgroundClip: 'text',
              backgroundClip: 'text', // 🤡 backgroundClip: 'text',
            }}
            className=" bg-clip-text text-[175px] font-bold text-transparent"
          >
            {`${profit}`}
          </Span>
          <Span
            style={{
              backgroundImage: 'linear-gradient(180deg,#34edb3,#00d1ff)',
              backgroundClip: 'text',
              color: 'transparent',
            }}
            className="mt-auto mb-3 text-8xl font-bold text-green-500"
          >
            %
          </Span>
        </Flex>
      </Flex>
    </Flex>
  )
}
const Header = () => {
  return (
    <Flex className="h-44 w-full justify-between ">
      <Flex className={' h-fit   '}>
        {/* <QRCode
          size={128}
          style={{ height: 'auto', maxWidth: '70px' }}
          value={`${domain}/api/og?asset=sETH`}
          viewBox={`0 0 128 128`}
        /> */}
      </Flex>
    </Flex>
  )
}
