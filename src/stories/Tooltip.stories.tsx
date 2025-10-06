import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../components/button'
import { Popover, PopoverContent, Tooltip } from '../components/tooltip'

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A tooltip component that displays helpful information on hover or focus. Built with centralized CSS component classes for consistent styling.'
      }
    }
  },
  argTypes: {
    content: {
      control: 'text',
      description: 'The content to display in the tooltip'
    },
    side: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
      description: 'Which side of the trigger to show the tooltip'
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
      description: 'How to align the tooltip relative to the trigger'
    },
    delay: {
      control: 'number',
      description: 'Delay in milliseconds before showing the tooltip'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the tooltip is disabled'
    },
    arrow: {
      control: 'boolean',
      description: 'Whether to show an arrow pointing to the trigger'
    }
  }
}

export default meta
type Story = StoryObj<typeof Tooltip>

// Basic Examples
export const BasicExamples: Story = {
  args: {
    content: 'This is a helpful tooltip',
    side: 'top',
    align: 'center',
    delay: 700,
    disabled: false,
    arrow: true
  },
  render: () => (
    <div className="flex flex-wrap gap-8 p-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Basic Tooltips</h3>
        <div className="flex gap-4">
          <Tooltip content="Tooltip on top" side="top">
            <Button>Top</Button>
          </Tooltip>
          <Tooltip content="Tooltip on right" side="right">
            <Button>Right</Button>
          </Tooltip>
          <Tooltip content="Tooltip on bottom" side="bottom">
            <Button>Bottom</Button>
          </Tooltip>
          <Tooltip content="Tooltip on left" side="left">
            <Button>Left</Button>
          </Tooltip>
        </div>
      </div>
    </div>
  )
}

// Alignment Options
export const AlignmentOptions: Story = {
  args: {
    content: 'Aligned tooltip',
    side: 'bottom',
    align: 'center',
    delay: 700,
    disabled: false,
    arrow: true
  },
  render: () => (
    <div className="flex flex-col gap-12 p-8">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Horizontal Alignment (Top/Bottom)</h3>
          <p className="text-sm text-gray-600 mb-4">
            The tooltip content aligns to the start, center, or end of the trigger element.
            The arrow points to the appropriate position on the trigger.
          </p>
        </div>
        <div className="flex gap-8 justify-center">
          <Tooltip content="Tooltip aligns to the left edge of button" side="bottom" align="start">
            <Button>Start</Button>
          </Tooltip>
          <Tooltip content="Tooltip centers on button" side="bottom" align="center">
            <Button>Center</Button>
          </Tooltip>
          <Tooltip content="Tooltip aligns to the right edge of button" side="bottom" align="end">
            <Button>End</Button>
          </Tooltip>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Vertical Alignment (Left/Right)</h3>
          <p className="text-sm text-gray-600 mb-4">
            The tooltip content aligns to the top, center, or bottom of the trigger element.
            The arrow points to the appropriate position on the trigger.
          </p>
        </div>
        <div className="flex flex-col gap-6 items-start ml-8">
          <Tooltip content="Tooltip aligns to top edge" side="right" align="start">
            <Button>Start</Button>
          </Tooltip>
          <Tooltip content="Tooltip centers vertically" side="right" align="center">
            <Button>Center</Button>
          </Tooltip>
          <Tooltip content="Tooltip aligns to bottom edge" side="right" align="end">
            <Button>End</Button>
          </Tooltip>
        </div>
      </div>
    </div>
  )
}

// Arrow Options
export const ArrowOptions: Story = {
  args: {
    content: 'Tooltip with arrow',
    side: 'top',
    align: 'center',
    delay: 700,
    disabled: false,
    arrow: true
  },
  render: () => (
    <div className="flex gap-8 p-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Arrow Options</h3>
        <div className="flex gap-4">
          <Tooltip content="With arrow" side="top" arrow={true}>
            <Button>With Arrow</Button>
          </Tooltip>
          <Tooltip content="Without arrow" side="top" arrow={false}>
            <Button>No Arrow</Button>
          </Tooltip>
        </div>
      </div>
    </div>
  )
}

