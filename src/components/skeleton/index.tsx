import React from 'react'
import { cn } from '../../utils/helpers'

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded'
  width?: string | number
  height?: string | number
  animated?: boolean
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({
    className,
    variant = 'text',
    width,
    height,
    animated = true,
    style,
    ...props
  }, ref) => {
    const getVariantClass = () => {
      switch (variant) {
        case 'text': return 'skeleton-text'
        case 'circular': return 'skeleton-circular'
        case 'rectangular': return 'skeleton-rectangular'
        case 'rounded': return 'skeleton-rounded'
        default: return 'skeleton-text'
      }
    }

    const defaultSizes = {
      text: { width: '100%', height: '1rem' },
      circular: { width: '2.5rem', height: '2.5rem' },
      rectangular: { width: '100%', height: '6rem' },
      rounded: { width: '100%', height: '6rem' }
    }

    const computedStyle = {
      ...style,
      width: width || defaultSizes[variant].width,
      height: height || defaultSizes[variant].height
    }

    return (
      <div
        ref={ref}
        className={cn(
          getVariantClass(),
          !animated && 'animate-none',
          className
        )}
        style={computedStyle}
        {...props}
      />
    )
  }
)

Skeleton.displayName = "Skeleton"

// Skeleton Avatar Component
export interface SkeletonAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  loading?: boolean
  skeleton?: boolean
  children?: React.ReactNode
}

const SkeletonAvatar = React.forwardRef<HTMLDivElement, SkeletonAvatarProps>(
  ({ className, size = 'md', loading = false, skeleton = false, children, ...props }, ref) => {
    const sizes = {
      xs: 'w-6 h-6',
      sm: 'w-8 h-8',
      md: 'w-10 h-10',
      lg: 'w-12 h-12',
      xl: 'w-16 h-16',
      '2xl': 'w-20 h-20'
    }

    if (loading || skeleton) {
      return (
        <Skeleton
          ref={ref}
          variant="circular"
          className={cn(sizes[size], className)}
          {...props}
        />
      )
    }

    return (
      <div ref={ref} className={cn(sizes[size], className)} {...props}>
        {children}
      </div>
    )
  }
)

SkeletonAvatar.displayName = "SkeletonAvatar"

// Skeleton Text Component
export interface SkeletonTextProps extends React.HTMLAttributes<HTMLDivElement> {
  lines?: number
  spacing?: 'tight' | 'normal' | 'loose'
  lastLineWidth?: string
  loading?: boolean
  skeleton?: boolean
  children?: React.ReactNode
}

