import React from "react";
import MetricsSummary from "@/components/organisms/MetricsSummary";
import InsightGrid from "@/components/organisms/InsightGrid";

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 font-display mb-2">
          Marketing Intelligence Dashboard
        </h1>
        <p className="text-gray-600">
          AI-powered insights from your marketing data sources
        </p>
      </div>

      <MetricsSummary />
      
      <div>
        <h2 className="text-2xl font-bold text-gray-900 font-display mb-6">
          Latest Insights
        </h2>
        <InsightGrid />
      </div>
    </div>
  );
};

export default Dashboard;