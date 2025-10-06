import {
  BellIcon,
  BookmarkFilledIcon,
  BookmarkIcon,
  ChatBubbleIcon,
  DownloadIcon,
  FileTextIcon,
  GearIcon,
  HeartFilledIcon,
  HeartIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  PauseIcon,
  Pencil1Icon,
  PersonIcon,
  PlayIcon,
  PlusIcon,
  Share1Icon,
  StarFilledIcon,
  StarIcon,
  StopIcon,
  TrashIcon
} from '@radix-ui/react-icons'
import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { ActionButton, ActionButtonGroup } from '../components/action-button'

const meta = {
  title: 'Components/ActionButton',
  component: ActionButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
ActionButton components provide interactive buttons optimized for actions, toolbars, and floating interfaces.

## ActionButton Component
- **6 Variants**: default, primary, accent, neutral, ghost, outlined
- **3 Sizes**: sm, md, lg with automatic icon-only sizing
- **2 Shapes**: square (rounded) and circle
- **Interactive States**: hover, selected, loading, disabled
- **Accessibility**: Built-in tooltips and keyboard navigation

## ActionButtonGroup Component
- **Orientation**: horizontal or vertical layouts
- **Selection Modes**: exclusive (single) or multiple selection
- **Consistent Styling**: Inherits variant and size from group
- **Flexible Spacing**: tight, normal, or loose spacing options

## FloatingActionButton Component
- **4 Positions**: bottom-right, bottom-left, top-right, top-left
- **3 Offset Sizes**: sm, md, lg for different spacing from edges
- **Extended Mode**: Can show text alongside icon
- **Enhanced Shadows**: Elevated appearance with hover effects

## Variant Guide
- **default**: Standard white button with border for general actions
- **primary**: Brand-colored gradient for main call-to-action buttons
- **accent**: Accent-colored for secondary important actions
- **neutral**: Subtle gray background for settings and filters
- **ghost**: Transparent background for minimal presence
- **outlined**: Transparent with border for secondary actions

## Usage
Use ActionButtons for toolbars, quick actions, and interactive elements. Use ActionButtonGroup for related actions. Use FloatingActionButton for primary actions that should always be accessible.
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'accent', 'neutral', 'ghost', 'outlined'],
      description: 'Visual style variant'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Button size'
    },
    shape: {
      control: 'select',
      options: ['square', 'circle'],
      description: 'Button shape'
    },
    selected: {
      control: 'boolean',
      description: 'Selected state'
    },
    loading: {
      control: 'boolean',
      description: 'Loading state with spinner'
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state'
    }
  },
} satisfies Meta<typeof ActionButton>

export default meta
type Story = StoryObj<typeof meta>

// Default story
export const Default: Story = {
  args: {
    icon: <PlusIcon />,
    label: 'Add Item',
    variant: 'default',
    size: 'md',
    shape: 'square'
  }
}

// All Variants
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <ActionButton variant="default" icon={<PlusIcon />} label="Default" />
      <ActionButton variant="primary" icon={<PlusIcon />} label="Primary" />
      <ActionButton variant="accent" icon={<PlusIcon />} label="Accent" />
      <ActionButton variant="neutral" icon={<PlusIcon />} label="Neutral" />
      <ActionButton variant="ghost" icon={<PlusIcon />} label="Ghost" />
      <ActionButton variant="outlined" icon={<PlusIcon />} label="Outlined" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available ActionButton variants. Use **default** for standard actions, **primary** for main CTAs, **accent** for secondary emphasis, **neutral** for subtle actions, **ghost** for minimal presence, and **outlined** for secondary actions with borders.'
      }
    }
  }
}

// All Sizes
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <ActionButton size="sm" icon={<PlusIcon />} label="Small" />
      <ActionButton size="md" icon={<PlusIcon />} label="Medium" />
      <ActionButton size="lg" icon={<PlusIcon />} label="Large" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'ActionButton sizes from small to large. Icons and text scale appropriately with each size.'
      }
    }
  }
}

