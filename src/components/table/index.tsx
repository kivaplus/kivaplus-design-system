import React from 'react';
import { cn } from '../../utils/helpers';

// Simple DataTable Component (without external dependencies)
export interface SimpleDataTableProps {
  data: any[]
  columns: { key: string; header: string; sortable?: boolean }[]
  searchable?: boolean
  searchPlaceholder?: string
  pagination?: boolean
  pageSize?: number
  className?: string
  onRowClick?: (row: any) => void
  loading?: boolean
  emptyMessage?: string
}

function SimpleDataTable({
  data,
  columns,
  searchable = false,
  searchPlaceholder = "Buscar...",
  pagination = true,
  pageSize = 10,
  className,
  onRowClick,
  loading = false,
  emptyMessage = "Nenhum resultado encontrado."
}: SimpleDataTableProps) {
  const [searchTerm, setSearchTerm] = React.useState('')
  const [sortConfig, setSortConfig] = React.useState<{ key: string; direction: 'asc' | 'desc' } | null>(null)
  const [currentPage, setCurrentPage] = React.useState(1)

  // Filter data based on search term
  const filteredData = React.useMemo(() => {
    if (!searchTerm) return data
    return data.filter(item =>
      Object.values(item).some(value =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  }, [data, searchTerm])

  // Sort data
  const sortedData = React.useMemo(() => {
    if (!sortConfig) return filteredData

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key]
      const bValue = b[sortConfig.key]

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1
      return 0
    })
  }, [filteredData, sortConfig])

  // Paginate data
  const paginatedData = React.useMemo(() => {
    if (!pagination) return sortedData
    const startIndex = (currentPage - 1) * pageSize
    return sortedData.slice(startIndex, startIndex + pageSize)
  }, [sortedData, currentPage, pageSize, pagination])

  const totalPages = Math.ceil(sortedData.length / pageSize)

  const handleSort = (key: string) => {
    setSortConfig(current => {
      if (current?.key === key) {
        return current.direction === 'asc'
          ? { key, direction: 'desc' }
          : null
      }
      return { key, direction: 'asc' }
    })
  }

  return (
    <div className={cn('w-full space-y-4', className)}>
      {/* Search */}
      {searchable && (
        <div className="flex items-center justify-between">
          <div className="flex-1 max-w-sm">
            <label htmlFor="table-search" className="sr-only">
              Buscar na tabela
            </label>
            <input
              id="table-search"
              type="search"
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="table-search"
              aria-describedby="search-results-count"
            />
          </div>
          <div
            id="search-results-count"
            className="text-sm text-gray-500"
            aria-live="polite"
          >
            {sortedData.length} resultado(s)
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
                  onClick={() => column.sortable && handleSort(column.key)}
                  className={cn(
                    column.sortable && 'table-head-sortable',
                    sortConfig?.key === column.key && 'table-head-sorted'
                  )}
                  aria-sort={
                    sortConfig?.key === column.key
                      ? sortConfig.direction === 'asc' ? 'ascending' : 'descending'
                      : column.sortable ? 'none' : undefined
                  }
                  role={column.sortable ? 'columnheader button' : 'columnheader'}
                  tabIndex={column.sortable ? 0 : undefined}
                  onKeyDown={(e) => {
                    if (column.sortable && (e.key === 'Enter' || e.key === ' ')) {
                      e.preventDefault()
                      handleSort(column.key)
                    }
                  }}
                >
                  <div className="flex items-center gap-2">
                    {column.header}
                    {column.sortable && (
                      <span
                        className={cn(
                          "text-brand-primary",
                          sortConfig?.key !== column.key && "opacity-50"
                        )}
                        aria-hidden="true"
                      >
                        {sortConfig?.key === column.key && sortConfig.direction === 'desc' ? '↓' : '↑'}
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
            ) : paginatedData.length ? (
              paginatedData.map((row, index) => (
                <TableRow
                  key={index}
                  clickable={!!onRowClick}
                  onClick={() => onRowClick?.(row)}
                  className={cn(onRowClick && 'table-row-clickable')}
                >
                  {columns.map((column) => (
                    <TableCell key={column.key}>
                      {row[column.key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center py-8 text-gray-500">
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {pagination && totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Mostrando {((currentPage - 1) * pageSize) + 1} a{' '}
            {Math.min(currentPage * pageSize, sortedData.length)}{' '}
            de {sortedData.length} resultado(s)
          </div>

          <div className="flex items-center space-x-2">
            <button
              className="pagination-button"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >
              {'<<'}
            </button>
            <button
              className="pagination-button"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              {'<'}
            </button>

            <span className="text-sm text-gray-700">
              Página {currentPage} de {totalPages}
            </span>

            <button
              className="pagination-button"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              {'>'}
            </button>
            <button
              className="pagination-button"
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
            >
              {'>>'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// Basic Table Components (for custom usage)
export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  variant?: 'default' | 'striped' | 'bordered'
}

const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const variants = {
      default: '',
      striped: '[&_tbody_tr:nth-child(odd)]:bg-gray-50',
      bordered: 'border border-gray-200'
    }

    return (
      <div className="w-full overflow-auto">
        <table
          ref={ref}
          className={cn('table-base', variants[variant], className)}
          {...props}
        >
          {children}
        </table>
      </div>
    )
  }
)

Table.displayName = "Table"

// Table Header Component
export interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> { }

const TableHeader = React.forwardRef<HTMLTableSectionElement, TableHeaderProps>(
  ({ className, ...props }, ref) => (
    <thead
      ref={ref}
      className={cn('table-header', className)}
      {...props}
    />
  )
)

TableHeader.displayName = "TableHeader"

// Table Body Component
export interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> { }

const TableBody = React.forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, ...props }, ref) => (
    <tbody
      ref={ref}
      className={cn('table-body', className)}
      {...props}
    />
  )
)

TableBody.displayName = "TableBody"

// Table Row Component
export interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  selected?: boolean
  clickable?: boolean
}

const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, selected = false, clickable = false, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        'table-row',
        selected && 'table-row-selected',
        clickable && 'table-row-clickable',
        className
      )}
      {...props}
    />
  )
)

TableRow.displayName = "TableRow"

// Table Head Cell Component
export interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  sortable?: boolean
  numeric?: boolean
}

const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, sortable = false, numeric = false, children, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        'table-head',
        sortable && 'table-head-sortable',
        numeric && 'text-right',
        className
      )}
      {...props}
    >
      {children}
    </th>
  )
)

TableHead.displayName = "TableHead"

// Table Cell Component
export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  numeric?: boolean
}

const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, numeric = false, ...props }, ref) => (
    <td
      ref={ref}
      className={cn(
        'table-cell',
        numeric && 'table-cell-numeric',
        className
      )}
      {...props}
    />
  )
)

TableCell.displayName = "TableCell"

// Table Footer Component
export interface TableFooterProps extends React.HTMLAttributes<HTMLTableSectionElement> { }

const TableFooter = React.forwardRef<HTMLTableSectionElement, TableFooterProps>(
  ({ className, ...props }, ref) => (
    <tfoot
      ref={ref}
      className={cn('border-t border-gray-200 bg-gray-50 font-medium', className)}
      {...props}
    />
  )
)

TableFooter.displayName = "TableFooter"

// Table Caption Component
export interface TableCaptionProps extends React.HTMLAttributes<HTMLTableCaptionElement> { }

const TableCaption = React.forwardRef<HTMLTableCaptionElement, TableCaptionProps>(
  ({ className, ...props }, ref) => (
    <caption
      ref={ref}
      className={cn('mt-4 text-sm text-gray-500', className)}
      {...props}
    />
  )
)

TableCaption.displayName = "TableCaption"



export {
  SimpleDataTable,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
};

