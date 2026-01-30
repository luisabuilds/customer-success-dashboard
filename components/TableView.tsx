'use client';

import { CustomerIntegration } from '@/types/integration';
import { format } from 'date-fns';
import { ExternalLink, User, Calendar } from 'lucide-react';

interface TableViewProps {
  integrations: CustomerIntegration[];
  onRowClick: (integration: CustomerIntegration) => void;
}

const priorityColors = {
  Highest: 'bg-red-600 text-white border-red-700',
  High: 'bg-red-100 text-red-800 border-red-200',
  Medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  Low: 'bg-green-100 text-green-800 border-green-200',
};

const stageColors = {
  'New Integrations': 'bg-purple-100 text-purple-800',
  'In Progress': 'bg-blue-100 text-blue-800',
  'Review': 'bg-yellow-100 text-yellow-800',
  'Completed': 'bg-green-100 text-green-800'
};

export function TableView({ integrations, onRowClick }: TableViewProps) {
  return (
    <div className="overflow-x-auto">
      <div className="inline-block min-w-full align-middle">
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                  Account
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Contact
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Account Executive
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Integration Type
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Stage
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Priority
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Kickoff Date
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Tasks
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {integrations.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-gray-500">
                    No integrations found. Create your first integration!
                  </td>
                </tr>
              ) : (
                integrations.map((integration) => {
                  const completedTasks = integration.tasks.filter(t => t.status === 'Completed').length;
                  const totalTasks = integration.tasks.length;
                  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

                  return (
                    <tr
                      key={integration.id}
                      onClick={() => onRowClick(integration)}
                      className="hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        <div className="flex flex-col">
                          <span className="font-semibold">{integration.account}</span>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4 text-gray-400" />
                          {integration.contact}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4 text-gray-400" />
                          {integration.accountExecutive}
                        </div>
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-700">
                        <div className="max-w-xs truncate">
                          {integration.integrationType}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${stageColors[integration.stage]}`}>
                          {integration.stage}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${priorityColors[integration.priority]}`}>
                          {integration.priority}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          {format(new Date(integration.kickoffDate), 'MMM dd, yyyy')}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center justify-between text-xs text-gray-600">
                            <span>{completedTasks} / {totalTasks}</span>
                            <span>{Math.round(progressPercentage)}%</span>
                          </div>
                          <div className="w-24 bg-gray-200 rounded-full h-1.5">
                            <div
                              className="bg-blue-600 h-1.5 rounded-full transition-all"
                              style={{ width: `${progressPercentage}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {integration.integrationScopeDocUrl && (
                          <a
                            href={integration.integrationScopeDocUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
