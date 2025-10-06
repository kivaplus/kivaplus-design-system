import React from 'react'
import { cn } from '../../utils/helpers'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'neutral' | 'outlined' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    loading = false,
    leftIcon,
    rightIcon,
    children,
    disabled,
    ...props
  }, ref) => {
    // Use CSS component classes
    const getVariantClass = () => {
      switch (variant) {
        case 'primary': return 'btn-primary'
        case 'secondary': return 'btn-secondary'
        case 'accent': return 'btn-accent'
        case 'neutral': return 'btn-neutral'
        case 'outlined': return 'btn-outlined'
        case 'danger': return 'btn-danger'
        default: return 'btn-primary'
      }
    }

    const getSizeClass = () => {
      switch (size) {
        case 'sm': return 'btn-sm'
        case 'md': return 'btn-md'
        case 'lg': return 'btn-lg'
        default: return 'btn-md'
      }
    }

    return (
      <button
        className={cn(
          'btn', // Base button component class
          getVariantClass(),
          getSizeClass(),
          fullWidth && 'w-full',
          loading && 'cursor-not-allowed opacity-50',
          className
        )}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
        )}
        {!loading && leftIcon && leftIcon}
        {children}
        {!loading && rightIcon && rightIcon}
      </button>
    )
  }
)

Button.displayName = "Button"

export { Button }
