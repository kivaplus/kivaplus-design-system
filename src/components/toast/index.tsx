import { BellIcon, CheckCircledIcon, Cross2Icon, CrossCircledIcon, ExclamationTriangleIcon, InfoCircledIcon } from '@radix-ui/react-icons'
import React from 'react'
import { cn } from '../../utils/helpers'

export interface ToastProps {
  id?: string
  title?: string
  description?: string
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info'
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
  onClose?: () => void
  closable?: boolean
  icon?: React.ReactNode
}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({
    id,
    title,
    description,
    variant = 'default',
    duration = 5000,
    action,
    onClose,
    closable = true,
    icon
  }, ref) => {
    const [isVisible, setIsVisible] = React.useState(true)
    const [isLeaving, setIsLeaving] = React.useState(false)

    React.useEffect(() => {
      if (duration > 0) {
        const timer = setTimeout(() => {
          handleClose()
        }, duration)

        return () => clearTimeout(timer)
      }
    }, [duration])

    const handleClose = () => {
      setIsLeaving(true)
      setTimeout(() => {
        setIsVisible(false)
        onClose?.()
      }, 150) // Animation duration
    }

    if (!isVisible) return null

    // Use CSS component classes
    const getVariantClass = () => {
      switch (variant) {
        case 'default': return 'toast-default'
        case 'success': return 'toast-success'
        case 'error': return 'toast-error'
        case 'warning': return 'toast-warning'
        case 'info': return 'toast-info'
        default: return 'toast-default'
      }
    }

    const getIconClass = () => {
      switch (variant) {
        case 'default': return 'toast-icon-default'
        case 'success': return 'toast-icon-success'
        case 'error': return 'toast-icon-error'
        case 'warning': return 'toast-icon-warning'
        case 'info': return 'toast-icon-info'
        default: return 'toast-icon-default'
      }
    }

    const getCloseButtonClass = () => {
      switch (variant) {
        case 'default': return 'toast-close-default'
        case 'success': return 'toast-close-success'
        case 'error': return 'toast-close-error'
        case 'warning': return 'toast-close-warning'
        case 'info': return 'toast-close-info'
        default: return 'toast-close-default'
      }
    }

    const defaultIcons = {
      default: <InfoCircledIcon className="w-5 h-5" />,
      info: <InfoCircledIcon className="w-5 h-5" />,
      success: <CheckCircledIcon className="w-5 h-5" />,
      warning: <ExclamationTriangleIcon className="w-5 h-5" />,
      error: <CrossCircledIcon className="w-5 h-5" />
    }

    const displayIcon = icon || defaultIcons[variant]

    return (
      <div
        ref={ref}
        id={id}
        className={cn(
          'toast',
          getVariantClass(),
          isLeaving ? 'toast-leaving' : 'toast-visible'
        )}
        role="alert"
      >
        {/* Icon */}
        {displayIcon && (
          <div className={cn('toast-icon', getIconClass())}>
            {displayIcon}
          </div>
        )}

        {/* Content */}
        <div className="toast-content">
          {title && (
            <div className="toast-title">
              {title}
            </div>
          )}
          {description && (
            <div className={cn(title ? 'toast-description-with-title' : 'toast-description')}>
              {description}
            </div>
          )}
          {action && (
            <button
              type="button"
              onClick={action.onClick}
              className="toast-action"
            >
              {action.label}
            </button>
          )}
        </div>

        {/* Close Button */}
        {closable && (
          <button
            type="button"
            onClick={handleClose}
            className={cn('toast-close', getCloseButtonClass())}
          >
            <Cross2Icon className="w-4 h-4" />
          </button>
        )}
      </div>
    )
  }
)

Toast.displayName = "Toast"

// Toast Container/Provider
interface ToastContextValue {
  toasts: ToastProps[]
  addToast: (toast: Omit<ToastProps, 'id' | 'onClose'>) => string
  removeToast: (id: string) => void
  removeAllToasts: () => void
}

const ToastContext = React.createContext<ToastContextValue | null>(null)

export const useToast = () => {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

export interface ToastProviderProps {
  children: React.ReactNode
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'
  maxToasts?: number
}

const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  position = 'top-right',
  maxToasts = 5
}) => {
  const [toasts, setToasts] = React.useState<ToastProps[]>([])

  const addToast = React.useCallback((toast: Omit<ToastProps, 'id' | 'onClose'>) => {
    const id = Math.random().toString(36).substring(2, 15)
    const newToast: ToastProps = {
      ...toast,
      id,
      onClose: () => removeToast(id)
    }

    setToasts(prev => {
      const updated = [...prev, newToast]
      return updated.length > maxToasts ? updated.slice(-maxToasts) : updated
    })

    return id
  }, [maxToasts])

  const removeToast = React.useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }, [])

  const removeAllToasts = React.useCallback(() => {
    setToasts([])
  }, [])

  // Use CSS component classes
  const getPositionClass = () => {
    switch (position) {
      case 'top-left': return 'toast-position-top-left'
      case 'top-center': return 'toast-position-top-center'
      case 'top-right': return 'toast-position-top-right'
      case 'bottom-left': return 'toast-position-bottom-left'
      case 'bottom-center': return 'toast-position-bottom-center'
      case 'bottom-right': return 'toast-position-bottom-right'
      default: return 'toast-position-top-right'
    }
  }

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, removeAllToasts }}>
      {children}

      {/* Toast Portal */}
      <div className={cn('toast-container', getPositionClass())}>
        {toasts.map(toast => (
          <Toast key={toast.id} {...toast} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

// Notification Component (more permanent than toast)
export interface NotificationProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info'
  icon?: React.ReactNode
  avatar?: React.ReactNode
  timestamp?: Date | string
  actions?: React.ReactNode
  dismissible?: boolean
  onDismiss?: () => void
  unread?: boolean
}

const Notification = React.forwardRef<HTMLDivElement, NotificationProps>(
  ({
    className,
    title,
    description,
    variant = 'default',
    icon,
    avatar,
    timestamp,
    actions,
    dismissible = true,
    onDismiss,
    unread = false,
    ...props
  }, ref) => {
    // Use CSS component classes
    const getVariantClass = () => {
      switch (variant) {
        case 'default': return 'notification-default'
        case 'success': return 'notification-success'
        case 'error': return 'notification-error'
        case 'warning': return 'notification-warning'
        case 'info': return 'notification-info'
        default: return 'notification-default'
      }
    }

    const formatTimestamp = (timestamp: Date | string) => {
      const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp
      const now = new Date()
      const diff = now.getTime() - date.getTime()
      const minutes = Math.floor(diff / 60000)
      const hours = Math.floor(diff / 3600000)
      const days = Math.floor(diff / 86400000)

      if (minutes < 1) return 'agora'
      if (minutes < 60) return `${minutes}m`
      if (hours < 24) return `${hours}h`
      return `${days}d`
    }

    return (
      <div
        ref={ref}
        className={cn(
          'notification',
          getVariantClass(),
          unread && 'notification-unread',
          className
        )}
        {...props}
      >
        {/* Unread indicator */}
        {unread && (
          <div className="notification-unread-indicator" />
        )}

        {/* Avatar or Icon */}
        {avatar || icon ? (
          <div className="notification-avatar">
            {avatar || (
              <div className="notification-icon-container">
                {icon}
              </div>
            )}
          </div>
        ) : null}

        {/* Content */}
        <div className="notification-content">
          <div className="notification-header">
            <div className="notification-main">
              {title && (
                <h4 className="notification-title">
                  {title}
                </h4>
              )}
              {description && (
                <p className="notification-description">
                  {description}
                </p>
              )}
            </div>

            {/* Timestamp and Dismiss */}
            <div className="notification-meta">
              {timestamp && (
                <span className="notification-timestamp">
                  {formatTimestamp(timestamp)}
                </span>
              )}
              {dismissible && (
                <button
                  onClick={onDismiss}
                  className="notification-dismiss"
                >
                  <Cross2Icon className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Actions */}
          {actions && (
            <div className="notification-actions">
              {actions}
            </div>
          )}
        </div>
      </div>
    )
  }
)

Notification.displayName = "Notification"

// Notification List Component
export interface NotificationListProps extends React.HTMLAttributes<HTMLDivElement> {
  notifications: NotificationProps[]
  emptyState?: React.ReactNode
  showMarkAllRead?: boolean
  onMarkAllRead?: () => void
}

const NotificationList = React.forwardRef<HTMLDivElement, NotificationListProps>(
  ({
    className,
    notifications,
    emptyState,
    showMarkAllRead = true,
    onMarkAllRead,
    ...props
  }, ref) => {
    const unreadCount = notifications.filter(n => n.unread).length

    if (notifications.length === 0) {
      return (
        <div ref={ref} className={cn('notification-list-empty', className)} {...props}>
          {emptyState || (
            <div>
              <BellIcon className="notification-list-empty-icon" />
              <p>Nenhuma notificação</p>
            </div>
          )}
        </div>
      )
    }

    return (
      <div ref={ref} className={cn('notification-list', className)} {...props}>
        {/* Header */}
        {showMarkAllRead && unreadCount > 0 && (
          <div className="notification-list-header">
            <span className="notification-list-unread-count">
              {unreadCount} não lida{unreadCount !== 1 ? 's' : ''}
            </span>
            <button
              onClick={onMarkAllRead}
              className="notification-list-mark-read"
            >
              Marcar todas como lidas
            </button>
          </div>
        )}

        {/* Notifications */}
        <div>
          {notifications.map((notification, index) => (
            <Notification key={index} {...notification} />
          ))}
        </div>
      </div>
    )
  }
)

NotificationList.displayName = "NotificationList"

export { Notification, NotificationList, Toast, ToastProvider }
