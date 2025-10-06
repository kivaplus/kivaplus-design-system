import React from 'react'
import { cn } from '../../utils/helpers'

// Progress Bar Component
export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
  max?: number
  variant?: 'default' | 'success' | 'warning' | 'error'
  size?: 'sm' | 'md' | 'lg'
  showValue?: boolean
  label?: string
  animated?: boolean
  striped?: boolean
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({
    className,
    value = 0,
    max = 100,
    variant = 'default',
    size = 'md',
    showValue = false,
    label,
    animated = false,
    striped = false,
    ...props
  }, ref) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

    const getVariantStyle = () => {
      switch (variant) {
        case 'success': return { backgroundColor: 'var(--color-success)' }
        case 'warning': return { backgroundColor: 'var(--color-warning)' }
        case 'error': return { backgroundColor: 'var(--color-error)' }
        default: return { backgroundColor: 'var(--color-brand-primary)' }
      }
    }

    const sizes = {
      sm: 'h-1',
      md: 'h-2',
      lg: 'h-3'
    }

    return (
      <div ref={ref} className={cn('w-full', className)} {...props}>
        {/* Label and Value */}
        {(label || showValue) && (
          <div className="flex justify-between items-center mb-2">
            {label && (
              <span className="text-sm font-medium text-gray-700">
                {label}
              </span>
            )}
            {showValue && (
              <span className="text-sm text-gray-500">
                {Math.round(percentage)}%
              </span>
            )}
          </div>
        )}

        {/* Progress Track */}
        <div className={cn(
          'w-full bg-gray-200 rounded-full overflow-hidden',
          sizes[size]
        )}>
          {/* Progress Bar */}
          <div
            className={cn(
              'h-full rounded-full transition-all duration-300 ease-out',
              striped && 'bg-gradient-to-r from-current via-transparent to-current bg-[length:1rem_1rem]',
              animated && striped && 'animate-pulse'
            )}
            style={{
              width: `${percentage}%`,
              ...getVariantStyle()
            }}
            role="progressbar"
            aria-valuenow={value}
            aria-valuemin={0}
            aria-valuemax={max}
          />
        </div>
      </div>
    )
  }
)

Progress.displayName = "Progress"

// Circular Progress Component
export interface CircularProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
  max?: number
  size?: 'sm' | 'md' | 'lg' | 'xl'
  thickness?: 'thin' | 'medium' | 'thick'
  variant?: 'default' | 'success' | 'warning' | 'error'
  showValue?: boolean
  animated?: boolean
  indeterminate?: boolean
}

const CircularProgress = React.forwardRef<HTMLDivElement, CircularProgressProps>(
  ({
    className,
    value = 0,
    max = 100,
    size = 'md',
    thickness = 'medium',
    variant = 'default',
    showValue = false,
    animated = false,
    indeterminate = false,
    ...props
  }, ref) => {
    const percentage = indeterminate ? 25 : Math.min(Math.max((value / max) * 100, 0), 100)
    const circumference = 2 * Math.PI * 45 // radius of 45
    const strokeDasharray = circumference
    const strokeDashoffset = circumference - (percentage / 100) * circumference

    const sizes = {
      sm: 'w-8 h-8',
      md: 'w-12 h-12',
      lg: 'w-16 h-16',
      xl: 'w-20 h-20'
    }

    const thicknesses = {
      thin: '2',
      medium: '4',
      thick: '6'
    }

    const getVariantStyle = () => {
      switch (variant) {
        case 'success': return { stroke: 'var(--color-success)' }
        case 'warning': return { stroke: 'var(--color-warning)' }
        case 'error': return { stroke: 'var(--color-error)' }
        default: return { stroke: 'var(--color-brand-primary)' }
      }
    }

    return (
      <div
        ref={ref}
        className={cn('relative inline-flex items-center justify-center', sizes[size], className)}
        {...props}
      >
        <svg
          className={cn(
            'transform -rotate-90 transition-all duration-300',
            indeterminate && 'animate-spin'
          )}
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
        >
          {/* Background Circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="currentColor"
            strokeWidth={thicknesses[thickness]}
            fill="none"
            className="text-gray-200"
          />
          {/* Progress Circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            strokeWidth={thicknesses[thickness]}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            style={getVariantStyle()}
            className={cn(
              'transition-all duration-300',
              animated && !indeterminate && 'animate-pulse'
            )}
          />
        </svg>

        {/* Value Display */}
        {showValue && !indeterminate && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-medium text-gray-700">
              {Math.round(percentage)}%
            </span>
          </div>
        )}
      </div>
    )
  }
)

