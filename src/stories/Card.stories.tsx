import {
  CalendarIcon,
  DotsHorizontalIcon,
  GearIcon,
  HeartIcon,
  PersonIcon,
  Share1Icon,
  StarIcon
} from '@radix-ui/react-icons'
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../components/button'
import { Card, CardContent, CardFooter, CardHeader } from '../components/card'

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
The Card component is a flexible container that groups related content and actions. It supports multiple variants, padding options, and interactive states.

## Features
- **3 Variants**: elevated (with shadow), outlined (with border), filled (with background)
- **4 Padding Options**: none, sm, md, lg
- **Interactive States**: Hover effects and click handling
- **Disabled State**: Visual feedback for non-interactive cards
- **Composition**: CardHeader, CardContent, and CardFooter subcomponents

## Usage
Use cards to group related information, display content previews, or create interactive elements like product cards or dashboard widgets.
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['elevated', 'outlined', 'filled'],
      description: 'Visual style variant of the card'
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Internal padding of the card'
    },
    interactive: {
      control: 'boolean',
      description: 'Whether the card responds to hover and click events'
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the card and shows disabled styling'
    }
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

// Default story
export const Default: Story = {
  args: {
    variant: 'elevated',
    padding: 'md',
    children: (
      <>
        <CardHeader title="Card Title" subtitle="This is a subtitle" />
        <CardContent>
          <p>This is the main content of the card. It can contain any React elements.</p>
        </CardContent>
        <CardFooter>
          <Button variant="outlined" size="sm">Cancel</Button>
          <Button size="sm">Save</Button>
        </CardFooter>
      </>
    )
  }
}

// All Variants
export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card variant="elevated">
        <CardHeader title="Elevated Card" subtitle="With shadow effect" />
        <CardContent>
          <p>This card has a subtle shadow that gives it depth and makes it appear elevated above the background.</p>
        </CardContent>
      </Card>

      <Card variant="outlined">
        <CardHeader title="Outlined Card" subtitle="With border styling" />
        <CardContent>
          <p>This card uses a border to define its boundaries without shadows, creating a clean outlined appearance.</p>
        </CardContent>
      </Card>

      <Card variant="filled">
        <CardHeader title="Filled Card" subtitle="With background color" />
        <CardContent>
          <p>This card has a subtle background color that helps distinguish it from the main background.</p>
        </CardContent>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available card variants. Use **elevated** for prominent content, **outlined** for clean separation, and **filled** for subtle differentiation.'
      }
    }
  }
}

// Padding Options
export const PaddingOptions: Story = {
  render: () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card padding="none" variant="outlined">
        <div className="p-2 bg-blue-50 text-blue-700 text-sm">No Padding</div>
      </Card>

      <Card padding="sm" variant="outlined">
        <div className="bg-green-50 text-green-700 text-sm -m-4 p-2">Small Padding</div>
      </Card>

      <Card padding="md" variant="outlined">
        <div className="bg-yellow-50 text-yellow-700 text-sm -m-6 p-2">Medium Padding</div>
      </Card>

      <Card padding="lg" variant="outlined">
        <div className="bg-purple-50 text-purple-700 text-sm -m-8 p-2">Large Padding</div>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different padding options for cards. Use **none** for custom spacing, **sm** for compact content, **md** for general use, and **lg** for spacious layouts.'
      }
    }
  }
}

// Interactive Cards
export const InteractiveCards: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card
        variant="elevated"
        interactive
        onClick={() => alert('Card clicked!')}
        className="cursor-pointer"
      >
        <CardHeader title="Interactive Card" subtitle="Click me!" />
        <CardContent>
          <p>This card responds to hover and click events. Notice the hover effects and cursor change.</p>
        </CardContent>
      </Card>

      <Card variant="outlined" interactive disabled>
        <CardHeader title="Disabled Card" subtitle="Cannot be clicked" />
        <CardContent>
          <p>This card is disabled and shows appropriate visual feedback.</p>
        </CardContent>
      </Card>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive cards with hover effects and click handling. Disabled cards show muted styling.'
      }
    }
  }
}

