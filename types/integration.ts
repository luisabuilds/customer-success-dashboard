export type IntegrationType = 
  | 'AI Automated Prior Authorizations'
  | 'AI Automation for DME'
  | 'Full Service DME RCM'
  | 'AI Population Health Analytics';

export type Team = 'Sales' | 'Operations' | 'Legal' | 'Finance' | 'Product';

export type Priority = 'High' | 'Medium' | 'Low';

export type TaskStatus = 'Not Started' | 'In Progress' | 'Completed' | 'Blocked';

export type IntegrationStage = 'New Integrations' | 'In Progress' | 'Review' | 'Completed';

export interface Task {
  id: string;
  title: string;
  assignedTo: string;
  team: Team;
  status: TaskStatus;
  deadline: string;
  description?: string;
}

export interface CustomerIntegration {
  id: string;
  account: string;
  contact: string;
  accountExecutive: string;
  integrationType: IntegrationType;
  integrationScopeDocUrl: string;
  priority: Priority;
  tasks: Task[];
  kickoffDate: string;
  stage: IntegrationStage;
  createdAt: string;
  updatedAt: string;
  attioRecordId?: string;
  attioAccountUrl?: string;
}

export interface AttioContact {
  id: string;
  name: string;
  email: string;
}

export interface AttioDeal {
  id: string;
  name: string;
  stage: string;
  value: number;
  owner: AttioContact;
  associatedCompany?: string;
}
