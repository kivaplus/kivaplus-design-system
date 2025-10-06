import React from 'react'
import { cn } from '../../utils/helpers'

// Tooltip Component
export interface TooltipProps {
  content: React.ReactNode
  children: React.ReactNode
  side?: 'top' | 'right' | 'bottom' | 'left'
  align?: 'start' | 'center' | 'end'
  delay?: number
  disabled?: boolean
  className?: string
  arrow?: boolean
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  side = 'top',
  align = 'center',
  delay = 700,
  disabled = false,
  className,
  arrow = true
}) => {
  const [isVisible, setIsVisible] = React.useState(false)
  const [shouldShow, setShouldShow] = React.useState(false)
  const timeoutRef = React.useRef<number | null>(null)
  const triggerRef = React.useRef<HTMLDivElement>(null)

  const handleMouseEnter = () => {
    if (disabled) return
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      setShouldShow(true)
      setIsVisible(true)
    }, delay)
  }

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsVisible(false)
    setTimeout(() => setShouldShow(false), 150) // Animation duration
  }

  const handleFocus = () => {
    if (disabled) return
    setShouldShow(true)
    setIsVisible(true)
  }

  const handleBlur = () => {
    setIsVisible(false)
    setTimeout(() => setShouldShow(false), 150)
  }

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  // Use CSS component classes
  const getSideClass = () => {
    switch (side) {
      case 'top': return 'tooltip-top'
      case 'right': return 'tooltip-right'
      case 'bottom': return 'tooltip-bottom'
      case 'left': return 'tooltip-left'
      default: return 'tooltip-top'
    }
  }

  const getAlignClass = () => {
    const isHorizontal = side === 'top' || side === 'bottom'

    if (isHorizontal) {
      switch (align) {
        case 'start': return 'tooltip-align-start-horizontal'
        case 'center': return 'tooltip-align-center-horizontal'
        case 'end': return 'tooltip-align-end-horizontal'
        default: return 'tooltip-align-center-horizontal'
      }
    } else {
      switch (align) {
        case 'start': return 'tooltip-align-start-vertical'
        case 'center': return 'tooltip-align-center-vertical'
        case 'end': return 'tooltip-align-end-vertical'
        default: return 'tooltip-align-center-vertical'
      }
    }
  }

  const getArrowClass = () => {
    const direction = (() => {
      switch (side) {
        case 'top': return 'tooltip-arrow-top'
        case 'right': return 'tooltip-arrow-right'
        case 'bottom': return 'tooltip-arrow-bottom'
        case 'left': return 'tooltip-arrow-left'
        default: return 'tooltip-arrow-top'
      }
    })()

    const position = (() => {
      const isHorizontal = side === 'top' || side === 'bottom'

      if (isHorizontal) {
        switch (align) {
          case 'start': return 'tooltip-arrow-horizontal-start'
          case 'center': return 'tooltip-arrow-horizontal-center'
          case 'end': return 'tooltip-arrow-horizontal-end'
          default: return 'tooltip-arrow-horizontal-center'
        }
      } else {
        switch (align) {
          case 'start': return 'tooltip-arrow-vertical-start'
          case 'center': return 'tooltip-arrow-vertical-center'
          case 'end': return 'tooltip-arrow-vertical-end'
          default: return 'tooltip-arrow-vertical-center'
        }
      }
    })()

    return `${direction} ${position}`
  }

  return (
    <div
      ref={triggerRef}
      className="tooltip-container"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      {children}

      {shouldShow && (
        <div
          className={cn(
            'tooltip-content',
            getSideClass(),
            getAlignClass(),
            isVisible ? 'tooltip-visible' : 'tooltip-hidden',
            className
          )}
          role="tooltip"
        >
          {content}
          {arrow && (
            <div className={cn('tooltip-arrow', getArrowClass())} />
          )}
        </div>
      )}
    </div>
  )
}

Tooltip.displayName = "Tooltip"

// Popover Component
export interface PopoverProps {
  content: React.ReactNode
  children: React.ReactNode
  trigger?: 'click' | 'hover' | 'focus'
  side?: 'top' | 'right' | 'bottom' | 'left'
  align?: 'start' | 'center' | 'end'
  open?: boolean
  onOpenChange?: (open: boolean) => void
  closeOnClickOutside?: boolean
  closeOnEscape?: boolean
  className?: string
  contentClassName?: string
  arrow?: boolean
}

