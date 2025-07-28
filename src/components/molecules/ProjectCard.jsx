import React from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";
import Badge from "@/components/atoms/Badge";
import { format } from "date-fns";

const ProjectCard = ({ project, onClick }) => {
  const getProgressColor = (taskCount) => {
    if (taskCount === 0) return "bg-gray-200";
    if (taskCount <= 3) return "bg-gradient-to-r from-green-400 to-green-500";
    if (taskCount <= 6) return "bg-gradient-to-r from-yellow-400 to-yellow-500";
    return "bg-gradient-to-r from-primary-400 to-primary-500";
  };

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <Card 
        className="p-6 cursor-pointer hover:shadow-lg transition-all duration-200 border-l-4"
        style={{ borderLeftColor: project.color }}
        onClick={() => onClick(project)}
      >
        <div className="flex items-start justify-between mb-4">
          <h3 className="font-display font-semibold text-lg text-gray-900 line-clamp-1">
            {project.name}
          </h3>
          <div 
            className="w-3 h-3 rounded-full flex-shrink-0"
            style={{ backgroundColor: project.color }}
          />
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          Track progress and manage tasks efficiently with visual kanban boards
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ApperIcon name="Calendar" className="w-4 h-4 text-gray-400" />
            <span className="text-xs text-gray-500">
              {format(new Date(project.createdAt), "MMM dd, yyyy")}
            </span>
          </div>
          
          <Badge variant="primary" size="sm">
            {project.taskCount} {project.taskCount === 1 ? "task" : "tasks"}
          </Badge>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-500">Progress</span>
            <span className="text-xs font-medium text-gray-700">
              {project.taskCount > 0 ? Math.round((project.taskCount / 10) * 100) : 0}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(project.taskCount)}`}
              style={{ width: `${project.taskCount > 0 ? Math.min((project.taskCount / 10) * 100, 100) : 0}%` }}
            />
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;