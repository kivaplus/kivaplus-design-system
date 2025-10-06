import type { Meta, StoryObj } from '@storybook/react'
import { Avatar, AvatarGroup } from '../components/avatar'

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Avatar components display user profile pictures, initials, or fallback content in a circular or square format.

## Avatar Component
- **6 Sizes**: xs, sm, md, lg, xl, 2xl with consistent scaling
- **2 Shapes**: circle (default), square for different design needs
- **Status Indicators**: online, offline, away, busy with visual dots
- **Fallback Support**: Automatic initials generation when image fails
- **Border Option**: Optional white border with shadow for layered designs
- **Image Handling**: Graceful fallback when images fail to load

## AvatarGroup Component
- **Batch Display**: Show multiple avatars with overlapping layout
- **Max Visible**: Limit visible avatars with "+X" overflow indicator
- **Spacing Options**: tight, normal, loose spacing variants
- **Consistent Styling**: Unified size and border options for all avatars

## Usage
Use avatars for:
- **User profiles** and account displays
- **Team member** listings and collaborator views
- **Comment sections** and user-generated content
- **Contact lists** and directory interfaces
- **Status indicators** for online presence
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Avatar size'
    },
    shape: {
      control: 'select',
      options: ['circle', 'square'],
      description: 'Avatar shape'
    },
    status: {
      control: 'select',
      options: ['online', 'offline', 'away', 'busy'],
      description: 'Status indicator'
    },
    showStatus: {
      control: 'boolean',
      description: 'Show status indicator'
    },
    bordered: {
      control: 'boolean',
      description: 'Show border around avatar'
    }
  },
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

// Default story
export const Default: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    alt: 'John Doe',
    size: 'md'
  }
}

// All Sizes
export const AllSizes: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">With Images:</h4>
        <div className="flex items-end gap-4">
          <Avatar
            size="xs"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
            alt="Extra Small"
          />
          <Avatar
            size="sm"
            src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
            alt="Small"
          />
          <Avatar
            size="md"
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
            alt="Medium"
          />
          <Avatar
            size="lg"
            src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face"
            alt="Large"
          />
          <Avatar
            size="xl"
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
            alt="Extra Large"
          />
          <Avatar
            size="2xl"
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
            alt="2X Large"
          />
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">With Initials:</h4>
        <div className="flex items-end gap-4">
          <Avatar size="xs" fallback="XS" />
          <Avatar size="sm" fallback="SM" />
          <Avatar size="md" fallback="MD" />
          <Avatar size="lg" fallback="LG" />
          <Avatar size="xl" fallback="XL" />
          <Avatar size="2xl" fallback="2XL" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Avatar sizes from extra small to 2x large. Use **xs/sm** for compact lists, **md** for general use, **lg/xl** for profiles, and **2xl** for hero sections.'
      }
    }
  }
}

// Shapes
export const Shapes: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Circle (Default):</h4>
        <div className="flex items-center gap-4">
          <Avatar
            shape="circle"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
            alt="Circle Avatar"
          />
          <Avatar
            shape="circle"
            fallback="JD"
          />
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Square:</h4>
        <div className="flex items-center gap-4">
          <Avatar
            shape="square"
            src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
            alt="Square Avatar"
          />
          <Avatar
            shape="square"
            fallback="SM"
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Avatar shapes: **circle** for user profiles and **square** for brand logos or modern designs.'
      }
    }
  }
}

