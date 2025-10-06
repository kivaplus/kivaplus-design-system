import {
  ArchiveIcon,
  CodeIcon,
  Component1Icon,
  FileIcon,
  FileTextIcon,
  GearIcon,
  HomeIcon,
  LayersIcon,
  PersonIcon,
  StarIcon
} from '@radix-ui/react-icons'
import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Breadcrumb, BreadcrumbItem, useBreadcrumb } from '../components/breadcrumb'
import { Button } from '../components/button'

const meta = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Breadcrumb components provide navigation hierarchy and help users understand their current location within an application.

## Breadcrumb Component
- **Hierarchical Navigation**: Shows the path from root to current page
- **Interactive Links**: Clickable navigation to parent pages
- **Current Page Indicator**: Non-clickable current page with distinct styling
- **Home Icon**: Optional home button for quick navigation to root
- **Custom Separators**: Configurable separator icons between items
- **Overflow Handling**: Automatic collapse with "..." for long paths
- **Icon Support**: Icons for enhanced visual hierarchy
- **Accessibility**: Full ARIA support and keyboard navigation

## Features
- **Max Items**: Limit visible items with smart truncation
- **Custom Icons**: Support for custom home and item icons
- **Click Handling**: Configurable click behavior for navigation
- **Responsive**: Adapts to different screen sizes
- **Hook Integration**: useBreadcrumb hook for state management

## Usage
Use breadcrumbs for:
- **File system navigation** and folder hierarchies
- **Multi-step processes** and wizard navigation
- **Category browsing** in e-commerce or content sites
- **Admin panels** and dashboard navigation
- **Documentation** and help system navigation
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    maxItems: {
      control: { type: 'number', min: 2, max: 10 },
      description: 'Maximum number of visible items before truncation'
    },
    showHome: {
      control: 'boolean',
      description: 'Show home icon at the beginning'
    }
  },
} satisfies Meta<typeof Breadcrumb>

export default meta
type Story = StoryObj<typeof meta>

// Sample breadcrumb items for stories
const sampleItems: BreadcrumbItem[] = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Projects', href: '/projects' },
  { label: 'Website Redesign', href: '/projects/website-redesign' },
  { label: 'Components', href: '/projects/website-redesign/components', current: true }
]

// Default story
export const Default: Story = {
  args: {
    items: sampleItems
  }
}

// Basic Examples
export const BasicExamples: Story = {
  args: {
    items: []
  },
  render: () => (
    <div className="space-y-8 w-full max-w-4xl">
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Simple Navigation:</h4>
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Products', href: '/products' },
            { label: 'Laptops', href: '/products/laptops', current: true }
          ]}
        />
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Without Home Icon:</h4>
        <Breadcrumb
          showHome={false}
          items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Users', href: '/users' },
            { label: 'Profile', href: '/users/profile', current: true }
          ]}
        />
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Single Level:</h4>
        <Breadcrumb
          items={[
            { label: 'Settings', href: '/settings', current: true }
          ]}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic breadcrumb examples showing simple navigation paths, with and without home icons, and single-level navigation.'
      }
    }
  }
}

// With Icons
export const WithIcons: Story = {
  args: {
    items: []
  },
  render: () => (
    <div className="space-y-8 w-full max-w-4xl">
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">File System Navigation:</h4>
        <Breadcrumb
          homeIcon={<GearIcon />}
          items={[
            { label: 'Documents', href: '/documents', icon: <FileIcon /> },
            { label: 'Projects', href: '/documents/projects', icon: <FileIcon /> },
            { label: 'README.md', href: '/documents/projects/readme', icon: <FileTextIcon />, current: true }
          ]}
        />
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Admin Panel:</h4>
        <Breadcrumb
          homeIcon={<HomeIcon />}
          items={[
            { label: 'Admin', href: '/admin', icon: <GearIcon /> },
            { label: 'Users', href: '/admin/users', icon: <PersonIcon /> },
            { label: 'John Doe', href: '/admin/users/john-doe', icon: <PersonIcon />, current: true }
          ]}
        />
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Development Tools:</h4>
        <Breadcrumb
          homeIcon={<CodeIcon />}
          items={[
            { label: 'Components', href: '/components', icon: <Component1Icon /> },
            { label: 'UI Library', href: '/components/ui', icon: <LayersIcon /> },
            { label: 'Button', href: '/components/ui/button', icon: <StarIcon />, current: true }
          ]}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Breadcrumbs with icons for enhanced visual hierarchy. Icons help users quickly identify different types of content and navigation levels.'
      }
    }
  }
}

