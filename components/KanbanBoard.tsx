'use client';

import { CustomerIntegration, IntegrationStage } from '@/types/integration';
import { IntegrationCard } from './IntegrationCard';

interface KanbanBoardProps {
  integrations: CustomerIntegration[];
  onCardClick: (integration: CustomerIntegration) => void;
  onStageChange: (integrationId: string, newStage: IntegrationStage) => void;
}

const stages: IntegrationStage[] = ['New Integrations', 'In Progress', 'Review', 'Completed'];

const stageColors = {
  'New Integrations': 'bg-gray-50 border-gray-300',
  'In Progress': 'bg-gray-50 border-gray-300',
  'Review': 'bg-gray-50 border-gray-300',
  'Completed': 'bg-gray-50 border-gray-300'
};

const stageIcons = {
  'New Integrations': '🆕',
  'In Progress': '⚙️',
  'Review': '👀',
  'Completed': '✅'
};

export function KanbanBoard({ integrations, onCardClick, onStageChange }: KanbanBoardProps) {
  const getIntegrationsForStage = (stage: IntegrationStage) => {
    return integrations.filter(int => int.stage === stage);
  };

  const handleDragStart = (e: React.DragEvent, integration: CustomerIntegration) => {
    e.dataTransfer.setData('integrationId', integration.id);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, stage: IntegrationStage) => {
    e.preventDefault();
    const integrationId = e.dataTransfer.getData('integrationId');
    onStageChange(integrationId, stage);
  };

  return (
    <div className="overflow-x-auto pb-4 -mx-4 px-4">
      <div className="flex gap-6 min-w-max">
        {stages.map((stage) => {
          const stageIntegrations = getIntegrationsForStage(stage);
          return (
            <div
              key={stage}
              className={`rounded-lg border-2 ${stageColors[stage]} p-4 min-h-[500px] w-[350px] flex-shrink-0`}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, stage)}
            >
              <div className="mb-4 sticky top-0 bg-white rounded-lg p-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <span className="text-2xl">{stageIcons[stage]}</span>
                    {stage}
                  </h3>
                  <span className="bg-gray-200 text-gray-700 w-8 h-8 rounded-full text-sm font-medium flex items-center justify-center">
                    {stageIntegrations.length}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {stageIntegrations.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    <p className="text-sm">No integrations</p>
                    <p className="text-xs mt-1">Drag cards here</p>
                  </div>
                ) : (
                  stageIntegrations.map((integration) => (
                    <div
                      key={integration.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, integration)}
                      className="cursor-move"
                    >
                      <IntegrationCard
                        integration={integration}
                        onClick={() => onCardClick(integration)}
                      />
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
