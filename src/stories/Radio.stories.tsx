import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Button } from '../components/button'
import { Card } from '../components/card'
import { SectionHeader } from '../components/header-group'
import { Radio, RadioGroup } from '../components/radio'

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Radio button components for single selection from multiple options. Built with centralized CSS component classes for consistent styling.'
      }
    }
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the radio button'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the radio is disabled'
    },
    error: {
      control: 'boolean',
      description: 'Whether the radio is in error state'
    },
    label: {
      control: 'text',
      description: 'Label text for the radio'
    },
    description: {
      control: 'text',
      description: 'Description text below the label'
    }
  }
}

export default meta
type Story = StoryObj<typeof Radio>

// Interactive Radio with Controls
export const Interactive: Story = {
  args: {
    label: 'Interactive Radio',
    description: 'Use the controls to test different props',
    size: 'md',
    disabled: false,
    error: false,
    value: 'interactive'
  },
  render: (args) => (
    <Card variant="elevated" padding="lg">
      <Radio name="interactive" {...args} />
    </Card>
  )
}

// Test Radio Selection
export const TestRadioSelection: Story = {
  render: () => {
    const [selected, setSelected] = React.useState('')

    return (
      <Card variant="elevated" padding="lg">
        <SectionHeader title="Test Radio Selection" />

        <div className="space-y-4">
          <Radio
            name="test"
            value="option1"
            label="Option 1"
            checked={selected === 'option1'}
            onChange={(e) => e.target.checked && setSelected('option1')}
          />
          <Radio
            name="test"
            value="option2"
            label="Option 2"
            checked={selected === 'option2'}
            onChange={(e) => e.target.checked && setSelected('option2')}
          />
          <Radio
            name="test"
            value="option3"
            label="Option 3"
            checked={selected === 'option3'}
            onChange={(e) => e.target.checked && setSelected('option3')}
          />
        </div>

        <Card variant="filled" padding="sm" className="mt-4">
          <p className="font-medium">Selected: {selected || 'None'}</p>
        </Card>
      </Card>
    )
  }
}

// Basic Radio Examples
export const BasicRadios: Story = {
  args: {
    label: 'Radio option',
    size: 'md',
    disabled: false,
    error: false
  },
  render: () => (
    <Card variant="elevated" padding="lg">
      <SectionHeader title="Basic Radio Examples" />

      <div className="space-y-4">
        <Radio name="basic" value="option1" label="Unchecked radio" />
        <Radio name="basic" value="option2" label="Checked radio" defaultChecked />
        <Radio name="basic" value="option3" label="Disabled radio" disabled />
        <Radio name="basic" value="option4" label="Disabled checked radio" disabled defaultChecked />
      </div>
    </Card>
  )
}

// Radio Sizes
export const RadioSizes: Story = {
  args: {
    label: 'Radio label',
    size: 'md',
    disabled: false,
    error: false
  },
  render: () => (
    <div className="flex flex-col gap-8 p-8">
      <h3 className="text-lg font-semibold">Radio Sizes</h3>

      <div className="space-y-6">
        <div className="space-y-2">
          <h4 className="font-medium">Small</h4>
          <div className="space-y-2">
            <Radio name="small" value="sm1" size="sm" label="Small radio" />
            <Radio name="small" value="sm2" size="sm" label="Small checked" defaultChecked />
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium">Medium (Default)</h4>
          <div className="space-y-2">
            <Radio name="medium" value="md1" size="md" label="Medium radio" />
            <Radio name="medium" value="md2" size="md" label="Medium checked" defaultChecked />
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium">Large</h4>
          <div className="space-y-2">
            <Radio name="large" value="lg1" size="lg" label="Large radio" />
            <Radio name="large" value="lg2" size="lg" label="Large checked" defaultChecked />
          </div>
        </div>
      </div>
    </div>
  )
}

// Radio with Descriptions
export const RadioWithDescriptions: Story = {
  args: {
    label: 'Radio with description',
    description: 'This is a helpful description',
    size: 'md',
    disabled: false,
    error: false
  },
  render: () => (
    <div className="flex flex-col gap-8 p-8 max-w-md">
      <h3 className="text-lg font-semibold">Radios with Descriptions</h3>

      <div className="space-y-4">
        <Radio
          name="plan"
          value="basic"
          label="Basic Plan"
          description="Perfect for individuals and small teams"
        />

        <Radio
          name="plan"
          value="pro"
          label="Pro Plan"
          description="Advanced features for growing businesses"
          defaultChecked
        />

        <Radio
          name="plan"
          value="enterprise"
          label="Enterprise Plan"
          description="Full-featured solution for large organizations"
        />
      </div>
    </div>
  )
}

