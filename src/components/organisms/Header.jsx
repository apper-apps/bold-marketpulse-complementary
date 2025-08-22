import React from "react";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import ApperIcon from "@/components/ApperIcon";

const Header = ({ onMenuToggle, title = "Dashboard" }) => {
  const handleSearch = (query) => {
    console.log("Search query:", query);
  };

  return (
    <header className="bg-surface shadow-custom border-b border-gray-100/50 backdrop-blur-sm">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <Button
              variant="secondary"
              size="sm"
              onClick={onMenuToggle}
              className="lg:hidden"
            >
              <ApperIcon name="Menu" size={20} />
            </Button>
            <h1 className="text-2xl font-bold text-gray-900 font-display">{title}</h1>
          </div>

          <div className="flex items-center space-x-4">
            <SearchBar
              placeholder="Search insights, campaigns..."
              onSearch={handleSearch}
              className="hidden sm:block w-64"
            />
            
            <div className="flex items-center space-x-2">
              <Button variant="secondary" size="sm" className="relative">
                <ApperIcon name="Bell" size={20} />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-error rounded-full animate-pulse"></span>
              </Button>
              
              <div className="h-8 w-px bg-gray-200"></div>
              
<div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                  <ApperIcon name="User" size={16} className="text-white" />
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">Marketing Team</p>
                  <p className="text-xs text-gray-500">Pro Plan</p>
                </div>
                <Button 
                  variant="secondary" 
                  size="sm"
                  onClick={() => {
                    const { ApperUI } = window.ApperSDK;
                    ApperUI.logout();
                  }}
                  className="flex items-center"
                >
                  <ApperIcon name="LogOut" size={14} className="mr-1" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;