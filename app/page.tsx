'use client';

import { useState, useEffect } from 'react';
import { CustomerIntegration, IntegrationType, Priority, IntegrationStage } from '@/types/integration';
import { IntegrationModal } from '@/components/IntegrationModal';
import { KanbanBoard } from '@/components/KanbanBoard';
import { TableView } from '@/components/TableView';
import { Plus, Search, RefreshCw, Table, Kanban } from 'lucide-react';
import axios from 'axios';

export default function DashboardPage() {
  const [integrations, setIntegrations] = useState<CustomerIntegration[]>([]);
  const [selectedIntegration, setSelectedIntegration] = useState<CustomerIntegration | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState<Priority | 'All'>('All');
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'table' | 'kanban'>('kanban');

  const [newIntegration, setNewIntegration] = useState<Partial<CustomerIntegration>>({
    account: '',
    contact: '',
    accountExecutive: '',
    integrationType: 'AI Automated Prior Authorizations',
    integrationScopeDocUrl: '',
    priority: 'Medium',
    kickoffDate: '',
    stage: 'New Integrations',
    tasks: []
  });

  useEffect(() => {
    fetchIntegrations();
  }, []);

  const fetchIntegrations = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('/api/integrations');
      setIntegrations(response.data.data);
    } catch (error) {
      console.error('Error fetching integrations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateIntegration = async () => {
    if (!newIntegration.account || !newIntegration.contact || !newIntegration.accountExecutive || !newIntegration.kickoffDate) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const response = await axios.post('/api/integrations', newIntegration);
      setIntegrations([...integrations, response.data.data]);
      setIsCreateModalOpen(false);
      setNewIntegration({
        account: '',
        contact: '',
        accountExecutive: '',
        integrationType: 'AI Automated Prior Authorizations',
        integrationScopeDocUrl: '',
        priority: 'Medium',
        kickoffDate: '',
        stage: 'New Integrations',
        tasks: []
      });
    } catch (error) {
      console.error('Error creating integration:', error);
      alert('Failed to create integration');
    }
  };

  const handleUpdateIntegration = async (id: string, updates: Partial<CustomerIntegration>) => {
    try {
      const response = await axios.patch(`/api/integrations/${id}`, updates);
      setIntegrations(integrations.map(int => 
        int.id === id ? response.data.data : int
      ));
      if (selectedIntegration && selectedIntegration.id === id) {
        setSelectedIntegration(response.data.data);
      }
    } catch (error) {
      console.error('Error updating integration:', error);
      alert('Failed to update integration');
    }
  };

  const handleStageChange = async (integrationId: string, newStage: IntegrationStage) => {
    await handleUpdateIntegration(integrationId, { stage: newStage });
  };

  const filteredIntegrations = integrations.filter(int => {
    const matchesSearch = int.account.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         int.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         int.accountExecutive.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = filterPriority === 'All' || int.priority === filterPriority;
    return matchesSearch && matchesPriority;
  });

  const stats = {
    backlog: integrations.filter(i => i.stage === 'New Integrations').length,
    inProgress: integrations.filter(i => i.stage === 'In Progress').length,
    atRisk: integrations.filter(i => {
      // Integrations are "at risk" if they have high priority and are not completed
      // or if they have overdue tasks
      const hasHighPriority = i.priority === 'High';
      const isNotCompleted = i.stage !== 'Completed';
      return hasHighPriority && isNotCompleted;
    }).length
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <img 
            src="https://res.cloudinary.com/dk9rccpw4/image/upload/v1769739910/Screenshot_2026-01-29_at_9.14.56_p.m._jrvexj.png" 
            alt="Company Logo" 
            className="h-10 w-auto"
          />
        </div>
      </nav>

      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Customer Success Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage customer integrations and onboarding</p>
            </div>
            <div className="flex gap-3">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('table')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                    viewMode === 'table'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Table className="w-4 h-4" />
                  Table
                </button>
                <button
                  onClick={() => setViewMode('kanban')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                    viewMode === 'kanban'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Kanban className="w-4 h-4" />
                  Kanban
                </button>
              </div>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
                New Integration
              </button>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">Integration Backlog</p>
              <p className="text-2xl font-bold text-blue-600">{stats.backlog}</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">Integrations In Progress</p>
              <p className="text-2xl font-bold text-purple-600">{stats.inProgress}</p>
            </div>
            <div className="bg-red-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">Integrations at Risk</p>
              <p className="text-2xl font-bold text-red-600">{stats.atRisk}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by account, contact, or AE..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value as Priority | 'All')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <button
              onClick={fetchIntegrations}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading integrations...</p>
          </div>
        ) : filteredIntegrations.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No integrations found. Create your first integration!</p>
          </div>
        ) : viewMode === 'kanban' ? (
          <KanbanBoard
            integrations={filteredIntegrations}
            onCardClick={setSelectedIntegration}
            onStageChange={handleStageChange}
          />
        ) : (
          <TableView
            integrations={filteredIntegrations}
            onRowClick={setSelectedIntegration}
          />
        )}
      </div>

      {selectedIntegration && (
        <IntegrationModal
          integration={selectedIntegration}
          onClose={() => setSelectedIntegration(null)}
          onUpdate={(updates) => handleUpdateIntegration(selectedIntegration.id, updates)}
        />
      )}

      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Create New Integration</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Account (Company) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newIntegration.account}
                  onChange={(e) => setNewIntegration({ ...newIntegration, account: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="Enter company name"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contact <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={newIntegration.contact}
                    onChange={(e) => setNewIntegration({ ...newIntegration, contact: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="Contact at company"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Account Executive <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={newIntegration.accountExecutive}
                    onChange={(e) => setNewIntegration({ ...newIntegration, accountExecutive: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="Our account executive"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Integration Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={newIntegration.integrationType}
                  onChange={(e) => setNewIntegration({ ...newIntegration, integrationType: e.target.value as IntegrationType })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="AI Automated Prior Authorizations">AI Automated Prior Authorizations</option>
                  <option value="AI Automation for DME">AI Automation for DME</option>
                  <option value="Full Service DME RCM">Full Service DME RCM</option>
                  <option value="AI Population Health Analytics">AI Population Health Analytics</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Integration Scope Document URL
                </label>
                <input
                  type="url"
                  value={newIntegration.integrationScopeDocUrl}
                  onChange={(e) => setNewIntegration({ ...newIntegration, integrationScopeDocUrl: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="https://docs.google.com/document/d/..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Attio Account URL
                </label>
                <input
                  type="url"
                  value={newIntegration.attioAccountUrl}
                  onChange={(e) => setNewIntegration({ ...newIntegration, attioAccountUrl: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  placeholder="https://app.attio.com/companies/..."
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stage
                  </label>
                  <select
                    value={newIntegration.stage}
                    onChange={(e) => setNewIntegration({ ...newIntegration, stage: e.target.value as IntegrationStage })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="New Integrations">New Integrations</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Review">Review</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Priority
                  </label>
                  <select
                    value={newIntegration.priority}
                    onChange={(e) => setNewIntegration({ ...newIntegration, priority: e.target.value as Priority })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Kickoff Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={newIntegration.kickoffDate}
                    onChange={(e) => setNewIntegration({ ...newIntegration, kickoffDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateIntegration}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Create Integration
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
