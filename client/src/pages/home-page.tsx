import { TagCloudChaotic } from '@/features/tag-cloud-chaotic/tag-cloud-chaotic'
import { Button } from '@/shared/components/ui'
import { Link } from 'react-router-dom'

export const HomePage = () => {
  return (
    <section className="flex w-full h-full items-center justify-center gap-6 ">
      <div className="relative w-160 h-110">
        <div className="mt-25">
          <h1 className="font-bold text-6xl text-text-dark max-w-90">
            Welcome to the platform
          </h1>
          <Button
            asChild
            className="bg-primary-blue text-white mt-10 rounded-xl h-14 w-45 text-xl"
          >
            <Link to="/search">Go to search</Link>
          </Button>
        </div>
        <div className="absolute right-2 bottom-3">
          <TagCloudChaotic />
        </div>
      </div>
    </section>
  )
}
