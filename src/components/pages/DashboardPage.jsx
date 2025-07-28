import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { projectService } from "@/services/api/projectService";
import { taskService } from "@/services/api/taskService";

const DashboardPage = () => {
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalTasks: 0,
    completedTasks: 0,
    inProgressTasks: 0
  });
  const [recentProjects, setRecentProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError("");
      
      const [projects, allTasks] = await Promise.all([
        projectService.getAll(),
        taskService.getAll()
      ]);

      const completedTasks = allTasks.filter(task => task.status === "done");
      const inProgressTasks = allTasks.filter(task => task.status === "inprogress");

      setStats({
        totalProjects: projects.length,
        totalTasks: allTasks.length,
        completedTasks: completedTasks.length,
        inProgressTasks: inProgressTasks.length
      });

      setRecentProjects(projects.slice(0, 5));
    } catch (err) {
      setError("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadDashboardData} />;

  const statCards = [
    {
      title: "Total Projects",
      value: stats.totalProjects,
      icon: "FolderKanban",
      color: "from-primary-500 to-primary-600",
      bgColor: "from-primary-50 to-primary-100"
    },
    {
      title: "Total Tasks",
      value: stats.totalTasks,
      icon: "CheckSquare",
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-50 to-blue-100"
    },
    {
      title: "Completed",
      value: stats.completedTasks,
      icon: "CheckCircle2",
      color: "from-green-500 to-green-600",
      bgColor: "from-green-50 to-green-100"
    },
    {
      title: "In Progress",
      value: stats.inProgressTasks,
      icon: "Clock",
      color: "from-amber-500 to-amber-600",
      bgColor: "from-amber-50 to-amber-100"
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Overview of your projects and tasks</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="p-6 hover:shadow-lg transition-all duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-display font-bold text-gray-900 mt-2">
                    {stat.value}
                  </p>
                </div>
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.bgColor} flex items-center justify-center`}>
                  <ApperIcon name={stat.icon} className={`w-6 h-6 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
                </div>
              </div>
              <div className={`mt-4 h-1 rounded bg-gradient-to-r ${stat.color}`} />
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Recent Projects */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-display font-semibold text-gray-900">Recent Projects</h2>
          <ApperIcon name="ArrowRight" className="w-5 h-5 text-gray-400" />
        </div>
        
        {recentProjects.length === 0 ? (
          <div className="text-center py-8">
            <ApperIcon name="FolderKanban" className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No projects yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {recentProjects.map((project) => (
              <div key={project.Id} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: project.color }}
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">{project.name}</h3>
                    <p className="text-sm text-gray-600">
                      {project.taskCount} {project.taskCount === 1 ? "task" : "tasks"}
                    </p>
                  </div>
                </div>
                <ApperIcon name="ExternalLink" className="w-4 h-4 text-gray-400" />
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default DashboardPage;