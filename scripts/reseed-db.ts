import { neon } from '@neondatabase/serverless';

const DATABASE_URL = process.env.DATABASE_URL!;

async function reseedDatabase() {
  const sql = neon(DATABASE_URL);

  console.log('Clearing existing data...');
  await sql`DELETE FROM tasks`;
  await sql`DELETE FROM integrations`;

  console.log('Seeding demo data...');

  // All 20 integrations matching the original demo data
  const demoIntegrations = [
    // === NEW INTEGRATIONS (Backlog) - 5 items ===
    { id: '1', account: 'Pacific Medical Group', contact: 'Dr. Amanda Chen', accountExecutive: 'John Smith', integrationType: 'AI Automated Prior Authorizations', integrationScopeDocUrl: 'https://docs.google.com/document/d/pacific-medical', attioAccountUrl: 'https://app.attio.com/companies/pacific-medical-001', priority: 'High', kickoffDate: '2026-02-10', stage: 'New Integrations' },
    { id: '2', account: 'Sunrise Health Network', contact: 'Michael Torres', accountExecutive: 'Emily Chen', integrationType: 'Full Service DME RCM', integrationScopeDocUrl: 'https://docs.google.com/document/d/sunrise-health', attioAccountUrl: 'https://app.attio.com/companies/sunrise-health-002', priority: 'High', kickoffDate: '2026-02-12', stage: 'New Integrations' },
    { id: '3', account: 'Valley Care Physicians', contact: 'Dr. Rebecca Martinez', accountExecutive: 'David Martinez', integrationType: 'AI Population Health Analytics', integrationScopeDocUrl: 'https://docs.google.com/document/d/valley-care', attioAccountUrl: 'https://app.attio.com/companies/valley-care-003', priority: 'Low', kickoffDate: '2026-02-15', stage: 'New Integrations' },
    { id: '4', account: 'Coastal Medical Associates', contact: 'James Wilson', accountExecutive: 'Sarah Kim', integrationType: 'AI Automation for DME', integrationScopeDocUrl: 'https://docs.google.com/document/d/coastal-medical', attioAccountUrl: 'https://app.attio.com/companies/coastal-medical-004', priority: 'Medium', kickoffDate: '2026-02-18', stage: 'New Integrations' },
    { id: '5', account: 'Mountain View Health', contact: 'Dr. Linda Park', accountExecutive: 'John Smith', integrationType: 'AI Automated Prior Authorizations', integrationScopeDocUrl: 'https://docs.google.com/document/d/mountain-view', attioAccountUrl: 'https://app.attio.com/companies/mountain-view-005', priority: 'High', kickoffDate: '2026-02-20', stage: 'New Integrations' },

    // === IN PROGRESS - 7 items ===
    { id: '6', account: 'Acme Healthcare', contact: 'Dr. Sarah Mitchell', accountExecutive: 'Emily Chen', integrationType: 'AI Automated Prior Authorizations', integrationScopeDocUrl: 'https://docs.google.com/document/d/acme-healthcare', attioAccountUrl: 'https://app.attio.com/companies/acme-healthcare-006', priority: 'High', kickoffDate: '2026-01-20', stage: 'In Progress' },
    { id: '7', account: 'Premier Health Systems', contact: 'Kevin O\'Brien', accountExecutive: 'David Martinez', integrationType: 'Full Service DME RCM', integrationScopeDocUrl: 'https://docs.google.com/document/d/premier-health', attioAccountUrl: 'https://app.attio.com/companies/premier-health-007', priority: 'Medium', kickoffDate: '2026-01-22', stage: 'In Progress' },
    { id: '8', account: 'Unity Medical Center', contact: 'Dr. Patricia Davis', accountExecutive: 'Sarah Kim', integrationType: 'AI Population Health Analytics', integrationScopeDocUrl: 'https://docs.google.com/document/d/unity-medical', attioAccountUrl: 'https://app.attio.com/companies/unity-medical-008', priority: 'High', kickoffDate: '2026-01-18', stage: 'In Progress' },
    { id: '9', account: 'Beacon Health Partners', contact: 'Mark Thompson', accountExecutive: 'John Smith', integrationType: 'AI Automation for DME', integrationScopeDocUrl: 'https://docs.google.com/document/d/beacon-health', attioAccountUrl: 'https://app.attio.com/companies/beacon-health-009', priority: 'High', kickoffDate: '2026-01-25', stage: 'In Progress' },
    { id: '10', account: 'Riverside Clinic Group', contact: 'Dr. Nancy White', accountExecutive: 'Emily Chen', integrationType: 'AI Automated Prior Authorizations', integrationScopeDocUrl: 'https://docs.google.com/document/d/riverside-clinic', attioAccountUrl: 'https://app.attio.com/companies/riverside-clinic-010', priority: 'Low', kickoffDate: '2026-01-15', stage: 'In Progress' },
    { id: '11', account: 'Northside Medical', contact: 'Steven Garcia', accountExecutive: 'David Martinez', integrationType: 'Full Service DME RCM', integrationScopeDocUrl: 'https://docs.google.com/document/d/northside-medical', attioAccountUrl: 'https://app.attio.com/companies/northside-medical-011', priority: 'High', kickoffDate: '2026-01-12', stage: 'In Progress' },
    { id: '12', account: 'Central Valley Health', contact: 'Dr. William Brown', accountExecutive: 'Sarah Kim', integrationType: 'AI Population Health Analytics', integrationScopeDocUrl: 'https://docs.google.com/document/d/central-valley', attioAccountUrl: 'https://app.attio.com/companies/central-valley-012', priority: 'Medium', kickoffDate: '2026-01-20', stage: 'In Progress' },

    // === REVIEW - 4 items ===
    { id: '13', account: 'HealthFirst Solutions', contact: 'Jennifer Lee', accountExecutive: 'John Smith', integrationType: 'AI Population Health Analytics', integrationScopeDocUrl: 'https://docs.google.com/document/d/healthfirst', attioAccountUrl: 'https://app.attio.com/companies/healthfirst-013', priority: 'High', kickoffDate: '2026-01-05', stage: 'Review' },
    { id: '14', account: 'Apex Medical Associates', contact: 'Dr. Richard Kim', accountExecutive: 'Emily Chen', integrationType: 'AI Automated Prior Authorizations', integrationScopeDocUrl: 'https://docs.google.com/document/d/apex-medical', attioAccountUrl: 'https://app.attio.com/companies/apex-medical-014', priority: 'High', kickoffDate: '2026-01-08', stage: 'Review' },
    { id: '15', account: 'Heritage Healthcare', contact: 'Angela Roberts', accountExecutive: 'David Martinez', integrationType: 'Full Service DME RCM', integrationScopeDocUrl: 'https://docs.google.com/document/d/heritage-healthcare', attioAccountUrl: 'https://app.attio.com/companies/heritage-healthcare-015', priority: 'High', kickoffDate: '2026-01-03', stage: 'Review' },
    { id: '16', account: 'Summit Health Group', contact: 'Dr. Christopher Taylor', accountExecutive: 'Sarah Kim', integrationType: 'AI Automation for DME', integrationScopeDocUrl: 'https://docs.google.com/document/d/summit-health', attioAccountUrl: 'https://app.attio.com/companies/summit-health-016', priority: 'Low', kickoffDate: '2026-01-10', stage: 'Review' },

    // === COMPLETED - 4 items ===
    { id: '17', account: 'MediCare Plus', contact: 'Michael Johnson', accountExecutive: 'John Smith', integrationType: 'Full Service DME RCM', integrationScopeDocUrl: 'https://docs.google.com/document/d/medicare-plus', attioAccountUrl: 'https://app.attio.com/companies/medicare-plus-017', priority: 'High', kickoffDate: '2025-12-15', stage: 'Completed' },
    { id: '18', account: 'Wellness Medical Center', contact: 'Dr. Elizabeth Moore', accountExecutive: 'Emily Chen', integrationType: 'AI Automated Prior Authorizations', integrationScopeDocUrl: 'https://docs.google.com/document/d/wellness-medical', attioAccountUrl: 'https://app.attio.com/companies/wellness-medical-018', priority: 'Medium', kickoffDate: '2025-12-10', stage: 'Completed' },
    { id: '19', account: 'Pioneer Health Services', contact: 'David Wright', accountExecutive: 'David Martinez', integrationType: 'AI Population Health Analytics', integrationScopeDocUrl: 'https://docs.google.com/document/d/pioneer-health', attioAccountUrl: 'https://app.attio.com/companies/pioneer-health-019', priority: 'High', kickoffDate: '2025-12-01', stage: 'Completed' },
    { id: '20', account: 'Community Care Network', contact: 'Dr. Susan Clark', accountExecutive: 'Sarah Kim', integrationType: 'AI Automation for DME', integrationScopeDocUrl: 'https://docs.google.com/document/d/community-care', attioAccountUrl: 'https://app.attio.com/companies/community-care-020', priority: 'Medium', kickoffDate: '2025-11-20', stage: 'Completed' },
  ];

  for (const int of demoIntegrations) {
    await sql`
      INSERT INTO integrations (id, account, contact, account_executive, integration_type, integration_scope_doc_url, attio_account_url, priority, kickoff_date, stage)
      VALUES (${int.id}, ${int.account}, ${int.contact}, ${int.accountExecutive}, ${int.integrationType}, ${int.integrationScopeDocUrl}, ${int.attioAccountUrl}, ${int.priority}, ${int.kickoffDate}, ${int.stage})
    `;
  }

  console.log('Integrations seeded!');

  // Tasks for Acme Healthcare (id: 6) - the detailed one
  const acmeTasks = [
    { id: '6-1', integrationId: '6', title: 'Discovery & Requirements Gathering', description: 'Conduct discovery sessions to understand current workflows, pain points, and integration requirements. Document technical specifications and success criteria.', status: 'Completed', assignedTo: 'Sarah', team: 'Operations', deadline: '2026-01-20' },
    { id: '6-2', integrationId: '6', title: 'Contract & Legal Review', description: 'Review and finalize MSA, BAA (HIPAA), data processing agreements, and SLAs. Ensure compliance with healthcare regulations.', status: 'Completed', assignedTo: 'Robert', team: 'Legal', deadline: '2026-01-25' },
    { id: '6-3', integrationId: '6', title: 'Technical Architecture & API Setup', description: 'Design integration architecture, provision API keys, configure webhooks, and establish secure data pipelines between Acme EHR and GenHealth.ai platform.', status: 'In Progress', assignedTo: 'Mike', team: 'Product', deadline: '2026-02-05' },
    { id: '6-4', integrationId: '6', title: 'Data Migration & Mapping', description: 'Map Acme data fields to GenHealth schema, validate data integrity, and perform test migrations. Handle PHI according to HIPAA guidelines.', status: 'In Progress', assignedTo: 'Luisa', team: 'Operations', deadline: '2026-02-10' },
    { id: '6-5', integrationId: '6', title: 'Custom Configuration & Workflows', description: 'Configure prior authorization rules, approval workflows, payer-specific requirements, and custom business logic based on Acme\'s operational needs.', status: 'Not Started', assignedTo: 'Mike', team: 'Product', deadline: '2026-02-15' },
    { id: '6-6', integrationId: '6', title: 'User Training & Enablement', description: 'Develop training materials, conduct live training sessions for clinical staff, and create self-service documentation. Train super-users for ongoing support.', status: 'Not Started', assignedTo: 'Lisa', team: 'Operations', deadline: '2026-02-20' },
    { id: '6-7', integrationId: '6', title: 'UAT & Go-Live Preparation', description: 'Execute user acceptance testing with Acme team, resolve any defects, validate end-to-end workflows, and prepare go-live checklist and rollback plan.', status: 'Not Started', assignedTo: 'Sarah', team: 'Operations', deadline: '2026-02-25' },
    { id: '6-8', integrationId: '6', title: 'Go-Live & Hypercare Support', description: 'Execute production go-live, provide dedicated hypercare support for first 2 weeks, monitor system performance, and conduct post-launch success review with stakeholders.', status: 'Not Started', assignedTo: 'Sarah', team: 'Sales', deadline: '2026-03-01' },
  ];

  for (const task of acmeTasks) {
    await sql`
      INSERT INTO tasks (id, integration_id, title, description, status, assigned_to, team, due_date)
      VALUES (${task.id}, ${task.integrationId}, ${task.title}, ${task.description}, ${task.status}, ${task.assignedTo}, ${task.team}, ${task.deadline})
    `;
  }

  // Tasks for other In Progress integrations (simple tasks)
  const inProgressTasks = [
    { integrationId: '7', tasks: [{ id: '7-1', title: 'Data migration planning', status: 'In Progress', assignedTo: 'Lisa', team: 'Operations' }] },
    { integrationId: '8', tasks: [
      { id: '8-1', title: 'Security compliance review', status: 'In Progress', assignedTo: 'Tom', team: 'Legal' },
      { id: '8-2', title: 'User training materials', status: 'Not Started', assignedTo: 'Lisa', team: 'Operations' }
    ]},
    { integrationId: '9', tasks: [{ id: '9-1', title: 'Workflow configuration', status: 'In Progress', assignedTo: 'Sarah', team: 'Operations' }] },
    { integrationId: '10', tasks: [{ id: '10-1', title: 'Testing phase', status: 'In Progress', assignedTo: 'Robert', team: 'Product' }] },
    { integrationId: '11', tasks: [
      { id: '11-1', title: 'Integration testing', status: 'In Progress', assignedTo: 'Lisa', team: 'Product' },
      { id: '11-2', title: 'Staff onboarding', status: 'Not Started', assignedTo: 'Lisa', team: 'Operations' }
    ]},
    { integrationId: '12', tasks: [{ id: '12-1', title: 'Dashboard customization', status: 'In Progress', assignedTo: 'Tom', team: 'Product' }] },
  ];

  for (const item of inProgressTasks) {
    for (const task of item.tasks) {
      await sql`
        INSERT INTO tasks (id, integration_id, title, status, assigned_to, team)
        VALUES (${task.id}, ${item.integrationId}, ${task.title}, ${task.status}, ${task.assignedTo}, ${task.team})
      `;
    }
  }

  // Tasks for Review integrations (all completed)
  const reviewTasks = [
    { integrationId: '13', tasks: [
      { id: '13-1', title: 'Final UAT', status: 'Completed', assignedTo: 'Lisa', team: 'Operations' },
      { id: '13-2', title: 'Go-live checklist', status: 'Completed', assignedTo: 'Sarah', team: 'Operations' }
    ]},
    { integrationId: '14', tasks: [{ id: '14-1', title: 'Performance validation', status: 'Completed', assignedTo: 'Robert', team: 'Product' }] },
    { integrationId: '15', tasks: [{ id: '15-1', title: 'Contract sign-off', status: 'Completed', assignedTo: 'Mike', team: 'Legal' }] },
    { integrationId: '16', tasks: [{ id: '16-1', title: 'Documentation review', status: 'Completed', assignedTo: 'Lisa', team: 'Operations' }] },
  ];

  for (const item of reviewTasks) {
    for (const task of item.tasks) {
      await sql`
        INSERT INTO tasks (id, integration_id, title, status, assigned_to, team)
        VALUES (${task.id}, ${item.integrationId}, ${task.title}, ${task.status}, ${task.assignedTo}, ${task.team})
      `;
    }
  }

  // Tasks for Completed integrations
  const completedTasks = [
    { integrationId: '17', tasks: [{ id: '17-1', title: 'Go-live support', status: 'Completed', assignedTo: 'Sarah', team: 'Operations' }] },
    { integrationId: '18', tasks: [{ id: '18-1', title: 'Post-launch review', status: 'Completed', assignedTo: 'Lisa', team: 'Operations' }] },
    { integrationId: '19', tasks: [{ id: '19-1', title: 'Success metrics review', status: 'Completed', assignedTo: 'Tom', team: 'Product' }] },
    { integrationId: '20', tasks: [{ id: '20-1', title: 'Client satisfaction survey', status: 'Completed', assignedTo: 'Lisa', team: 'Operations' }] },
  ];

  for (const item of completedTasks) {
    for (const task of item.tasks) {
      await sql`
        INSERT INTO tasks (id, integration_id, title, status, assigned_to, team)
        VALUES (${task.id}, ${item.integrationId}, ${task.title}, ${task.status}, ${task.assignedTo}, ${task.team})
      `;
    }
  }

  // Tasks for New Integrations (backlog)
  const backlogTasks = [
    { integrationId: '1', tasks: [{ id: '1-1', title: 'Initial kickoff call', status: 'Not Started', assignedTo: 'Sarah', team: 'Operations' }] },
    { integrationId: '2', tasks: [{ id: '2-1', title: 'Technical discovery', status: 'Not Started', assignedTo: 'Robert', team: 'Product' }] },
    { integrationId: '5', tasks: [{ id: '5-1', title: 'Contract finalization', status: 'Not Started', assignedTo: 'Mike', team: 'Legal' }] },
  ];

  for (const item of backlogTasks) {
    for (const task of item.tasks) {
      await sql`
        INSERT INTO tasks (id, integration_id, title, status, assigned_to, team)
        VALUES (${task.id}, ${item.integrationId}, ${task.title}, ${task.status}, ${task.assignedTo}, ${task.team})
      `;
    }
  }

  console.log('All tasks seeded!');
  console.log('Database reseeded successfully!');
}

reseedDatabase().catch(console.error);
