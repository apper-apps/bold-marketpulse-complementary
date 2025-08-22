import React from "react";
import InsightGrid from "@/components/organisms/InsightGrid";

const Insights = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 font-display mb-2">
          AI-Powered Insights
        </h1>
        <p className="text-gray-600">
          Machine learning analysis of your marketing performance data
        </p>
      </div>

      <InsightGrid />
    </div>
  );
};

export default Insights;