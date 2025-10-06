import { ArrowRightIcon } from '@radix-ui/react-icons';
import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';
import { Button } from '../components/button';
import {
  CircularProgress,
  Loading,
  Progress,
  Spinner,
  StepProgress
} from '../components/progress';

const meta: Meta<typeof Progress> = {
  title: 'Components/Progress',
  component: Progress,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Componentes de progresso para indicar o estado de carregamento e progresso de tarefas.'
      }
    }
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Progress Stories
export const Default: Story = {
  args: {
    value: 60,
    max: 100,
    label: 'Progresso do download',
    showValue: true,
  },
};

export const ProgressVariants = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Variantes de Progresso</h3>
        <div className="space-y-4">
          <Progress value={75} variant="default" label="Padrão" showValue />
          <Progress value={85} variant="success" label="Sucesso" showValue />
          <Progress value={45} variant="warning" label="Aviso" showValue />
          <Progress value={25} variant="error" label="Erro" showValue />
        </div>
      </div>
    </div>
  ),
};

export const ProgressSizes = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Tamanhos</h3>
        <div className="space-y-4">
          <Progress value={60} size="sm" label="Pequeno" showValue />
          <Progress value={60} size="md" label="Médio" showValue />
          <Progress value={60} size="lg" label="Grande" showValue />
        </div>
      </div>
    </div>
  ),
};

export const ProgressEffects = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Efeitos Visuais</h3>
        <div className="space-y-4">
          <Progress value={70} label="Normal" showValue />
          <Progress value={70} striped label="Listrado" showValue />
          <Progress value={70} striped animated label="Listrado Animado" showValue />
        </div>
      </div>
    </div>
  ),
};

export const InteractiveProgress = {
  render: () => {
    const [progress, setProgress] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
      let interval: number;
      if (isRunning && progress < 100) {
        interval = setInterval(() => {
          setProgress(prev => {
            if (prev >= 100) {
              setIsRunning(false);
              return 100;
            }
            return prev + 1;
          });
        }, 50);
      }
      return () => clearInterval(interval);
    }, [isRunning, progress]);

    const handleStart = () => {
      setIsRunning(true);
    };

    const handleReset = () => {
      setProgress(0);
      setIsRunning(false);
    };

    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Progresso Interativo</h3>
          <Progress
            value={progress}
            label="Simulação de upload"
            showValue
            striped
            animated={isRunning}
          />
          <div className="flex gap-3 mt-4">
            <Button
              onClick={handleStart}
              disabled={isRunning || progress === 100}
              variant="primary"
            >
              {progress === 100 ? 'Concluído' : 'Iniciar'}
            </Button>
            <Button
              onClick={handleReset}
              variant="outlined"
            >
              Resetar
            </Button>
          </div>
        </div>
      </div>
    );
  },
};

// Circular Progress Stories
export const CircularProgressBasic = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Progresso Circular</h3>
        <div className="flex items-center gap-6">
          <CircularProgress value={25} showValue />
          <CircularProgress value={50} showValue />
          <CircularProgress value={75} showValue />
          <CircularProgress value={100} showValue />
        </div>
      </div>
    </div>
  ),
};

export const CircularProgressVariants = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Variantes Circulares</h3>
        <div className="flex items-center gap-6">
          <div className="text-center">
            <CircularProgress value={75} variant="default" showValue />
            <p className="text-sm mt-2">Padrão</p>
          </div>
          <div className="text-center">
            <CircularProgress value={85} variant="success" showValue />
            <p className="text-sm mt-2">Sucesso</p>
          </div>
          <div className="text-center">
            <CircularProgress value={45} variant="warning" showValue />
            <p className="text-sm mt-2">Aviso</p>
          </div>
          <div className="text-center">
            <CircularProgress value={25} variant="error" showValue />
            <p className="text-sm mt-2">Erro</p>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const CircularProgressSizes = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Tamanhos Circulares</h3>
        <div className="flex items-center gap-6">
          <div className="text-center">
            <CircularProgress value={75} size="sm" showValue />
            <p className="text-sm mt-2">Pequeno</p>
          </div>
          <div className="text-center">
            <CircularProgress value={75} size="md" showValue />
            <p className="text-sm mt-2">Médio</p>
          </div>
          <div className="text-center">
            <CircularProgress value={75} size="lg" showValue />
            <p className="text-sm mt-2">Grande</p>
          </div>
          <div className="text-center">
            <CircularProgress value={75} size="xl" showValue />
            <p className="text-sm mt-2">Extra Grande</p>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const CircularProgressIndeterminate = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Progresso Indeterminado</h3>
        <div className="flex items-center gap-6">
          <div className="text-center">
            <CircularProgress indeterminate />
            <p className="text-sm mt-2">Carregando...</p>
          </div>
          <div className="text-center">
            <CircularProgress indeterminate variant="success" />
            <p className="text-sm mt-2">Processando...</p>
          </div>
        </div>
      </div>
    </div>
  ),
};

