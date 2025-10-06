import { ExclamationTriangleIcon, TrashIcon } from '@radix-ui/react-icons'
import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { AlertDialog, ConfirmDialog, DestructiveDialog } from '../components/alertdialog'
import { Button } from '../components/button'

const meta = {
  title: 'Components/AlertDialog',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
AlertDialog components provide focused, modal dialogs for important user interactions that require immediate attention.

## AlertDialog Component
- **Built on Modal**: Uses the Modal component internally for consistent behavior
- **4 Variants**: info, warning, error, success with appropriate icons and colors
- **Flexible Actions**: Customizable confirm/cancel buttons with callbacks
- **Accessibility**: Proper focus management and keyboard navigation
- **Non-dismissible**: Cannot be closed by clicking backdrop or pressing escape

## Specialized Components
- **ConfirmDialog**: Pre-configured for confirmation dialogs with cancel option
- **DestructiveDialog**: Pre-configured for destructive actions with danger styling

## Usage
Use AlertDialog for critical information, confirmations, or actions that require user acknowledgment. The component automatically handles state management and provides consistent styling across different variants.
        `
      }
    }
  },
  tags: ['autodocs'],
} satisfies Meta

export default meta
type Story = StoryObj

// Basic AlertDialog Examples
export const BasicExamples: Story = {
  render: () => {
    const [dialogs, setDialogs] = useState({
      info: false,
      warning: false,
      error: false,
      success: false
    })

    const openDialog = (type: keyof typeof dialogs) => {
      setDialogs(prev => ({ ...prev, [type]: true }))
    }

    const closeDialog = (type: keyof typeof dialogs) => {
      setDialogs(prev => ({ ...prev, [type]: false }))
    }

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button onClick={() => openDialog('info')} variant="primary">
            Info Dialog
          </Button>
          <Button onClick={() => openDialog('warning')} variant="warning">
            Warning Dialog
          </Button>
          <Button onClick={() => openDialog('error')} variant="danger">
            Error Dialog
          </Button>
          <Button onClick={() => openDialog('success')} variant="success">
            Success Dialog
          </Button>
        </div>

        {/* Info Dialog */}
        <AlertDialog
          open={dialogs.info}
          onOpenChange={() => closeDialog('info')}
          variant="info"
          title="Information"
          description="This is an informational message to provide additional context or details about a process or feature."
          confirmText="Got it"
          onConfirm={() => console.log('Info acknowledged')}
        />

        {/* Warning Dialog */}
        <AlertDialog
          open={dialogs.warning}
          onOpenChange={() => closeDialog('warning')}
          variant="warning"
          title="Warning"
          description="This action may have unintended consequences. Please review your selection before proceeding."
          confirmText="Continue"
          cancelText="Cancel"
          showCancel={true}
          onConfirm={() => console.log('Warning accepted')}
          onCancel={() => console.log('Warning cancelled')}
        />

        {/* Error Dialog */}
        <AlertDialog
          open={dialogs.error}
          onOpenChange={() => closeDialog('error')}
          variant="error"
          title="Error Occurred"
          description="An unexpected error has occurred while processing your request. Please try again or contact support if the problem persists."
          confirmText="Try Again"
          cancelText="Cancel"
          showCancel={true}
          onConfirm={() => console.log('Error retry')}
          onCancel={() => console.log('Error cancelled')}
        />

        {/* Success Dialog */}
        <AlertDialog
          open={dialogs.success}
          onOpenChange={() => closeDialog('success')}
          variant="success"
          title="Success!"
          description="Your changes have been saved successfully. All updates are now live and visible to users."
          confirmText="Continue"
          onConfirm={() => console.log('Success acknowledged')}
        />
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic AlertDialog examples showing all four variants: info, warning, error, and success. Each variant has appropriate icons and color schemes.'
      }
    }
  }
}

// Confirmation Dialogs
export const ConfirmationDialogs: Story = {
  render: () => {
    const [dialogs, setDialogs] = useState({
      save: false,
      discard: false,
      logout: false
    })

    const openDialog = (type: keyof typeof dialogs) => {
      setDialogs(prev => ({ ...prev, [type]: true }))
    }

    const closeDialog = (type: keyof typeof dialogs) => {
      setDialogs(prev => ({ ...prev, [type]: false }))
    }

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button onClick={() => openDialog('save')} variant="primary">
            Save Changes
          </Button>
          <Button onClick={() => openDialog('discard')} variant="outline">
            Discard Changes
          </Button>
          <Button onClick={() => openDialog('logout')} variant="secondary">
            Logout
          </Button>
        </div>

        {/* Save Confirmation */}
        <ConfirmDialog
          open={dialogs.save}
          onOpenChange={() => closeDialog('save')}
          variant="warning"
          title="Save Changes?"
          description="Are you sure you want to save these changes? This will update the live configuration and may affect active users."
          confirmText="Save Changes"
          cancelText="Cancel"
          onConfirm={() => {
            console.log('Changes saved')
            closeDialog('save')
          }}
          onCancel={() => {
            console.log('Save cancelled')
            closeDialog('save')
          }}
        />

        {/* Discard Confirmation */}
        <ConfirmDialog
          open={dialogs.discard}
          onOpenChange={() => closeDialog('discard')}
          variant="warning"
          title="Discard Changes?"
          description="You have unsaved changes that will be lost. Are you sure you want to discard them?"
          confirmText="Discard"
          cancelText="Keep Editing"
          onConfirm={() => {
            console.log('Changes discarded')
            closeDialog('discard')
          }}
          onCancel={() => {
            console.log('Continue editing')
            closeDialog('discard')
          }}
        />

        {/* Logout Confirmation */}
        <ConfirmDialog
          open={dialogs.logout}
          onOpenChange={() => closeDialog('logout')}
          variant="warning"
          title="Confirm Logout"
          description="Are you sure you want to logout? You will need to sign in again to access your account."
          confirmText="Logout"
          cancelText="Stay Logged In"
          onConfirm={() => {
            console.log('User logged out')
            closeDialog('logout')
          }}
          onCancel={() => {
            console.log('Logout cancelled')
            closeDialog('logout')
          }}
        />
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'ConfirmDialog examples for common confirmation scenarios like saving changes, discarding work, and logging out.'
      }
    }
  }
}

// Destructive Actions
export const DestructiveActions: Story = {
  render: () => {
    const [dialogs, setDialogs] = useState({
      deleteUser: false,
      deleteProject: false,
      clearData: false
    })

    const openDialog = (type: keyof typeof dialogs) => {
      setDialogs(prev => ({ ...prev, [type]: true }))
    }

    const closeDialog = (type: keyof typeof dialogs) => {
      setDialogs(prev => ({ ...prev, [type]: false }))
    }

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            onClick={() => openDialog('deleteUser')}
            variant="danger"
            leftIcon={<TrashIcon className="w-4 h-4" />}
          >
            Delete User
          </Button>
          <Button
            onClick={() => openDialog('deleteProject')}
            variant="danger"
            leftIcon={<TrashIcon className="w-4 h-4" />}
          >
            Delete Project
          </Button>
          <Button
            onClick={() => openDialog('clearData')}
            variant="danger"
            leftIcon={<ExclamationTriangleIcon className="w-4 h-4" />}
          >
            Clear All Data
          </Button>
        </div>

        {/* Delete User */}
        <DestructiveDialog
          open={dialogs.deleteUser}
          onOpenChange={() => closeDialog('deleteUser')}
          title="Delete User Account"
          description="This will permanently delete the user account and all associated data. This action cannot be undone."
          confirmText="Delete User"
          cancelText="Cancel"
          onConfirm={() => {
            console.log('User deleted')
            closeDialog('deleteUser')
          }}
          onCancel={() => {
            console.log('Delete cancelled')
            closeDialog('deleteUser')
          }}
        />

        {/* Delete Project */}
        <DestructiveDialog
          open={dialogs.deleteProject}
          onOpenChange={() => closeDialog('deleteProject')}
          title="Delete Project"
          description="Are you sure you want to delete this project? All files, settings, and history will be permanently removed."
          confirmText="Delete Project"
          cancelText="Keep Project"
          onConfirm={() => {
            console.log('Project deleted')
            closeDialog('deleteProject')
          }}
          onCancel={() => {
            console.log('Project kept')
            closeDialog('deleteProject')
          }}
        />

        {/* Clear Data */}
        <DestructiveDialog
          open={dialogs.clearData}
          onOpenChange={() => closeDialog('clearData')}
          title="Clear All Data"
          description="This will remove all stored data, preferences, and cached information. You will need to reconfigure everything from scratch."
          confirmText="Clear Data"
          cancelText="Cancel"
          onConfirm={() => {
            console.log('Data cleared')
            closeDialog('clearData')
          }}
          onCancel={() => {
            console.log('Clear cancelled')
            closeDialog('clearData')
          }}
        />
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'DestructiveDialog examples for dangerous actions that permanently delete or modify data. These dialogs use error styling to emphasize the severity.'
      }
    }
  }
}

// Custom Styling
export const CustomStyling: Story = {
  render: () => {
    const [dialogs, setDialogs] = useState({
      custom: false,
      noCancel: false,
      longText: false
    })

    const openDialog = (type: keyof typeof dialogs) => {
      setDialogs(prev => ({ ...prev, [type]: true }))
    }

    const closeDialog = (type: keyof typeof dialogs) => {
      setDialogs(prev => ({ ...prev, [type]: false }))
    }

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button onClick={() => openDialog('custom')} variant="primary">
            Custom Buttons
          </Button>
          <Button onClick={() => openDialog('noCancel')} variant="secondary">
            No Cancel Button
          </Button>
          <Button onClick={() => openDialog('longText')} variant="outline">
            Long Description
          </Button>
        </div>

        {/* Custom Button Text */}
        <AlertDialog
          open={dialogs.custom}
          onOpenChange={() => closeDialog('custom')}
          variant="info"
          title="Custom Action Required"
          description="Please choose how you would like to proceed with this operation."
          confirmText="Proceed Now"
          cancelText="Maybe Later"
          showCancel={true}
          onConfirm={() => {
            console.log('Proceeding now')
            closeDialog('custom')
          }}
          onCancel={() => {
            console.log('Maybe later')
            closeDialog('custom')
          }}
        />

        {/* No Cancel Button */}
        <AlertDialog
          open={dialogs.noCancel}
          onOpenChange={() => closeDialog('noCancel')}
          variant="success"
          title="Operation Complete"
          description="The operation has been completed successfully. Click continue to proceed to the next step."
          confirmText="Continue"
          showCancel={false}
          onConfirm={() => {
            console.log('Continuing')
            closeDialog('noCancel')
          }}
        />

        {/* Long Description */}
        <AlertDialog
          open={dialogs.longText}
          onOpenChange={() => closeDialog('longText')}
          variant="warning"
          title="Important Security Notice"
          description="We've detected unusual activity on your account. This could be due to a compromised password or unauthorized access attempts. We recommend changing your password immediately and reviewing your recent account activity. If you didn't initiate these actions, please contact our security team right away. Your account security is our top priority, and we're here to help protect your information."
          confirmText="Change Password"
          cancelText="Review Later"
          showCancel={true}
          onConfirm={() => {
            console.log('Changing password')
            closeDialog('longText')
          }}
          onCancel={() => {
            console.log('Will review later')
            closeDialog('longText')
          }}
        />
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Examples showing custom button text, single-action dialogs, and handling longer descriptions that wrap naturally.'
      }
    }
  }
}

// Interactive Example
export const Interactive: Story = {
  render: () => {
    const [dialogOpen, setDialogOpen] = useState(false)
    const [result, setResult] = useState<string>('')

    return (
      <div className="space-y-6">
        <div className="text-center">
          <Button onClick={() => setDialogOpen(true)} variant="primary">
            Open Interactive Dialog
          </Button>
        </div>

        {result && (
          <div className="p-4 bg-gray-50 rounded-lg text-center">
            <p className="text-sm text-gray-600">Last action: <strong>{result}</strong></p>
          </div>
        )}

        <AlertDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          variant="info"
          title="Interactive Example"
          description="This dialog demonstrates the callback functionality. Choose an action to see the result."
          confirmText="Confirm Action"
          cancelText="Cancel Action"
          showCancel={true}
          onConfirm={() => {
            setResult('Confirmed')
            setDialogOpen(false)
          }}
          onCancel={() => {
            setResult('Cancelled')
            setDialogOpen(false)
          }}
        />
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive example showing how callbacks work and how to handle user responses from AlertDialog actions.'
      }
    }
  }
}
