import {
  BellIcon,
  ChatBubbleIcon,
  EnvelopeClosedIcon,
  GearIcon,
  HeartIcon,
  PersonIcon
} from '@radix-ui/react-icons'
import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from '../components/badge'

const meta = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Badge components provide circular indicators specifically for counts and notifications.

## Badge Component
- **7 Variants**: default, primary, accent, success, warning, error, info
- **3 Sizes**: sm, md, lg with consistent circular scaling
- **Dot Mode**: Minimal status indicators without content
- **Count Mode**: Circular badges for numbers and short indicators
- **Always Circular**: All badges are perfectly circular by design
- **Notification Focus**: Optimized for counts, status, and notifications

## Usage
Use badges exclusively for:
- **Notification counts** (unread messages, alerts)
- **Status indicators** (online/offline, active/inactive)
- **Numerical counters** (cart items, pending tasks)
- **Simple status dots** (availability, connection status)

For tags, labels, categories, and removable items, use the **Chip** component instead.
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'accent', 'success', 'warning', 'error', 'info'],
      description: 'Visual style variant'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Badge size'
    },
    dot: {
      control: 'boolean',
      description: 'Display as status dot without content'
    }
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

// Default story
export const Default: Story = {
  args: {
    children: '5',
    variant: 'primary',
    size: 'md'
  }
}

// All Variants
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Badge variant="default">12</Badge>
      <Badge variant="primary">5</Badge>
      <Badge variant="accent">3</Badge>
      <Badge variant="success">99+</Badge>
      <Badge variant="warning">!</Badge>
      <Badge variant="error">7</Badge>
      <Badge variant="info">2</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available badge variants with count examples. Use **primary** for main notifications, **error** for alerts, **success** for positive counts, **warning** for attention, **info** for informational counts, and **default** for neutral indicators.'
      }
    }
  }
}

// All Sizes
export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Badge size="sm">1</Badge>
        <Badge size="md">12</Badge>
        <Badge size="lg">99+</Badge>
      </div>

      <div className="flex items-center gap-3">
        <Badge size="sm" variant="error">3</Badge>
        <Badge size="md" variant="error">15</Badge>
        <Badge size="lg" variant="error">999+</Badge>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badge sizes from small to large with count examples. Use **sm** for compact notifications, **md** for general counts, and **lg** for prominent counters.'
      }
    }
  }
}

// Dot Badges
export const DotBadges: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Status Indicators:</h4>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Badge dot variant="success" size="sm" />
            <span className="text-sm">Online</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge dot variant="warning" size="sm" />
            <span className="text-sm">Away</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge dot variant="error" size="sm" />
            <span className="text-sm">Offline</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge dot variant="default" size="sm" />
            <span className="text-sm">Unknown</span>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Notification Dots:</h4>
        <div className="flex items-center gap-6">
          <div className="relative">
            <BellIcon className="w-6 h-6 text-gray-600" />
            <Badge dot variant="error" size="sm" className="absolute -top-1 -right-1" />
          </div>
          <div className="relative">
            <PersonIcon className="w-6 h-6 text-gray-600" />
            <Badge dot variant="primary" size="md" className="absolute -top-1 -right-1" />
          </div>
          <div className="relative">
            <GearIcon className="w-6 h-6 text-gray-600" />
            <Badge dot variant="warning" size="lg" className="absolute -top-1 -right-1" />
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">All Dot Sizes:</h4>
        <div className="flex items-center gap-4">
          <Badge dot variant="primary" size="sm" />
          <Badge dot variant="primary" size="md" />
          <Badge dot variant="primary" size="lg" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Dot badges provide minimal status indicators. Perfect for notification dots, status indicators, and subtle visual cues.'
      }
    }
  }
}

