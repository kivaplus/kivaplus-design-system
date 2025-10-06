import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { ActionButton } from '../components/action-button'
import { Button } from '../components/button'
import { Chip } from '../components/chip'
import { SectionHeader } from '../components/header-group'
import {
  SimpleDataTable,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '../components/table'
import ServerDataTable, { ServerTableParams, ServerTableResponse } from '../components/table/ServerDataTable'
import TableFilter from '../components/table/TableFilter'

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Table components for displaying tabular data. Built with centralized CSS component classes for consistent styling and includes advanced features like sorting, searching, and pagination.'
      }
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'striped', 'bordered'],
      description: 'Table variant style'
    }
  }
}

export default meta
type Story = StoryObj<typeof Table>

// Sample data for stories
const sampleUsers = [
  { id: 1, name: 'João Silva', email: 'joao@example.com', role: 'Admin', status: 'Ativo', salary: 5000, department: 'TI', joinDate: '2023-01-15' },
  { id: 2, name: 'Maria Santos', email: 'maria@example.com', role: 'Editor', status: 'Ativo', salary: 4000, department: 'Marketing', joinDate: '2023-02-20' },
  { id: 3, name: 'Pedro Costa', email: 'pedro@example.com', role: 'Viewer', status: 'Inativo', salary: 3000, department: 'Vendas', joinDate: '2023-03-10' },
  { id: 4, name: 'Ana Oliveira', email: 'ana@example.com', role: 'Admin', status: 'Ativo', salary: 5500, department: 'TI', joinDate: '2023-01-05' },
  { id: 5, name: 'Carlos Ferreira', email: 'carlos@example.com', role: 'Editor', status: 'Ativo', salary: 4200, department: 'Marketing', joinDate: '2023-04-12' },
  { id: 6, name: 'Lucia Pereira', email: 'lucia@example.com', role: 'Viewer', status: 'Inativo', salary: 2800, department: 'RH', joinDate: '2023-05-08' },
  { id: 7, name: 'Roberto Lima', email: 'roberto@example.com', role: 'Admin', status: 'Ativo', salary: 6000, department: 'TI', joinDate: '2023-01-20' },
  { id: 8, name: 'Fernanda Rocha', email: 'fernanda@example.com', role: 'Editor', status: 'Ativo', salary: 4500, department: 'Marketing', joinDate: '2023-06-15' },
  { id: 9, name: 'Marcos Alves', email: 'marcos@example.com', role: 'Viewer', status: 'Ativo', salary: 3200, department: 'Vendas', joinDate: '2023-07-01' },
  { id: 10, name: 'Patricia Souza', email: 'patricia@example.com', role: 'Admin', status: 'Inativo', salary: 5800, department: 'RH', joinDate: '2023-02-28' }
]

const sampleProducts = [
  { id: 1, name: 'Laptop Dell', category: 'Eletrônicos', price: 2500, stock: 15, rating: 4.5, brand: 'Dell' },
  { id: 2, name: 'Mouse Logitech', category: 'Acessórios', price: 80, stock: 50, rating: 4.2, brand: 'Logitech' },
  { id: 3, name: 'Teclado Mecânico', category: 'Acessórios', price: 200, stock: 25, rating: 4.8, brand: 'Corsair' },
  { id: 4, name: 'Monitor 24"', category: 'Eletrônicos', price: 800, stock: 8, rating: 4.3, brand: 'Samsung' },
  { id: 5, name: 'Webcam HD', category: 'Acessórios', price: 150, stock: 30, rating: 4.0, brand: 'Logitech' }
]

// Loading Component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center">
    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-brand-primary"></div>
    <span className="ml-2">Carregando...</span>
  </div>
)

