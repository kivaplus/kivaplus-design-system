import React from "react"
import { cn } from "../../utils/helpers"

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string
  description?: string
  size?: 'sm' | 'md' | 'lg'
  labelPosition?: 'left' | 'right'
  optional?: boolean
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({
    className,
    label,
    description,
    size = 'md',
    labelPosition = 'right',
    disabled = false,
    optional = false,
    id,
    checked,
    defaultChecked,
    onChange,
    ...props
  }, ref) => {
    const switchId = id || `switch-${React.useId()}`

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
    const getTrackClass = () => {
      const sizeClass = `switch-track-${size}`
      let stateClass = 'switch-track-default'

      if (disabled) {
        stateClass = 'switch-track-disabled'
      } else if (isChecked) {
        stateClass = 'switch-track-checked'
      }

      return `switch-track ${sizeClass} ${stateClass}`
    }

    const getThumbClass = () => {
      const sizeClass = `switch-thumb-${size}`
      const baseClass = `switch-thumb ${sizeClass}`

      if (isChecked) {
        return `${baseClass} switch-thumb-checked-${size}`
      } else {
        return `${baseClass} switch-thumb-unchecked-${size}`
      }
    }

    const getLabelClass = () => {
      const sizeClass = `switch-label-${size}`
      const stateClass = disabled ? 'switch-label-disabled' : 'switch-label-default'
      return `switch-label ${sizeClass} ${stateClass}`
    }

    const SwitchElement = (
      <div className="switch-element">
        <input
          ref={ref}
          type="checkbox"
          role="switch"
          id={switchId}
          disabled={disabled}
          className="switch-input"
          checked={isChecked}
          onChange={handleChange}
          aria-checked={isChecked}
          aria-describedby={description ? `${switchId}-description` : undefined}
          {...props}
        />

        {/* Track */}
        <div
          className={getTrackClass()}
          onClick={() => {
            if (!disabled) {
              const syntheticEvent = {
                target: { checked: !isChecked },
                currentTarget: { checked: !isChecked }
              } as React.ChangeEvent<HTMLInputElement>
              handleChange(syntheticEvent)
            }
          }}
        >
          {/* Thumb */}
          <div className={getThumbClass()} />
        </div>
      </div>
    )

    const LabelElement = (label || description) && (
      <div className="switch-label-container">
        {label && (
          <label
            htmlFor={switchId}
            className={getLabelClass()}
          >
            {label}
            {props.required && !optional && (
              <span className="switch-label-required">*</span>
            )}
          </label>
        )}
        {optional && (
          <span className="switch-label-optional">(opcional)</span>
        )}
        {description && (
          <p
            id={`${switchId}-description`}
            className="switch-description"
          >
            {description}
          </p>
        )}
      </div>
    )

    return (
      <div className={cn(
        'switch-container',
        labelPosition === 'left' && 'switch-container-left',
        className
      )}>
        {SwitchElement}
        {LabelElement}
      </div>
    )
  }
)

Switch.displayName = "Switch"

export { Switch }