// Radio States
export const RadioStates: Story = {
  args: {
    label: 'Radio states',
    size: 'md',
    disabled: false,
    error: false
  },
  render: () => (
    <div className="flex flex-col gap-8 p-8">
      <h3 className="text-lg font-semibold">Radio States</h3>

      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-4">
          <h4 className="font-medium">Normal States</h4>
          <Radio name="normal" value="1" label="Unchecked" />
          <Radio name="normal" value="2" label="Checked" defaultChecked />
          <Radio name="normal" value="3" label="With description" description="Additional context" />
        </div>

        <div className="space-y-4">
          <h4 className="font-medium">Disabled States</h4>
          <Radio name="disabled" value="1" label="Disabled unchecked" disabled />
          <Radio name="disabled" value="2" label="Disabled checked" disabled defaultChecked />
          <Radio name="disabled" value="3" label="Disabled with description" description="Cannot be changed" disabled />
        </div>

        <div className="space-y-4">
          <h4 className="font-medium">Error States</h4>
          <Radio name="error" value="1" label="Error unchecked" error />
          <Radio name="error" value="2" label="Error checked" error defaultChecked />
          <Radio name="error" value="3" label="Error with description" description="Something went wrong" error />
        </div>
      </div>
    </div>
  )
}
// RadioGroup Examples
export const RadioGroupExamples: Story = {
  args: {
    label: 'RadioGroup example',
    size: 'md',
    disabled: false,
    error: false
  },
  render: () => {
    return (
      <div className="flex flex-col gap-8 p-8 max-w-lg">
        <h3 className="text-lg font-semibold">RadioGroup Examples</h3>

        <div className="space-y-8">
          <RadioGroup
            label="Choose your plan"
            description="Select the plan that best fits your needs"
          >
            <Radio
              name="plan"
              value="basic"
              label="Basic Plan - $9/month"
              description="Perfect for individuals and small teams"
            />
            <Radio
              name="plan"
              value="pro"
              label="Pro Plan - $29/month"
              description="Advanced features for growing businesses"
              defaultChecked
            />
            <Radio
              name="plan"
              value="enterprise"
              label="Enterprise Plan - $99/month"
              description="Full-featured solution for large organizations"
            />
          </RadioGroup>

          <RadioGroup
            label="Theme preference"
            orientation="horizontal"
          >
            <Radio name="theme" value="light" label="Light" defaultChecked />
            <Radio name="theme" value="dark" label="Dark" />
            <Radio name="theme" value="auto" label="Auto" />
          </RadioGroup>
        </div>
      </div>
    )
  }
}