// Interactive Table with Controls
export const Interactive: Story = {
  args: {
    variant: 'default'
  },
  render: (args) => (
    <div className="w-full max-w-4xl">
      <Table {...args}>
        <TableCaption>Lista de usuários do sistema</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Função</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sampleUsers.slice(0, 5).map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <Chip
                  variant={user.status === 'Ativo' ? 'success' : 'error'}
                  size="sm"
                >
                  {user.status}
                </Chip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

// Basic Table Example
export const BasicTable: Story = {
  render: () => (
    <div className="w-full max-w-4xl">
      <SectionHeader title="Tabela Básica" className="mb-4" />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Produto</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead numeric>Preço</TableHead>
            <TableHead numeric>Estoque</TableHead>
            <TableHead>Avaliação</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sampleProducts.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>
                <Chip
                  variant={product.category === 'Eletrônicos' ? 'primary' : 'accent'}
                  size="sm"
                >
                  {product.category}
                </Chip>
              </TableCell>
              <TableCell numeric>R$ {product.price.toLocaleString()}</TableCell>
              <TableCell numeric>
                <Chip
                  variant={product.stock > 20 ? 'success' : product.stock > 10 ? 'warning' : 'error'}
                  size="sm"
                >
                  {product.stock}
                </Chip>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <span>⭐</span>
                  <span>{product.rating}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex gap-1">
                  <ActionButton
                    icon={<span>👁️</span>}
                    size="sm"
                    variant="ghost"
                    tooltip="Ver produto"
                  />
                  <ActionButton
                    icon={<span>✏️</span>}
                    size="sm"
                    variant="ghost"
                    tooltip="Editar produto"
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell numeric>R$ {sampleProducts.reduce((sum, p) => sum + p.price, 0).toLocaleString()}</TableCell>
            <TableCell numeric>{sampleProducts.reduce((sum, p) => sum + p.stock, 0)}</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}

// Table Variants
export const TableVariants: Story = {
  render: () => (
    <div className="w-full max-w-4xl space-y-8">
      <SectionHeader title="Variações de Tabela" />

      <div className="space-y-6">
        <div>
          <SectionHeader title="Default" level={4} className="mb-2" />
          <Table variant="default">
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Função</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleUsers.slice(0, 3).map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div>
          <SectionHeader title="Striped" level={4} className="mb-2" />
          <Table variant="striped">
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Função</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleUsers.slice(0, 3).map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div>
          <SectionHeader title="Bordered" level={4} className="mb-2" />
          <Table variant="bordered">
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Função</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleUsers.slice(0, 3).map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

// Advanced DataTable with Search and Pagination
export const AdvancedDataTable: Story = {
  render: () => {
    const columns = [
      { key: 'name', header: 'Nome', sortable: true },
      { key: 'email', header: 'Email', sortable: true },
      { key: 'role', header: 'Função', sortable: true },
      { key: 'status', header: 'Status', sortable: true },
      { key: 'salary', header: 'Salário', sortable: true }
    ]

    return (
      <div className="w-full max-w-6xl">
        <h3 className="text-lg font-semibold mb-4">DataTable Avançada</h3>

        <SimpleDataTable
          data={sampleUsers}
          columns={columns}
          searchable={true}
          searchPlaceholder="Buscar usuários..."
          pagination={true}
          pageSize={5}
          onRowClick={(user) => console.log('Clicked user:', user)}
        />
      </div>
    )
  }
}

// DataTable with Custom Rendering
export const CustomDataTable: Story = {
  render: () => {
    const [selectedUsers, setSelectedUsers] = React.useState<number[]>([])

    const columns = [
      { key: 'name', header: 'Nome', sortable: true },
      { key: 'email', header: 'Email', sortable: true },
      { key: 'role', header: 'Função', sortable: true },
      { key: 'status', header: 'Status', sortable: false },
      { key: 'actions', header: 'Ações', sortable: false }
    ]

    const customData = sampleUsers.map(user => ({
      ...user,
      status: (
        <Chip
          variant={user.status === 'Ativo' ? 'success' : 'error'}
          size="sm"
        >
          {user.status}
        </Chip>
      ),
      actions: (
        <div className="flex gap-1">
          <ActionButton
            icon={<span>✏️</span>}
            size="sm"
            variant="ghost"
            tooltip="Editar usuário"
          />
          <ActionButton
            icon={<span>🗑️</span>}
            size="sm"
            variant="ghost"
            tooltip="Excluir usuário"
          />
        </div>
      )
    }))

    return (
      <div className="w-full max-w-6xl">
        <h3 className="text-lg font-semibold mb-4">DataTable com Renderização Customizada</h3>

        <SimpleDataTable
          data={customData}
          columns={columns}
          searchable={true}
          pagination={true}
          pageSize={6}
        />
      </div>
    )
  }
}

// Loading State
export const LoadingTable: Story = {
  render: () => {
    const [isLoading, setIsLoading] = React.useState(true)

    const columns = [
      { key: 'name', header: 'Nome', sortable: true },
      { key: 'email', header: 'Email', sortable: true },
      { key: 'role', header: 'Função', sortable: true }
    ]

    const sampleData = [
      { name: 'João Silva', email: 'joao@example.com', role: 'Admin' },
      { name: 'Maria Santos', email: 'maria@example.com', role: 'Editor' },
      { name: 'Pedro Costa', email: 'pedro@example.com', role: 'Viewer' }
    ]

    return (
      <div className="w-full max-w-4xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Estado de Carregamento com Skeleton</h3>
          <Button
            size="sm"
            onClick={() => setIsLoading(!isLoading)}
          >
            {isLoading ? 'Mostrar Dados' : 'Mostrar Loading'}
          </Button>
        </div>

        <p className="text-gray-600">
          Quando loading=true, a tabela mostra skeleton com 3 colunas e 10 linhas automaticamente.
        </p>

        <SimpleDataTable
          data={isLoading ? [] : sampleData}
          columns={columns}
          searchable={true}
          loading={isLoading}
          pageSize={10}
        />
      </div>
    )
  }
}

// Empty State
export const EmptyTable: Story = {
  render: () => {
    const columns = [
      { key: 'name', header: 'Nome', sortable: true },
      { key: 'email', header: 'Email', sortable: true },
      { key: 'role', header: 'Função', sortable: true }
    ]

    return (
      <div className="w-full max-w-4xl">
        <h3 className="text-lg font-semibold mb-4">Estado Vazio</h3>

        <SimpleDataTable
          data={[]}
          columns={columns}
          searchable={true}
          emptyMessage="Nenhum usuário encontrado. Adicione alguns usuários para começar."
        />
      </div>
    )
  }
}

// Clickable Rows
export const ClickableRows: Story = {
  render: () => {
    const [clickedUser, setClickedUser] = React.useState<typeof sampleUsers[0] | null>(null)

    const columns = [
      { key: 'name', header: 'Nome', sortable: true },
      { key: 'email', header: 'Email', sortable: true },
      { key: 'role', header: 'Função', sortable: true }
    ]

    return (
      <div className="w-full max-w-4xl space-y-4">
        <h3 className="text-lg font-semibold">Linhas Clicáveis</h3>

        {clickedUser && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-medium">Usuário Selecionado:</h4>
            <p>{clickedUser.name} - {clickedUser.email}</p>
          </div>
        )}

        <SimpleDataTable
          data={sampleUsers.slice(0, 5)}
          columns={columns}
          onRowClick={setClickedUser}
        />
      </div>
    )
  }
}

// Complex Table with All Features
export const ComplexTable: Story = {
  render: () => {
    const [users, setUsers] = React.useState(sampleUsers)
    const [loading, setLoading] = React.useState(false)

    const columns = [
      { key: 'id', header: 'ID', sortable: true },
      { key: 'name', header: 'Nome', sortable: true },
      { key: 'email', header: 'Email', sortable: true },
      { key: 'role', header: 'Função', sortable: true },
      { key: 'status', header: 'Status', sortable: true },
      { key: 'salary', header: 'Salário', sortable: true },
      { key: 'actions', header: 'Ações', sortable: false }
    ]

    const handleDelete = (userId: number) => {
      setLoading(true)
      setTimeout(() => {
        setUsers(prev => prev.filter(user => user.id !== userId))
        setLoading(false)
      }, 1000)
    }

    const customData = users.map(user => ({
      ...user,
      salary: `R$ ${user.salary.toLocaleString()}`,
      status: (
        <Chip
          variant={user.status === 'Ativo' ? 'success' : 'error'}
          size="sm"
        >
          {user.status}
        </Chip>
      ),
      actions: (
        <div className="flex gap-1">
          <ActionButton
            icon={<span>✏️</span>}
            size="sm"
            variant="ghost"
            tooltip="Editar usuário"
          />
          <ActionButton
            icon={<span>🗑️</span>}
            size="sm"
            variant="ghost"
            tooltip="Excluir usuário"
            onClick={() => handleDelete(user.id)}
          />
        </div>
      )
    }))

    return (
      <div className="w-full max-w-7xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Tabela Complexa</h3>
          <div className="flex gap-2">
            <Button variant="outlined">Exportar</Button>
            <Button>Adicionar Usuário</Button>
          </div>
        </div>

        <SimpleDataTable
          data={customData}
          columns={columns}
          searchable={true}
          searchPlaceholder="Buscar por nome, email ou função..."
          pagination={true}
          pageSize={7}
          loading={loading}
          emptyMessage="Nenhum usuário encontrado. Que tal adicionar o primeiro?"
        />
      </div>
    )
  }
}

// Responsive Table
export const ResponsiveTable: Story = {
  render: () => (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-4">Tabela Responsiva</h3>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nome Completo</TableHead>
              <TableHead>Endereço de Email</TableHead>
              <TableHead>Função no Sistema</TableHead>
              <TableHead>Status da Conta</TableHead>
              <TableHead>Data de Criação</TableHead>
              <TableHead>Último Acesso</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sampleUsers.slice(0, 3).map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell className="min-w-[150px]">{user.name}</TableCell>
                <TableCell className="min-w-[200px]">{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Chip
                    variant={user.status === 'Ativo' ? 'success' : 'error'}
                    size="sm"
                  >
                    {user.status}
                  </Chip>
                </TableCell>
                <TableCell className="whitespace-nowrap">15/03/2024</TableCell>
                <TableCell className="whitespace-nowrap">Hoje às 14:30</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <ActionButton
                      icon={<span>👁️</span>}
                      size="sm"
                      variant="outlined"
                      tooltip="Ver detalhes"
                    />
                    <ActionButton
                      icon={<span>✏️</span>}
                      size="sm"
                      variant="outlined"
                      tooltip="Editar usuário"
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

// Table with Advanced Filters
export const TableWithFilters: Story = {
  render: () => {
    const [filteredData, setFilteredData] = React.useState(sampleUsers)

    const filterConfig = {
      fields: [
        {
          key: 'name',
          label: 'Nome',
          type: 'input' as const,
          placeholder: 'Digite o nome...'
        },
        {
          key: 'role',
          label: 'Função',
          type: 'select' as const,
          options: [
            { value: 'Admin', label: 'Administrador' },
            { value: 'Editor', label: 'Editor' },
            { value: 'Viewer', label: 'Visualizador' }
          ]
        },
        {
          key: 'status',
          label: 'Status',
          type: 'radio' as const,
          options: [
            { value: 'Ativo', label: 'Ativo' },
            { value: 'Inativo', label: 'Inativo' }
          ]
        },
        {
          key: 'department',
          label: 'Departamento',
          type: 'checkbox' as const,
          options: [
            { value: 'TI', label: 'Tecnologia da Informação' },
            { value: 'Marketing', label: 'Marketing' },
            { value: 'Vendas', label: 'Vendas' },
            { value: 'RH', label: 'Recursos Humanos' }
          ]
        },
        {
          key: 'salary',
          label: 'Salário Mínimo',
          type: 'number' as const,
          placeholder: 'Ex: 4000'
        },
        {
          key: 'joinDate',
          label: 'Data de Contratação',
          type: 'date' as const
        }
      ]
    }

    const columns = [
      { key: 'name', header: 'Nome', sortable: true },
      { key: 'email', header: 'Email', sortable: true },
      { key: 'role', header: 'Função', sortable: true },
      { key: 'department', header: 'Departamento', sortable: true },
      { key: 'status', header: 'Status', sortable: true },
      { key: 'salary', header: 'Salário', sortable: true },
      { key: 'actions', header: 'Ações', sortable: false }
    ]

    const customData = filteredData.map(user => ({
      ...user,
      salary: `R$ ${user.salary.toLocaleString()}`,
      status: (
        <Chip
          variant={user.status === 'Ativo' ? 'success' : 'error'}
          size="sm"
        >
          {user.status}
        </Chip>
      ),
      actions: (
        <div className="flex gap-1">
          <ActionButton
            icon={<span>👁️</span>}
            size="sm"
            variant="ghost"
            tooltip="Visualizar"
          />
          <ActionButton
            icon={<span>✏️</span>}
            size="sm"
            variant="ghost"
            tooltip="Editar"
          />
          <ActionButton
            icon={<span>🗑️</span>}
            size="sm"
            variant="ghost"
            tooltip="Excluir"
          />
        </div>
      )
    }))

    return (
      <div className="w-full max-w-7xl space-y-4">
        <h3 className="text-lg font-semibold">Tabela com Filtros Avançados</h3>

        <TableFilter
          config={filterConfig}
          data={sampleUsers}
          onFilteredDataChange={setFilteredData}
        />

        <SimpleDataTable
          data={customData}
          columns={columns}
          searchable={true}
          pagination={true}
          pageSize={8}
        />
      </div>
    )
  }
}

// Products Table with Filters
export const ProductsWithFilters: Story = {
  render: () => {
    const [filteredData, setFilteredData] = React.useState(sampleProducts)

    const filterConfig = {
      fields: [
        {
          key: 'name',
          label: 'Nome do Produto',
          type: 'input' as const,
          placeholder: 'Digite o nome do produto...'
        },
        {
          key: 'category',
          label: 'Categoria',
          type: 'select' as const,
          options: [
            { value: 'Eletrônicos', label: 'Eletrônicos' },
            { value: 'Acessórios', label: 'Acessórios' }
          ]
        },
        {
          key: 'brand',
          label: 'Marca',
          type: 'checkbox' as const,
          options: [
            { value: 'Dell', label: 'Dell' },
            { value: 'Logitech', label: 'Logitech' },
            { value: 'Corsair', label: 'Corsair' },
            { value: 'Samsung', label: 'Samsung' }
          ]
        },
        {
          key: 'price',
          label: 'Preço Máximo',
          type: 'number' as const,
          placeholder: 'Ex: 1000'
        }
      ]
    }

    const columns = [
      { key: 'name', header: 'Produto', sortable: true },
      { key: 'category', header: 'Categoria', sortable: true },
      { key: 'brand', header: 'Marca', sortable: true },
      { key: 'price', header: 'Preço', sortable: true },
      { key: 'stock', header: 'Estoque', sortable: true },
      { key: 'rating', header: 'Avaliação', sortable: true },
      { key: 'actions', header: 'Ações', sortable: false }
    ]

    const customData = filteredData.map(product => ({
      ...product,
      price: `R$ ${product.price.toLocaleString()}`,
      category: (
        <Chip
          variant={product.category === 'Eletrônicos' ? 'primary' : 'accent'}
          size="sm"
        >
          {product.category}
        </Chip>
      ),
      stock: (
        <Chip
          variant={product.stock > 20 ? 'success' : product.stock > 10 ? 'warning' : 'error'}
          size="sm"
        >
          {product.stock}
        </Chip>
      ),
      rating: (
        <div className="flex items-center gap-1">
          <span>⭐</span>
          <span>{product.rating}</span>
        </div>
      ),
      actions: (
        <div className="flex gap-1">
          <ActionButton
            icon={<span>📝</span>}
            size="sm"
            variant="ghost"
            tooltip="Editar produto"
          />
          <ActionButton
            icon={<span>📊</span>}
            size="sm"
            variant="ghost"
            tooltip="Ver estatísticas"
          />
          <ActionButton
            icon={<span>🛒</span>}
            size="sm"
            variant="ghost"
            tooltip="Adicionar ao carrinho"
          />
        </div>
      )
    }))

    return (
      <div className="w-full max-w-7xl space-y-4">
        <h3 className="text-lg font-semibold">Produtos com Filtros</h3>

        <TableFilter
          config={filterConfig}
          data={sampleProducts}
          onFilteredDataChange={setFilteredData}
        />

        <SimpleDataTable
          data={customData}
          columns={columns}
          searchable={true}
          pagination={true}
          pageSize={5}
        />
      </div>
    )
  }
}

// Skeleton Loading Demonstration
export const SkeletonLoadingDemo: Story = {
  render: () => {
    const [loadingStates, setLoadingStates] = React.useState({
      simple: true,
      complex: true,
      server: true
    })

    const toggleLoading = (type: keyof typeof loadingStates) => {
      setLoadingStates(prev => ({ ...prev, [type]: !prev[type] }))
    }

    const simpleColumns = [
      { key: 'name', header: 'Nome', sortable: true },
      { key: 'email', header: 'Email', sortable: true },
      { key: 'role', header: 'Função', sortable: true }
    ]

    const complexColumns = [
      { key: 'id', header: 'ID', sortable: true },
      { key: 'name', header: 'Nome', sortable: true },
      { key: 'email', header: 'Email', sortable: true },
      { key: 'role', header: 'Função', sortable: true },
      { key: 'department', header: 'Departamento', sortable: true },
      { key: 'status', header: 'Status', sortable: true },
      { key: 'salary', header: 'Salário', sortable: true },
      { key: 'actions', header: 'Ações', sortable: false }
    ]

    return (
      <div className="w-full max-w-7xl space-y-8">
        <div>
          <h3 className="text-lg font-semibold mb-2">Demonstração de Skeleton Loading</h3>
          <p className="text-gray-600">
            Veja como o skeleton se adapta automaticamente ao número de colunas e linhas da tabela.
          </p>
        </div>

        {/* Simple Table - 3 columns */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Tabela Simples (3 colunas × 5 linhas)</h4>
            <Button size="sm" onClick={() => toggleLoading('simple')}>
              {loadingStates.simple ? 'Mostrar Dados' : 'Mostrar Skeleton'}
            </Button>
          </div>

          <SimpleDataTable
            data={loadingStates.simple ? [] : sampleUsers.slice(0, 3)}
            columns={simpleColumns}
            loading={loadingStates.simple}
            pageSize={5}
          />
        </div>

        {/* Complex Table - 8 columns */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Tabela Complexa (8 colunas × 7 linhas)</h4>
            <Button size="sm" onClick={() => toggleLoading('complex')}>
              {loadingStates.complex ? 'Mostrar Dados' : 'Mostrar Skeleton'}
            </Button>
          </div>

          <SimpleDataTable
            data={loadingStates.complex ? [] : sampleUsers.slice(0, 5).map(user => ({
              ...user,
              salary: `R$ ${user.salary.toLocaleString()}`,
              status: (
                <Chip variant={user.status === 'Ativo' ? 'success' : 'error'} size="sm">
                  {user.status}
                </Chip>
              ),
              actions: (
                <div className="flex gap-1">
                  <ActionButton icon={<span>👁️</span>} size="sm" variant="ghost" />
                  <ActionButton icon={<span>✏️</span>} size="sm" variant="ghost" />
                </div>
              )
            }))}
            columns={complexColumns}
            loading={loadingStates.complex}
            pageSize={7}
          />
        </div>

        {/* Server Table */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">ServerDataTable (8 colunas × 10 linhas)</h4>
            <Button size="sm" onClick={() => toggleLoading('server')}>
              {loadingStates.server ? 'Carregar Dados' : 'Mostrar Skeleton'}
            </Button>
          </div>

          <ServerDataTable
            columns={complexColumns}
            fetchData={async (params) => {
              if (loadingStates.server) {
                await new Promise(resolve => setTimeout(resolve, 3000))
              }

              return {
                data: sampleUsers.slice(0, params.pageSize).map(user => ({
                  ...user,
                  salary: `R$ ${user.salary.toLocaleString()}`,
                  status: (
                    <Chip variant={user.status === 'Ativo' ? 'success' : 'error'} size="sm">
                      {user.status}
                    </Chip>
                  ),
                  actions: (
                    <div className="flex gap-1">
                      <ActionButton icon={<span>👁️</span>} size="sm" variant="ghost" />
                      <ActionButton icon={<span>✏️</span>} size="sm" variant="ghost" />
                    </div>
                  )
                })),
                total: sampleUsers.length,
                page: params.page,
                pageSize: params.pageSize,
                totalPages: Math.ceil(sampleUsers.length / params.pageSize)
              }
            }}
            pageSize={10}
          />
        </div>
      </div>
    )
  }
}

// Loading State with Custom Component
export const LoadingWithCustomComponent: Story = {
  render: () => {
    const [loadingType, setLoadingType] = React.useState<'skeleton' | 'spinner'>('skeleton')

    return (
      <div className="w-full max-w-4xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Comparação: Skeleton vs Spinner</h3>
          <Button
            size="sm"
            onClick={() => setLoadingType(loadingType === 'skeleton' ? 'spinner' : 'skeleton')}
          >
            Mostrar {loadingType === 'skeleton' ? 'Spinner' : 'Skeleton'}
          </Button>
        </div>

        <p className="text-gray-600">
          Compare o skeleton automático com o loading spinner tradicional.
        </p>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Função</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loadingType === 'skeleton' ? (
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell><div className="skeleton h-4 w-full" /></TableCell>
                  <TableCell><div className="skeleton h-4 w-full" /></TableCell>
                  <TableCell><div className="skeleton h-4 w-full" /></TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-8">
                  <LoadingSpinner />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    )
  }
}
// Table showcasing Chip and ActionButton variants
export const ChipAndActionShowcase: Story = {
  render: () => {
    const showcaseData = [
      {
        id: 1,
        name: 'Sistema Principal',
        status: 'Online',
        priority: 'Alta',
        type: 'Produção',
        health: 95,
        lastUpdate: '2 min atrás'
      },
      {
        id: 2,
        name: 'API Gateway',
        status: 'Manutenção',
        priority: 'Média',
        type: 'Infraestrutura',
        health: 78,
        lastUpdate: '15 min atrás'
      },
      {
        id: 3,
        name: 'Base de Dados',
        status: 'Offline',
        priority: 'Crítica',
        type: 'Dados',
        health: 12,
        lastUpdate: '1 hora atrás'
      },
      {
        id: 4,
        name: 'CDN Global',
        status: 'Online',
        priority: 'Baixa',
        type: 'Rede',
        health: 88,
        lastUpdate: '5 min atrás'
      }
    ]

    const columns = [
      { key: 'name', header: 'Serviço', sortable: true },
      { key: 'status', header: 'Status', sortable: true },
      { key: 'priority', header: 'Prioridade', sortable: true },
      { key: 'type', header: 'Tipo', sortable: true },
      { key: 'health', header: 'Saúde', sortable: true },
      { key: 'lastUpdate', header: 'Última Atualização', sortable: true },
      { key: 'actions', header: 'Ações', sortable: false }
    ]

    const customData = showcaseData.map(item => ({
      ...item,
      status: (
        <Chip
          variant={
            item.status === 'Online' ? 'success' :
              item.status === 'Manutenção' ? 'warning' : 'error'
          }
          size="sm"
        >
          {item.status}
        </Chip>
      ),
      priority: (
        <Chip
          variant={
            item.priority === 'Crítica' ? 'error' :
              item.priority === 'Alta' ? 'warning' :
                item.priority === 'Média' ? 'primary' : 'neutral'
          }
          size="sm"
        >
          {item.priority}
        </Chip>
      ),
      type: (
        <Chip
          variant={
            item.type === 'Produção' ? 'accent' :
              item.type === 'Infraestrutura' ? 'primary' :
                item.type === 'Dados' ? 'info' : 'neutral'
          }
          size="sm"
        >
          {item.type}
        </Chip>
      ),
      health: (
        <div className="flex items-center gap-2">
          <Chip
            variant={
              item.health >= 80 ? 'success' :
                item.health >= 50 ? 'warning' : 'error'
            }
            size="sm"
          >
            {item.health}%
          </Chip>
        </div>
      ),
      actions: (
        <div className="flex gap-1">
          <ActionButton
            icon={<span>📊</span>}
            size="sm"
            variant="ghost"
            tooltip="Ver métricas"
          />
          <ActionButton
            icon={<span>⚙️</span>}
            size="sm"
            variant="ghost"
            tooltip="Configurações"
          />
          <ActionButton
            icon={<span>🔄</span>}
            size="sm"
            variant="ghost"
            tooltip="Reiniciar serviço"
          />
          <ActionButton
            icon={<span>📋</span>}
            size="sm"
            variant="ghost"
            tooltip="Ver logs"
          />
          <ActionButton
            icon={<span>⚠️</span>}
            size="sm"
            variant="ghost"
            tooltip="Alertas"
          />
        </div>
      )
    }))

    return (
      <div className="w-full max-w-7xl space-y-4">
        <h3 className="text-lg font-semibold">Showcase de Chips e ActionButtons</h3>
        <p className="text-gray-600">
          Demonstração de diferentes variantes de Chip e múltiplos ActionButtons por linha
        </p>

        <SimpleDataTable
          data={customData}
          columns={columns}
          searchable={true}
          pagination={false}
        />
      </div>
    )
  }
}

// Table with ActionButton Groups
export const ActionButtonGroups: Story = {
  render: () => {
    const userData = sampleUsers.slice(0, 5).map(user => ({
      ...user,
      status: (
        <Chip
          variant={user.status === 'Ativo' ? 'success' : 'error'}
          size="sm"
        >
          {user.status}
        </Chip>
      ),
      quickActions: (
        <div className="flex gap-1">
          <ActionButton
            icon={<span>👁️</span>}
            size="sm"
            variant="primary"
            tooltip="Visualizar perfil"
          />
          <ActionButton
            icon={<span>💬</span>}
            size="sm"
            variant="accent"
            tooltip="Enviar mensagem"
          />
        </div>
      ),
      adminActions: (
        <div className="flex gap-1">
          <ActionButton
            icon={<span>✏️</span>}
            size="sm"
            variant="outlined"
            tooltip="Editar usuário"
          />
          <ActionButton
            icon={<span>🔒</span>}
            size="sm"
            variant="neutral"
            tooltip="Bloquear acesso"
          />
          <ActionButton
            icon={<span>🗑️</span>}
            size="sm"
            variant="ghost"
            tooltip="Excluir usuário"
          />
        </div>
      )
    }))

    const columns = [
      { key: 'name', header: 'Nome', sortable: true },
      { key: 'email', header: 'Email', sortable: true },
      { key: 'role', header: 'Função', sortable: true },
      { key: 'status', header: 'Status', sortable: true },
      { key: 'quickActions', header: 'Ações Rápidas', sortable: false },
      { key: 'adminActions', header: 'Ações Admin', sortable: false }
    ]

    return (
      <div className="w-full max-w-7xl space-y-4">
        <h3 className="text-lg font-semibold">Grupos de ActionButtons</h3>
        <p className="text-gray-600">
          Demonstração de diferentes grupos de ações com variantes distintas
        </p>

        <SimpleDataTable
          data={userData}
          columns={columns}
          searchable={true}
          pagination={false}
        />
      </div>
    )
  }
}
// Server-side Table Loading State
export const ServerSideTableLoading: Story = {
  render: () => {
    const [isLoading, setIsLoading] = React.useState(true)

    const columns = [
      { key: 'id', header: 'ID', sortable: true, numeric: true },
      { key: 'name', header: 'Nome', sortable: true },
      { key: 'email', header: 'Email', sortable: true },
      { key: 'role', header: 'Função', sortable: true },
      { key: 'department', header: 'Departamento', sortable: true },
      { key: 'status', header: 'Status', sortable: true },
      { key: 'salary', header: 'Salário', sortable: true, numeric: true },
      { key: 'actions', header: 'Ações', sortable: false }
    ]

    const mockAPI = async (params: ServerTableParams): Promise<ServerTableResponse<any>> => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000))

      return {
        data: sampleUsers.slice(0, params.pageSize),
        total: sampleUsers.length,
        page: params.page,
        pageSize: params.pageSize,
        totalPages: Math.ceil(sampleUsers.length / params.pageSize)
      }
    }

    return (
      <div className="w-full max-w-7xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">ServerDataTable com Skeleton Loading</h3>
          <Button
            size="sm"
            onClick={() => setIsLoading(!isLoading)}
          >
            {isLoading ? 'Parar Loading' : 'Iniciar Loading'}
          </Button>
        </div>

        <p className="text-gray-600">
          Quando carregando dados do servidor, mostra skeleton com 8 colunas e 10 linhas automaticamente.
        </p>

        <ServerDataTable
          columns={columns}
          fetchData={isLoading ? mockAPI : async (params) => ({
            data: sampleUsers.slice(0, params.pageSize).map(user => ({
              ...user,
              salary: `R$ ${user.salary.toLocaleString()}`,
              status: (
                <Chip variant={user.status === 'Ativo' ? 'success' : 'error'} size="sm">
                  {user.status}
                </Chip>
              ),
              actions: (
                <div className="flex gap-1">
                  <ActionButton icon={<span>👁️</span>} size="sm" variant="ghost" tooltip="Ver" />
                  <ActionButton icon={<span>✏️</span>} size="sm" variant="ghost" tooltip="Editar" />
                </div>
              )
            })),
            total: sampleUsers.length,
            page: params.page,
            pageSize: params.pageSize,
            totalPages: Math.ceil(sampleUsers.length / params.pageSize)
          })}
          searchable={true}
          pageSize={10}
        />
      </div>
    )
  }
}

// Server-side Table Example
export const ServerSideTable: Story = {
  render: () => {
    // Mock API function that simulates server-side operations
    const mockFetchUsers = async (params: ServerTableParams): Promise<ServerTableResponse<any>> => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800))

      // Generate large dataset (simulating 1M records)
      const totalRecords = 1000000
      let allUsers: typeof sampleUsers = []

      // Generate sample data based on page (in real app, this comes from database)
      const startId = (params.page - 1) * params.pageSize + 1
      for (let i = 0; i < params.pageSize; i++) {
        const id = startId + i
        if (id > totalRecords) break

        const names = ['João', 'Maria', 'Pedro', 'Ana', 'Carlos', 'Lucia', 'Roberto', 'Fernanda']
        const surnames = ['Silva', 'Santos', 'Costa', 'Oliveira', 'Ferreira', 'Pereira', 'Lima', 'Rocha']
        const roles = ['Admin', 'Editor', 'Viewer']
        const departments = ['TI', 'Marketing', 'Vendas', 'RH']
        const statuses = ['Ativo', 'Inativo']

        const name = `${names[id % names.length]} ${surnames[id % surnames.length]}`
        const email = `user${id}@example.com`
        const role = roles[id % roles.length]
        const department = departments[id % departments.length]
        const status = statuses[id % statuses.length]
        const salary = 3000 + (id % 5000)

        allUsers.push({
          id,
          name,
          email,
          role,
          department,
          status,
          salary,
          joinDate: new Date(2020 + (id % 4), (id % 12), (id % 28) + 1).toISOString().split('T')[0]
        })
      }

      // Apply server-side filtering
      if (params.search) {
        allUsers = allUsers.filter(user =>
          user.name.toLowerCase().includes(params?.search!.toLowerCase()) ||
          user.email.toLowerCase().includes(params?.search!.toLowerCase())
        )
      }

      if (params.filters) {
        Object.entries(params.filters).forEach(([key, value]: [string, any]) => {
          if (value && value !== '') {
            if (key === 'role' && value) {
              allUsers = allUsers.filter(user => user.role === value)
            }
            if (key === 'status' && value) {
              allUsers = allUsers.filter(user => user.status === value)
            }
            if (key === 'department' && Array.isArray(value) && value.length > 0) {
              allUsers = allUsers.filter(user => value.includes(user.department))
            }
            if (key === 'salary' && value) {
              allUsers = allUsers.filter(user => user.salary >= parseInt(value))
            }
          }
        })
      }

      // Apply server-side sorting
      if (params.sortBy && params.sortOrder) {
        allUsers.sort((a, b) => {
          const aVal = a[params.sortBy as keyof typeof a]
          const bVal = b[params.sortBy as keyof typeof b]

          if (aVal < bVal) return params.sortOrder === 'asc' ? -1 : 1
          if (aVal > bVal) return params.sortOrder === 'asc' ? 1 : -1
          return 0
        })
      }

      // Calculate pagination
      const filteredTotal = params.search || params.filters ? allUsers.length : totalRecords
      const totalPages = Math.ceil(filteredTotal / params.pageSize)

      return {
        data: allUsers,
        total: filteredTotal,
        page: params.page,
        pageSize: params.pageSize,
        totalPages
      }
    }

    const columns = [
      {
        key: 'id',
        header: 'ID',
        sortable: true,
        numeric: true
      },
      {
        key: 'name',
        header: 'Nome',
        sortable: true
      },
      {
        key: 'email',
        header: 'Email',
        sortable: true
      },
      {
        key: 'role',
        header: 'Função',
        sortable: true
      },
      {
        key: 'department',
        header: 'Departamento',
        sortable: true
      },
      {
        key: 'status',
        header: 'Status',
        sortable: true,
        render: (value: string) => (
          <Chip
            variant={value === 'Ativo' ? 'success' : 'error'}
            size="sm"
          >
            {value}
          </Chip>
        )
      },
      {
        key: 'salary',
        header: 'Salário',
        sortable: true,
        numeric: true,
        render: (value: number) => `R$ ${value.toLocaleString()}`
      },
      {
        key: 'actions',
        header: 'Ações',
        sortable: false,
        render: (_: any, row: typeof sampleUsers[0]) => (
          <div className="flex gap-1">
            <ActionButton
              icon={<span>👁️</span>}
              size="sm"
              variant="ghost"
              tooltip="Visualizar"
            />
            <ActionButton
              icon={<span>✏️</span>}
              size="sm"
              variant="ghost"
              tooltip="Editar"
            />
            <ActionButton
              icon={<span>🗑️</span>}
              size="sm"
              variant="ghost"
              tooltip="Excluir"
            />
          </div>
        )
      }
    ]

    const filterConfig = {
      fields: [
        {
          key: 'role',
          label: 'Função',
          type: 'select' as const,
          options: [
            { value: 'Admin', label: 'Administrador' },
            { value: 'Editor', label: 'Editor' },
            { value: 'Viewer', label: 'Visualizador' }
          ]
        },
        {
          key: 'status',
          label: 'Status',
          type: 'radio' as const,
          options: [
            { value: 'Ativo', label: 'Ativo' },
            { value: 'Inativo', label: 'Inativo' }
          ]
        },
        {
          key: 'department',
          label: 'Departamento',
          type: 'checkbox' as const,
          options: [
            { value: 'TI', label: 'Tecnologia da Informação' },
            { value: 'Marketing', label: 'Marketing' },
            { value: 'Vendas', label: 'Vendas' },
            { value: 'RH', label: 'Recursos Humanos' }
          ]
        },
        {
          key: 'salary',
          label: 'Salário Mínimo',
          type: 'number' as const,
          placeholder: 'Ex: 4000'
        }
      ]
    }

    return (
      <div className="w-full max-w-7xl space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Tabela Server-Side (1M+ registros)</h3>
          <p className="text-gray-600">
            Demonstração de tabela com paginação, filtros e ordenação no servidor.
            Simula 1 milhão de registros com carregamento eficiente.
          </p>
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              💡 <strong>Performance:</strong> Apenas {20} registros são carregados por vez,
              independente do tamanho total do dataset. Filtros e ordenação são processados no servidor.
            </p>
          </div>
        </div>

        <ServerDataTable
          columns={columns}
          fetchData={mockFetchUsers}
          filterConfig={filterConfig}
          searchable={true}
          searchPlaceholder="Buscar por nome ou email..."
          pageSize={20}
          onRowClick={(user) => console.log('Clicked user:', user)}
        />
      </div>
    )
  }
}

// Real-world API Integration Example
export const RealWorldAPIExample: Story = {
  render: () => {
    // Example of how to integrate with a real API
    const fetchUsersFromAPI = async (params: ServerTableParams): Promise<ServerTableResponse<any>> => {
      // In a real application, you would call your API like this:
      /*
      const queryParams = new URLSearchParams({
        page: params.page.toString(),
        limit: params.pageSize.toString(),
        ...(params.sortBy && { sortBy: params.sortBy }),
        ...(params.sortOrder && { sortOrder: params.sortOrder }),
        ...(params.search && { search: params.search }),
        ...(params.filters && { filters: JSON.stringify(params.filters) })
      })

      const response = await fetch(`/api/users?${queryParams}`)
      const data = await response.json()

      return {
        data: data.users,
        total: data.total,
        page: data.page,
        pageSize: data.pageSize,
        totalPages: data.totalPages
      }
      */

      // For demo purposes, we'll simulate the API response
      await new Promise(resolve => setTimeout(resolve, 600))

      return {
        data: [
          { id: 1, name: 'API User 1', email: 'api1@example.com', status: 'Ativo' },
          { id: 2, name: 'API User 2', email: 'api2@example.com', status: 'Inativo' },
        ],
        total: 2,
        page: params.page,
        pageSize: params.pageSize,
        totalPages: 1
      }
    }

    const columns = [
      { key: 'id', header: 'ID', sortable: true, numeric: true },
      { key: 'name', header: 'Nome', sortable: true },
      { key: 'email', header: 'Email', sortable: true },
      {
        key: 'status',
        header: 'Status',
        render: (value: string) => (
          <Chip variant={value === 'Ativo' ? 'success' : 'error'} size="sm">
            {value}
          </Chip>
        )
      }
    ]

    return (
      <div className="w-full max-w-6xl space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Integração com API Real</h3>
          <p className="text-gray-600">
            Exemplo de como integrar com uma API REST real para grandes datasets.
          </p>

          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-2">Exemplo de Endpoint da API:</h4>
            <code className="text-sm bg-white p-2 rounded border block">
              GET /api/users?page=1&limit=20&sortBy=name&sortOrder=asc&search=joão&filters={`{"status":"Ativo"}`}
            </code>

            <h4 className="font-medium mt-3 mb-2">Resposta Esperada:</h4>
            <pre className="text-xs bg-white p-2 rounded border overflow-x-auto">
              {`{
  "data": [...],
  "total": 1000000,
  "page": 1,
  "pageSize": 20,
  "totalPages": 50000
}`}
            </pre>
          </div>
        </div>

        <ServerDataTable
          columns={columns}
          fetchData={fetchUsersFromAPI}
          searchable={true}
          pageSize={10}
        />
      </div>
    )
  }
}

// Mock database with 10,000 records for realistic testing
const generateMockDatabase = () => {
  const names = [
    'João Silva', 'Maria Santos', 'Pedro Costa', 'Ana Oliveira', 'Carlos Ferreira',
    'Lucia Pereira', 'Roberto Lima', 'Fernanda Rocha', 'Marcos Alves', 'Patricia Souza',
    'Ricardo Barbosa', 'Juliana Cardoso', 'Felipe Nascimento', 'Camila Rodrigues', 'Bruno Martins',
    'Larissa Gomes', 'Diego Araújo', 'Beatriz Fernandes', 'Gustavo Ribeiro', 'Natália Carvalho'
  ]

  const emails = names.map(name =>
    name.toLowerCase().replace(' ', '.') + '@empresa.com'
  )

  const roles = ['Admin', 'Editor', 'Viewer', 'Manager', 'Analyst']
  const departments = ['TI', 'Marketing', 'Vendas', 'RH', 'Financeiro', 'Operações']
  const statuses = ['Ativo', 'Inativo', 'Pendente', 'Suspenso']
  const cities = ['São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Salvador', 'Brasília', 'Curitiba']

  const database = []

  for (let i = 1; i <= 10000; i++) {
    const nameIndex = (i - 1) % names.length
    const baseDate = new Date(2020, 0, 1)
    const randomDays = Math.floor(Math.random() * 1460) // 4 years

    database.push({
      id: i,
      name: names[nameIndex] + (i > names.length ? ` ${Math.floor(i / names.length)}` : ''),
      email: emails[nameIndex].replace('@', `${i > names.length ? i : ''}@`),
      role: roles[i % roles.length],
      department: departments[i % departments.length],
      status: statuses[i % statuses.length],
      salary: 3000 + (i % 8000), // Salary between 3k-11k
      city: cities[i % cities.length],
      joinDate: new Date(baseDate.getTime() + randomDays * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      lastLogin: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      projectsCount: Math.floor(Math.random() * 20),
      performance: Math.floor(Math.random() * 100) + 1
    })
  }

  return database
}

// Mock database instance
const mockDatabase = generateMockDatabase()

// Static vs Server-side Comparison
export const StaticVsServerSide: Story = {
  render: () => {
    // Static data (limited to first 50 records for demo)
    const staticData = mockDatabase.slice(0, 50)

    const staticColumns = [
      { key: 'id', header: 'ID', sortable: true },
      { key: 'name', header: 'Nome', sortable: true },
      { key: 'email', header: 'Email', sortable: true },
      { key: 'role', header: 'Função', sortable: true },
      { key: 'status', header: 'Status', sortable: false },
      { key: 'salary', header: 'Salário', sortable: true }
    ]

    const staticDataWithRendering = staticData.map(user => ({
      ...user,
      salary: `R$ ${user.salary.toLocaleString()}`,
      status: (
        <Chip
          variant={
            user.status === 'Ativo' ? 'success' :
              user.status === 'Pendente' ? 'warning' : 'error'
          }
          size="sm"
        >
          {user.status}
        </Chip>
      )
    }))

    return (
      <div className="w-full max-w-7xl space-y-8">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Comparação: Tabela Estática vs Server-Side</h3>
          <p className="text-gray-600">
            Compare o comportamento entre uma tabela com dados estáticos (limitada)
            e uma tabela server-side (escalável para milhões de registros).
          </p>
        </div>

        {/* Static Table */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h4 className="font-medium">📊 Tabela Estática (50 registros)</h4>
            <Chip variant="warning" size="sm">Limitada</Chip>
          </div>
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              ⚠️ Todos os dados são carregados no cliente. Não recomendado para grandes datasets.
            </p>
          </div>

          <SimpleDataTable
            data={staticDataWithRendering}
            columns={staticColumns}
            searchable={true}
            pagination={true}
            pageSize={10}
          />
        </div>

        {/* Server-side Table */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h4 className="font-medium">🚀 Tabela Server-Side (10.000 registros)</h4>
            <Chip variant="success" size="sm">Escalável</Chip>
          </div>
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800">
              ✅ Apenas os dados necessários são carregados. Suporta milhões de registros.
            </p>
          </div>

          <ServerDataTable
            columns={[
              { key: 'id', header: 'ID', sortable: true, numeric: true },
              { key: 'name', header: 'Nome', sortable: true },
              { key: 'email', header: 'Email', sortable: true },
              { key: 'role', header: 'Função', sortable: true },
              {
                key: 'status',
                header: 'Status',
                sortable: true,
                render: (value: string) => (
                  <Chip
                    variant={
                      value === 'Ativo' ? 'success' :
                        value === 'Pendente' ? 'warning' : 'error'
                    }
                    size="sm"
                  >
                    {value}
                  </Chip>
                )
              },
              {
                key: 'salary',
                header: 'Salário',
                sortable: true,
                numeric: true,
                render: (value: number) => `R$ ${value.toLocaleString()}`
              }
            ]}
            fetchData={async (params) => {
              // Simulate API delay
              await new Promise(resolve => setTimeout(resolve, 300))

              let filteredData = [...mockDatabase]

              // Apply search
              if (params.search) {
                const searchLower = params.search.toLowerCase()
                filteredData = filteredData.filter(item =>
                  item.name.toLowerCase().includes(searchLower) ||
                  item.email.toLowerCase().includes(searchLower)
                )
              }

              // Apply sorting
              if (params.sortBy) {
                filteredData.sort((a, b) => {
                  const aVal = a[params.sortBy as keyof typeof a]
                  const bVal = b[params.sortBy as keyof typeof b]

                  if (aVal < bVal) return params.sortOrder === 'asc' ? -1 : 1
                  if (aVal > bVal) return params.sortOrder === 'asc' ? 1 : -1
                  return 0
                })
              }

              // Apply pagination
              const startIndex = (params.page - 1) * params.pageSize
              const endIndex = startIndex + params.pageSize
              const pageData = filteredData.slice(startIndex, endIndex)

              return {
                data: pageData,
                total: filteredData.length,
                page: params.page,
                pageSize: params.pageSize,
                totalPages: Math.ceil(filteredData.length / params.pageSize)
              }
            }}
            searchable={true}
            pageSize={10}
          />
        </div>
      </div>
    )
  }
}

// Complete ServerDataTable Example with All Features
export const CompleteServerDataTable: Story = {
  render: () => {
    // Advanced mock API with realistic business logic
    const mockAdvancedAPI = async (params: ServerTableParams): Promise<ServerTableResponse<any>> => {
      // Simulate realistic API delay based on complexity
      const delay = params.search || params.filters ? 600 : 300
      await new Promise(resolve => setTimeout(resolve, delay))

      let data = [...mockDatabase]

      // Apply search across multiple fields
      if (params.search) {
        const searchTerm = params.search.toLowerCase()
        data = data.filter(item =>
          item.name.toLowerCase().includes(searchTerm) ||
          item.email.toLowerCase().includes(searchTerm) ||
          item.role.toLowerCase().includes(searchTerm) ||
          item.department.toLowerCase().includes(searchTerm) ||
          item.city.toLowerCase().includes(searchTerm)
        )
      }

      // Apply filters
      if (params.filters) {
        Object.entries(params.filters).forEach(([key, value]: [string, any]) => {
          if (value !== undefined && value !== null && value !== '') {
            switch (key) {
              case 'role':
                if (value) data = data.filter(item => item.role === value)
                break
              case 'status':
                if (value) data = data.filter(item => item.status === value)
                break
              case 'department':
                if (Array.isArray(value) && value.length > 0) {
                  data = data.filter(item => value.includes(item.department))
                }
                break
              case 'city':
                if (Array.isArray(value) && value.length > 0) {
                  data = data.filter(item => value.includes(item.city))
                }
                break
              case 'salaryMin':
                if (value) data = data.filter(item => item.salary >= parseInt(value))
                break
              case 'salaryMax':
                if (value) data = data.filter(item => item.salary <= parseInt(value))
                break
              case 'joinDateFrom':
                if (value) data = data.filter(item => item.joinDate >= value)
                break
              case 'joinDateTo':
                if (value) data = data.filter(item => item.joinDate <= value)
                break
              case 'performanceMin':
                if (value) data = data.filter(item => item.performance >= parseInt(value))
                break
            }
          }
        })
      }

      // Apply sorting
      if (params.sortBy) {
        data.sort((a, b) => {
          let aVal = a[params.sortBy as keyof typeof a]
          let bVal = b[params.sortBy as keyof typeof b]

          // Handle different data types
          if (typeof aVal === 'string') {
            aVal = aVal.toLowerCase()
            bVal = (bVal as string).toLowerCase()
          }

          if (aVal < bVal) return params.sortOrder === 'asc' ? -1 : 1
          if (aVal > bVal) return params.sortOrder === 'asc' ? 1 : -1
          return 0
        })
      }

      // Calculate pagination
      const total = data.length
      const totalPages = Math.ceil(total / params.pageSize)
      const startIndex = (params.page - 1) * params.pageSize
      const pageData = data.slice(startIndex, startIndex + params.pageSize)

      return {
        data: pageData,
        total,
        page: params.page,
        pageSize: params.pageSize,
        totalPages
      }
    }

    const columns = [
      {
        key: 'id',
        header: 'ID',
        sortable: true,
        numeric: true
      },
      {
        key: 'name',
        header: 'Nome Completo',
        sortable: true
      },
      {
        key: 'email',
        header: 'Email',
        sortable: true
      },
      {
        key: 'role',
        header: 'Função',
        sortable: true,
        render: (value: string) => (
          <Chip
            variant={
              value === 'Admin' ? 'error' :
                value === 'Manager' ? 'warning' :
                  value === 'Editor' ? 'primary' : 'neutral'
            }
            size="sm"
          >
            {value}
          </Chip>
        )
      },
      {
        key: 'department',
        header: 'Departamento',
        sortable: true,
        render: (value: string) => (
          <Chip
            variant={
              value === 'TI' ? 'info' :
                value === 'Marketing' ? 'accent' :
                  value === 'Vendas' ? 'success' : 'neutral'
            }
            size="sm"
          >
            {value}
          </Chip>
        )
      },
      {
        key: 'status',
        header: 'Status',
        sortable: true,
        render: (value: string) => (
          <Chip
            variant={
              value === 'Ativo' ? 'success' :
                value === 'Pendente' ? 'warning' :
                  value === 'Suspenso' ? 'error' : 'neutral'
            }
            size="sm"
          >
            {value}
          </Chip>
        )
      },
      {
        key: 'salary',
        header: 'Salário',
        sortable: true,
        numeric: true,
        render: (value: number) => (
          <span className="font-mono">R$ {value.toLocaleString()}</span>
        )
      },
      {
        key: 'city',
        header: 'Cidade',
        sortable: true
      },
      {
        key: 'performance',
        header: 'Performance',
        sortable: true,
        numeric: true,
        render: (value: number) => (
          <div className="flex items-center gap-2">
            <Chip
              variant={
                value >= 80 ? 'success' :
                  value >= 60 ? 'warning' : 'error'
              }
              size="sm"
            >
              {value}%
            </Chip>
          </div>
        )
      },
      {
        key: 'joinDate',
        header: 'Data de Entrada',
        sortable: true,
        render: (value: string) => new Date(value).toLocaleDateString('pt-BR')
      },
      {
        key: 'actions',
        header: 'Ações',
        sortable: false,
        render: (_: any, row: typeof sampleUsers[0]) => (
          <div className="flex gap-1">
            <ActionButton
              icon={<span>👁️</span>}
              size="sm"
              variant="ghost"
              tooltip="Ver perfil completo"
            />
            <ActionButton
              icon={<span>✏️</span>}
              size="sm"
              variant="ghost"
              tooltip="Editar informações"
            />
            <ActionButton
              icon={<span>📊</span>}
              size="sm"
              variant="ghost"
              tooltip="Ver relatórios"
            />
            <ActionButton
              icon={<span>💬</span>}
              size="sm"
              variant="ghost"
              tooltip="Enviar mensagem"
            />
          </div>
        )
      }
    ]

    const filterConfig = {
      fields: [
        {
          key: 'role',
          label: 'Função',
          type: 'select' as const,
          options: [
            { value: 'Admin', label: 'Administrador' },
            { value: 'Manager', label: 'Gerente' },
            { value: 'Editor', label: 'Editor' },
            { value: 'Viewer', label: 'Visualizador' },
            { value: 'Analyst', label: 'Analista' }
          ]
        },
        {
          key: 'status',
          label: 'Status da Conta',
          type: 'radio' as const,
          options: [
            { value: 'Ativo', label: 'Ativo' },
            { value: 'Inativo', label: 'Inativo' },
            { value: 'Pendente', label: 'Pendente' },
            { value: 'Suspenso', label: 'Suspenso' }
          ]
        },
        {
          key: 'department',
          label: 'Departamentos',
          type: 'checkbox' as const,
          options: [
            { value: 'TI', label: 'Tecnologia da Informação' },
            { value: 'Marketing', label: 'Marketing' },
            { value: 'Vendas', label: 'Vendas' },
            { value: 'RH', label: 'Recursos Humanos' },
            { value: 'Financeiro', label: 'Financeiro' },
            { value: 'Operações', label: 'Operações' }
          ]
        },
        {
          key: 'city',
          label: 'Cidades',
          type: 'checkbox' as const,
          options: [
            { value: 'São Paulo', label: 'São Paulo' },
            { value: 'Rio de Janeiro', label: 'Rio de Janeiro' },
            { value: 'Belo Horizonte', label: 'Belo Horizonte' },
            { value: 'Salvador', label: 'Salvador' },
            { value: 'Brasília', label: 'Brasília' },
            { value: 'Curitiba', label: 'Curitiba' }
          ]
        },
        {
          key: 'salaryMin',
          label: 'Salário Mínimo',
          type: 'number' as const,
          placeholder: 'Ex: 5000'
        },
        {
          key: 'salaryMax',
          label: 'Salário Máximo',
          type: 'number' as const,
          placeholder: 'Ex: 10000'
        },
        {
          key: 'joinDateFrom',
          label: 'Contratado Após',
          type: 'date' as const
        },
        {
          key: 'joinDateTo',
          label: 'Contratado Antes',
          type: 'date' as const
        },
        {
          key: 'performanceMin',
          label: 'Performance Mínima (%)',
          type: 'number' as const,
          placeholder: 'Ex: 70'
        }
      ]
    }

    return (
      <div className="w-full max-w-full space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">ServerDataTable Completa - Exemplo Avançado</h3>
          <p className="text-gray-600">
            Demonstração completa com 10.000 registros, múltiplos filtros, ordenação e busca avançada.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">10.000</div>
              <div className="text-sm text-gray-600">Registros Totais</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">15</div>
              <div className="text-sm text-gray-600">Registros por Página</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">9</div>
              <div className="text-sm text-gray-600">Filtros Disponíveis</div>
            </div>
          </div>
        </div>

        <ServerDataTable
          columns={columns}
          fetchData={mockAdvancedAPI}
          filterConfig={filterConfig}
          searchable={true}
          searchPlaceholder="Buscar por nome, email, função, departamento ou cidade..."
          pageSize={15}
          onRowClick={(user) => {
            console.log('Usuário selecionado:', user)
            alert(`Perfil de ${user.name}\nEmail: ${user.email}\nFunção: ${user.role}`)
          }}
        />
      </div>
    )
  }
}

// Performance Comparison Example
export const PerformanceComparison: Story = {
  render: () => {
    const [loadTimes, setLoadTimes] = React.useState<{ static: number, server: number }>({
      static: 0,
      server: 0
    })

    // Mock heavy static data (1000 records)
    const heavyStaticData = React.useMemo(() => {
      const start = performance.now()
      const data = mockDatabase.slice(0, 1000).map(user => ({
        ...user,
        salary: `R$ ${user.salary.toLocaleString()}`,
        joinDate: new Date(user.joinDate).toLocaleDateString('pt-BR'),
        status: (
          <Chip
            variant={user.status === 'Ativo' ? 'success' : 'error'}
            size="sm"
          >
            {user.status}
          </Chip>
        )
      }))
      const end = performance.now()
      setLoadTimes(prev => ({ ...prev, static: end - start }))
      return data
    }, [])

    const lightweightAPI = async (params: ServerTableParams): Promise<ServerTableResponse<any>> => {
      const start = performance.now()

      // Simulate minimal processing
      await new Promise(resolve => setTimeout(resolve, 100))

      const startIndex = (params.page - 1) * params.pageSize
      const data = mockDatabase.slice(startIndex, startIndex + params.pageSize)

      const end = performance.now()
      setLoadTimes(prev => ({ ...prev, server: end - start }))

      return {
        data,
        total: mockDatabase.length,
        page: params.page,
        pageSize: params.pageSize,
        totalPages: Math.ceil(mockDatabase.length / params.pageSize)
      }
    }

    const columns = [
      { key: 'id', header: 'ID', sortable: true },
      { key: 'name', header: 'Nome', sortable: true },
      { key: 'email', header: 'Email', sortable: true },
      { key: 'role', header: 'Função', sortable: true },
      { key: 'salary', header: 'Salário', sortable: true }
    ]

    return (
      <div className="w-full max-w-7xl space-y-8">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Comparação de Performance</h3>
          <p className="text-gray-600">
            Veja a diferença de performance entre abordagens estática e server-side.
          </p>

          {/* Performance Metrics */}
          <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="text-center">
              <div className="text-lg font-bold text-orange-600">
                {loadTimes.static.toFixed(2)}ms
              </div>
              <div className="text-sm text-gray-600">Tabela Estática (1000 registros)</div>
              <div className="text-xs text-orange-600">Processamento no cliente</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">
                {loadTimes.server.toFixed(2)}ms
              </div>
              <div className="text-sm text-gray-600">Server-Side (20 registros)</div>
              <div className="text-xs text-green-600">Processamento no servidor</div>
            </div>
          </div>
        </div>

        {/* Static Table */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h4 className="font-medium">📊 Tabela Estática</h4>
            <Chip variant="warning" size="sm">1000 registros carregados</Chip>
          </div>

          <SimpleDataTable
            data={heavyStaticData}
            columns={columns}
            searchable={true}
            pagination={true}
            pageSize={20}
          />
        </div>

        {/* Server-side Table */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h4 className="font-medium">🚀 Tabela Server-Side</h4>
            <Chip variant="success" size="sm">20 registros por página</Chip>
          </div>

          <ServerDataTable
            columns={[
              { key: 'id', header: 'ID', sortable: true, numeric: true },
              { key: 'name', header: 'Nome', sortable: true },
              { key: 'email', header: 'Email', sortable: true },
              { key: 'role', header: 'Função', sortable: true },
              {
                key: 'salary',
                header: 'Salário',
                sortable: true,
                numeric: true,
                render: (value: number) => `R$ ${value.toLocaleString()}`
              }
            ]}
            fetchData={lightweightAPI}
            searchable={true}
            pageSize={20}
          />
        </div>
      </div>
    )
  }
}
