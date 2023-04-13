'use client'
import { HTMLAttributes } from 'react'

export const ProfitCard = ({
  profit,
  asset,
  leverage,
  type = '',
  domain = '',
}: {
  profit: string
  asset: string
  leverage: string
  type?: string
  domain?: string
}) => {
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: '"Aeonik"',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}
    >
      <Flex
        className="w-full h-full p-8 font-sans bg-gray-50"
        style={{
          backgroundImage: `url('${domain}/assets/background.png')`,
          backgroundSize: `cover`,
        }}
      >
        <Flex className={'w-full flex-col justify-between'}>
          <Header />
          <Content profit={profit} />
          <Footer domain={domain} asset={asset} leverage={leverage} type={type} />
        </Flex>
      </Flex>
    </div>
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
  domain,
}: { asset: string; size: number; domain: string } & HTMLAttributes<HTMLImageElement>) => {
  const url = `${domain}/assets/tokens/${asset}.png`
  return <img src={url.toString()} tw="rounded-full" width={size} height={size} />
}

const Assets = ({ asset, domain }) => {
  return (
    <Flex className="flex-row-reverse items-center justify-center">
      <Flex className="items-center justify-center -ml-4 align-middle bg-white rounded-full">
        <Icon size={100} asset={asset} domain={domain} />
      </Flex>
    </Flex>
  )
}

const backgrounds = {
  short: 'linear-gradient(90deg, #BF3131 0%, #A61CA0 100%)',
  long: 'linear-gradient(90deg, #34EDB3 0%, #00D1FF 100%)',
}

const Footer = ({ leverage, asset, type, domain }) => {
  const background = backgrounds[type.toLowerCase()]
  return (
    <Flex className="items-center justify-between w-full h-fit">
      <Flex className="flex-col gap-8">
        <Span
          style={{
            backgroundImage: background, // 🤡 backgroundClip: 'text',
          }}
          className="p-10 py-5 text-3xl rounded-lg "
        >
          {`${type.toLowerCase() === 'long' ? 'Long' : 'Short'} position leverage ${leverage}x`}
        </Span>
      </Flex>
      <Assets domain={domain} asset={asset} />
    </Flex>
  )
}

const Content = ({ profit }) => {
  return (
    <Flex className="flex-col items-center justify-center w-full ">
      <Flex className="flex-col ">
        <Flex>
          <Span
            style={{
              backgroundImage: 'linear-gradient(to bottom,#34edb3,#00d1ff)',
              backgroundClip: 'text', // 🤡 backgroundClip: 'text',
            }}
            className=" bg-clip-text  text-[175px] font-bold text-transparent"
          >
            {`${profit}`}
          </Span>
          <Span
            style={{
              backgroundImage: 'linear-gradient(180deg,#34edb3,#00d1ff)',
              backgroundClip: 'text',
            }}
            className="mt-auto mb-3 font-bold text-transparent bg-clip-text text-8xl"
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
    <Flex className="justify-between w-full h-44 ">
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
