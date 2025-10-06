import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Button } from '../components/button'
import { Card } from '../components/card'
import { Textarea } from '../components/textarea'

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A flexible textarea component with support for labels, validation states, and various configurations for multi-line text input.'
      }
    }
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text for the textarea'
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text'
    },
    supportText: {
      control: 'text',
      description: 'Helper text displayed below the textarea'
    },
    errorMessage: {
      control: 'text',
      description: 'Error message displayed when error is true'
    },
    error: {
      control: 'boolean',
      description: 'Whether the textarea is in error state'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the textarea is disabled'
    },
    required: {
      control: 'boolean',
      description: 'Whether the textarea is required (shows asterisk)'
    },
    optional: {
      control: 'boolean',
      description: 'Whether the textarea is optional (shows optional text)'
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the textarea takes full width'
    },
    rows: {
      control: { type: 'number', min: 2, max: 20 },
      description: 'Number of visible text lines'
    }
  }
}

export default meta
type Story = StoryObj<typeof Textarea>

// Basic Examples
export const Default: Story = {
  args: {
    placeholder: 'Digite sua mensagem...'
  }
}

export const WithLabel: Story = {
  args: {
    label: 'Mensagem',
    placeholder: 'Digite sua mensagem aqui...'
  }
}

export const WithSupportText: Story = {
  args: {
    label: 'Descrição',
    placeholder: 'Descreva o produto em detalhes...',
    supportText: 'Seja específico sobre características, benefícios e uso do produto'
  }
}

// Required and Optional States
export const Required: Story = {
  args: {
    label: 'Biografia Profissional',
    placeholder: 'Conte um pouco sobre sua experiência e objetivos profissionais...',
    required: true,
    supportText: 'Mínimo de 50 caracteres',
    rows: 4
  }
}

export const Optional: Story = {
  args: {
    label: 'Comentários Adicionais',
    placeholder: 'Adicione qualquer informação extra que considere relevante...',
    optional: true,
    supportText: 'Este campo é opcional',
    rows: 3
  }
}

// Error States
export const WithError: Story = {
  args: {
    label: 'Descrição',
    placeholder: 'Digite uma descrição...',
    error: true,
    errorMessage: 'A descrição deve ter pelo menos 10 caracteres',
    value: 'Muito curto'
  }
}

export const RequiredWithError: Story = {
  args: {
    label: 'Motivo da Solicitação',
    placeholder: 'Explique o motivo da sua solicitação...',
    required: true,
    error: true,
    errorMessage: 'Este campo é obrigatório'
  }
}

// Disabled State
export const Disabled: Story = {
  args: {
    label: 'Campo Desabilitado',
    placeholder: 'Este campo está desabilitado',
    disabled: true,
    value: 'Este é um texto pré-definido que não pode ser editado porque o campo está desabilitado.',
    rows: 3
  }
}

export const DisabledWithError: Story = {
  args: {
    label: 'Campo com Erro Desabilitado',
    placeholder: 'Campo desabilitado',
    disabled: true,
    error: true,
    errorMessage: 'Este campo tem erro mas está desabilitado',
    value: 'Conteúdo com erro que não pode ser editado.',
    rows: 2
  }
}

// Different Sizes
export const Small: Story = {
  args: {
    label: 'Comentário Breve',
    placeholder: 'Digite um comentário breve...',
    rows: 2
  }
}

export const Medium: Story = {
  args: {
    label: 'Descrição',
    placeholder: 'Digite uma descrição detalhada...',
    rows: 4
  }
}

export const Large: Story = {
  args: {
    label: 'Artigo ou Texto Longo',
    placeholder: 'Escreva seu artigo ou texto longo aqui...',
    rows: 8
  }
}

export const ExtraLarge: Story = {
  args: {
    label: 'Documento Completo',
    placeholder: 'Digite o documento completo...',
    rows: 12,
    supportText: 'Use este espaço para documentos extensos'
  }
}

// Full Width
export const FullWidth: Story = {
  args: {
    label: 'Feedback Detalhado',
    placeholder: 'Compartilhe seu feedback detalhado sobre nossa plataforma...',
    fullWidth: true,
    rows: 5,
    supportText: 'Este campo ocupa toda a largura disponível'
  }
}

// Character Counting Example
export const WithCharacterCount: Story = {
  render: () => {
    const [text, setText] = React.useState('')
    const maxLength = 500
    const remaining = maxLength - text.length
    const isOverLimit = remaining < 0

    return (
      <div className="max-w-md">
        <Textarea
          label="Resenha do Produto"
          placeholder="Escreva sua resenha..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
          error={isOverLimit}
          errorMessage={isOverLimit ? `Excedeu o limite em ${Math.abs(remaining)} caracteres` : undefined}
          supportText={!isOverLimit ? `${remaining} caracteres restantes` : undefined}
          rows={4}
          fullWidth
        />
      </div>
    )
  }
}

// Auto-resize Example
export const AutoResize: Story = {
  render: () => {
    const [text, setText] = React.useState('')
    const textareaRef = React.useRef<HTMLTextAreaElement>(null)

    React.useEffect(() => {
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
      }
    }, [text])

    return (
      <div className="max-w-md">
        <Textarea
          ref={textareaRef}
          label="Texto com Altura Automática"
          placeholder="Digite e veja a altura se ajustar automaticamente..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          supportText="A altura se ajusta conforme você digita"
          rows={2}
          fullWidth
          style={{ resize: 'none', overflow: 'hidden' }}
        />
      </div>
    )
  }
}

