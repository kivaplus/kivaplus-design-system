import { Cross2Icon } from '@radix-ui/react-icons'
import React from 'react'
import { cn } from '../../utils/helpers'

export interface ModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
  centered?: boolean
  closeOnBackdropClick?: boolean
  closeOnEscape?: boolean
  showCloseButton?: boolean
  className?: string
}

const Modal: React.FC<ModalProps> = ({
  open,
  onOpenChange,
  children,
  size = 'md',
  centered = true,
  closeOnBackdropClick = true,
  closeOnEscape = true,
  showCloseButton = true,
  className
}) => {
  const [isVisible, setIsVisible] = React.useState(false)

  // Handle escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && closeOnEscape && open) {
        onOpenChange(false)
      }
    }

    if (open && closeOnEscape) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [open, closeOnEscape, onOpenChange])

  // Handle body scroll
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      setIsVisible(true)
    } else {
      document.body.style.overflow = 'unset'
      const timer = setTimeout(() => setIsVisible(false), 150) // Match animation duration
      return () => clearTimeout(timer)
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [open])

  const getSizeClass = () => {
    switch (size) {
      case 'xs': return 'modal-xs'
      case 'sm': return 'modal-sm'
      case 'md': return 'modal-md'
      case 'lg': return 'modal-lg'
      case 'xl': return 'modal-xl'
      case 'full': return 'modal-full'
      default: return 'modal-md'
    }
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && closeOnBackdropClick) {
      onOpenChange(false)
    }
  }

  if (!isVisible) return null

  return (
    <div
      className={cn(
        'modal-backdrop',
        open ? 'open' : 'closed',
        !centered && 'top-aligned'
      )}
      onClick={handleBackdropClick}
    >
      <div
        className={cn(
          'modal-content',
          getSizeClass(),
          open ? 'open' : 'closed',
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {showCloseButton && (
          <button
            onClick={() => onOpenChange(false)}
            className="modal-close-button"
          >
            <Cross2Icon className="w-5 h-5" />
          </button>
        )}
        {children}
      </div>
    </div>
  )
}

// Modal Header Component
export interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  subtitle?: string
  divider?: boolean
}

const ModalHeader = React.forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ className, title, subtitle, divider = true, children, ...props }, ref) => {
    return (
      <div
        className={cn(
          'modal-header',
          divider && 'with-divider',
          className
        )}
        ref={ref}
        {...props}
      >
        {title && (
          <h2 className="modal-header-title">
            {title}
          </h2>
        )}
        {subtitle && (
          <p className="modal-header-subtitle">
            {subtitle}
          </p>
        )}
        {children}
      </div>
    )
  }
)

ModalHeader.displayName = "ModalHeader"

// Modal Content Component
export interface ModalContentProps extends React.HTMLAttributes<HTMLDivElement> { }

const ModalContent = React.forwardRef<HTMLDivElement, ModalContentProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn('modal-content-body', className)}
        ref={ref}
        {...props}
      />
    )
  }
)

ModalContent.displayName = "ModalContent"

// Modal Footer Component
export interface ModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  justify?: 'start' | 'center' | 'end' | 'between'
  divider?: boolean
}

const ModalFooter = React.forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ className, justify = 'end', divider = true, ...props }, ref) => {
    return (
      <div
        className={cn(
          'modal-footer',
          divider && 'with-divider',
          `justify-${justify}`,
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

ModalFooter.displayName = "ModalFooter"

// Drawer Component (Slide-in Modal)
export interface DrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
  side?: 'left' | 'right' | 'top' | 'bottom'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  closeOnBackdropClick?: boolean
  closeOnEscape?: boolean
  showCloseButton?: boolean
  className?: string
}

const Drawer: React.FC<DrawerProps> = ({
  open,
  onOpenChange,
  children,
  side = 'right',
  size = 'md',
  closeOnBackdropClick = true,
  closeOnEscape = true,
  showCloseButton = true,
  className
}) => {
  const [isVisible, setIsVisible] = React.useState(false)

  // Handle escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && closeOnEscape && open) {
        onOpenChange(false)
      }
    }

    if (open && closeOnEscape) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [open, closeOnEscape, onOpenChange])

  // Handle body scroll and visibility
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
      setIsVisible(true)
    } else {
      document.body.style.overflow = 'unset'
      const timer = setTimeout(() => setIsVisible(false), 300)
      return () => clearTimeout(timer)
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [open])

  const getDrawerClasses = () => {
    return cn(
      'drawer-content',
      `drawer-${side}`,
      `size-${size}`,
      open ? 'open' : 'closed'
    )
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && closeOnBackdropClick) {
      onOpenChange(false)
    }
  }

  if (!isVisible) return null

  return (
    <div
      className={cn(
        'drawer-backdrop',
        open ? 'open' : 'closed'
      )}
      onClick={handleBackdropClick}
    >
      <div
        className={cn(getDrawerClasses(), className)}
        onClick={(e) => e.stopPropagation()}
      >
        {showCloseButton && (
          <button
            onClick={() => onOpenChange(false)}
            className="drawer-close-button"
          >
            <Cross2Icon className="w-5 h-5" />
          </button>
        )}
        {children}
      </div>
    </div>
  )
}

Drawer.displayName = "Drawer"

export { Drawer, Modal, ModalContent, ModalFooter, ModalHeader }
