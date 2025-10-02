import { TagCloudChaotic } from '@/features/tag-cloud-chaotic/tag-cloud-chaotic'
import { Button } from '@/shared/components/ui'
import { Link } from 'react-router-dom'

export const HomePage = () => {
  return (
    <section className="flex w-full h-full items-center justify-center gap-6 ">
      <div className="relative w-76 md:w-160 h-110">
        <div className="mt-10 md:mt-25">
          <h1 className="font-bold text-4xl md:text-6xl text-text-dark max-w-90">
            Welcome to the platform
          </h1>
          <Button
            asChild
            className="bg-primary-blue text-white mt-10 rounded-sm md:rounded-xl text-lg h-10 w-30 md:h-14 md:w-45 md:text-xl"
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
