import { neon } from '@neondatabase/serverless';
import { CustomerIntegration, Task } from '@/types/integration';

const sql = neon(process.env.DATABASE_URL!);

// Helper to convert DB row to CustomerIntegration
function rowToIntegration(row: Record<string, unknown>, tasks: Task[] = []): CustomerIntegration {
  return {
    id: row.id as string,
    account: row.account as string,
    contact: row.contact as string,
    accountExecutive: row.account_executive as string,
    integrationType: row.integration_type as CustomerIntegration['integrationType'],
    integrationScopeDocUrl: row.integration_scope_doc_url as string || '',
    attioAccountUrl: row.attio_account_url as string || '',
    priority: row.priority as CustomerIntegration['priority'],
    kickoffDate: row.kickoff_date as string,
    stage: row.stage as CustomerIntegration['stage'],
    tasks: tasks,
    createdAt: (row.created_at as Date)?.toISOString() || new Date().toISOString(),
    updatedAt: (row.updated_at as Date)?.toISOString() || new Date().toISOString(),
  };
}

function rowToTask(row: Record<string, unknown>): Task {
  return {
    id: row.id as string,
    title: row.title as string,
    description: row.description as string || '',
    status: row.status as Task['status'],
    assignedTo: row.assigned_to as string || '',
    team: row.team as Task['team'],
    deadline: row.due_date as string || '',
  };
}

export const storageService = {
  async getAllIntegrations(): Promise<CustomerIntegration[]> {
    const integrations = await sql`SELECT * FROM integrations ORDER BY
      CASE priority
        WHEN 'Highest' THEN 1
        WHEN 'High' THEN 2
        WHEN 'Medium' THEN 3
        WHEN 'Low' THEN 4
      END, created_at DESC`;
    const tasks = await sql`SELECT * FROM tasks`;

    const tasksByIntegration: Record<string, Task[]> = {};
    for (const task of tasks) {
      const intId = task.integration_id as string;
      if (!tasksByIntegration[intId]) {
        tasksByIntegration[intId] = [];
      }
      tasksByIntegration[intId].push(rowToTask(task));
    }

    return integrations.map(row => rowToIntegration(row, tasksByIntegration[row.id as string] || []));
  },

  async getIntegrationById(id: string): Promise<CustomerIntegration | null> {
    const integrations = await sql`SELECT * FROM integrations WHERE id = ${id}`;
    if (integrations.length === 0) return null;

    const tasks = await sql`SELECT * FROM tasks WHERE integration_id = ${id}`;
    return rowToIntegration(integrations[0], tasks.map(rowToTask));
  },

  async createIntegration(integration: CustomerIntegration): Promise<CustomerIntegration> {
    const id = `int_${Date.now()}`;

    await sql`
      INSERT INTO integrations (id, account, contact, account_executive, integration_type, integration_scope_doc_url, attio_account_url, priority, kickoff_date, stage)
      VALUES (${id}, ${integration.account}, ${integration.contact}, ${integration.accountExecutive}, ${integration.integrationType}, ${integration.integrationScopeDocUrl || ''}, ${integration.attioAccountUrl || ''}, ${integration.priority}, ${integration.kickoffDate}, ${integration.stage})
    `;

    return { ...integration, id, tasks: [], createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
  },

  async updateIntegration(id: string, updates: Partial<CustomerIntegration>): Promise<CustomerIntegration | null> {
    const existing = await this.getIntegrationById(id);
    if (!existing) return null;

    // Handle tasks separately
    if (updates.tasks) {
      // Delete existing tasks
      await sql`DELETE FROM tasks WHERE integration_id = ${id}`;

      // Insert new tasks
      for (const task of updates.tasks) {
        const taskId = task.id || `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        await sql`
          INSERT INTO tasks (id, integration_id, title, description, status, assigned_to, team, due_date)
          VALUES (${taskId}, ${id}, ${task.title}, ${task.description || ''}, ${task.status}, ${task.assignedTo || ''}, ${task.team}, ${task.deadline || ''})
        `;
      }
    }

    // Update integration fields
    const updatedIntegration = { ...existing, ...updates, updatedAt: new Date().toISOString() };

    await sql`
      UPDATE integrations SET
        account = ${updatedIntegration.account},
        contact = ${updatedIntegration.contact},
        account_executive = ${updatedIntegration.accountExecutive},
        integration_type = ${updatedIntegration.integrationType},
        integration_scope_doc_url = ${updatedIntegration.integrationScopeDocUrl || ''},
        attio_account_url = ${updatedIntegration.attioAccountUrl || ''},
        priority = ${updatedIntegration.priority},
        kickoff_date = ${updatedIntegration.kickoffDate},
        stage = ${updatedIntegration.stage},
        updated_at = NOW()
      WHERE id = ${id}
    `;

    return this.getIntegrationById(id);
  },

  async deleteIntegration(id: string): Promise<boolean> {
    const existing = await this.getIntegrationById(id);
    if (!existing) return false;

    await sql`DELETE FROM integrations WHERE id = ${id}`;
    return true;
  }
};
