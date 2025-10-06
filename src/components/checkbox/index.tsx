import React from "react"
import { cn } from "../../utils/helpers"

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  description?: string
  error?: boolean
  indeterminate?: boolean
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, description, error = false, indeterminate = false, disabled = false, id, onChange, ...props }, ref) => {
    const checkboxRef = React.useRef<HTMLInputElement>(null)
    const checkboxId = id || `checkbox-${React.useId()}`
    const [isChecked, setIsChecked] = React.useState(props.checked || false)

    React.useImperativeHandle(ref, () => checkboxRef.current!, [])

    React.useEffect(() => {
      if (checkboxRef.current) {
        checkboxRef.current.indeterminate = indeterminate
      }
    }, [indeterminate])

    React.useEffect(() => {
      setIsChecked(props.checked || false)
    }, [props.checked])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newChecked = event.target.checked
      setIsChecked(newChecked)
      if (onChange) {
        onChange(event)
      }
    }

    const getCheckboxClass = () => {
      if (disabled) {
        return isChecked ? 'checkbox-disabled-checked' : 'checkbox-disabled'
      }

      if (error) {
        return isChecked ? 'checkbox-error-checked' : 'checkbox-error'
      }

      return isChecked ? 'checkbox-checked' : 'checkbox-default'
    }

    return (
      <div className={cn('checkbox-container', className)}>
        <div className="relative flex items-center">
          <input
            ref={checkboxRef}
            type="checkbox"
            id={checkboxId}
            disabled={disabled}
            checked={isChecked}
            className="absolute opacity-0 w-5 h-5 cursor-pointer"
            onChange={handleChange}
            {...props}
          />

          <div
            className={getCheckboxClass()}
            onClick={() => {
              if (!disabled && checkboxRef.current) {
                checkboxRef.current.click()
              }
            }}
          >
            <svg
              className={cn('checkbox-icon', isChecked && 'checked')}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {indeterminate ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M20 12H4" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              )}
            </svg>
          </div>
        </div>

        {(label || description) && (
          <div className="flex flex-col">
            {label && (
              <label
                htmlFor={checkboxId}
                className={cn(
                  'checkbox-label',
                  error && 'error',
                  disabled && 'disabled'
                )}
              >
                {label}
              </label>
            )}
            {description && (
              <p className={cn(
                'checkbox-description',
                error && 'error',
                disabled && 'disabled'
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

Checkbox.displayName = "Checkbox"
