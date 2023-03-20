import { Topbar } from 'app/[asset]/components/topbar/Topbar'

export default async function Layout({ children }) {
  return (
    <div className=" h-full w-full p-4">
      <Topbar />
      {children}
    </div>
  )
}
