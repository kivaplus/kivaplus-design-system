import {
  DownloadIcon,
  ExternalLinkIcon,
  ReloadIcon,
  RocketIcon,
  UpdateIcon
} from '@radix-ui/react-icons'
import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Alert } from '../components/alert'
import { Button } from '../components/button'

const meta = {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
The Alert component displays important messages to users in a non-intrusive way. It supports multiple variants, custom icons, actions, and dismissible functionality.

## Features
- **5 Variants**: neutral, info, success, warning, error
- **Custom Icons**: Override default icons with custom ones
- **Dismissible**: Optional close button with callback
- **Actions**: Support for action buttons
- **Flexible Content**: Support for title, description, and custom content


## Usage
Use alerts to communicate important information, system status, or user feedback. Choose the appropriate variant based on the message type and urgency.
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['neutral', 'info', 'success', 'warning', 'error'],
      description: 'Visual style variant of the alert'
    },
    title: {
      control: 'text',
      description: 'Alert title text'
    },
    description: {
      control: 'text',
      description: 'Alert description text'
    },
    dismissible: {
      control: 'boolean',
      description: 'Whether the alert can be dismissed'
    }
  },
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

// Default story
export const Default: Story = {
  args: {
    variant: 'info',
    title: 'Information',
    description: 'This is an informational alert with some details.',
    dismissible: false
  }
}

// All Variants
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Alert variant="neutral" title="Neutral Alert" description="This is a neutral alert for general information." />
      <Alert variant="info" title="Information" description="This is an informational alert with helpful details." />
      <Alert variant="success" title="Success!" description="Your action was completed successfully." />
      <Alert variant="warning" title="Warning" description="Please review this important information before proceeding." />
      <Alert variant="error" title="Error" description="Something went wrong. Please try again or contact support." />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available alert variants. Use **neutral** for general info, **info** for helpful details, **success** for confirmations, **warning** for cautions, and **error** for problems.'
      }
    }
  }
}

// Simple Alerts (Description Only)
export const SimpleAlerts: Story = {
  render: () => (
    <div className="space-y-4">
      <Alert variant="info" description="Your profile has been updated successfully." />
      <Alert variant="success" description="File uploaded successfully!" />
      <Alert variant="warning" description="Your session will expire in 5 minutes." />
      <Alert variant="error" description="Failed to save changes. Please try again." />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Simple alerts with only description text, perfect for quick notifications.'
      }
    }
  }
}

// Dismissible Alerts
export const DismissibleAlerts: Story = {
  render: () => {
    const [alerts, setAlerts] = useState({
      info: true,
      success: true,
      warning: true,
      error: true
    })

    const dismissAlert = (type: keyof typeof alerts) => {
      setAlerts(prev => ({ ...prev, [type]: false }))
    }

    const resetAlerts = () => {
      setAlerts({ info: true, success: true, warning: true, error: true })
    }

    return (
      <div className="space-y-4">
        {alerts.info && (
          <Alert
            variant="info"
            title="New Feature Available"
            description="Check out our latest feature in the settings panel."
            dismissible
            onDismiss={() => dismissAlert('info')}
          />
        )}
        {alerts.success && (
          <Alert
            variant="success"
            title="Backup Completed"
            description="Your data has been successfully backed up to the cloud."
            dismissible
            onDismiss={() => dismissAlert('success')}
          />
        )}
        {alerts.warning && (
          <Alert
            variant="warning"
            title="Storage Almost Full"
            description="You're using 90% of your storage space. Consider upgrading your plan."
            dismissible
            onDismiss={() => dismissAlert('warning')}
          />
        )}
        {alerts.error && (
          <Alert
            variant="error"
            title="Connection Failed"
            description="Unable to connect to the server. Check your internet connection."
            dismissible
            onDismiss={() => dismissAlert('error')}
          />
        )}

        <div className="pt-4">
          <Button onClick={resetAlerts} variant="outlined" size="sm">
            Reset All Alerts
          </Button>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Dismissible alerts that users can close. Click the X button to dismiss each alert.'
      }
    }
  }
}

// Alerts with Actions
export const AlertsWithActions: Story = {
  render: () => (
    <div className="space-y-4">
      <Alert
        variant="info"
        title="Update Available"
        description="A new version of the application is available for download."
        actions={
          <>
            <Button size="sm" variant="outlined">Later</Button>
            <Button size="sm" leftIcon={<DownloadIcon className="w-4 h-4" />}>
              Update Now
            </Button>
          </>
        }
      />

      <Alert
        variant="success"
        title="Deployment Successful"
        description="Your application has been deployed to production successfully."
        actions={
          <Button size="sm" variant="outlined" leftIcon={<ExternalLinkIcon className="w-4 h-4" />}>
            View Live Site
          </Button>
        }
      />

      <Alert
        variant="warning"
        title="Unsaved Changes"
        description="You have unsaved changes that will be lost if you leave this page."
        actions={
          <>
            <Button size="sm" variant="outlined">Discard</Button>
            <Button size="sm">Save Changes</Button>
          </>
        }
      />

      <Alert
        variant="error"
        title="Sync Failed"
        description="Failed to sync your data. Some changes may be lost."
        actions={
          <Button size="sm" leftIcon={<ReloadIcon className="w-4 h-4" />}>
            Retry Sync
          </Button>
        }
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Alerts with action buttons that allow users to take immediate action on the alert message.'
      }
    }
  }
}

