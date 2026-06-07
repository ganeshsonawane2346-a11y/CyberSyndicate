import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Header } from './Header'

export function AppLayout() {
  return (
    <div className="min-h-screen grid-bg">
      <Sidebar />
      <Header sidebarWidth="256px" />
      <main className="ml-64 pt-16 p-6 min-h-screen">
        <Outlet />
      </main>
    </div>
  )
}
