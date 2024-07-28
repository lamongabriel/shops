import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'

import { Button } from '../ui/button'

interface DataTablePaginationProps {
  pageIndex: number
  totalCount: number
  perPage: number
  onPageChange: (page: number) => Promise<void> | void
}

export function DataTablePagination({
  pageIndex,
  perPage,
  totalCount,
  onPageChange,
}: DataTablePaginationProps) {
  const pages = Math.ceil(totalCount / perPage) || 1

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">{totalCount} row(s)</span>

      <div className="flex items-center gap-6 lg:gap-8">
        <div className="text-sm font-medium">
          Page {pageIndex + 1} of {pages}
        </div>
        <div className="flex items-center gap-2">
          <Button
            disabled={pageIndex === 0}
            onClick={() => onPageChange(0)}
            variant="outline"
            className="m-0 size-8 p-0"
          >
            <ChevronsLeft className="size-4" />
            <span className="sr-only">First Page</span>
          </Button>

          <Button
            disabled={pageIndex === 0}
            onClick={() => onPageChange(pageIndex - 1)}
            variant="outline"
            className="m-0 size-8 p-0"
          >
            <ChevronLeft className="size-4" />
            <span className="sr-only">Previous Page</span>
          </Button>

          <Button
            disabled={pageIndex === pages - 1}
            onClick={() => onPageChange(pageIndex + 1)}
            variant="outline"
            className="m-0 size-8 p-0"
          >
            <ChevronRight className="size-4" />
            <span className="sr-only">Next Page</span>
          </Button>

          <Button
            disabled={pageIndex === pages - 1}
            onClick={() => onPageChange(pages - 1)}
            variant="outline"
            className="m-0 size-8 p-0"
          >
            <ChevronsRight className="size-4" />
            <span className="sr-only">Last Page</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
