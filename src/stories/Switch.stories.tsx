import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Card } from '../components/card'
import { Switch } from '../components/switch'

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A switch component for toggling between two states. Built with centralized CSS component classes for consistent styling.'
      }
    }
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the switch'
    },
    labelPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Position of the label relative to the switch'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the switch is disabled'
    },
    label: {
      control: 'text',
      description: 'Label text for the switch'
    },
    description: {
      control: 'text',
      description: 'Description text below the label'
    }
  }
}

export default meta
type Story = StoryObj<typeof Switch>

// Interactive Switch with Controls
export const Interactive: Story = {
  args: {
    label: 'Interactive Switch',
    description: 'Use the controls to test different props',
    size: 'md',
    labelPosition: 'right',
    disabled: false
  },
  render: (args) => (
    <Card variant="elevated" padding="lg">
      <Switch {...args} />
    </Card>
  )
}

// Basic Switch Examples
export const BasicSwitches: Story = {
  args: {
    label: 'Enable notifications',
    size: 'md',
    labelPosition: 'right',
    disabled: false
  },
  render: () => (
    <div className="flex flex-col gap-8 p-8">
      <h3 className="text-lg font-semibold">Basic Switch Examples</h3>

      <div className="space-y-4">
        <Switch label="Default switch" />
        <Switch label="Checked switch" defaultChecked />
        <Switch label="Disabled switch" disabled />
        <Switch label="Disabled checked switch" disabled defaultChecked />
      </div>
    </div>
  )
}

// Switch Sizes
export const SwitchSizes: Story = {
  args: {
    label: 'Switch label',
    size: 'md',
    labelPosition: 'right',
    disabled: false
  },
  render: () => (
    <div className="flex flex-col gap-8 p-8">
      <h3 className="text-lg font-semibold">Switch Sizes</h3>

      <div className="space-y-6">
        <div className="space-y-2">
          <h4 className="font-medium">Small</h4>
          <div className="flex gap-4">
            <Switch size="sm" label="Small switch" />
            <Switch size="sm" label="Small checked" defaultChecked />
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium">Medium (Default)</h4>
          <div className="flex gap-4">
            <Switch size="md" label="Medium switch" />
            <Switch size="md" label="Medium checked" defaultChecked />
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium">Large</h4>
          <div className="flex gap-4">
            <Switch size="lg" label="Large switch" />
            <Switch size="lg" label="Large checked" defaultChecked />
          </div>
        </div>
      </div>
    </div>
  )
}

// Label Positions
export const LabelPositions: Story = {
  args: {
    label: 'Switch label',
    size: 'md',
    labelPosition: 'right',
    disabled: false
  },
  render: () => (
    <div className="flex flex-col gap-8 p-8">
      <h3 className="text-lg font-semibold">Label Positions</h3>

      <div className="space-y-6">
        <div className="space-y-2">
          <h4 className="font-medium">Label on Right (Default)</h4>
          <Switch
            label="Enable notifications"
            description="Receive push notifications on your device"
            labelPosition="right"
          />
        </div>

        <div className="space-y-2">
          <h4 className="font-medium">Label on Left</h4>
          <Switch
            label="Enable notifications"
            description="Receive push notifications on your device"
            labelPosition="left"
          />
        </div>
      </div>
    </div>
  )
}

// Switch with Descriptions
export const SwitchWithDescriptions: Story = {
  args: {
    label: 'Switch with description',
    description: 'This is a helpful description',
    size: 'md',
    labelPosition: 'right',
    disabled: false
  },
  render: () => (
    <div className="flex flex-col gap-8 p-8 max-w-md">
      <h3 className="text-lg font-semibold">Switches with Descriptions</h3>

      <div className="space-y-6">
        <Switch
          label="Push Notifications"
          description="Receive notifications about important updates and messages"
        />

        <Switch
          label="Email Marketing"
          description="Get promotional emails about new features and offers"
          defaultChecked
        />

        <Switch
          label="Data Analytics"
          description="Allow us to collect anonymous usage data to improve the service"
        />

        <Switch
          label="Two-Factor Authentication"
          description="Add an extra layer of security to your account"
          defaultChecked
        />
      </div>
    </div>
  )
}

