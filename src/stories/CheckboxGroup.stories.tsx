import type { Meta } from '@storybook/react';
import { useState } from 'react';
import { Button } from '../components/button';
import { CheckboxGroup } from '../components/checkboxgroup';

const meta: Meta<typeof CheckboxGroup> = {
  title: 'Formularios/CheckboxGroup',
  component: CheckboxGroup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Um componente de grupo de checkboxes que pode exigir que todos os itens sejam marcados antes de permitir que o usuário avance.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Título do grupo de checkboxes'
    },
    description: {
      control: 'text',
      description: 'Descrição do grupo'
    },
    requireAll: {
      control: 'boolean',
      description: 'Se true, todos os checkboxes devem ser marcados'
    },
    error: {
      control: 'boolean',
      description: 'Estado de erro do grupo'
    },
    errorMessage: {
      control: 'text',
      description: 'Mensagem de erro personalizada'
    }
  }
};

export default meta;

// Sample options for stories
const termsOptions = [
  {
    id: 'terms',
    label: 'Aceito os Termos de Uso',
    description: 'Li e concordo com os termos e condições de uso da plataforma'
  },
  {
    id: 'privacy',
    label: 'Aceito a Política de Privacidade',
    description: 'Concordo com o tratamento dos meus dados pessoais conforme a política'
  },
  {
    id: 'newsletter',
    label: 'Aceito receber comunicações por email',
    description: 'Desejo receber newsletters e atualizações por email'
  }
];

const registrationOptions = [
  {
    id: 'age',
    label: 'Confirmo que tenho mais de 18 anos',
    description: 'Declaro ser maior de idade para usar esta plataforma'
  },
  {
    id: 'identity',
    label: 'Confirmo a veracidade das informações',
    description: 'Todas as informações fornecidas são verdadeiras e precisas'
  },
  {
    id: 'responsibility',
    label: 'Aceito a responsabilidade pelo uso da conta',
    description: 'Entendo que sou responsável por todas as atividades da minha conta'
  }
];

export const Default = {
  render: () => {
    const [values, setValues] = useState<Record<string, boolean>>({});

    return (
      <div className="max-w-2xl">
        <CheckboxGroup
          title="Termos e Condições"
          description="Para continuar, você deve aceitar todos os termos abaixo:"
          options={termsOptions}
          values={values}
          onChange={setValues}
          requireAll={true}
          errorMessage="Você deve aceitar todos os termos para continuar"
        />
      </div>
    );
  }
};

// Interactive Stories
export const InteractiveTerms = {
  render: () => {
    const [values, setValues] = useState<Record<string, boolean>>({});
    const [showError, setShowError] = useState(false);

    const handleSubmit = () => {
      const allChecked = termsOptions.every(option => values[option.id]);
      if (!allChecked) {
        setShowError(true);
      } else {
        setShowError(false);
        alert('Todos os termos foram aceitos! Você pode prosseguir.');
      }
    };

    return (
      <div className="max-w-2xl space-y-6">
        <CheckboxGroup
          title="Termos e Condições"
          description="Para criar sua conta, você deve aceitar todos os termos abaixo:"
          options={termsOptions}
          values={values}
          onChange={setValues}
          requireAll={true}
          error={showError}
          errorMessage="Você deve aceitar todos os termos para continuar"
        />

        <div className="flex gap-3 pt-4 border-t">
          <Button
            onClick={handleSubmit}
            variant="primary"
            size="md"
          >
            Criar Conta
          </Button>
          <Button
            onClick={() => setValues({})}
            variant="secondary"
            size="md"
          >
            Limpar Tudo
          </Button>
        </div>
      </div>
    );
  }
};

export const RegistrationForm = {
  render: () => {
    const [values, setValues] = useState<Record<string, boolean>>({});

    return (
      <div className="max-w-2xl">
        <CheckboxGroup
          title="Confirmações de Registro"
          description="Confirme as informações abaixo para finalizar seu registro:"
          options={registrationOptions}
          values={values}
          onChange={setValues}
          requireAll={true}
          errorMessage="Todas as confirmações são obrigatórias"
        />
      </div>
    );
  }
};

export const WithoutRequireAll = {
  render: () => {
    const [values, setValues] = useState<Record<string, boolean>>({});

    const optionalOptions = [
      {
        id: 'marketing',
        label: 'Receber ofertas promocionais',
        description: 'Desejo receber ofertas e promoções especiais'
      },
      {
        id: 'updates',
        label: 'Receber atualizações do produto',
        description: 'Notificações sobre novas funcionalidades e melhorias'
      },
      {
        id: 'research',
        label: 'Participar de pesquisas',
        description: 'Ajudar a melhorar o produto através de feedback'
      }
    ];

    return (
      <div className="max-w-2xl">
        <CheckboxGroup
          title="Preferências de Comunicação"
          description="Escolha como deseja receber comunicações (opcional):"
          options={optionalOptions}
          values={values}
          onChange={setValues}
          requireAll={false}
        />
      </div>
    );
  }
};

export const PrefilledWithError = {
  render: () => {
    const [values, setValues] = useState<Record<string, boolean>>({
      terms: true,
      privacy: false,
      newsletter: true
    });

    return (
      <div className="max-w-2xl">
        <CheckboxGroup
          title="Termos e Condições"
          description="Alguns itens ainda precisam ser aceitos:"
          options={termsOptions}
          values={values}
          onChange={setValues}
          requireAll={true}
          error={true}
          errorMessage="Você deve aceitar todos os termos obrigatórios"
        />
      </div>
    );
  }
};

export const LongList = {
  render: () => {
    const [values, setValues] = useState<Record<string, boolean>>({});

    const longOptions = [
      {
        id: 'terms1',
        label: 'Termos Gerais de Uso',
        description: 'Aceito os termos gerais de uso da plataforma'
      },
      {
        id: 'privacy1',
        label: 'Política de Privacidade',
        description: 'Concordo com a política de privacidade e tratamento de dados'
      },
      {
        id: 'cookies',
        label: 'Política de Cookies',
        description: 'Aceito o uso de cookies para melhorar a experiência'
      },
      {
        id: 'data',
        label: 'Compartilhamento de Dados',
        description: 'Autorizo o compartilhamento de dados com parceiros quando necessário'
      },
      {
        id: 'marketing',
        label: 'Comunicações de Marketing',
        description: 'Aceito receber comunicações promocionais e de marketing'
      },
      {
        id: 'analytics',
        label: 'Análise de Uso',
        description: 'Permito a coleta de dados de uso para análise e melhoria do serviço'
      }
    ];

    return (
      <div className="max-w-2xl">
        <CheckboxGroup
          title="Aceite Completo de Termos"
          description="Para usar nossa plataforma, você deve aceitar todos os termos abaixo:"
          options={longOptions}
          values={values}
          onChange={setValues}
          requireAll={true}
          errorMessage="Todos os termos devem ser aceitos para continuar"
        />
      </div>
    );
  }
};
