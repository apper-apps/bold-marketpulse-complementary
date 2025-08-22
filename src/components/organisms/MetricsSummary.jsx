import React, { useState, useEffect } from "react";
import MetricCard from "@/components/molecules/MetricCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import campaignService from "@/services/api/campaignService";

const MetricsSummary = () => {
  const [metrics, setMetrics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadMetrics = async () => {
    try {
      setLoading(true);
      setError(null);
      const campaigns = await campaignService.getAll();
      
      // Calculate summary metrics from campaign data
      const totalCampaigns = campaigns.length;
      const totalImpressions = campaigns.reduce((sum, campaign) => sum + (campaign.metrics.impressions || 0), 0);
      const totalClicks = campaigns.reduce((sum, campaign) => sum + (campaign.metrics.clicks || 0), 0);
      const totalConversions = campaigns.reduce((sum, campaign) => sum + (campaign.metrics.conversions || 0), 0);
      const totalSpend = campaigns.reduce((sum, campaign) => sum + (campaign.metrics.spend || 0), 0);
      
      const avgCTR = totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(2) : "0";
      const conversionRate = totalClicks > 0 ? ((totalConversions / totalClicks) * 100).toFixed(2) : "0";
      const avgCPC = totalClicks > 0 ? (totalSpend / totalClicks).toFixed(2) : "0";
      const roas = totalSpend > 0 ? (totalConversions * 50 / totalSpend).toFixed(2) : "0"; // Assuming $50 avg order value

      const summaryMetrics = [
        {
          title: "Active Campaigns",
          value: totalCampaigns,
          change: "+12%",
          trend: "up",
          icon: "Target",
          severity: "low"
        },
        {
          title: "Average CTR",
          value: `${avgCTR}%`,
          change: "+0.8%",
          trend: "up",
          icon: "MousePointer",
          severity: parseFloat(avgCTR) > 3 ? "low" : parseFloat(avgCTR) > 2 ? "medium" : "high"
        },
        {
          title: "Conversion Rate",
          value: `${conversionRate}%`,
          change: "-0.3%",
          trend: "down",
          icon: "TrendingUp",
          severity: parseFloat(conversionRate) > 5 ? "low" : parseFloat(conversionRate) > 3 ? "medium" : "high"
        },
        {
          title: "Avg CPC",
          value: `$${avgCPC}`,
          change: "+$0.15",
          trend: "up",
          icon: "DollarSign",
          severity: parseFloat(avgCPC) < 2 ? "low" : parseFloat(avgCPC) < 3 ? "medium" : "high"
        },
        {
          title: "ROAS",
          value: `${roas}x`,
          change: "+0.4x",
          trend: "up",
          icon: "BarChart3",
          severity: parseFloat(roas) > 3 ? "low" : parseFloat(roas) > 2 ? "medium" : "high"
        },
        {
          title: "Total Spend",
          value: `$${totalSpend.toLocaleString()}`,
          change: "+18%",
          trend: "up",
          icon: "CreditCard",
          severity: "medium"
        }
      ];

      setMetrics(summaryMetrics);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMetrics();
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadMetrics} />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
      {metrics.map((metric, index) => (
        <MetricCard
          key={index}
          title={metric.title}
          value={metric.value}
          change={metric.change}
          trend={metric.trend}
          icon={metric.icon}
          severity={metric.severity}
        />
      ))}
    </div>
  );
};

export default MetricsSummary;