const SkeletonText = React.forwardRef<HTMLDivElement, SkeletonTextProps>(
  ({
    className,
    lines = 3,
    spacing = 'normal',
    lastLineWidth = '75%',
    loading = false,
    skeleton = false,
    children,
    ...props
  }, ref) => {
    const spacingClasses = {
      tight: 'gap-1',
      normal: 'gap-2',
      loose: 'gap-3'
    }

    if (loading || skeleton) {
      return (
        <div
          ref={ref}
          className={cn('flex flex-col', spacingClasses[spacing], className)}
          {...props}
        >
          {Array.from({ length: lines }).map((_, index) => (
            <Skeleton
              key={index}
              variant="text"
              width={index === lines - 1 ? lastLineWidth : '100%'}
            />
          ))}
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn('flex flex-col', spacingClasses[spacing], className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

SkeletonText.displayName = "SkeletonText"

// Skeleton Card Component
export interface SkeletonCardProps extends React.HTMLAttributes<HTMLDivElement> {
  showAvatar?: boolean
  showImage?: boolean
  textLines?: number
  actions?: boolean
  loading?: boolean
  skeleton?: boolean
  children?: React.ReactNode
}

const SkeletonCard = React.forwardRef<HTMLDivElement, SkeletonCardProps>(
  ({
    className,
    showAvatar = false,
    showImage = false,
    textLines = 3,
    actions = false,
    loading = false,
    skeleton = false,
    children,
    ...props
  }, ref) => {
    if (loading || skeleton) {
      return (
        <div
          ref={ref}
          className={cn(
            'skeleton-card',
            className
          )}
          {...props}
        >
          {/* Image */}
          {showImage && (
            <Skeleton variant="rectangular" height="12rem" className="mb-4" />
          )}

          {/* Header */}
          <div className="flex items-start gap-4 mb-4">
            {showAvatar && (
              <SkeletonAvatar size="md" skeleton />
            )}
            <div className="flex-1">
              <Skeleton variant="text" width="60%" className="mb-2" />
              <Skeleton variant="text" width="40%" />
            </div>
          </div>

          {/* Content */}
          <SkeletonText lines={textLines} className="mb-4" skeleton />

          {/* Actions */}
          {actions && (
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              <Skeleton variant="rounded" width="5rem" height="2rem" />
              <Skeleton variant="rounded" width="4rem" height="2rem" />
            </div>
          )}
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn(
          'skeleton-card',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

SkeletonCard.displayName = "SkeletonCard"

// Skeleton Table Component
export interface SkeletonTableProps extends React.HTMLAttributes<HTMLDivElement> {
  rows?: number
  columns?: number
  showHeader?: boolean
  loading?: boolean
  skeleton?: boolean
  children?: React.ReactNode
}

const SkeletonTable = React.forwardRef<HTMLDivElement, SkeletonTableProps>(
  ({
    className,
    rows = 5,
    columns = 4,
    showHeader = true,
    loading = false,
    skeleton = false,
    children,
    ...props
  }, ref) => {
    if (loading || skeleton) {
      return (
        <div
          ref={ref}
          className={cn('skeleton-table', className)}
          {...props}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              {/* Header */}
              {showHeader && (
                <thead className="bg-gray-50">
                  <tr>
                    {Array.from({ length: columns }).map((_, columnIndex) => (
                      <th key={columnIndex} className="px-6 py-3 text-left">
                        <Skeleton variant="text" width="80%" />
                      </th>
                    ))}
                  </tr>
                </thead>
              )}

              {/* Body */}
              <tbody className="bg-white divide-y divide-gray-200">
                {Array.from({ length: rows }).map((_, rowIndex) => (
                  <tr key={rowIndex}>
                    {Array.from({ length: columns }).map((_, columnIndex) => (
                      <td key={columnIndex} className="px-6 py-4">
                        <Skeleton
                          variant="text"
                          width={
                            columnIndex === 0 ? '90%' :
                              columnIndex === columns - 1 ? '60%' :
                                '80%'
                          }
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn('skeleton-table', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

SkeletonTable.displayName = "SkeletonTable"

// Skeleton List Component
export interface SkeletonListProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: number
  showAvatar?: boolean
  showIcon?: boolean
  variant?: 'simple' | 'detailed'
  loading?: boolean
  skeleton?: boolean
  children?: React.ReactNode
}

const SkeletonList = React.forwardRef<HTMLDivElement, SkeletonListProps>(
  ({
    className,
    items = 5,
    showAvatar = false,
    showIcon = false,
    variant = 'simple',
    loading = false,
    skeleton = false,
    children,
    ...props
  }, ref) => {
    if (loading || skeleton) {
      return (
        <div
          ref={ref}
          className={cn('skeleton-list', className)}
          {...props}
        >
          {Array.from({ length: items }).map((_, index) => (
            <div key={index} className="py-4">
              <div className="flex items-center gap-4">
                {/* Avatar or Icon */}
                {showAvatar && <SkeletonAvatar size="md" skeleton />}
                {showIcon && !showAvatar && (
                  <Skeleton variant="rectangular" width="1.5rem" height="1.5rem" />
                )}

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <Skeleton variant="text" width="70%" className="mb-1" />
                  {variant === 'detailed' && (
                    <Skeleton variant="text" width="50%" />
                  )}
                </div>

                {/* Action */}
                <Skeleton variant="text" width="3rem" />
              </div>
            </div>
          ))}
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn('skeleton-list', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

SkeletonList.displayName = "SkeletonList"

// Skeleton Form Component
export interface SkeletonFormProps extends React.HTMLAttributes<HTMLDivElement> {
  fields?: number
  showLabels?: boolean
  showButtons?: boolean
  loading?: boolean
  skeleton?: boolean
  children?: React.ReactNode
}

const SkeletonForm = React.forwardRef<HTMLDivElement, SkeletonFormProps>(
  ({
    className,
    fields = 4,
    showLabels = true,
    showButtons = true,
    loading = false,
    skeleton = false,
    children,
    ...props
  }, ref) => {
    if (loading || skeleton) {
      return (
        <div
          ref={ref}
          className={cn('skeleton-form', className)}
          {...props}
        >
          {Array.from({ length: fields }).map((_, index) => (
            <div key={index}>
              {showLabels && (
                <Skeleton variant="text" width="25%" className="mb-2" />
              )}
              <Skeleton variant="rounded" height="2.5rem" />
            </div>
          ))}

          {showButtons && (
            <div className="flex gap-3 pt-4">
              <Skeleton variant="rounded" width="5rem" height="2.5rem" />
              <Skeleton variant="rounded" width="4rem" height="2.5rem" />
            </div>
          )}
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn('skeleton-form', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

SkeletonForm.displayName = "SkeletonForm"

// Skeleton Page Component (full page skeleton)
export interface SkeletonPageProps extends React.HTMLAttributes<HTMLDivElement> {
  showHeader?: boolean
  showSidebar?: boolean
  showFooter?: boolean
  contentVariant?: 'cards' | 'list' | 'table' | 'form'
  loading?: boolean
  skeleton?: boolean
  children?: React.ReactNode
}

const SkeletonPage = React.forwardRef<HTMLDivElement, SkeletonPageProps>(
  ({
    className,
    showHeader = true,
    showSidebar = false,
    showFooter = false,
    contentVariant = 'cards',
    loading = false,
    skeleton = false,
    children,
    ...props
  }, ref) => {
    if (loading || skeleton) {
      return (
        <div
          ref={ref}
          className={cn('skeleton-page', className)}
          {...props}
        >
          {/* Header */}
          {showHeader && (
            <div className="bg-white border-b border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Skeleton variant="rectangular" width="2rem" height="2rem" />
                  <Skeleton variant="text" width="8rem" />
                </div>
                <div className="flex items-center gap-3">
                  <SkeletonAvatar size="sm" skeleton />
                  <Skeleton variant="text" width="6rem" />
                </div>
              </div>
            </div>
          )}

          {/* Main Layout */}
          <div className="flex">
            {/* Sidebar */}
            {showSidebar && (
              <div className="w-64 bg-white border-r border-gray-200 p-6">
                <SkeletonList items={6} showIcon variant="simple" skeleton />
              </div>
            )}

            {/* Main Content */}
            <div className="flex-1 p-6">
              {/* Page Header */}
              <div className="mb-8">
                <Skeleton variant="text" width="12rem" height="2rem" className="mb-2" />
                <Skeleton variant="text" width="20rem" />
              </div>

              {/* Content */}
              {contentVariant === 'cards' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <SkeletonCard key={index} showAvatar textLines={2} skeleton />
                  ))}
                </div>
              )}

              {contentVariant === 'list' && (
                <div className="bg-white border border-gray-200 rounded-lg">
                  <SkeletonList items={8} showAvatar variant="detailed" skeleton />
                </div>
              )}

              {contentVariant === 'table' && (
                <SkeletonTable rows={8} columns={5} skeleton />
              )}

              {contentVariant === 'form' && (
                <div className="bg-white border border-gray-200 rounded-lg p-6 max-w-2xl">
                  <SkeletonForm fields={6} skeleton />
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          {showFooter && (
            <div className="bg-white border-t border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <Skeleton variant="text" width="10rem" />
                <div className="flex gap-4">
                  <Skeleton variant="text" width="4rem" />
                  <Skeleton variant="text" width="4rem" />
                  <Skeleton variant="text" width="4rem" />
                </div>
              </div>
            </div>
          )}
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn('skeleton-page', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

SkeletonPage.displayName = "SkeletonPage"

export {
  Skeleton,
  SkeletonAvatar,
  SkeletonCard,
  SkeletonForm,
  SkeletonList,
  SkeletonPage,
  SkeletonTable,
  SkeletonText
}
