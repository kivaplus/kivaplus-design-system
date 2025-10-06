import React from 'react'
import { cn } from '../../utils/helpers'

export interface HeaderGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  subtitle?: string
  description?: string
  badge?: React.ReactNode
  avatar?: React.ReactNode
  actions?: React.ReactNode
  breadcrumb?: React.ReactNode
  tabs?: React.ReactNode
  variant?: 'default' | 'centered'
  sticky?: boolean
  bordered?: boolean
}

const HeaderGroup = React.forwardRef<HTMLDivElement, HeaderGroupProps>(
  ({
    className,
    title,
    subtitle,
    description,
    badge,
    avatar,
    actions,
    breadcrumb,
    tabs,
    variant = 'default',
    sticky = false,
    bordered = false,
    ...props
  }, ref) => {
    // Use CSS component classes
    const getContainerClass = () => {
      let baseClass = 'header-group'
      const classes = [baseClass]

      if (sticky) classes.push('header-group-sticky')
      if (bordered) classes.push('header-group-bordered')
      classes.push('header-group-padding')

      return classes.join(' ')
    }

    const getVariantClass = () => {
      return `header-group-${variant}`
    }

    const getHeaderClass = () => {
      return `header-group-header-${variant}`
    }

    const getTitleClass = () => {
      return `header-group-title-${variant}`
    }

    const getSubtitleClass = () => {
      return 'header-group-subtitle'
    }

    const getDescriptionClass = () => {
      return `header-group-description-${variant}`
    }

    return (
      <div
        ref={ref}
        className={cn(getContainerClass(), className)}
        {...props}
      >
        {/* Breadcrumb */}
        {breadcrumb && (
          <div className="header-group-breadcrumb">
            {breadcrumb}
          </div>
        )}

        {/* Main Header Content */}
        <div className={getVariantClass()}>
          {/* Header Section */}
          <div className={getHeaderClass()}>
            {avatar && (
              <div className="header-group-avatar">
                {avatar}
              </div>
            )}

            <div className="header-group-content">
              {/* Title */}
              <div className="header-group-title-container">
                <h1 className={getTitleClass()}>
                  {title}
                </h1>
                {!subtitle && badge && badge}
              </div>

              {/* Subtitle */}
              {subtitle && (
                <div className="header-group-subtitle-container">
                  <span className={getSubtitleClass()}>
                    {subtitle}
                  </span>
                  {badge && badge}
                </div>
              )}

              {/* Description */}
              {description && (
                <p className={getDescriptionClass()}>
                  {description}
                </p>
              )}
            </div>
          </div>

          {/* Actions */}
          {actions && (
            <div className="header-group-actions">
              {actions}
            </div>
          )}
        </div>

        {/* Tabs */}
        {tabs && (
          <div className="header-group-tabs">
            {tabs}
          </div>
        )}
      </div>
    )
  }
)

HeaderGroup.displayName = "HeaderGroup"

// Page Header Component (common use case)
export interface PageHeaderProps extends Omit<HeaderGroupProps, 'variant'> {
  loading?: boolean
  skeleton?: boolean
}

const PageHeader = React.forwardRef<HTMLDivElement, PageHeaderProps>(
  ({
    loading = false,
    skeleton = false,
    title,
    subtitle,
    description,
    ...props
  }, ref) => {
    if (loading || skeleton) {
      return (
        <div ref={ref} className="page-header">
          <div className="page-header-skeleton">
            <div className="page-header-skeleton-content">
              {/* Skeleton Subtitle */}
              <div className="page-header-skeleton-subtitle" />

              {/* Skeleton Title */}
              <div className="page-header-skeleton-title" />

              {/* Skeleton Description */}
              <div className="page-header-skeleton-description" />
            </div>

            {/* Skeleton Actions */}
            <div className="page-header-skeleton-actions">
              <div className="page-header-skeleton-action page-header-skeleton-action-sm" />
              <div className="page-header-skeleton-action page-header-skeleton-action-md" />
            </div>
          </div>
        </div>
      )
    }

    return (
      <HeaderGroup
        ref={ref}
        variant="default"
        title={title}
        subtitle={subtitle}
        description={description}
        {...props}
      />
    )
  }
)

PageHeader.displayName = "PageHeader"

// Section Header Component (for sections within pages)
export interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  subtitle?: string
  description?: string
  actions?: React.ReactNode
  level?: 2 | 3 | 4 | 5 | 6
  divider?: boolean
}

const SectionHeader = React.forwardRef<HTMLDivElement, SectionHeaderProps>(
  ({
    className,
    title,
    subtitle,
    description,
    actions,
    level = 2,
    divider = false,
    ...props
  }, ref) => {
    // Use CSS component classes
    const getContainerClass = () => {
      let baseClass = 'section-header'
      if (divider) baseClass += ' section-header-divider'
      return baseClass
    }

    const getTitleClass = () => {
      return `section-header-title-h${level}`
    }

    return (
      <div
        ref={ref}
        className={cn(getContainerClass(), className)}
        {...props}
      >
        <div className="section-header-content">
          {subtitle && (
            <p className="section-header-subtitle">
              {subtitle}
            </p>
          )}

          {React.createElement(
            `h${level}`,
            { className: getTitleClass() },
            title
          )}

          {description && (
            <p className="section-header-description">
              {description}
            </p>
          )}
        </div>

        {actions && (
          <div className="section-header-actions">
            {actions}
          </div>
        )}
      </div>
    )
  }
)

SectionHeader.displayName = "SectionHeader"

// Stats Header Component (for dashboard headers with metrics)
export interface StatsHeaderProps extends HeaderGroupProps {
  stats: Array<{
    label: string
    value: string | number
    change?: string
    trend?: 'up' | 'down' | 'neutral'
    icon?: React.ReactNode
  }>
}

const StatsHeader = React.forwardRef<HTMLDivElement, StatsHeaderProps>(
  ({
    className,
    stats,
    ...props
  }, ref) => {
    // Use CSS component classes
    const getTrendClass = (trend: 'up' | 'down' | 'neutral') => {
      return `stats-header-card-change stats-header-card-change-${trend}`
    }

    const trendIcons = {
      up: (
        <svg className="stats-header-trend-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      ),
      down: (
        <svg className="stats-header-trend-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      ),
      neutral: (
        <svg className="stats-header-trend-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14" />
        </svg>
      )
    }

    return (
      <div ref={ref} className={cn('stats-header', className)}>
        <HeaderGroup {...props} />

        {/* Stats Grid */}
        <div className="stats-header-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stats-header-card">
              <div className="stats-header-card-content">
                <div className="stats-header-card-main">
                  <p className="stats-header-card-label">
                    {stat.label}
                  </p>
                  <p className="stats-header-card-value">
                    {stat.value}
                  </p>
                  {stat.change && stat.trend && (
                    <div className={getTrendClass(stat.trend)}>
                      {trendIcons[stat.trend]}
                      <span className="stats-header-card-change-text">
                        {stat.change}
                      </span>
                    </div>
                  )}
                </div>
                {stat.icon && (
                  <div className="stats-header-card-icon">
                    {stat.icon}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
)

StatsHeader.displayName = "StatsHeader"

export { HeaderGroup, PageHeader, SectionHeader, StatsHeader }
