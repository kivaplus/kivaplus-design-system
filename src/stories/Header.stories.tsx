import type { Meta, StoryObj } from '@storybook/react'
import { Avatar } from '../components/avatar'
import { Breadcrumb } from '../components/breadcrumb'
import { Button } from '../components/button'
import { Chip } from '../components/chip'
import { HeaderGroup, PageHeader, SectionHeader, StatsHeader } from '../components/header-group'

const meta: Meta<typeof HeaderGroup> = {
  title: 'Components/Header',
  component: HeaderGroup,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Header components for page and section headers. Built with centralized CSS component classes for consistent styling.'
      }
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'centered'],
      description: 'Visual variant of the header'
    },
    sticky: {
      control: 'boolean',
      description: 'Whether the header should be sticky'
    },
    bordered: {
      control: 'boolean',
      description: 'Whether to show bottom border'
    },
    title: {
      control: 'text',
      description: 'Main title text'
    },
    subtitle: {
      control: 'text',
      description: 'Subtitle text'
    },
    description: {
      control: 'text',
      description: 'Description text'
    }
  }
}

export default meta
type Story = StoryObj<typeof HeaderGroup>

// Interactive HeaderGroup with Controls
export const Interactive: Story = {
  args: {
    title: 'Interactive Header',
    subtitle: 'Subtitle text',
    description: 'Use the controls to test different props and variants',
    variant: 'default',
    sticky: false,
    bordered: false
  },
  render: (args) => (
    <div className="min-h-screen bg-gray-50">
      <HeaderGroup {...args} />
      <div className="p-8">
        <p className="text-gray-600">Content below the header...</p>
      </div>
    </div>
  )
}

// HeaderGroup Variants
export const HeaderGroupVariants: Story = {
  render: () => (
    <div className="space-y-12 bg-gray-50 min-h-screen">
      <div>
        <h2 className="text-xl font-semibold mb-6 px-8 pt-8">Default Variant</h2>
        <HeaderGroup
          title="Project Dashboard"
          subtitle="Analytics"
          description="Monitor your project performance and key metrics"
          actions={
            <div className="flex gap-3">
              <Button variant="outlined" size="sm">Export</Button>
              <Button variant="primary" size="sm">New Project</Button>
            </div>
          }
        />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-6 px-8">Centered Variant</h2>
        <HeaderGroup
          variant="centered"
          title="Welcome to Your Dashboard"
          subtitle="Getting Started"
          description="Everything you need to manage your projects and track progress in one place"
          actions={
            <Button variant="primary">Get Started</Button>
          }
        />
      </div>
    </div>
  )
}

// HeaderGroup with Avatar and Badge
export const HeaderGroupWithExtras: Story = {
  render: () => (
    <div className="bg-gray-50 min-h-screen">
      <HeaderGroup
        title="John Doe"
        subtitle="Senior Developer"
        description="Full-stack developer with 8+ years of experience in React, Node.js, and cloud technologies"
        avatar={
          <Avatar size="xl" fallback="JD" />
        }
        badge={
          <Chip variant="success" size="sm">Active</Chip>
        }
        actions={
          <div className="flex gap-3">
            <Button variant="outlined" size="sm">Message</Button>
            <Button variant="primary" size="sm">Follow</Button>
          </div>
        }
      />
    </div>
  )
}

// HeaderGroup with Breadcrumb and Tabs
export const HeaderGroupWithNavigation: Story = {
  render: () => (
    <div className="bg-gray-50 min-h-screen">
      <HeaderGroup
        title="User Settings"
        subtitle="Account Management"
        description="Manage your account settings, preferences, and security options"
        breadcrumb={
          <Breadcrumb
            items={[
              { label: 'Dashboard', href: '#' },
              { label: 'Account', href: '#' },
              { label: 'Settings', current: true }
            ]}
          />
        }
        tabs={
          <div className="flex space-x-8 border-b border-gray-200">
            <button className="py-2 px-1 border-b-2 border-blue-500 text-blue-600 font-medium">Profile</button>
            <button className="py-2 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700">Security</button>
            <button className="py-2 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700">Notifications</button>
            <button className="py-2 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700">Billing</button>
          </div>
        }
        actions={
          <Button variant="primary" size="sm">Save Changes</Button>
        }
      />
    </div>
  )
}

// PageHeader Examples
export const PageHeaderExamples: Story = {
  render: () => (
    <div className="space-y-8 bg-gray-50 min-h-screen">
      <div>
        <h2 className="text-xl font-semibold mb-6 px-8 pt-8">Basic Page Header</h2>
        <PageHeader
          title="Analytics Dashboard"
          subtitle="Overview"
          description="Track your key performance indicators and business metrics"
          actions={
            <div className="flex gap-3">
              <Button variant="outlined" size="sm">Export Data</Button>
              <Button variant="primary" size="sm">Create Report</Button>
            </div>
          }
        />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-6 px-8">Page Header with Loading State</h2>
        <PageHeader
          loading={true}
          title="Loading..."
          subtitle="Please wait"
          description="Loading page content..."
        />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-6 px-8">Page Header with Skeleton</h2>
        <PageHeader
          skeleton={true}
          title=""
          subtitle=""
          description=""
        />
      </div>
    </div>
  )
}

