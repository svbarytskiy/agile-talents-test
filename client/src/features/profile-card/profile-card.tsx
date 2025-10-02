import { useParams } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { useProfileSearch } from '@/app/context'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
} from '@/shared/components/ui'
import { useEffect, useMemo, type FC } from 'react'
import type { Profile } from '@/app/types'
import { RatingStars } from './components/rating-stars'

export const ProfileCard: FC = () => {
  const { id } = useParams<{ id: string }>()
  const { allProfiles, isLoading, error, fetchAllProfiles } = useProfileSearch()
  const profileId = id ? parseInt(id, 10) : undefined
  const profile = useMemo<Profile | undefined>(() => {
    if (profileId === undefined) {
      return undefined
    }
    return allProfiles.find(p => p.id === profileId) as Profile | undefined
  }, [allProfiles, profileId])

  useEffect(() => {
    if (allProfiles.length === 0 && !isLoading) {
      fetchAllProfiles()
    }
  }, [allProfiles.length, fetchAllProfiles, isLoading])

  if (isLoading && !profile) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-10">
        Error loading profile: {error}
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="text-center text-xl mt-10">
        Profile with ID "{id}" not found.
      </div>
    )
  }

  return (
    <div className="flex justify-center  p-6">
      <div className="">
        <Avatar className="w-12 h-12 mx-auto mb-4">
          <AvatarImage src={profile.image} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight">{profile.name}</h1>
          <p className="text-neutral-500">
            {profile.age}, {profile.city}
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {profile.skills.map(skill => (
            <Badge key={skill} variant="secondary" className="text-sm">
              {skill}
            </Badge>
          ))}
        </div>
        <div className="pt-4 border-t border-gray-100">
          <h2 className="text-xl font-bold mb-2">About</h2>
          <p className="text-neutral-700 leading-relaxed">{profile.about}</p>
        </div>
        <div className="pt-4 border-t border-gray-100 flex justify-center">
          <RatingStars rating={profile.rating} />
        </div>
      </div>
    </div>
  )
}
