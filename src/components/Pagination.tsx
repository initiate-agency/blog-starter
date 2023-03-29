import React from 'react'
import clsx from 'clsx'
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/20/solid'

type PaginationProps = {
  currentPage: number
  totalPages: number
  prevPage: number | null
  nextPage: number | null
  handlePageChange: (page: number | null) => void
}

export const Pagination = ({
  currentPage,
  totalPages,
  prevPage,
  nextPage,
  handlePageChange
}: PaginationProps) => {
  return (
    <nav className="flex items-center justify-between border-t border-neutral-200 px-4 sm:px-0">
      <div className="-mt-px flex w-0 flex-1">
        <button
          className="inline-flex items-center border-t-2 border-transparent pt-4 pr-1 text-sm font-medium text-neutral-500 hover:border-neutral-300 hover:text-neutral-700 disabled:border-transparent disabled:text-neutral-300"
          onClick={() => handlePageChange(prevPage)}
          disabled={prevPage === null}
        >
          <ArrowLongLeftIcon
            className={clsx(
              'mr-3 h-5 w-5',
              prevPage === null ? 'text-neutral-300' : 'text-neutral-400'
            )}
            aria-hidden="true"
          />
          Previous
        </button>
      </div>
      <div className="hidden md:-mt-px md:flex">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={clsx(
              'inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium',
              page === currentPage
                ? 'border-primary-500 text-primary-500'
                : 'border-transparent text-neutral-500 hover:border-neutral-300 hover:text-neutral-700'
            )}
            disabled={page === currentPage}
          >
            {page}
          </button>
        ))}
      </div>
      <div className="-mt-px flex w-0 flex-1 justify-end">
        <button
          className="inline-flex items-center border-t-2 border-transparent pt-4 pl-1 text-sm font-medium text-neutral-500 hover:border-neutral-300 hover:text-neutral-700 disabled:border-transparent disabled:text-neutral-300"
          onClick={() => handlePageChange(nextPage)}
          disabled={nextPage === null}
        >
          Next
          <ArrowLongRightIcon
            className={clsx(
              'ml-3 h-5 w-5',
              nextPage === null ? 'text-neutral-300' : 'text-neutral-400'
            )}
            aria-hidden="true"
          />
        </button>
      </div>
    </nav>
  )
}
