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
      // === NEW INTEGRATIONS (Backlog) - 5 items ===
      {
        id: '1',
        account: 'Pacific Medical Group',
        contact: 'Dr. Amanda Chen',
        accountExecutive: 'John Smith',
        integrationType: 'AI Automated Prior Authorizations',
        integrationScopeDocUrl: 'https://docs.google.com/document/d/pacific-medical',
        priority: 'High',
        stage: 'New Integrations',
        tasks: [
          {
            id: '1-1',
            title: 'Initial kickoff call',
            assignedTo: 'Sarah Johnson',
            team: 'Operations',
            status: 'Not Started',
            deadline: '2026-02-05',
            description: 'Schedule and conduct initial kickoff meeting'
          }
        ],
        kickoffDate: '2026-02-10',
        createdAt: '2026-01-28T10:00:00Z',
        updatedAt: '2026-01-29T09:30:00Z',
        attioRecordId: 'pacific-medical-001',
        attioAccountUrl: 'https://app.attio.com/companies/pacific-medical-001'
      },
      {
        id: '2',
        account: 'Sunrise Health Network',
        contact: 'Michael Torres',
        accountExecutive: 'Emily Chen',
        integrationType: 'Full Service DME RCM',
        integrationScopeDocUrl: 'https://docs.google.com/document/d/sunrise-health',
        priority: 'Medium',
        stage: 'New Integrations',
        tasks: [
          {
            id: '2-1',
            title: 'Technical discovery',
            assignedTo: 'Robert Lee',
            team: 'Product',
            status: 'Not Started',
            deadline: '2026-02-08',
            description: 'Conduct technical discovery session'
          }
        ],
        kickoffDate: '2026-02-12',
        createdAt: '2026-01-27T14:00:00Z',
        updatedAt: '2026-01-28T16:45:00Z',
        attioRecordId: 'sunrise-health-002',
        attioAccountUrl: 'https://app.attio.com/companies/sunrise-health-002'
      },
      {
        id: '3',
        account: 'Valley Care Physicians',
        contact: 'Dr. Rebecca Martinez',
        accountExecutive: 'David Martinez',
        integrationType: 'AI Population Health Analytics',
        integrationScopeDocUrl: 'https://docs.google.com/document/d/valley-care',
        priority: 'Low',
        stage: 'New Integrations',
        tasks: [],
        kickoffDate: '2026-02-15',
        createdAt: '2026-01-26T11:00:00Z',
        updatedAt: '2026-01-29T08:15:00Z',
        attioRecordId: 'valley-care-003',
        attioAccountUrl: 'https://app.attio.com/companies/valley-care-003'
      },
      {
        id: '4',
        account: 'Coastal Medical Associates',
        contact: 'James Wilson',
        accountExecutive: 'Sarah Kim',
        integrationType: 'AI Automation for DME',
        integrationScopeDocUrl: 'https://docs.google.com/document/d/coastal-medical',
        priority: 'Medium',
        stage: 'New Integrations',
        tasks: [],
        kickoffDate: '2026-02-18',
        createdAt: '2026-01-25T09:00:00Z',
        updatedAt: '2026-01-28T14:30:00Z',
        attioRecordId: 'coastal-medical-004',
        attioAccountUrl: 'https://app.attio.com/companies/coastal-medical-004'
      },
      {
        id: '5',
        account: 'Mountain View Health',
        contact: 'Dr. Linda Park',
        accountExecutive: 'John Smith',
        integrationType: 'AI Automated Prior Authorizations',
        integrationScopeDocUrl: 'https://docs.google.com/document/d/mountain-view',
        priority: 'High',
        stage: 'New Integrations',
        tasks: [
          {
            id: '5-1',
            title: 'Contract finalization',
            assignedTo: 'Mike Davis',
            team: 'Legal',
            status: 'Not Started',
            deadline: '2026-02-06',
            description: 'Finalize contract terms'
          }
        ],
        kickoffDate: '2026-02-20',
        createdAt: '2026-01-24T16:00:00Z',
        updatedAt: '2026-01-27T11:00:00Z',
        attioRecordId: 'mountain-view-005',
        attioAccountUrl: 'https://app.attio.com/companies/mountain-view-005'
      },

      // === IN PROGRESS - 7 items ===
      {
        id: '6',
        account: 'Acme Healthcare',
        contact: 'Dr. Sarah Mitchell',
        accountExecutive: 'Emily Chen',
        integrationType: 'AI Automated Prior Authorizations',
        integrationScopeDocUrl: 'https://docs.google.com/document/d/acme-healthcare',
        priority: 'High',
        stage: 'In Progress',
        tasks: [
          {
            id: '6-1',
            title: 'Initial requirements gathering',
            assignedTo: 'Sarah Johnson',
            team: 'Operations',
            status: 'Completed',
            deadline: '2026-01-25',
            description: 'Gather technical requirements and integration points'
          },
          {
            id: '6-2',
            title: 'API integration setup',
            assignedTo: 'Robert Lee',
            team: 'Product',
            status: 'In Progress',
            deadline: '2026-02-10',
            description: 'Set up API connections and test endpoints'
          }
        ],
        kickoffDate: '2026-01-20',
        createdAt: '2026-01-15T10:00:00Z',
        updatedAt: '2026-01-29T09:30:00Z',
        attioRecordId: 'acme-healthcare-006',
        attioAccountUrl: 'https://app.attio.com/companies/acme-healthcare-006'
      },
      {
        id: '7',
        account: 'Premier Health Systems',
        contact: 'Kevin O\'Brien',
        accountExecutive: 'David Martinez',
        integrationType: 'Full Service DME RCM',
        integrationScopeDocUrl: 'https://docs.google.com/document/d/premier-health',
        priority: 'Medium',
        stage: 'In Progress',
        tasks: [
          {
            id: '7-1',
            title: 'Data migration planning',
            assignedTo: 'Lisa Wang',
            team: 'Operations',
            status: 'In Progress',
            deadline: '2026-02-08',
            description: 'Plan and document data migration strategy'
          }
        ],
        kickoffDate: '2026-01-22',
        createdAt: '2026-01-18T14:00:00Z',
        updatedAt: '2026-01-28T16:45:00Z',
        attioRecordId: 'premier-health-007',
        attioAccountUrl: 'https://app.attio.com/companies/premier-health-007'
      },
      {
        id: '8',
        account: 'Unity Medical Center',
        contact: 'Dr. Patricia Davis',
        accountExecutive: 'Sarah Kim',
        integrationType: 'AI Population Health Analytics',
        integrationScopeDocUrl: 'https://docs.google.com/document/d/unity-medical',
        priority: 'High',
        stage: 'In Progress',
        tasks: [
          {
            id: '8-1',
            title: 'Security compliance review',
            assignedTo: 'Tom Anderson',
            team: 'Legal',
            status: 'In Progress',
            deadline: '2026-02-05',
            description: 'Complete HIPAA compliance documentation'
          },
          {
            id: '8-2',
            title: 'User training materials',
            assignedTo: 'Jennifer Lee',
            team: 'Operations',
            status: 'Not Started',
            deadline: '2026-02-15',
            description: 'Create training documentation and videos'
          }
        ],
        kickoffDate: '2026-01-18',
        createdAt: '2026-01-12T11:00:00Z',
        updatedAt: '2026-01-29T08:15:00Z',
        attioRecordId: 'unity-medical-008',
        attioAccountUrl: 'https://app.attio.com/companies/unity-medical-008'
      },
      {
        id: '9',
        account: 'Beacon Health Partners',
        contact: 'Mark Thompson',
        accountExecutive: 'John Smith',
        integrationType: 'AI Automation for DME',
        integrationScopeDocUrl: 'https://docs.google.com/document/d/beacon-health',
        priority: 'Medium',
        stage: 'In Progress',
        tasks: [
          {
            id: '9-1',
            title: 'Workflow configuration',
            assignedTo: 'Sarah Johnson',
            team: 'Operations',
            status: 'In Progress',
            deadline: '2026-02-12',
            description: 'Configure automated workflows'
          }
        ],
        kickoffDate: '2026-01-25',
        createdAt: '2026-01-20T09:00:00Z',
        updatedAt: '2026-01-28T14:30:00Z',
        attioRecordId: 'beacon-health-009',
        attioAccountUrl: 'https://app.attio.com/companies/beacon-health-009'
      },
      {
        id: '10',
        account: 'Riverside Clinic Group',
        contact: 'Dr. Nancy White',
        accountExecutive: 'Emily Chen',
        integrationType: 'AI Automated Prior Authorizations',
        integrationScopeDocUrl: 'https://docs.google.com/document/d/riverside-clinic',
        priority: 'Low',
        stage: 'In Progress',
        tasks: [
          {
            id: '10-1',
            title: 'Testing phase',
            assignedTo: 'Robert Lee',
            team: 'Product',
            status: 'In Progress',
            deadline: '2026-02-18',
            description: 'Complete end-to-end testing'
          }
        ],
        kickoffDate: '2026-01-15',
        createdAt: '2026-01-10T16:00:00Z',
        updatedAt: '2026-01-27T11:00:00Z',
        attioRecordId: 'riverside-clinic-010',
        attioAccountUrl: 'https://app.attio.com/companies/riverside-clinic-010'
      },
      {
        id: '11',
        account: 'Northside Medical',
        contact: 'Steven Garcia',
        accountExecutive: 'David Martinez',
        integrationType: 'Full Service DME RCM',
        integrationScopeDocUrl: 'https://docs.google.com/document/d/northside-medical',
        priority: 'High',
        stage: 'In Progress',
        tasks: [
          {
            id: '11-1',
            title: 'Integration testing',
            assignedTo: 'Lisa Wang',
            team: 'Product',
            status: 'In Progress',
            deadline: '2026-02-10',
            description: 'Run integration tests with production data'
          },
          {
            id: '11-2',
            title: 'Staff onboarding',
            assignedTo: 'Jennifer Lee',
            team: 'Operations',
            status: 'Not Started',
            deadline: '2026-02-20',
            description: 'Train client staff on new system'
          }
        ],
        kickoffDate: '2026-01-12',
        createdAt: '2026-01-08T10:00:00Z',
        updatedAt: '2026-01-29T09:00:00Z',
        attioRecordId: 'northside-medical-011',
        attioAccountUrl: 'https://app.attio.com/companies/northside-medical-011'
      },
      {
        id: '12',
        account: 'Central Valley Health',
        contact: 'Dr. William Brown',
        accountExecutive: 'Sarah Kim',
        integrationType: 'AI Population Health Analytics',
        integrationScopeDocUrl: 'https://docs.google.com/document/d/central-valley',
        priority: 'Medium',
        stage: 'In Progress',
        tasks: [
          {
            id: '12-1',
            title: 'Dashboard customization',
            assignedTo: 'Tom Anderson',
            team: 'Product',
            status: 'In Progress',
            deadline: '2026-02-14',
            description: 'Customize analytics dashboards for client needs'
          }
        ],
        kickoffDate: '2026-01-20',
        createdAt: '2026-01-15T14:00:00Z',
        updatedAt: '2026-01-28T16:00:00Z',
        attioRecordId: 'central-valley-012',
        attioAccountUrl: 'https://app.attio.com/companies/central-valley-012'
      },

      // === REVIEW - 4 items ===
      {
        id: '13',
        account: 'HealthFirst Solutions',
        contact: 'Jennifer Lee',
        accountExecutive: 'John Smith',
        integrationType: 'AI Population Health Analytics',
        integrationScopeDocUrl: 'https://docs.google.com/document/d/healthfirst',
        priority: 'High',
        stage: 'Review',
        tasks: [
          {
            id: '13-1',
            title: 'Final UAT',
            assignedTo: 'Lisa Wang',
            team: 'Operations',
            status: 'In Progress',
            deadline: '2026-02-01',
            description: 'Complete user acceptance testing'
          },
          {
            id: '13-2',
            title: 'Go-live checklist',
            assignedTo: 'Sarah Johnson',
            team: 'Operations',
            status: 'Not Started',
            deadline: '2026-02-05',
            description: 'Complete pre-launch checklist'
          }
        ],
        kickoffDate: '2026-01-05',
        createdAt: '2026-01-02T11:00:00Z',
        updatedAt: '2026-01-29T08:15:00Z',
        attioRecordId: 'healthfirst-013',
        attioAccountUrl: 'https://app.attio.com/companies/healthfirst-013'
      },
      {
        id: '14',
        account: 'Apex Medical Associates',
        contact: 'Dr. Richard Kim',
        accountExecutive: 'Emily Chen',
        integrationType: 'AI Automated Prior Authorizations',
        integrationScopeDocUrl: 'https://docs.google.com/document/d/apex-medical',
        priority: 'Medium',
        stage: 'Review',
        tasks: [
          {
            id: '14-1',
            title: 'Performance validation',
            assignedTo: 'Robert Lee',
            team: 'Product',
            status: 'In Progress',
            deadline: '2026-02-03',
            description: 'Validate system performance metrics'
          }
        ],
        kickoffDate: '2026-01-08',
        createdAt: '2026-01-05T09:00:00Z',
        updatedAt: '2026-01-28T14:30:00Z',
        attioRecordId: 'apex-medical-014',
        attioAccountUrl: 'https://app.attio.com/companies/apex-medical-014'
      },
      {
        id: '15',
        account: 'Heritage Healthcare',
        contact: 'Angela Roberts',
        accountExecutive: 'David Martinez',
        integrationType: 'Full Service DME RCM',
        integrationScopeDocUrl: 'https://docs.google.com/document/d/heritage-healthcare',
        priority: 'High',
        stage: 'Review',
        tasks: [
          {
            id: '15-1',
            title: 'Contract sign-off',
            assignedTo: 'Mike Davis',
            team: 'Legal',
            status: 'In Progress',
            deadline: '2026-02-02',
            description: 'Get final contract approval'
          }
        ],
        kickoffDate: '2026-01-03',
        createdAt: '2025-12-28T16:00:00Z',
        updatedAt: '2026-01-27T11:00:00Z',
        attioRecordId: 'heritage-healthcare-015',
        attioAccountUrl: 'https://app.attio.com/companies/heritage-healthcare-015'
      },
      {
        id: '16',
        account: 'Summit Health Group',
        contact: 'Dr. Christopher Taylor',
        accountExecutive: 'Sarah Kim',
        integrationType: 'AI Automation for DME',
        integrationScopeDocUrl: 'https://docs.google.com/document/d/summit-health',
        priority: 'Low',
        stage: 'Review',
        tasks: [
          {
            id: '16-1',
            title: 'Documentation review',
            assignedTo: 'Jennifer Lee',
            team: 'Operations',
            status: 'Completed',
            deadline: '2026-01-28',
            description: 'Review all integration documentation'
          }
        ],
        kickoffDate: '2026-01-10',
        createdAt: '2026-01-06T10:00:00Z',
        updatedAt: '2026-01-29T09:30:00Z',
        attioRecordId: 'summit-health-016',
        attioAccountUrl: 'https://app.attio.com/companies/summit-health-016'
      },

      // === COMPLETED - 4 items ===
      {
        id: '17',
        account: 'MediCare Plus',
        contact: 'Michael Johnson',
        accountExecutive: 'John Smith',
        integrationType: 'Full Service DME RCM',
        integrationScopeDocUrl: 'https://docs.google.com/document/d/medicare-plus',
        priority: 'High',
        stage: 'Completed',
        tasks: [
          {
            id: '17-1',
            title: 'Go-live support',
            assignedTo: 'Sarah Johnson',
            team: 'Operations',
            status: 'Completed',
            deadline: '2026-01-20',
            description: 'Provide go-live support'
          }
        ],
        kickoffDate: '2025-12-15',
        createdAt: '2025-12-10T14:00:00Z',
        updatedAt: '2026-01-22T16:45:00Z',
        attioRecordId: 'medicare-plus-017',
        attioAccountUrl: 'https://app.attio.com/companies/medicare-plus-017'
      },
      {
        id: '18',
        account: 'Wellness Medical Center',
        contact: 'Dr. Elizabeth Moore',
        accountExecutive: 'Emily Chen',
        integrationType: 'AI Automated Prior Authorizations',
        integrationScopeDocUrl: 'https://docs.google.com/document/d/wellness-medical',
        priority: 'Medium',
        stage: 'Completed',
        tasks: [
          {
            id: '18-1',
            title: 'Post-launch review',
            assignedTo: 'Lisa Wang',
            team: 'Operations',
            status: 'Completed',
            deadline: '2026-01-18',
            description: 'Complete post-launch review meeting'
          }
        ],
        kickoffDate: '2025-12-10',
        createdAt: '2025-12-05T11:00:00Z',
        updatedAt: '2026-01-20T08:15:00Z',
        attioRecordId: 'wellness-medical-018',
        attioAccountUrl: 'https://app.attio.com/companies/wellness-medical-018'
      },
      {
        id: '19',
        account: 'Pioneer Health Services',
        contact: 'David Wright',
        accountExecutive: 'David Martinez',
        integrationType: 'AI Population Health Analytics',
        integrationScopeDocUrl: 'https://docs.google.com/document/d/pioneer-health',
        priority: 'High',
        stage: 'Completed',
        tasks: [
          {
            id: '19-1',
            title: 'Success metrics review',
            assignedTo: 'Tom Anderson',
            team: 'Product',
            status: 'Completed',
            deadline: '2026-01-15',
            description: 'Review integration success metrics'
          }
        ],
        kickoffDate: '2025-12-01',
        createdAt: '2025-11-25T09:00:00Z',
        updatedAt: '2026-01-18T14:30:00Z',
        attioRecordId: 'pioneer-health-019',
        attioAccountUrl: 'https://app.attio.com/companies/pioneer-health-019'
      },
      {
        id: '20',
        account: 'Community Care Network',
        contact: 'Dr. Susan Clark',
        accountExecutive: 'Sarah Kim',
        integrationType: 'AI Automation for DME',
        integrationScopeDocUrl: 'https://docs.google.com/document/d/community-care',
        priority: 'Medium',
        stage: 'Completed',
        tasks: [
          {
            id: '20-1',
            title: 'Client satisfaction survey',
            assignedTo: 'Jennifer Lee',
            team: 'Operations',
            status: 'Completed',
            deadline: '2026-01-12',
            description: 'Send and collect satisfaction survey'
          }
        ],
        kickoffDate: '2025-11-20',
        createdAt: '2025-11-15T16:00:00Z',
        updatedAt: '2026-01-15T11:00:00Z',
        attioRecordId: 'community-care-020',
        attioAccountUrl: 'https://app.attio.com/companies/community-care-020'
      }
    ];

    integrations = demoIntegrations;
  }
};

// Initialize with demo data
storageService.seedDemoData();
