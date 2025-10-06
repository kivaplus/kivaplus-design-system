import {
  CheckCircledIcon,
  Cross2Icon,
  CrossCircledIcon,
  ExclamationTriangleIcon,
  InfoCircledIcon
} from '@radix-ui/react-icons'
import React from 'react'
import { cn } from '../../utils/helpers'

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'info' | 'success' | 'warning' | 'error' | 'neutral'
  title?: string
  description?: string
  icon?: React.ReactNode
  dismissible?: boolean
  onDismiss?: () => void
  actions?: React.ReactNode
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({
    className,
    variant = 'neutral',
    title,
    description,
    icon,
    dismissible = false,
    onDismiss,
    actions,
    children,
    ...props
  }, ref) => {
    const getVariantClass = () => {
      switch (variant) {
        case 'neutral': return 'alert-neutral'
        case 'info': return 'alert-info'
        case 'success': return 'alert-success'
        case 'warning': return 'alert-warning'
        case 'error': return 'alert-error'
        default: return 'alert-neutral'
      }
    }

    const defaultIcons = {
      neutral: <InfoCircledIcon className="w-5 h-5" />,
      info: <InfoCircledIcon className="w-5 h-5" />,
      success: <CheckCircledIcon className="w-5 h-5" />,
      warning: <ExclamationTriangleIcon className="w-5 h-5" />,
      error: <CrossCircledIcon className="w-5 h-5" />
    }

    const displayIcon = icon || defaultIcons[variant]

    return (
      <div
        className={cn(
          'alert',
          getVariantClass(),
          className
        )}
        ref={ref}
        {...props}
      >
        <div className="alert-content">
          {/* Icon */}
          {displayIcon && (
            <div className={cn('alert-icon', variant)}>
              {displayIcon}
            </div>
          )}

          {/* Content */}
          <div className="alert-body">
            {title && (
              <h3 className={cn('alert-title', variant)}>
                {title}
              </h3>
            )}

            {description && (
              <p className="alert-description">
                {description}
              </p>
            )}

            {children && (
              <div className="mt-2 text-sm">
                {children}
              </div>
            )}

            {/* Actions */}
            {actions && (
              <div className="alert-actions">
                {actions}
              </div>
            )}
          </div>

          {/* Dismiss Button */}
          {dismissible && onDismiss && (
            <div className="alert-dismiss">
              <button
                type="button"
                onClick={onDismiss}
                className={cn('alert-dismiss-button', variant)}
              >
                <Cross2Icon className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }
)

Alert.displayName = "Alert"

export { Alert }
