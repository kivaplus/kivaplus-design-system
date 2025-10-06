import React from 'react'
import { cn } from '../../utils/helpers'
import { ActionButton } from '../action-button'
import { Button } from '../button'
import TableFilter, { FilterConfig, FilterValues } from './TableFilter'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from './index'

// Server-side data interfaces
export interface ServerTableColumn {
  key: string
  header: string
  sortable?: boolean
  numeric?: boolean
  render?: (value: any, row: any) => React.ReactNode
}

export interface ServerTableParams {
  page: number
  pageSize: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  search?: string
  filters?: FilterValues
}

export interface ServerTableResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export interface ServerDataTableProps<T> {
  columns: ServerTableColumn[]
  fetchData: (params: ServerTableParams) => Promise<ServerTableResponse<T>>
  filterConfig?: FilterConfig
  searchable?: boolean
  searchPlaceholder?: string
  pageSize?: number
  className?: string
  onRowClick?: (row: T) => void
  refreshKey?: string | number // To trigger data refresh
}

function ServerDataTable<T extends Record<string, any>>({
  columns,
  fetchData,
  filterConfig,
  searchable = false,
  searchPlaceholder = "Buscar...",
  pageSize = 20,
  className,
  onRowClick,
  refreshKey
}: ServerDataTableProps<T>) {
  // State management
  const [data, setData] = React.useState<T[]>([])
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  // Pagination state
  const [currentPage, setCurrentPage] = React.useState(1)
  const [totalPages, setTotalPages] = React.useState(0)
  const [totalRecords, setTotalRecords] = React.useState(0)

  // Sorting state
  const [sortBy, setSortBy] = React.useState<string>()
  const [sortOrder, setSortOrder] = React.useState<'asc' | 'desc'>('asc')

  // Search and filter state
  const [searchTerm, setSearchTerm] = React.useState('')
  const [debouncedSearch, setDebouncedSearch] = React.useState('')
  const [filters, setFilters] = React.useState<FilterValues>({})

  // Debounce search input
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm)
    }, 500) // 500ms delay

    return () => clearTimeout(timer)
  }, [searchTerm])

  // Fetch data when parameters change
  const loadData = React.useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const params: ServerTableParams = {
        page: currentPage,
        pageSize,
        sortBy,
        sortOrder,
        search: debouncedSearch || undefined,
        filters: Object.keys(filters).length > 0 ? filters : undefined
      }

      const response = await fetchData(params)

      setData(response.data)
      setTotalPages(response.totalPages)
      setTotalRecords(response.total)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar dados')
      setData([])
    } finally {
      setLoading(false)
    }
  }, [currentPage, pageSize, sortBy, sortOrder, debouncedSearch, filters, fetchData])

  // Load data on mount and when dependencies change
  React.useEffect(() => {
    loadData()
  }, [loadData, refreshKey])

  // Reset to first page when search or filters change
  React.useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1)
    }
  }, [debouncedSearch, filters])

  // Handle sorting
  const handleSort = (columnKey: string) => {
    if (sortBy === columnKey) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(columnKey)
      setSortOrder('asc')
    }
  }

  // Handle pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  // Handle filter changes
  const handleFilterChange = (newFilters: FilterValues) => {
    setFilters(newFilters)
  }

  // Render pagination controls
  const renderPagination = () => {
    if (totalPages <= 1) return null

    const getVisiblePages = () => {
      const maxVisible = 5
      const pages: (number | string)[] = []

      if (totalPages <= maxVisible) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        const start = Math.max(1, currentPage - Math.floor(maxVisible / 2))
        const end = Math.min(totalPages, start + maxVisible - 1)

        if (start > 1) {
          pages.push(1)
          if (start > 2) pages.push('...')
        }

        for (let i = start; i <= end; i++) {
          pages.push(i)
        }

        if (end < totalPages) {
          if (end < totalPages - 1) pages.push('...')
          pages.push(totalPages)
        }
      }

      return pages
    }

    const visiblePages = getVisiblePages()

    return (
      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-500">
          Mostrando {((currentPage - 1) * pageSize) + 1} a{' '}
          {Math.min(currentPage * pageSize, totalRecords)}{' '}
          de {totalRecords.toLocaleString()} registros
        </div>

        <div className="flex items-center space-x-2">
          <button
            className="pagination-button"
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
          >
            {'<<'}
          </button>
          <button
            className="pagination-button"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {'<'}
          </button>

          {visiblePages.map((page, index) => (
            <React.Fragment key={index}>
              {page === '...' ? (
                <span className="px-2 text-gray-500">...</span>
              ) : (
                <button
                  onClick={() => handlePageChange(page as number)}
                  className={cn(
                    'pagination-button',
                    page === currentPage && 'pagination-button-active'
                  )}
                >
                  {page}
                </button>
              )}
            </React.Fragment>
          ))}

          <button
            className="pagination-button"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            {'>'}
          </button>
          <button
            className="pagination-button"
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
          >
            {'>>'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={cn('w-full space-y-4', className)}>
      {/* Search and Filters */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          {searchable && (
            <input
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="table-search max-w-sm"
            />
          )}

          {filterConfig && (
            <TableFilter
              config={filterConfig}
              data={[]} // Server-side filtering doesn't need local data
              onFilteredDataChange={() => { }} // Not used for server-side
              onFiltersChange={handleFilterChange}
            />
          )}
        </div>

        <div className="flex items-center gap-2">
          <ActionButton
            icon={<span>🔄</span>}
            size="sm"
            variant="outlined"
            tooltip="Atualizar dados"
            onClick={loadData}
            loading={loading}
          />

          <span className="text-sm text-gray-500">
            {totalRecords.toLocaleString()} registros
          </span>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center gap-2">
            <span className="text-red-500">⚠️</span>
            <span className="text-red-700">{error}</span>
            <Button size="sm" variant="outlined" onClick={loadData}>
              Tentar novamente
            </Button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="rounded-md border border-gray-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead
                  key={column.key}
                  sortable={column.sortable}
                  numeric={column.numeric}
                  onClick={() => column.sortable && handleSort(column.key)}
                  className={cn(
                    column.sortable && 'table-head-sortable cursor-pointer',
                    sortBy === column.key && 'table-head-sorted'
                  )}
                >
                  <div className="flex items-center gap-2">
                    {column.header}
                    {column.sortable && sortBy === column.key && (
                      <span className="text-brand-primary">
                        {sortOrder === 'desc' ? '↓' : '↑'}
                      </span>
                    )}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: pageSize }).map((_, index) => (
                <TableRow key={index}>
                  {columns.map((_, colIndex) => (
                    <TableCell key={colIndex}>
                      <div className="skeleton h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : data.length > 0 ? (
              data.map((row, index) => (
                <TableRow
                  key={row.id || index}
                  clickable={!!onRowClick}
                  onClick={() => onRowClick?.(row)}
                  className={cn(onRowClick && 'table-row-clickable')}
                >
                  {columns.map((column) => (
                    <TableCell key={column.key} numeric={column.numeric}>
                      {column.render
                        ? column.render(row[column.key], row)
                        : row[column.key]
                      }
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center py-8 text-gray-500">
                  {searchTerm || Object.keys(filters).length > 0
                    ? 'Nenhum resultado encontrado para os filtros aplicados.'
                    : 'Nenhum registro encontrado.'
                  }
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {renderPagination()}
    </div>
  )
}

export default ServerDataTable
