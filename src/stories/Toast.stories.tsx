import { CheckCircledIcon, EnvelopeClosedIcon, ExclamationTriangleIcon } from '@radix-ui/react-icons'
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../components/button'
import { Notification, NotificationList, Toast, ToastProvider, useToast } from '../components/toast'

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A toast notification system with provider pattern for global toast management. Built with centralized CSS component classes for consistent styling.'
      }
    }
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'The title of the toast'
    },
    description: {
      control: 'text',
      description: 'The description/message of the toast'
    },
    variant: {
      control: 'select',
      options: ['default', 'success', 'error', 'warning', 'info'],
      description: 'The visual variant of the toast'
    },
    duration: {
      control: 'number',
      description: 'Duration in milliseconds before auto-close (0 = no auto-close)'
    },
    closable: {
      control: 'boolean',
      description: 'Whether the toast can be manually closed'
    }
  }
}

export default meta
type Story = StoryObj<typeof Toast>

// Basic Toast Examples
export const BasicToasts: Story = {
  args: {
    title: 'Toast Title',
    description: 'This is a toast message',
    variant: 'default',
    duration: 5000,
    closable: true
  },
  render: () => (
    <div className="flex flex-col gap-4 p-8">
      <h3 className="text-lg font-semibold mb-4">Basic Toast Variants</h3>
      <div className="space-y-4">
        <Toast
          title="Default Toast"
          description="This is a default toast message"
          variant="default"
          duration={0}
        />
        <Toast
          title="Success Toast"
          description="Operation completed successfully"
          variant="success"
          duration={0}
        />
        <Toast
          title="Error Toast"
          description="Something went wrong"
          variant="error"
          duration={0}
        />
        <Toast
          title="Warning Toast"
          description="Please check your input"
          variant="warning"
          duration={0}
        />
        <Toast
          title="Info Toast"
          description="Here's some useful information"
          variant="info"
          duration={0}
        />
      </div>
    </div>
  )
}

// Toast with Actions
export const ToastWithActions: Story = {
  args: {
    title: 'Toast with Action',
    description: 'This toast has an action button',
    variant: 'default',
    duration: 0,
    closable: true
  },
  render: () => (
    <div className="flex flex-col gap-4 p-8">
      <h3 className="text-lg font-semibold mb-4">Toasts with Actions</h3>
      <div className="space-y-4">
        <Toast
          title="File uploaded"
          description="Your file has been uploaded successfully"
          variant="success"
          duration={0}
          action={{
            label: 'View file',
            onClick: () => alert('View file clicked!')
          }}
        />
        <Toast
          title="Connection lost"
          description="Unable to connect to server"
          variant="error"
          duration={0}
          action={{
            label: 'Retry',
            onClick: () => alert('Retry clicked!')
          }}
        />
        <Toast
          title="Update available"
          description="A new version is available"
          variant="info"
          duration={0}
          action={{
            label: 'Update now',
            onClick: () => alert('Update clicked!')
          }}
        />
      </div>
    </div>
  )
}

// Toast Provider Demo
const ToastProviderDemo = () => {
  const { addToast, removeAllToasts } = useToast()

  const showToast = (variant: 'default' | 'success' | 'error' | 'warning' | 'info') => {
    const messages = {
      default: { title: 'Default Toast', description: 'This is a default message' },
      success: { title: 'Success!', description: 'Operation completed successfully' },
      error: { title: 'Error!', description: 'Something went wrong' },
      warning: { title: 'Warning!', description: 'Please check your input' },
      info: { title: 'Info', description: 'Here\'s some useful information' }
    }

    addToast({
      ...messages[variant],
      variant,
      duration: 5000,
      action: variant === 'error' ? {
        label: 'Retry',
        onClick: () => alert('Retry clicked!')
      } : undefined
    })
  }

  return (
    <div className="flex flex-col gap-4 p-8">
      <h3 className="text-lg font-semibold mb-4">Toast Provider Demo</h3>
      <p className="text-sm text-gray-600 mb-4">
        Click the buttons below to show toasts. They will appear in the top-right corner and auto-dismiss after 5 seconds.
      </p>

      <div className="flex flex-wrap gap-2">
        <Button onClick={() => showToast('default')} variant="neutral">
          Show Default
        </Button>
        <Button onClick={() => showToast('success')} variant="primary">
          Show Success
        </Button>
        <Button onClick={() => showToast('error')} variant="danger">
          Show Error
        </Button>
        <Button onClick={() => showToast('warning')} variant="accent">
          Show Warning
        </Button>
        <Button onClick={() => showToast('info')} variant="secondary">
          Show Info
        </Button>
      </div>

      <div className="mt-4">
        <Button onClick={removeAllToasts} variant="outlined" size="sm">
          Clear All Toasts
        </Button>
      </div>
    </div>
  )
}

export const ToastProviderExample: Story = {
  args: {
    title: 'Provider Example',
    description: 'Using ToastProvider for global toast management',
    variant: 'default',
    duration: 5000,
    closable: true
  },
  render: () => (
    <ToastProvider position="top-right">
      <ToastProviderDemo />
    </ToastProvider>
  )
}

