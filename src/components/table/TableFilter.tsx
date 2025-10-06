import React from 'react'
import { cn } from '../../utils/helpers'
import { Button } from '../button'
import { CheckboxGroup } from '../checkboxgroup'
import { ChipGroup } from '../chip'
import { Drawer, ModalContent, ModalFooter, ModalHeader } from '../modal'
import { Radio, RadioGroup } from '../radio'

export interface FilterField {
  key: string
  label: string
  type: 'input' | 'select' | 'radio' | 'checkbox' | 'date' | 'number'
  options?: { value: string; label: string }[]
  placeholder?: string
  multiple?: boolean
}

export interface FilterConfig {
  fields: FilterField[]
}

export interface FilterValues {
  [key: string]: any
}

export interface TableFilterProps {
  config: FilterConfig
  data: any[]
  onFilteredDataChange: (filteredData: any[]) => void
  onFiltersChange?: (filters: FilterValues) => void // For server-side filtering
  className?: string
}

export const TableFilter: React.FC<TableFilterProps> = ({
  config,
  data,
  onFilteredDataChange,
  onFiltersChange,
  className
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false)
  const [filterValues, setFilterValues] = React.useState<FilterValues>({})
  const [activeFilters, setActiveFilters] = React.useState<Array<{ key: string; label: string; value: any }>>([])

  // Apply filters to data
  const applyFilters = React.useCallback((filters: FilterValues) => {
    let filteredData = [...data]

    Object.entries(filters).forEach(([key, value]) => {
      if (value === undefined || value === null || value === '' ||
        (Array.isArray(value) && value.length === 0)) {
        return
      }

      const field = config.fields.find(f => f.key === key)
      if (!field) return

      filteredData = filteredData.filter(item => {
        const itemValue = item[key]

        switch (field.type) {
          case 'input':
            return String(itemValue).toLowerCase().includes(String(value).toLowerCase())

          case 'select':
          case 'radio':
            return itemValue === value

          case 'checkbox':
            if (Array.isArray(value)) {
              return value.includes(itemValue)
            }
            return itemValue === value

          case 'number':
            return Number(itemValue) === Number(value)

          case 'date':
            // Simple date comparison - you might want to enhance this
            return new Date(itemValue).toDateString() === new Date(value).toDateString()

          default:
            return true
        }
      })
    })

    onFilteredDataChange(filteredData)
  }, [data, config.fields, onFilteredDataChange])

  // Update active filters display
  React.useEffect(() => {
    const active = Object.entries(filterValues)
      .filter(([_, value]) => {
        return value !== undefined && value !== null && value !== '' &&
          !(Array.isArray(value) && value.length === 0)
      })
      .map(([key, value]) => {
        const field = config.fields.find(f => f.key === key)
        let displayValue = value

        if (field?.type === 'checkbox' && Array.isArray(value)) {
          displayValue = value.join(', ')
        } else if (field?.options) {
          const option = field.options.find(opt => opt.value === value)
          displayValue = option?.label || value
        }

        return {
          key,
          label: field?.label || key,
          value: displayValue
        }
      })

    setActiveFilters(active)
  }, [filterValues, config.fields])

  const handleFilterChange = (key: string, value: any) => {
    setFilterValues(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleApplyFilters = () => {
    if (onFiltersChange) {
      // Server-side filtering
      onFiltersChange(filterValues)
    } else {
      // Client-side filtering
      applyFilters(filterValues)
    }
    setIsDrawerOpen(false)
  }

  const handleResetFilters = () => {
    setFilterValues({})
    setActiveFilters([])
    if (onFiltersChange) {
      // Server-side filtering
      onFiltersChange({})
    } else {
      // Client-side filtering
      onFilteredDataChange(data)
    }
    setIsDrawerOpen(false)
  }

  const handleRemoveFilter = (key: string) => {
    const newFilters = { ...filterValues }
    delete newFilters[key]
    setFilterValues(newFilters)
    if (onFiltersChange) {
      // Server-side filtering
      onFiltersChange(newFilters)
    } else {
      // Client-side filtering
      applyFilters(newFilters)
    }
  }

  const renderFilterField = (field: FilterField) => {
    const value = filterValues[field.key]

    switch (field.type) {
      case 'input':
        return (
          <input
            type="text"
            placeholder={field.placeholder}
            value={value || ''}
            onChange={(e) => handleFilterChange(field.key, e.target.value)}
            className="table-search w-full"
          />
        )

      case 'select':
        return (
          <select
            value={value || ''}
            onChange={(e) => handleFilterChange(field.key, e.target.value)}
            className="table-search w-full"
          >
            <option value="">Selecione...</option>
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )

      case 'radio':
        return (
          <RadioGroup
            value={value || ''}
            onValueChange={(newValue) => handleFilterChange(field.key, newValue)}
          >
            {field.options?.map((option) => (
              <Radio
                key={option.value}
                name={field.key}
                value={option.value}
                label={option.label}
              />
            ))}
          </RadioGroup>
        )

      case 'checkbox':
        const checkboxOptions = field.options?.map(option => ({
          id: option.value,
          label: option.label
        })) || []

        const checkboxValues = checkboxOptions.reduce((acc, option) => {
          acc[option.id] = Array.isArray(value) && value.includes(option.id)
          return acc
        }, {} as Record<string, boolean>)

        return (
          <CheckboxGroup
            options={checkboxOptions}
            values={checkboxValues}
            onChange={(newValues) => {
              const selectedValues = Object.entries(newValues)
                .filter(([_, isSelected]) => isSelected)
                .map(([optionId]) => optionId)
              handleFilterChange(field.key, selectedValues)
            }}
          />
        )

      case 'number':
        return (
          <input
            type="number"
            placeholder={field.placeholder}
            value={value || ''}
            onChange={(e) => handleFilterChange(field.key, e.target.value)}
            className="table-search w-full"
          />
        )

      case 'date':
        return (
          <input
            type="date"
            value={value || ''}
            onChange={(e) => handleFilterChange(field.key, e.target.value)}
            className="table-search w-full"
          />
        )

      default:
        return null
    }
  }

  return (
    <div className={cn('space-y-4', className)}>
      {/* Filter Button and Active Filters */}
      <div className="flex items-center gap-4 flex-wrap">
        <Button
          variant="outlined"
          onClick={() => setIsDrawerOpen(true)}
          leftIcon={<span>🔍</span>}
        >
          Filtros
          {activeFilters.length > 0 && (
            <span className="ml-2 px-2 py-0.5 bg-brand-primary text-white text-xs rounded-full">
              {activeFilters.length}
            </span>
          )}
        </Button>

        {activeFilters.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <ChipGroup
              chips={activeFilters.map(filter => ({
                id: filter.key,
                label: `${filter.label}: ${filter.value}`,
                variant: 'primary',
                removable: true
              }))}
              onRemove={handleRemoveFilter}
              spacing="tight"
            />

            <Button
              variant="neutral"
              size="sm"
              onClick={handleResetFilters}
            >
              Limpar todos
            </Button>
          </div>
        )}
      </div>

      {/* Filter Drawer */}
      <Drawer
        open={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
        side="right"
        size="md"
      >
        <ModalHeader
          title="Filtros"
          subtitle="Configure os filtros para refinar os resultados"
        />

        <ModalContent>
          <div className="space-y-6">
            {config.fields.map((field) => (
              <div key={field.key} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  {field.label}
                </label>
                {renderFilterField(field)}
              </div>
            ))}
          </div>
        </ModalContent>

        <ModalFooter>
          <div className="flex gap-3">
            <Button
              variant="outlined"
              onClick={handleResetFilters}
            >
              Limpar
            </Button>
            <Button
              onClick={handleApplyFilters}
            >
              Aplicar Filtros
            </Button>
          </div>
        </ModalFooter>
      </Drawer>
    </div>
  )
}

export default TableFilter
