import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import KanbanBoard from "@/components/organisms/KanbanBoard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { projectService } from "@/services/api/projectService";

const ProjectPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [taskCount, setTaskCount] = useState(0);

  useEffect(() => {
    loadProject();
  }, [id]);

  const loadProject = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await projectService.getById(parseInt(id));
      setProject(data);
      setTaskCount(data.taskCount || 0);
    } catch (err) {
      setError("Failed to load project");
    } finally {
      setLoading(false);
    }
  };

  const handleTaskCountChange = async (newCount) => {
    setTaskCount(newCount);
    try {
      await projectService.update(parseInt(id), {
        ...project,
        taskCount: newCount
      });
    } catch (err) {
      console.error("Failed to update task count:", err);
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadProject} />;
  if (!project) return <Error message="Project not found" />;

  return (
    <div className="h-full flex flex-col">
      {/* Project Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
              className="hover:bg-gray-100"
            >
              <ApperIcon name="ArrowLeft" className="w-5 h-5" />
            </Button>
            <div className="flex items-center space-x-3">
              <div 
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: project.color }}
              />
              <div>
                <h1 className="text-2xl font-display font-bold text-gray-900">
                  {project.name}
                </h1>
                <p className="text-sm text-gray-600">
                  {taskCount} {taskCount === 1 ? "task" : "tasks"}
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <ApperIcon name="MoreHorizontal" className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 p-6 overflow-hidden">
        <KanbanBoard 
          projectId={parseInt(id)} 
          onTaskCountChange={handleTaskCountChange}
        />
      </div>
    </div>
  );
};

export default ProjectPage;