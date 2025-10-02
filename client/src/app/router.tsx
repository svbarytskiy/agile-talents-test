import { HomePage } from '@/pages/home-page'
import { ProfilePage } from '@/pages/profile-page'
import { SearchPage } from '@/pages/search-page'
import { Layout } from '@/shared/components/layout'
import { ROUTES } from '@/shared/constants/routes'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

export const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path={ROUTES.HOME} element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path={ROUTES.SEARCH} element={<SearchPage />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
      </Route>
    </Routes>
  </BrowserRouter>
)
