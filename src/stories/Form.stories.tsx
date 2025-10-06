import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Button } from '../components/button'
import { Card } from '../components/card'
import { CheckboxGroup } from '../components/checkboxgroup'
import { Select } from '../components/dropdown'
import { PageHeader, SectionHeader } from '../components/header-group'
import { Input } from '../components/input'
import { Radio, RadioGroup } from '../components/radio'
import { Switch } from '../components/switch'
import { Textarea } from '../components/textarea'

const meta: Meta = {
  title: 'Forms/Complete Form',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A comprehensive form example using all available form components with required field indicators.'
      }
    }
  }
}

export default meta
type Story = StoryObj

// Sample data for form components
const countryOptions = [
  { value: 'br', label: 'Brasil' },
  { value: 'us', label: 'Estados Unidos' },
  { value: 'ca', label: 'Canadá' },
  { value: 'mx', label: 'México' },
  { value: 'ar', label: 'Argentina' }
]

const skillOptions = [
  { value: 'js', label: 'JavaScript' },
  { value: 'ts', label: 'TypeScript' },
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue.js' },
  { value: 'angular', label: 'Angular' },
  { value: 'node', label: 'Node.js' }
]

const checkboxOptions = [
  {
    id: 'terms',
    label: 'Aceito os termos e condições',
    description: 'Li e concordo com os termos de uso da plataforma',
    required: true
  },
  {
    id: 'privacy',
    label: 'Aceito a política de privacidade',
    description: 'Concordo com o tratamento dos meus dados pessoais',
    required: true
  },
  {
    id: 'newsletter',
    label: 'Desejo receber newsletter',
    description: 'Receber atualizações e novidades por email',
    required: false
  }
]

export const CompleteForm: Story = {
  render: () => {
    const [formData, setFormData] = React.useState({
      // Required fields
      firstName: '',
      lastName: '',
      email: '',
      country: '',
      experience: '',
      skills: [] as string[],
      bio: '',

      // Optional fields
      phone: '',
      website: '',

      // Checkboxes
      agreements: {} as Record<string, boolean>,

      // Switches
      notifications: false,
      marketing: false
    })

    const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData(prev => ({
        ...prev,
        [field]: e.target.value
      }))
    }

    const handleSelectChange = (field: string) => (value: string | string[]) => {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }))
    }

    const handleSwitchChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData(prev => ({
        ...prev,
        [field]: e.target.checked
      }))
    }

    const handleCheckboxGroupChange = (values: Record<string, boolean>) => {
      setFormData(prev => ({
        ...prev,
        agreements: values
      }))
    }

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      console.log('Form submitted:', formData)
      alert('Formulário enviado! Verifique o console para ver os dados.')
    }

    return (
      <div className="max-w-2xl mx-auto">
        <Card variant="elevated" padding="md">
          <PageHeader
            title="Formulário de Cadastro Completo"
            description="Preencha todos os campos obrigatórios marcados com asterisco (*) para continuar."
            className="mb-8"
          />

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information Section */}
            <section className="space-y-6">
              <SectionHeader
                title="Informações Pessoais"
                divider
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Nome"
                  placeholder="Digite seu nome"
                  value={formData.firstName}
                  onChange={handleInputChange('firstName')}
                  required
                  fullWidth
                />

                <Input
                  label="Sobrenome"
                  placeholder="Digite seu sobrenome"
                  value={formData.lastName}
                  onChange={handleInputChange('lastName')}
                  required
                  fullWidth
                />
              </div>

              <Input
                label="Email"
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={handleInputChange('email')}
                required
                fullWidth
                supportText="Será usado para login e comunicações importantes"
              />

              <Input
                label="Telefone"
                type="tel"
                placeholder="(11) 99999-9999"
                value={formData.phone}
                onChange={handleInputChange('phone')}
                optional
                fullWidth
                supportText="Opcional - para contato em caso de emergência"
              />

              <Input
                label="Website"
                type="url"
                placeholder="https://seusite.com"
                value={formData.website}
                onChange={handleInputChange('website')}
                optional
                fullWidth
              />
            </section>

            {/* Location Section */}
            <section className="space-y-6">
              <SectionHeader
                title="Localização"
                divider
              />

              <Select
                label="País"
                options={countryOptions}
                value={formData.country}
                onValueChange={handleSelectChange('country')}
                placeholder="Selecione seu país"
                required
                fullWidth
                searchable
              />
            </section>

            {/* Professional Information Section */}
            <section className="space-y-6">
              <SectionHeader
                title="Informações Profissionais"
                divider
              />

              <RadioGroup
                label="Nível de Experiência"
                value={formData.experience}
                onValueChange={handleSelectChange('experience')}
                required
                orientation="vertical"
              >
                <Radio value="junior" label="Júnior" description="0-2 anos de experiência" />
                <Radio value="pleno" label="Pleno" description="2-5 anos de experiência" />
                <Radio value="senior" label="Sênior" description="5+ anos de experiência" />
                <Radio value="lead" label="Tech Lead" description="Liderança técnica" />
              </RadioGroup>

              <Select
                label="Habilidades Técnicas"
                options={skillOptions}
                value={formData.skills}
                onValueChange={handleSelectChange('skills')}
                placeholder="Selecione suas habilidades"
                required
                multiple
                searchable
                clearable
                fullWidth
              />

              <Textarea
                label="Biografia Profissional"
                placeholder="Conte um pouco sobre sua experiência e objetivos profissionais..."
                value={formData.bio}
                onChange={handleInputChange('bio')}
                required
                fullWidth
                rows={4}
                supportText="Mínimo de 50 caracteres"
              />
            </section>

            {/* Preferences Section */}
            <section className="space-y-6">
              <SectionHeader
                title="Preferências"
                divider
              />

              <div className="space-y-4">
                <Switch
                  label="Receber Notificações"
                  description="Receber notificações sobre atualizações da plataforma"
                  checked={formData.notifications}
                  onChange={handleSwitchChange('notifications')}
                  optional
                />

                <Switch
                  label="Aceitar Comunicações de Marketing"
                  description="Receber ofertas especiais e conteúdo promocional"
                  checked={formData.marketing}
                  onChange={handleSwitchChange('marketing')}
                  optional
                />
              </div>
            </section>

            {/* Terms and Conditions Section */}
            <section className="space-y-6">
              <SectionHeader
                title="Termos e Condições"
                divider
              />

              <CheckboxGroup
                title="Aceites Obrigatórios"
                description="Para prosseguir, você deve aceitar todos os termos obrigatórios abaixo:"
                options={checkboxOptions}
                values={formData.agreements}
                onChange={handleCheckboxGroupChange}
                requireAll
                errorMessage="Você deve aceitar todos os termos obrigatórios para continuar."
              />
            </section>

            {/* Submit Section */}
            <div className="card-footer justify-end">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  type="button"
                  variant="outlined"
                  size="lg"
                  onClick={() => {
                    setFormData({
                      firstName: '',
                      lastName: '',
                      email: '',
                      country: '',
                      experience: '',
                      skills: [],
                      bio: '',
                      phone: '',
                      website: '',
                      agreements: {},
                      notifications: false,
                      marketing: false
                    })
                  }}
                >
                  Limpar Formulário
                </Button>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                >
                  Enviar Cadastro
                </Button>
              </div>
            </div>
          </form>
        </Card>
      </div>
    )
  }
}

