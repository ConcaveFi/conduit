import { useIsMounted } from 'src/hooks/useIsMounted'
export default function Home() {
  const isMounted = useIsMounted()
  if (!isMounted) return <></>

  return (
    <div className="h-screen flex flex-col w-full bg-ocean-900">
      <span className="text-white"></span>
    </div>
  )
}
