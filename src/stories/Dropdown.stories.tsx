import {
  DotsVerticalIcon,
  ExitIcon,
  FileIcon,
  GearIcon,
  HomeIcon,
  PersonIcon,
  PlusIcon,
  StarIcon,
  TrashIcon
} from '@radix-ui/react-icons'
import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Button } from '../components/button'
import { DropdownItem, DropdownLabel, DropdownMenu, DropdownSeparator, Select } from '../components/dropdown'

const meta: Meta<typeof DropdownMenu> = {
  title: 'Components/Dropdown',
  component: DropdownMenu,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A dropdown menu system with DropdownMenu for contextual menus and Select for form inputs. Built with centralized CSS component classes for consistent styling.'
      }
    }
  },
  argTypes: {
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
      description: 'How to align the dropdown relative to the trigger'
    },
    side: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Which side of the trigger to show the dropdown'
    },
    sideOffset: {
      control: 'number',
      description: 'Distance from the trigger element'
    }
  }
}

export default meta
type Story = StoryObj<typeof DropdownMenu>

// Basic Dropdown Menu
export const BasicDropdownMenu: Story = {
  args: {
    align: 'start',
    side: 'bottom',
    sideOffset: 4
  },
  render: () => (
    <div className="flex flex-col gap-8 p-8">
      <h3 className="text-lg font-semibold">Basic Dropdown Menu</h3>

      <div className="flex gap-4">
        <DropdownMenu
          trigger={
            <Button variant="outlined">
              <DotsVerticalIcon className="w-4 h-4" />
              Options
            </Button>
          }
        >
          <DropdownItem icon={<PersonIcon className="w-4 h-4" />}>
            Profile
          </DropdownItem>
          <DropdownItem icon={<GearIcon className="w-4 h-4" />}>
            Settings
          </DropdownItem>
          <DropdownSeparator />
          <DropdownItem icon={<ExitIcon className="w-4 h-4" />}>
            Logout
          </DropdownItem>
        </DropdownMenu>

        <DropdownMenu
          trigger={
            <Button variant="primary">
              <PlusIcon className="w-4 h-4" />
              Create
            </Button>
          }
        >
          <DropdownLabel>Create new</DropdownLabel>
          <DropdownItem icon={<FileIcon className="w-4 h-4" />}>
            Document
          </DropdownItem>
          <DropdownItem icon={<HomeIcon className="w-4 h-4" />}>
            Project
          </DropdownItem>
          <DropdownSeparator />
          <DropdownItem icon={<StarIcon className="w-4 h-4" />}>
            Template
          </DropdownItem>
        </DropdownMenu>
      </div>
    </div>
  )
}

// Dropdown with Shortcuts and Destructive Actions
export const DropdownWithShortcuts: Story = {
  args: {
    align: 'start',
    side: 'bottom',
    sideOffset: 4
  },
  render: () => (
    <div className="flex flex-col gap-8 p-8">
      <h3 className="text-lg font-semibold">Dropdown with Shortcuts</h3>

      <DropdownMenu
        trigger={
          <Button variant="outlined">
            File Menu
          </Button>
        }
      >
        <DropdownItem icon={<PlusIcon className="w-4 h-4" />} shortcut="⌘N">
          New File
        </DropdownItem>
        <DropdownItem icon={<FileIcon className="w-4 h-4" />} shortcut="⌘O">
          Open File
        </DropdownItem>
        <DropdownSeparator />
        <DropdownItem shortcut="⌘S">
          Save
        </DropdownItem>
        <DropdownItem shortcut="⌘⇧S">
          Save As...
        </DropdownItem>
        <DropdownSeparator />
        <DropdownItem
          icon={<TrashIcon className="w-4 h-4" />}
          shortcut="⌘⌫"
          destructive
        >
          Delete File
        </DropdownItem>
      </DropdownMenu>
    </div>
  )
}