// Custom Separators
export const CustomSeparators: Story = {
  args: {
    items: []
  },
  render: () => (
    <div className="space-y-8 w-full max-w-4xl">
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Slash Separator:</h4>
        <Breadcrumb
          separator={<span className="text-gray-400">/</span>}
          items={[
            { label: 'Home', href: '/' },
            { label: 'Blog', href: '/blog' },
            { label: 'React Tips', href: '/blog/react-tips', current: true }
          ]}
        />
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Dot Separator:</h4>
        <Breadcrumb
          separator={<span className="text-gray-400">•</span>}
          items={[
            { label: 'Store', href: '/store' },
            { label: 'Electronics', href: '/store/electronics' },
            { label: 'Smartphones', href: '/store/electronics/smartphones', current: true }
          ]}
        />
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Custom Arrow:</h4>
        <Breadcrumb
          separator={
            <svg className="w-3 h-3 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          }
          items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Analytics', href: '/analytics' },
            { label: 'Reports', href: '/analytics/reports', current: true }
          ]}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Custom separator examples showing different visual styles: slash (/), dot (•), and custom arrow icons for different design aesthetics.'
      }
    }
  }
}

// Overflow Handling
export const OverflowHandling: Story = {
  args: {
    items: []
  },
  render: () => {
    const longPath: BreadcrumbItem[] = [
      { label: 'Root', href: '/' },
      { label: 'Level 1', href: '/level1' },
      { label: 'Level 2', href: '/level1/level2' },
      { label: 'Level 3', href: '/level1/level2/level3' },
      { label: 'Level 4', href: '/level1/level2/level3/level4' },
      { label: 'Level 5', href: '/level1/level2/level3/level4/level5' },
      { label: 'Current Page', href: '/level1/level2/level3/level4/level5/current', current: true }
    ]

    return (
      <div className="space-y-8 w-full max-w-4xl">
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Max 4 Items (Default):</h4>
          <Breadcrumb items={longPath} maxItems={4} />
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Max 3 Items:</h4>
          <Breadcrumb items={longPath} maxItems={3} />
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Max 6 Items:</h4>
          <Breadcrumb items={longPath} maxItems={6} />
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">No Limit:</h4>
          <Breadcrumb items={longPath} maxItems={10} />
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Overflow handling with different maxItems settings. Long paths are automatically truncated with "..." to maintain clean layouts while preserving navigation context.'
      }
    }
  }
}

