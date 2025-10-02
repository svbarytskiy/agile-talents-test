import { api } from '@/app/api'
import type { Profile, SearchBody, SearchResult } from '../types'

export async function fetchAllProfilesService(): Promise<Profile[]> {
  const response = await api.get<Profile[]>('/profiles')
  return response.data
}

export async function performSearchService(
  skills: string[],
): Promise<SearchResult[]> {
  const body: SearchBody = { skills }
  const response = await api.post<SearchResult[]>('/profiles/search', body)
  return response.data
}
