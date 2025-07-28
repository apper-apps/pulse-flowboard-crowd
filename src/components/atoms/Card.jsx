import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";

const Card = forwardRef(({ 
  className, 
  hoverable = false,
  children, 
  ...props 
}, ref) => {
  const CardComponent = hoverable ? motion.div : "div";
  
  const motionProps = hoverable ? {
    whileHover: { y: -2, scale: 1.02 },
    transition: { duration: 0.2, ease: "easeOut" }
  } : {};

  return (
    <CardComponent
      ref={ref}
      className={cn(
        "bg-white rounded-lg border border-gray-200 shadow-sm",
        hoverable && "hover:shadow-md cursor-pointer transition-shadow duration-200",
        className
      )}
      {...motionProps}
      {...props}
    >
      {children}
    </CardComponent>
  );
});

Card.displayName = "Card";

export default Card;