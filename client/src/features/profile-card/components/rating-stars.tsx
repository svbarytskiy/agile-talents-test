import { Star } from 'lucide-react'
import type { FC } from 'react'

export const RatingStars: FC<{ rating: number }> = ({ rating }) => {
  const maxStars = 5
  return (
    <div className="flex space-x-0.5">
      {Array.from({ length: maxStars }).map((_, index) => (
        <Star
          key={index}
          className={`w-5 h-5 ${
            index < rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  )
}
