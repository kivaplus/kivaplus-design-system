import React from "react"
import { cn } from "../../utils/helpers"
import { Checkbox } from "../checkbox"
import { Progress } from "../progress"

interface CheckboxOption {
  id: string
  label: string
  description?: string
  required?: boolean
}

interface CheckboxGroupProps {
  title?: string
  description?: string
  options: CheckboxOption[]
  values: Record<string, boolean>
  onChange: (values: Record<string, boolean>) => void
  requireAll?: boolean
  error?: boolean
  errorMessage?: string
  className?: string
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  title,
  description,
  options,
  values,
  onChange,
  requireAll = false,
  error = false,
  errorMessage,
  className
}) => {
  const groupId = React.useId()

  const handleCheckboxChange = (optionId: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValues = {
      ...values,
      [optionId]: e.target.checked
    }
    onChange(newValues)
  }

  const allRequiredChecked = requireAll
    ? options.filter(opt => opt.required !== false).every(option => values[option.id])
    : true

  const hasError = error || (requireAll && !allRequiredChecked)

  return (
    <div className={cn('space-y-4', className)}>
      {/* Header */}
      {(title || description) && (
        <div className="space-y-2">
          {title && (
            <h3
              id={`${groupId}-title`}
              className={cn(
                'text-lg font-semibold',
                hasError ? 'text-red-600' : 'text-gray-900'
              )}
            >
              {title}
              {requireAll && <span className="text-red-500 ml-1" aria-label="obrigatório">*</span>}
            </h3>
          )}
          {description && (
            <p
              id={`${groupId}-description`}
              className={cn(
                'text-sm',
                hasError ? 'text-red-600' : 'text-gray-600'
              )}
            >
              {description}
            </p>
          )}
        </div>
      )}

      {/* Checkboxes */}
      <div
        className="space-y-3"
        role="group"
        aria-labelledby={title ? `${groupId}-title` : undefined}
        aria-describedby={description ? `${groupId}-description` : undefined}
        aria-required={requireAll}
        aria-invalid={hasError}
      >
        {options.map((option) => {
          const isChecked = values[option.id] || false
          const showError = hasError && requireAll && !isChecked

          return (
            <Checkbox
              key={option.id}
              label={option.label}
              description={option.description}
              checked={isChecked}
              error={showError}
              onChange={handleCheckboxChange(option.id)}
            />
          )
        })}
      </div>

      {/* Error Message */}
      {hasError && errorMessage && (
        <div
          className="flex items-start gap-2 mt-3"
          role="alert"
          aria-live="polite"
        >
          <svg
            className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <p className="text-sm text-red-600">{errorMessage}</p>
        </div>
      )}

      {/* Progress Bar */}
      {requireAll && (
        <div className="mt-4">
          <Progress
            value={Object.values(values).filter(Boolean).length}
            max={options.length}
            variant={allRequiredChecked ? 'success' : 'default'}
            size="md"
            showValue={true}
            label="Progresso"
          />
        </div>
      )}

      {/* Success Message */}
      {requireAll && allRequiredChecked && (
        <div
          className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg"
          role="status"
          aria-live="polite"
        >
          <svg
            className="w-5 h-5 text-green-500 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <p className="text-sm text-green-700 font-medium">
            Todos os itens foram aceitos. Você pode prosseguir!
          </p>
        </div>
      )}
    </div>
  )
}

CheckboxGroup.displayName = "CheckboxGroup"
