import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/accordion'
import { Button } from '../components/button'
import { Card } from '../components/card'
import { CheckboxGroup } from '../components/checkboxgroup'
import { PageHeader } from '../components/header-group'

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Accordion components provide collapsible content sections with smooth animations and full accessibility support.

## Accordion Component
- **Two Modes**: single (one item open) or multiple (multiple items open)
- **Collapsible**: Optional collapsible behavior in single mode
- **Smooth Animations**: CSS-based transitions for expand/collapse
- **Accessibility**: Full ARIA support with keyboard navigation
- **Icon Support**: Optional icons for enhanced visual hierarchy
- **Controlled/Uncontrolled**: Both controlled and uncontrolled usage patterns

## AccordionItem Component
- **Flexible Content**: Support for any content type in panels
- **Disabled State**: Individual items can be disabled
- **Custom Styling**: Consistent with design system classes

## AccordionTrigger Component
- **Icon Integration**: Optional icons with consistent positioning
- **Interactive States**: Hover, focus, and active states
- **Keyboard Support**: Enter and Space key activation

## Usage
Use accordions for:
- **FAQ sections** and help documentation
- **Settings panels** with grouped options
- **Content organization** in dashboards
- **Form sections** with logical grouping
- **Navigation menus** with sub-items
        `
      }
    }
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['single', 'multiple'],
      description: 'Whether only one item can be open at a time (single) or multiple items can be open (multiple)'
    },
    collapsible: {
      control: 'boolean',
      description: 'Whether items can be collapsed when in single mode'
    },
    value: {
      control: 'text',
      description: 'Controlled value - string for single mode, array for multiple mode'
    }
  }
}

export default meta
type Story = StoryObj<typeof Accordion>

// Basic Examples
export const Default: Story = {
  render: () => (
    <div className="max-w-2xl">
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger value="item-1">
            O que é React?
          </AccordionTrigger>
          <AccordionContent value="item-1">
            React é uma biblioteca JavaScript para construir interfaces de usuário, especialmente para aplicações web.
            Foi desenvolvida pelo Facebook e é mantida por uma comunidade de desenvolvedores.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger value="item-2">
            Como funciona o Virtual DOM?
          </AccordionTrigger>
          <AccordionContent value="item-2">
            O Virtual DOM é uma representação em memória do DOM real. React usa o Virtual DOM para otimizar
            as atualizações da interface, comparando o estado anterior com o novo e aplicando apenas as
            mudanças necessárias.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger value="item-3">
            O que são Hooks?
          </AccordionTrigger>
          <AccordionContent value="item-3">
            Hooks são funções que permitem usar estado e outras funcionalidades do React em componentes
            funcionais. Os mais comuns são useState, useEffect, useContext, entre outros.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Basic accordion with single mode and collapsible behavior. Perfect for FAQ sections and simple content organization.'
      }
    }
  }
}

export const SingleMode: Story = {
  args: {
    type: 'single',
    collapsible: true
  },
  render: (args) => (
    <div className="max-w-2xl">
      <Accordion {...args}>
        <AccordionItem value="pricing">
          <AccordionTrigger value="pricing">
            Preços e Planos
          </AccordionTrigger>
          <AccordionContent value="pricing">
            <div className="space-y-3">
              <p>Oferecemos diferentes planos para atender suas necessidades:</p>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>Plano Básico: R$ 29/mês</li>
                <li>Plano Pro: R$ 59/mês</li>
                <li>Plano Enterprise: R$ 99/mês</li>
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="features">
          <AccordionTrigger value="features">
            Funcionalidades
          </AccordionTrigger>
          <AccordionContent value="features">
            <div className="space-y-3">
              <p>Principais funcionalidades da nossa plataforma:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
                <div>• Dashboard personalizado</div>
                <div>• Relatórios em tempo real</div>
                <div>• Integração com APIs</div>
                <div>• Suporte 24/7</div>
                <div>• Backup automático</div>
                <div>• Segurança avançada</div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="support">
          <AccordionTrigger value="support">
            Suporte e Ajuda
          </AccordionTrigger>
          <AccordionContent value="support">
            <div className="space-y-3">
              <p>Estamos aqui para ajudar você:</p>
              <Card variant="filled" padding="sm">
                <div className="space-y-2 text-sm">
                  <div><strong>Email:</strong> suporte@empresa.com</div>
                  <div><strong>Telefone:</strong> (11) 9999-9999</div>
                  <div><strong>Chat:</strong> Disponível 24/7 no site</div>
                  <div><strong>Base de Conhecimento:</strong> help.empresa.com</div>
                </div>
              </Card>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Single mode accordion with interactive controls. Only one item can be open at a time, with optional collapsible behavior.'
      }
    }
  }
}

export const MultipleMode: Story = {
  args: {
    type: 'multiple'
  },
  render: (args) => (
    <div className="max-w-2xl">
      <Accordion {...args}>
        <AccordionItem value="account">
          <AccordionTrigger value="account">
            Configurações da Conta
          </AccordionTrigger>
          <AccordionContent value="account">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Informações Pessoais</h4>
                <p className="text-sm text-gray-600">
                  Gerencie suas informações pessoais, como nome, email e telefone.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Preferências</h4>
                <p className="text-sm text-gray-600">
                  Configure suas preferências de notificação e idioma.
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="security">
          <AccordionTrigger value="security">
            Segurança
          </AccordionTrigger>
          <AccordionContent value="security">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Autenticação de Dois Fatores</h4>
                <p className="text-sm text-gray-600">
                  Adicione uma camada extra de segurança à sua conta.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Senhas de Aplicativo</h4>
                <p className="text-sm text-gray-600">
                  Gerencie senhas específicas para aplicativos de terceiros.
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="billing">
          <AccordionTrigger value="billing">
            Faturamento
          </AccordionTrigger>
          <AccordionContent value="billing">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Métodos de Pagamento</h4>
                <p className="text-sm text-gray-600">
                  Adicione ou remova cartões de crédito e outros métodos de pagamento.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Histórico de Faturas</h4>
                <p className="text-sm text-gray-600">
                  Visualize e baixe suas faturas anteriores.
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple mode accordion where several items can be open simultaneously. Perfect for settings panels and configuration sections.'
      }
    }
  }
}

// With Icons
export const WithIcons: Story = {
  render: () => {
    const [notificationSettings, setNotificationSettings] = React.useState({
      email_projects: true,
      sms_urgent: false,
      push_browser: true,
      email_marketing: false,
      sms_reminders: true
    })

    const [privacySettings, setPrivacySettings] = React.useState({
      profile_public: true,
      show_activity: false,
      allow_search: true,
      data_analytics: false
    })

    return (
      <div className="max-w-2xl">
        <Accordion type="single" collapsible>
          <AccordionItem value="profile">
            <AccordionTrigger
              value="profile"
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              }
            >
              Perfil do Usuário
            </AccordionTrigger>
            <AccordionContent value="profile">
              <div className="space-y-3">
                <p>Gerencie as informações do seu perfil:</p>
                <Card variant="filled" padding="sm" className="bg-blue-50">
                  <div className="text-sm space-y-1">
                    <div><strong>Nome:</strong> João Silva</div>
                    <div><strong>Email:</strong> joao@email.com</div>
                    <div><strong>Cargo:</strong> Desenvolvedor Frontend</div>
                  </div>
                </Card>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="notifications">
            <AccordionTrigger
              value="notifications"
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM10.07 2.82l3.12 3.12M7.05 5.84L3.93 2.72M2 12h4M20 12h4M7.05 18.16l3.12-3.12M17.95 18.16l-3.12-3.12" />
                </svg>
              }
            >
              Notificações
            </AccordionTrigger>
            <AccordionContent value="notifications">
              <div className="space-y-3">
                <p>Configure suas preferências de notificação:</p>
                <CheckboxGroup
                  title="Tipos de Notificação"
                  description="Escolha como você gostaria de receber notificações"
                  options={[
                    {
                      id: 'email_projects',
                      label: 'Email de novos projetos',
                      description: 'Receba emails quando novos projetos forem criados'
                    },
                    {
                      id: 'sms_urgent',
                      label: 'SMS para atualizações urgentes',
                      description: 'Mensagens de texto para notificações importantes'
                    },
                    {
                      id: 'push_browser',
                      label: 'Notificações push no navegador',
                      description: 'Notificações em tempo real no seu navegador'
                    },
                    {
                      id: 'email_marketing',
                      label: 'Emails promocionais',
                      description: 'Receba ofertas especiais e novidades'
                    },
                    {
                      id: 'sms_reminders',
                      label: 'Lembretes por SMS',
                      description: 'Lembretes de tarefas e prazos importantes'
                    }
                  ]}
                  values={notificationSettings}
                  onChange={(values) => setNotificationSettings(values as typeof notificationSettings)}
                />
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="privacy">
            <AccordionTrigger
              value="privacy"
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              }
            >
              Privacidade e Segurança
            </AccordionTrigger>
            <AccordionContent value="privacy">
              <div className="space-y-4">
                <p>Controle suas configurações de privacidade:</p>

                <CheckboxGroup
                  title="Configurações de Privacidade"
                  description="Gerencie como suas informações são compartilhadas"
                  options={[
                    {
                      id: 'profile_public',
                      label: 'Perfil público',
                      description: 'Permitir que outros usuários vejam seu perfil'
                    },
                    {
                      id: 'show_activity',
                      label: 'Mostrar atividade',
                      description: 'Exibir sua atividade recente para outros usuários'
                    },
                    {
                      id: 'allow_search',
                      label: 'Permitir busca',
                      description: 'Aparecer nos resultados de busca da plataforma'
                    },
                    {
                      id: 'data_analytics',
                      label: 'Análise de dados',
                      description: 'Permitir uso de dados para melhorar a experiência'
                    }
                  ]}
                  values={privacySettings}
                  onChange={(values) => setPrivacySettings(values as typeof privacySettings)}
                />

                <Card variant="filled" padding="sm" className="bg-green-50">
                  <div className="text-sm space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Autenticação 2FA</span>
                      <span className="text-green-600 font-medium">Habilitado</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Sessões ativas</span>
                      <span className="text-gray-600">3 dispositivos</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Última verificação</span>
                      <span className="text-gray-600">2 horas atrás</span>
                    </div>
                  </div>
                </Card>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Accordion with icons and interactive CheckboxGroup components. Demonstrates advanced usage with form controls and state management.'
      }
    }
  }
}

// Disabled Items
export const WithDisabledItems: Story = {
  render: () => (
    <div className="max-w-2xl">
      <Accordion type="single" collapsible>
        <AccordionItem value="available">
          <AccordionTrigger value="available">
            Funcionalidade Disponível
          </AccordionTrigger>
          <AccordionContent value="available">
            <p>Esta funcionalidade está disponível e pode ser acessada normalmente.</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="disabled" disabled>
          <AccordionTrigger value="disabled">
            Funcionalidade em Desenvolvimento
          </AccordionTrigger>
          <AccordionContent value="disabled">
            <p>Esta funcionalidade está sendo desenvolvida e estará disponível em breve.</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="premium">
          <AccordionTrigger value="premium">
            Funcionalidade Premium
          </AccordionTrigger>
          <AccordionContent value="premium">
            <div className="space-y-3">
              <p>Esta é uma funcionalidade premium disponível nos planos Pro e Enterprise.</p>
              <Card variant="outlined" padding="sm" className="bg-yellow-50 border-yellow-200">
                <p className="text-sm text-yellow-800">
                  💎 Faça upgrade para acessar funcionalidades avançadas
                </p>
              </Card>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Accordion with disabled items and premium content indicators. Shows how to handle different item states and access levels.'
      }
    }
  }
}

// Controlled Example
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState<string>('item-1')

    return (
      <div className="max-w-2xl space-y-4">
        <Card variant="filled" padding="md">
          <div className="card-header">
            <div className="card-header-content">
              <h3 className="card-header-title">Controle Externo</h3>
              <p className="card-header-subtitle">
                Item ativo: <strong>{value || 'Nenhum'}</strong>
              </p>
            </div>
          </div>
          <div className="card-content">
            <div className="flex gap-2">
              <Button
                onClick={() => setValue('item-1')}
                variant="secondary"
                size="sm"
              >
                Abrir Item 1
              </Button>
              <Button
                onClick={() => setValue('item-2')}
                variant="secondary"
                size="sm"
              >
                Abrir Item 2
              </Button>
              <Button
                onClick={() => setValue('')}
                variant="neutral"
                size="sm"
              >
                Fechar Todos
              </Button>
            </div>
          </div>
        </Card>

        <Accordion
          type="single"
          value={value}
          onValueChange={(newValue) => setValue(newValue as string)}
        >
          <AccordionItem value="item-1">
            <AccordionTrigger value="item-1">
              Primeiro Item (Controlado)
            </AccordionTrigger>
            <AccordionContent value="item-1">
              <p>Este accordion é controlado externamente. O estado é gerenciado pelo componente pai.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger value="item-2">
              Segundo Item (Controlado)
            </AccordionTrigger>
            <AccordionContent value="item-2">
              <p>Você pode controlar qual item está aberto usando os botões acima.</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Controlled accordion with external state management. Demonstrates programmatic control with buttons and state display.'
      }
    }
  }
}

// Multiple Controlled
export const MultipleControlled: Story = {
  render: () => {
    const [values, setValues] = React.useState<string[]>(['faq-1'])

    const toggleItem = (item: string) => {
      setValues(prev =>
        prev.includes(item)
          ? prev.filter(v => v !== item)
          : [...prev, item]
      )
    }

    return (
      <div className="max-w-2xl space-y-4">
        <Card variant="filled" padding="md">
          <div className="card-header">
            <div className="card-header-content">
              <h3 className="card-header-title">Controle Múltiplo</h3>
              <p className="card-header-subtitle">
                Itens ativos: <strong>{values.length > 0 ? values.join(', ') : 'Nenhum'}</strong>
              </p>
            </div>
          </div>
          <div className="card-content">
            <div className="flex flex-wrap gap-2">
              {['faq-1', 'faq-2', 'faq-3'].map(item => (
                <Button
                  key={item}
                  onClick={() => toggleItem(item)}
                  variant={values.includes(item) ? 'primary' : 'secondary'}
                  size="sm"
                >
                  {values.includes(item) ? 'Fechar' : 'Abrir'} {item.toUpperCase()}
                </Button>
              ))}
              <Button
                onClick={() => setValues([])}
                variant="danger"
                size="sm"
              >
                Fechar Todos
              </Button>
            </div>
          </div>
        </Card>

        <Accordion
          type="multiple"
          value={values}
          onValueChange={(newValues) => setValues(newValues as string[])}
        >
          <AccordionItem value="faq-1">
            <AccordionTrigger value="faq-1">
              Como posso cancelar minha assinatura?
            </AccordionTrigger>
            <AccordionContent value="faq-1">
              <p>Você pode cancelar sua assinatura a qualquer momento através das configurações da conta ou entrando em contato com nosso suporte.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="faq-2">
            <AccordionTrigger value="faq-2">
              Existe um período de teste gratuito?
            </AccordionTrigger>
            <AccordionContent value="faq-2">
              <p>Sim! Oferecemos 14 dias de teste gratuito para todos os novos usuários. Não é necessário cartão de crédito.</p>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="faq-3">
            <AccordionTrigger value="faq-3">
              Como posso fazer upgrade do meu plano?
            </AccordionTrigger>
            <AccordionContent value="faq-3">
              <p>Acesse as configurações de faturamento na sua conta e selecione o plano desejado. O upgrade é aplicado imediatamente.</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Multiple controlled accordion with dynamic button controls. Shows how to manage multiple open items programmatically.'
      }
    }
  }
}

// FAQ Example
export const FAQ: Story = {
  render: () => (
    <div className="max-w-3xl">
      <PageHeader
        title="Perguntas Frequentes"
        description="Encontre respostas para as dúvidas mais comuns sobre nossa plataforma."
        className="mb-6"
      />

      <Accordion type="single" collapsible>
        <AccordionItem value="getting-started">
          <AccordionTrigger value="getting-started">
            Como começar a usar a plataforma?
          </AccordionTrigger>
          <AccordionContent value="getting-started">
            <div className="space-y-3">
              <p>Para começar a usar nossa plataforma, siga estes passos simples:</p>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Crie sua conta gratuita</li>
                <li>Confirme seu email</li>
                <li>Complete seu perfil</li>
                <li>Explore o dashboard</li>
                <li>Configure suas preferências</li>
              </ol>
              <Card variant="filled" padding="sm" className="bg-blue-50 mt-3">
                <p className="text-sm text-blue-800">
                  💡 <strong>Dica:</strong> Assista nosso vídeo tutorial de 5 minutos para uma introdução completa.
                </p>
              </Card>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="pricing">
          <AccordionTrigger value="pricing">
            Quais são os planos disponíveis e seus preços?
          </AccordionTrigger>
          <AccordionContent value="pricing">
            <div className="space-y-4">
              <p>Oferecemos três planos principais:</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card variant="outlined" padding="md">
                  <h4 className="font-semibold text-lg">Básico</h4>
                  <p className="text-2xl font-bold text-blue-600">R$ 29<span className="text-sm font-normal">/mês</span></p>
                  <ul className="text-sm text-gray-600 mt-2 space-y-1">
                    <li>• Até 5 projetos</li>
                    <li>• 10GB de armazenamento</li>
                    <li>• Suporte por email</li>
                  </ul>
                </Card>
                <Card variant="outlined" padding="md" className="border-2 border-blue-500 relative">
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-3 py-1 rounded-full text-xs">
                    Mais Popular
                  </div>
                  <h4 className="font-semibold text-lg">Pro</h4>
                  <p className="text-2xl font-bold text-blue-600">R$ 59<span className="text-sm font-normal">/mês</span></p>
                  <ul className="text-sm text-gray-600 mt-2 space-y-1">
                    <li>• Projetos ilimitados</li>
                    <li>• 100GB de armazenamento</li>
                    <li>• Suporte prioritário</li>
                  </ul>
                </Card>
                <Card variant="outlined" padding="md">
                  <h4 className="font-semibold text-lg">Enterprise</h4>
                  <p className="text-2xl font-bold text-blue-600">R$ 99<span className="text-sm font-normal">/mês</span></p>
                  <ul className="text-sm text-gray-600 mt-2 space-y-1">
                    <li>• Recursos avançados</li>
                    <li>• Armazenamento ilimitado</li>
                    <li>• Suporte 24/7</li>
                  </ul>
                </Card>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="security">
          <AccordionTrigger value="security">
            Como vocês garantem a segurança dos meus dados?
          </AccordionTrigger>
          <AccordionContent value="security">
            <div className="space-y-3">
              <p>A segurança dos seus dados é nossa prioridade máxima. Implementamos:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h5 className="font-medium">Criptografia</h5>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• SSL/TLS para transmissão</li>
                    <li>• AES-256 para armazenamento</li>
                    <li>• Chaves gerenciadas por HSM</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h5 className="font-medium">Controle de Acesso</h5>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Autenticação de dois fatores</li>
                    <li>• Controle de permissões</li>
                    <li>• Auditoria de atividades</li>
                  </ul>
                </div>
              </div>
              <Card variant="filled" padding="sm" className="bg-green-50">
                <p className="text-sm text-green-800">
                  🔒 <strong>Certificações:</strong> SOC 2 Type II, ISO 27001, GDPR compliant
                </p>
              </Card>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="support">
          <AccordionTrigger value="support">
            Como posso entrar em contato com o suporte?
          </AccordionTrigger>
          <AccordionContent value="support">
            <div className="space-y-4">
              <p>Oferecemos várias formas de suporte para atender suas necessidades:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card variant="filled" padding="md">
                  <h5 className="font-medium mb-2">Suporte Imediato</h5>
                  <div className="space-y-2 text-sm">
                    <div>💬 <strong>Chat ao vivo:</strong> 24/7</div>
                    <div>📞 <strong>Telefone:</strong> (11) 9999-9999</div>
                    <div>📧 <strong>Email:</strong> suporte@empresa.com</div>
                  </div>
                </Card>
                <Card variant="filled" padding="md">
                  <h5 className="font-medium mb-2">Recursos de Ajuda</h5>
                  <div className="space-y-2 text-sm">
                    <div>📚 <strong>Base de conhecimento</strong></div>
                    <div>🎥 <strong>Tutoriais em vídeo</strong></div>
                    <div>👥 <strong>Comunidade de usuários</strong></div>
                  </div>
                </Card>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Real-world FAQ example with comprehensive content including pricing tables, security information, and support options. Perfect template for help sections.'
      }
    }
  }
}
