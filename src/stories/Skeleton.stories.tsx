import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Avatar } from '../components/avatar'
import { Button } from '../components/button'
import { Card, CardContent, CardFooter, CardHeader } from '../components/card'
import { Chip } from '../components/chip'
import {
  Skeleton,
  SkeletonAvatar,
  SkeletonCard,
  SkeletonForm,
  SkeletonList,
  SkeletonPage,
  SkeletonTable,
  SkeletonText
} from '../components/skeleton'
import { SimpleDataTable } from '../components/table'

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Skeleton components for displaying loading states. Built with centralized CSS component classes for consistent styling and includes various pre-built skeleton layouts for common UI patterns.'
      }
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'circular', 'rectangular', 'rounded'],
      description: 'Skeleton variant style'
    },
    animated: {
      control: 'boolean',
      description: 'Whether the skeleton should animate'
    },
    width: {
      control: 'text',
      description: 'Custom width (CSS value or number)'
    },
    height: {
      control: 'text',
      description: 'Custom height (CSS value or number)'
    }
  }
}

export default meta
type Story = StoryObj<typeof Skeleton>

// Interactive Skeleton with Controls
export const Interactive: Story = {
  args: {
    variant: 'text',
    animated: true,
    width: '100%',
    height: '1rem'
  },
  render: (args) => (
    <div className="w-full max-w-md">
      <Skeleton {...args} />
    </div>
  )
}

// Basic Skeleton Variants
export const BasicVariants: Story = {
  render: () => (
    <div className="w-full max-w-2xl space-y-6">
      <h3 className="text-lg font-semibold">Variações Básicas</h3>

      <div className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">Text</h4>
          <div className="space-y-2">
            <Skeleton variant="text" />
            <Skeleton variant="text" width="80%" />
            <Skeleton variant="text" width="60%" />
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">Circular</h4>
          <div className="flex gap-4 items-center">
            <Skeleton variant="circular" width="2rem" height="2rem" />
            <Skeleton variant="circular" width="3rem" height="3rem" />
            <Skeleton variant="circular" width="4rem" height="4rem" />
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">Rectangular</h4>
          <Skeleton variant="rectangular" height="8rem" />
        </div>

        <div>
          <h4 className="font-medium mb-2">Rounded</h4>
          <Skeleton variant="rounded" height="6rem" />
        </div>
      </div>
    </div>
  )
}

// Animation States
export const AnimationStates: Story = {
  render: () => (
    <div className="w-full max-w-2xl space-y-6">
      <h3 className="text-lg font-semibold">Estados de Animação</h3>

      <div className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">Com Animação (Padrão)</h4>
          <div className="space-y-2">
            <Skeleton variant="text" animated={true} />
            <Skeleton variant="text" width="75%" animated={true} />
            <Skeleton variant="text" width="50%" animated={true} />
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">Sem Animação</h4>
          <div className="space-y-2">
            <Skeleton variant="text" animated={false} />
            <Skeleton variant="text" width="75%" animated={false} />
            <Skeleton variant="text" width="50%" animated={false} />
          </div>
        </div>
      </div>
    </div>
  )
}

// Skeleton Avatar Component
export const AvatarSizes: Story = {
  render: () => (
    <div className="w-full max-w-2xl space-y-6">
      <h3 className="text-lg font-semibold">Tamanhos de Avatar</h3>

      <div className="flex gap-4 items-center flex-wrap">
        <div className="text-center">
          <SkeletonAvatar size="xs" />
          <p className="text-xs mt-1">XS</p>
        </div>
        <div className="text-center">
          <SkeletonAvatar size="sm" />
          <p className="text-xs mt-1">SM</p>
        </div>
        <div className="text-center">
          <SkeletonAvatar size="md" />
          <p className="text-xs mt-1">MD</p>
        </div>
        <div className="text-center">
          <SkeletonAvatar size="lg" />
          <p className="text-xs mt-1">LG</p>
        </div>
        <div className="text-center">
          <SkeletonAvatar size="xl" />
          <p className="text-xs mt-1">XL</p>
        </div>
        <div className="text-center">
          <SkeletonAvatar size="2xl" />
          <p className="text-xs mt-1">2XL</p>
        </div>
      </div>
    </div>
  )
}

// Skeleton Text Component
export const TextVariations: Story = {
  render: () => (
    <div className="w-full max-w-2xl space-y-6">
      <h3 className="text-lg font-semibold">Variações de Texto</h3>

      <div className="space-y-6">
        <div>
          <h4 className="font-medium mb-2">Espaçamento Apertado</h4>
          <SkeletonText lines={4} spacing="tight" />
        </div>

        <div>
          <h4 className="font-medium mb-2">Espaçamento Normal</h4>
          <SkeletonText lines={4} spacing="normal" />
        </div>

        <div>
          <h4 className="font-medium mb-2">Espaçamento Solto</h4>
          <SkeletonText lines={4} spacing="loose" />
        </div>

        <div>
          <h4 className="font-medium mb-2">Última Linha Customizada</h4>
          <SkeletonText lines={3} lastLineWidth="40%" />
        </div>
      </div>
    </div>
  )
}

