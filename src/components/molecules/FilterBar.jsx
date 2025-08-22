import React, { useState } from "react";
import Button from "@/components/atoms/Button";
import Select from "@/components/atoms/Select";
import ApperIcon from "@/components/ApperIcon";

const FilterBar = ({ onFilterChange }) => {
  const [dateRange, setDateRange] = useState("30d");
  const [campaign, setCampaign] = useState("all");
  const [metric, setMetric] = useState("all");

  const handleFilterChange = (type, value) => {
    const filters = { dateRange, campaign, metric };
    filters[type] = value;
    
    if (type === "dateRange") setDateRange(value);
    if (type === "campaign") setCampaign(value);
    if (type === "metric") setMetric(value);
    
    onFilterChange && onFilterChange(filters);
  };

  return (
    <div className="bg-surface rounded-lg p-4 shadow-custom border border-gray-100/50 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <ApperIcon name="Calendar" size={16} className="text-gray-500" />
            <Select
              value={dateRange}
              onChange={(e) => handleFilterChange("dateRange", e.target.value)}
              className="min-w-[120px]"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </Select>
          </div>
          
          <div className="flex items-center space-x-2">
            <ApperIcon name="Target" size={16} className="text-gray-500" />
            <Select
              value={campaign}
              onChange={(e) => handleFilterChange("campaign", e.target.value)}
              className="min-w-[140px]"
            >
              <option value="all">All Campaigns</option>
              <option value="q4-promo">Q4 Promotion</option>
              <option value="brand-awareness">Brand Awareness</option>
              <option value="holiday-sale">Holiday Sale</option>
            </Select>
          </div>
          
          <div className="flex items-center space-x-2">
            <ApperIcon name="BarChart3" size={16} className="text-gray-500" />
            <Select
              value={metric}
              onChange={(e) => handleFilterChange("metric", e.target.value)}
              className="min-w-[120px]"
            >
              <option value="all">All Metrics</option>
              <option value="ctr">Click Rate</option>
              <option value="conversion">Conversion</option>
              <option value="roi">ROI</option>
            </Select>
          </div>
        </div>
        
        <Button variant="secondary" size="sm">
          <ApperIcon name="Download" size={16} className="mr-2" />
          Export
        </Button>
      </div>
    </div>
  );
};

export default FilterBar;