CircularProgress.displayName = "CircularProgress"

// Spinner Component
export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'dots' | 'pulse' | 'bars'
  color?: 'default' | 'primary' | 'white' | 'gray'
}

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({
    className,
    size = 'md',
    variant = 'default',
    color = 'default',
    ...props
  }, ref) => {
    const sizes = {
      xs: 'w-3 h-3',
      sm: 'w-4 h-4',
      md: 'w-6 h-6',
      lg: 'w-8 h-8',
      xl: 'w-12 h-12'
    }

    const getColorStyle = () => {
      switch (color) {
        case 'primary': return { color: 'var(--color-brand-primary)' }
        case 'white': return { color: 'var(--color-brand-white)' }
        case 'gray': return { color: '#9ca3af' }
        default: return { color: '#6b7280' }
      }
    }

    if (variant === 'dots') {
      return (
        <div
          ref={ref}
          className={cn('inline-flex items-center gap-1', className)}
          style={getColorStyle()}
          {...props}
        >
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className={cn(
                'rounded-full bg-current animate-pulse',
                size === 'xs' ? 'w-1 h-1' :
                  size === 'sm' ? 'w-1.5 h-1.5' :
                    size === 'md' ? 'w-2 h-2' :
                      size === 'lg' ? 'w-3 h-3' : 'w-4 h-4'
              )}
              style={{
                animationDelay: `${index * 0.2}s`,
                animationDuration: '0.8s'
              }}
            />
          ))}
        </div>
      )
    }

    if (variant === 'pulse') {
      return (
        <div
          ref={ref}
          className={cn(
            'rounded-full bg-current animate-pulse',
            sizes[size],
            className
          )}
          style={getColorStyle()}
          {...props}
        />
      )
    }

    if (variant === 'bars') {
      return (
        <div
          ref={ref}
          className={cn('inline-flex items-end gap-0.5', className)}
          style={getColorStyle()}
          {...props}
        >
          {[0, 1, 2, 3].map((index) => (
            <div
              key={index}
              className={cn(
                'bg-current animate-pulse',
                size === 'xs' ? 'w-0.5 h-2' :
                  size === 'sm' ? 'w-0.5 h-3' :
                    size === 'md' ? 'w-1 h-4' :
                      size === 'lg' ? 'w-1 h-6' : 'w-1.5 h-8'
              )}
              style={{
                animationDelay: `${index * 0.15}s`,
                animationDuration: '0.6s'
              }}
            />
          ))}
        </div>
      )
    }

    // Default spinner (rotating border)
    return (
      <div
        ref={ref}
        className={cn(
          'animate-spin rounded-full border-2 border-transparent border-t-current',
          sizes[size],
          className
        )}
        style={getColorStyle()}
        {...props}
      />
    )
  }
)

Spinner.displayName = "Spinner"

// Loading Component (combines spinner with text)
export interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: string
  spinner?: SpinnerProps
  centered?: boolean
  fullHeight?: boolean
}

