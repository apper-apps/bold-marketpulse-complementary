import React from "react";
import { Card, CardContent } from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import { cn } from "@/utils/cn";

const MetricCard = ({ title, value, change, trend, icon, severity = "low", className }) => {
  const getTrendIcon = () => {
    if (trend === "up") return "TrendingUp";
    if (trend === "down") return "TrendingDown";
    return "Minus";
  };

  const getTrendColor = () => {
    if (trend === "up") return "text-success";
    if (trend === "down") return "text-error";
    return "text-gray-500";
  };

  const getSeverityClass = () => {
    switch (severity) {
      case "high": return "heat-map-high";
      case "medium": return "heat-map-medium";
      default: return "heat-map-low";
    }
  };

  return (
    <Card className={cn("hover:shadow-premium transition-all duration-300", getSeverityClass(), className)}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10">
              <ApperIcon name={icon} className="text-primary" size={20} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">{title}</p>
              <p className="text-2xl font-bold gradient-text number-animate">{value}</p>
            </div>
          </div>
          {change && (
            <div className="text-right">
              <div className={cn("flex items-center space-x-1", getTrendColor())}>
                <ApperIcon name={getTrendIcon()} size={16} />
                <span className="text-sm font-medium">{change}</span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricCard;