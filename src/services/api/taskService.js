import tasksData from "@/services/mockData/tasks.json";

class TaskService {
  constructor() {
    this.tasks = [...tasksData];
  }

  delay(ms = 300) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getAll() {
    await this.delay();
    return [...this.tasks];
  }

  async getById(id) {
    await this.delay();
    const task = this.tasks.find(t => t.Id === id);
    if (!task) {
      throw new Error("Task not found");
    }
    return { ...task };
  }

  async getByProject(projectId) {
    await this.delay();
    return this.tasks.filter(t => t.projectId === projectId).map(t => ({ ...t }));
  }

async create(taskData) {
    await this.delay();
    const newTask = {
      Id: Math.max(...this.tasks.map(t => t.Id), 0) + 1,
      ...taskData,
      parentTaskId: taskData.parentTaskId || null,
      createdAt: new Date().toISOString(),
      completedAt: null
    };
    this.tasks.push(newTask);
    return { ...newTask };
  }

async update(id, taskData) {
    await this.delay();
    const index = this.tasks.findIndex(t => t.Id === id);
    if (index === -1) {
      throw new Error("Task not found");
    }
    this.tasks[index] = { 
      ...this.tasks[index], 
      ...taskData,
      parentTaskId: taskData.parentTaskId !== undefined ? taskData.parentTaskId : this.tasks[index].parentTaskId
    };
    return { ...this.tasks[index] };
  }

  async getSubtasks(parentTaskId) {
    await this.delay();
    return this.tasks.filter(t => t.parentTaskId === parentTaskId).map(t => ({ ...t }));
  }

  async createSubtask(parentTaskId, taskData) {
    await this.delay();
    const parentTask = this.tasks.find(t => t.Id === parentTaskId);
    if (!parentTask) {
      throw new Error("Parent task not found");
    }
    
    const subtask = {
      Id: Math.max(...this.tasks.map(t => t.Id), 0) + 1,
      ...taskData,
      parentTaskId: parentTaskId,
      projectId: parentTask.projectId,
      createdAt: new Date().toISOString(),
      completedAt: null
    };
    
    this.tasks.push(subtask);
    return { ...subtask };
  }

  async getMainTasks() {
    await this.delay();
    return this.tasks.filter(t => !t.parentTaskId).map(t => ({ ...t }));
  }

  async delete(id) {
    await this.delay();
    const index = this.tasks.findIndex(t => t.Id === id);
    if (index === -1) {
      throw new Error("Task not found");
    }
    this.tasks.splice(index, 1);
    return true;
  }
}

export const taskService = new TaskService();