// Interactive Form Example
export const InteractiveForm: Story = {
  render: () => {
    const [formData, setFormData] = React.useState({
      title: '',
      description: '',
      feedback: '',
      notes: ''
    })

    const [errors, setErrors] = React.useState<Record<string, string>>({})

    const handleChange = (field: string) => (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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

      if (!formData.title.trim()) {
        newErrors.title = 'Título é obrigatório'
      }

      if (!formData.description.trim()) {
        newErrors.description = 'Descrição é obrigatória'
      } else if (formData.description.length < 20) {
        newErrors.description = 'Descrição deve ter pelo menos 20 caracteres'
      }

      if (!formData.feedback.trim()) {
        newErrors.feedback = 'Feedback é obrigatório'
      } else if (formData.feedback.length < 10) {
        newErrors.feedback = 'Feedback deve ter pelo menos 10 caracteres'
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
      <div className="max-w-2xl mx-auto">
        <Card variant="elevated" padding="md">
          <div className="card-header">
            <div className="card-header-content">
              <h3 className="card-header-title">Formulário com Textareas</h3>
              <p className="card-header-subtitle">Exemplo de validação com campos de texto</p>
            </div>
          </div>

          <div className="card-content">
            <div className="space-y-6">
              <Textarea
                label="Título do Projeto"
                placeholder="Digite o título do seu projeto..."
                value={formData.title}
                onChange={handleChange('title')}
                required
                error={!!errors.title}
                errorMessage={errors.title}
                rows={1}
                fullWidth
              />

              <Textarea
                label="Descrição Detalhada"
                placeholder="Descreva seu projeto em detalhes..."
                value={formData.description}
                onChange={handleChange('description')}
                required
                error={!!errors.description}
                errorMessage={errors.description}
                supportText={!errors.description ? `${formData.description.length}/20 caracteres mínimos` : undefined}
                rows={4}
                fullWidth
              />

              <Textarea
                label="Feedback sobre a Plataforma"
                placeholder="Compartilhe sua experiência usando nossa plataforma..."
                value={formData.feedback}
                onChange={handleChange('feedback')}
                required
                error={!!errors.feedback}
                errorMessage={errors.feedback}
                rows={3}
                fullWidth
              />

              <Textarea
                label="Notas Adicionais"
                placeholder="Adicione qualquer informação extra..."
                value={formData.notes}
                onChange={handleChange('notes')}
                optional
                supportText="Campo opcional para informações complementares"
                rows={2}
                fullWidth
              />
            </div>
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

// Size Variations
export const SizeVariations: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="w-64">
        <Textarea
          label="Pequeno (256px)"
          placeholder="Campo pequeno"
          rows={2}
          fullWidth
        />
      </div>

      <div className="w-96">
        <Textarea
          label="Médio (384px)"
          placeholder="Campo médio"
          rows={3}
          fullWidth
        />
      </div>

      <div className="w-full max-w-2xl">
        <Textarea
          label="Grande (max 672px)"
          placeholder="Campo grande"
          rows={4}
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
      <Textarea
        label="Normal"
        placeholder="Estado normal"
        rows={2}
      />

      <Textarea
        label="Com valor"
        value="Este é um texto que já foi digitado no campo."
        rows={2}
      />

      <Textarea
        label="Obrigatório"
        placeholder="Campo obrigatório"
        required
        rows={2}
      />

      <Textarea
        label="Opcional"
        placeholder="Campo opcional"
        optional
        rows={2}
      />

      <Textarea
        label="Com erro"
        placeholder="Campo com erro"
        error
        errorMessage="Mensagem de erro"
        rows={2}
      />

      <Textarea
        label="Desabilitado"
        placeholder="Campo desabilitado"
        disabled
        value="Texto em campo desabilitado"
        rows={2}
      />

      <Textarea
        label="Texto longo"
        placeholder="Para textos mais longos"
        rows={4}
        supportText="Use para conteúdo extenso"
      />

      <Textarea
        label="Com suporte"
        placeholder="Campo com texto de apoio"
        supportText="Este é um texto de apoio explicativo"
        rows={2}
      />
    </div>
  )
}

// Use Cases Examples
export const UseCases: Story = {
  render: () => (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h3 className="text-lg font-semibold mb-4">Casos de Uso Comuns</h3>
      </div>

      <Textarea
        label="Comentário em Blog"
        placeholder="Deixe seu comentário..."
        required
        rows={3}
        supportText="Compartilhe sua opinião sobre este artigo"
        fullWidth
      />

      <Textarea
        label="Descrição de Produto"
        placeholder="Descreva as características do produto..."
        required
        rows={4}
        supportText="Inclua detalhes sobre funcionalidades, benefícios e especificações"
        fullWidth
      />

      <Textarea
        label="Feedback de Atendimento"
        placeholder="Como foi sua experiência com nosso atendimento?"
        optional
        rows={3}
        supportText="Sua opinião nos ajuda a melhorar nossos serviços"
        fullWidth
      />

      <Textarea
        label="Relatório de Bug"
        placeholder="Descreva o problema encontrado..."
        required
        rows={5}
        supportText="Inclua passos para reproduzir o problema e comportamento esperado"
        fullWidth
      />

      <Textarea
        label="Mensagem de Contato"
        placeholder="Digite sua mensagem..."
        required
        rows={4}
        supportText="Responderemos em até 24 horas"
        fullWidth
      />
    </div>
  )
}