// Neutral Variant Examples
export const NeutralVariant: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Settings Toggle:</h4>
        <div className="flex items-center gap-2">
          <span className="text-sm">Theme:</span>
          <ActionButtonGroup exclusive value="light" variant="neutral" size="sm">
            <ActionButton value="light" label="Light" />
            <ActionButton value="dark" label="Dark" />
            <ActionButton value="auto" label="Auto" />
          </ActionButtonGroup>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Filter Options:</h4>
        <ActionButtonGroup variant="neutral" size="sm" spacing="tight">
          <ActionButton icon={<PersonIcon />} label="Users" />
          <ActionButton icon={<FileTextIcon />} label="Documents" />
          <ActionButton icon={<GearIcon />} label="Settings" />
        </ActionButtonGroup>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Subtle Actions:</h4>
        <div className="flex gap-2">
          <ActionButton variant="neutral" size="sm" icon={<BellIcon />} tooltip="Notifications" />
          <ActionButton variant="neutral" size="sm" icon={<MagnifyingGlassIcon />} tooltip="Search" />
          <ActionButton variant="neutral" size="sm" icon={<GearIcon />} tooltip="Settings" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'The neutral variant provides a subtle, muted appearance perfect for settings, filters, and secondary actions that need to be present but not prominent.'
      }
    }
  }
}

// Icon Only Buttons
export const IconOnly: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <h4 className="text-sm font-medium text-gray-700">Square Shape:</h4>
        <ActionButton size="sm" icon={<HeartIcon />} tooltip="Like" />
        <ActionButton size="md" icon={<StarIcon />} tooltip="Favorite" />
        <ActionButton size="lg" icon={<BookmarkIcon />} tooltip="Bookmark" />
      </div>

      <div className="flex items-center gap-4">
        <h4 className="text-sm font-medium text-gray-700">Circle Shape:</h4>
        <ActionButton size="sm" shape="circle" icon={<HeartIcon />} tooltip="Like" />
        <ActionButton size="md" shape="circle" icon={<StarIcon />} tooltip="Favorite" />
        <ActionButton size="lg" shape="circle" icon={<BookmarkIcon />} tooltip="Bookmark" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Icon-only ActionButtons automatically adjust their dimensions. Available in both square and circle shapes with tooltips.'
      }
    }
  }
}

// Interactive States
export const InteractiveStates: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>([])
    const [loading, setLoading] = useState<string[]>([])

    const toggleSelected = (id: string) => {
      setSelected(prev =>
        prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
      )
    }

    const toggleLoading = (id: string) => {
      setLoading(prev =>
        prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
      )
    }

    return (
      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Selected States:</h4>
          <div className="flex gap-3">
            <ActionButton
              icon={<HeartIcon />}
              selected={selected.includes('heart')}
              onClick={() => toggleSelected('heart')}
              tooltip="Toggle like"
            />
            <ActionButton
              icon={<StarIcon />}
              selected={selected.includes('star')}
              onClick={() => toggleSelected('star')}
              tooltip="Toggle favorite"
            />
            <ActionButton
              icon={<BookmarkIcon />}
              selected={selected.includes('bookmark')}
              onClick={() => toggleSelected('bookmark')}
              tooltip="Toggle bookmark"
            />
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Loading States:</h4>
          <div className="flex gap-3">
            <ActionButton
              icon={<DownloadIcon />}
              label="Download"
              loading={loading.includes('download')}
              onClick={() => toggleLoading('download')}
            />
            <ActionButton
              icon={<Share1Icon />}
              loading={loading.includes('share')}
              onClick={() => toggleLoading('share')}
              tooltip="Share"
            />
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Disabled State:</h4>
          <div className="flex gap-3">
            <ActionButton icon={<TrashIcon />} label="Delete" disabled />
            <ActionButton icon={<Pencil1Icon />} disabled tooltip="Edit (disabled)" />
          </div>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive states including selected (toggleable), loading with spinners, and disabled states.'
      }
    }
  }
}

