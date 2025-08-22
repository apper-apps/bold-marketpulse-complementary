import React, { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Card = forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div
      className={cn(
        "rounded-xl bg-surface p-6 shadow-custom border border-gray-100/50 backdrop-blur-sm transition-all duration-200 hover:shadow-premium hover:scale-[1.02]",
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = "Card";

const CardHeader = forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div
      className={cn("flex flex-col space-y-1.5 pb-4", className)}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  );
});

CardHeader.displayName = "CardHeader";

const CardTitle = forwardRef(({ className, children, ...props }, ref) => {
  return (
    <h3
      className={cn("text-lg font-semibold leading-none tracking-tight", className)}
      ref={ref}
      {...props}
    >
      {children}
    </h3>
  );
});

CardTitle.displayName = "CardTitle";

const CardContent = forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div
      className={cn("pt-0", className)}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  );
});

CardContent.displayName = "CardContent";

export { Card, CardHeader, CardTitle, CardContent };