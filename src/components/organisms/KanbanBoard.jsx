import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import TaskCard from "@/components/molecules/TaskCard";
import TaskModal from "@/components/molecules/TaskModal";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { taskService } from "@/services/api/taskService";

const COLUMNS = [
  { id: "todo", title: "To Do", color: "bg-gradient-to-br from-gray-100 to-gray-200" },
  { id: "inprogress", title: "In Progress", color: "bg-gradient-to-br from-blue-100 to-blue-200" },
  { id: "done", title: "Done", color: "bg-gradient-to-br from-green-100 to-green-200" }
];

const KanbanBoard = ({ projectId, onTaskCountChange }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [draggedTask, setDraggedTask] = useState(null);
  const [dragOverColumn, setDragOverColumn] = useState(null);

  useEffect(() => {
    loadTasks();
  }, [projectId]);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await taskService.getByProject(projectId);
      setTasks(data);
      if (onTaskCountChange) {
        onTaskCountChange(data.length);
      }
    } catch (err) {
      setError("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveTask = async (taskData) => {
    try {
      if (editingTask) {
        const updatedTask = await taskService.update(editingTask.Id, taskData);
        setTasks(prev => prev.map(task => 
          task.Id === editingTask.Id ? updatedTask : task
        ));
      } else {
        const newTask = await taskService.create(taskData);
        setTasks(prev => [...prev, newTask]);
      }
      setIsTaskModalOpen(false);
      setEditingTask(null);
      if (onTaskCountChange) {
        onTaskCountChange(editingTask ? tasks.length : tasks.length + 1);
      }
    } catch (err) {
      throw new Error("Failed to save task");
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await taskService.delete(taskId);
      setTasks(prev => prev.filter(task => task.Id !== taskId));
      toast.success("Task deleted successfully!");
      if (onTaskCountChange) {
        onTaskCountChange(tasks.length - 1);
      }
    } catch (err) {
      toast.error("Failed to delete task");
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsTaskModalOpen(true);
  };

  const handleDragStart = (e, task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e, columnId) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverColumn(columnId);
  };

  const handleDragLeave = () => {
    setDragOverColumn(null);
  };

  const handleDrop = async (e, columnId) => {
    e.preventDefault();
    setDragOverColumn(null);
    
    if (!draggedTask || draggedTask.status === columnId) {
      setDraggedTask(null);
      return;
    }

    try {
      const updatedTask = await taskService.update(draggedTask.Id, {
        ...draggedTask,
        status: columnId,
        completedAt: columnId === "done" ? new Date().toISOString() : null
      });
      
      setTasks(prev => prev.map(task => 
        task.Id === draggedTask.Id ? updatedTask : task
      ));
      
      toast.success(`Task moved to ${COLUMNS.find(col => col.id === columnId)?.title}`);
    } catch (err) {
      toast.error("Failed to move task");
    } finally {
      setDraggedTask(null);
    }
  };

  const getTasksByColumn = (columnId) => {
    return tasks.filter(task => task.status === columnId);
  };

  if (loading) return <Loading type="kanban" />;
  if (error) return <Error message={error} onRetry={loadTasks} />;

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-display font-bold text-gray-900">Task Board</h2>
        <Button
          onClick={() => {
            setEditingTask(null);
            setIsTaskModalOpen(true);
          }}
          className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white"
        >
          <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
          Add Task
        </Button>
      </div>

      <div className="flex-1 flex gap-6 overflow-x-auto pb-6">
        {COLUMNS.map((column) => {
          const columnTasks = getTasksByColumn(column.id);
          
          return (
            <div key={column.id} className="flex-1 min-w-[320px]">
              <div 
                className={`bg-white rounded-lg p-4 h-full ${
                  dragOverColumn === column.id ? "drop-zone" : ""
                }`}
                onDragOver={(e) => handleDragOver(e, column.id)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, column.id)}
              >
                <div className={`${column.color} rounded-lg p-3 mb-4`}>
                  <div className="flex items-center justify-between">
                    <h3 className="font-display font-semibold text-gray-900">
                      {column.title}
                    </h3>
                    <span className="text-sm text-gray-600 bg-white/60 px-2 py-1 rounded-full">
                      {columnTasks.length}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto">
                  <AnimatePresence>
                    {columnTasks.length === 0 ? (
                      <div className="text-center py-8">
                        <ApperIcon name="Inbox" className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-sm text-gray-500">
                          {column.id === "todo" ? "No tasks yet" : `No ${column.title.toLowerCase()} tasks`}
                        </p>
                      </div>
                    ) : (
                      columnTasks.map((task) => (
                        <TaskCard
                          key={task.Id}
                          task={task}
                          onEdit={handleEditTask}
                          onDelete={handleDeleteTask}
                          isDragging={draggedTask?.Id === task.Id}
                          dragHandleProps={{
                            draggable: true,
                            onDragStart: (e) => handleDragStart(e, task)
                          }}
                        />
                      ))
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => {
          setIsTaskModalOpen(false);
          setEditingTask(null);
        }}
        onSave={handleSaveTask}
        task={editingTask}
        projectId={projectId}
      />
    </div>
  );
};

export default KanbanBoard;