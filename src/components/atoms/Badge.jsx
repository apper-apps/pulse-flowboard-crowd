import React from "react";
import { cn } from "@/utils/cn";

const Badge = ({ 
  variant = "default", 
  size = "default",
  className, 
  children 
}) => {
  const variants = {
    default: "bg-gray-100 text-gray-800",
    primary: "bg-gradient-to-r from-primary-100 to-primary-200 text-primary-800",
    success: "bg-gradient-to-r from-green-100 to-green-200 text-green-800",
    warning: "bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800",
    error: "bg-gradient-to-r from-red-100 to-red-200 text-red-800",
    info: "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800",
    high: "bg-gradient-to-r from-red-100 to-red-200 text-red-800",
    medium: "bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800",
    low: "bg-gradient-to-r from-green-100 to-green-200 text-green-800",
  };

  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    default: "px-2.5 py-1 text-xs",
    lg: "px-3 py-1.5 text-sm",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
};

export default Badge;