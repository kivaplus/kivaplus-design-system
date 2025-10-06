import React from 'react'
import { cn } from '../../utils/helpers'

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string
  alt?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  shape?: 'circle' | 'square'
  fallback?: string
  status?: 'online' | 'offline' | 'away' | 'busy'
  showStatus?: boolean
  bordered?: boolean
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({
    className,
    src,
    alt = 'Avatar',
    size = 'md',
    shape = 'circle',
    fallback,
    status,
    showStatus = false,
    bordered = false,
    ...props
  }, ref) => {
    const [imageError, setImageError] = React.useState(false)

    // Use CSS component classes
    const getShapeClass = () => {
      return shape === 'circle' ? 'avatar-circle' : 'avatar-square'
    }

    const getSizeClass = () => {
      switch (size) {
        case 'xs': return 'avatar-xs'
        case 'sm': return 'avatar-sm'
        case 'md': return 'avatar-md'
        case 'lg': return 'avatar-lg'
        case 'xl': return 'avatar-xl'
        case '2xl': return 'avatar-2xl'
        default: return 'avatar-md'
      }
    }

    const getImageClass = () => {
      return shape === 'circle' ? 'avatar-image-circle' : 'avatar-image-square'
    }

    const getStatusSizeClass = () => {
      switch (size) {
        case 'xs': return 'avatar-status-xs'
        case 'sm': return 'avatar-status-sm'
        case 'md': return 'avatar-status-md'
        case 'lg': return 'avatar-status-lg'
        case 'xl': return 'avatar-status-xl'
        case '2xl': return 'avatar-status-2xl'
        default: return 'avatar-status-md'
      }
    }

    const getStatusColorClass = () => {
      switch (status) {
        case 'online': return 'avatar-status-online'
        case 'offline': return 'avatar-status-offline'
        case 'away': return 'avatar-status-away'
        case 'busy': return 'avatar-status-busy'
        default: return 'avatar-status-offline'
      }
    }

    const initials = fallback || (alt ? alt.charAt(0).toUpperCase() : '?')

    return (
      <div
        className={cn(
          'avatar', // Base avatar component class
          getShapeClass(),
          getSizeClass(),
          bordered && 'avatar-bordered',
          className
        )}
        ref={ref}
        {...props}
      >
        {src && !imageError ? (
          <img
            src={src}
            alt={alt}
            className={cn(
              'avatar-image',
              getImageClass()
            )}
            onError={() => setImageError(true)}
          />
        ) : (
          <span>{initials}</span>
        )}

        {/* Status Indicator */}
        {showStatus && status && (
          <div
            className={cn(
              'avatar-status',
              getStatusSizeClass(),
              getStatusColorClass()
            )}
          />
        )}
      </div>
    )
  }
)

Avatar.displayName = "Avatar"

// Avatar Group Component
export interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  avatars: Array<{
    id: string
    src?: string
    alt?: string
    fallback?: string
  }>
  size?: AvatarProps['size']
  max?: number
  spacing?: 'tight' | 'normal' | 'loose'
  bordered?: boolean
}

const AvatarGroup = React.forwardRef<HTMLDivElement, AvatarGroupProps>(
  ({
    className,
    avatars,
    size = 'md',
    max = 5,
    spacing = 'normal',
    bordered = true,
    ...props
  }, ref) => {
    // Use CSS component classes
    const getSpacingClass = () => {
      switch (spacing) {
        case 'tight': return 'avatar-group-tight'
        case 'normal': return 'avatar-group-normal'
        case 'loose': return 'avatar-group-loose'
        default: return 'avatar-group-normal'
      }
    }

    const visibleAvatars = avatars.slice(0, max)
    const remainingCount = avatars.length - max

    return (
      <div
        className={cn(
          'avatar-group', // Base avatar group component class
          getSpacingClass(),
          className
        )}
        ref={ref}
        {...props}
      >
        {visibleAvatars.map((avatar, index) => (
          <Avatar
            key={avatar.id}
            src={avatar.src}
            alt={avatar.alt}
            fallback={avatar.fallback}
            size={size}
            bordered={bordered}
            className={index > 0 ? 'ml-0' : ''}
          />
        ))}

        {remainingCount > 0 && (
          <Avatar
            size={size}
            bordered={bordered}
            fallback={`+${remainingCount}`}
            className="bg-gray-200 text-gray-600"
          />
        )}
      </div>
    )
  }
)

AvatarGroup.displayName = "AvatarGroup"

export { Avatar, AvatarGroup }
