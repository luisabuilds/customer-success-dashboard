-- Integrations table
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
);

-- Tasks table
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
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_integrations_stage ON integrations(stage);
CREATE INDEX IF NOT EXISTS idx_tasks_integration_id ON tasks(integration_id);
