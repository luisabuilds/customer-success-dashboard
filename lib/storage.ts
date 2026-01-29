import { CustomerIntegration } from '@/types/integration';

// In-memory storage (for demo purposes)
// In production, replace with a database like PostgreSQL, MongoDB, etc.
let integrations: CustomerIntegration[] = [];

export const storageService = {
  getAllIntegrations: async (): Promise<CustomerIntegration[]> => {
    return integrations;
  },

  getIntegrationById: async (id: string): Promise<CustomerIntegration | null> => {
    return integrations.find(int => int.id === id) || null;
  },

  createIntegration: async (integration: CustomerIntegration): Promise<CustomerIntegration> => {
    integrations.push(integration);
    return integration;
  },

  updateIntegration: async (id: string, updates: Partial<CustomerIntegration>): Promise<CustomerIntegration | null> => {
    const index = integrations.findIndex(int => int.id === id);
    if (index === -1) return null;
    
    integrations[index] = { ...integrations[index], ...updates, updatedAt: new Date().toISOString() };
    return integrations[index];
  },

  deleteIntegration: async (id: string): Promise<boolean> => {
    const initialLength = integrations.length;
    integrations = integrations.filter(int => int.id !== id);
    return integrations.length < initialLength;
  },

  // Seed with demo data
  seedDemoData: () => {
    const demoIntegrations: CustomerIntegration[] = [
      {
        id: '1',
        account: 'Acme Healthcare',
        contact: 'Dr. Sarah Mitchell',
        accountExecutive: 'John Smith',
        integrationType: 'AI Automated Prior Authorizations',
        integrationScopeDocUrl: 'https://docs.google.com/document/d/example1',
        priority: 'High',
        stage: 'In Progress',
        tasks: [
          {
            id: '1-1',
            title: 'Initial requirements gathering',
            assignedTo: 'Sarah Johnson',
            team: 'Operations',
            status: 'Completed',
            deadline: '2026-02-15',
            description: 'Gather technical requirements and integration points'
          },
          {
            id: '1-2',
            title: 'Contract review',
            assignedTo: 'Mike Davis',
            team: 'Legal',
            status: 'In Progress',
            deadline: '2026-02-20',
            description: 'Review and approve integration contract terms'
          }
        ],
        kickoffDate: '2026-02-01',
        createdAt: '2026-01-28T10:00:00Z',
        updatedAt: '2026-01-29T09:30:00Z',
        attioRecordId: 'acme-healthcare-123',
        attioAccountUrl: 'https://app.attio.com/companies/acme-healthcare-123'
      },
      {
        id: '2',
        account: 'MediCare Plus',
        contact: 'Michael Johnson',
        accountExecutive: 'Emily Chen',
        integrationType: 'Full Service DME RCM',
        integrationScopeDocUrl: 'https://docs.google.com/document/d/example2',
        priority: 'Medium',
        stage: 'New Integrations',
        tasks: [
          {
            id: '2-1',
            title: 'Technical discovery call',
            assignedTo: 'Robert Lee',
            team: 'Product',
            status: 'Not Started',
            deadline: '2026-02-10',
            description: 'Schedule and conduct technical discovery session'
          }
        ],
        kickoffDate: '2026-02-10',
        createdAt: '2026-01-27T14:00:00Z',
        updatedAt: '2026-01-28T16:45:00Z',
        attioRecordId: 'medicare-plus-456',
        attioAccountUrl: 'https://app.attio.com/companies/medicare-plus-456'
      },
      {
        id: '3',
        account: 'HealthFirst Solutions',
        contact: 'Jennifer Lee',
        accountExecutive: 'David Martinez',
        integrationType: 'AI Population Health Analytics',
        integrationScopeDocUrl: 'https://docs.google.com/document/d/example3',
        priority: 'High',
        stage: 'Review',
        tasks: [
          {
            id: '3-1',
            title: 'Data mapping workshop',
            assignedTo: 'Lisa Wang',
            team: 'Operations',
            status: 'In Progress',
            deadline: '2026-02-05',
            description: 'Map customer data fields to our system'
          },
          {
            id: '3-2',
            title: 'Security audit',
            assignedTo: 'Tom Anderson',
            team: 'Product',
            status: 'Not Started',
            deadline: '2026-02-12',
            description: 'Complete security and compliance audit'
          }
        ],
        kickoffDate: '2026-02-01',
        createdAt: '2026-01-26T11:00:00Z',
        updatedAt: '2026-01-29T08:15:00Z',
        attioRecordId: 'healthfirst-789',
        attioAccountUrl: 'https://app.attio.com/companies/healthfirst-789'
      }
    ];

    integrations = demoIntegrations;
  }
};

// Initialize with demo data
storageService.seedDemoData();
