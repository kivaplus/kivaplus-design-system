import {
  ArchiveIcon,
  BookmarkIcon,
  CheckIcon,
  CodeIcon,
  CrossCircledIcon,
  ExclamationTriangleIcon,
  GearIcon,
  HeartIcon,
  LightningBoltIcon,
  MagicWandIcon,
  MixerHorizontalIcon,
  PersonIcon,
  RocketIcon,
  StarIcon
} from '@radix-ui/react-icons'
import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Chip, ChipGroup } from '../components/chip'

const meta = {
  title: 'Components/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Chip components provide rectangular labels for tags, categories, filters, and removable items.

## Chip Component
- **9 Variants**: default, primary, accent, success, warning, error, info, outlined, neutral
- **3 Sizes**: sm, md, lg with consistent rectangular scaling
- **Removable**: Optional close button with callback for user-managed collections
- **Icons**: Support for left and right icon positioning
- **Rectangular Design**: Always pill-shaped with rounded corners
- **Text Focus**: Optimized for labels, tags, and categories

## ChipGroup Component
- **Batch Management**: Display multiple chips with consistent spacing
- **Max Visible**: Limit visible chips with "+X more" indicator
- **Spacing Options**: tight, normal, loose spacing variants
- **Bulk Actions**: Centralized remove handling

## Usage
Use chips for:
- **Tags and labels** (React, TypeScript, Frontend)
- **Categories and filters** (Active, Pending, Completed)
- **Removable items** (selected filters, user tags)
- **Status labels** (with icons for enhanced meaning)

For notification counts and status dots, use the **Badge** component instead.
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'accent', 'success', 'warning', 'error', 'info', 'outlined', 'neutral'],
      description: 'Visual style variant'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Chip size'
    },
    removable: {
      control: 'boolean',
      description: 'Show remove button'
    }
  },
} satisfies Meta<typeof Chip>

export default meta
type Story = StoryObj<typeof meta>

// Default story
export const Default: Story = {
  args: {
    children: 'React',
    variant: 'primary',
    size: 'md'
  }
}

// All Variants
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <Chip variant="default">Default</Chip>
      <Chip variant="primary">Primary</Chip>
      <Chip variant="accent">Accent</Chip>
      <Chip variant="success">Success</Chip>
      <Chip variant="warning">Warning</Chip>
      <Chip variant="error">Error</Chip>
      <Chip variant="info">Info</Chip>
      <Chip variant="outlined">Outlined</Chip>
      <Chip variant="neutral">Neutral</Chip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available chip variants. Use **primary** for main tags, **outlined** for subtle labels, **neutral** for soft emphasis, **success/warning/error** for status, **info** for informational content, and **default** for standard labels.'
      }
    }
  }
}

// All Sizes
export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Chip size="sm">Small</Chip>
        <Chip size="md">Medium</Chip>
        <Chip size="lg">Large</Chip>
      </div>

      <div className="flex items-center gap-3">
        <Chip size="sm" variant="primary">React</Chip>
        <Chip size="md" variant="primary">TypeScript</Chip>
        <Chip size="lg" variant="primary">JavaScript</Chip>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Chip sizes from small to large. Use **sm** for compact tags, **md** for general use, and **lg** for prominent labels.'
      }
    }
  }
}

// With Icons
export const WithIcons: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Left Icons:</h4>
        <div className="flex flex-wrap gap-3">
          <Chip variant="primary" leftIcon={<CodeIcon />}>
            Frontend
          </Chip>
          <Chip variant="success" leftIcon={<CheckIcon />}>
            Completed
          </Chip>
          <Chip variant="warning" leftIcon={<ExclamationTriangleIcon />}>
            Pending
          </Chip>
          <Chip variant="error" leftIcon={<CrossCircledIcon />}>
            Failed
          </Chip>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Right Icons:</h4>
        <div className="flex flex-wrap gap-3">
          <Chip variant="accent" rightIcon={<StarIcon />}>
            Featured
          </Chip>
          <Chip variant="info" rightIcon={<HeartIcon />}>
            Favorite
          </Chip>
          <Chip variant="outlined" rightIcon={<PersonIcon />}>
            Author
          </Chip>
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Both Icons:</h4>
        <div className="flex flex-wrap gap-3">
          <Chip variant="primary" leftIcon={<RocketIcon />} rightIcon={<LightningBoltIcon />}>
            Fast Deploy
          </Chip>
          <Chip variant="success" leftIcon={<MagicWandIcon />} rightIcon={<StarIcon />}>
            Premium
          </Chip>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Chips with icons for enhanced visual meaning. Icons can be positioned on the left, right, or both sides of the text.'
      }
    }
  }
}

