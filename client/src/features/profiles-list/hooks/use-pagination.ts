import { useState, useEffect, useMemo } from 'react'

interface PaginationHookProps {
  totalItems: number
  itemsPerPage: number
  pageRangeDisplay?: number
}

interface PaginationHookResult {
  currentPage: number
  totalPages: number
  startIndex: number
  endIndex: number
  pageNumbers: (number | 'ellipsis')[]
  setCurrentPage: (page: number) => void
}

const getPageNumbers = (
  current: number,
  total: number,
  maxItems: number,
): (number | 'ellipsis')[] => {
  const range: (number | 'ellipsis')[] = []

  if (total <= maxItems) {
    for (let i = 1; i <= total; i++) range.push(i)
    return range
  }

  range.push(1)

  if (current > 3) range.push('ellipsis')
  if (current > 2) range.push(current - 1)
  if (current !== 1 && current !== total) range.push(current)
  if (current < total - 1) range.push(current + 1)
  if (current < total - 2) range.push('ellipsis')

  if (total !== 1) range.push(total)

  return Array.from(new Set(range)).sort((a, b) => {
    if (a === 'ellipsis') return b === 'ellipsis' ? 0 : -1
    if (b === 'ellipsis') return 1
    return (a as number) - (b as number)
  })
}

export const usePagination = ({
  totalItems,
  itemsPerPage,
  pageRangeDisplay = 5,
}: PaginationHookProps): PaginationHookResult => {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = useMemo(
    () => Math.ceil(totalItems / itemsPerPage),
    [totalItems, itemsPerPage],
  )

  useEffect(() => {
    setCurrentPage(1)
  }, [totalItems])

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage

  const pageNumbers = useMemo(() => {
    return getPageNumbers(currentPage, totalPages, pageRangeDisplay)
  }, [currentPage, totalPages, pageRangeDisplay])

  return {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    pageNumbers,
    setCurrentPage,
  }
}
