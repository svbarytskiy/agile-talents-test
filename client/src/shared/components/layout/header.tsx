import { ROUTES } from '@/shared/constants/routes'
import { NavItem } from './nav-item'

export const Header = () => {
  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center w-full justify-items-center">
      <nav className="flex space-x-6 mx-auto">
        <NavItem to={ROUTES.HOME}>Home</NavItem>
        <NavItem to={ROUTES.SEARCH}>Search</NavItem>
        <NavItem to={ROUTES.PROFILE(1)}>Profile</NavItem>
      </nav>
    </header>
  )
}
