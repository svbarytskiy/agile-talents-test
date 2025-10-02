import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
  Avatar,
  AvatarFallback,
  AvatarImage,
  CardFooter,
} from '@/shared/components/ui'
import type { SearchResult } from '@/app/types'
import { ROUTES } from '@/shared/constants/routes'

interface Props {
  profile: SearchResult
}

export const ProfileCard: React.FC<Props> = ({ profile }) => {
  return (
    <Link
      to={ROUTES.PROFILE(profile.id)}
      className="block h-full transition-shadow duration-200 rounded-lg 
                       focus-visible:outline-none focus-visible:ring-2 
                       focus-visible:ring-blue-500 focus-visible:ring-offset-2"
    >
      <Card
        className={`overflow-hidden transition-shadow duration-300 max-w-80 h-80 md:h-75`}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0">
          <div className="flex items-center space-x-4">
            <Avatar className="w-12 h-12">
              <AvatarImage src={profile.image} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="">
              <CardTitle className="text-xl font-bold">
                {profile.name}
              </CardTitle>
              <p>
                {profile.age}, {profile.city}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {profile.skills.slice(0, 4).map(skill => (
              <Badge
                key={skill}
                variant="outline"
                className="text-sm text-blue-700 bg-blue-100"
              >
                {skill}
              </Badge>
            ))}
            {profile.skills.length > 4 && (
              <Badge variant="outline">+{profile.skills.length - 4}</Badge>
            )}
          </div>

          <div className="pb-auto">{profile.about}</div>

          <CardFooter className="p-0 pt-auto ">
            <div className="flex items-center space-x-1 text-sm text-neutral-500 mt-auto">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>{profile.rating.toFixed(1)}</span>
            </div>
          </CardFooter>
        </CardContent>
      </Card>
    </Link>
  )
}
