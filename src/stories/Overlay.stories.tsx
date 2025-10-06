import {
  BellIcon,
  CheckCircledIcon,
  DownloadIcon,
  ExclamationTriangleIcon,
  FileTextIcon,
  GearIcon,
  HamburgerMenuIcon,
  ImageIcon,
  InfoCircledIcon,
  MagnifyingGlassIcon,
  Pencil1Icon,
  PersonIcon,
  Share1Icon,
  TrashIcon
} from '@radix-ui/react-icons'
import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Alert } from '../components/alert'
import { Button } from '../components/button'
import { Card, CardContent, CardHeader } from '../components/card'
import { Drawer, Modal, ModalContent, ModalFooter, ModalHeader } from '../components/modal'

const meta = {
  title: 'Components/Overlay',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The Overlay components (Modal and Drawer) provide flexible ways to display content above the main interface.

## Modal Component
- **Centered overlays** for dialogs, forms, and content
- **6 Sizes**: xs, sm, md, lg, xl, full
- **Positioning**: Centered or top-aligned
- **Interactions**: Backdrop click, escape key, close button

## Drawer Component
- **Side panels** that slide in from any direction
- **4 Sides**: left, right, top, bottom
- **5 Sizes**: xs, sm, md, lg, xl
- **Smooth animations** with proper transforms

## Sub-components
- **ModalHeader**: Title, subtitle, and divider options
- **ModalContent**: Main content area with proper padding
- **ModalFooter**: Action buttons with flexible justification

## Usage
Use modals for focused tasks, confirmations, and detailed content. Use drawers for navigation, filters, and supplementary information.
        `
      }
    }
  },
  tags: ['autodocs'],
} satisfies Meta

export default meta
type Story = StoryObj

// Modal Sizes
export const ModalSizes: Story = {
  render: () => {
    const [modals, setModals] = useState({
      xs: false,
      sm: false,
      md: false,
      lg: false,
      xl: false,
      full: false
    })

    const openModal = (size: keyof typeof modals) => {
      setModals(prev => ({ ...prev, [size]: true }))
    }

    const closeModal = (size: keyof typeof modals) => {
      setModals(prev => ({ ...prev, [size]: false }))
    }

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Button onClick={() => openModal('xs')} variant="outlined">Extra Small</Button>
          <Button onClick={() => openModal('sm')} variant="outlined">Small</Button>
          <Button onClick={() => openModal('md')} variant="outlined">Medium</Button>
          <Button onClick={() => openModal('lg')} variant="outlined">Large</Button>
          <Button onClick={() => openModal('xl')} variant="outlined">Extra Large</Button>
          <Button onClick={() => openModal('full')} variant="outlined">Full Screen</Button>
        </div>

        {/* XS Modal */}
        <Modal open={modals.xs} onOpenChange={() => closeModal('xs')} size="xs">
          <ModalHeader title="Extra Small Modal" />
          <ModalContent>
            <p>This is an extra small modal, perfect for simple confirmations.</p>
          </ModalContent>
          <ModalFooter>
            <Button onClick={() => closeModal('xs')} size="sm">Close</Button>
          </ModalFooter>
        </Modal>

        {/* SM Modal */}
        <Modal open={modals.sm} onOpenChange={() => closeModal('sm')} size="sm">
          <ModalHeader title="Small Modal" subtitle="Compact size for quick interactions" />
          <ModalContent>
            <p>Small modals are great for quick forms, alerts, or simple content that doesn't need much space.</p>
          </ModalContent>
          <ModalFooter>
            <Button onClick={() => closeModal('sm')} variant="outlined" size="sm">Cancel</Button>
            <Button onClick={() => closeModal('sm')} size="sm">Confirm</Button>
          </ModalFooter>
        </Modal>

        {/* MD Modal */}
        <Modal open={modals.md} onOpenChange={() => closeModal('md')} size="md">
          <ModalHeader title="Medium Modal" subtitle="The default size for most use cases" />
          <ModalContent>
            <p className="mb-4">Medium modals provide a good balance of space and focus. They're perfect for:</p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Contact forms</li>
              <li>Settings panels</li>
              <li>Content previews</li>
              <li>User profiles</li>
            </ul>
          </ModalContent>
          <ModalFooter>
            <Button onClick={() => closeModal('md')} variant="outlined">Cancel</Button>
            <Button onClick={() => closeModal('md')}>Save Changes</Button>
          </ModalFooter>
        </Modal>

        {/* LG Modal */}
        <Modal open={modals.lg} onOpenChange={() => closeModal('lg')} size="lg">
          <ModalHeader title="Large Modal" subtitle="More space for complex content" />
          <ModalContent>
            <div className="space-y-4">
              <p>Large modals provide more space for complex forms, detailed content, or multiple sections.</p>
              <Alert variant="info" description="This modal has more room for rich content and interactions." />
              <div className="grid grid-cols-2 gap-4">
                <Card variant="outlined" padding="sm">
                  <CardContent>
                    <h4 className="font-medium mb-2">Feature 1</h4>
                    <p className="text-sm text-gray-600">Description of the first feature.</p>
                  </CardContent>
                </Card>
                <Card variant="outlined" padding="sm">
                  <CardContent>
                    <h4 className="font-medium mb-2">Feature 2</h4>
                    <p className="text-sm text-gray-600">Description of the second feature.</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </ModalContent>
          <ModalFooter>
            <Button onClick={() => closeModal('lg')} variant="outlined">Cancel</Button>
            <Button onClick={() => closeModal('lg')}>Continue</Button>
          </ModalFooter>
        </Modal>

        {/* XL Modal */}
        <Modal open={modals.xl} onOpenChange={() => closeModal('xl')} size="xl">
          <ModalHeader title="Extra Large Modal" subtitle="Maximum space while maintaining focus" />
          <ModalContent>
            <div className="space-y-6">
              <p>Extra large modals are perfect for complex workflows, detailed forms, or rich content that needs more space.</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Left Section</h4>
                  <div className="space-y-3">
                    <Alert variant="success" title="Success" description="Your settings have been saved successfully." />
                    <Alert variant="warning" title="Warning" description="Some features may require a restart." />
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-3">Right Section</h4>
                  <div className="space-y-3">
                    <Card variant="filled" padding="sm">
                      <CardHeader title="Statistics" />
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="font-medium">Users</div>
                            <div className="text-gray-600">1,234</div>
                          </div>
                          <div>
                            <div className="font-medium">Sessions</div>
                            <div className="text-gray-600">5,678</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </ModalContent>
          <ModalFooter justify="between">
            <Button onClick={() => closeModal('xl')} variant="neutral">Skip</Button>
            <div className="flex gap-2">
              <Button onClick={() => closeModal('xl')} variant="outlined">Cancel</Button>
              <Button onClick={() => closeModal('xl')}>Apply Changes</Button>
            </div>
          </ModalFooter>
        </Modal>

        {/* Full Modal */}
        <Modal open={modals.full} onOpenChange={() => closeModal('full')} size="full">
          <ModalHeader title="Full Screen Modal" subtitle="Takes up the entire viewport" />
          <ModalContent>
            <div className="space-y-8">
              <p>Full screen modals are perfect for immersive experiences, complex applications, or when you need maximum space.</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card variant="elevated">
                  <CardHeader title="Dashboard" />
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">Monitor your application performance.</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>CPU Usage</span>
                        <span>45%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card variant="elevated">
                  <CardHeader title="Analytics" />
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">View detailed analytics and insights.</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Memory</span>
                        <span>78%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card variant="elevated">
                  <CardHeader title="Settings" />
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">Configure your application settings.</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Storage</span>
                        <span>23%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '23%' }}></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </ModalContent>
          <ModalFooter>
            <Button onClick={() => closeModal('full')} variant="outlined">Close</Button>
            <Button onClick={() => closeModal('full')}>Save All</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'All available modal sizes from extra small to full screen. Each size is optimized for different types of content and interactions.'
      }
    }
  }
}
// Drawer Examples
export const DrawerExamples: Story = {
  render: () => {
    const [drawers, setDrawers] = useState({
      left: false,
      right: false,
      top: false,
      bottom: false
    })

    const openDrawer = (side: keyof typeof drawers) => {
      setDrawers(prev => ({ ...prev, [side]: true }))
    }

    const closeDrawer = (side: keyof typeof drawers) => {
      setDrawers(prev => ({ ...prev, [side]: false }))
    }

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button onClick={() => openDrawer('left')} variant="outlined" leftIcon={<HamburgerMenuIcon className="w-4 h-4" />}>
            Left Drawer
          </Button>
          <Button onClick={() => openDrawer('right')} variant="outlined" leftIcon={<GearIcon className="w-4 h-4" />}>
            Right Drawer
          </Button>
          <Button onClick={() => openDrawer('top')} variant="outlined" leftIcon={<BellIcon className="w-4 h-4" />}>
            Top Drawer
          </Button>
          <Button onClick={() => openDrawer('bottom')} variant="outlined" leftIcon={<MagnifyingGlassIcon className="w-4 h-4" />}>
            Bottom Drawer
          </Button>
        </div>

        {/* Left Drawer - Navigation */}
        <Drawer open={drawers.left} onOpenChange={() => closeDrawer('left')} side="left" size="md">
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Navigation</h3>
            <nav className="space-y-2">
              <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                <PersonIcon className="w-5 h-5" />
                Profile
              </a>
              <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                <GearIcon className="w-5 h-5" />
                Settings
              </a>
              <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                <BellIcon className="w-5 h-5" />
                Notifications
              </a>
              <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                <FileTextIcon className="w-5 h-5" />
                Documents
              </a>
            </nav>
          </div>
        </Drawer>

        {/* Right Drawer - Settings */}
        <Drawer open={drawers.right} onOpenChange={() => closeDrawer('right')} side="right" size="lg">
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Settings Panel</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-3">Appearance</h4>
                <div className="space-y-3">
                  <Alert variant="info" description="Customize how the interface looks and feels." />
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Dark Mode</span>
                    <Button size="sm" variant="outlined">Toggle</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Compact View</span>
                    <Button size="sm" variant="outlined">Enable</Button>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Notifications</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Email Notifications</span>
                    <Button size="sm" variant="outlined">On</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Push Notifications</span>
                    <Button size="sm" variant="outlined">Off</Button>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t">
                <Button fullWidth>Save Settings</Button>
              </div>
            </div>
          </div>
        </Drawer>

        {/* Top Drawer - Notifications */}
        <Drawer open={drawers.top} onOpenChange={() => closeDrawer('top')} side="top" size="md">
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Notifications</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                <InfoCircledIcon className="w-5 h-5 text-blue-500 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium">System Update Available</p>
                  <p className="text-xs text-gray-600">A new version is ready to install</p>
                </div>
                <span className="text-xs text-gray-500">2m ago</span>
              </div>

              <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                <CheckCircledIcon className="w-5 h-5 text-green-500 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Backup Completed</p>
                  <p className="text-xs text-gray-600">Your data has been successfully backed up</p>
                </div>
                <span className="text-xs text-gray-500">1h ago</span>
              </div>

              <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                <ExclamationTriangleIcon className="w-5 h-5 text-yellow-500 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Storage Almost Full</p>
                  <p className="text-xs text-gray-600">Consider upgrading your storage plan</p>
                </div>
                <span className="text-xs text-gray-500">3h ago</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t">
              <Button variant="outlined" size="sm" fullWidth>View All Notifications</Button>
            </div>
          </div>
        </Drawer>

        {/* Bottom Drawer - Search */}
        <Drawer open={drawers.bottom} onOpenChange={() => closeDrawer('bottom')} side="bottom" size="lg">
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Search & Filter</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Search Query</label>
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search documents, files, or content..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option>All Types</option>
                    <option>Documents</option>
                    <option>Images</option>
                    <option>Videos</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Date</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option>Any Time</option>
                    <option>Last Week</option>
                    <option>Last Month</option>
                    <option>Last Year</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Size</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option>Any Size</option>
                    <option>Small (&lt; 1MB)</option>
                    <option>Medium (1-10MB)</option>
                    <option>Large (&gt; 10MB)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Status</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option>All Status</option>
                    <option>Published</option>
                    <option>Draft</option>
                    <option>Archived</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button variant="outlined" onClick={() => closeDrawer('bottom')}>Clear Filters</Button>
                <Button onClick={() => closeDrawer('bottom')}>Apply Search</Button>
              </div>
            </div>
          </div>
        </Drawer>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Drawer examples showing different sides and use cases: navigation (left), settings (right), notifications (top), and search/filters (bottom).'
      }
    }
  }
}
// Common Use Cases
export const CommonUseCases: Story = {
  render: () => {
    const [modals, setModals] = useState({
      confirmation: false,
      form: false,
      gallery: false,
      profile: false
    })

    const openModal = (type: keyof typeof modals) => {
      setModals(prev => ({ ...prev, [type]: true }))
    }

    const closeModal = (type: keyof typeof modals) => {
      setModals(prev => ({ ...prev, [type]: false }))
    }

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button onClick={() => openModal('confirmation')} variant="danger">
            Delete Item
          </Button>
          <Button onClick={() => openModal('form')} variant="primary">
            Edit Profile
          </Button>
          <Button onClick={() => openModal('gallery')} variant="outlined">
            View Gallery
          </Button>
          <Button onClick={() => openModal('profile')} variant="secondary">
            User Details
          </Button>
        </div>

        {/* Confirmation Modal */}
        <Modal open={modals.confirmation} onOpenChange={() => closeModal('confirmation')} size="sm">
          <ModalHeader title="Delete Item" />
          <ModalContent>
            <div className="flex items-start gap-3">
              <ExclamationTriangleIcon className="w-6 h-6 text-red-500 mt-1" />
              <div>
                <p className="font-medium text-gray-900 mb-1">Are you sure you want to delete this item?</p>
                <p className="text-sm text-gray-600">This action cannot be undone. The item will be permanently removed from your account.</p>
              </div>
            </div>
          </ModalContent>
          <ModalFooter>
            <Button onClick={() => closeModal('confirmation')} variant="outlined">Cancel</Button>
            <Button onClick={() => closeModal('confirmation')} variant="danger" leftIcon={<TrashIcon className="w-4 h-4" />}>
              Delete
            </Button>
          </ModalFooter>
        </Modal>

        {/* Form Modal */}
        <Modal open={modals.form} onOpenChange={() => closeModal('form')} size="md">
          <ModalHeader title="Edit Profile" subtitle="Update your personal information" />
          <ModalContent>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">First Name</label>
                  <input
                    type="text"
                    defaultValue="John"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Last Name</label>
                  <input
                    type="text"
                    defaultValue="Doe"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  defaultValue="john.doe@example.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Bio</label>
                <textarea
                  rows={3}
                  defaultValue="Software developer passionate about creating great user experiences."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <Alert variant="info" description="Changes will be saved to your profile immediately." />
            </form>
          </ModalContent>
          <ModalFooter>
            <Button onClick={() => closeModal('form')} variant="outlined">Cancel</Button>
            <Button onClick={() => closeModal('form')} leftIcon={<CheckCircledIcon className="w-4 h-4" />}>
              Save Changes
            </Button>
          </ModalFooter>
        </Modal>

        {/* Gallery Modal */}
        <Modal open={modals.gallery} onOpenChange={() => closeModal('gallery')} size="xl">
          <ModalHeader title="Image Gallery" subtitle="Browse and manage your images" />
          <ModalContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="relative group">
                  <div className="aspect-square bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                    <ImageIcon className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                    <Button size="sm" variant="neutral" className="text-white hover:bg-white/20">
                      <Share1Icon className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="neutral" className="text-white hover:bg-white/20">
                      <DownloadIcon className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="neutral" className="text-white hover:bg-white/20">
                      <TrashIcon className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ModalContent>
          <ModalFooter justify="between">
            <span className="text-sm text-gray-500">6 images selected</span>
            <div className="flex gap-2">
              <Button onClick={() => closeModal('gallery')} variant="outlined">Close</Button>
              <Button onClick={() => closeModal('gallery')} leftIcon={<DownloadIcon className="w-4 h-4" />}>
                Download All
              </Button>
            </div>
          </ModalFooter>
        </Modal>

        {/* Profile Modal */}
        <Modal open={modals.profile} onOpenChange={() => closeModal('profile')} size="lg">
          <ModalHeader>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                <PersonIcon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">John Doe</h2>
                <p className="text-sm text-gray-600">Software Developer</p>
              </div>
            </div>
          </ModalHeader>
          <ModalContent>
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-3">Contact Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Email:</span>
                    <p className="font-medium">john.doe@example.com</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Phone:</span>
                    <p className="font-medium">+1 (555) 123-4567</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Location:</span>
                    <p className="font-medium">San Francisco, CA</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Timezone:</span>
                    <p className="font-medium">PST (UTC-8)</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3">Recent Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Updated profile information</span>
                    <span className="text-gray-500 ml-auto">2 hours ago</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Completed project milestone</span>
                    <span className="text-gray-500 ml-auto">1 day ago</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span>Joined team meeting</span>
                    <span className="text-gray-500 ml-auto">3 days ago</span>
                  </div>
                </div>
              </div>
            </div>
          </ModalContent>
          <ModalFooter>
            <Button onClick={() => closeModal('profile')} variant="outlined">Close</Button>
            <Button onClick={() => closeModal('profile')} leftIcon={<Pencil1Icon className="w-4 h-4" />}>
              Edit Profile
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Common modal use cases including confirmations, forms, galleries, and user profiles. Each example shows best practices for different types of content.'
      }
    }
  }
}
// Drawer Sizes
export const DrawerSizes: Story = {
  render: () => {
    const [drawers, setDrawers] = useState({
      xs: false,
      sm: false,
      md: false,
      lg: false,
      xl: false
    })

    const openDrawer = (size: keyof typeof drawers) => {
      setDrawers(prev => ({ ...prev, [size]: true }))
    }

    const closeDrawer = (size: keyof typeof drawers) => {
      setDrawers(prev => ({ ...prev, [size]: false }))
    }

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Button onClick={() => openDrawer('xs')} variant="outlined">XS Drawer</Button>
          <Button onClick={() => openDrawer('sm')} variant="outlined">SM Drawer</Button>
          <Button onClick={() => openDrawer('md')} variant="outlined">MD Drawer</Button>
          <Button onClick={() => openDrawer('lg')} variant="outlined">LG Drawer</Button>
          <Button onClick={() => openDrawer('xl')} variant="outlined">XL Drawer</Button>
        </div>

        {/* XS Drawer */}
        <Drawer open={drawers.xs} onOpenChange={() => closeDrawer('xs')} side="right" size="xs">
          <div className="p-4">
            <h3 className="font-semibold mb-3">Extra Small</h3>
            <p className="text-sm text-gray-600 mb-4">Perfect for simple menus or quick actions.</p>
            <nav className="space-y-1">
              <a href="#" className="block px-2 py-1 text-sm hover:bg-gray-100 rounded">Home</a>
              <a href="#" className="block px-2 py-1 text-sm hover:bg-gray-100 rounded">About</a>
              <a href="#" className="block px-2 py-1 text-sm hover:bg-gray-100 rounded">Contact</a>
            </nav>
          </div>
        </Drawer>

        {/* SM Drawer */}
        <Drawer open={drawers.sm} onOpenChange={() => closeDrawer('sm')} side="right" size="sm">
          <div className="p-6">
            <h3 className="font-semibold mb-4">Small Drawer</h3>
            <p className="text-sm text-gray-600 mb-4">Good for navigation menus and simple forms.</p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Quick Search</label>
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>
              <div>
                <h4 className="font-medium mb-2">Categories</h4>
                <div className="space-y-1">
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="rounded" />
                    Documents
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="rounded" />
                    Images
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" className="rounded" />
                    Videos
                  </label>
                </div>
              </div>
            </div>
          </div>
        </Drawer>

        {/* MD Drawer */}
        <Drawer open={drawers.md} onOpenChange={() => closeDrawer('md')} side="right" size="md">
          <div className="p-6">
            <h3 className="font-semibold mb-4">Medium Drawer</h3>
            <p className="text-sm text-gray-600 mb-6">The default size, perfect for most use cases including forms and detailed content.</p>

            <div className="space-y-6">
              <Alert variant="info" description="This is the recommended size for most drawer use cases." />

              <div>
                <h4 className="font-medium mb-3">User Preferences</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Display Name</label>
                    <input
                      type="text"
                      defaultValue="John Doe"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email Notifications</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                      <option>All notifications</option>
                      <option>Important only</option>
                      <option>None</option>
                    </select>
                  </div>
                  <div>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">Enable dark mode</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Drawer>

        {/* LG Drawer */}
        <Drawer open={drawers.lg} onOpenChange={() => closeDrawer('lg')} side="right" size="lg">
          <div className="p-6">
            <h3 className="font-semibold mb-4">Large Drawer</h3>
            <p className="text-sm text-gray-600 mb-6">More space for complex forms, detailed settings, or rich content.</p>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <Card variant="outlined" padding="sm">
                  <CardHeader title="Statistics" />
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Total Views</span>
                        <span className="font-medium">12,345</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Unique Visitors</span>
                        <span className="font-medium">8,901</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Bounce Rate</span>
                        <span className="font-medium">23%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card variant="outlined" padding="sm">
                  <CardHeader title="Recent Activity" />
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Page updated</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span>User registered</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span>Comment posted</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h4 className="font-medium mb-3">Advanced Settings</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">API Endpoint</label>
                    <input
                      type="url"
                      defaultValue="https://api.example.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Timeout (ms)</label>
                    <input
                      type="number"
                      defaultValue="5000"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Drawer>

        {/* XL Drawer */}
        <Drawer open={drawers.xl} onOpenChange={() => closeDrawer('xl')} side="right" size="xl">
          <div className="p-6">
            <h3 className="font-semibold mb-4">Extra Large Drawer</h3>
            <p className="text-sm text-gray-600 mb-6">Maximum space for complex interfaces, dashboards, or detailed forms.</p>

            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <Card variant="elevated" padding="sm">
                  <CardHeader title="Performance" />
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>CPU</span>
                          <span>45%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Memory</span>
                          <span>78%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card variant="elevated" padding="sm">
                  <CardHeader title="Network" />
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Requests</span>
                        <span className="font-medium">1,234</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Errors</span>
                        <span className="font-medium text-red-600">12</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Avg Response</span>
                        <span className="font-medium">245ms</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card variant="elevated" padding="sm">
                  <CardHeader title="Storage" />
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Used</span>
                        <span className="font-medium">2.4 GB</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Available</span>
                        <span className="font-medium">7.6 GB</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total</span>
                        <span className="font-medium">10 GB</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h4 className="font-medium mb-3">Configuration</h4>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Database URL</label>
                      <input
                        type="text"
                        defaultValue="postgresql://localhost:5432/mydb"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Redis URL</label>
                      <input
                        type="text"
                        defaultValue="redis://localhost:6379"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Environment</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                        <option>Development</option>
                        <option>Staging</option>
                        <option>Production</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Log Level</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                        <option>Debug</option>
                        <option>Info</option>
                        <option>Warning</option>
                        <option>Error</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Drawer>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'All available drawer sizes from extra small to extra large. Each size is optimized for different amounts of content and complexity.'
      }
    }
  }
}

// Interactive Example
export const Interactive: Story = {
  render: () => {
    const [modalOpen, setModalOpen] = useState(false)
    const [drawerOpen, setDrawerOpen] = useState(false)

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <Button onClick={() => setModalOpen(true)} variant="primary">
            Open Modal
          </Button>
          <Button onClick={() => setDrawerOpen(true)} variant="secondary">
            Open Drawer
          </Button>
        </div>

        <Modal open={modalOpen} onOpenChange={setModalOpen} size="md">
          <ModalHeader title="Interactive Modal" subtitle="Test different modal features" />
          <ModalContent>
            <div className="space-y-4">
              <p>This is an interactive modal where you can test different features:</p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Click the backdrop to close (if enabled)</li>
                <li>Press Escape key to close (if enabled)</li>
                <li>Use the close button in the top-right</li>
                <li>Use the action buttons in the footer</li>
              </ul>
              <Alert variant="info" description="Try different interactions to see how the modal behaves." />
            </div>
          </ModalContent>
          <ModalFooter>
            <Button onClick={() => setModalOpen(false)} variant="outlined">Cancel</Button>
            <Button onClick={() => setModalOpen(false)}>Confirm</Button>
          </ModalFooter>
        </Modal>

        <Drawer open={drawerOpen} onOpenChange={setDrawerOpen} side="right" size="md">
          <div className="p-6">
            <h3 className="font-semibold mb-4">Interactive Drawer</h3>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">This drawer demonstrates the slide-in animation and interaction patterns.</p>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Feature 1</span>
                  <Button size="sm" variant="outlined">Toggle</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Feature 2</span>
                  <Button size="sm" variant="outlined">Enable</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Feature 3</span>
                  <Button size="sm" variant="outlined">Configure</Button>
                </div>
              </div>

              <div className="pt-4 border-t">
                <Button onClick={() => setDrawerOpen(false)} fullWidth>
                  Close Drawer
                </Button>
              </div>
            </div>
          </div>
        </Drawer>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive examples where you can test modal and drawer functionality with different configurations.'
      }
    }
  }
}