// Removable Chips
export const RemovableChips: Story = {
  render: () => {
    const [tags, setTags] = useState([
      { id: '1', label: 'React', variant: 'primary' as const },
      { id: '2', label: 'TypeScript', variant: 'info' as const },
      { id: '3', label: 'Tailwind CSS', variant: 'success' as const },
      { id: '4', label: 'Storybook', variant: 'accent' as const },
      { id: '5', label: 'Node.js', variant: 'warning' as const }
    ])

    const removeTag = (id: string) => {
      setTags(tags.filter(tag => tag.id !== id))
    }

    const resetTags = () => {
      setTags([
        { id: '1', label: 'React', variant: 'primary' as const },
        { id: '2', label: 'TypeScript', variant: 'info' as const },
        { id: '3', label: 'Tailwind CSS', variant: 'success' as const },
        { id: '4', label: 'Storybook', variant: 'accent' as const },
        { id: '5', label: 'Node.js', variant: 'warning' as const }
      ])
    }

    return (
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Tech Stack Tags (Removable):</h4>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Chip
                key={tag.id}
                variant={tag.variant}
                removable
                onRemove={() => removeTag(tag.id)}
              >
                {tag.label}
              </Chip>
            ))}
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={resetTags}
            className="text-sm text-blue-600 hover:text-blue-800 underline"
          >
            Reset Tags
          </button>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Removable chips with close buttons. Perfect for user-managed collections like tags, filters, and selected items.'
      }
    }
  }
}

// Chip Groups
export const ChipGroups: Story = {
  render: () => {
    const [skills, setSkills] = useState([
      { id: '1', label: 'JavaScript', variant: 'primary' as const, removable: true },
      { id: '2', label: 'React', variant: 'info' as const, removable: true },
      { id: '3', label: 'Node.js', variant: 'success' as const, removable: true },
      { id: '4', label: 'TypeScript', variant: 'accent' as const, removable: true },
      { id: '5', label: 'GraphQL', variant: 'warning' as const, removable: true },
      { id: '6', label: 'Docker', variant: 'default' as const, removable: true },
      { id: '7', label: 'AWS', variant: 'outlined' as const, removable: true }
    ])

    const removeSkill = (id: string) => {
      setSkills(skills.filter(skill => skill.id !== id))
    }

    const categories = [
      { id: '1', label: 'Frontend', variant: 'primary' as const, leftIcon: <CodeIcon /> },
      { id: '2', label: 'Backend', variant: 'success' as const, leftIcon: <GearIcon /> },
      { id: '3', label: 'DevOps', variant: 'warning' as const, leftIcon: <RocketIcon /> },
      { id: '4', label: 'Database', variant: 'info' as const, leftIcon: <ArchiveIcon /> }
    ]

    return (
      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Skills (Removable):</h4>
          <ChipGroup
            chips={skills}
            onRemove={removeSkill}
            spacing="normal"
          />
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Skills (Max 4 Visible):</h4>
          <ChipGroup
            chips={skills}
            onRemove={removeSkill}
            maxVisible={4}
            spacing="normal"
          />
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Categories (With Icons, Tight Spacing):</h4>
          <ChipGroup
            chips={categories}
            spacing="tight"
          />
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Categories (Loose Spacing):</h4>
          <ChipGroup
            chips={categories}
            spacing="loose"
          />
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'ChipGroup examples showing different spacing options, max visible limits, icons, and bulk management capabilities.'
      }
    }
  }
}

