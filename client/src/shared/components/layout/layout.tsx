import { Header } from './header'
import { Footer } from './footer'
import { Outlet } from 'react-router-dom'
import type { ReactNode } from 'react'

interface LayoutProps {
  children?: ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 p-6 bg-gray-50">{children ?? <Outlet />}</main>
      <Footer />
    </div>
  )
}