// SectionHeader Examples
export const SectionHeaderExamples: Story = {
  render: () => (
    <div className="space-y-8 p-8 bg-gray-50 min-h-screen">
      <div>
        <h2 className="text-xl font-semibold mb-6">Section Headers - Different Levels</h2>

        <div className="space-y-6 bg-white p-6 rounded-lg">
          <SectionHeader
            level={2}
            title="Recent Activity"
            subtitle="Last 30 days"
            description="Overview of your recent account activity and changes"
            actions={
              <Button variant="outlined" size="sm">View All</Button>
            }
          />

          <SectionHeader
            level={3}
            title="Team Members"
            description="Manage your team and their permissions"
            actions={
              <Button variant="primary" size="sm">Add Member</Button>
            }
          />

          <SectionHeader
            level={4}
            title="Security Settings"
            description="Configure your account security preferences"
            divider={true}
          />

          <SectionHeader
            level={5}
            title="API Keys"
            description="Manage your API access keys"
          />

          <SectionHeader
            level={6}
            title="Advanced Options"
            description="Additional configuration options"
          />
        </div>
      </div>
    </div>
  )
}

// StatsHeader Examples
export const StatsHeaderExamples: Story = {
  render: () => (
    <div className="bg-gray-50 min-h-screen">
      <StatsHeader
        title="Sales Dashboard"
        subtitle="Q4 2024"
        description="Quarterly performance overview and key business metrics"
        actions={
          <div className="flex gap-3">
            <Button variant="outlined" size="sm">Download Report</Button>
            <Button variant="primary" size="sm">Share Dashboard</Button>
          </div>
        }
        stats={[
          {
            label: 'Total Revenue',
            value: '$124,563',
            change: '+12.5%',
            trend: 'up',
            icon: (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            )
          },
          {
            label: 'New Customers',
            value: '1,429',
            change: '+8.2%',
            trend: 'up',
            icon: (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            )
          },
          {
            label: 'Conversion Rate',
            value: '3.24%',
            change: '-0.5%',
            trend: 'down',
            icon: (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            )
          },
          {
            label: 'Average Order',
            value: '$87.23',
            change: '0.0%',
            trend: 'neutral',
            icon: (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            )
          }
        ]}
      />
    </div>
  )
}

// Sticky Header Example
export const StickyHeaderExample: Story = {
  render: () => (
    <div className="bg-gray-50">
      <HeaderGroup
        title="Sticky Navigation"
        subtitle="Always Visible"
        description="This header will stick to the top when scrolling"
        sticky={true}
        bordered={true}
        actions={
          <div className="flex gap-3">
            <Button variant="outlined" size="sm">Menu</Button>
            <Button variant="primary" size="sm">Account</Button>
          </div>
        }
      />

      {/* Long content to demonstrate sticky behavior */}
      <div className="p-8 space-y-8">
        {Array.from({ length: 20 }, (_, i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-2">Content Section {i + 1}</h3>
            <p className="text-gray-600">
              This is some sample content to demonstrate the sticky header behavior.
              Scroll down to see how the header remains fixed at the top of the viewport.
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

// Real-world Examples
export const RealWorldExamples: Story = {
  render: () => (
    <div className="space-y-12 bg-gray-50 min-h-screen">
      {/* E-commerce Product Page */}
      <div>
        <h2 className="text-xl font-semibold mb-6 px-8 pt-8">E-commerce Product Page</h2>
        <HeaderGroup
          title="Wireless Bluetooth Headphones"
          subtitle="Electronics › Audio › Headphones"
          description="Premium quality wireless headphones with active noise cancellation and 30-hour battery life"
          badge={
            <Chip variant="success" size="sm">In Stock</Chip>
          }
          actions={
            <div className="flex gap-3">
              <Button variant="outlined" size="sm">Add to Wishlist</Button>
              <Button variant="primary" size="sm">Add to Cart - $299</Button>
            </div>
          }
        />
      </div>

      {/* User Profile Page */}
      <div>
        <h2 className="text-xl font-semibold mb-6 px-8">User Profile Page</h2>
        <HeaderGroup
          title="Sarah Johnson"
          subtitle="UX Designer"
          description="Passionate about creating intuitive user experiences. 5+ years in design, specializing in mobile and web applications."
          avatar={
            <Avatar size="xl" fallback="SJ" />
          }
          badge={
            <Chip variant="primary" size="sm">Pro Member</Chip>
          }
          actions={
            <div className="flex gap-3">
              <Button variant="outlined" size="sm">Message</Button>
              <Button variant="outlined" size="sm">Connect</Button>
              <Button variant="primary" size="sm">Hire</Button>
            </div>
          }
        />
      </div>

      {/* Project Management Dashboard */}
      <div>
        <h2 className="text-xl font-semibold mb-6 px-8">Project Management Dashboard</h2>
        <StatsHeader
          title="Project Alpha"
          subtitle="Development Sprint #12"
          description="Track progress, manage tasks, and collaborate with your team"
          actions={
            <div className="flex gap-3">
              <Button variant="outlined" size="sm">Export</Button>
              <Button variant="outlined" size="sm">Settings</Button>
              <Button variant="primary" size="sm">New Task</Button>
            </div>
          }
          stats={[
            {
              label: 'Tasks Completed',
              value: '24/30',
              change: '+4 today',
              trend: 'up'
            },
            {
              label: 'Team Members',
              value: '8',
              change: '+2 this week',
              trend: 'up'
            },
            {
              label: 'Days Remaining',
              value: '12',
              change: 'On schedule',
              trend: 'neutral'
            },
            {
              label: 'Budget Used',
              value: '68%',
              change: '+5% this week',
              trend: 'up'
            }
          ]}
        />
      </div>
    </div>
  )
}