// Custom Icons
export const CustomIcons: Story = {
  render: () => (
    <div className="space-y-4">
      <Alert
        variant="info"
        title="New Feature"
        description="Rocket-powered performance improvements are now available!"
        icon={<RocketIcon className="w-5 h-5" />}
      />

      <Alert
        variant="success"
        title="System Updated"
        description="All systems have been updated to the latest version."
        icon={<UpdateIcon className="w-5 h-5" />}
      />

      <Alert
        variant="warning"
        title="Maintenance Mode"
        description="The system will enter maintenance mode in 30 minutes."
        icon={<UpdateIcon className="w-5 h-5" />}
      />

      <Alert
        variant="neutral"
        title="No Icon"
        description="This alert doesn't have an icon."
        icon={null}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Alerts with custom icons to better represent the message content. You can also set icon to null to hide it completely.'
      }
    }
  }
}

// Complex Content
export const ComplexContent: Story = {
  render: () => (
    <div className="space-y-4">
      <Alert variant="info" title="System Maintenance">
        <p className="text-sm mb-3">
          We'll be performing scheduled maintenance on our servers. During this time, you may experience:
        </p>
        <ul className="text-sm space-y-1 mb-3 ml-4">
          <li>• Temporary service interruptions</li>
          <li>• Slower response times</li>
          <li>• Limited access to some features</li>
        </ul>
        <p className="text-sm">
          <strong>Maintenance window:</strong> Tonight from 2:00 AM to 4:00 AM EST
        </p>
      </Alert>

      <Alert variant="success" title="Welcome to the Beta Program!">
        <p className="text-sm mb-3">
          You've been accepted into our beta testing program. Here's what you can expect:
        </p>
        <div className="bg-white/50 rounded p-3 text-sm mb-3">
          <h4 className="font-medium mb-2">Beta Features:</h4>
          <ul className="space-y-1">
            <li>✓ Advanced analytics dashboard</li>
            <li>✓ Real-time collaboration tools</li>
            <li>✓ Enhanced security features</li>
          </ul>
        </div>
        <p className="text-sm">
          Please report any issues you encounter to our support team.
        </p>
      </Alert>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Alerts with complex content including lists, formatted text, and nested elements.'
      }
    }
  }
}



// Real-world Examples
export const RealWorldExamples: Story = {
  render: () => (
    <div className="space-y-6">
      {/* System Status */}
      <div>
        <h3 className="text-lg font-semibold mb-4">System Status</h3>
        <div className="space-y-3">
          <Alert variant="success" description="All systems operational" />
          <Alert variant="warning" title="Degraded Performance" description="Some users may experience slower load times. We're investigating the issue." />
          <Alert variant="info" title="Scheduled Maintenance" description="Maintenance window: Dec 15, 2:00 AM - 4:00 AM EST" />
        </div>
      </div>

      {/* User Notifications */}
      <div>
        <h3 className="text-lg font-semibold mb-4">User Notifications</h3>
        <div className="space-y-3">
          <Alert
            variant="info"
            title="Profile Incomplete"
            description="Complete your profile to unlock all features."
            actions={<Button size="sm">Complete Profile</Button>}
            dismissible
            onDismiss={() => { }}
          />
          <Alert
            variant="success"
            title="Payment Successful"
            description="Your subscription has been renewed for another month."
            dismissible
            onDismiss={() => { }}
          />
          <Alert
            variant="warning"
            title="Password Expires Soon"
            description="Your password will expire in 3 days. Update it now to avoid account lockout."
            actions={<Button size="sm">Update Password</Button>}
          />
        </div>
      </div>

      {/* Form Validation */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Form Validation</h3>
        <div className="space-y-3">
          <Alert variant="error" title="Form Validation Failed" description="Please correct the errors below and try again." />
          <Alert variant="warning" description="Some fields are optional but recommended for better results." />
          <Alert variant="success" description="Form submitted successfully! You'll receive a confirmation email shortly." />
        </div>
      </div>

      {/* API Status */}
      <div>
        <h3 className="text-lg font-semibold mb-4">API Status</h3>
        <div className="space-y-3">
          <Alert
            variant="error"
            title="API Rate Limit Exceeded"
            description="You've exceeded the API rate limit. Please wait before making more requests."
            actions={<Button size="sm" variant="outlined">View Usage</Button>}
          />
          <Alert
            variant="info"
            title="New API Version Available"
            description="API v2.0 is now available with improved performance and new features."
            actions={
              <>
                <Button size="sm" variant="outlined">Learn More</Button>
                <Button size="sm">Upgrade</Button>
              </>
            }
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Real-world examples showing how alerts can be used for system status, user notifications, form validation, and API communication.'
      }
    }
  }
}

// Interactive Example
export const Interactive: Story = {
  args: {
    variant: 'info',
    title: 'Interactive Alert',
    description: 'Use the controls below to customize this alert and see how different props affect its appearance.',
    dismissible: true,
    onDismiss: () => alert('Alert dismissed!')
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive example where you can test different props and see how they affect the alert appearance and behavior.'
      }
    }
  }
}