export const FormValidationExample: Story = {
  render: () => {
    const [formData, setFormData] = React.useState({
      name: '',
      email: '',
      message: '',
      category: '',
      priority: '',
      terms: {} as Record<string, boolean>
    })

    const [errors, setErrors] = React.useState<Record<string, string>>({})

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

      if (!formData.message.trim()) {
        newErrors.message = 'Mensagem é obrigatória'
      } else if (formData.message.length < 10) {
        newErrors.message = 'Mensagem deve ter pelo menos 10 caracteres'
      }

      if (!formData.category) {
        newErrors.category = 'Categoria é obrigatória'
      }

      if (!formData.priority) {
        newErrors.priority = 'Prioridade é obrigatória'
      }

      if (!formData.terms.accept) {
        newErrors.terms = 'Você deve aceitar os termos'
      }

      setErrors(newErrors)
      return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      if (validateForm()) {
        alert('Formulário válido! Dados enviados com sucesso.')
        console.log('Form data:', formData)
      }
    }

    return (
      <div className="max-w-lg mx-auto">
        <Card variant="elevated" padding="md">
          <PageHeader
            title="Formulário com Validação"
            description="Exemplo de validação de campos obrigatórios com mensagens de erro."
            className="mb-6"
          />

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Nome Completo"
              placeholder="Digite seu nome"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
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
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              required
              error={!!errors.email}
              errorMessage={errors.email}
              fullWidth
            />

            <Select
              label="Categoria"
              options={[
                { value: 'support', label: 'Suporte Técnico' },
                { value: 'sales', label: 'Vendas' },
                { value: 'billing', label: 'Financeiro' },
                { value: 'other', label: 'Outros' }
              ]}
              value={formData.category}
              onValueChange={(value) => setFormData(prev => ({ ...prev, category: value as string }))}
              placeholder="Selecione uma categoria"
              required
              error={!!errors.category}
              description={errors.category}
              fullWidth
            />

            <RadioGroup
              label="Prioridade"
              value={formData.priority}
              onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}
              required
              error={!!errors.priority}
              errorMessage={errors.priority}
            >
              <Radio value="low" label="Baixa" />
              <Radio value="medium" label="Média" />
              <Radio value="high" label="Alta" />
              <Radio value="urgent" label="Urgente" />
            </RadioGroup>

            <Textarea
              label="Mensagem"
              placeholder="Descreva sua solicitação..."
              value={formData.message}
              onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
              required
              error={!!errors.message}
              errorMessage={errors.message}
              fullWidth
              rows={4}
            />

            <CheckboxGroup
              options={[
                {
                  id: 'accept',
                  label: 'Aceito os termos e condições',
                  description: 'Li e concordo com os termos de uso',
                  required: true
                }
              ]}
              values={formData.terms}
              onChange={(values) => setFormData(prev => ({ ...prev, terms: values }))}
              error={!!errors.terms}
              errorMessage={errors.terms}
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
            >
              Enviar Solicitação
            </Button>
          </form>
        </Card>
      </div>
    )
  }
}

export const MinimalForm: Story = {
  render: () => {
    const [formData, setFormData] = React.useState({
      email: '',
      password: '',
      rememberMe: false
    })

    return (
      <div className="max-w-sm mx-auto">
        <Card variant="elevated" padding="md">
          <PageHeader
            title="Login"
            description="Entre com suas credenciais"
            className="mb-6"
          />

          <form className="space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="seu@email.com"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              required
              fullWidth
            />

            <Input
              label="Senha"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              required
              fullWidth
            />

            <Switch
              label="Lembrar de mim"
              checked={formData.rememberMe}
              onChange={(e) => setFormData(prev => ({ ...prev, rememberMe: e.target.checked }))}
              optional
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
            >
              Entrar
            </Button>
          </form>
        </Card>
      </div>
    )
  }
}