// Spinner Stories
export const SpinnerVariants = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Tipos de Spinner</h3>
        <div className="flex items-center gap-8">
          <div className="text-center">
            <Spinner variant="default" />
            <p className="text-sm mt-2">Padrão</p>
          </div>
          <div className="text-center">
            <Spinner variant="dots" />
            <p className="text-sm mt-2">Pontos</p>
          </div>
          <div className="text-center">
            <Spinner variant="pulse" />
            <p className="text-sm mt-2">Pulso</p>
          </div>
          <div className="text-center">
            <Spinner variant="bars" />
            <p className="text-sm mt-2">Barras</p>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const SpinnerSizes = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Tamanhos de Spinner</h3>
        <div className="flex items-center gap-6">
          <div className="text-center">
            <Spinner size="xs" />
            <p className="text-sm mt-2">XS</p>
          </div>
          <div className="text-center">
            <Spinner size="sm" />
            <p className="text-sm mt-2">SM</p>
          </div>
          <div className="text-center">
            <Spinner size="md" />
            <p className="text-sm mt-2">MD</p>
          </div>
          <div className="text-center">
            <Spinner size="lg" />
            <p className="text-sm mt-2">LG</p>
          </div>
          <div className="text-center">
            <Spinner size="xl" />
            <p className="text-sm mt-2">XL</p>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const SpinnerColors = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Cores de Spinner</h3>
        <div className="flex items-center gap-6">
          <div className="text-center">
            <Spinner color="default" />
            <p className="text-sm mt-2">Padrão</p>
          </div>
          <div className="text-center">
            <Spinner color="primary" />
            <p className="text-sm mt-2">Primário</p>
          </div>
          <div className="text-center bg-gray-800 p-4 rounded">
            <Spinner color="white" />
            <p className="text-sm mt-2 text-white">Branco</p>
          </div>
          <div className="text-center">
            <Spinner color="gray" />
            <p className="text-sm mt-2">Cinza</p>
          </div>
        </div>
      </div>
    </div>
  ),
};

// Loading Stories
export const LoadingBasic = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Estados de Carregamento</h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="border rounded-lg p-6">
            <Loading />
          </div>
          <div className="border rounded-lg p-6">
            <Loading text="Processando dados..." />
          </div>
        </div>
      </div>
    </div>
  ),
};

export const LoadingVariants = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Variantes de Loading</h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="border rounded-lg p-6">
            <Loading
              text="Enviando arquivo..."
              spinner={{ variant: 'dots', color: 'primary' }}
            />
          </div>
          <div className="border rounded-lg p-6">
            <Loading
              text="Sincronizando..."
              spinner={{ variant: 'bars', color: 'primary' }}
            />
          </div>
          <div className="border rounded-lg p-6">
            <Loading
              text="Aguarde..."
              spinner={{ variant: 'pulse', color: 'primary', size: 'lg' }}
            />
          </div>
          <div className="border rounded-lg p-6">
            <Loading
              text="Conectando..."
              spinner={{ size: 'lg', color: 'primary' }}
            />
          </div>
        </div>
      </div>
    </div>
  ),
};

// Step Progress Stories
export const StepProgressBasic = {
  render: () => {
    const steps = [
      { label: 'Informações Pessoais', description: 'Nome, email e telefone' },
      { label: 'Endereço', description: 'Dados de localização' },
      { label: 'Pagamento', description: 'Método de pagamento' },
      { label: 'Confirmação', description: 'Revisar e confirmar' },
    ];

    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Progresso por Etapas</h3>
          <StepProgress steps={steps} currentStep={1} />
        </div>
      </div>
    );
  },
};

