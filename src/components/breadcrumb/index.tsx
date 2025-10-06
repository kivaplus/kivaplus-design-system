import React from 'react'
import { cn } from '../../utils/helpers'

export interface BreadcrumbItem {
  label: string
  href?: string
  icon?: React.ReactNode
  current?: boolean
}

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  items: BreadcrumbItem[]
  separator?: React.ReactNode
  maxItems?: number
  showHome?: boolean
  homeIcon?: React.ReactNode
  onItemClick?: (item: BreadcrumbItem, index: number) => void
}

const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({
    className,
    items,
    separator,
    maxItems = 4,
    showHome = true,
    homeIcon,
    onItemClick,
    ...props
  }, ref) => {
    const defaultSeparator = (
      <svg
        className="breadcrumb-separator-icon"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    )

    const defaultHomeIcon = (
      <svg
        className="breadcrumb-home-icon"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    )

    // Handle collapsed items when maxItems is exceeded
    const displayItems = React.useMemo(() => {
      if (items.length <= maxItems) return items

      const firstItem = items[0]
      const lastItems = items.slice(-maxItems + 2)

      return [
        firstItem,
        { label: '...', collapsed: true } as BreadcrumbItem & { collapsed: boolean },
        ...lastItems
      ]
    }, [items, maxItems])

    const handleItemClick = (item: BreadcrumbItem, index: number, event: React.MouseEvent) => {
      if ('collapsed' in item && item.collapsed) {
        event.preventDefault()
        return
      }

      if (item.current) {
        event.preventDefault()
        return
      }

      onItemClick?.(item, index)
    }

    return (
      <nav
        ref={ref}
        aria-label="Breadcrumb"
        className={cn('breadcrumb', className)} // Use CSS component class
        {...props}
      >
        <ol className="breadcrumb-list"> {/* Use CSS component class */}
          {/* Home Icon */}
          {showHome && (
            <li>
              <div className="breadcrumb-item"> {/* Use CSS component class */}
                <button
                  type="button"
                  onClick={(e) => handleItemClick({ label: 'Home', href: '/' }, -1, e)}
                  className="breadcrumb-home" // Use CSS component class
                >
                  {homeIcon || defaultHomeIcon}
                  <span className="sr-only">Home</span>
                </button>
              </div>
            </li>
          )}

          {displayItems.map((item, index) => (
            <li key={index} className="breadcrumb-item"> {/* Use CSS component class */}
              {/* Separator */}
              {(showHome || index > 0) && (
                <div className="breadcrumb-separator"> {/* Use CSS component class */}
                  {separator || defaultSeparator}
                </div>
              )}

              {/* Breadcrumb Item */}
              <div className="breadcrumb-item"> {/* Use CSS component class */}
                {'collapsed' in item && item.collapsed ? (
                  <button
                    type="button"
                    className="breadcrumb-collapsed" // Use CSS component class
                    aria-label="Show hidden items"
                  >
                    {item.label}
                  </button>
                ) : item.current ? (
                  <span
                    className="breadcrumb-current" // Use CSS component class
                    aria-current="page"
                  >
                    {item.icon && <span className="breadcrumb-icon">{item.icon}</span>}
                    {item.label}
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={(e) => handleItemClick(item, index, e)}
                    className="breadcrumb-link" // Use CSS component class
                  >
                    {item.icon && <span className="breadcrumb-icon">{item.icon}</span>}
                    {item.label}
                  </button>
                )}
              </div>
            </li>
          ))}
        </ol>
      </nav>
    )
  }
)

Breadcrumb.displayName = "Breadcrumb"

// Simple Breadcrumb Hook for easy usage
export const useBreadcrumb = (items: BreadcrumbItem[]) => {
  const [breadcrumbItems, setBreadcrumbItems] = React.useState<BreadcrumbItem[]>(items)

  const updateBreadcrumb = React.useCallback((newItems: BreadcrumbItem[]) => {
    setBreadcrumbItems(newItems)
  }, [])

  const addBreadcrumb = React.useCallback((item: BreadcrumbItem) => {
    setBreadcrumbItems(prev => [...prev, item])
  }, [])

  const removeBreadcrumb = React.useCallback((index: number) => {
    setBreadcrumbItems(prev => prev.filter((_, i) => i !== index))
  }, [])

  return {
    items: breadcrumbItems,
    updateBreadcrumb,
    addBreadcrumb,
    removeBreadcrumb
  }
}

export { Breadcrumb }