// Status Indicators
export const StatusIndicators: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">All Status Types:</h4>
        <div className="flex items-center gap-6">
          <div className="text-center">
            <Avatar
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
              alt="Online User"
              status="online"
              showStatus
              size="lg"
            />
            <p className="text-xs text-gray-600 mt-2">Online</p>
          </div>
          <div className="text-center">
            <Avatar
              src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
              alt="Away User"
              status="away"
              showStatus
              size="lg"
            />
            <p className="text-xs text-gray-600 mt-2">Away</p>
          </div>
          <div className="text-center">
            <Avatar
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
              alt="Busy User"
              status="busy"
              showStatus
              size="lg"
            />
            <p className="text-xs text-gray-600 mt-2">Busy</p>
          </div>
          <div className="text-center">
            <Avatar
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face"
              alt="Offline User"
              status="offline"
              showStatus
              size="lg"
            />
            <p className="text-xs text-gray-600 mt-2">Offline</p>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Status with Different Sizes:</h4>
        <div className="flex items-end gap-4">
          <Avatar size="sm" fallback="SM" status="online" showStatus />
          <Avatar size="md" fallback="MD" status="away" showStatus />
          <Avatar size="lg" fallback="LG" status="busy" showStatus />
          <Avatar size="xl" fallback="XL" status="offline" showStatus />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Status indicators show user presence: **online** (green), **away** (yellow), **busy** (red), **offline** (gray). Status dots scale with avatar size.'
      }
    }
  }
}

// Bordered Avatars
export const BorderedAvatars: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">With Borders:</h4>
        <div className="flex items-center gap-4">
          <Avatar
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
            alt="Bordered Avatar"
            bordered
            size="lg"
          />
          <Avatar
            fallback="JD"
            bordered
            size="lg"
          />
          <Avatar
            src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
            alt="Bordered with Status"
            bordered
            status="online"
            showStatus
            size="lg"
          />
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Without Borders:</h4>
        <div className="flex items-center gap-4">
          <Avatar
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
            alt="Regular Avatar"
            size="lg"
          />
          <Avatar
            fallback="SM"
            size="lg"
          />
          <Avatar
            src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face"
            alt="Regular with Status"
            status="away"
            showStatus
            size="lg"
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Bordered avatars add visual separation and depth. Use borders for layered designs or when avatars overlap with background content.'
      }
    }
  }
}

// Fallback Handling
export const FallbackHandling: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Custom Fallbacks:</h4>
        <div className="flex items-center gap-4">
          <Avatar fallback="JD" size="lg" />
          <Avatar fallback="SM" size="lg" />
          <Avatar fallback="AB" size="lg" />
          <Avatar fallback="XY" size="lg" />
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Auto-Generated from Alt:</h4>
        <div className="flex items-center gap-4">
          <Avatar alt="John Doe" size="lg" />
          <Avatar alt="Sarah Miller" size="lg" />
          <Avatar alt="Alex Brown" size="lg" />
          <Avatar alt="Emma Wilson" size="lg" />
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Broken Image Fallback:</h4>
        <div className="flex items-center gap-4">
          <Avatar
            src="https://broken-image-url.jpg"
            alt="Broken Image"
            size="lg"
          />
          <Avatar
            src="https://another-broken-url.jpg"
            fallback="FB"
            size="lg"
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Fallback handling: **custom fallback** text, **auto-generated** initials from alt text, and **graceful degradation** when images fail to load.'
      }
    }
  }
}