// Skeleton Card Component
export const CardVariations: Story = {
  render: () => (
    <div className="w-full max-w-4xl space-y-6">
      <h3 className="text-lg font-semibold">Variações de Card</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium mb-2">Card Simples</h4>
          <SkeletonCard />
        </div>

        <div>
          <h4 className="font-medium mb-2">Card com Avatar</h4>
          <SkeletonCard showAvatar />
        </div>

        <div>
          <h4 className="font-medium mb-2">Card com Imagem</h4>
          <SkeletonCard showImage />
        </div>

        <div>
          <h4 className="font-medium mb-2">Card Completo</h4>
          <SkeletonCard showAvatar showImage actions textLines={4} />
        </div>
      </div>
    </div>
  )
}

// Skeleton Table Component
export const TableVariations: Story = {
  render: () => (
    <div className="w-full max-w-4xl space-y-6">
      <h3 className="text-lg font-semibold">Variações de Tabela</h3>

      <div className="space-y-6">
        <div>
          <h4 className="font-medium mb-2">Tabela Básica</h4>
          <SkeletonTable rows={3} columns={3} />
        </div>

        <div>
          <h4 className="font-medium mb-2">Tabela sem Cabeçalho</h4>
          <SkeletonTable rows={4} columns={4} showHeader={false} />
        </div>

        <div>
          <h4 className="font-medium mb-2">Tabela Extensa</h4>
          <SkeletonTable rows={6} columns={6} />
        </div>
      </div>
    </div>
  )
}

// Skeleton List Component
export const ListVariations: Story = {
  render: () => (
    <div className="w-full max-w-4xl space-y-6">
      <h3 className="text-lg font-semibold">Variações de Lista</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium mb-2">Lista Simples</h4>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <SkeletonList items={4} variant="simple" />
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">Lista com Avatar</h4>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <SkeletonList items={4} showAvatar variant="detailed" />
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">Lista com Ícone</h4>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <SkeletonList items={4} showIcon variant="simple" />
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">Lista Detalhada</h4>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <SkeletonList items={4} showAvatar variant="detailed" />
          </div>
        </div>
      </div>
    </div>
  )
}

// Skeleton Form Component
export const FormVariations: Story = {
  render: () => (
    <div className="w-full max-w-2xl space-y-6">
      <h3 className="text-lg font-semibold">Variações de Formulário</h3>

      <div className="space-y-6">
        <div>
          <h4 className="font-medium mb-2">Formulário Básico</h4>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <SkeletonForm fields={3} />
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">Formulário sem Labels</h4>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <SkeletonForm fields={4} showLabels={false} />
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">Formulário sem Botões</h4>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <SkeletonForm fields={5} showButtons={false} />
          </div>
        </div>
      </div>
    </div>
  )
}

// Skeleton Page Layouts
export const PageLayouts: Story = {
  render: () => (
    <div className="w-full space-y-8">
      <h3 className="text-lg font-semibold">Layouts de Página</h3>

      <div className="space-y-8">
        <div>
          <h4 className="font-medium mb-4">Layout com Cards</h4>
          <div className="border border-gray-200 rounded-lg overflow-hidden" style={{ height: '400px' }}>
            <SkeletonPage contentVariant="cards" showSidebar={false} showFooter={false} />
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-4">Layout com Sidebar</h4>
          <div className="border border-gray-200 rounded-lg overflow-hidden" style={{ height: '400px' }}>
            <SkeletonPage contentVariant="list" showSidebar={true} showFooter={false} />
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-4">Layout com Tabela</h4>
          <div className="border border-gray-200 rounded-lg overflow-hidden" style={{ height: '400px' }}>
            <SkeletonPage contentVariant="table" showSidebar={false} showFooter={true} />
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-4">Layout de Formulário</h4>
          <div className="border border-gray-200 rounded-lg overflow-hidden" style={{ height: '400px' }}>
            <SkeletonPage contentVariant="form" showSidebar={false} showFooter={false} />
          </div>
        </div>
      </div>
    </div>
  )
}

