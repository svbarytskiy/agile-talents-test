export interface Profile {
  id: number
  name: string
  age: number
  city: string
  skills: string[]
  about: string
  rating: number
  image: string
  score?: number
}

export interface SearchResult extends Profile {
  score: number
}

export interface SearchBody {
  skills: string[]
}

export interface ProfilesState {
  allProfiles: Profile[]
  searchResults: SearchResult[]
  currentSkillsQuery: string[]
  isLoading: boolean
  error: string | null
}
