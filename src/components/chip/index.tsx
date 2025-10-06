import { Cross2Icon } from '@radix-ui/react-icons'
import React from 'react'
import { cn } from '../../utils/helpers'

export interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'primary' | 'accent' | 'success' | 'warning' | 'error' | 'info' | 'outlined' | 'neutral'
  size?: 'sm' | 'md' | 'lg'
  removable?: boolean
  onRemove?: () => void
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export interface ChipGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  chips: Array<{
    id: string
    label: string
    variant?: ChipProps['variant']
    removable?: boolean
    leftIcon?: React.ReactNode
  }>
  onRemove?: (id: string) => void
  maxVisible?: number
  spacing?: 'tight' | 'normal' | 'loose'
}

const Chip = React.forwardRef<HTMLDivElement, ChipProps>(
  ({
    className,
    variant = 'default',
    size = 'md',
    removable = false,
    onRemove,
    leftIcon,
    rightIcon,
    children,
    ...props
  }, ref) => {
    const getChipClasses = () => {
      return [
        'chip-base',
        `chip-${variant}`,
        `chip-${size}`
      ]
    }

    return (
      <div
        className={cn(getChipClasses(), className)}
        ref={ref}
        {...props}
      >
        {leftIcon && (
          <span className="chip-icon flex-shrink-0">
            {leftIcon}
          </span>
        )}

        <span className="truncate">
          {children}
        </span>

        {rightIcon && (
          <span className="chip-icon flex-shrink-0">
            {rightIcon}
          </span>
        )}

        {removable && onRemove && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onRemove()
            }}
            className="chip-remove-button flex-shrink-0"
            type="button"
          >
            <Cross2Icon className="chip-remove-icon w-5 h-5" />
          </button>
        )}
      </div>
    )
  }
)

const ChipGroup = React.forwardRef<HTMLDivElement, ChipGroupProps>(
  ({
    className,
    chips,
    onRemove,
    maxVisible,
    spacing = 'normal',
    ...props
  }, ref) => {
    const getGroupClasses = () => {
      return [
        'chip-group',
        `chip-group-spacing-${spacing}`
      ]
    }

    const visibleChips = maxVisible ? chips.slice(0, maxVisible) : chips
    const hiddenCount = maxVisible ? chips.length - maxVisible : 0

    return (
      <div
        className={cn(getGroupClasses(), className)}
        ref={ref}
        {...props}
      >
        {visibleChips.map((chip) => (
          <Chip
            key={chip.id}
            variant={chip.variant}
            removable={chip.removable}
            onRemove={() => onRemove?.(chip.id)}
            leftIcon={chip.leftIcon}
          >
            {chip.label}
          </Chip>
        ))}
        {hiddenCount > 0 && (
          <Chip variant="outlined" size="sm">
            +{hiddenCount} more
          </Chip>
        )}
      </div>
    )
  }
)

Chip.displayName = "Chip"
ChipGroup.displayName = "ChipGroup"

export { Chip, ChipGroup }
