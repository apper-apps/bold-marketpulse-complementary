import React from "react";
import { Card, CardContent } from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import { cn } from "@/utils/cn";

const TeamAccountCard = ({ 
  Name, 
  Tags, 
  team_members_c, 
  associated_permissions_c, 
  Owner,
  CreatedOn,
  onEdit, 
  onDelete, 
  className 
}) => {
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleDateString();
    } catch (e) {
      return "N/A";
    }
  };

  const formatTags = (tags) => {
    if (!tags) return [];
    return typeof tags === 'string' ? tags.split(',').map(tag => tag.trim()).filter(Boolean) : [];
  };

  const formatPermissions = (permissions) => {
    if (!permissions) return "No permissions specified";
    return permissions.length > 100 ? permissions.substring(0, 100) + "..." : permissions;
  };

  return (
    <Card className={cn("hover:shadow-premium transition-all duration-300", className)}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary/10 to-secondary/10">
              <ApperIcon name="Users" className="text-primary" size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{Name}</h3>
              <p className="text-sm text-gray-500">
                Team Members: {team_members_c?.Name || "Not assigned"}
              </p>
            </div>
          </div>
        </div>

        {formatTags(Tags).length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {formatTags(Tags).slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="info" size="sm">
                {tag}
              </Badge>
            ))}
            {formatTags(Tags).length > 3 && (
              <Badge variant="secondary" size="sm">
                +{formatTags(Tags).length - 3} more
              </Badge>
            )}
          </div>
        )}

        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Owner:</span>
            <span className="text-gray-700">{Owner?.Name || "Unassigned"}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Created:</span>
            <span className="text-gray-700">{formatDate(CreatedOn)}</span>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-1">Permissions:</p>
          <p className="text-xs text-gray-600 bg-gray-50 p-2 rounded">
            {formatPermissions(associated_permissions_c)}
          </p>
        </div>

        <div className="flex space-x-2">
          <Button
            variant="primary"
            size="sm"
            onClick={onEdit}
            className="flex-1"
          >
            <ApperIcon name="Edit" size={14} className="mr-1" />
            Edit
          </Button>
          <Button 
            variant="danger" 
            size="sm" 
            onClick={onDelete}
          >
            <ApperIcon name="Trash2" size={14} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamAccountCard;