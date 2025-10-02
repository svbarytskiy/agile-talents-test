import { Loader2 } from 'lucide-react'
import { useProfileSearch } from '@/app/context'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from '@/shared/components/ui'
import { ProfileCard } from './components/profile-card'
import { type FC } from 'react'
import { usePagination } from './hooks/use-pagination'

const PROFILES_PER_PAGE = 9

export const ProfilesList: FC = () => {
  const { searchResults, isLoading, error } = useProfileSearch()
  const {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    pageNumbers,
    setCurrentPage,
  } = usePagination({
    totalItems: searchResults.length,
    itemsPerPage: PROFILES_PER_PAGE,
  })

  const profilesOnPage = searchResults.slice(startIndex, endIndex)

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        <p className="ml-2 text-lg text-neutral-600">
          Searching for developers...
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center p-8 bg-red-50 rounded-lg">
        <h3 className="text-xl font-semibold text-red-600">Search Error</h3>
        <p className="text-red-500 mt-2">{error}</p>
      </div>
    )
  }

  if (totalPages === 0) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-lg">
        <h3 className="text-xl font-semibold text-gray-700">
          No Profiles Found
        </h3>
        <p className="text-gray-500 mt-2">
          Try searching for different skills.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-8 flex items-center justify-center w-full flex-col mt-4">
      <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {profilesOnPage.map(profile => (
          <ProfileCard key={String(profile.id)} profile={profile} />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage(currentPage - 1)}
                aria-disabled={currentPage === 1}
                className={
                  currentPage === 1
                    ? 'pointer-events-none opacity-50'
                    : undefined
                }
                size={'default'}
              />
            </PaginationItem>

            {pageNumbers.map((item, index) => (
              <PaginationItem key={index}>
                {item === 'ellipsis' ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    onClick={() => setCurrentPage(item as number)}
                    isActive={item === currentPage}
                    size={'default'}
                  >
                    {item}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() => setCurrentPage(currentPage + 1)}
                aria-disabled={currentPage === totalPages}
                className={
                  currentPage === totalPages
                    ? 'pointer-events-none opacity-50'
                    : undefined
                }
                size={'default'}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}
