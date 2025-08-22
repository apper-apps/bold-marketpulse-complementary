import React, { useState, useEffect } from "react";
import InsightCard from "@/components/molecules/InsightCard";
import FilterBar from "@/components/molecules/FilterBar";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import insightService from "@/services/api/insightService";

const InsightGrid = () => {
  const [insights, setInsights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    dateRange: "30d",
    campaign: "all",
    metric: "all"
  });

  const loadInsights = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await insightService.getAll();
      setInsights(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInsights();
  }, []);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    // In a real app, this would trigger a filtered API call
    console.log("Filters changed:", newFilters);
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadInsights} />;
  if (insights.length === 0) return <Empty type="insights" />;

  return (
    <div className="space-y-6">
      <FilterBar onFilterChange={handleFilterChange} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
{insights.map((insight) => (
          <InsightCard
            key={insight.Id}
            title_c={insight.title_c}
            description_c={insight.description_c}
            metric_c={insight.metric_c}
            value_c={insight.value_c}
            prediction_c={insight.prediction_c}
            severity_c={insight.severity_c}
            type_c={insight.type_c}
          />
        ))}
      </div>
    </div>
  );
};

export default InsightGrid;