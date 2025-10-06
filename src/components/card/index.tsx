import React from 'react'
import { cn } from '../../utils/helpers'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'elevated' | 'outlined' | 'filled'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  interactive?: boolean
  disabled?: boolean
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({
    className,
    variant = 'elevated',
    padding = 'md',
    interactive = false,
    disabled = false,
    children,
    onClick,
    ...props
  }, ref) => {
    const getVariantClass = () => {
      switch (variant) {
        case 'elevated': return 'card-elevated'
        case 'outlined': return 'card-outlined'
        case 'filled': return 'card-filled'
        default: return 'card-elevated'
      }
    }

    const getPaddingClass = () => {
      switch (padding) {
        case 'none': return 'card-padding-none'
        case 'sm': return 'card-padding-sm'
        case 'md': return 'card-padding-md'
        case 'lg': return 'card-padding-lg'
        default: return 'card-padding-md'
      }
    }

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!disabled && onClick) {
        onClick(e)
      }
    }

    return (
      <div
        className={cn(
          'card',
          getVariantClass(),
          getPaddingClass(),
          interactive && 'interactive',
          disabled && 'disabled',
          className
        )}
        ref={ref}
        onClick={handleClick}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = "Card"

// Card Header Component
export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  subtitle?: string
  actions?: React.ReactNode
}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({
    className,
    title,
    subtitle,
    actions,
    children,
    ...props
  }, ref) => {
    return (
      <div
        className={cn('card-header', className)}
        ref={ref}
        {...props}
      >
        <div className="card-header-content">
          {title && (
            <h3 className="card-header-title">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="card-header-subtitle">
              {subtitle}
            </p>
          )}
          {children}
        </div>
        {actions && (
          <div className="card-header-actions">
            {actions}
          </div>
        )}
      </div>
    )
  }
)

CardHeader.displayName = "CardHeader"

// Card Content Component
export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> { }

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn('card-content', className)}
        ref={ref}
        {...props}
      />
    )
  }
)

CardContent.displayName = "CardContent"

// Card Footer Component
export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  actions?: React.ReactNode
  justify?: 'start' | 'center' | 'end' | 'between'
}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({
    className,
    actions,
    justify = 'end',
    children,
    ...props
  }, ref) => {
    return (
      <div
        className={cn(
          'card-footer',
          `justify-${justify}`,
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
        {actions}
      </div>
    )
  }
)

CardFooter.displayName = "CardFooter"

export { Card, CardContent, CardFooter, CardHeader }
