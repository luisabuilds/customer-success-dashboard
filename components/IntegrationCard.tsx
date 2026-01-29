'use client';

import { CustomerIntegration } from '@/types/integration';
import { Calendar, User, AlertCircle, CheckCircle2, Clock, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';
import Link from 'next/link';

interface IntegrationCardProps {
  integration: CustomerIntegration;
  onClick: () => void;
}

const priorityColors = {
  High: 'bg-red-100 text-red-800 border-red-200',
  Medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  Low: 'bg-green-100 text-green-800 border-green-200',
};

export function IntegrationCard({ integration, onClick }: IntegrationCardProps) {
  const completedTasks = integration.tasks.filter(t => t.status === 'Completed').length;
  const totalTasks = integration.tasks.length;
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div
      onClick={onClick}
      className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-1">
            {integration.account}
          </h3>
          <p className="text-sm text-gray-600">{integration.integrationType}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${priorityColors[integration.priority]}`}>
          {integration.priority}
        </span>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <User className="w-4 h-4 mr-2" />
          <span className="font-medium">Contact:</span>
          <span className="ml-1">{integration.contact}</span>
        </div>

        <div className="flex items-center text-sm text-gray-600">
          <User className="w-4 h-4 mr-2" />
          <span className="font-medium">AE:</span>
          <span className="ml-1">{integration.accountExecutive}</span>
        </div>

        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="w-4 h-4 mr-2" />
          <span className="font-medium">Kickoff:</span>
          <span className="ml-1">{format(new Date(integration.kickoffDate), 'MMM dd, yyyy')}</span>
        </div>

        {integration.integrationScopeDocUrl && (
          <div className="flex items-center text-sm text-blue-600 hover:text-blue-800">
            <ExternalLink className="w-4 h-4 mr-2" />
            <a 
              href={integration.integrationScopeDocUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="underline"
            >
              Integration Scope Doc
            </a>
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 pt-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Tasks Progress</span>
          <span className="text-sm text-gray-600">{completedTasks} / {totalTasks}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}