// Toast Positions
const ToastPositionDemo = () => {
  const { addToast } = useToast()

  const showPositionToast = () => {
    addToast({
      title: 'Position Test',
      description: 'This toast shows the current position',
      variant: 'info',
      duration: 3000
    })
  }

  return (
    <div className="flex flex-col gap-4 p-8">
      <h3 className="text-lg font-semibold mb-4">Toast Positions</h3>
      <p className="text-sm text-gray-600 mb-4">
        This example shows different toast positions. Click the button to see toasts in different positions.
      </p>
      <Button onClick={showPositionToast}>Show Toast</Button>
    </div>
  )
}

export const ToastPositions: Story = {
  args: {
    title: 'Position Example',
    description: 'Different toast positions',
    variant: 'default',
    duration: 3000,
    closable: true
  },
  render: () => (
    <div className="grid grid-cols-3 gap-4 p-8">
      <ToastProvider position="top-left">
        <div className="text-center">
          <h4 className="font-medium mb-2">Top Left</h4>
          <ToastPositionDemo />
        </div>
      </ToastProvider>

      <ToastProvider position="top-center">
        <div className="text-center">
          <h4 className="font-medium mb-2">Top Center</h4>
          <ToastPositionDemo />
        </div>
      </ToastProvider>

      <ToastProvider position="top-right">
        <div className="text-center">
          <h4 className="font-medium mb-2">Top Right</h4>
          <ToastPositionDemo />
        </div>
      </ToastProvider>

      <ToastProvider position="bottom-left">
        <div className="text-center">
          <h4 className="font-medium mb-2">Bottom Left</h4>
          <ToastPositionDemo />
        </div>
      </ToastProvider>

      <ToastProvider position="bottom-center">
        <div className="text-center">
          <h4 className="font-medium mb-2">Bottom Center</h4>
          <ToastPositionDemo />
        </div>
      </ToastProvider>

      <ToastProvider position="bottom-right">
        <div className="text-center">
          <h4 className="font-medium mb-2">Bottom Right</h4>
          <ToastPositionDemo />
        </div>
      </ToastProvider>
    </div>
  )
}

// Notification Examples
export const NotificationExamples: Story = {
  args: {
    title: 'Notification Example',
    description: 'Different notification types',
    variant: 'default',
    duration: 5000,
    closable: true
  },
  render: () => (
    <div className="flex flex-col gap-6 p-8 max-w-md">
      <h3 className="text-lg font-semibold">Notification Examples</h3>

      <div className="space-y-4">
        <Notification
          title="New message"
          description="You have received a new message from John Doe"
          variant="default"
          timestamp={new Date(Date.now() - 5 * 60 * 1000)} // 5 minutes ago
          unread={true}
          icon={<EnvelopeClosedIcon className="w-4 h-4" />}
        />

        <Notification
          title="Payment successful"
          description="Your payment of $99.99 has been processed"
          variant="success"
          timestamp={new Date(Date.now() - 15 * 60 * 1000)} // 15 minutes ago
          icon={<CheckCircledIcon className="w-4 h-4" />}
          actions={
            <Button size="sm" variant="outlined">View Receipt</Button>
          }
        />

        <Notification
          title="Security alert"
          description="New login detected from unknown device"
          variant="warning"
          timestamp={new Date(Date.now() - 2 * 60 * 60 * 1000)} // 2 hours ago
          unread={true}
          icon={<ExclamationTriangleIcon className="w-4 h-4" />}
          actions={
            <div className="flex gap-2">
              <Button size="sm" variant="outlined">Ignore</Button>
              <Button size="sm" variant="primary">Secure Account</Button>
            </div>
          }
        />
      </div>
    </div>
  )
}

// Notification List
export const NotificationListExample: Story = {
  args: {
    title: 'Notification List',
    description: 'A list of notifications',
    variant: 'default',
    duration: 5000,
    closable: true
  },
  render: () => {
    const notifications = [
      {
        title: "New message",
        description: "You have received a new message from John Doe",
        variant: "default" as const,
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        unread: true,
        icon: <EnvelopeClosedIcon className="w-4 h-4" />
      },
      {
        title: "Payment successful",
        description: "Your payment of $99.99 has been processed",
        variant: "success" as const,
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
        unread: false,
        icon: <CheckCircledIcon className="w-4 h-4" />
      },
      {
        title: "Security alert",
        description: "New login detected from unknown device",
        variant: "warning" as const,
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        unread: true,
        icon: <ExclamationTriangleIcon className="w-4 h-4" />
      }
    ]

    return (
      <div className="max-w-md mx-auto">
        <h3 className="text-lg font-semibold mb-4 px-4">Notification List</h3>
        <NotificationList
          notifications={notifications}
          onMarkAllRead={() => alert('Mark all as read clicked!')}
        />
      </div>
    )
  }
}

// Empty Notification List
export const EmptyNotificationList: Story = {
  args: {
    title: 'Empty List',
    description: 'No notifications to show',
    variant: 'default',
    duration: 5000,
    closable: true
  },
  render: () => (
    <div className="max-w-md mx-auto">
      <h3 className="text-lg font-semibold mb-4 px-4">Empty Notification List</h3>
      <NotificationList notifications={[]} />
    </div>
  )
}
