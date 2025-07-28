import React, { useState } from "react";
import { motion } from "framer-motion";
import { format, isPast, isToday, isTomorrow } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Card from "@/components/atoms/Card";

const TaskCard = ({ 
  task, 
  onEdit, 
  onDelete,
  onCreateSubtask,
  subtasks = [],
  isDragging = false,
  dragHandleProps,
  ...props 
}) => {
  const [showSubtasks, setShowSubtasks] = useState(false);
  const formatDueDate = (date) => {
    if (!date) return null;
    const taskDate = new Date(date);
    if (isToday(taskDate)) return "Today";
    if (isTomorrow(taskDate)) return "Tomorrow";
    return format(taskDate, "MMM dd");
  };

  const getDueDateColor = (date) => {
    if (!date) return "text-gray-500";
    const taskDate = new Date(date);
    if (isPast(taskDate) && !isToday(taskDate)) return "text-red-500";
    if (isToday(taskDate)) return "text-amber-600";
    return "text-gray-500";
  };

  const priorityVariants = {
    high: "high",
    medium: "medium", 
    low: "low"
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={!isDragging ? { y: -2, scale: 1.02 } : {}}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={isDragging ? "drag-ghost" : ""}
      {...props}
    >
      <Card 
        className="p-4 group hover:shadow-md transition-all duration-200 cursor-grab active:cursor-grabbing"
        {...dragHandleProps}
      >
        <div className="flex items-start justify-between mb-3">
          <h4 className="font-medium text-gray-900 text-sm line-clamp-2 flex-1 pr-2">
            {task.title}
          </h4>
          <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
{subtasks.length > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowSubtasks(!showSubtasks);
                }}
                className="p-1 hover:bg-gray-100 rounded flex items-center gap-1"
              >
                <ApperIcon 
                  name={showSubtasks ? "ChevronDown" : "ChevronRight"} 
                  className="w-3 h-3 text-gray-400" 
                />
                <span className="text-xs text-gray-500">{subtasks.length}</span>
              </button>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onCreateSubtask(task);
              }}
              className="p-1 hover:bg-gray-100 rounded"
              title="Add subtask"
            >
              <ApperIcon name="Plus" className="w-3 h-3 text-gray-400" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(task);
              }}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <ApperIcon name="Edit2" className="w-3 h-3 text-gray-400" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(task.Id);
              }}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <ApperIcon name="Trash2" className="w-3 h-3 text-gray-400" />
            </button>
          </div>
        </div>
        
        {showSubtasks && subtasks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 space-y-2 pl-4 border-l-2 border-gray-100"
          >
            {subtasks.map((subtask) => (
              <div
                key={subtask.Id}
                className="flex items-center justify-between p-2 bg-gray-50 rounded text-sm"
              >
                <div className="flex-1">
                  <div className="font-medium text-gray-700">{subtask.title}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant={priorityVariants[subtask.priority]}>
                      {subtask.priority}
                    </Badge>
                    <span className="text-xs text-gray-500 capitalize">
                      {subtask.status.replace('inprogress', 'in progress')}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(subtask);
                    }}
                    className="p-1 hover:bg-gray-200 rounded"
                  >
                    <ApperIcon name="Edit2" className="w-3 h-3 text-gray-400" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(subtask.Id);
                    }}
                    className="p-1 hover:bg-gray-200 rounded"
                  >
                    <ApperIcon name="Trash2" className="w-3 h-3 text-gray-400" />
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {task.description && (
          <p className="text-xs text-gray-600 mb-3 line-clamp-2">
            {task.description}
          </p>
        )}

        <div className="flex items-center justify-between">
          <Badge variant={priorityVariants[task.priority]} size="sm">
            {task.priority}
          </Badge>
          
          {task.dueDate && (
            <div className="flex items-center space-x-1">
              <ApperIcon name="Calendar" className="w-3 h-3 text-gray-400" />
              <span className={`text-xs ${getDueDateColor(task.dueDate)}`}>
                {formatDueDate(task.dueDate)}
              </span>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};

export default TaskCard;