const Loading = React.forwardRef<HTMLDivElement, LoadingProps>(
  ({
    className,
    text = 'Carregando...',
    spinner = {},
    centered = true,
    fullHeight = false,
    ...props
  }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col items-center gap-3',
          centered && 'justify-center',
          fullHeight && 'min-h-[200px]',
          className
        )}
        {...props}
      >
        <Spinner {...spinner} />
        {text && (
          <p className="text-sm text-gray-500 font-medium">
            {text}
          </p>
        )}
      </div>
    )
  }
)

Loading.displayName = "Loading"

// Step Progress Component (for multi-step processes)
export interface StepProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: Array<{
    label: string
    description?: string
    icon?: React.ReactNode
  }>
  currentStep: number
  variant?: 'default' | 'minimal' | 'dots'
  orientation?: 'horizontal' | 'vertical'
  clickable?: boolean
  onStepClick?: (step: number) => void
}

const StepProgress = React.forwardRef<HTMLDivElement, StepProgressProps>(
  ({
    className,
    steps,
    currentStep,
    variant = 'default',
    orientation = 'horizontal',
    clickable = false,
    onStepClick,
    ...props
  }, ref) => {
    const isStepComplete = (stepIndex: number) => stepIndex < currentStep
    const isStepCurrent = (stepIndex: number) => stepIndex === currentStep

    const getIndicatorStyle = (stepIndex: number) => {
      if (isStepComplete(stepIndex)) {
        return {
          backgroundColor: 'var(--color-brand-primary)',
          borderColor: 'var(--color-brand-primary)',
          color: 'white'
        }
      } else if (isStepCurrent(stepIndex)) {
        return {
          borderColor: 'var(--color-brand-primary)',
          color: 'var(--color-brand-primary)',
          backgroundColor: 'white'
        }
      }
      return {}
    }

    const getConnectorStyle = (stepIndex: number) => {
      return {
        backgroundColor: isStepComplete(stepIndex)
          ? 'var(--color-brand-primary)'
          : '#d1d5db'
      }
    }

    return (
      <div
        ref={ref}
        className={cn(
          'flex',
          orientation === 'horizontal' ? 'flex-row items-center' : 'flex-col',
          className
        )}
        {...props}
      >
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            {/* Step */}
            <div
              className={cn(
                'flex items-center gap-3',
                orientation === 'vertical' && 'flex-col text-center',
                clickable && 'cursor-pointer',
                orientation === 'vertical' ? 'flex-1' : 'flex-shrink-0'
              )}
              onClick={() => clickable && onStepClick?.(index)}
            >
              {/* Step Indicator */}
              <div
                className={cn(
                  'flex items-center justify-center rounded-full border-2 font-medium text-sm transition-colors',
                  variant === 'dots' ? 'w-3 h-3' : 'w-8 h-8',
                  !isStepComplete(index) && !isStepCurrent(index) && 'border-gray-300 text-gray-400 bg-white'
                )}
                style={getIndicatorStyle(index)}
              >
                {variant !== 'dots' && (
                  isStepComplete(index) ? (
                    step.icon || (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )
                  ) : (
                    step.icon || (index + 1)
                  )
                )}
              </div>

              {/* Step Content */}
              {variant !== 'dots' && (
                <div className={cn(
                  orientation === 'vertical' ? 'text-center' : 'text-left'
                )}>
                  <div className={cn(
                    'text-sm font-medium',
                    isStepComplete(index) || isStepCurrent(index)
                      ? 'text-gray-900'
                      : 'text-gray-500'
                  )}>
                    {step.label}
                  </div>
                  {step.description && (
                    <div className="text-xs text-gray-500 mt-1">
                      {step.description}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div
                className={cn(
                  'transition-colors',
                  orientation === 'horizontal'
                    ? 'flex-1 h-0.5 mx-4'
                    : 'w-0.5 h-8 mx-auto'
                )}
                style={getConnectorStyle(index)}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    )
  }
)

StepProgress.displayName = "StepProgress"

export { CircularProgress, Loading, Progress, Spinner, StepProgress }
