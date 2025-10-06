import { Cross2Icon } from '@radix-ui/react-icons'
import React from 'react'
import { cn } from '../../utils/helpers'
import { Chip } from '../chip'

// Dropdown Menu Component
export interface DropdownMenuProps {
  children: React.ReactNode
  trigger: React.ReactNode
  align?: 'start' | 'center' | 'end'
  side?: 'top' | 'bottom' | 'left' | 'right'
  className?: string
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({
  children,
  trigger,
  align = 'start',
  side = 'bottom',
  className
}) => {
  const [open, setOpen] = React.useState(false)
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [open])

  // Use CSS component classes
  const getAlignClass = () => {
    switch (align) {
      case 'start': return 'dropdown-align-start'
      case 'center': return 'dropdown-align-center'
      case 'end': return 'dropdown-align-end'
      default: return 'dropdown-align-start'
    }
  }

  const getSideClass = () => {
    switch (side) {
      case 'top': return 'dropdown-side-top'
      case 'bottom': return 'dropdown-side-bottom'
      case 'left': return 'dropdown-side-left'
      case 'right': return 'dropdown-side-right'
      default: return 'dropdown-side-bottom'
    }
  }

  return (
    <div ref={containerRef} className="dropdown-container">
      <div className="dropdown-trigger" onClick={() => setOpen(!open)}>
        {trigger}
      </div>

      {open && (
        <div
          className={cn(
            'dropdown-content',
            getAlignClass(),
            getSideClass(),
            className
          )}
        >
          {children}
        </div>
      )}
    </div>
  )
}

// Dropdown Item Component
export interface DropdownItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode
  shortcut?: string
  destructive?: boolean
  asChild?: boolean
}

const DropdownItem = React.forwardRef<HTMLButtonElement, DropdownItemProps>(
  ({ className, icon, shortcut, destructive = false, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'dropdown-item',
          destructive && 'dropdown-item-destructive',
          className
        )}
        {...props}
      >
        {icon && <span className="dropdown-item-icon">{icon}</span>}
        <span className="dropdown-item-content">{children}</span>
        {shortcut && (
          <span className="dropdown-item-shortcut">
            {shortcut}
          </span>
        )}
      </button>
    )
  }
)

DropdownItem.displayName = "DropdownItem"

// Dropdown Separator
const DropdownSeparator = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('dropdown-separator', className)}
      {...props}
    />
  )
)

DropdownSeparator.displayName = "DropdownSeparator"

// Dropdown Label
const DropdownLabel = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('dropdown-label', className)}
      {...props}
    />
  )
)

DropdownLabel.displayName = "DropdownLabel"

// Select Component
export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
  icon?: React.ReactNode
}

export interface SelectProps {
  options: SelectOption[]
  value?: string | string[]
  onValueChange?: (value: string | string[]) => void
  placeholder?: string
  disabled?: boolean
  error?: boolean
  label?: string
  description?: string
  fullWidth?: boolean
  searchable?: boolean
  clearable?: boolean
  multiple?: boolean
  className?: string
  required?: boolean
  optional?: boolean
}