// Avatar Groups
export const AvatarGroups: Story = {
  render: () => {
    const teamMembers = [
      { id: '1', src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face', alt: 'John Doe' },
      { id: '2', src: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face', alt: 'Sarah Miller' },
      { id: '3', src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', alt: 'Alex Brown' },
      { id: '4', src: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face', alt: 'Emma Wilson' },
      { id: '5', src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face', alt: 'Lisa Chen' },
      { id: '6', src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face', alt: 'Mike Johnson' },
      { id: '7', fallback: 'RG', alt: 'Robert Garcia' },
      { id: '8', fallback: 'KL', alt: 'Karen Lee' }
    ]

    return (
      <div className="space-y-8">
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Team Members (Max 5):</h4>
          <AvatarGroup
            avatars={teamMembers}
            max={5}
            size="md"
            spacing="normal"
          />
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Collaborators (Max 3, Tight Spacing):</h4>
          <AvatarGroup
            avatars={teamMembers}
            max={3}
            size="sm"
            spacing="tight"
          />
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Project Team (Loose Spacing, No Borders):</h4>
          <AvatarGroup
            avatars={teamMembers.slice(0, 4)}
            size="lg"
            spacing="loose"
            bordered={false}
          />
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">All Members (No Limit):</h4>
          <AvatarGroup
            avatars={teamMembers}
            size="md"
            spacing="normal"
          />
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'AvatarGroup displays multiple avatars with overlapping layout. Configure **max visible**, **spacing**, and **borders** for different use cases like team displays and collaborator lists.'
      }
    }
  }
}

// Real-world Examples
export const RealWorldExamples: Story = {
  render: () => (
    <div className="space-y-8">
      {/* User Profile Header */}
      <div>
        <h4 className="text-lg font-semibold mb-4">User Profile Header</h4>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <Avatar
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
              alt="John Doe"
              size="2xl"
              status="online"
              showStatus
              bordered
            />
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900">John Doe</h3>
              <p className="text-gray-600">Senior Frontend Developer</p>
              <p className="text-sm text-gray-500 mt-1">San Francisco, CA</p>
              <div className="flex items-center gap-2 mt-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Online now</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comment Section */}
      <div>
        <h4 className="text-lg font-semibold mb-4">Comment Section</h4>
        <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-4">
          <div className="flex gap-3">
            <Avatar
              src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
              alt="Sarah Miller"
              size="sm"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">Sarah Miller</span>
                <span className="text-xs text-gray-500">2 hours ago</span>
              </div>
              <p className="text-sm text-gray-700 mt-1">
                Great work on the new design! The user experience improvements are really noticeable.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Avatar
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
              alt="Alex Brown"
              size="sm"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">Alex Brown</span>
                <span className="text-xs text-gray-500">1 hour ago</span>
              </div>
              <p className="text-sm text-gray-700 mt-1">
                Thanks! The team put a lot of effort into the accessibility improvements too.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Dashboard */}
      <div>
        <h4 className="text-lg font-semibold mb-4">Team Dashboard</h4>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h5 className="font-medium">Project Alpha Team</h5>
            <AvatarGroup
              avatars={[
                { id: '1', src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face', alt: 'John' },
                { id: '2', src: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face', alt: 'Sarah' },
                { id: '3', src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', alt: 'Alex' },
                { id: '4', fallback: 'EM', alt: 'Emma' },
                { id: '5', fallback: 'LC', alt: 'Lisa' },
                { id: '6', fallback: 'MJ', alt: 'Mike' }
              ]}
              max={4}
              size="sm"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h6 className="text-sm font-medium text-gray-700">Online Members</h6>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Avatar
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                    alt="John Doe"
                    size="xs"
                    status="online"
                    showStatus
                  />
                  <span className="text-sm">John Doe</span>
                </div>
                <div className="flex items-center gap-3">
                  <Avatar
                    src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
                    alt="Sarah Miller"
                    size="xs"
                    status="away"
                    showStatus
                  />
                  <span className="text-sm">Sarah Miller</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h6 className="text-sm font-medium text-gray-700">Recent Activity</h6>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <Avatar
                    fallback="AL"
                    size="xs"
                    status="busy"
                    showStatus
                  />
                  <span className="text-sm">Alex updated the design</span>
                </div>
                <div className="flex items-center gap-3">
                  <Avatar
                    fallback="EM"
                    size="xs"
                    status="offline"
                    showStatus
                  />
                  <span className="text-sm">Emma completed review</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Real-world examples showing avatars in user profiles, comment sections, and team dashboards with various sizes, status indicators, and grouping patterns.'
      }
    }
  }
}

// Interactive Example
export const Interactive: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    alt: 'Interactive Avatar',
    size: 'lg',
    shape: 'circle',
    showStatus: true,
    status: 'online',
    bordered: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive avatar where you can test different props using the controls panel below. Perfect for testing sizes, shapes, status indicators, and borders.'
      }
    }
  }
}
