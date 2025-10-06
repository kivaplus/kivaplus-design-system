import React from "react"
import { cn } from "../../utils/helpers"

// Textarea Component
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  supportText?: string
  error?: boolean
  errorMessage?: string
  fullWidth?: boolean
  optional?: boolean
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({
    className,
    label,
    supportText,
    error = false,
    errorMessage,
    fullWidth = false,
    optional = false,
    disabled = false,
    id,
    ...props
  }, ref) => {
    const textareaId = id || `textarea-${React.useId()}`

    return (
      <div className={cn('textarea-container', fullWidth && 'w-full', className)}>
        {/* Label */}
        {label && (
          <div className="textarea-label-container">
            <label
              htmlFor={textareaId}
              className={cn(
                'textarea-label',
                error ? 'textarea-label-error' : disabled ? 'textarea-label-disabled' : ''
              )}
            >
              {label}
              {props.required && !optional && (
                <span className="textarea-label-required">*</span>
              )}
            </label>
            {optional && (
              <span className="textarea-label-optional">(opcional)</span>
            )}
          </div>
        )}

        {/* Textarea */}
        <textarea
          id={textareaId}
          ref={ref}
          disabled={disabled}
          aria-invalid={error}
          aria-describedby={
            (supportText || errorMessage) ? `${textareaId}-description` : undefined
          }
          aria-required={props.required}
          className={cn(
            'textarea-base',
            error && 'textarea-error'
          )}
          {...props}
        />

        {/* Support Text / Error Message */}
        {(supportText || errorMessage) && (
          <div
            id={`${textareaId}-description`}
            className={cn('textarea-support-text', error && 'textarea-support-text-error')}
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

Textarea.displayName = "Textarea"

export { Textarea }

