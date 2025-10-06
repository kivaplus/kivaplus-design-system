import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Button } from '../components/button'
import { Card } from '../components/card'
import { Input } from '../components/input'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A flexible input component with support for labels, icons, validation states, and various configurations.'
      }
    }
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text for the input'
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text'
    },
    supportText: {
      control: 'text',
      description: 'Helper text displayed below the input'
    },
    errorMessage: {
      control: 'text',
      description: 'Error message displayed when error is true'
    },
    error: {
      control: 'boolean',
      description: 'Whether the input is in error state'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled'
    },
    required: {
      control: 'boolean',
      description: 'Whether the input is required (shows asterisk)'
    },
    optional: {
      control: 'boolean',
      description: 'Whether the input is optional (shows optional text)'
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the input takes full width'
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
      description: 'Input type'
    }
  }
}

export default meta
type Story = StoryObj<typeof Input>

// Basic Examples
export const Default: Story = {
  args: {
    placeholder: 'Digite algo...'
  }
}

export const WithLabel: Story = {
  args: {
    label: 'Nome',
    placeholder: 'Digite seu nome'
  }
}

export const WithSupportText: Story = {
  args: {
    label: 'Email',
    placeholder: 'seu@email.com',
    supportText: 'Será usado para login e comunicações importantes'
  }
}

// Required and Optional States
export const Required: Story = {
  args: {
    label: 'Nome Completo',
    placeholder: 'Digite seu nome completo',
    required: true,
    supportText: 'Campo obrigatório'
  }
}

export const Optional: Story = {
  args: {
    label: 'Telefone',
    placeholder: '(11) 99999-9999',
    optional: true,
    supportText: 'Opcional - para contato em caso de emergência'
  }
}

// Error States
export const WithError: Story = {
  args: {
    label: 'Email',
    placeholder: 'seu@email.com',
    error: true,
    errorMessage: 'Email inválido',
    value: 'email-invalido'
  }
}

export const RequiredWithError: Story = {
  args: {
    label: 'Nome',
    placeholder: 'Digite seu nome',
    required: true,
    error: true,
    errorMessage: 'Nome é obrigatório'
  }
}

// Disabled State
export const Disabled: Story = {
  args: {
    label: 'Campo Desabilitado',
    placeholder: 'Este campo está desabilitado',
    disabled: true,
    value: 'Valor pré-definido'
  }
}

export const DisabledWithError: Story = {
  args: {
    label: 'Campo com Erro Desabilitado',
    placeholder: 'Campo desabilitado',
    disabled: true,
    error: true,
    errorMessage: 'Este campo tem erro mas está desabilitado',
    value: 'Valor com erro'
  }
}

// Input Types
export const EmailInput: Story = {
  args: {
    label: 'Email',
    type: 'email',
    placeholder: 'seu@email.com',
    required: true
  }
}

export const PasswordInput: Story = {
  args: {
    label: 'Senha',
    type: 'password',
    placeholder: '••••••••',
    required: true,
    supportText: 'Mínimo 8 caracteres. Clique no ícone do olho para mostrar/ocultar a senha'
  }
}

export const NumberInput: Story = {
  args: {
    label: 'Idade',
    type: 'number',
    placeholder: '25',
    min: 0,
    max: 120
  }
}

export const TelInput: Story = {
  args: {
    label: 'Telefone',
    type: 'tel',
    placeholder: '(11) 99999-9999',
    optional: true
  }
}

export const UrlInput: Story = {
  args: {
    label: 'Website',
    type: 'url',
    placeholder: 'https://seusite.com',
    optional: true
  }
}

export const SearchInput: Story = {
  args: {
    label: 'Buscar',
    type: 'search',
    placeholder: 'Digite para buscar...'
  }
}

export const PasswordWithToggle: Story = {
  render: () => {
    const [password, setPassword] = React.useState('minhasenhasecreta123')

    return (
      <div className="max-w-md">
        <Input
          label="Senha com Toggle"
          type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          supportText="Clique no ícone do olho para mostrar/ocultar a senha"
          fullWidth
        />
      </div>
    )
  }
}

// With Icons
export const WithLeadingIcon: Story = {
  args: {
    label: 'Email',
    placeholder: 'seu@email.com',
    leadingIcon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
      </svg>
    )
  }
}

export const WithTrailingIcon: Story = {
  args: {
    label: 'Buscar',
    placeholder: 'Digite para buscar...',
    trailingIcon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    )
  }
}

export const WithTrailingText: Story = {
  args: {
    label: 'Preço',
    placeholder: '0,00',
    trailingText: 'R$',
    type: 'number'
  }
}

