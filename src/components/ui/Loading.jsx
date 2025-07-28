import React from "react";

const Loading = ({ type = "kanban" }) => {
  if (type === "kanban") {
    return (
      <div className="flex gap-6 h-full">
        {/* Column skeletons */}
        {[1, 2, 3].map((column) => (
          <div key={column} className="flex-1 min-w-80">
            <div className="bg-white rounded-lg p-4 h-full">
              <div className="shimmer h-6 w-24 rounded mb-4"></div>
              <div className="space-y-3">
                {[1, 2, 3].map((card) => (
                  <div key={card} className="bg-gray-50 rounded-lg p-3">
                    <div className="shimmer h-4 w-3/4 rounded mb-2"></div>
                    <div className="shimmer h-3 w-1/2 rounded mb-3"></div>
                    <div className="flex justify-between items-center">
                      <div className="shimmer h-5 w-16 rounded-full"></div>
                      <div className="shimmer h-3 w-20 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === "projects") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((project) => (
          <div key={project} className="bg-white rounded-lg p-6 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div className="shimmer h-6 w-32 rounded"></div>
              <div className="shimmer h-4 w-4 rounded-full"></div>
            </div>
            <div className="shimmer h-4 w-full rounded mb-2"></div>
            <div className="shimmer h-4 w-2/3 rounded mb-4"></div>
            <div className="flex justify-between items-center">
              <div className="shimmer h-3 w-16 rounded"></div>
              <div className="shimmer h-2 w-20 rounded-full"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-64">
      <div className="flex items-center space-x-2">
        <div className="w-4 h-4 bg-primary-500 rounded-full animate-pulse"></div>
        <div className="w-4 h-4 bg-primary-500 rounded-full animate-pulse delay-75"></div>
        <div className="w-4 h-4 bg-primary-500 rounded-full animate-pulse delay-150"></div>
      </div>
    </div>
  );
};

export default Loading;