// Action Button Groups
export const ButtonGroups: Story = {
  render: () => {
    const [mediaControl, setMediaControl] = useState('play')
    const [selectedTools, setSelectedTools] = useState<string[]>(['bold'])
    const [viewMode, setViewMode] = useState('grid')

    return (
      <div className="space-y-8">
        {/* Media Controls - Exclusive Selection */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Media Controls (Exclusive):</h4>
          <ActionButtonGroup
            exclusive
            value={mediaControl}
            onValueChange={(value) => setMediaControl(value as string)}
            variant="primary"
          >
            <ActionButton value="play" icon={<PlayIcon />} tooltip="Play" />
            <ActionButton value="pause" icon={<PauseIcon />} tooltip="Pause" />
            <ActionButton value="stop" icon={<StopIcon />} tooltip="Stop" />
          </ActionButtonGroup>
        </div>

        {/* Toolbar - Multiple Selection */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Toolbar (Multiple):</h4>
          <ActionButtonGroup
            value={selectedTools}
            onValueChange={(value) => setSelectedTools(value as string[])}
            variant="outlined"
            spacing="tight"
          >
            <ActionButton value="bold" label="B" tooltip="Bold" />
            <ActionButton value="italic" label="I" tooltip="Italic" />
            <ActionButton value="underline" label="U" tooltip="Underline" />
            <ActionButton value="strike" label="S" tooltip="Strikethrough" />
          </ActionButtonGroup>
        </div>

        {/* View Modes - Vertical Layout */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">View Modes (Vertical):</h4>
          <ActionButtonGroup
            orientation="vertical"
            exclusive
            value={viewMode}
            onValueChange={(value) => setViewMode(value as string)}
            variant="ghost"
            spacing="normal"
          >
            <ActionButton value="list" icon={<HomeIcon />} label="List View" />
            <ActionButton value="grid" icon={<GearIcon />} label="Grid View" />
            <ActionButton value="card" icon={<PersonIcon />} label="Card View" />
          </ActionButtonGroup>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'ActionButtonGroup examples showing exclusive selection (single choice), multiple selection, and vertical orientation.'
      }
    }
  }
}

// Floating Action Buttons
export const FloatingActionButtons: Story = {
  render: () => (
    <div className="relative h-96 bg-gray-50 rounded-lg overflow-hidden">
      <div className="p-6">
        <h4 className="text-lg font-semibold mb-4">Floating Action Button Demo</h4>
        <p className="text-gray-600 mb-4">
          Floating Action Buttons are positioned at the edges of the container.
          In a real application, they would be positioned relative to the viewport.
        </p>
        <p className="text-sm text-gray-500">
          Hover over the buttons to see their tooltips and interactions.
        </p>
      </div>

      {/* Simulated FABs (using absolute positioning within this container) */}
      <div className="absolute bottom-4 right-4">
        <ActionButton
          variant="primary"
          size="lg"
          shape="circle"
          icon={<PlusIcon />}
          tooltip="Add new item"
          className="shadow-lg hover:shadow-xl"
        />
      </div>

      <div className="absolute bottom-4 left-4">
        <ActionButton
          variant="accent"
          size="md"
          shape="circle"
          icon={<ChatBubbleIcon />}
          tooltip="Open chat"
          className="shadow-lg hover:shadow-xl"
        />
      </div>

      <div className="absolute top-4 right-4">
        <ActionButton
          variant="outlined"
          size="md"
          icon={<BellIcon />}
          label="Notifications"
          tooltip="View notifications"
          className="shadow-lg hover:shadow-xl bg-white"
        />
      </div>

      <div className="absolute top-4 left-4">
        <ActionButton
          variant="ghost"
          size="sm"
          shape="circle"
          icon={<MagnifyingGlassIcon />}
          tooltip="Search"
          className="shadow-lg hover:shadow-xl bg-white"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Floating Action Button examples showing different positions, sizes, and variants. In real usage, these would be positioned relative to the viewport.'
      }
    }
  }
}