// Card Compositions
export const CardCompositions: Story = {
  render: () => (
    <div className="space-y-6">
      {/* Simple Card */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Simple Content Card</h3>
        <Card variant="elevated" className="max-w-md">
          <CardContent>
            <h4 className="font-semibold text-gray-900 mb-2">Quick Note</h4>
            <p>Sometimes you just need a simple card without headers or footers.</p>
          </CardContent>
        </Card>
      </div>

      {/* Card with Actions */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Card with Header Actions</h3>
        <Card variant="outlined" className="max-w-md">
          <CardHeader
            title="Settings"
            subtitle="Manage your preferences"
            actions={
              <Button variant="neutral" size="sm">
                <GearIcon className="w-4 h-4" />
              </Button>
            }
          />
          <CardContent>
            <p>This card has an action button in the header for quick access to functionality.</p>
          </CardContent>
        </Card>
      </div>

      {/* Card with Footer Actions */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Card with Footer Actions</h3>
        <Card variant="filled" className="max-w-md">
          <CardHeader title="Article Draft" subtitle="Last edited 2 hours ago" />
          <CardContent>
            <p>Your article draft has been saved. You can continue editing or publish it now.</p>
          </CardContent>
          <CardFooter justify="between">
            <span className="text-sm text-gray-500">Auto-saved</span>
            <div className="flex gap-2">
              <Button variant="outlined" size="sm">Continue Editing</Button>
              <Button size="sm">Publish</Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different card compositions using CardHeader, CardContent, and CardFooter components.'
      }
    }
  }
}

// Real-world Examples
export const RealWorldExamples: Story = {
  render: () => (
    <div className="space-y-8">
      {/* Product Card */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Product Cards</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card variant="elevated" interactive>
            <div className="aspect-video bg-gradient-to-br from-blue-400 to-purple-500 rounded-t-lg -m-6 mb-4"></div>
            <CardContent className="-mt-2">
              <h4 className="font-semibold text-gray-900 mb-1">Premium Plan</h4>
              <p className="text-sm text-gray-500 mb-3">Everything you need to get started</p>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-2xl font-bold text-gray-900">$29</span>
                <span className="text-sm text-gray-500">/month</span>
              </div>
              <Button fullWidth size="sm">Choose Plan</Button>
            </CardContent>
          </Card>

          <Card variant="elevated" interactive>
            <div className="aspect-video bg-gradient-to-br from-green-400 to-blue-500 rounded-t-lg -m-6 mb-4"></div>
            <CardContent className="-mt-2">
              <h4 className="font-semibold text-gray-900 mb-1">Pro Plan</h4>
              <p className="text-sm text-gray-500 mb-3">For growing businesses</p>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-2xl font-bold text-gray-900">$59</span>
                <span className="text-sm text-gray-500">/month</span>
              </div>
              <Button fullWidth size="sm">Choose Plan</Button>
            </CardContent>
          </Card>

          <Card variant="elevated" interactive>
            <div className="aspect-video bg-gradient-to-br from-purple-400 to-pink-500 rounded-t-lg -m-6 mb-4"></div>
            <CardContent className="-mt-2">
              <h4 className="font-semibold text-gray-900 mb-1">Enterprise</h4>
              <p className="text-sm text-gray-500 mb-3">For large organizations</p>
              <div className="flex items-baseline gap-1 mb-4">
                <span className="text-2xl font-bold text-gray-900">$99</span>
                <span className="text-sm text-gray-500">/month</span>
              </div>
              <Button fullWidth size="sm">Contact Sales</Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Social Media Card */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Social Media Post</h3>
        <Card variant="outlined" className="max-w-lg">
          <CardHeader
            actions={
              <Button variant="neutral" size="sm">
                <DotsHorizontalIcon className="w-4 h-4" />
              </Button>
            }
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                <PersonIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">John Doe</h4>
                <p className="text-sm text-gray-500">2 hours ago</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Just finished an amazing hike in the mountains! The view was absolutely breathtaking. Nature never fails to inspire me. 🏔️ #hiking #nature #adventure</p>
            <div className="aspect-video bg-gradient-to-br from-green-400 to-blue-500 rounded-lg"></div>
          </CardContent>
          <CardFooter justify="between">
            <div className="flex items-center gap-4">
              <Button variant="neutral" size="sm" leftIcon={<HeartIcon className="w-4 h-4" />}>
                24
              </Button>
              <Button variant="neutral" size="sm" leftIcon={<Share1Icon className="w-4 h-4" />}>
                Share
              </Button>
            </div>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon key={star} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
            </div>
          </CardFooter>
        </Card>
      </div>

      {/* Dashboard Widget */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Dashboard Widget</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card variant="filled">
            <CardHeader
              title="Monthly Revenue"
              subtitle="Total earnings this month"
              actions={
                <Button variant="neutral" size="sm">
                  <CalendarIcon className="w-4 h-4" />
                </Button>
              }
            />
            <CardContent>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl font-bold text-gray-900">$12,450</span>
                <span className="text-sm text-green-600 font-medium">+12.5%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
              <p className="text-sm text-gray-500 mt-2">75% of monthly goal</p>
            </CardContent>
          </Card>

          <Card variant="filled">
            <CardHeader
              title="Active Users"
              subtitle="Users online right now"
            />
            <CardContent>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl font-bold text-gray-900">1,234</span>
                <span className="text-sm text-blue-600 font-medium">+5.2%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-500">Live data</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Real-world examples showing how cards can be used for product listings, social media posts, and dashboard widgets.'
      }
    }
  }
}

// Interactive Example
export const Interactive: Story = {
  args: {
    variant: 'elevated',
    padding: 'md',
    interactive: false,
    disabled: false,
    children: (
      <>
        <CardHeader title="Interactive Card" subtitle="Customize the props to see changes" />
        <CardContent>
          <p>Use the controls below to experiment with different card configurations and see how they affect the appearance and behavior.</p>
        </CardContent>
        <CardFooter>
          <Button variant="outlined" size="sm">Secondary</Button>
          <Button size="sm">Primary</Button>
        </CardFooter>
      </>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive example where you can test different props and see how they affect the card appearance and behavior.'
      }
    }
  }
}
