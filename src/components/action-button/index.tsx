import React from 'react'
import { cn } from '../../utils/helpers'

export interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'accent' | 'neutral' | 'ghost' | 'outlined'
  size?: 'sm' | 'md' | 'lg'
  shape?: 'square' | 'circle'
  icon?: React.ReactNode
  label?: string
  badge?: React.ReactNode
  selected?: boolean
  loading?: boolean
  tooltip?: string
}

const ActionButton = React.forwardRef<HTMLButtonElement, ActionButtonProps>(
  ({
    className,
    variant = 'default',
    size = 'md',
    shape = 'square',
    icon,
    label,
    badge,
    selected = false,
    loading = false,
    tooltip,
    disabled = false,
    children,
    ...props
  }, ref) => {
    const [showTooltip, setShowTooltip] = React.useState(false)
    const isIconOnly = !label && !children

    const buttonClasses = cn(
      'action-button-base',
      shape === 'circle' ? 'action-button-circle' : 'action-button-square',
      `action-button-${variant}`,
      isIconOnly ? `action-button-${size}-icon-only` : `action-button-${size}-with-text`,
      selected && 'selected',
      loading && 'cursor-not-allowed'
    )

    const iconClasses = cn(
      'flex-shrink-0 flex items-center justify-center',
      `action-button-icon-${size}`
    )

    const handleMouseEnter = () => {
      if (tooltip) setShowTooltip(true)
    }

    const handleMouseLeave = () => {
      if (tooltip) setShowTooltip(false)
    }

    return (
      <div className="relative inline-block">
        <button
          ref={ref}
          disabled={disabled || loading}
          className={cn(buttonClasses, className)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          title={tooltip}
          {...props}
        >
          {loading ? (
            <div className={cn('action-button-spinner', `action-button-icon-${size}`)} />
          ) : (
            <>
              {icon && (
                <span className={iconClasses}>
                  {icon}
                </span>
              )}
              {(label || children) && (
                <span className="truncate">
                  {label || children}
                </span>
              )}
            </>
          )}

          {/* Badge */}
          {badge && (
            <div className="action-button-badge">
              {badge}
            </div>
          )}
        </button>

        {/* Tooltip */}
        {tooltip && showTooltip && (
          <div className="action-button-tooltip" style={{ opacity: showTooltip ? 1 : 0 }}>
            {tooltip}
            <div className="action-button-tooltip-arrow" />
          </div>
        )}
      </div>
    )
  }
)

ActionButton.displayName = "ActionButton"

// Action Button Group Component
export interface ActionButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical'
  spacing?: 'tight' | 'normal' | 'loose'
  variant?: ActionButtonProps['variant']
  size?: ActionButtonProps['size']
  exclusive?: boolean
  value?: string | string[]
  onValueChange?: (value: string | string[]) => void
}

const ActionButtonGroup = React.forwardRef<HTMLDivElement, ActionButtonGroupProps>(
  ({
    className,
    orientation = 'horizontal',
    spacing = 'normal',
    variant = 'default',
    size = 'md',
    exclusive = false,
    value,
    onValueChange,
    children,
    ...props
  }, ref) => {
    const groupClasses = cn(
      'action-button-group',
      orientation === 'horizontal' ? 'action-button-group-horizontal' : 'action-button-group-vertical',
      `action-button-group-spacing-${spacing}`
    )

    const handleButtonClick = (buttonValue: string) => {
      if (!onValueChange) return

      if (exclusive) {
        // Single selection mode
        onValueChange(value === buttonValue ? '' : buttonValue)
      } else {
        // Multiple selection mode
        const currentValues = Array.isArray(value) ? value : []
        const newValues = currentValues.includes(buttonValue)
          ? currentValues.filter(v => v !== buttonValue)
          : [...currentValues, buttonValue]
        onValueChange(newValues)
      }
    }

    return (
      <div
        ref={ref}
        className={cn(groupClasses, className)}
        {...props}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement<ActionButtonProps>(child) && child.type === ActionButton) {
            const buttonValue = (child.props.value ? String(child.props.value) : '') || (typeof child.props.children === 'string' ? child.props.children : '')
            const isSelected = exclusive
              ? value === buttonValue
              : Array.isArray(value) && value.includes(buttonValue)

            return React.cloneElement(child, {
              variant: child.props.variant || variant,
              size: child.props.size || size,
              selected: isSelected,
              onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
                child.props.onClick?.(e)
                if (buttonValue) handleButtonClick(buttonValue)
              }
            })
          }
          return child
        })}
      </div>
    )
  }
)

ActionButtonGroup.displayName = "ActionButtonGroup"

// Floating Action Button Component
export interface FloatingActionButtonProps extends Omit<ActionButtonProps, 'shape'> {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  offset?: 'sm' | 'md' | 'lg'
  extended?: boolean
}

const FloatingActionButton = React.forwardRef<HTMLButtonElement, FloatingActionButtonProps>(
  ({
    className,
    position = 'bottom-right',
    offset = 'md',
    extended = false,
    size = 'lg',
    variant = 'primary',
    ...props
  }, ref) => {
    const containerClasses = cn(
      'floating-action-button-container',
      `floating-action-button-${position}`,
      `floating-action-button-offset-${offset}`
    )

    const buttonClasses = cn(
      'floating-action-button',
      extended && 'floating-action-button-extended'
    )

    return (
      <div className={containerClasses}>
        <ActionButton
          ref={ref}
          shape={extended ? 'square' : 'circle'}
          size={size}
          variant={variant}
          className={cn(buttonClasses, className)}
          {...props}
        />
      </div>
    )
  }
)

FloatingActionButton.displayName = "FloatingActionButton"

export { ActionButton, ActionButtonGroup, FloatingActionButton }