// Real-world Examples
export const RealWorldExamples: Story = {
  render: () => {
    const [liked, setLiked] = useState<string[]>([])
    const [bookmarked, setBookmarked] = useState<string[]>([])
    const [favorited, setFavorited] = useState<string[]>([])

    const toggleState = (id: string, state: string[], setState: (state: string[]) => void) => {
      setState(state.includes(id) ? state.filter(x => x !== id) : [...state, id])
    }

    return (
      <div className="space-y-8">
        {/* Social Media Actions */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Social Media Actions</h4>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <p className="text-gray-700 mb-4">
              "Just launched our new design system! 🎉 What do you think about these action buttons?"
            </p>
            <div className="flex items-center gap-2">
              <ActionButton
                variant="ghost"
                size="sm"
                icon={liked.includes('post1') ? <HeartFilledIcon className="text-red-500" /> : <HeartIcon />}
                label={liked.includes('post1') ? '24' : '23'}
                selected={liked.includes('post1')}
                onClick={() => toggleState('post1', liked, setLiked)}
                tooltip={liked.includes('post1') ? 'Unlike' : 'Like'}
              />
              <ActionButton
                variant="ghost"
                size="sm"
                icon={<ChatBubbleIcon />}
                label="5"
                tooltip="Comments"
              />
              <ActionButton
                variant="ghost"
                size="sm"
                icon={<Share1Icon />}
                tooltip="Share"
              />
              <ActionButton
                variant="ghost"
                size="sm"
                icon={bookmarked.includes('post1') ? <BookmarkFilledIcon className="text-blue-500" /> : <BookmarkIcon />}
                selected={bookmarked.includes('post1')}
                onClick={() => toggleState('post1', bookmarked, setBookmarked)}
                tooltip={bookmarked.includes('post1') ? 'Remove bookmark' : 'Bookmark'}
              />
            </div>
          </div>
        </div>

        {/* Toolbar Example */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Editor Toolbar</h4>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
            <ActionButtonGroup spacing="tight" variant="outlined">
              <ActionButton icon={<Pencil1Icon />} tooltip="Edit" />
              <ActionButton icon={<TrashIcon />} tooltip="Delete" />
              <ActionButton icon={<DownloadIcon />} tooltip="Download" />
              <ActionButton icon={<Share1Icon />} tooltip="Share" />
              <ActionButton icon={<GearIcon />} tooltip="Settings" />
            </ActionButtonGroup>
          </div>
        </div>

        {/* Music Player Controls */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Music Player</h4>
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h5 className="font-semibold">Now Playing</h5>
                <p className="text-purple-100">Awesome Track - Great Artist</p>
              </div>
              <ActionButton
                variant="ghost"
                shape="circle"
                icon={favorited.includes('track1') ? <StarFilledIcon className="text-yellow-400" /> : <StarIcon />}
                selected={favorited.includes('track1')}
                onClick={() => toggleState('track1', favorited, setFavorited)}
                tooltip="Add to favorites"
                className="text-white hover:bg-white/20"
              />
            </div>
            <div className="flex items-center justify-center gap-4">
              <ActionButton
                variant="ghost"
                shape="circle"
                icon={<PlayIcon />}
                tooltip="Previous"
                className="text-white hover:bg-white/20"
              />
              <ActionButton
                variant="primary"
                size="lg"
                shape="circle"
                icon={<PauseIcon />}
                tooltip="Pause"
                className="bg-white text-purple-600 hover:bg-gray-100"
              />
              <ActionButton
                variant="ghost"
                shape="circle"
                icon={<PlayIcon />}
                tooltip="Next"
                className="text-white hover:bg-white/20"
              />
            </div>
          </div>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Real-world examples showing ActionButtons in social media interfaces, editor toolbars, and media players with interactive states.'
      }
    }
  }
}

// Interactive Example
export const Interactive: Story = {
  args: {
    icon: <PlusIcon />,
    label: 'Interactive Button',
    variant: 'primary',
    size: 'md',
    shape: 'square',
    tooltip: 'Click me!',
    onClick: () => alert('ActionButton clicked!')
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive ActionButton where you can test different props using the controls panel below.'
      }
    }
  }
}
