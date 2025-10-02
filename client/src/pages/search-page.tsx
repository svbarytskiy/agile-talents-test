import { ProfilesList } from '@/features/profiles-list'
import { SearchProfilesForm } from '@/features/search-profiles'

export const SearchPage = () => {
  return (
    <>
      <div className="">
        <SearchProfilesForm />
        <ProfilesList />
      </div>
    </>
  )
}
