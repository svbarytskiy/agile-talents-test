import { NavLink } from 'react-router-dom'
import clsx from 'clsx'
import type { ReactNode } from 'react'

interface Props {
  to: string
  children: ReactNode
}

export const NavItem = ({ to, children }: Props) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        clsx(
          'relative px-4 py-2 text-text-dark transition-colors',
          isActive
            ? 'after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary-blue font-medium'
            : 'hover:text-primary-blue',
        )
      }
    >
      {children}
    </NavLink>
  )
}
