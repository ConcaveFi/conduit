import { Sidebar } from 'app/[asset]/components/sidebar/Sidebar'
import { Topbar } from 'app/[asset]/components/topbar/Topbar'

export default async function Layout({ children }) {
  return (
    <div className=" h-full w-full p-4">
      <Sidebar />
      <Topbar />
      {children}
    </div>
  )
}
