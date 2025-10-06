import React from "react"
import { cn } from "../../utils/helpers"

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  description?: string
  error?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({
    className,
    label,
    description,
    error = false,
    size = 'md',
    disabled = false,
    id,
    checked,
    defaultChecked,
    onChange,
    ...props
  }, ref) => {
    const radioId = id || `radio-${React.useId()}`

    // Handle both controlled and uncontrolled states
    const [internalChecked, setInternalChecked] = React.useState(defaultChecked || false)
    const isControlled = checked !== undefined
    const isChecked = isControlled ? checked : internalChecked

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setInternalChecked(e.target.checked)
      }
      if (onChange) {
        onChange(e)
      }
    }

    // Use CSS component classes
    const getButtonClass = () => {
      const sizeClass = `radio-button-${size}`
      let stateClass = 'radio-button-default'

      if (disabled) {
        stateClass = isChecked ? 'radio-button-disabled-checked' : 'radio-button-disabled'
      } else if (error) {
        stateClass = isChecked ? 'radio-button-error-checked' : 'radio-button-error'
      } else if (isChecked) {
        stateClass = 'radio-button-checked'
      }

      return `radio-button ${sizeClass} ${stateClass}`
    }

    const getIndicatorClass = () => {
      const sizeClass = `radio-indicator-${size}`
      const visibilityClass = isChecked ? 'radio-indicator-visible' : 'radio-indicator-hidden'
      return `radio-indicator ${sizeClass} ${visibilityClass}`
    }

    const getLabelClass = () => {
      const sizeClass = `radio-label-${size}`
      const stateClass = disabled ? 'radio-label-disabled' : 'radio-label-default'
      return `radio-label ${sizeClass} ${stateClass}`
    }

    return (
      <div className={cn('radio-container', className)}>
        <input
          ref={ref}
          type="radio"
          id={radioId}
          disabled={disabled}
          className="radio-input"
          checked={isChecked}
          onChange={handleChange}
          {...props}
        />

        {/* Radio Button */}
        <div
          className={getButtonClass()}
          onClick={() => {
            if (!disabled && !isChecked) {
              const syntheticEvent = {
                target: { checked: true, value: props.value },
                currentTarget: { checked: true, value: props.value }
              } as React.ChangeEvent<HTMLInputElement>
              handleChange(syntheticEvent)
            }
          }}
        >
          {/* Indicator */}
          <div className={getIndicatorClass()} />
        </div>

        {/* Content */}
        {(label || description) && (
          <div className="radio-content">
            {label && (
              <label
                htmlFor={radioId}
                className={getLabelClass()}
              >
                {label}
              </label>
            )}
            {description && (
              <p className={cn(
                'radio-description',
                disabled && 'radio-description-disabled'
              )}>
                {description}
              </p>
            )}
          </div>
        )}
      </div>
    )
  }
)

Radio.displayName = "Radio"

// Radio Group Component
export interface RadioGroupProps {
  value?: string
  onValueChange?: (value: string) => void
  children: React.ReactNode
  className?: string
  disabled?: boolean
  error?: boolean
  errorMessage?: string
  label?: string
  description?: string
  orientation?: 'vertical' | 'horizontal'
  required?: boolean
  optional?: boolean
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({
    value,
    onValueChange,
    children,
    className,
    disabled = false,
    error = false,
    errorMessage,
    label,
    description,
    orientation = 'vertical',
    required = false,
    optional = false,
    ...props
  }, ref) => {
    const groupId = React.useId()

    // Use CSS component classes
    const getLabelClass = () => {
      let stateClass = 'radio-group-label-default'
      if (error) stateClass = 'radio-group-label-error'
      else if (disabled) stateClass = 'radio-group-label-disabled'
      return `radio-group-label ${stateClass}`
    }

    const getDescriptionClass = () => {
      let stateClass = 'radio-group-description'
      if (error) stateClass = 'radio-group-description-error'
      else if (disabled) stateClass = 'radio-group-description-disabled'
      return stateClass
    }

    return (
      <div ref={ref} className={cn('radio-group', className)} {...props}>
        {/* Group Label */}
        {label && (
          <label id={`${groupId}-label`} className={getLabelClass()}>
            {label}
            {required && !optional && (
              <span className="radio-group-label-required">*</span>
            )}
          </label>
        )}
        {optional && (
          <span className="radio-group-label-optional">(opcional)</span>
        )}

        {/* Group Description */}
        {description && (
          <p id={`${groupId}-description`} className={getDescriptionClass()}>
            {description}
          </p>
        )}

        {/* Radio Options */}
        <div
          className={cn(
            orientation === 'horizontal' ? 'radio-group-horizontal' : 'space-y-3'
          )}
          role="radiogroup"
          aria-labelledby={label ? `${groupId}-label` : undefined}
          aria-describedby={description ? `${groupId}-description` : undefined}
          aria-required={required}
          aria-invalid={error}
        >
          {React.Children.map(children, (child) => {
            if (React.isValidElement<RadioProps>(child) && child.type === Radio) {
              return React.cloneElement(child, {
                checked: value === child.props.value,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  if (e.target.checked && onValueChange) {
                    onValueChange(child.props.value as string)
                  }
                },
                disabled: disabled || child.props.disabled,
                error: error || child.props.error
              })
            }
            return child
          })}
        </div>

        {/* Error Message */}
        {error && errorMessage && (
          <p
            className="radio-group-error-message"
            role="alert"
            aria-live="polite"
          >
            {errorMessage}
          </p>
        )}
      </div>
    )
  }
)

RadioGroup.displayName = "RadioGroup"

export { Radio, RadioGroup }
