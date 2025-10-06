import {
  ArrowRightIcon,
  CheckIcon,
  DownloadIcon,
  HeartIcon,
  Pencil1Icon,
  PlusIcon,
  Share1Icon,
  TrashIcon
} from '@radix-ui/react-icons'
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../components/button'

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The Button component is a versatile and customizable button that supports multiple variants, sizes, and states.

## Features
- **6 Variants**: primary, secondary, accent, neutral, outlined, danger
- **3 Sizes**: sm, md, lg
- **Loading State**: Built-in spinner and disabled state
- **Icons**: Support for left and right icons
- **Full Width**: Option to make button full width
- **Accessibility**: Proper focus states and ARIA attributes

## Variant Guide
- **primary**: Brand-colored gradient for main call-to-action buttons
- **secondary**: Transparent with brand border for secondary actions
- **accent**: Accent-colored for promotional or special actions
- **neutral**: Subtle gray background for settings and neutral actions
- **outlined**: Transparent with gray border for secondary actions
- **danger**: Red background for destructive actions (delete, remove, etc.)

## Usage
Use buttons to trigger actions, navigate, or submit forms. Choose the appropriate variant based on the action's importance and context.
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'accent', 'neutral', 'outlined', 'danger'],
      description: 'Visual style variant of the button'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the button'
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the button should take full width of its container'
    },
    loading: {
      control: 'boolean',
      description: 'Shows loading spinner and disables the button'
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button'
    },
    children: {
      control: 'text',
      description: 'Button content/text'
    }
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// Default story
export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md'
  }
}

// All Variants
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="accent">Accent</Button>
      <Button variant="neutral">Neutral</Button>
      <Button variant="outlined">Outlined</Button>
      <Button variant="danger">Danger</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available button variants. Use **primary** for main actions, **secondary** for secondary actions, **accent** for promotional actions, **neutral** for subtle actions, **outlined** for neutral actions with borders, and **danger** for destructive actions.'
      }
    }
  }
}

// All Sizes
export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Available button sizes. Use **sm** for compact spaces, **md** for general use, and **lg** for prominent actions.'
      }
    }
  }
}

// Neutral Variant Examples
export const NeutralVariant: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Settings Actions:</h4>
        <div className="flex gap-3">
          <Button variant="neutral" size="sm" leftIcon={<Pencil1Icon className="w-4 h-4" />}>
            Edit Settings
          </Button>
          <Button variant="neutral" size="sm" leftIcon={<DownloadIcon className="w-4 h-4" />}>
            Export Data
          </Button>
          <Button variant="neutral" size="sm" leftIcon={<Share1Icon className="w-4 h-4" />}>
            Share
          </Button>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Form Actions:</h4>
        <div className="flex gap-3">
          <Button variant="outlined">Cancel</Button>
          <Button variant="neutral">Save Draft</Button>
          <Button variant="primary">Publish</Button>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Comparison:</h4>
        <div className="flex gap-3">
          <Button variant="neutral">Neutral</Button>
          <Button variant="outlined">Outlined</Button>
          <Button variant="secondary">Secondary</Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'The neutral variant provides a subtle, muted appearance perfect for settings, secondary actions, and situations where you need a button that is present but not prominent. Compare with outlined (transparent with border) and secondary (transparent with brand border).'
      }
    }
  }
}

// With Icons
export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      <Button leftIcon={<PlusIcon className="w-4 h-4" />}>
        Add Item
      </Button>
      <Button rightIcon={<ArrowRightIcon className="w-4 h-4" />}>
        Continue
      </Button>
      <Button
        leftIcon={<HeartIcon className="w-4 h-4" />}
        rightIcon={<ArrowRightIcon className="w-4 h-4" />}
      >
        Like & Share
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Buttons can include icons on the left, right, or both sides to provide visual context and improve usability.'
      }
    }
  }
}

