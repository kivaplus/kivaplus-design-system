import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useState } from 'react';
import { Checkbox } from '../components/checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Formularios/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Um componente de checkbox customizado com suporte a estados de erro, indeterminado e desabilitado.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Texto do label do checkbox'
    },
    description: {
      control: 'text',
      description: 'Texto de descrição adicional'
    },
    error: {
      control: 'boolean',
      description: 'Estado de erro do checkbox'
    },
    indeterminate: {
      control: 'boolean',
      description: 'Estado indeterminado do checkbox'
    },
    disabled: {
      control: 'boolean',
      description: 'Estado desabilitado do checkbox'
    },
    checked: {
      control: 'boolean',
      description: 'Estado marcado do checkbox'
    }
  },
  args: {
    onChange: fn()
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Aceito os termos de uso',
    description: 'Concordo com os termos e condições',
  },
};

export const Checked: Story = {
  args: {
    label: 'Checkbox marcado',
    description: 'Este checkbox já está marcado',
    checked: true,
  },
};

export const WithError = {
  render: () => {
    const [checked, setChecked] = useState(false);

    return (
      <Checkbox
        label="Campo obrigatório interativo"
        description="Este campo deve ser marcado"
        error={!checked}
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
    );
  },
};


export const Indeterminate: Story = {
  args: {
    label: 'Selecionar todos',
    description: 'Alguns itens estão selecionados',
    indeterminate: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Opção desabilitada',
    description: 'Esta opção não está disponível',
    disabled: true,
  },
};

export const MultipleCheckboxes = {
  render: () => {
    const [options, setOptions] = useState({
      option1: false,
      option2: true,
      option3: false,
    });

    const handleChange = (key: keyof typeof options) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setOptions(prev => ({
        ...prev,
        [key]: e.target.checked
      }));
    };

    const allChecked = Object.values(options).every(Boolean);
    const someChecked = Object.values(options).some(Boolean);
    const indeterminate = someChecked && !allChecked;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <Checkbox
          label="Selecionar todos"
          description="Controla todas as opções abaixo"
          checked={allChecked}
          indeterminate={indeterminate}
          onChange={(e) => {
            const newValue = e.target.checked;
            setOptions({
              option1: newValue,
              option2: newValue,
              option3: newValue,
            });
          }}
        />

        <div style={{ marginLeft: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Checkbox
            label="Opção 1"
            description="Primeira opção"
            checked={options.option1}
            onChange={handleChange('option1')}
          />
          <Checkbox
            label="Opção 2"
            description="Segunda opção"
            checked={options.option2}
            onChange={handleChange('option2')}
          />
          <Checkbox
            label="Opção 3"
            description="Terceira opção"
            checked={options.option3}
            onChange={handleChange('option3')}
          />
        </div>
      </div>
    );
  },
  parameters: {
    layout: 'centered',
  }
};






