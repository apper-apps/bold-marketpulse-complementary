import React from "react";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ type = "data", onAction }) => {
  const getEmptyContent = () => {
    switch (type) {
      case "insights":
        return {
          icon: "Lightbulb",
          title: "No insights available",
          description: "Connect your data sources to start generating AI-powered marketing insights.",
          actionText: "Connect Data Source",
          actionIcon: "Plus"
        };
      case "dataSources":
        return {
          icon: "Database",
          title: "No data sources connected",
          description: "Connect your first data source to start analyzing your marketing performance.",
          actionText: "Add Data Source",
          actionIcon: "Plus"
        };
      case "campaigns":
        return {
          icon: "Target",
          title: "No campaigns found",
          description: "Your campaigns will appear here once your data sources are connected and synced.",
          actionText: "Sync Data",
          actionIcon: "RefreshCw"
        };
      default:
        return {
          icon: "FileText",
          title: "No data available",
          description: "There's no data to display at the moment. Try refreshing or check back later.",
          actionText: "Refresh",
          actionIcon: "RefreshCw"
        };
    }
  };

  const content = getEmptyContent();

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <ApperIcon name={content.icon} className="text-primary" size={32} />
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 mb-3">
          {content.title}
        </h3>
        
        <p className="text-gray-600 mb-8 leading-relaxed">
          {content.description}
        </p>
        
        {onAction && (
          <Button onClick={onAction} className="mb-4">
            <ApperIcon name={content.actionIcon} size={16} className="mr-2" />
            {content.actionText}
          </Button>
        )}
        
        <div className="space-y-2 text-sm text-gray-500">
          <p>Getting started:</p>
          <ul className="text-left space-y-1">
            <li className="flex items-center">
              <ApperIcon name="Check" size={14} className="mr-2 text-success" />
              Connect Google Analytics or Facebook Ads
            </li>
            <li className="flex items-center">
              <ApperIcon name="Check" size={14} className="mr-2 text-success" />
              Upload CSV files with campaign data
            </li>
            <li className="flex items-center">
              <ApperIcon name="Check" size={14} className="mr-2 text-success" />
              Let our ML engine analyze your data
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Empty;