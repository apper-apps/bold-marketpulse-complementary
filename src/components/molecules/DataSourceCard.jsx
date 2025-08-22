import React from "react";
import { Card, CardContent } from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import { cn } from "@/utils/cn";

const DataSourceCard = ({ name, type, status, lastSync, onSync, onConfigure, className }) => {
  const getStatusVariant = () => {
    switch (status) {
      case "connected": return "success";
      case "error": return "error";
      case "syncing": return "info";
      default: return "warning";
    }
  };

  const getTypeIcon = () => {
    switch (type) {
      case "google-analytics": return "BarChart3";
      case "facebook-ads": return "Facebook";
      case "csv": return "FileText";
      case "shopify": return "ShoppingBag";
      default: return "Database";
    }
  };

  return (
    <Card className={cn("hover:shadow-premium transition-all duration-300", className)}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10">
              <ApperIcon name={getTypeIcon()} className="text-primary" size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{name}</h3>
              <p className="text-sm text-gray-500 capitalize">{type.replace("-", " ")}</p>
            </div>
          </div>
          <Badge variant={getStatusVariant()}>
            {status === "syncing" && <ApperIcon name="Loader" size={12} className="mr-1 animate-spin" />}
            {status}
          </Badge>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <span>Last sync: {lastSync}</span>
        </div>

        <div className="flex space-x-2">
          <Button
            variant="primary"
            size="sm"
            onClick={onSync}
            disabled={status === "syncing"}
            className="flex-1"
          >
            {status === "syncing" ? (
              <>
                <ApperIcon name="Loader" size={14} className="mr-1 animate-spin" />
                Syncing
              </>
            ) : (
              <>
                <ApperIcon name="RefreshCw" size={14} className="mr-1" />
                Sync Now
              </>
            )}
          </Button>
          <Button variant="secondary" size="sm" onClick={onConfigure}>
            <ApperIcon name="Settings" size={14} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataSourceCard;