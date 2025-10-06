import { CheckCircledIcon, Cross1Icon, ExclamationTriangleIcon, InfoCircledIcon } from '@radix-ui/react-icons'
import React from 'react'
import { cn } from '../../utils/helpers'
import { Button } from '../button'
import { Modal, ModalContent, ModalFooter } from '../modal'

export interface AlertDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  variant?: 'info' | 'warning' | 'error' | 'success'
  confirmText?: string
  cancelText?: string
  onConfirm?: () => void
  onCancel?: () => void
  showCancel?: boolean
  destructive?: boolean
  className?: string
}

const AlertDialog: React.FC<AlertDialogProps> = ({
  open,
  onOpenChange,
  title,
  description,
  variant = 'info',
  confirmText = 'OK',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  showCancel = false,
  destructive = false,
  className
}) => {
  const handleConfirm = () => {
    onConfirm?.()
    onOpenChange(false)
  }

  const handleCancel = () => {
    onCancel?.()
    onOpenChange(false)
  }

  const getIcon = () => {
    switch (variant) {
      case 'warning':
        return <ExclamationTriangleIcon className="w-6 h-6 text-yellow-500" />
      case 'error':
        return <Cross1Icon className="w-6 h-6 text-red-500" />
      case 'success':
        return <CheckCircledIcon className="w-6 h-6 text-green-500" />
      case 'info':
      default:
        return <InfoCircledIcon className="w-6 h-6 text-blue-500" />
    }
  }

  const getConfirmVariant = () => {
    if (destructive) return 'danger'
    switch (variant) {
      case 'error':
        return 'danger'
      case 'warning':
        return 'warning'
      case 'success':
        return 'success'
      case 'info':
      default:
        return 'primary'
    }
  }

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      size="sm"
      closeOnBackdropClick={false}
      showCloseButton={false}
      className={cn('alert-dialog', className)}
    >
      <ModalContent>
        <div className="flex items-start gap-4 p-6">
          <div className="flex-shrink-0 mt-1">
            {getIcon()}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {title}
            </h3>
            {description && (
              <p className="text-sm text-gray-600 leading-relaxed">
                {description}
              </p>
            )}
          </div>
        </div>
      </ModalContent>

      <ModalFooter className="px-6 pb-6 pt-0" justify="end">
        <div className="flex gap-3">
          {showCancel && (
            <Button
              onClick={handleCancel}
              variant="outlined"
              size="sm"
            >
              {cancelText}
            </Button>
          )}
          <Button
            onClick={handleConfirm}
            variant={getConfirmVariant() as any}
            size="sm"
          >
            {confirmText}
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  )
}

// Confirmation Dialog - A specialized AlertDialog for confirmations
export interface ConfirmDialogProps extends Omit<AlertDialogProps, 'showCancel' | 'variant'> {
  variant?: 'warning' | 'error'
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  variant = 'warning',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  ...props
}) => {
  return (
    <AlertDialog
      {...props}
      variant={variant}
      confirmText={confirmText}
      cancelText={cancelText}
      showCancel={true}
    />
  )
}

// Destructive Dialog - A specialized AlertDialog for destructive actions
export interface DestructiveDialogProps extends Omit<AlertDialogProps, 'showCancel' | 'variant' | 'destructive'> {
}

const DestructiveDialog: React.FC<DestructiveDialogProps> = ({
  confirmText = 'Delete',
  cancelText = 'Cancel',
  ...props
}) => {
  return (
    <AlertDialog
      {...props}
      variant="error"
      confirmText={confirmText}
      cancelText={cancelText}
      showCancel={true}
      destructive={true}
    />
  )
}

AlertDialog.displayName = "AlertDialog"
ConfirmDialog.displayName = "ConfirmDialog"
DestructiveDialog.displayName = "DestructiveDialog"

export { AlertDialog, ConfirmDialog, DestructiveDialog }
