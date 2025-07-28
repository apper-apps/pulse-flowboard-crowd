import React, { useState } from "react";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    theme: "light",
    notifications: true,
    autoSave: true,
    defaultView: "kanban"
  });

  const handleSave = () => {
    // In a real app, this would save to backend/localStorage
    toast.success("Settings saved successfully!");
  };

  const handleReset = () => {
    setSettings({
      theme: "light",
      notifications: true,
      autoSave: true,
      defaultView: "kanban"
    });
    toast.info("Settings reset to defaults");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your application preferences</p>
      </div>

      {/* Appearance */}
      <Card className="p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg flex items-center justify-center">
            <ApperIcon name="Palette" className="w-5 h-5 text-primary-600" />
          </div>
          <h2 className="text-xl font-display font-semibold text-gray-900">Appearance</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Theme"
            value={settings.theme}
            onChange={(e) => setSettings({ ...settings, theme: e.target.value })}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System</option>
          </Select>
          
          <Select
            label="Default View"
            value={settings.defaultView}
            onChange={(e) => setSettings({ ...settings, defaultView: e.target.value })}
          >
            <option value="kanban">Kanban Board</option>
            <option value="list">List View</option>
            <option value="timeline">Timeline</option>
          </Select>
        </div>
      </Card>

      {/* Notifications */}
      <Card className="p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
            <ApperIcon name="Bell" className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-xl font-display font-semibold text-gray-900">Notifications</h2>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900">Push Notifications</h3>
              <p className="text-sm text-gray-600">Receive notifications for task updates</p>
            </div>
            <button
              onClick={() => setSettings({ ...settings, notifications: !settings.notifications })}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.notifications ? "bg-primary-500" : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.notifications ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900">Auto-save</h3>
              <p className="text-sm text-gray-600">Automatically save changes as you work</p>
            </div>
            <button
              onClick={() => setSettings({ ...settings, autoSave: !settings.autoSave })}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                settings.autoSave ? "bg-primary-500" : "bg-gray-200"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  settings.autoSave ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
      </Card>

      {/* Data Management */}
      <Card className="p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-8 h-8 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center">
            <ApperIcon name="Database" className="w-5 h-5 text-green-600" />
          </div>
          <h2 className="text-xl font-display font-semibold text-gray-900">Data Management</h2>
        </div>
        
        <div className="space-y-4">
          <Button variant="secondary" className="w-full justify-start">
            <ApperIcon name="Download" className="w-4 h-4 mr-2" />
            Export Data
          </Button>
          <Button variant="secondary" className="w-full justify-start">
            <ApperIcon name="Upload" className="w-4 h-4 mr-2" />
            Import Data
          </Button>
          <Button variant="danger" className="w-full justify-start">
            <ApperIcon name="Trash2" className="w-4 h-4 mr-2" />
            Clear All Data
          </Button>
        </div>
      </Card>

      {/* Actions */}
      <div className="flex space-x-4">
        <Button onClick={handleSave} className="flex-1">
          <ApperIcon name="Save" className="w-4 h-4 mr-2" />
          Save Settings
        </Button>
        <Button variant="secondary" onClick={handleReset}>
          <ApperIcon name="RotateCcw" className="w-4 h-4 mr-2" />
          Reset to Defaults
        </Button>
      </div>
    </div>
  );
};

export default SettingsPage;