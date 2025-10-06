import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Button } from '../components/button'
import { Card } from '../components/card'
import { Select } from '../components/dropdown'
import { SectionHeader, StatsHeader } from '../components/header-group'
import { Input } from '../components/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/tab'

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Tab components provide organized content navigation with multiple panels and smooth transitions.

## Tabs Component
- **Two Modes**: controlled and uncontrolled state management
- **Smooth Transitions**: CSS-based animations between tab panels
- **Keyboard Navigation**: Full accessibility with arrow keys and tab navigation
- **Flexible Content**: Support for any content type in tab panels
- **Custom Styling**: Consistent with design system classes

## TabsList Component
- **Horizontal Layout**: Clean tab trigger container
- **Responsive Design**: Adapts to different screen sizes
- **Overflow Handling**: Scrollable when tabs exceed container width

## TabsTrigger Component
- **Interactive States**: Hover, focus, and active states
- **Icon Support**: Optional icons with consistent positioning
- **Badge Support**: Notification badges and counters

## TabsContent Component
- **Lazy Loading**: Content rendered only when tab is active
- **Animation Support**: Smooth enter/exit transitions
- **Flexible Layout**: Support for any content structure

## Usage
Use tabs for:
- **Dashboard sections** with different data views
- **Settings panels** with grouped configurations
- **Multi-step forms** and wizard interfaces
- **Content organization** in admin panels
- **Feature showcases** with different categories
        `
      }
    }
  },
  argTypes: {
    value: {
      control: 'text',
      description: 'Currently active tab value'
    },
    defaultValue: {
      control: 'text',
      description: 'Default active tab value'
    },
    onValueChange: {
      action: 'valueChanged',
      description: 'Callback when tab changes'
    }
  }
}

export default meta
type Story = StoryObj<typeof Tabs>

// Interactive Tabs with Controls
export const Interactive: Story = {
  args: {
    defaultValue: 'tab1'
  },
  render: (args) => (
    <div className="w-full max-w-2xl">
      <Tabs {...args}>
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          <TabsTrigger value="tab3">Tab 3</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">
          <Card variant="filled" padding="md">
            <StatsHeader
              title="Tab 1 Content"
              subtitle="Interactive Example"
              stats={[
                { label: 'Active Users', value: '1,234', change: '+12%', trend: 'up' },
                { label: 'Revenue', value: '$5,678', change: '+8%', trend: 'up' }
              ]}
            />
            <div className="mt-4 space-y-3">
              <Input label="Name" placeholder="Enter your name" fullWidth />
              <Select
                label="Category"
                options={[
                  { value: 'option1', label: 'Option 1' },
                  { value: 'option2', label: 'Option 2' }
                ]}
                fullWidth
              />
            </div>
          </Card>
        </TabsContent>
        <TabsContent value="tab2">
          <Card variant="filled" padding="md">
            <StatsHeader
              title="Tab 2 Content"
              subtitle="Second Tab"
              stats={[
                { label: 'Orders', value: '456', change: '-2%', trend: 'down' },
                { label: 'Conversion', value: '3.2%', change: '+0.5%', trend: 'up' }
              ]}
            />
            <div className="mt-4 space-y-3">
              <Input label="Email" type="email" placeholder="Enter your email" fullWidth />
              <Select
                label="Priority"
                options={[
                  { value: 'high', label: 'High' },
                  { value: 'medium', label: 'Medium' },
                  { value: 'low', label: 'Low' }
                ]}
                fullWidth
              />
            </div>
          </Card>
        </TabsContent>
        <TabsContent value="tab3">
          <Card variant="filled" padding="md">
            <StatsHeader
              title="Tab 3 Content"
              subtitle="Third Tab"
              stats={[
                { label: 'Sessions', value: '2,890', change: '+15%', trend: 'up' },
                { label: 'Bounce Rate', value: '23%', change: '0%', trend: 'neutral' }
              ]}
            />
            <div className="mt-4 space-y-3">
              <Input label="Phone" placeholder="Enter phone number" fullWidth />
              <Select
                label="Status"
                options={[
                  { value: 'active', label: 'Active' },
                  { value: 'inactive', label: 'Inactive' }
                ]}
                fullWidth
              />
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive tabs with Storybook controls. Test different props and see how tabs integrate with Input, Select, StatsHeader, and Card components.'
      }
    }
  }
}

// Basic Tabs Example
export const BasicTabs: Story = {
  render: () => (
    <div className="w-full max-w-2xl p-8">
      <SectionHeader title="Basic Tabs" className="mb-6" />

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="features">Recursos</TabsTrigger>
          <TabsTrigger value="pricing">Preços</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card variant="filled" padding="lg">
            <StatsHeader
              title="Visão Geral"
              subtitle="Plataforma Completa"
              stats={[
                { label: 'Usuários Ativos', value: '10,234', change: '+18%', trend: 'up' },
                { label: 'Projetos', value: '1,456', change: '+25%', trend: 'up' }
              ]}
            />
            <div className="mt-4 space-y-3">
              <Input label="Nome da Empresa" placeholder="Digite o nome da sua empresa" fullWidth />
              <Select
                label="Setor"
                options={[
                  { value: 'tech', label: 'Tecnologia' },
                  { value: 'finance', label: 'Financeiro' },
                  { value: 'health', label: 'Saúde' }
                ]}
                fullWidth
              />
            </div>
            <div className="flex justify-center gap-4 mt-6">
              <Button size="lg">🚀 Começar Agora</Button>
              <Button variant="outlined" size="lg">📖 Ver Documentação</Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="features">
          <Card variant="filled" padding="lg">
            <StatsHeader
              title="Recursos"
              subtitle="Funcionalidades Avançadas"
              stats={[
                { label: 'APIs Integradas', value: '50+', change: '+5', trend: 'up' },
                { label: 'Uptime', value: '99.9%', change: '0%', trend: 'neutral' }
              ]}
            />
            <div className="mt-4 space-y-3">
              <Input label="Recurso Desejado" placeholder="Qual recurso você precisa?" fullWidth />
              <Select
                label="Prioridade"
                options={[
                  { value: 'high', label: 'Alta' },
                  { value: 'medium', label: 'Média' },
                  { value: 'low', label: 'Baixa' }
                ]}
                fullWidth
              />
            </div>
            <ul className="space-y-2 text-gray-600 mt-4">
              <li>✅ Interface intuitiva e moderna</li>
              <li>✅ Integração com APIs externas</li>
              <li>✅ Dashboard em tempo real</li>
              <li>✅ Relatórios personalizáveis</li>
            </ul>
          </Card>
        </TabsContent>

        <TabsContent value="pricing">
          <Card variant="filled" padding="lg">
            <StatsHeader
              title="Preços"
              subtitle="Planos Flexíveis"
              stats={[
                { label: 'Clientes Satisfeitos', value: '5,000+', change: '+12%', trend: 'up' },
                { label: 'Economia Média', value: '40%', change: '+5%', trend: 'up' }
              ]}
            />
            <div className="mt-4 space-y-3">
              <Input label="Orçamento Mensal" placeholder="R$ 0,00" fullWidth />
              <Select
                label="Plano Preferido"
                options={[
                  { value: 'basic', label: 'Básico - R$ 29/mês' },
                  { value: 'pro', label: 'Pro - R$ 79/mês' },
                  { value: 'enterprise', label: 'Enterprise - R$ 199/mês' }
                ]}
                fullWidth
              />
            </div>
            <div className="grid grid-cols-3 gap-4 mt-6">
              <Card variant="elevated" padding="md">
                <h4 className="font-semibold">Básico</h4>
                <p className="text-2xl font-bold">R$ 29/mês</p>
              </Card>
              <Card variant="elevated" padding="md">
                <h4 className="font-semibold">Pro</h4>
                <p className="text-2xl font-bold">R$ 79/mês</p>
              </Card>
              <Card variant="elevated" padding="md">
                <h4 className="font-semibold">Enterprise</h4>
                <p className="text-2xl font-bold">R$ 199/mês</p>
              </Card>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic tabs example with Portuguese content showing platform overview, features, and pricing. Demonstrates real-world business use case.'
      }
    }
  }
}

// Controlled Tabs
export const ControlledTabs: Story = {
  render: () => {
    const [activeTab, setActiveTab] = React.useState('dashboard')

    return (
      <div className="w-full max-w-2xl p-8">
        <SectionHeader title="Controlled Tabs" className="mb-6" />

        <Card variant="filled" padding="md" className="mb-4">
          <p className="text-sm">
            <strong>Active Tab:</strong> {activeTab}
          </p>
          <div className="flex gap-2 mt-2">
            <Button size="sm" onClick={() => setActiveTab('dashboard')}>
              Go to Dashboard
            </Button>
            <Button size="sm" onClick={() => setActiveTab('analytics')}>
              Go to Analytics
            </Button>
          </div>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <Card variant="filled" padding="lg" className="bg-blue-50">
              <StatsHeader
                title="Dashboard"
                subtitle="Overview & Metrics"
                stats={[
                  { label: 'Total Users', value: '1,234', change: '+12%', trend: 'up' },
                  { label: 'Revenue', value: '$12,345', change: '+8%', trend: 'up' }
                ]}
              />
              <div className="mt-4 space-y-3">
                <Input label="Search Users" placeholder="Search by name or email" fullWidth />
                <Select
                  label="Time Period"
                  options={[
                    { value: 'today', label: 'Today' },
                    { value: 'week', label: 'This Week' },
                    { value: 'month', label: 'This Month' }
                  ]}
                  fullWidth
                />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <Card variant="elevated" padding="md">
                  <h4 className="font-semibold">Active Sessions</h4>
                  <p className="text-2xl font-bold text-blue-600">892</p>
                </Card>
                <Card variant="elevated" padding="md">
                  <h4 className="font-semibold">Conversion Rate</h4>
                  <p className="text-2xl font-bold text-green-600">3.2%</p>
                </Card>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card variant="filled" padding="lg" className="bg-green-50">
              <StatsHeader
                title="Analytics"
                subtitle="Performance Insights"
                stats={[
                  { label: 'Page Views', value: '45,678', change: '+15%', trend: 'up' },
                  { label: 'Bounce Rate', value: '23.4%', change: '-2%', trend: 'up' }
                ]}
              />
              <div className="mt-4 space-y-3">
                <Input label="Filter by Page" placeholder="Enter page URL" fullWidth />
                <Select
                  label="Analytics Type"
                  options={[
                    { value: 'traffic', label: 'Traffic Analysis' },
                    { value: 'behavior', label: 'User Behavior' },
                    { value: 'conversion', label: 'Conversion Funnel' }
                  ]}
                  fullWidth
                />
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Unique Visitors</span>
                  <span className="font-semibold">12,345</span>
                </div>
                <div className="flex justify-between">
                  <span>Average Session</span>
                  <span className="font-semibold">4m 32s</span>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card variant="filled" padding="lg" className="bg-yellow-50">
              <StatsHeader
                title="Reports"
                subtitle="Data & Insights"
                stats={[
                  { label: 'Reports Generated', value: '156', change: '+23%', trend: 'up' },
                  { label: 'Export Downloads', value: '89', change: '+5%', trend: 'up' }
                ]}
              />
              <div className="mt-4 space-y-3">
                <Input label="Report Name" placeholder="Enter custom report name" fullWidth />
                <Select
                  label="Report Type"
                  options={[
                    { value: 'monthly', label: 'Monthly Report' },
                    { value: 'growth', label: 'Growth Analysis' },
                    { value: 'engagement', label: 'User Engagement' }
                  ]}
                  fullWidth
                />
              </div>
              <div className="mt-4 space-y-2">
                <Button variant="outlined" className="w-full justify-start">
                  📊 Monthly Report
                </Button>
                <Button variant="outlined" className="w-full justify-start">
                  📈 Growth Analysis
                </Button>
                <Button variant="outlined" className="w-full justify-start">
                  👥 User Engagement
                </Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card variant="filled" padding="lg" className="bg-purple-50">
              <StatsHeader
                title="Settings"
                subtitle="Configuration"
                stats={[
                  { label: 'Active Integrations', value: '12', change: '+2', trend: 'up' },
                  { label: 'Storage Used', value: '67%', change: '+5%', trend: 'neutral' }
                ]}
              />
              <div className="mt-4 space-y-3">
                <Input label="Organization Name" placeholder="Enter organization name" fullWidth />
                <Select
                  label="Default Theme"
                  options={[
                    { value: 'light', label: 'Light Mode' },
                    { value: 'dark', label: 'Dark Mode' },
                    { value: 'auto', label: 'Auto' }
                  ]}
                  fullWidth
                />
              </div>
              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span>Email Notifications</span>
                  <Button size="sm">Toggle</Button>
                </div>
                <div className="flex items-center justify-between">
                  <span>Auto Save</span>
                  <Button size="sm">Toggle</Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Controlled tabs with external state management and programmatic navigation. Shows dashboard-style interface with comprehensive form controls.'
      }
    }
  }
}

// Many Tabs Example
export const ManyTabs: Story = {
  render: () => {
    const tabData = [
      { name: 'Home', stats: [{ label: 'Visitors', value: '2,345', change: '+12%', trend: 'up' as const }, { label: 'Bounce Rate', value: '23%', change: '-5%', trend: 'up' as const }] },
      { name: 'Products', stats: [{ label: 'Items', value: '156', change: '+8%', trend: 'up' as const }, { label: 'Sales', value: '$12,345', change: '+15%', trend: 'up' as const }] },
      { name: 'Services', stats: [{ label: 'Active', value: '89', change: '+3%', trend: 'up' as const }, { label: 'Requests', value: '234', change: '+20%', trend: 'up' as const }] },
      { name: 'About', stats: [{ label: 'Page Views', value: '1,234', change: '+7%', trend: 'up' as const }, { label: 'Time on Page', value: '3m 45s', change: '+12%', trend: 'up' as const }] },
      { name: 'Contact', stats: [{ label: 'Inquiries', value: '67', change: '+25%', trend: 'up' as const }, { label: 'Response Time', value: '2h', change: '-30%', trend: 'up' as const }] },
      { name: 'Blog', stats: [{ label: 'Posts', value: '45', change: '+5', trend: 'up' as const }, { label: 'Comments', value: '234', change: '+18%', trend: 'up' as const }] },
      { name: 'Support', stats: [{ label: 'Tickets', value: '23', change: '-12%', trend: 'down' as const }, { label: 'Satisfaction', value: '4.8/5', change: '+0.2', trend: 'up' as const }] },
      { name: 'FAQ', stats: [{ label: 'Questions', value: '156', change: '+12', trend: 'up' as const }, { label: 'Views', value: '3,456', change: '+22%', trend: 'up' as const }] }
    ]

    return (
      <div className="w-full max-w-4xl p-8">
        <h3 className="text-lg font-semibold mb-6">Many Tabs</h3>

        <Tabs defaultValue="tab1">
          <TabsList>
            {tabData.map((tab, i) => (
              <TabsTrigger key={i + 1} value={`tab${i + 1}`}>{tab.name}</TabsTrigger>
            ))}
          </TabsList>

          {tabData.map((tab, i) => (
            <TabsContent key={i + 1} value={`tab${i + 1}`}>
              <Card variant="filled" padding="lg">
                <StatsHeader
                  title={`${tab.name} Section`}
                  subtitle={`${tab.name} Analytics & Management`}
                  stats={tab.stats}
                />
                <div className="mt-4 space-y-3">
                  <Input
                    label={`Search ${tab.name}`}
                    placeholder={`Search in ${tab.name.toLowerCase()}...`}
                    fullWidth
                  />
                  <Select
                    label="Filter Options"
                    options={[
                      { value: 'all', label: 'All Items' },
                      { value: 'recent', label: 'Recent' },
                      { value: 'popular', label: 'Most Popular' }
                    ]}
                    fullWidth
                  />
                </div>
                <p className="mt-4">This is the content for {tab.name}. Each tab contains different content and components specific to its purpose.</p>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Multiple tabs with dynamic content generation. Each tab has unique statistics and demonstrates scalable tab architecture.'
      }
    }
  }
}

// Tabs with Icons
export const TabsWithIcons: Story = {
  render: () => (
    <div className="w-full max-w-2xl p-8">
      <h3 className="text-lg font-semibold mb-6">Tabs with Icons</h3>

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">👤 Profile</TabsTrigger>
          <TabsTrigger value="notifications">🔔 Notifications</TabsTrigger>
          <TabsTrigger value="security">🔒 Security</TabsTrigger>
          <TabsTrigger value="billing">💳 Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card variant="filled" padding="lg">
            <StatsHeader
              title="👤 Profile Settings"
              subtitle="Personal Information"
              stats={[
                { label: 'Profile Views', value: '234', change: '+12%', trend: 'up' },
                { label: 'Completion', value: '85%', change: '+5%', trend: 'up' }
              ]}
            />
            <div className="mt-4 space-y-4">
              <Input
                label="Name"
                placeholder="Your name"
                fullWidth
              />
              <Input
                label="Email"
                type="email"
                placeholder="your@email.com"
                fullWidth
              />
              <Select
                label="Country"
                options={[
                  { value: 'us', label: 'United States' },
                  { value: 'ca', label: 'Canada' },
                  { value: 'uk', label: 'United Kingdom' }
                ]}
                fullWidth
              />
              <Button>Save Changes</Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card variant="filled" padding="lg">
            <StatsHeader
              title="🔔 Notification Preferences"
              subtitle="Communication Settings"
              stats={[
                { label: 'Notifications Sent', value: '1,234', change: '+8%', trend: 'up' },
                { label: 'Open Rate', value: '67%', change: '+3%', trend: 'up' }
              ]}
            />
            <div className="mt-4 space-y-3">
              <Input label="Email for Notifications" placeholder="notification@email.com" fullWidth />
              <Select
                label="Notification Frequency"
                options={[
                  { value: 'instant', label: 'Instant' },
                  { value: 'daily', label: 'Daily Digest' },
                  { value: 'weekly', label: 'Weekly Summary' }
                ]}
                fullWidth
              />
              <div className="space-y-3">
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked />
                  <span>Email notifications</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  <span>SMS notifications</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked />
                  <span>Push notifications</span>
                </label>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card variant="filled" padding="lg">
            <StatsHeader
              title="🔒 Security Settings"
              subtitle="Account Protection"
              stats={[
                { label: 'Security Score', value: '9.2/10', change: '+0.3', trend: 'up' },
                { label: 'Last Login', value: '2h ago', change: '0', trend: 'neutral' }
              ]}
            />
            <div className="mt-4 space-y-4">
              <Input label="Current Password" type="password" placeholder="Enter current password" fullWidth />
              <Select
                label="Two-Factor Method"
                options={[
                  { value: 'sms', label: 'SMS' },
                  { value: 'app', label: 'Authenticator App' },
                  { value: 'email', label: 'Email' }
                ]}
                fullWidth
              />
              <div className="space-y-2">
                <Button variant="outlined" className="w-full">
                  Change Password
                </Button>
                <Button variant="outlined" className="w-full">
                  Enable Two-Factor Authentication
                </Button>
                <Button variant="outlined" className="w-full">
                  View Login History
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="billing">
          <Card variant="filled" padding="lg">
            <StatsHeader
              title="💳 Billing Information"
              subtitle="Payment & Subscription"
              stats={[
                { label: 'Monthly Spend', value: '$29', change: '0%', trend: 'neutral' },
                { label: 'Days Remaining', value: '23', change: '-7', trend: 'down' }
              ]}
            />
            <div className="mt-4 space-y-4">
              <Input label="Billing Email" placeholder="billing@company.com" fullWidth />
              <Select
                label="Payment Method"
                options={[
                  { value: 'card', label: 'Credit Card (**** 1234)' },
                  { value: 'paypal', label: 'PayPal' },
                  { value: 'bank', label: 'Bank Transfer' }
                ]}
                fullWidth
              />
              <div className="space-y-4">
                <Card variant="elevated" padding="md">
                  <h4 className="font-semibold">Current Plan</h4>
                  <p>Pro Plan - $29/month</p>
                  <Button size="sm" className="mt-2">Upgrade</Button>
                </Card>
                <Card variant="elevated" padding="md">
                  <h4 className="font-semibold">Next Billing</h4>
                  <p>January 15, 2024</p>
                  <Button size="sm" className="mt-2">Update</Button>
                </Card>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tabs with emoji icons showing user settings interface. Includes profile management, notifications, security, and billing sections.'
      }
    }
  }
}

// Nested Content Example
export const NestedContent: Story = {
  render: () => (
    <div className="w-full max-w-3xl p-8">
      <h3 className="text-lg font-semibold mb-6">Nested Content</h3>

      <Tabs defaultValue="documentation">
        <TabsList>
          <TabsTrigger value="documentation">Documentation</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
          <TabsTrigger value="api">API Reference</TabsTrigger>
        </TabsList>

        <TabsContent value="documentation">
          <Card variant="filled" padding="lg">
            <StatsHeader
              title="Documentation"
              subtitle="Comprehensive Guides"
              stats={[
                { label: 'Total Pages', value: '156', change: '+12', trend: 'up' },
                { label: 'Page Views', value: '12,345', change: '+25%', trend: 'up' }
              ]}
            />
            <div className="mt-4 space-y-3">
              <Input label="Search Documentation" placeholder="Search guides and tutorials..." fullWidth />
              <Select
                label="Documentation Type"
                options={[
                  { value: 'guides', label: 'User Guides' },
                  { value: 'tutorials', label: 'Tutorials' },
                  { value: 'reference', label: 'Reference' }
                ]}
                fullWidth
              />
            </div>

            <Tabs defaultValue="getting-started" className="mt-6">
              <TabsList>
                <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
                <TabsTrigger value="installation">Installation</TabsTrigger>
                <TabsTrigger value="configuration">Configuration</TabsTrigger>
              </TabsList>

              <TabsContent value="getting-started">
                <Card variant="elevated" padding="md">
                  <h4 className="font-semibold mb-2">Getting Started</h4>
                  <p>Welcome to our component library! This guide will help you get started quickly.</p>
                  <div className="mt-3 space-y-2">
                    <Input label="Project Name" placeholder="Enter your project name" fullWidth />
                    <Select
                      label="Framework"
                      options={[
                        { value: 'react', label: 'React' },
                        { value: 'vue', label: 'Vue.js' },
                        { value: 'angular', label: 'Angular' }
                      ]}
                      fullWidth
                    />
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="installation">
                <Card variant="elevated" padding="md">
                  <h4 className="font-semibold mb-2">Installation</h4>
                  <code className="block p-2 bg-gray-100 rounded">npm install @company/components</code>
                  <div className="mt-3 space-y-2">
                    <Input label="Package Manager" placeholder="npm, yarn, pnpm..." fullWidth />
                    <Select
                      label="Version"
                      options={[
                        { value: 'latest', label: 'Latest (v2.1.0)' },
                        { value: 'beta', label: 'Beta (v2.2.0-beta)' },
                        { value: 'legacy', label: 'Legacy (v1.9.0)' }
                      ]}
                      fullWidth
                    />
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="configuration">
                <Card variant="elevated" padding="md">
                  <h4 className="font-semibold mb-2">Configuration</h4>
                  <p>Configure the components by importing the CSS and setting up your theme.</p>
                  <div className="mt-3 space-y-2">
                    <Input label="Theme Name" placeholder="Enter custom theme name" fullWidth />
                    <Select
                      label="Color Scheme"
                      options={[
                        { value: 'light', label: 'Light Theme' },
                        { value: 'dark', label: 'Dark Theme' },
                        { value: 'auto', label: 'System Preference' }
                      ]}
                      fullWidth
                    />
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </Card>
        </TabsContent>

        <TabsContent value="examples">
          <Card variant="filled" padding="lg">
            <StatsHeader
              title="Examples"
              subtitle="Code Samples & Demos"
              stats={[
                { label: 'Code Examples', value: '89', change: '+15', trend: 'up' },
                { label: 'Downloads', value: '3,456', change: '+32%', trend: 'up' }
              ]}
            />
            <div className="mt-4 space-y-3">
              <Input label="Search Examples" placeholder="Search code examples..." fullWidth />
              <Select
                label="Example Category"
                options={[
                  { value: 'basic', label: 'Basic Examples' },
                  { value: 'advanced', label: 'Advanced Examples' },
                  { value: 'integration', label: 'Integration Examples' }
                ]}
                fullWidth
              />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <Card variant="elevated" padding="md">
                <h4 className="font-semibold">Basic Example</h4>
                <p className="text-sm text-gray-600">Simple implementation</p>
              </Card>
              <Card variant="elevated" padding="md">
                <h4 className="font-semibold">Advanced Example</h4>
                <p className="text-sm text-gray-600">Complex use case</p>
              </Card>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="api">
          <Card variant="filled" padding="lg">
            <StatsHeader
              title="API Reference"
              subtitle="Component Documentation"
              stats={[
                { label: 'Components', value: '45', change: '+8', trend: 'up' },
                { label: 'Props', value: '234', change: '+23', trend: 'up' }
              ]}
            />
            <div className="mt-4 space-y-3">
              <Input label="Search API" placeholder="Search components and props..." fullWidth />
              <Select
                label="Component Type"
                options={[
                  { value: 'layout', label: 'Layout Components' },
                  { value: 'form', label: 'Form Components' },
                  { value: 'navigation', label: 'Navigation Components' }
                ]}
                fullWidth
              />
            </div>
            <div className="space-y-4 mt-6">
              <Card variant="elevated" padding="md">
                <h4 className="font-semibold">Tabs</h4>
                <p className="text-sm text-gray-600">Main container component</p>
              </Card>
              <Card variant="elevated" padding="md">
                <h4 className="font-semibold">TabsList</h4>
                <p className="text-sm text-gray-600">Container for tab triggers</p>
              </Card>
              <Card variant="elevated" padding="md">
                <h4 className="font-semibold">TabsTrigger</h4>
                <p className="text-sm text-gray-600">Individual tab button</p>
              </Card>
              <Card variant="elevated" padding="md">
                <h4 className="font-semibold">TabsContent</h4>
                <p className="text-sm text-gray-600">Content panel for each tab</p>
              </Card>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Nested tabs demonstrating complex content organization. Shows documentation structure with nested navigation and comprehensive form controls.'
      }
    }
  }
}

// Real-world Dashboard Example
export const DashboardExample: Story = {
  render: () => {
    const [activeTab, setActiveTab] = React.useState('overview')
    const [data, setData] = React.useState({
      users: 1234,
      revenue: 45678,
      orders: 89,
      growth: 12.5
    })

    return (
      <div className="w-full max-w-4xl p-8">
        <h3 className="text-lg font-semibold mb-6">Dashboard Example</h3>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="overview">📊 Overview</TabsTrigger>
            <TabsTrigger value="users">👥 Users</TabsTrigger>
            <TabsTrigger value="sales">💰 Sales</TabsTrigger>
            <TabsTrigger value="analytics">📈 Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="space-y-6">
              <StatsHeader
                title="Dashboard Overview"
                subtitle="Real-time Metrics"
                description="Key performance indicators and business metrics for your application"
                actions={
                  <div className="flex gap-3">
                    <Button variant="outlined" size="sm">Export Data</Button>
                    <Button variant="primary" size="sm">Refresh</Button>
                  </div>
                }
                stats={[
                  {
                    label: 'Total Users',
                    value: data.users.toLocaleString(),
                    change: '+12.3%',
                    trend: 'up',
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    )
                  },
                  {
                    label: 'Revenue',
                    value: `$${data.revenue.toLocaleString()}`,
                    change: '+8.7%',
                    trend: 'up',
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    )
                  },
                  {
                    label: 'Orders',
                    value: data.orders.toString(),
                    change: '-2.1%',
                    trend: 'down',
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    )
                  },
                  {
                    label: 'Growth Rate',
                    value: `+${data.growth}%`,
                    change: '+0.3%',
                    trend: 'up',
                    icon: (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    )
                  }
                ]}
              />

              <div className="p-6 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-4">Quick Actions</h4>
                <div className="flex gap-4">
                  <Button onClick={() => setActiveTab('users')}>
                    View Users
                  </Button>
                  <Button variant="outlined" onClick={() => setActiveTab('sales')}>
                    View Sales
                  </Button>
                  <Button variant="outlined" onClick={() => setActiveTab('analytics')}>
                    View Analytics
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="users">
            <Card variant="filled" padding="lg">
              <StatsHeader
                title="👥 User Management"
                subtitle="User Analytics & Management"
                stats={[
                  { label: 'Active Users', value: '892', change: '+15%', trend: 'up' },
                  { label: 'New Registrations', value: '156', change: '+23%', trend: 'up' }
                ]}
              />
              <div className="mt-4 space-y-3">
                <Input label="Search Users" placeholder="Search by name, email, or ID..." fullWidth />
                <Select
                  label="User Status"
                  options={[
                    { value: 'all', label: 'All Users' },
                    { value: 'active', label: 'Active Users' },
                    { value: 'inactive', label: 'Inactive Users' },
                    { value: 'new', label: 'New Users' }
                  ]}
                  fullWidth
                />
              </div>
              <div className="space-y-4 mt-6">
                <Card variant="elevated" padding="md">
                  <div>
                    <h5 className="font-medium">Weekly Active Users</h5>
                    <p className="text-sm text-gray-600">Users who logged in this week</p>
                  </div>
                  <span className="text-xl font-bold">892</span>
                </Card>
                <Card variant="elevated" padding="md">
                  <div>
                    <h5 className="font-medium">Monthly Registrations</h5>
                    <p className="text-sm text-gray-600">New users this month</p>
                  </div>
                  <span className="text-xl font-bold">156</span>
                </Card>
                <Button className="w-full">Manage Users</Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="sales">
            <Card variant="filled" padding="lg">
              <StatsHeader
                title="💰 Sales Overview"
                subtitle="Revenue & Sales Analytics"
                stats={[
                  { label: "Today's Sales", value: '$2,345', change: '+18%', trend: 'up' },
                  { label: 'Monthly Revenue', value: '$45,678', change: '+12%', trend: 'up' }
                ]}
              />
              <div className="mt-4 space-y-3">
                <Input label="Search Sales" placeholder="Search by product, customer, or order ID..." fullWidth />
                <Select
                  label="Sales Period"
                  options={[
                    { value: 'today', label: 'Today' },
                    { value: 'week', label: 'This Week' },
                    { value: 'month', label: 'This Month' },
                    { value: 'quarter', label: 'This Quarter' }
                  ]}
                  fullWidth
                />
              </div>
              <div className="space-y-4 mt-6">
                <div className="grid grid-cols-2 gap-4">
                  <Card variant="elevated" padding="md">
                    <h5 className="font-medium">Today's Sales</h5>
                    <p className="text-2xl font-bold text-green-600">$2,345</p>
                  </Card>
                  <Card variant="elevated" padding="md">
                    <h5 className="font-medium">This Month</h5>
                    <p className="text-2xl font-bold text-blue-600">$45,678</p>
                  </Card>
                </div>
                <Button className="w-full">View Detailed Report</Button>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card variant="filled" padding="lg">
              <StatsHeader
                title="📈 Analytics Dashboard"
                subtitle="Traffic & Performance Analytics"
                stats={[
                  { label: 'Page Views', value: '45,678', change: '+22%', trend: 'up' },
                  { label: 'Bounce Rate', value: '23%', change: '-5%', trend: 'up' }
                ]}
              />
              <div className="mt-4 space-y-3">
                <Input label="Search Analytics" placeholder="Search pages, events, or metrics..." fullWidth />
                <Select
                  label="Analytics Type"
                  options={[
                    { value: 'traffic', label: 'Traffic Analytics' },
                    { value: 'behavior', label: 'User Behavior' },
                    { value: 'conversion', label: 'Conversion Analytics' },
                    { value: 'performance', label: 'Performance Metrics' }
                  ]}
                  fullWidth
                />
              </div>
              <div className="space-y-4 mt-6">
                <Card variant="elevated" padding="md">
                  <h5 className="font-medium mb-2">Traffic Sources</h5>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Direct</span>
                      <span>45%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Search</span>
                      <span>32%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Social</span>
                      <span>23%</span>
                    </div>
                  </div>
                </Card>
                <Button className="w-full">Generate Report</Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Real-world dashboard example with comprehensive analytics interface. Features advanced StatsHeader with icons, actions, and detailed metrics.'
      }
    }
  }
}

// Form Integration Example
export const FormIntegration: Story = {
  render: () => {
    const [formData, setFormData] = React.useState({
      activeStep: 'personal',
      personal: { name: '', email: '' },
      preferences: { theme: 'light', notifications: true },
      billing: { plan: 'basic', method: 'card' }
    })

    const updateStep = (step: string) => {
      setFormData(prev => ({ ...prev, activeStep: step }))
    }

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      console.log('Form submitted:', formData)
    }

    return (
      <div className="w-full max-w-2xl p-8">
        <h3 className="text-lg font-semibold mb-6">Multi-Step Form</h3>

        <form onSubmit={handleSubmit}>
          <Tabs value={formData.activeStep} onValueChange={updateStep}>
            <TabsList>
              <TabsTrigger value="personal">1. Personal</TabsTrigger>
              <TabsTrigger value="preferences">2. Preferences</TabsTrigger>
              <TabsTrigger value="billing">3. Billing</TabsTrigger>
              <TabsTrigger value="review">4. Review</TabsTrigger>
            </TabsList>

            <TabsContent value="personal">
              <Card variant="filled" padding="lg">
                <StatsHeader
                  title="Personal Information"
                  subtitle="Step 1 of 4"
                  stats={[
                    { label: 'Completion', value: '25%', change: '0%', trend: 'neutral' },
                    { label: 'Fields Filled', value: `${Object.values(formData.personal).filter(v => v).length}/2`, change: '0', trend: 'neutral' }
                  ]}
                />
                <div className="mt-4 space-y-4">
                  <Input
                    label="Name"
                    placeholder="Your name"
                    value={formData.personal.name}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      personal: { ...prev.personal, name: e.target.value }
                    }))}
                    required
                    fullWidth
                  />
                  <Input
                    label="Email"
                    type="email"
                    placeholder="your@email.com"
                    value={formData.personal.email}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      personal: { ...prev.personal, email: e.target.value }
                    }))}
                    required
                    fullWidth
                  />
                  <Select
                    label="Country"
                    options={[
                      { value: 'us', label: 'United States' },
                      { value: 'ca', label: 'Canada' },
                      { value: 'uk', label: 'United Kingdom' },
                      { value: 'au', label: 'Australia' }
                    ]}
                    fullWidth
                  />
                  <Button
                    type="button"
                    onClick={() => updateStep('preferences')}
                    disabled={!formData.personal.name || !formData.personal.email}
                  >
                    Next: Preferences
                  </Button>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="preferences">
              <Card variant="filled" padding="lg">
                <StatsHeader
                  title="Preferences"
                  subtitle="Step 2 of 4"
                  stats={[
                    { label: 'Completion', value: '50%', change: '+25%', trend: 'up' },
                    { label: 'Settings Configured', value: '2/3', change: '+1', trend: 'up' }
                  ]}
                />
                <div className="mt-4 space-y-4">
                  <Select
                    label="Theme"
                    options={[
                      { value: 'light', label: 'Light' },
                      { value: 'dark', label: 'Dark' },
                      { value: 'auto', label: 'Auto' }
                    ]}
                    value={formData.preferences.theme}
                    onValueChange={(value) => setFormData(prev => ({
                      ...prev,
                      preferences: { ...prev.preferences, theme: value as string }
                    }))}
                    fullWidth
                  />
                  <Input
                    label="Notification Email"
                    type="email"
                    placeholder="notifications@example.com"
                    fullWidth
                  />
                  <Select
                    label="Language"
                    options={[
                      { value: 'en', label: 'English' },
                      { value: 'es', label: 'Spanish' },
                      { value: 'fr', label: 'French' },
                      { value: 'de', label: 'German' }
                    ]}
                    fullWidth
                  />
                  <div className="flex gap-4">
                    <Button type="button" variant="outlined" onClick={() => updateStep('personal')}>
                      Back
                    </Button>
                    <Button type="button" onClick={() => updateStep('billing')}>
                      Next: Billing
                    </Button>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="billing">
              <Card variant="filled" padding="lg">
                <StatsHeader
                  title="Billing Information"
                  subtitle="Step 3 of 4"
                  stats={[
                    { label: 'Completion', value: '75%', change: '+25%', trend: 'up' },
                    { label: 'Plan Selected', value: formData.billing.plan, change: '0', trend: 'neutral' }
                  ]}
                />
                <div className="mt-4 space-y-4">
                  <Select
                    label="Plan"
                    options={[
                      { value: 'basic', label: 'Basic - $9/month' },
                      { value: 'pro', label: 'Pro - $29/month' },
                      { value: 'enterprise', label: 'Enterprise - $99/month' }
                    ]}
                    value={formData.billing.plan}
                    onValueChange={(value) => setFormData(prev => ({
                      ...prev,
                      billing: { ...prev.billing, plan: value as string }
                    }))}
                    fullWidth
                  />
                  <Input
                    label="Billing Email"
                    type="email"
                    placeholder="billing@company.com"
                    fullWidth
                  />
                  <Select
                    label="Payment Method"
                    options={[
                      { value: 'card', label: 'Credit Card' },
                      { value: 'paypal', label: 'PayPal' },
                      { value: 'bank', label: 'Bank Transfer' }
                    ]}
                    value={formData.billing.method}
                    onValueChange={(value) => setFormData(prev => ({
                      ...prev,
                      billing: { ...prev.billing, method: value as string }
                    }))}
                    fullWidth
                  />
                  <div className="flex gap-4">
                    <Button type="button" variant="outlined" onClick={() => updateStep('preferences')}>
                      Back
                    </Button>
                    <Button type="button" onClick={() => updateStep('review')}>
                      Review
                    </Button>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="review">
              <Card variant="filled" padding="lg">
                <StatsHeader
                  title="Review & Submit"
                  subtitle="Step 4 of 4"
                  stats={[
                    { label: 'Completion', value: '100%', change: '+25%', trend: 'up' },
                    { label: 'Ready to Submit', value: 'Yes', change: '0', trend: 'neutral' }
                  ]}
                />
                <div className="mt-4 space-y-3">
                  <Input
                    label="Final Comments"
                    placeholder="Any additional comments or requests..."
                    fullWidth
                  />
                  <Select
                    label="How did you hear about us?"
                    options={[
                      { value: 'search', label: 'Search Engine' },
                      { value: 'social', label: 'Social Media' },
                      { value: 'referral', label: 'Referral' },
                      { value: 'other', label: 'Other' }
                    ]}
                    fullWidth
                  />
                </div>
                <div className="space-y-4 mt-6">
                  <Card variant="elevated" padding="md">
                    <h5 className="font-medium">Personal Information</h5>
                    <p>Name: {formData.personal.name}</p>
                    <p>Email: {formData.personal.email}</p>
                  </Card>
                  <Card variant="elevated" padding="md">
                    <h5 className="font-medium">Preferences</h5>
                    <p>Theme: {formData.preferences.theme}</p>
                  </Card>
                  <Card variant="elevated" padding="md">
                    <h5 className="font-medium">Billing</h5>
                    <p>Plan: {formData.billing.plan}</p>
                    <p>Method: {formData.billing.method}</p>
                  </Card>
                  <div className="flex gap-4">
                    <Button type="button" variant="outlined" onClick={() => updateStep('billing')}>
                      Back
                    </Button>
                    <Button type="submit">
                      Submit
                    </Button>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </form>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Multi-step form integration with tabs as navigation. Shows progress tracking, validation, and comprehensive form state management.'
      }
    }
  }
}