// Controlled Switch
export const ControlledSwitch: Story = {
  args: {
    label: 'Controlled switch',
    size: 'md',
    labelPosition: 'right',
    disabled: false
  },
  render: () => {
    const [checked, setChecked] = React.useState(false)
    const [notifications, setNotifications] = React.useState(true)
    const [darkMode, setDarkMode] = React.useState(false)

    return (
      <div className="flex flex-col gap-8 p-8 max-w-md">
        <h3 className="text-lg font-semibold">Controlled Switches</h3>

        <div className="space-y-6">
          <Switch
            label="Simple Toggle"
            description={`Currently ${checked ? 'enabled' : 'disabled'}`}
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
          />

          <Switch
            label="Push Notifications"
            description="Receive important updates"
            checked={notifications}
            onChange={(e) => setNotifications(e.target.checked)}
          />

          <Switch
            label="Dark Mode"
            description="Switch to dark theme"
            checked={darkMode}
            onChange={(e) => setDarkMode(e.target.checked)}
          />

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-2">Current State:</h4>
            <ul className="text-sm space-y-1">
              <li>Simple Toggle: {checked ? '✅ On' : '❌ Off'}</li>
              <li>Notifications: {notifications ? '✅ On' : '❌ Off'}</li>
              <li>Dark Mode: {darkMode ? '✅ On' : '❌ Off'}</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

// Switch States
export const SwitchStates: Story = {
  args: {
    label: 'Switch states',
    size: 'md',
    labelPosition: 'right',
    disabled: false
  },
  render: () => (
    <div className="flex flex-col gap-8 p-8">
      <h3 className="text-lg font-semibold">Switch States</h3>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="font-medium">Enabled States</h4>
          <Switch label="Unchecked" />
          <Switch label="Checked" defaultChecked />
          <Switch label="With description" description="Additional context" />
        </div>

        <div className="space-y-4">
          <h4 className="font-medium">Disabled States</h4>
          <Switch label="Disabled unchecked" disabled />
          <Switch label="Disabled checked" disabled defaultChecked />
          <Switch label="Disabled with description" description="Cannot be changed" disabled />
        </div>
      </div>
    </div>
  )
}

// Real-world Examples
export const RealWorldExamples: Story = {
  args: {
    label: 'Real-world example',
    size: 'md',
    labelPosition: 'right',
    disabled: false
  },
  render: () => {
    const [settings, setSettings] = React.useState({
      notifications: true,
      emailUpdates: false,
      twoFactor: true,
      analytics: false,
      autoSave: true,
      darkMode: false
    })

    const updateSetting = (key: keyof typeof settings) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setSettings(prev => ({ ...prev, [key]: e.target.checked }))
    }

    return (
      <div className="flex flex-col gap-8 p-8 max-w-lg">
        <h3 className="text-lg font-semibold">Settings Panel</h3>

        <div className="space-y-6">
          <div>
            <h4 className="font-medium mb-4">Notifications</h4>
            <div className="space-y-4">
              <Switch
                label="Push Notifications"
                description="Receive notifications about important updates"
                checked={settings.notifications}
                onChange={updateSetting('notifications')}
              />
              <Switch
                label="Email Updates"
                description="Get weekly summaries via email"
                checked={settings.emailUpdates}
                onChange={updateSetting('emailUpdates')}
              />
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-4">Security</h4>
            <div className="space-y-4">
              <Switch
                label="Two-Factor Authentication"
                description="Add extra security to your account"
                checked={settings.twoFactor}
                onChange={updateSetting('twoFactor')}
              />
              <Switch
                label="Usage Analytics"
                description="Help improve our service with anonymous data"
                checked={settings.analytics}
                onChange={updateSetting('analytics')}
              />
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-4">Preferences</h4>
            <div className="space-y-4">
              <Switch
                label="Auto-save"
                description="Automatically save your work"
                checked={settings.autoSave}
                onChange={updateSetting('autoSave')}
              />
              <Switch
                label="Dark Mode"
                description="Use dark theme"
                checked={settings.darkMode}
                onChange={updateSetting('darkMode')}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
