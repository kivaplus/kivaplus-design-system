import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons'
import React from 'react'
import { cn } from '../../utils/helpers'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  supportText?: string
  error?: boolean
  errorMessage?: string
  leadingIcon?: React.ReactNode
  trailingIcon?: React.ReactNode
  trailingText?: string
  fullWidth?: boolean
  optional?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({
    className,
    label,
    supportText,
    error = false,
    errorMessage,
    leadingIcon,
    trailingIcon,
    trailingText,
    fullWidth = false,
    optional = false,
    disabled = false,
    id,
    type = 'text',
    ...props
  }, ref) => {
    const inputId = id || `input-${React.useId()}`
    const [showPassword, setShowPassword] = React.useState(false)

    // Determine if this is a password input
    const isPasswordInput = type === 'password'

    // Determine the actual input type (toggle between password and text for password inputs)
    const actualInputType = isPasswordInput && showPassword ? 'text' : type

    // Handle password visibility toggle
    const togglePasswordVisibility = () => {
      setShowPassword(prev => !prev)
    }

    // Determine if we should show trailing content (including password toggle)
    const hasTrailingContent = trailingIcon || trailingText || isPasswordInput

    return (
      <div className={cn('input-container', fullWidth && 'w-full', className)}>
        {/* Label */}
        {label && (
          <div className="input-label-container">
            <label
              htmlFor={inputId}
              className={cn(
                'input-label',
                error ? 'input-label-error' : disabled ? 'input-label-disabled' : ''
              )}
            >
              {label}
              {props.required && !optional && (
                <span className="input-label-required">*</span>
              )}
            </label>
            {optional && (
              <span className="input-label-optional">(opcional)</span>
            )}
          </div>
        )}

        {/* Input Container */}
        <div className={cn('input-wrapper', fullWidth && 'w-full')}>
          {/* Leading Icon */}
          {leadingIcon && (
            <div className={cn('input-icon-leading', error && 'input-icon-error')}>
              {leadingIcon}
            </div>
          )}

          {/* Input */}
          <input
            id={inputId}
            ref={ref}
            disabled={disabled}
            type={actualInputType}
            aria-invalid={error}
            aria-describedby={
              (supportText || errorMessage) ? `${inputId}-description` : undefined
            }
            aria-required={props.required}
            className={cn(
              'input-base',
              error && 'input-error',
              leadingIcon && 'input-with-leading-icon',
              hasTrailingContent && 'input-with-trailing-content'
            )}
            {...props}
          />

          {/* Trailing Content */}
          {hasTrailingContent && (
            <div className="input-trailing-content">
              {trailingText && (
                <span className="input-trailing-text">{trailingText}</span>
              )}
              {trailingIcon && (
                <div className="input-trailing-icon">
                  {trailingIcon}
                </div>
              )}
              {isPasswordInput && (
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  disabled={disabled}
                  className="input-password-toggle"
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                >
                  {showPassword ? (
                    <EyeOpenIcon className="w-5 h-5" />
                  ) : (
                    <EyeClosedIcon className="w-5 h-5" />
                  )}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Support Text / Error Message */}
        {(supportText || errorMessage) && (
          <div
            id={`${inputId}-description`}
            className={cn('input-support-text', error && 'input-support-text-error')}
            role={error ? 'alert' : undefined}
            aria-live={error ? 'polite' : undefined}
          >
            {error && errorMessage ? errorMessage : supportText}
          </div>
        )}
      </div>
    )
  }
)

Input.displayName = "Input"


export { Input }
