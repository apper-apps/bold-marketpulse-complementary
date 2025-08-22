import React, { useState } from "react";
import SubscriptionPlans from "@/components/organisms/SubscriptionPlans";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import ApperIcon from "@/components/ApperIcon";
import { toast } from "react-toastify";

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: true,
    dataRetention: "12",
    timezone: "UTC",
    currency: "USD"
  });

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveSettings = () => {
    toast.success("Settings saved successfully!");
  };

  const handleExportData = () => {
    toast.info("Data export will be sent to your email shortly");
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 font-display mb-2">
          Settings
        </h1>
        <p className="text-gray-600">
          Manage your account, subscription, and platform preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ApperIcon name="Settings" size={20} className="mr-2" />
                General Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Timezone
                </label>
                <Select
                  value={settings.timezone}
                  onChange={(e) => handleSettingChange("timezone", e.target.value)}
                >
                  <option value="UTC">UTC</option>
                  <option value="EST">Eastern Time</option>
                  <option value="PST">Pacific Time</option>
                  <option value="GMT">GMT</option>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Currency
                </label>
                <Select
                  value={settings.currency}
                  onChange={(e) => handleSettingChange("currency", e.target.value)}
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="CAD">CAD (C$)</option>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Data Retention (months)
                </label>
                <Select
                  value={settings.dataRetention}
                  onChange={(e) => handleSettingChange("dataRetention", e.target.value)}
                >
                  <option value="6">6 months</option>
                  <option value="12">12 months</option>
                  <option value="24">24 months</option>
                  <option value="unlimited">Unlimited</option>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Email Notifications
                  </label>
                  <p className="text-xs text-gray-500">
                    Receive insights via email
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.notifications}
                  onChange={(e) => handleSettingChange("notifications", e.target.checked)}
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
              </div>

              <Button onClick={handleSaveSettings} className="w-full">
                <ApperIcon name="Save" size={16} className="mr-2" />
                Save Settings
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ApperIcon name="Key" size={20} className="mr-2" />
                API Access
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  API Key
                </label>
                <div className="flex space-x-2">
                  <Input
                    type="password"
                    value="mk_live_••••••••••••••••"
                    readOnly
                    className="flex-1"
                  />
                  <Button variant="secondary" size="sm">
                    <ApperIcon name="Copy" size={14} />
                  </Button>
                </div>
              </div>

              <Button variant="secondary" size="sm" className="w-full">
                <ApperIcon name="RefreshCw" size={14} className="mr-2" />
                Regenerate Key
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-error">
                <ApperIcon name="AlertTriangle" size={20} className="mr-2" />
                Data Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="secondary" onClick={handleExportData} className="w-full">
                <ApperIcon name="Download" size={16} className="mr-2" />
                Export Data
              </Button>

              <Button variant="danger" size="sm" className="w-full">
                <ApperIcon name="Trash2" size={14} className="mr-2" />
                Delete All Data
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <SubscriptionPlans />
        </div>
      </div>
    </div>
  );
};

export default Settings;