// Real-world Examples
export const RealWorldExamples: Story = {
  render: () => (
    <div className="space-y-8">
      {/* Filter Interface */}
      <div>
        <h4 className="text-lg font-semibold mb-4">Filter Interface</h4>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="space-y-4">
            <div>
              <span className="text-sm font-medium text-gray-700">Active Filters:</span>
              <div className="flex flex-wrap gap-2 mt-2">
                <Chip variant="primary" removable leftIcon={<MixerHorizontalIcon />}>
                  Category: Frontend
                </Chip>
                <Chip variant="success" removable leftIcon={<CheckIcon />}>
                  Status: Active
                </Chip>
                <Chip variant="info" removable leftIcon={<PersonIcon />}>
                  Author: John Doe
                </Chip>
              </div>
            </div>

            <div>
              <span className="text-sm font-medium text-gray-700">Available Tags:</span>
              <div className="flex flex-wrap gap-2 mt-2">
                <Chip variant="outlined" size="sm">React</Chip>
                <Chip variant="outlined" size="sm">TypeScript</Chip>
                <Chip variant="outlined" size="sm">Vue.js</Chip>
                <Chip variant="outlined" size="sm">Angular</Chip>
                <Chip variant="outlined" size="sm">Svelte</Chip>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Tags */}
      <div>
        <h4 className="text-lg font-semibold mb-4">Project Management</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h5 className="font-medium">Website Redesign</h5>
              <Chip variant="success" size="sm" leftIcon={<CheckIcon />}>
                Active
              </Chip>
            </div>
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-gray-700">Technologies:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  <Chip variant="primary" size="sm">React</Chip>
                  <Chip variant="info" size="sm">TypeScript</Chip>
                  <Chip variant="accent" size="sm">Tailwind</Chip>
                </div>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700">Team:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  <Chip variant="outlined" size="sm" leftIcon={<PersonIcon />}>
                    Frontend
                  </Chip>
                  <Chip variant="outlined" size="sm" leftIcon={<PersonIcon />}>
                    Design
                  </Chip>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h5 className="font-medium">API Integration</h5>
              <Chip variant="warning" size="sm" leftIcon={<ExclamationTriangleIcon />}>
                Pending
              </Chip>
            </div>
            <div className="space-y-3">
              <div>
                <span className="text-sm font-medium text-gray-700">Technologies:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  <Chip variant="success" size="sm">Node.js</Chip>
                  <Chip variant="warning" size="sm">GraphQL</Chip>
                  <Chip variant="error" size="sm">MongoDB</Chip>
                </div>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-700">Priority:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  <Chip variant="error" size="sm" leftIcon={<ExclamationTriangleIcon />}>
                    High Priority
                  </Chip>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* User Profile Tags */}
      <div>
        <h4 className="text-lg font-semibold mb-4">User Profile</h4>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h5 className="font-medium">Sarah Johnson</h5>
              <p className="text-sm text-gray-600">Full Stack Developer</p>
            </div>
            <Chip variant="success" size="sm" leftIcon={<CheckIcon />}>
              Verified
            </Chip>
          </div>

          <div className="space-y-3">
            <div>
              <span className="text-sm font-medium text-gray-700">Skills:</span>
              <div className="flex flex-wrap gap-2 mt-1">
                <Chip variant="primary" size="sm" leftIcon={<CodeIcon />}>React</Chip>
                <Chip variant="info" size="sm" leftIcon={<CodeIcon />}>TypeScript</Chip>
                <Chip variant="success" size="sm" leftIcon={<CodeIcon />}>Node.js</Chip>
                <Chip variant="accent" size="sm" leftIcon={<CodeIcon />}>GraphQL</Chip>
              </div>
            </div>

            <div>
              <span className="text-sm font-medium text-gray-700">Interests:</span>
              <div className="flex flex-wrap gap-2 mt-1">
                <Chip variant="outlined" size="sm" leftIcon={<HeartIcon />}>
                  Open Source
                </Chip>
                <Chip variant="outlined" size="sm" leftIcon={<StarIcon />}>
                  Web Performance
                </Chip>
                <Chip variant="outlined" size="sm" leftIcon={<BookmarkIcon />}>
                  UI/UX Design
                </Chip>
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
        story: 'Real-world examples showing chips in filter interfaces, project management, and user profiles for tags, categories, and labels.'
      }
    }
  }
}

// Interactive Example
export const Interactive: Story = {
  args: {
    children: 'Interactive Chip',
    variant: 'primary',
    size: 'md',
    removable: false
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive chip where you can test different props using the controls panel below. Perfect for testing tags, labels, and categories.'
      }
    }
  }
}