// Dropdown Positioning
export const DropdownPositioning: Story = {
  args: {
    align: 'start',
    side: 'bottom',
    sideOffset: 4
  },
  render: () => (
    <div className="flex flex-col gap-12 p-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Dropdown Sides</h3>
        <div className="flex gap-4">
          <DropdownMenu
            trigger={<Button variant="outlined">Top</Button>}
            side="top"
          >
            <DropdownItem>Item 1</DropdownItem>
            <DropdownItem>Item 2</DropdownItem>
            <DropdownItem>Item 3</DropdownItem>
          </DropdownMenu>

          <DropdownMenu
            trigger={<Button variant="outlined">Bottom</Button>}
            side="bottom"
          >
            <DropdownItem>Item 1</DropdownItem>
            <DropdownItem>Item 2</DropdownItem>
            <DropdownItem>Item 3</DropdownItem>
          </DropdownMenu>

          <DropdownMenu
            trigger={<Button variant="outlined">Left</Button>}
            side="left"
          >
            <DropdownItem>Item 1</DropdownItem>
            <DropdownItem>Item 2</DropdownItem>
            <DropdownItem>Item 3</DropdownItem>
          </DropdownMenu>

          <DropdownMenu
            trigger={<Button variant="outlined">Right</Button>}
            side="right"
          >
            <DropdownItem>Item 1</DropdownItem>
            <DropdownItem>Item 2</DropdownItem>
            <DropdownItem>Item 3</DropdownItem>
          </DropdownMenu>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Dropdown Alignment</h3>
        <div className="flex gap-4">
          <DropdownMenu
            trigger={<Button variant="outlined">Start</Button>}
            align="start"
          >
            <DropdownItem>Aligned to start</DropdownItem>
            <DropdownItem>Second item</DropdownItem>
            <DropdownItem>Third item</DropdownItem>
          </DropdownMenu>

          <DropdownMenu
            trigger={<Button variant="outlined">Center</Button>}
            align="center"
          >
            <DropdownItem>Centered alignment</DropdownItem>
            <DropdownItem>Second item</DropdownItem>
            <DropdownItem>Third item</DropdownItem>
          </DropdownMenu>

          <DropdownMenu
            trigger={<Button variant="outlined">End</Button>}
            align="end"
          >
            <DropdownItem>Aligned to end</DropdownItem>
            <DropdownItem>Second item</DropdownItem>
            <DropdownItem>Third item</DropdownItem>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}

// Select Component Examples
export const SelectExamples: Story = {
  args: {
    align: 'start',
    side: 'bottom',
    sideOffset: 4
  },
  render: () => {
    const basicOptions = [
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana' },
      { value: 'orange', label: 'Orange' },
      { value: 'grape', label: 'Grape' },
      { value: 'strawberry', label: 'Strawberry' }
    ]

    const iconOptions = [
      { value: 'home', label: 'Home', icon: <HomeIcon className="w-4 h-4" /> },
      { value: 'profile', label: 'Profile', icon: <PersonIcon className="w-4 h-4" /> },
      { value: 'settings', label: 'Settings', icon: <GearIcon className="w-4 h-4" /> },
      { value: 'files', label: 'Files', icon: <FileIcon className="w-4 h-4" /> }
    ]

    return (
      <div className="flex flex-col gap-8 p-8 max-w-md">
        <h3 className="text-lg font-semibold">Select Examples</h3>

        <div className="space-y-6">
          <Select
            label="Basic Select"
            options={basicOptions}
            placeholder="Choose a fruit..."
            description="Select your favorite fruit"
          />

          <Select
            label="Select with Icons"
            options={iconOptions}
            placeholder="Choose a page..."
          />

          <Select
            label="Searchable Select"
            options={basicOptions}
            placeholder="Search fruits..."
            searchable
            description="Type to search for options"
          />

          <Select
            label="Clearable Select"
            options={basicOptions}
            placeholder="Choose a fruit..."
            clearable
            description="You can clear the selection"
          />

          <Select
            label="Multiple Select"
            options={basicOptions}
            placeholder="Choose fruits..."
            multiple
            clearable
            description="Select multiple options - they appear as removable chips"
          />

          <Select
            label="Disabled Select"
            options={basicOptions}
            placeholder="Disabled..."
            disabled
            description="This select is disabled"
          />

          <Select
            label="Error State"
            options={basicOptions}
            placeholder="Choose a fruit..."
            error
            description="Please select a valid option"
          />
        </div>
      </div>
    )
  }
}

// Advanced Select Features
export const AdvancedSelectFeatures: Story = {
  args: {
    align: 'start',
    side: 'bottom',
    sideOffset: 4
  },
  render: () => {
    const [selectedValue, setSelectedValue] = React.useState<string>('')
    const [multipleValues, setMultipleValues] = React.useState<string[]>([])

    const countries = [
      { value: 'us', label: 'United States' },
      { value: 'ca', label: 'Canada' },
      { value: 'uk', label: 'United Kingdom' },
      { value: 'de', label: 'Germany' },
      { value: 'fr', label: 'France' },
      { value: 'jp', label: 'Japan' },
      { value: 'au', label: 'Australia' },
      { value: 'br', label: 'Brazil' },
      { value: 'in', label: 'India' },
      { value: 'cn', label: 'China' }
    ]

    return (
      <div className="flex flex-col gap-8 p-8 max-w-md">
        <h3 className="text-lg font-semibold">Advanced Select Features</h3>

        <div className="space-y-6">
          <Select
            label="Controlled Select"
            options={countries}
            value={selectedValue}
            onValueChange={(value) => {
              if (typeof value === 'string') {
                setSelectedValue(value)
              }
            }}
            placeholder="Choose a country..."
            searchable
            clearable
            description={`Selected: ${selectedValue || 'None'}`}
          />

          <Select
            label="Multiple Selection"
            options={countries}
            value={multipleValues}
            onValueChange={(value) => {
              if (Array.isArray(value)) {
                setMultipleValues(value)
              }
            }}
            placeholder="Choose countries..."
            multiple
            searchable
            clearable
            description="Selected countries appear as removable chips below"
          />

          <Select
            label="Full Width Select"
            options={countries}
            placeholder="Choose a country..."
            fullWidth
            searchable
            description="This select takes full width"
          />
        </div>
      </div>
    )
  }
}

// Real-world Examples
export const RealWorldExamples: Story = {
  args: {
    align: 'start',
    side: 'bottom',
    sideOffset: 4
  },
  render: () => (
    <div className="flex flex-col gap-8 p-8">
      <h3 className="text-lg font-semibold">Real-world Examples</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* User Profile Menu */}
        <div className="space-y-4">
          <h4 className="font-medium">User Profile Menu</h4>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
              JD
            </div>
            <span className="font-medium">John Doe</span>
            <DropdownMenu
              trigger={
                <Button variant="outlined" size="sm">
                  <DotsVerticalIcon className="w-4 h-4" />
                </Button>
              }
            >
              <DropdownLabel>Account</DropdownLabel>
              <DropdownItem icon={<PersonIcon className="w-4 h-4" />}>
                View Profile
              </DropdownItem>
              <DropdownItem icon={<GearIcon className="w-4 h-4" />}>
                Account Settings
              </DropdownItem>
              <DropdownSeparator />
              <DropdownItem icon={<ExitIcon className="w-4 h-4" />}>
                Sign Out
              </DropdownItem>
            </DropdownMenu>
          </div>
        </div>

        {/* Form with Selects */}
        <div className="space-y-4">
          <h4 className="font-medium">User Registration Form</h4>
          <div className="space-y-4">
            <Select
              label="Country"
              options={[
                { value: 'us', label: 'United States' },
                { value: 'ca', label: 'Canada' },
                { value: 'uk', label: 'United Kingdom' }
              ]}
              placeholder="Select your country..."
              searchable
            />

            <Select
              label="Preferred Language"
              options={[
                { value: 'en', label: 'English' },
                { value: 'es', label: 'Spanish' },
                { value: 'fr', label: 'French' },
                { value: 'de', label: 'German' }
              ]}
              placeholder="Choose language..."
            />

            <Select
              label="Interests"
              options={[
                { value: 'tech', label: 'Technology' },
                { value: 'sports', label: 'Sports' },
                { value: 'music', label: 'Music' },
                { value: 'travel', label: 'Travel' },
                { value: 'food', label: 'Food' }
              ]}
              placeholder="Select your interests..."
              multiple
              description="You can select multiple interests"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
