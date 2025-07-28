import projectsData from "@/services/mockData/projects.json";

class ProjectService {
  constructor() {
    this.projects = [...projectsData];
  }

  delay(ms = 300) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getAll() {
    await this.delay();
    return [...this.projects];
  }

  async getById(id) {
    await this.delay();
    const project = this.projects.find(p => p.Id === id);
    if (!project) {
      throw new Error("Project not found");
    }
    return { ...project };
  }

  async create(projectData) {
    await this.delay();
    const newProject = {
      Id: Math.max(...this.projects.map(p => p.Id), 0) + 1,
      ...projectData,
      createdAt: new Date().toISOString(),
      taskCount: 0
    };
    this.projects.unshift(newProject);
    return { ...newProject };
  }

  async update(id, projectData) {
    await this.delay();
    const index = this.projects.findIndex(p => p.Id === id);
    if (index === -1) {
      throw new Error("Project not found");
    }
    this.projects[index] = { ...this.projects[index], ...projectData };
    return { ...this.projects[index] };
  }

  async delete(id) {
    await this.delay();
    const index = this.projects.findIndex(p => p.Id === id);
    if (index === -1) {
      throw new Error("Project not found");
    }
    this.projects.splice(index, 1);
    return true;
  }
}

export const projectService = new ProjectService();