// Delay Options
export const DelayOptions: Story = {
  args: {
    content: 'Delayed tooltip',
    side: 'top',
    align: 'center',
    delay: 700,
    disabled: false,
    arrow: true
  },
  render: () => (
    <div className="flex gap-8 p-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Delay Options</h3>
        <div className="flex gap-4">
          <Tooltip content="No delay" side="top" delay={0}>
            <Button>No Delay</Button>
          </Tooltip>
          <Tooltip content="Short delay (300ms)" side="top" delay={300}>
            <Button>Short Delay</Button>
          </Tooltip>
          <Tooltip content="Normal delay (700ms)" side="top" delay={700}>
            <Button>Normal Delay</Button>
          </Tooltip>
          <Tooltip content="Long delay (1500ms)" side="top" delay={1500}>
            <Button>Long Delay</Button>
          </Tooltip>
        </div>
      </div>
    </div>
  )
}

// Disabled State
export const DisabledState: Story = {
  args: {
    content: 'This tooltip is disabled',
    side: 'top',
    align: 'center',
    delay: 700,
    disabled: true,
    arrow: true
  },
  render: () => (
    <div className="flex gap-8 p-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Disabled State</h3>
        <div className="flex gap-4">
          <Tooltip content="This tooltip works" side="top" disabled={false}>
            <Button>Enabled Tooltip</Button>
          </Tooltip>
          <Tooltip content="This tooltip is disabled" side="top" disabled={true}>
            <Button>Disabled Tooltip</Button>
          </Tooltip>
        </div>
      </div>
    </div>
  )
}

// Rich Content
export const RichContent: Story = {
  args: {
    content: 'Rich content tooltip',
    side: 'top',
    align: 'center',
    delay: 700,
    disabled: false,
    arrow: true
  },
  render: () => (
    <div className="flex gap-8 p-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Rich Content</h3>
        <div className="flex gap-4">
          <Tooltip
            content={
              <div className="space-y-1">
                <div className="font-semibold">Rich Tooltip</div>
                <div className="text-xs">With multiple lines</div>
              </div>
            }
            side="top"
          >
            <Button>Rich Content</Button>
          </Tooltip>

          <Tooltip
            content={
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Status: Online</span>
              </div>
            }
            side="top"
          >
            <Button>Status Tooltip</Button>
          </Tooltip>
        </div>
      </div>
    </div>
  )
}

// Popover Examples
export const PopoverExamples: Story = {
  args: {
    content: 'Popover content',
    side: 'bottom',
    align: 'center',
    delay: 700,
    disabled: false,
    arrow: true
  },
  render: () => (
    <div className="flex flex-col gap-8 p-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Popover Triggers</h3>
        <div className="flex gap-4">
          <Popover
            content={<div className="p-4">Click triggered popover</div>}
            trigger="click"
            side="bottom"
          >
            <Button>Click Trigger</Button>
          </Popover>

          <Popover
            content={<div className="p-4">Hover triggered popover</div>}
            trigger="hover"
            side="bottom"
          >
            <Button>Hover Trigger</Button>
          </Popover>

          <Popover
            content={<div className="p-4">Focus triggered popover</div>}
            trigger="focus"
            side="bottom"
          >
            <Button>Focus Trigger</Button>
          </Popover>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Popover with PopoverContent</h3>
        <div className="flex gap-4">
          <Popover
            content={
              <PopoverContent
                title="User Settings"
                description="Manage your account preferences"
                footer={
                  <div className="flex gap-2">
                    <Button size="sm" variant="outlined">Cancel</Button>
                    <Button size="sm">Save</Button>
                  </div>
                }
              >
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
              </PopoverContent>
            }
            trigger="click"
            side="bottom"
          >
            <Button>Settings Popover</Button>
          </Popover>
        </div>
      </div>
    </div>
  )
}

// Interactive Examples
export const InteractiveExamples: Story = {
  args: {
    content: 'Interactive tooltip',
    side: 'top',
    align: 'center',
    delay: 700,
    disabled: false,
    arrow: true
  },
  render: () => (
    <div className="flex flex-col gap-8 p-8">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Interactive Elements</h3>
        <div className="flex flex-wrap gap-4">
          <Tooltip content="Button tooltip" side="top">
            <Button>Button</Button>
          </Tooltip>

          <Tooltip content="Input field help" side="top">
            <input
              type="text"
              placeholder="Hover for help"
              className="px-3 py-2 border border-gray-300 rounded-md"
            />
          </Tooltip>

          <Tooltip content="Clickable link" side="top">
            <a href="#" className="text-blue-600 hover:text-blue-800 underline">
              Link with tooltip
            </a>
          </Tooltip>

          <Tooltip content="Icon button" side="top">
            <button className="p-2 text-gray-600 hover:text-gray-800 rounded-md hover:bg-gray-100">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </button>
          </Tooltip>
        </div>
      </div>
    </div>
  )
}
