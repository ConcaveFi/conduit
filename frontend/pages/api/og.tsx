import { ImageResponse } from '@vercel/og'
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

export default async function (prop: { nextUrl: any }) {
  domain = prop.nextUrl.origin
  const width = 720
  const height = 405
  const [MontserratRegular, MontserratSemi, MontserratBold] = await Promise.all(
    MontSerratFontsPromise,
  )
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
            className="h-full w-full bg-gray-50 p-4 	"
            style={{
              backgroundImage: `url('${domain}/assets/background.png')`,
              backgroundSize: `cover`,
            }}
          >
            <Flex className={' w-full flex-col justify-between'}>
              <Header />
              <Content />
              <Footer />
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

const Assets = () => {
  return (
    <Flex className="flex-row-reverse items-center justify-center">
      <Flex className="-ml-4 h-11 w-11 items-center justify-center rounded-full bg-white align-middle">
        <Icon size={40} asset={'susd'} />
      </Flex>
      <Flex className="h-11 w-11 items-center justify-center rounded-full bg-white align-middle">
        <Icon size={40} asset={'eth'} />
      </Flex>
    </Flex>
  )
}
const Footer = () => {
  return (
    <Flex className="h-fit w-full items-center justify-between">
      <Span
        style={{
          backgroundImage: 'linear-gradient(90deg, #34EDB3 0%, #00D1FF 100%)', // 🤡 backgroundClip: 'text',
        }}
        className="text-red btn-red-gradient rounded-lg bg-clip-text px-8 pb-1 text-xl"
      >
        Long 0.21x
      </Span>
      <Assets />
    </Flex>
  )
}
const Content = () => {
  return (
    <Flex className="w-full justify-center">
      <Span
        style={{
          backgroundImage: 'linear-gradient(to bottom,#34edb3,#00d1ff)', // 🤡 backgroundClip: 'text',
          backgroundClip: 'text', // 🤡 backgroundClip: 'text',
        }}
        className="bg-clip-text text-9xl font-bold text-transparent"
      >
        +121.43
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
  )
}
const Header = () => {
  return (
    <Flex className="h-fit w-full justify-between">
      <Flex className={' h-fit '}>
        <img
          src={`${domain}/assets/conduit.svg`}
          width={373 + 12 * 2}
          height={40 + 12 * 2}
          alt="Logo da Empresa"
        />
      </Flex>
      <Flex className={' h-fit '}>
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