export const WithBothIcons: Story = {
  args: {
    label: 'Valor',
    placeholder: '0,00',
    leadingIcon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
      </svg>
    ),
    trailingText: 'BRL'
  }
}

export const PasswordWithLeadingIcon: Story = {
  render: () => {
    const [password, setPassword] = React.useState('')

    return (
      <div className="max-w-md">
        <Input
          label="Senha com Ícone"
          type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          leadingIcon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          }
          supportText="Senha com ícone de cadeado e toggle de visibilidade"
          fullWidth
        />
      </div>
    )
  }
}

// Full Width
export const FullWidth: Story = {
  args: {
    label: 'Descrição',
    placeholder: 'Digite uma descrição completa...',
    fullWidth: true,
    supportText: 'Este campo ocupa toda a largura disponível'
  }
}

// Interactive Examples
export const InteractiveForm: Story = {
  render: () => {
    const [formData, setFormData] = React.useState({
      name: '',
      email: '',
      phone: '',
      website: ''
    })

    const [errors, setErrors] = React.useState<Record<string, string>>({})

    const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData(prev => ({
        ...prev,
        [field]: e.target.value
      }))

      // Clear error when user starts typing
      if (errors[field]) {
        setErrors(prev => ({
          ...prev,
          [field]: ''
        }))
      }
    }

    const validateForm = () => {
      const newErrors: Record<string, string> = {}

      if (!formData.name.trim()) {
        newErrors.name = 'Nome é obrigatório'
      }

      if (!formData.email.trim()) {
        newErrors.email = 'Email é obrigatório'
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email inválido'
      }

      if (formData.website && !/^https?:\/\/.+/.test(formData.website)) {
        newErrors.website = 'URL deve começar com http:// ou https://'
      }

      setErrors(newErrors)
      return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      if (validateForm()) {
        alert('Formulário válido!')
        console.log('Form data:', formData)
      }
    }

    return (
      <div className="max-w-md mx-auto">
        <Card variant="elevated" padding="md">
          <div className="card-header">
            <div className="card-header-content">
              <h3 className="card-header-title">Formulário Interativo</h3>
              <p className="card-header-subtitle">Exemplo de validação em tempo real</p>
            </div>
          </div>

          <div className="card-content">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Nome Completo"
                placeholder="Digite seu nome"
                value={formData.name}
                onChange={handleChange('name')}
                required
                error={!!errors.name}
                errorMessage={errors.name}
                fullWidth
              />

              <Input
                label="Email"
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={handleChange('email')}
                required
                error={!!errors.email}
                errorMessage={errors.email}
                fullWidth
                leadingIcon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                }
              />

              <Input
                label="Telefone"
                type="tel"
                placeholder="(11) 99999-9999"
                value={formData.phone}
                onChange={handleChange('phone')}
                optional
                fullWidth
                leadingIcon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                }
              />

              <Input
                label="Website"
                type="url"
                placeholder="https://seusite.com"
                value={formData.website}
                onChange={handleChange('website')}
                optional
                error={!!errors.website}
                errorMessage={errors.website}
                fullWidth
                leadingIcon={
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 919-9" />
                  </svg>
                }
              />
            </form>
          </div>

          <div className="card-footer justify-end">
            <Button
              variant="primary"
              size="md"
              fullWidth
              onClick={handleSubmit}
            >
              Enviar Formulário
            </Button>
          </div>
        </Card>
      </div>
    )
  }
}

// Size Variations (using different containers)
export const SizeVariations: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="w-64">
        <Input
          label="Pequeno (256px)"
          placeholder="Campo pequeno"
          fullWidth
        />
      </div>

      <div className="w-96">
        <Input
          label="Médio (384px)"
          placeholder="Campo médio"
          fullWidth
        />
      </div>

      <div className="w-full max-w-2xl">
        <Input
          label="Grande (max 672px)"
          placeholder="Campo grande"
          fullWidth
        />
      </div>
    </div>
  )
}

// All States Showcase
export const AllStates: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
      <Input
        label="Normal"
        placeholder="Estado normal"
      />

      <Input
        label="Com valor"
        value="Texto digitado"
      />

      <Input
        label="Obrigatório"
        placeholder="Campo obrigatório"
        required
      />

      <Input
        label="Opcional"
        placeholder="Campo opcional"
        optional
      />

      <Input
        label="Com erro"
        placeholder="Campo com erro"
        error
        errorMessage="Mensagem de erro"
      />

      <Input
        label="Desabilitado"
        placeholder="Campo desabilitado"
        disabled
      />

      <Input
        label="Com ícone inicial"
        placeholder="Com ícone"
        leadingIcon={
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        }
      />

      <Input
        label="Com texto final"
        placeholder="0,00"
        trailingText="R$"
      />
    </div>
  )
}