// Interactive Navigation
export const InteractiveNavigation: Story = {
  args: {
    items: []
  },
  render: () => {
    const [currentPath, setCurrentPath] = useState('/dashboard/projects/website-redesign/components')
    const [navigationLog, setNavigationLog] = useState<string[]>([])

    const pathSegments = currentPath.split('/').filter(Boolean)
    const breadcrumbItems: BreadcrumbItem[] = pathSegments.map((segment, index) => {
      const href = '/' + pathSegments.slice(0, index + 1).join('/')
      const isLast = index === pathSegments.length - 1

      return {
        label: segment.charAt(0).toUpperCase() + segment.slice(1).replace('-', ' '),
        href,
        current: isLast
      }
    })

    const handleNavigation = (item: BreadcrumbItem, index: number) => {
      if (item.href) {
        setCurrentPath(item.href)
        setNavigationLog(prev => [...prev, `Navigated to: ${item.label} (${item.href})`])
      }
    }

    const resetPath = () => {
      setCurrentPath('/dashboard/projects/website-redesign/components')
      setNavigationLog([])
    }

    return (
      <div className="space-y-6 w-full max-w-4xl">
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Interactive Breadcrumb:</h4>
          <Breadcrumb
            items={breadcrumbItems}
            onItemClick={handleNavigation}
          />
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Current Path:</h4>
          <code className="bg-gray-100 px-3 py-2 rounded text-sm">{currentPath}</code>
        </div>

        {navigationLog.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">Navigation Log:</h4>
            <div className="bg-gray-50 p-3 rounded max-h-32 overflow-y-auto">
              {navigationLog.map((log, index) => (
                <div key={index} className="text-xs text-gray-600 mb-1">
                  {log}
                </div>
              ))}
            </div>
          </div>
        )}

        <Button
          onClick={resetPath}
          variant="neutral"
          size="sm"
        >
          Reset Path
        </Button>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive breadcrumb with click handling. Click on any breadcrumb item to navigate and see the navigation log. Demonstrates real-world usage with dynamic path updates.'
      }
    }
  }
}

// Using the Hook
export const UsingTheHook: Story = {
  args: {
    items: []
  },
  render: () => {
    const initialItems: BreadcrumbItem[] = [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' }
    ]

    const { items, updateBreadcrumb, addBreadcrumb, removeBreadcrumb } = useBreadcrumb(initialItems)

    const addCategory = () => {
      addBreadcrumb({ label: 'Electronics', href: '/products/electronics' })
    }

    const addProduct = () => {
      addBreadcrumb({ label: 'Laptop', href: '/products/electronics/laptop', current: true })
    }

    const removeLastItem = () => {
      if (items.length > 1) {
        removeBreadcrumb(items.length - 1)
      }
    }

    const resetBreadcrumb = () => {
      updateBreadcrumb(initialItems)
    }

    return (
      <div className="space-y-6 w-full max-w-4xl">
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Dynamic Breadcrumb:</h4>
          <Breadcrumb items={items} />
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button
            onClick={addCategory}
            variant="primary"
            size="sm"
            disabled={items.some(item => item.label === 'Electronics')}
          >
            Add Category
          </Button>
          <Button
            onClick={addProduct}
            variant="primary"
            size="sm"
            disabled={items.some(item => item.label === 'Laptop')}
          >
            Add Product
          </Button>
          <Button
            onClick={removeLastItem}
            variant="danger"
            size="sm"
            disabled={items.length <= 1}
          >
            Remove Last
          </Button>
          <Button
            onClick={resetBreadcrumb}
            variant="secondary"
            size="sm"
          >
            Reset
          </Button>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Current Items:</h4>
          <pre className="bg-gray-100 p-3 rounded text-xs overflow-x-auto">
            {JSON.stringify(items, null, 2)}
          </pre>
        </div>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Using the useBreadcrumb hook for dynamic breadcrumb management. Add, remove, and update breadcrumb items programmatically with built-in state management.'
      }
    }
  }
}

