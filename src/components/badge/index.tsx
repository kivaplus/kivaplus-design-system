'use client'
import React from 'react'
import { cn } from '../../utils/helpers'

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'primary' | 'accent' | 'success' | 'warning' | 'error' | 'info'
  size?: 'sm' | 'md' | 'lg'
  dot?: boolean
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({
    className,
    variant = 'default',
    size = 'md',
    dot = false,
    children,
    ...props
  }, ref) => {
    const getBadgeClasses = () => {
      if (dot) {
        return [
          'badge-base',
          'badge-dot',
          `badge-${variant}`,
          `badge-dot-${size}`
        ]
      }

      // All non-dot badges are circular (for counts/notifications)
      return [
        'badge-base',
        'badge-count',
        `badge-${variant}`,
        `badge-count-${size}`
      ]
    }

    return (
      <div
        className={cn(getBadgeClasses(), className)}
        ref={ref}
        {...props}
      >
        {!dot && children}
      </div>
    )
  }
)

Badge.displayName = "Badge"

export { Badge }
