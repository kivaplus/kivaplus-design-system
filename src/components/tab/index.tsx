import React from 'react'
import { cn } from '../../utils/helpers'

interface TabsContextValue {
  value: string
  onValueChange: (value: string) => void
}

const TabsContext = React.createContext<TabsContextValue | null>(null)

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
}

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ className, value, defaultValue, onValueChange, children, ...props }, ref) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue || '')
    const currentValue = value !== undefined ? value : internalValue

    const handleValueChange = React.useCallback((newValue: string) => {
      if (value === undefined) {
        setInternalValue(newValue)
      }
      onValueChange?.(newValue)
    }, [value, onValueChange])

    return (
      <TabsContext.Provider value={{ value: currentValue, onValueChange: handleValueChange }}>
        <div ref={ref} className={cn('w-full', className)} {...props}>
          {children}
        </div>
      </TabsContext.Provider>
    )
  }
)

const TabsList = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    const context = React.useContext(TabsContext)

    // Get all tab values from children - memoized to prevent infinite re-renders
    const tabValues = React.useMemo(() => {
      const values: string[] = []
      React.Children.forEach(children, (child) => {
        if (
          React.isValidElement(child) &&
          child.props &&
          typeof child.props === 'object' &&
          child.props !== null &&
          'value' in child.props
        ) {
          values.push((child.props as any).value)
        }
      })
      return values
    }, [children])

    // Calculate indicator position based on active tab
    const activeIndex = context?.value ? tabValues.indexOf(context.value) : -1
    const indicatorStyle = activeIndex >= 0 ? {
      transform: `translateX(${activeIndex * 100}%)`,
      width: `${100 / tabValues.length}%`
    } : { opacity: 0 }

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (!context) return

      const currentIndex = tabValues.indexOf(context.value)
      let newIndex = currentIndex

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault()
          newIndex = currentIndex > 0 ? currentIndex - 1 : tabValues.length - 1
          break
        case 'ArrowRight':
          e.preventDefault()
          newIndex = currentIndex < tabValues.length - 1 ? currentIndex + 1 : 0
          break
        case 'Home':
          e.preventDefault()
          newIndex = 0
          break
        case 'End':
          e.preventDefault()
          newIndex = tabValues.length - 1
          break
        default:
          return
      }

      context.onValueChange(tabValues[newIndex])

      // Focus the new tab
      const newTab = document.querySelector(`[data-tab-value="${tabValues[newIndex]}"]`) as HTMLElement
      newTab?.focus()
    }

    return (
      <div ref={ref} className={cn('relative w-full', className)} {...props}>
        {/* Tabs in horizontal layout */}
        <div
          className="flex w-full"
          role="tablist"
          aria-orientation="horizontal"
          onKeyDown={handleKeyDown}
        >
          {children}
        </div>
        {/* Single sliding indicator */}
        <div className="relative w-full h-1">
          <div
            className="tab-sliding-indicator"
            style={indicatorStyle}
            aria-hidden="true"
          />
        </div>
      </div>
    )
  }
)

interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
}

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, children, ...props }, ref) => {
    const context = React.useContext(TabsContext)
    if (!context) throw new Error('TabsTrigger must be used within Tabs')

    const { value: selectedValue, onValueChange } = context
    const isSelected = selectedValue === value
    const panelId = `tabpanel-${value}`
    const tabId = `tab-${value}`

    return (
      <button
        ref={ref}
        id={tabId}
        type="button"
        role="tab"
        aria-selected={isSelected}
        aria-controls={panelId}
        tabIndex={isSelected ? 0 : -1}
        data-tab-value={value}
        onClick={() => onValueChange(value)}
        className={cn(
          'tab-trigger', // Base tab trigger component class
          isSelected && 'tab-trigger-active',
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
}

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, children, ...props }, ref) => {
    const context = React.useContext(TabsContext)
    if (!context) throw new Error('TabsContent must be used within Tabs')

    const { value: selectedValue } = context
    const panelId = `tabpanel-${value}`
    const tabId = `tab-${value}`

    if (selectedValue !== value) return null

    return (
      <div
        ref={ref}
        id={panelId}
        role="tabpanel"
        aria-labelledby={tabId}
        tabIndex={0}
        className={cn('mt-4 focus-visible:outline-none', className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Tabs.displayName = "Tabs"
TabsList.displayName = "TabsList"
TabsTrigger.displayName = "TabsTrigger"
TabsContent.displayName = "TabsContent"

export { Tabs, TabsContent, TabsList, TabsTrigger }

