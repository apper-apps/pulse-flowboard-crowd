import React from "react";
import { motion } from "framer-motion";
import { format, isToday, isTomorrow, isPast } from "date-fns";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";

const TaskCard = ({ 
  task, 
  onEdit, 
  onDelete, 
  isDragging = false,
  dragHandleProps,
  ...props 
}) => {
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