// Controlled RadioGroup
export const ControlledRadioGroup: Story = {
  args: {
    label: 'Controlled RadioGroup',
    size: 'md',
    disabled: false,
    error: false
  },
  render: () => {
    const [selectedValue, setSelectedValue] = React.useState('option2')
    const [paymentMethod, setPaymentMethod] = React.useState('card')

    return (
      <div className="flex flex-col gap-8 p-8 max-w-lg">
        <h3 className="text-lg font-semibold">Controlled RadioGroups</h3>

        <div className="space-y-8">
          <RadioGroup
            label="Simple Selection"
            description={`Currently selected: ${selectedValue}`}
            value={selectedValue}
            onValueChange={setSelectedValue}
          >
            <Radio
              name="simple"
              value="option1"
              label="Option 1"
            />
            <Radio
              name="simple"
              value="option2"
              label="Option 2"
            />
            <Radio
              name="simple"
              value="option3"
              label="Option 3"
            />
          </RadioGroup>

          <RadioGroup
            label="Payment Method"
            orientation="horizontal"
            value={paymentMethod}
            onValueChange={setPaymentMethod}
          >
            <Radio
              name="payment"
              value="card"
              label="Credit Card"
            />
            <Radio
              name="payment"
              value="paypal"
              label="PayPal"
            />
            <Radio
              name="payment"
              value="bank"
              label="Bank Transfer"
            />
          </RadioGroup>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-2">Current Selections:</h4>
            <ul className="text-sm space-y-1">
              <li>Simple: {selectedValue}</li>
              <li>Payment: {paymentMethod}</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

// RadioGroup States
export const RadioGroupStates: Story = {
  args: {
    label: 'RadioGroup states',
    size: 'md',
    disabled: false,
    error: false
  },
  render: () => (
    <div className="flex flex-col gap-8 p-8 max-w-lg">
      <h3 className="text-lg font-semibold">RadioGroup States</h3>

      <div className="space-y-8">
        <RadioGroup
          label="Normal RadioGroup"
          description="Choose one option"
        >
          <Radio name="normal" value="1" label="Option 1" />
          <Radio name="normal" value="2" label="Option 2" defaultChecked />
          <Radio name="normal" value="3" label="Option 3" />
        </RadioGroup>

        <RadioGroup
          label="Disabled RadioGroup"
          description="All options are disabled"
          disabled
        >
          <Radio name="disabled" value="1" label="Option 1" />
          <Radio name="disabled" value="2" label="Option 2" defaultChecked />
          <Radio name="disabled" value="3" label="Option 3" />
        </RadioGroup>

        <RadioGroup
          label="Error RadioGroup"
          description="Please select a valid option"
          error
          errorMessage="This field is required"
        >
          <Radio name="error" value="1" label="Option 1" />
          <Radio name="error" value="2" label="Option 2" />
          <Radio name="error" value="3" label="Option 3" />
        </RadioGroup>

        <RadioGroup
          label="Horizontal Layout"
          description="Options displayed horizontally"
          orientation="horizontal"
        >
          <Radio name="horizontal" value="1" label="Small" />
          <Radio name="horizontal" value="2" label="Medium" defaultChecked />
          <Radio name="horizontal" value="3" label="Large" />
        </RadioGroup>
      </div>
    </div>
  )
}

// Real-world Examples
export const RealWorldExamples: Story = {
  args: {
    label: 'Real-world example',
    size: 'md',
    disabled: false,
    error: false
  },
  render: () => {
    const [formData, setFormData] = React.useState({
      plan: 'pro',
      billing: 'monthly',
      support: 'standard',
      notifications: 'email'
    })

    const updateField = (field: keyof typeof formData) => (value: string) => {
      setFormData(prev => ({ ...prev, [field]: value }))
    }

    return (
      <div className="flex flex-col gap-8 p-8 max-w-2xl">
        <h3 className="text-lg font-semibold">Subscription Form</h3>

        <div className="space-y-8">
          <RadioGroup
            label="Choose your plan"
            description="Select the plan that best fits your needs"
            value={formData.plan}
            onValueChange={updateField('plan')}
          >
            <Radio
              name="plan"
              value="basic"
              label="Basic Plan - $9/month"
              description="Up to 5 users, 10GB storage, email support"
            />
            <Radio
              name="plan"
              value="pro"
              label="Pro Plan - $29/month"
              description="Up to 25 users, 100GB storage, priority support"
            />
            <Radio
              name="plan"
              value="enterprise"
              label="Enterprise Plan - $99/month"
              description="Unlimited users, 1TB storage, dedicated support"
            />
          </RadioGroup>

          <RadioGroup
            label="Billing cycle"
            orientation="horizontal"
            value={formData.billing}
            onValueChange={updateField('billing')}
          >
            <Radio
              name="billing"
              value="monthly"
              label="Monthly"
            />
            <Radio
              name="billing"
              value="yearly"
              label="Yearly (Save 20%)"
            />
          </RadioGroup>

          <RadioGroup
            label="Support level"
            description="Choose your preferred support option"
            value={formData.support}
            onValueChange={updateField('support')}
          >
            <Radio
              name="support"
              value="standard"
              label="Standard Support"
              description="Email support within 24 hours"
            />
            <Radio
              name="support"
              value="priority"
              label="Priority Support (+$10/month)"
              description="Email and chat support within 4 hours"
            />
            <Radio
              name="support"
              value="dedicated"
              label="Dedicated Support (+$50/month)"
              description="Dedicated account manager and phone support"
            />
          </RadioGroup>

          <RadioGroup
            label="Notification preferences"
            orientation="horizontal"
            value={formData.notifications}
            onValueChange={updateField('notifications')}
          >
            <Radio
              name="notifications"
              value="email"
              label="Email only"
            />
            <Radio
              name="notifications"
              value="sms"
              label="SMS only"
            />
            <Radio
              name="notifications"
              value="both"
              label="Both"
            />
          </RadioGroup>

          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-4">Order Summary:</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Plan:</span>
                <span className="font-medium">{formData.plan} ({formData.billing})</span>
              </div>
              <div className="flex justify-between">
                <span>Support:</span>
                <span className="font-medium">{formData.support}</span>
              </div>
              <div className="flex justify-between">
                <span>Notifications:</span>
                <span className="font-medium">{formData.notifications}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
// Form Integration Test
export const FormIntegration: Story = {
  args: {
    label: 'Form integration test',
    size: 'md',
    disabled: false,
    error: false
  },
  render: () => {
    const [formState, setFormState] = React.useState({
      preference: '',
      subscription: 'basic',
      notifications: true
    })

    const handleRadioChange = (field: string) => (value: string) => {
      setFormState(prev => ({ ...prev, [field]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      console.log('Form submitted:', formState)
    }

    return (
      <div className="flex flex-col gap-8 p-8 max-w-lg">
        <h3 className="text-lg font-semibold">Form Integration Test</h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          <RadioGroup
            label="User Preference"
            description="Select your preferred option"
            value={formState.preference}
            onValueChange={handleRadioChange('preference')}
            error={!formState.preference}
            errorMessage={!formState.preference ? "Please select a preference" : undefined}
          >
            <Radio name="preference" value="option1" label="Option 1" />
            <Radio name="preference" value="option2" label="Option 2" />
            <Radio name="preference" value="option3" label="Option 3" />
          </RadioGroup>

          <RadioGroup
            label="Subscription Type"
            value={formState.subscription}
            onValueChange={handleRadioChange('subscription')}
          >
            <Radio name="subscription" value="basic" label="Basic" />
            <Radio name="subscription" value="premium" label="Premium" />
            <Radio name="subscription" value="enterprise" label="Enterprise" />
          </RadioGroup>

          <div className="flex gap-4">
            <Button
              type="submit"
              variant="primary"
            >
              Submit
            </Button>
            <Button
              type="button"
              variant="neutral"
              onClick={() => setFormState({ preference: '', subscription: 'basic', notifications: true })}
            >
              Reset
            </Button>
          </div>

          <div className="mt-4 p-4 bg-gray-100 rounded">
            <h4 className="font-medium mb-2">Form State:</h4>
            <pre className="text-sm">{JSON.stringify(formState, null, 2)}</pre>
          </div>
        </form>
      </div>
    )
  }
}

// Edge Cases Test
export const EdgeCases: Story = {
  args: {
    label: 'Edge cases test',
    size: 'md',
    disabled: false,
    error: false
  },
  render: () => {
    const [dynamicOptions, setDynamicOptions] = React.useState(['Option 1', 'Option 2'])
    const [selectedValue, setSelectedValue] = React.useState('')

    const addOption = () => {
      setDynamicOptions(prev => [...prev, `Option ${prev.length + 1}`])
    }

    const removeOption = () => {
      if (dynamicOptions.length > 1) {
        setDynamicOptions(prev => prev.slice(0, -1))
      }
    }

    return (
      <div className="flex flex-col gap-8 p-8 max-w-lg">
        <h3 className="text-lg font-semibold">Edge Cases Test</h3>

        <div className="space-y-6">
          <div>
            <h4 className="font-medium mb-2">Dynamic Options</h4>
            <div className="flex gap-2 mb-4">
              <Button
                onClick={addOption}
                variant="primary"
                size="sm"
              >
                Add Option
              </Button>
              <Button
                onClick={removeOption}
                variant="danger"
                size="sm"
                disabled={dynamicOptions.length <= 1}
              >
                Remove Option
              </Button>
            </div>

            <RadioGroup
              label="Dynamic Options"
              value={selectedValue}
              onValueChange={setSelectedValue}
            >
              {dynamicOptions.map((option, index) => (
                <Radio
                  key={index}
                  name="dynamic"
                  value={option.toLowerCase().replace(' ', '-')}
                  label={option}
                />
              ))}
            </RadioGroup>
          </div>

          <div>
            <h4 className="font-medium mb-2">Long Content Test</h4>
            <RadioGroup label="Long Content">
              <Radio
                name="long"
                value="long1"
                label="This is a very long label that should wrap properly and maintain good spacing and alignment with the radio button"
                description="This is an even longer description that provides additional context and information about this particular option. It should wrap nicely and maintain proper spacing."
              />
              <Radio
                name="long"
                value="long2"
                label="Another long option"
                description="Short description"
              />
            </RadioGroup>
          </div>

          <div>
            <h4 className="font-medium mb-2">Rapid State Changes</h4>
            <RadioGroup
              label="Rapid Changes"
              value={selectedValue}
              onValueChange={(value) => {
                // Simulate rapid state changes
                setSelectedValue(value)
                setTimeout(() => setSelectedValue(''), 100)
                setTimeout(() => setSelectedValue(value), 200)
              }}
            >
              <Radio name="rapid" value="rapid1" label="Option 1" />
              <Radio name="rapid" value="rapid2" label="Option 2" />
              <Radio name="rapid" value="rapid3" label="Option 3" />
            </RadioGroup>
          </div>
        </div>
      </div>
    )
  }
}