export const StepProgressInteractive = {
  render: () => {
    const [currentStep, setCurrentStep] = useState(0);

    const steps = [
      { label: 'Início', description: 'Configuração inicial' },
      { label: 'Dados', description: 'Inserir informações' },
      { label: 'Revisão', description: 'Verificar dados' },
      { label: 'Finalização', description: 'Concluir processo' },
    ];

    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Progresso Interativo por Etapas</h3>
          <StepProgress
            steps={steps}
            currentStep={currentStep}
            clickable
            onStepClick={setCurrentStep}
          />
          <div className="flex gap-3 mt-6">
            <Button
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
              variant="outlined"
            >
              Anterior
            </Button>
            <Button
              onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
              disabled={currentStep === steps.length - 1}
              variant="primary"
              rightIcon={<ArrowRightIcon className="w-4 h-4" />}
            >
              Próximo
            </Button>
          </div>
        </div>
      </div>
    );
  },
};

export const StepProgressVariants = {
  render: () => {
    const steps = [
      { label: 'Etapa 1' },
      { label: 'Etapa 2' },
      { label: 'Etapa 3' },
      { label: 'Etapa 4' },
    ];

    return (
      <div className="space-y-8">
        <div>
          <h4 className="font-medium mb-4">Horizontal Padrão</h4>
          <StepProgress steps={steps} currentStep={2} />
        </div>

        <div>
          <h4 className="font-medium mb-4">Horizontal Minimalista</h4>
          <StepProgress steps={steps} currentStep={2} variant="minimal" />
        </div>

        <div>
          <h4 className="font-medium mb-4">Horizontal com Pontos</h4>
          <StepProgress steps={steps} currentStep={2} variant="dots" />
        </div>

        <div className="flex gap-8">
          <div>
            <h4 className="font-medium mb-4">Vertical</h4>
            <StepProgress
              steps={steps}
              currentStep={2}
              orientation="vertical"
            />
          </div>
        </div>
      </div>
    );
  },
};

// Real-world Examples
export const RealWorldExamples = {
  render: () => {
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);

    const simulateUpload = () => {
      setIsUploading(true);
      setUploadProgress(0);

      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsUploading(false);
            return 100;
          }
          return prev + Math.random() * 10;
        });
      }, 200);
    };

    return (
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">Exemplos do Mundo Real</h3>

          {/* File Upload Example */}
          <div className="border rounded-lg p-6 space-y-4">
            <h4 className="font-medium">Upload de Arquivo</h4>
            <Progress
              value={uploadProgress}
              label="documento.pdf"
              showValue
              variant={uploadProgress === 100 ? 'success' : 'default'}
              striped={isUploading}
              animated={isUploading}
            />
            <Button
              onClick={simulateUpload}
              disabled={isUploading}
              variant="primary"
              loading={isUploading}
            >
              {isUploading ? 'Enviando...' : uploadProgress === 100 ? 'Concluído' : 'Iniciar Upload'}
            </Button>
          </div>

          {/* Dashboard Stats */}
          <div className="border rounded-lg p-6 space-y-4">
            <h4 className="font-medium">Estatísticas do Dashboard</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">CPU</span>
                  <span className="text-sm text-gray-500">45%</span>
                </div>
                <Progress value={45} size="sm" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Memória</span>
                  <span className="text-sm text-gray-500">78%</span>
                </div>
                <Progress value={78} size="sm" variant="warning" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Disco</span>
                  <span className="text-sm text-gray-500">92%</span>
                </div>
                <Progress value={92} size="sm" variant="error" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm">Rede</span>
                  <span className="text-sm text-gray-500">23%</span>
                </div>
                <Progress value={23} size="sm" variant="success" />
              </div>
            </div>
          </div>

          {/* Loading States */}
          <div className="grid grid-cols-3 gap-4">
            <div className="border rounded-lg p-6">
              <Loading text="Carregando dados..." spinner={{ size: 'sm' }} />
            </div>
            <div className="border rounded-lg p-6">
              <Loading text="Processando..." spinner={{ variant: 'dots' }} />
            </div>
            <div className="border rounded-lg p-6">
              <Loading text="Sincronizando..." spinner={{ variant: 'bars' }} />
            </div>
          </div>
        </div>
      </div>
    );
  },
};
