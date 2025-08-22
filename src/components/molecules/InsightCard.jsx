import React from "react";
import { Card, CardContent } from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import { cn } from "@/utils/cn";

const InsightCard = ({ title, description, metric, value, prediction, severity = "low", type, className }) => {
  const getSeverityVariant = () => {
    switch (severity) {
      case "high": return "error";
      case "medium": return "warning";
      default: return "success";
    }
  };

  const getSeverityClass = () => {
    switch (severity) {
      case "high": return "heat-map-high";
      case "medium": return "heat-map-medium";
      default: return "heat-map-low";
    }
  };

  const getTypeIcon = () => {
    switch (type) {
      case "anomaly": return "AlertTriangle";
      case "prediction": return "TrendingUp";
      case "opportunity": return "Target";
      default: return "Lightbulb";
    }
  };

  return (
    <Card className={cn("hover:shadow-premium transition-all duration-300 cursor-pointer", getSeverityClass(), className)}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <ApperIcon name={getTypeIcon()} className="text-gray-600" size={16} />
            <Badge variant={getSeverityVariant()}>
              {severity.toUpperCase()}
            </Badge>
          </div>
          <ApperIcon name="ChevronRight" className="text-gray-400" size={16} />
        </div>

        <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{description}</p>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">{metric}</span>
            <span className="text-lg font-bold gradient-text number-animate">{value}</span>
          </div>
          {prediction && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Predicted</span>
              <div className="flex items-center space-x-1">
                <ApperIcon 
                  name={prediction.trend === "up" ? "TrendingUp" : "TrendingDown"} 
                  size={14} 
                  className={prediction.trend === "up" ? "text-success" : "text-error"} 
                />
                <span className={cn("text-sm font-medium", prediction.trend === "up" ? "text-success" : "text-error")}>
                  {prediction.value}
                </span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default InsightCard;