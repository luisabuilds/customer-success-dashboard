import { neon } from '@neondatabase/serverless';

const DATABASE_URL = process.env.DATABASE_URL!;

async function setupDatabase() {
  const sql = neon(DATABASE_URL);

  console.log('Creating tables...');

  // Create integrations table
  await sql`
    CREATE TABLE IF NOT EXISTS integrations (
      id TEXT PRIMARY KEY,
      account TEXT NOT NULL,
      contact TEXT NOT NULL,
      account_executive TEXT NOT NULL,
      integration_type TEXT NOT NULL,
      integration_scope_doc_url TEXT,
      attio_account_url TEXT,
      priority TEXT NOT NULL DEFAULT 'Medium',
      kickoff_date TEXT NOT NULL,
      stage TEXT NOT NULL DEFAULT 'New Integrations',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `;

  // Create tasks table
  await sql`
    CREATE TABLE IF NOT EXISTS tasks (
      id TEXT PRIMARY KEY,
      integration_id TEXT NOT NULL REFERENCES integrations(id) ON DELETE CASCADE,
      title TEXT NOT NULL,
      description TEXT,
      status TEXT NOT NULL DEFAULT 'Not Started',
      assigned_to TEXT,
      team TEXT NOT NULL DEFAULT 'Operations',
      due_date TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    )
  `;

  // Create indexes
  await sql`CREATE INDEX IF NOT EXISTS idx_integrations_stage ON integrations(stage)`;
  await sql`CREATE INDEX IF NOT EXISTS idx_tasks_integration_id ON tasks(integration_id)`;

  console.log('Tables created successfully!');

  // Seed demo data
  console.log('Seeding demo data...');

  const demoIntegrations = [
    { id: 'int_1', account: 'Acme Healthcare', contact: 'John Smith', accountExecutive: 'Sarah Johnson', integrationType: 'AI Automated Prior Authorizations', priority: 'High', kickoffDate: '2025-01-15', stage: 'In Progress' },
    { id: 'int_2', account: 'MedTech Solutions', contact: 'Emily Chen', accountExecutive: 'Mike Williams', integrationType: 'AI Automation for DME', priority: 'Medium', kickoffDate: '2025-01-20', stage: 'New Integrations' },
    { id: 'int_3', account: 'Pacific Health Group', contact: 'David Lee', accountExecutive: 'Sarah Johnson', integrationType: 'Full Service DME RCM', priority: 'High', kickoffDate: '2025-01-10', stage: 'In Progress' },
    { id: 'int_4', account: 'Sunrise Medical Center', contact: 'Maria Garcia', accountExecutive: 'Lisa Brown', integrationType: 'AI Population Health Analytics', priority: 'Low', kickoffDate: '2025-02-01', stage: 'New Integrations' },
    { id: 'int_5', account: 'Valley Health Systems', contact: 'Robert Taylor', accountExecutive: 'Mike Williams', integrationType: 'AI Automated Prior Authorizations', priority: 'High', kickoffDate: '2025-01-05', stage: 'Review' },
    { id: 'int_6', account: 'Northwest Care', contact: 'Jennifer White', accountExecutive: 'Sarah Johnson', integrationType: 'AI Automation for DME', priority: 'Medium', kickoffDate: '2025-01-25', stage: 'In Progress' },
    { id: 'int_7', account: 'Summit Health Partners', contact: 'Michael Brown', accountExecutive: 'Lisa Brown', integrationType: 'Full Service DME RCM', priority: 'High', kickoffDate: '2024-12-15', stage: 'Completed' },
    { id: 'int_8', account: 'Coastal Medical Group', contact: 'Amanda Wilson', accountExecutive: 'Mike Williams', integrationType: 'AI Population Health Analytics', priority: 'Medium', kickoffDate: '2025-01-18', stage: 'In Progress' },
    { id: 'int_9', account: 'Metro Health Network', contact: 'Christopher Davis', accountExecutive: 'Sarah Johnson', integrationType: 'AI Automated Prior Authorizations', priority: 'Low', kickoffDate: '2025-02-10', stage: 'New Integrations' },
    { id: 'int_10', account: 'Premier Healthcare', contact: 'Jessica Martinez', accountExecutive: 'Lisa Brown', integrationType: 'AI Automation for DME', priority: 'High', kickoffDate: '2025-01-08', stage: 'Review' },
    { id: 'int_11', account: 'United Medical Associates', contact: 'Daniel Anderson', accountExecutive: 'Mike Williams', integrationType: 'Full Service DME RCM', priority: 'Medium', kickoffDate: '2025-01-22', stage: 'In Progress' },
    { id: 'int_12', account: 'Harmony Health', contact: 'Stephanie Thomas', accountExecutive: 'Sarah Johnson', integrationType: 'AI Population Health Analytics', priority: 'High', kickoffDate: '2024-12-20', stage: 'Completed' },
    { id: 'int_13', account: 'Riverside Medical', contact: 'Kevin Jackson', accountExecutive: 'Lisa Brown', integrationType: 'AI Automated Prior Authorizations', priority: 'Medium', kickoffDate: '2025-01-12', stage: 'In Progress' },
    { id: 'int_14', account: 'Golden State Health', contact: 'Nicole Harris', accountExecutive: 'Mike Williams', integrationType: 'AI Automation for DME', priority: 'Low', kickoffDate: '2025-02-05', stage: 'New Integrations' },
    { id: 'int_15', account: 'Pinnacle Care', contact: 'Brandon Clark', accountExecutive: 'Sarah Johnson', integrationType: 'Full Service DME RCM', priority: 'High', kickoffDate: '2025-01-03', stage: 'Review' },
    { id: 'int_16', account: 'Evergreen Health', contact: 'Ashley Lewis', accountExecutive: 'Lisa Brown', integrationType: 'AI Population Health Analytics', priority: 'Medium', kickoffDate: '2025-01-28', stage: 'In Progress' },
    { id: 'int_17', account: 'Central Valley Medical', contact: 'Ryan Robinson', accountExecutive: 'Mike Williams', integrationType: 'AI Automated Prior Authorizations', priority: 'High', kickoffDate: '2024-12-10', stage: 'Completed' },
    { id: 'int_18', account: 'Lakeside Health Partners', contact: 'Lauren Walker', accountExecutive: 'Sarah Johnson', integrationType: 'AI Automation for DME', priority: 'Low', kickoffDate: '2025-02-15', stage: 'New Integrations' },
    { id: 'int_19', account: 'Mountain View Care', contact: 'Justin Hall', accountExecutive: 'Lisa Brown', integrationType: 'Full Service DME RCM', priority: 'Medium', kickoffDate: '2025-01-06', stage: 'Review' },
    { id: 'int_20', account: 'Bayshore Medical', contact: 'Megan Young', accountExecutive: 'Mike Williams', integrationType: 'AI Population Health Analytics', priority: 'High', kickoffDate: '2024-12-28', stage: 'Completed' },
  ];

  for (const int of demoIntegrations) {
    await sql`
      INSERT INTO integrations (id, account, contact, account_executive, integration_type, priority, kickoff_date, stage)
      VALUES (${int.id}, ${int.account}, ${int.contact}, ${int.accountExecutive}, ${int.integrationType}, ${int.priority}, ${int.kickoffDate}, ${int.stage})
      ON CONFLICT (id) DO NOTHING
    `;
  }

  // Add tasks for Acme Healthcare (int_1)
  const acmeTasks = [
    { id: 'task_1_1', integrationId: 'int_1', title: 'Discovery & Requirements Gathering', description: 'Initial discovery call and requirements documentation', status: 'Completed', assignedTo: 'Sarah', team: 'Operations' },
    { id: 'task_1_2', integrationId: 'int_1', title: 'Contract & Legal Review', description: 'Review and finalize contracts with legal team', status: 'Completed', assignedTo: 'Robert', team: 'Legal' },
    { id: 'task_1_3', integrationId: 'int_1', title: 'Technical Architecture & API Setup', description: 'Set up API connections and technical architecture', status: 'In Progress', assignedTo: 'Mike', team: 'Product' },
    { id: 'task_1_4', integrationId: 'int_1', title: 'Data Migration & Mapping', description: 'Map and migrate existing data', status: 'In Progress', assignedTo: 'Luisa', team: 'Operations' },
    { id: 'task_1_5', integrationId: 'int_1', title: 'Custom Configuration & Workflows', description: 'Configure custom workflows', status: 'Not Started', assignedTo: 'Mike', team: 'Product' },
    { id: 'task_1_6', integrationId: 'int_1', title: 'User Training & Enablement', description: 'Train end users on the platform', status: 'Not Started', assignedTo: 'Lisa', team: 'Operations' },
    { id: 'task_1_7', integrationId: 'int_1', title: 'UAT & Go-Live Preparation', description: 'User acceptance testing and go-live prep', status: 'Not Started', assignedTo: 'Sarah', team: 'Operations' },
    { id: 'task_1_8', integrationId: 'int_1', title: 'Go-Live & Hypercare Support', description: 'Launch and provide hypercare support', status: 'Not Started', assignedTo: 'Sarah', team: 'Sales' },
  ];

  for (const task of acmeTasks) {
    await sql`
      INSERT INTO tasks (id, integration_id, title, description, status, assigned_to, team)
      VALUES (${task.id}, ${task.integrationId}, ${task.title}, ${task.description}, ${task.status}, ${task.assignedTo}, ${task.team})
      ON CONFLICT (id) DO NOTHING
    `;
  }

  // Add completed tasks for Review stage integrations
  const reviewIntegrations = ['int_5', 'int_10', 'int_15', 'int_19'];
  for (const intId of reviewIntegrations) {
    const reviewTasks = [
      { id: `task_${intId}_1`, title: 'Discovery & Requirements', status: 'Completed', team: 'Operations' },
      { id: `task_${intId}_2`, title: 'Technical Setup', status: 'Completed', team: 'Product' },
      { id: `task_${intId}_3`, title: 'Data Migration', status: 'Completed', team: 'Operations' },
      { id: `task_${intId}_4`, title: 'User Training', status: 'Completed', team: 'Operations' },
    ];
    for (const task of reviewTasks) {
      await sql`
        INSERT INTO tasks (id, integration_id, title, status, team)
        VALUES (${task.id}, ${intId}, ${task.title}, ${task.status}, ${task.team})
        ON CONFLICT (id) DO NOTHING
      `;
    }
  }

  console.log('Demo data seeded successfully!');
}

setupDatabase().catch(console.error);
