'use client';

import { CustomerIntegration, Task, Team, TaskStatus, Priority } from '@/types/integration';
import { X, Calendar, User, ExternalLink, Plus, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { useState } from 'react';

interface IntegrationModalProps {
  integration: CustomerIntegration;
  onClose: () => void;
  onUpdate: (updates: Partial<CustomerIntegration>) => void;
}

const statusColors: Record<TaskStatus, string> = {
  'Not Started': 'bg-gray-100 text-gray-800',
  'In Progress': 'bg-blue-100 text-blue-800',
  'Completed': 'bg-green-100 text-green-800',
  'Blocked': 'bg-red-100 text-red-800',
};

const teamColors: Record<Team, string> = {
  'Sales': 'bg-purple-100 text-purple-800',
  'Operations': 'bg-blue-100 text-blue-800',
  'Legal': 'bg-yellow-100 text-yellow-800',
  'Finance': 'bg-green-100 text-green-800',
  'Product': 'bg-indigo-100 text-indigo-800',
};

export function IntegrationModal({ integration, onClose, onUpdate }: IntegrationModalProps) {
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: '',
    assignedTo: '',
    team: 'Operations',
    status: 'Not Started',
    deadline: '',
    description: ''
  });

  const handleAddTask = () => {
    if (newTask.title && newTask.assignedTo && newTask.deadline) {
      const task: Task = {
        id: `${integration.id}-${Date.now()}`,
        title: newTask.title,
        assignedTo: newTask.assignedTo,
        team: newTask.team as Team,
        status: newTask.status as TaskStatus,
        deadline: newTask.deadline,
        description: newTask.description
      };

      onUpdate({
        tasks: [...integration.tasks, task]
      });

      setNewTask({
        title: '',
        assignedTo: '',
        team: 'Operations',
        status: 'Not Started',
        deadline: '',
        description: ''
      });
      setIsAddingTask(false);
    }
  };

  const handleUpdateTaskStatus = (taskId: string, newStatus: TaskStatus) => {
    const updatedTasks = integration.tasks.map(task =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    onUpdate({ tasks: updatedTasks });
  };

  const handleDeleteTask = (taskId: string) => {
    const updatedTasks = integration.tasks.filter(task => task.id !== taskId);
    onUpdate({ tasks: updatedTasks });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {integration.account}
            </h2>
            <p className="text-gray-600">{integration.integrationType}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Account Details */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Account Details</h3>
              {integration.attioAccountUrl && (
                <a
                  href={integration.attioAccountUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-purple-600 text-white px-3 py-1.5 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                >
                  <span>View in Attio</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Contact</label>
                <p className="text-gray-900">{integration.contact}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Account Executive</label>
                <p className="text-gray-900">{integration.accountExecutive}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Priority</label>
                <select
                  value={integration.priority}
                  onChange={(e) => onUpdate({ priority: e.target.value as Priority })}
                  className="mt-1 block px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Highest">Highest</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Kickoff Date</label>
                <p className="text-gray-900">
                  {format(new Date(integration.kickoffDate), 'MMMM dd, yyyy')}
                </p>
              </div>
              <div className="col-span-2">
                <label className="text-sm font-medium text-gray-700">Integration Scope</label>
                {integration.integrationScopeDocUrl ? (
                  <a
                    href={integration.integrationScopeDocUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Document
                  </a>
                ) : (
                  <p className="text-gray-500">No document linked</p>
                )}
              </div>
            </div>
          </div>

          {/* Tasks Section */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Tasks</h3>
              <button
                onClick={() => setIsAddingTask(!isAddingTask)}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Task
              </button>
            </div>

            {isAddingTask && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <h4 className="font-medium mb-3">New Task</h4>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Task title"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <select
                      value={newTask.assignedTo}
                      onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
                      className="px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="">Select assignee</option>
                      <option value="Sarah">Sarah</option>
                      <option value="Luisa">Luisa</option>
                      <option value="Robert">Robert</option>
                      <option value="Lisa">Lisa</option>
                      <option value="Mike">Mike</option>
                    </select>
                    <select
                      value={newTask.team}
                      onChange={(e) => setNewTask({ ...newTask, team: e.target.value as Team })}
                      className="px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="Sales">Sales</option>
                      <option value="Operations">Operations</option>
                      <option value="Legal">Legal</option>
                      <option value="Finance">Finance</option>
                      <option value="Product">Product</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="date"
                      value={newTask.deadline}
                      onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
                      className="px-3 py-2 border border-gray-300 rounded-lg"
                    />
                    <select
                      value={newTask.status}
                      onChange={(e) => setNewTask({ ...newTask, status: e.target.value as TaskStatus })}
                      className="px-3 py-2 border border-gray-300 rounded-lg"
                    >
                      <option value="Not Started">Not Started</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Blocked">Blocked</option>
                    </select>
                  </div>
                  <textarea
                    placeholder="Description (optional)"
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    rows={3}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleAddTask}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                      Save Task
                    </button>
                    <button
                      onClick={() => setIsAddingTask(false)}
                      className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-3">
              {integration.tasks.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No tasks yet. Add your first task!</p>
              ) : (
                integration.tasks.map((task) => (
                  <div key={task.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-900">{task.title}</h4>
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    
                    {task.description && (
                      <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                    )}

                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[task.status]}`}>
                        {task.status}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${teamColors[task.team]}`}>
                        {task.team}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          <span>{task.assignedTo}</span>
                        </div>
                        {task.deadline && (
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{format(new Date(task.deadline), 'MMM dd, yyyy')}</span>
                          </div>
                        )}
                      </div>
                      
                      <select
                        value={task.status}
                        onChange={(e) => handleUpdateTaskStatus(task.id, e.target.value as TaskStatus)}
                        className="px-2 py-1 border border-gray-300 rounded text-xs"
                      >
                        <option value="Not Started">Not Started</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Blocked">Blocked</option>
                      </select>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
