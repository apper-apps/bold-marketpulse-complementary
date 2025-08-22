import React, { useState, useEffect } from "react";
import DataSourceCard from "@/components/molecules/DataSourceCard";
import Button from "@/components/atoms/Button";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import { toast } from "react-toastify";
import dataSourceService from "@/services/api/dataSourceService";

const DataSourceGrid = () => {
  const [dataSources, setDataSources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadDataSources = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await dataSourceService.getAll();
      setDataSources(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDataSources();
  }, []);

  const handleSync = async (sourceId, sourceName) => {
    try {
      // Update UI to show syncing state
      setDataSources(prev => prev.map(source => 
        source.Id === sourceId 
          ? { ...source, status: "syncing" }
          : source
      ));

      await dataSourceService.syncDataSource(sourceId);
      
      // Simulate sync completion
      setTimeout(() => {
        setDataSources(prev => prev.map(source => 
          source.Id === sourceId 
            ? { ...source, status: "connected", lastSync: "Just now" }
            : source
        ));
        toast.success(`${sourceName} synced successfully!`);
      }, 2000);
    } catch (err) {
      setDataSources(prev => prev.map(source => 
        source.Id === sourceId 
          ? { ...source, status: "error" }
          : source
      ));
      toast.error(`Failed to sync ${sourceName}`);
    }
  };

  const handleConfigure = (sourceId) => {
    toast.info("Configuration modal would open here");
  };

  const handleAddDataSource = () => {
    toast.info("Add data source modal would open here");
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadDataSources} />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 font-display">Data Sources</h2>
          <p className="text-gray-600 mt-1">Connect and manage your marketing data sources</p>
        </div>
        <Button onClick={handleAddDataSource}>
          <ApperIcon name="Plus" size={16} className="mr-2" />
          Add Data Source
        </Button>
      </div>

      {dataSources.length === 0 ? (
        <Empty type="dataSources" onAction={handleAddDataSource} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dataSources.map((source) => (
            <DataSourceCard
              key={source.Id}
              name={source.name}
              type={source.type}
              status={source.status}
              lastSync={source.lastSync}
              onSync={() => handleSync(source.Id, source.name)}
              onConfigure={() => handleConfigure(source.Id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DataSourceGrid;