// Loading States
export const LoadingStates: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      <Button loading>Loading...</Button>
      <Button variant="secondary" loading>Processing</Button>
      <Button variant="accent" loading>Saving</Button>
      <Button variant="outlined" loading>Uploading</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Loading state shows a spinner and disables the button to prevent multiple submissions.'
      }
    }
  }
}

// Disabled States
export const DisabledStates: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      <Button disabled>Disabled Primary</Button>
      <Button variant="secondary" disabled>Disabled Secondary</Button>
      <Button variant="accent" disabled>Disabled Accent</Button>
      <Button variant="outlined" disabled>Disabled Outlined</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Disabled buttons are visually muted and non-interactive.'
      }
    }
  }
}

// Full Width
export const FullWidth: Story = {
  render: () => (
    <div className="w-full max-w-md space-y-3">
      <Button fullWidth>Full Width Primary</Button>
      <Button variant="secondary" fullWidth>Full Width Secondary</Button>
      <Button variant="outlined" fullWidth>Full Width Outlined</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Full width buttons stretch to fill their container width. Useful for forms and mobile layouts.'
      }
    }
  }
}

// Common Use Cases
export const CommonUseCases: Story = {
  render: () => (
    <div className="space-y-6">
      {/* Form Actions */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Form Actions</h3>
        <div className="flex gap-3">
          <Button leftIcon={<CheckIcon className="w-4 h-4" />}>
            Save Changes
          </Button>
          <Button variant="outlined">Cancel</Button>
          <Button variant="danger" leftIcon={<TrashIcon className="w-4 h-4" />}>
            Delete
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Navigation</h3>
        <div className="flex gap-3">
          <Button variant="secondary">Back</Button>
          <Button rightIcon={<ArrowRightIcon className="w-4 h-4" />}>
            Next Step
          </Button>
        </div>
      </div>

      {/* Actions */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Content Actions</h3>
        <div className="flex gap-3">
          <Button variant="neutral" leftIcon={<Pencil1Icon className="w-4 h-4" />}>
            Edit
          </Button>
          <Button variant="neutral" leftIcon={<Share1Icon className="w-4 h-4" />}>
            Share
          </Button>
          <Button variant="neutral" leftIcon={<DownloadIcon className="w-4 h-4" />}>
            Download
          </Button>
        </div>
      </div>

      {/* Call to Action */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Call to Action</h3>
        <div className="flex gap-3">
          <Button variant="accent" size="lg">
            Get Started Free
          </Button>
          <Button variant="outlined" size="lg">
            Learn More
          </Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Common button usage patterns in different contexts like forms, navigation, content actions, and call-to-action sections.'
      }
    }
  }
}

// Interactive Example
export const Interactive: Story = {
  args: {
    children: 'Click me!',
    variant: 'primary',
    size: 'md',
    fullWidth: false,
    loading: false,
    disabled: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive example where you can test different props and see how they affect the button appearance and behavior.'
      }
    }
  }
}

// Button Groups
export const ButtonGroups: Story = {
  render: () => (
    <div className="space-y-6">
      {/* Horizontal Group */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Horizontal Group</h3>
        <div className="flex rounded-lg overflow-hidden border border-gray-300">
          <Button variant="neutral" className="rounded-none border-r border-gray-300">
            Option 1
          </Button>
          <Button variant="neutral" className="rounded-none border-r border-gray-300">
            Option 2
          </Button>
          <Button variant="neutral" className="rounded-none">
            Option 3
          </Button>
        </div>
      </div>

      {/* Toolbar */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Toolbar</h3>
        <div className="flex gap-1 p-2 bg-gray-100 rounded-lg">
          <Button variant="neutral" size="sm">Bold</Button>
          <Button variant="neutral" size="sm">Italic</Button>
          <Button variant="neutral" size="sm">Underline</Button>
          <div className="w-px bg-gray-300 mx-1"></div>
          <Button variant="neutral" size="sm">Left</Button>
          <Button variant="neutral" size="sm">Center</Button>
          <Button variant="neutral" size="sm">Right</Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Examples of button groups and toolbars using multiple buttons together.'
      }
    }
  }
}