const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  ({
    options,
    value,
    onValueChange,
    placeholder = "Selecione uma opção...",
    disabled = false,
    error = false,
    label,
    description,
    fullWidth = false,
    searchable = false,
    clearable = false,
    multiple = false,
    className,
    required = false,
    optional = false,
    ...props
  }, ref) => {
    const [open, setOpen] = React.useState(false)
    const [searchTerm, setSearchTerm] = React.useState('')
    const [selectedValues, setSelectedValues] = React.useState<string[]>(() => {
      if (multiple) {
        return Array.isArray(value) ? value : []
      } else {
        return typeof value === 'string' ? [value] : []
      }
    })

    const containerRef = React.useRef<HTMLDivElement>(null)
    const inputRef = React.useRef<HTMLInputElement>(null)

    // Sync internal state with prop changes
    React.useEffect(() => {
      if (multiple) {
        setSelectedValues(Array.isArray(value) ? value : [])
      } else {
        setSelectedValues(typeof value === 'string' ? [value] : [])
      }
    }, [value, multiple])

    // Filter options based on search term
    const filteredOptions = React.useMemo(() => {
      if (!searchable || !searchTerm) return options
      return options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }, [options, searchTerm, searchable])

    // Close dropdown when clicking outside
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setOpen(false)
          setSearchTerm('')
        }
      }

      if (open) {
        document.addEventListener('mousedown', handleClickOutside)
      }

      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [open])

    const handleSelect = (optionValue: string) => {
      if (multiple) {
        const newValues = selectedValues.includes(optionValue)
          ? selectedValues.filter(v => v !== optionValue)
          : [...selectedValues, optionValue]
        setSelectedValues(newValues)
        onValueChange?.(newValues)
      } else {
        setSelectedValues([optionValue])
        onValueChange?.(optionValue)
        setOpen(false)
      }
      setSearchTerm('')
    }

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation()
      setSelectedValues([])
      onValueChange?.(multiple ? [] : '')
    }

    const handleRemoveChip = (valueToRemove: string) => {
      const newValues = selectedValues.filter(v => v !== valueToRemove)
      setSelectedValues(newValues)
      onValueChange?.(newValues)
    }

    const selectedOption = options.find(opt => opt.value === selectedValues[0])

    const selectId = React.useId()

    // Use CSS component classes
    const getLabelClass = () => {
      if (error) return 'select-label-error'
      if (disabled) return 'select-label-disabled'
      return 'select-label-default'
    }

    const getButtonClass = () => {
      if (error) return 'select-button-error'
      if (disabled) return 'select-button-disabled'
      return 'select-button-default'
    }

    return (
      <div className={cn('select-container', fullWidth && 'select-container-full-width', className)} ref={containerRef}>
        {/* Label */}
        {label && (
          <div className="select-label-container">
            <label
              htmlFor={selectId}
              className={cn('select-label', getLabelClass())}
            >
              {label}
              {required && !optional && (
                <span className="select-label-required">*</span>
              )}
            </label>
            {optional && (
              <span className="select-label-optional">(opcional)</span>
            )}
          </div>
        )}

        {/* Select Button */}
        <button
          id={selectId}
          ref={ref}
          type="button"
          onClick={() => !disabled && setOpen(!open)}
          disabled={disabled}
          className={cn(
            'select-button',
            getButtonClass(),
            open && !error && !disabled && 'select-button-open'
          )}
          {...props}
        >
          <div className={cn(
            'select-value',
            !selectedValues.length && 'select-value-placeholder',
            clearable && selectedValues.length > 0 && !disabled && 'select-value-with-clear'
          )}>
            {multiple && selectedValues.length > 0 ? (
              <div className="flex flex-wrap gap-1 max-w-full">
                {selectedValues.map((value) => {
                  const option = options.find(opt => opt.value === value)
                  return option ? (
                    <Chip
                      key={value}
                      size="sm"
                      variant="primary"
                      removable
                      onRemove={() => handleRemoveChip(value)}
                      className="max-w-[120px]"
                    >
                      <span className="truncate">{option.label}</span>
                    </Chip>
                  ) : null
                })}
              </div>
            ) : selectedValues.length > 0 && !multiple ? (
              selectedOption?.label
            ) : (
              placeholder
            )}
          </div>

          <span className="select-controls">
            {clearable && selectedValues.length > 0 && !disabled && (
              <button
                type="button"
                onClick={handleClear}
                className="select-clear-button"
              >
                <Cross2Icon className="w-5 h-5" />
              </button>
            )}
            <svg
              className={cn(
                'select-chevron',
                open && 'select-chevron-open'
              )}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </button>

        {/* Dropdown */}
        {open && !disabled && (
          <div className="select-dropdown">
            {searchable && (
              <div className="select-search-container">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Buscar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="select-search-input"
                />
              </div>
            )}

            <div className="select-options-container">
              {filteredOptions.length === 0 ? (
                <div className="select-empty-state">
                  {searchTerm ? 'Nenhum resultado encontrado' : 'Nenhuma opção disponível'}
                </div>
              ) : (
                filteredOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => !option.disabled && handleSelect(option.value)}
                    disabled={option.disabled}
                    className={cn(
                      'select-option',
                      selectedValues.includes(option.value) && 'select-option-selected'
                    )}
                  >
                    <div className="select-option-content">
                      {option.icon && <span className="select-option-icon">{option.icon}</span>}
                      <span className="select-option-label">{option.label}</span>
                      {selectedValues.includes(option.value) && (
                        <span className="select-option-check">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                      )}
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        )}

        {/* Description */}
        {description && (
          <p className={cn(
            'select-description',
            error ? 'select-description-error' : 'select-description-default'
          )}>
            {description}
          </p>
        )}
      </div>
    )
  }
)

Select.displayName = "Select"

export { DropdownItem, DropdownLabel, DropdownMenu, DropdownSeparator, Select }