const Popover: React.FC<PopoverProps> = ({
  content,
  children,
  trigger = 'click',
  side = 'bottom',
  align = 'center',
  open: controlledOpen,
  onOpenChange,
  closeOnClickOutside = true,
  closeOnEscape = true,
  className,
  contentClassName,
  arrow = true
}) => {
  const [internalOpen, setInternalOpen] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)

  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen

  const setOpen = React.useCallback((open: boolean) => {
    if (controlledOpen === undefined) {
      setInternalOpen(open)
    }
    onOpenChange?.(open)
  }, [controlledOpen, onOpenChange])

  // Handle outside clicks
  React.useEffect(() => {
    if (!isOpen || !closeOnClickOutside) return

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, closeOnClickOutside, setOpen])

  // Handle escape key
  React.useEffect(() => {
    if (!isOpen || !closeOnEscape) return

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, closeOnEscape, setOpen])

  const handleTriggerClick = () => {
    if (trigger === 'click') {
      setOpen(!isOpen)
    }
  }

  const handleTriggerMouseEnter = () => {
    if (trigger === 'hover') {
      setOpen(true)
    }
  }

  const handleTriggerMouseLeave = () => {
    if (trigger === 'hover') {
      setOpen(false)
    }
  }

  const handleTriggerFocus = () => {
    if (trigger === 'focus') {
      setOpen(true)
    }
  }

  const handleTriggerBlur = () => {
    if (trigger === 'focus') {
      setOpen(false)
    }
  }

  // Use CSS component classes
  const getSideClass = () => {
    switch (side) {
      case 'top': return 'popover-top'
      case 'right': return 'popover-right'
      case 'bottom': return 'popover-bottom'
      case 'left': return 'popover-left'
      default: return 'popover-bottom'
    }
  }

  const getAlignClass = () => {
    const isHorizontal = side === 'top' || side === 'bottom'

    if (isHorizontal) {
      switch (align) {
        case 'start': return 'tooltip-align-start-horizontal'
        case 'center': return 'tooltip-align-center-horizontal'
        case 'end': return 'tooltip-align-end-horizontal'
        default: return 'tooltip-align-center-horizontal'
      }
    } else {
      switch (align) {
        case 'start': return 'tooltip-align-start-vertical'
        case 'center': return 'tooltip-align-center-vertical'
        case 'end': return 'tooltip-align-end-vertical'
        default: return 'tooltip-align-center-vertical'
      }
    }
  }

  const getArrowClass = () => {
    const direction = (() => {
      switch (side) {
        case 'top': return 'popover-arrow-top'
        case 'right': return 'popover-arrow-right'
        case 'bottom': return 'popover-arrow-bottom'
        case 'left': return 'popover-arrow-left'
        default: return 'popover-arrow-bottom'
      }
    })()

    const position = (() => {
      const isHorizontal = side === 'top' || side === 'bottom'

      if (isHorizontal) {
        switch (align) {
          case 'start': return 'popover-arrow-horizontal-start'
          case 'center': return 'popover-arrow-horizontal-center'
          case 'end': return 'popover-arrow-horizontal-end'
          default: return 'popover-arrow-horizontal-center'
        }
      } else {
        switch (align) {
          case 'start': return 'popover-arrow-vertical-start'
          case 'center': return 'popover-arrow-vertical-center'
          case 'end': return 'popover-arrow-vertical-end'
          default: return 'popover-arrow-vertical-center'
        }
      }
    })()

    return `${direction} ${position}`
  }

  return (
    <div
      ref={containerRef}
      className={cn('popover-container', className)}
      onClick={handleTriggerClick}
      onMouseEnter={handleTriggerMouseEnter}
      onMouseLeave={handleTriggerMouseLeave}
      onFocus={handleTriggerFocus}
      onBlur={handleTriggerBlur}
    >
      {children}

      {isOpen && (
        <div
          className={cn(
            'popover-content',
            getSideClass(),
            getAlignClass(),
            contentClassName
          )}
          role="dialog"
          aria-modal="true"
        >
          {content}
          {arrow && (
            <div className={cn('popover-arrow', getArrowClass())} />
          )}
        </div>
      )}
    </div>
  )
}

Popover.displayName = "Popover"

// Popover Content Component
export interface PopoverContentProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  footer?: React.ReactNode
}

const PopoverContent = React.forwardRef<HTMLDivElement, PopoverContentProps>(
  ({ className, title, description, footer, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('popover-content-body', className)}
        {...props}
      >
        {(title || description) && (
          <div className="popover-header">
            {title && (
              <h4 className="popover-title">
                {title}
              </h4>
            )}
            {description && (
              <p className="popover-description">
                {description}
              </p>
            )}
          </div>
        )}

        {children}

        {footer && (
          <div className="popover-footer">
            {footer}
          </div>
        )}
      </div>
    )
  }
)

PopoverContent.displayName = "PopoverContent"

export { Popover, PopoverContent, Tooltip }