// Real-world Examples
export const RealWorldExamples: Story = {
  args: {
    items: []
  },
  render: () => (
    <div className="space-y-8 w-full max-w-4xl">
      {/* E-commerce Navigation */}
      <div>
        <h4 className="text-lg font-semibold mb-4">E-commerce Product Page</h4>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Electronics', href: '/electronics', icon: <LayersIcon /> },
              { label: 'Computers', href: '/electronics/computers', icon: <Component1Icon /> },
              { label: 'Laptops', href: '/electronics/computers/laptops', icon: <ArchiveIcon /> },
              { label: 'MacBook Pro 16"', href: '/electronics/computers/laptops/macbook-pro-16', current: true }
            ]}
          />
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h3 className="text-xl font-semibold">MacBook Pro 16"</h3>
            <p className="text-gray-600 mt-1">Apple M2 Pro chip with 12-core CPU and 19-core GPU</p>
          </div>
        </div>
      </div>

      {/* Documentation Site */}
      <div>
        <h4 className="text-lg font-semibold mb-4">Documentation Navigation</h4>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <Breadcrumb
            homeIcon={<FileTextIcon />}
            separator={<span className="text-gray-400">/</span>}
            items={[
              { label: 'Docs', href: '/docs', icon: <FileTextIcon /> },
              { label: 'Components', href: '/docs/components', icon: <Component1Icon /> },
              { label: 'Form Controls', href: '/docs/components/form-controls', icon: <LayersIcon /> },
              { label: 'Button', href: '/docs/components/form-controls/button', icon: <StarIcon />, current: true }
            ]}
          />
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h3 className="text-xl font-semibold">Button Component</h3>
            <p className="text-gray-600 mt-1">Interactive button component with multiple variants and sizes</p>
          </div>
        </div>
      </div>

      {/* Admin Dashboard */}
      <div>
        <h4 className="text-lg font-semibold mb-4">Admin Dashboard</h4>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <Breadcrumb
            homeIcon={<HomeIcon />}
            maxItems={5}
            items={[
              { label: 'Dashboard', href: '/admin', icon: <HomeIcon /> },
              { label: 'User Management', href: '/admin/users', icon: <PersonIcon /> },
              { label: 'Roles & Permissions', href: '/admin/users/roles', icon: <GearIcon /> },
              { label: 'Administrator', href: '/admin/users/roles/administrator', icon: <StarIcon /> },
              { label: 'Edit Permissions', href: '/admin/users/roles/administrator/edit', current: true }
            ]}
          />
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h3 className="text-xl font-semibold">Edit Administrator Permissions</h3>
            <p className="text-gray-600 mt-1">Manage permissions for the Administrator role</p>
          </div>
        </div>
      </div>

      {/* File Manager */}
      <div>
        <h4 className="text-lg font-semibold mb-4">File Manager</h4>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <Breadcrumb
            homeIcon={<FileIcon />}
            separator={<span className="text-gray-400 mx-1">›</span>}
            items={[
              { label: 'Documents', href: '/files/documents', icon: <FileIcon /> },
              { label: 'Projects', href: '/files/documents/projects', icon: <FileIcon /> },
              { label: 'Website Redesign', href: '/files/documents/projects/website-redesign', icon: <FileIcon /> },
              { label: 'Assets', href: '/files/documents/projects/website-redesign/assets', icon: <FileIcon /> },
              { label: 'Images', href: '/files/documents/projects/website-redesign/assets/images', icon: <FileIcon />, current: true }
            ]}
            maxItems={4}
          />
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center p-3 border border-gray-200 rounded">
                <div className="w-12 h-12 bg-blue-100 rounded mx-auto mb-2"></div>
                <p className="text-xs">hero.jpg</p>
              </div>
              <div className="text-center p-3 border border-gray-200 rounded">
                <div className="w-12 h-12 bg-green-100 rounded mx-auto mb-2"></div>
                <p className="text-xs">logo.png</p>
              </div>
              <div className="text-center p-3 border border-gray-200 rounded">
                <div className="w-12 h-12 bg-purple-100 rounded mx-auto mb-2"></div>
                <p className="text-xs">banner.svg</p>
              </div>
              <div className="text-center p-3 border border-gray-200 rounded">
                <div className="w-12 h-12 bg-orange-100 rounded mx-auto mb-2"></div>
                <p className="text-xs">icon.ico</p>
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
        story: 'Real-world examples showing breadcrumbs in e-commerce, documentation, admin dashboards, and file managers with different styling approaches and navigation patterns.'
      }
    }
  }
}

// Interactive Example
export const Interactive: Story = {
  args: {
    items: sampleItems,
    maxItems: 4,
    showHome: true
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive breadcrumb where you can test different props using the controls panel below. Perfect for testing navigation hierarchies and overflow behavior.'
      }
    }
  }
}