// Real Components with Loading States
export const ComponentsWithLoading: Story = {
  render: () => {
    const [loadingStates, setLoadingStates] = React.useState({
      table: true,
      cards: true,
      userProfile: true,
      dashboard: true
    })

    // Sample data
    const sampleUsers = [
      { id: 1, name: 'João Silva', email: 'joao@example.com', role: 'Admin', status: 'Ativo' },
      { id: 2, name: 'Maria Santos', email: 'maria@example.com', role: 'Editor', status: 'Ativo' },
      { id: 3, name: 'Pedro Costa', email: 'pedro@example.com', role: 'Viewer', status: 'Inativo' }
    ]

    const tableColumns = [
      { key: 'name', header: 'Nome', sortable: true },
      { key: 'email', header: 'Email', sortable: true },
      { key: 'role', header: 'Função', sortable: true },
      { key: 'status', header: 'Status', sortable: false }
    ]

    const toggleLoading = (component: keyof typeof loadingStates) => {
      setLoadingStates(prev => ({
        ...prev,
        [component]: !prev[component]
      }))
    }

    return (
      <div className="w-full max-w-6xl space-y-8">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Componentes Reais com Estados de Loading</h3>
          <div className="flex gap-2">
            <Button size="sm" variant="outlined" onClick={() => toggleLoading('table')}>
              Toggle Table Loading
            </Button>
            <Button size="sm" variant="outlined" onClick={() => toggleLoading('cards')}>
              Toggle Cards Loading
            </Button>
          </div>
        </div>

        <div className="space-y-8">
          {/* Real Table Component with Loading */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium">Tabela de Usuários</h4>
              <Button size="sm" onClick={() => toggleLoading('table')}>
                {loadingStates.table ? 'Carregar Dados' : 'Mostrar Loading'}
              </Button>
            </div>

            {loadingStates.table ? (
              <SkeletonTable rows={5} columns={4} />
            ) : (
              <SimpleDataTable
                data={sampleUsers}
                columns={tableColumns}
                searchable={true}
                pagination={true}
                pageSize={5}
              />
            )}
          </div>

          {/* Real Card Components with Loading */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium">Cards de Usuários</h4>
              <Button size="sm" onClick={() => toggleLoading('cards')}>
                {loadingStates.cards ? 'Carregar Dados' : 'Mostrar Loading'}
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {loadingStates.cards ? (
                // Show skeleton cards while loading
                Array.from({ length: 3 }).map((_, index) => (
                  <SkeletonCard key={index} showAvatar textLines={3} actions />
                ))
              ) : (
                // Show real cards when loaded
                sampleUsers.map((user) => (
                  <Card key={user.id} variant="elevated" interactive>
                    <CardHeader
                      title={user.name}
                      subtitle={user.role}
                      actions={
                        <Avatar size="sm" fallback={user.name.split(' ').map(n => n[0]).join('')} />
                      }
                    />
                    <CardContent>
                      <p className="text-gray-600 mb-3">{user.email}</p>
                      <Chip
                        variant={user.status === 'Ativo' ? 'success' : 'error'}
                        size="sm"
                      >
                        {user.status}
                      </Chip>
                    </CardContent>
                    <CardFooter>
                      <Button size="sm" variant="outlined">Ver Perfil</Button>
                      <Button size="sm">Editar</Button>
                    </CardFooter>
                  </Card>
                ))
              )}
            </div>
          </div>

          {/* User Profile with Loading */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium">Perfil de Usuário</h4>
              <Button size="sm" onClick={() => toggleLoading('userProfile')}>
                {loadingStates.userProfile ? 'Carregar Perfil' : 'Mostrar Loading'}
              </Button>
            </div>

            <Card variant="elevated">
              {loadingStates.userProfile ? (
                <div className="p-6">
                  <div className="flex items-start gap-6">
                    <SkeletonAvatar size="xl" />
                    <div className="flex-1">
                      <Skeleton variant="text" width="40%" height="1.5rem" className="mb-2" />
                      <Skeleton variant="text" width="60%" className="mb-4" />
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Skeleton variant="text" width="30%" className="mb-1" />
                          <Skeleton variant="text" width="80%" />
                        </div>
                        <div>
                          <Skeleton variant="text" width="40%" className="mb-1" />
                          <Skeleton variant="text" width="70%" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-6">
                  <div className="flex items-start gap-6">
                    <Avatar size="xl" fallback="JS" />
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold mb-1">João Silva</h2>
                      <p className="text-gray-600 mb-4">Desenvolvedor Full Stack com 5+ anos de experiência</p>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-gray-500 mb-1">Email</p>
                          <p className="text-sm">joao.silva@example.com</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500 mb-1">Departamento</p>
                          <p className="text-sm">Tecnologia</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* Dashboard Stats with Loading */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium">Dashboard Stats</h4>
              <Button size="sm" onClick={() => toggleLoading('dashboard')}>
                {loadingStates.dashboard ? 'Carregar Stats' : 'Mostrar Loading'}
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {loadingStates.dashboard ? (
                // Show skeleton stats while loading
                Array.from({ length: 4 }).map((_, index) => (
                  <Card key={index} variant="elevated">
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <Skeleton variant="text" width="60%" />
                        <Skeleton variant="circular" width="2rem" height="2rem" />
                      </div>
                      <Skeleton variant="text" width="40%" height="2rem" />
                    </div>
                  </Card>
                ))
              ) : (
                // Show real stats when loaded
                [
                  { label: 'Total Usuários', value: '1,429', icon: '👥' },
                  { label: 'Vendas', value: 'R$ 124k', icon: '💰' },
                  { label: 'Pedidos', value: '89', icon: '📦' },
                  { label: 'Taxa Conversão', value: '3.24%', icon: '📈' }
                ].map((stat, index) => (
                  <Card key={index} variant="elevated">
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                        <span className="text-2xl">{stat.icon}</span>
                      </div>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

// Real-world Usage Examples
export const RealWorldExamples: Story = {
  render: () => (
    <div className="w-full max-w-6xl space-y-8">
      <h3 className="text-lg font-semibold">Exemplos do Mundo Real</h3>

      <div className="space-y-8">
        {/* User Profile Loading */}
        <div>
          <h4 className="font-medium mb-4">Perfil de Usuário Carregando</h4>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-start gap-6">
              <SkeletonAvatar size="xl" />
              <div className="flex-1">
                <Skeleton variant="text" width="40%" height="1.5rem" className="mb-2" />
                <Skeleton variant="text" width="60%" className="mb-4" />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Skeleton variant="text" width="30%" className="mb-1" />
                    <Skeleton variant="text" width="80%" />
                  </div>
                  <div>
                    <Skeleton variant="text" width="40%" className="mb-1" />
                    <Skeleton variant="text" width="70%" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Loading */}
        <div>
          <h4 className="font-medium mb-4">Dashboard Carregando</h4>
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <Skeleton variant="text" width="12rem" height="2rem" />
              <div className="flex gap-2">
                <Skeleton variant="rounded" width="6rem" height="2.5rem" />
                <Skeleton variant="rounded" width="8rem" height="2.5rem" />
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Skeleton variant="text" width="60%" />
                    <Skeleton variant="circular" width="2rem" height="2rem" />
                  </div>
                  <Skeleton variant="text" width="40%" height="2rem" />
                </div>
              ))}
            </div>

            {/* Chart and Table */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <Skeleton variant="text" width="40%" className="mb-4" />
                <Skeleton variant="rectangular" height="12rem" />
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <Skeleton variant="text" width="30%" className="mb-4" />
                <SkeletonTable rows={5} columns={3} showHeader={false} />
              </div>
            </div>
          </div>
        </div>

        {/* Article List Loading */}
        <div>
          <h4 className="font-medium mb-4">Lista de Artigos Carregando</h4>
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex gap-4">
                  <Skeleton variant="rectangular" width="8rem" height="6rem" className="flex-shrink-0" />
                  <div className="flex-1">
                    <Skeleton variant="text" width="80%" height="1.25rem" className="mb-2" />
                    <SkeletonText lines={3} spacing="tight" className="mb-3" />
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <SkeletonAvatar size="xs" />
                        <Skeleton variant="text" width="4rem" />
                      </div>
                      <Skeleton variant="text" width="3rem" />
                      <Skeleton variant="text" width="2rem" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* E-commerce Product Grid */}
        <div>
          <h4 className="font-medium mb-4">Grade de Produtos E-commerce</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <Skeleton variant="rectangular" height="12rem" />
                <div className="p-4">
                  <Skeleton variant="text" width="90%" className="mb-2" />
                  <Skeleton variant="text" width="60%" className="mb-3" />
                  <div className="flex items-center justify-between">
                    <Skeleton variant="text" width="40%" height="1.25rem" />
                    <Skeleton variant="text" width="20%" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Custom Sizes and Combinations
export const CustomSizes: Story = {
  render: () => (
    <div className="w-full max-w-2xl space-y-6">
      <h3 className="text-lg font-semibold">Tamanhos Customizados</h3>

      <div className="space-y-6">
        <div>
          <h4 className="font-medium mb-2">Larguras Customizadas</h4>
          <div className="space-y-2">
            <Skeleton variant="text" width="25%" />
            <Skeleton variant="text" width="50%" />
            <Skeleton variant="text" width="75%" />
            <Skeleton variant="text" width="100%" />
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">Alturas Customizadas</h4>
          <div className="space-y-2">
            <Skeleton variant="rectangular" height="2rem" />
            <Skeleton variant="rectangular" height="4rem" />
            <Skeleton variant="rectangular" height="6rem" />
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2">Tamanhos Específicos</h4>
          <div className="flex gap-4 items-end">
            <Skeleton variant="rectangular" width="100px" height="100px" />
            <Skeleton variant="circular" width="80px" height="80px" />
            <Skeleton variant="rounded" width="120px" height="60px" />
          </div>
        </div>
      </div>
    </div>
  )
}
