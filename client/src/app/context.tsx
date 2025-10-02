import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type FC,
  type ReactNode,
} from 'react'
import {
  fetchAllProfilesService,
  performSearchService,
} from '@/app/services/profile-service'
import type { Profile, SearchResult } from './types'

interface ProfileSearchContextType {
  searchResults: SearchResult[]
  isLoading: boolean
  error: string | null
  currentSkillsQuery: string[]
  setSkillsQuery: (skills: string[]) => void
  performSearch: (skills: string[]) => Promise<void>
  allProfiles: Profile[]
  fetchAllProfiles: () => Promise<void>
}

const ProfileSearchContext = createContext<
  ProfileSearchContextType | undefined
>(undefined)

export const ProfileSearchProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [allProfiles, setAllProfiles] = useState<Profile[]>([])
  const [currentSkillsQuery, setCurrentSkillsQuery] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchAllProfiles = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await fetchAllProfilesService()
      setAllProfiles(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const performSearch = useCallback(async (skills: string[]) => {
    if (skills.length === 0) {
      setSearchResults([])
      setCurrentSkillsQuery([])
      return
    }

    setIsLoading(true)
    setError(null)
    setCurrentSkillsQuery(skills)

    try {
      const data = await performSearchService(skills)
      setSearchResults(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed.')
      setSearchResults([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  const setSkillsQuery = (skills: string[]) => {
    setCurrentSkillsQuery(skills)
  }

  const contextValue = useMemo(
    () => ({
      searchResults,
      isLoading,
      error,
      currentSkillsQuery,
      setSkillsQuery,
      performSearch,
      allProfiles,
      fetchAllProfiles,
    }),
    [
      searchResults,
      isLoading,
      error,
      currentSkillsQuery,
      setSkillsQuery,
      performSearch,
      allProfiles,
      fetchAllProfiles,
    ],
  )

  return (
    <ProfileSearchContext.Provider value={contextValue}>
      {children}
    </ProfileSearchContext.Provider>
  )
}

export const useProfileSearch = () => {
  const context = useContext(ProfileSearchContext)
  if (context === undefined) {
    throw new Error(
      'useProfileSearch must be used within a ProfileSearchProvider',
    )
  }
  return context
}
