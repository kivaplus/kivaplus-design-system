import React from 'react'
import { cn } from '../../utils/helpers'

// Accordion Component
export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: 'single' | 'multiple'
  collapsible?: boolean
  value?: string | string[]
  onValueChange?: (value: string | string[]) => void
}

const AccordionContext = React.createContext<{
  type: 'single' | 'multiple'
  value: string | string[]
  onValueChange: (value: string | string[]) => void
}>({
  type: 'single',
  value: '',
  onValueChange: () => { }
})

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({
    className,
    type = 'single',
    collapsible = false,
    value,
    onValueChange,
    children,
    ...props
  }, ref) => {
    const [internalValue, setInternalValue] = React.useState<string | string[]>(
      type === 'multiple' ? [] : ''
    )

    const currentValue = value !== undefined ? value : internalValue

    const handleValueChange = React.useCallback((newValue: string | string[]) => {
      if (value === undefined) {
        setInternalValue(newValue)
      }
      onValueChange?.(newValue)
    }, [value, onValueChange])

    return (
      <AccordionContext.Provider value={{ type, value: currentValue, onValueChange: handleValueChange }}>
        <div
          ref={ref}
          className={cn('accordion', className)}
          role="region"
          aria-label="Accordion"
          {...props}
        >
          {children}
        </div>
      </AccordionContext.Provider>
    )
  }
)

Accordion.displayName = "Accordion"

// Accordion Item Component
export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
  disabled?: boolean
}

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ className, value, disabled = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'accordion-item',
          disabled && 'accordion-item-disabled',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

AccordionItem.displayName = "AccordionItem"

// Accordion Trigger Component
export interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
  icon?: React.ReactNode
}

const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ className, value, icon, children, ...props }, ref) => {
    const { type, value: currentValue, onValueChange } = React.useContext(AccordionContext)
    const contentId = `accordion-content-${value}`
    const triggerId = `accordion-trigger-${value}`

    const isOpen = type === 'multiple'
      ? Array.isArray(currentValue) && currentValue.includes(value)
      : currentValue === value

    const handleClick = () => {
      if (type === 'multiple') {
        const currentArray = Array.isArray(currentValue) ? currentValue : []
        const newValue = currentArray.includes(value)
          ? currentArray.filter(v => v !== value)
          : [...currentArray, value]
        onValueChange(newValue)
      } else {
        const newValue = currentValue === value ? '' : value
        onValueChange(newValue)
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        handleClick()
      }
    }

    return (
      <button
        ref={ref}
        id={triggerId}
        className={cn('accordion-trigger', className)}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-controls={contentId}
        type="button"
        {...props}
      >
        <span className="accordion-trigger-content">
          {icon}
          {children}
        </span>
        <svg
          className={cn(
            'accordion-trigger-icon',
            isOpen && 'accordion-trigger-icon-open'
          )}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    )
  }
)

AccordionTrigger.displayName = "AccordionTrigger"

// Accordion Content Component
export interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
}

const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ className, value, children, ...props }, ref) => {
    const { type, value: currentValue } = React.useContext(AccordionContext)
    const contentId = `accordion-content-${value}`
    const triggerId = `accordion-trigger-${value}`

    const isOpen = type === 'multiple'
      ? Array.isArray(currentValue) && currentValue.includes(value)
      : currentValue === value

    if (!isOpen) return null

    return (
      <div
        ref={ref}
        id={contentId}
        className={cn('accordion-content', className)}
        role="region"
        aria-labelledby={triggerId}
        {...props}
      >
        {children}
      </div>
    )
  }
)

AccordionContent.displayName = "AccordionContent"
export { Accordion, AccordionContent, AccordionItem, AccordionTrigger }