// Notification Badges
export const NotificationBadges: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Icon Notifications:</h4>
        <div className="flex items-center gap-8">
          <div className="relative">
            <BellIcon className="w-6 h-6 text-gray-600" />
            <Badge variant="error" size="sm" className="absolute -top-2 -right-2">3</Badge>
          </div>
          <div className="relative">
            <EnvelopeClosedIcon className="w-6 h-6 text-gray-600" />
            <Badge variant="primary" size="sm" className="absolute -top-2 -right-2">12</Badge>
          </div>
          <div className="relative">
            <ChatBubbleIcon className="w-6 h-6 text-gray-600" />
            <Badge variant="success" size="sm" className="absolute -top-2 -right-2">99+</Badge>
          </div>
          <div className="relative">
            <HeartIcon className="w-6 h-6 text-gray-600" />
            <Badge variant="accent" size="sm" className="absolute -top-2 -right-2">5</Badge>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Count Variations:</h4>
        <div className="flex flex-wrap gap-3">
          <Badge variant="error">1</Badge>
          <Badge variant="primary">12</Badge>
          <Badge variant="success">99+</Badge>
          <Badge variant="warning">999+</Badge>
          <Badge variant="info">!</Badge>
          <Badge variant="accent">?</Badge>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Badge Sizes:</h4>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-sm w-12">Small:</span>
            <Badge variant="error" size="sm">1</Badge>
            <Badge variant="primary" size="sm">12</Badge>
            <Badge variant="success" size="sm">99+</Badge>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm w-12">Medium:</span>
            <Badge variant="error" size="md">1</Badge>
            <Badge variant="primary" size="md">12</Badge>
            <Badge variant="success" size="md">99+</Badge>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm w-12">Large:</span>
            <Badge variant="error" size="lg">1</Badge>
            <Badge variant="primary" size="lg">12</Badge>
            <Badge variant="success" size="lg">99+</Badge>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Notification badges for counts and alerts. Perfect for indicating unread messages, pending notifications, and numerical counters on icons and interface elements.'
      }
    }
  }
}





// Real-world Examples
export const RealWorldExamples: Story = {
  render: () => (
    <div className="space-y-8">
      {/* Navigation with Notifications */}
      <div>
        <h4 className="text-lg font-semibold mb-4">Navigation Bar</h4>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <span className="font-medium">Dashboard</span>
              <div className="relative">
                <span className="text-gray-600">Messages</span>
                <Badge variant="primary" size="sm" className="absolute -top-2 -right-4">12</Badge>
              </div>
              <div className="relative">
                <span className="text-gray-600">Notifications</span>
                <Badge variant="error" size="sm" className="absolute -top-2 -right-4">3</Badge>
              </div>
              <div className="relative">
                <span className="text-gray-600">Tasks</span>
                <Badge variant="warning" size="sm" className="absolute -top-2 -right-4">7</Badge>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge dot variant="success" size="sm" />
              <span className="text-sm text-gray-600">Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Shopping Cart */}
      <div>
        <h4 className="text-lg font-semibold mb-4">E-commerce Interface</h4>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h5 className="font-medium">Product Categories</h5>
            <div className="relative">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg">
                <span>Cart</span>
                <Badge variant="primary" size="sm">5</Badge>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 border border-gray-200 rounded-lg">
              <div className="relative inline-block mb-2">
                <div className="w-12 h-12 bg-gray-100 rounded-lg mx-auto"></div>
                <Badge variant="error" size="sm" className="absolute -top-1 -right-1">2</Badge>
              </div>
              <p className="text-sm">Electronics</p>
            </div>

            <div className="text-center p-3 border border-gray-200 rounded-lg">
              <div className="relative inline-block mb-2">
                <div className="w-12 h-12 bg-gray-100 rounded-lg mx-auto"></div>
                <Badge variant="success" size="sm" className="absolute -top-1 -right-1">8</Badge>
              </div>
              <p className="text-sm">Clothing</p>
            </div>

            <div className="text-center p-3 border border-gray-200 rounded-lg">
              <div className="relative inline-block mb-2">
                <div className="w-12 h-12 bg-gray-100 rounded-lg mx-auto"></div>
                <Badge variant="info" size="sm" className="absolute -top-1 -right-1">15</Badge>
              </div>
              <p className="text-sm">Books</p>
            </div>

            <div className="text-center p-3 border border-gray-200 rounded-lg">
              <div className="relative inline-block mb-2">
                <div className="w-12 h-12 bg-gray-100 rounded-lg mx-auto"></div>
                <Badge variant="accent" size="sm" className="absolute -top-1 -right-1">99+</Badge>
              </div>
              <p className="text-sm">Home & Garden</p>
            </div>
          </div>
        </div>
      </div>

      {/* Status Dashboard */}
      <div>
        <h4 className="text-lg font-semibold mb-4">System Status</h4>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Badge dot variant="success" size="md" />
                <span className="font-medium">API Server</span>
              </div>
              <Badge variant="success" size="sm">99.9%</Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Badge dot variant="warning" size="md" />
                <span className="font-medium">Database</span>
              </div>
              <Badge variant="warning" size="sm">3</Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Badge dot variant="error" size="md" />
                <span className="font-medium">Queue</span>
              </div>
              <Badge variant="error" size="sm">12</Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Real-world examples showing badges for notifications, counts, and status indicators in navigation, e-commerce, and dashboard interfaces.'
      }
    }
  }
}

// Interactive Example
export const Interactive: Story = {
  args: {
    children: '5',
    variant: 'primary',
    size: 'md',
    dot: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive badge where you can test different props using the controls panel below. Perfect for testing notification counts and status indicators.'
      }
    }
  }
}
