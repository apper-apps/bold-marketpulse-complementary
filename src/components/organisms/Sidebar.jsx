import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import { cn } from "@/utils/cn";

const Sidebar = ({ isOpen, onToggle }) => {
  const location = useLocation();

const navItems = [
    { path: "/", icon: "BarChart3", label: "Dashboard" },
    { path: "/data-sources", icon: "Database", label: "Data Sources" },
    { path: "/insights", icon: "Lightbulb", label: "Insights" },
    { path: "/team-accounts", icon: "Users", label: "Team Accounts" },
    { path: "/settings", icon: "Settings", label: "Settings" }
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 bg-surface shadow-premium border-r border-gray-100">
          <div className="flex-1 flex flex-col pt-8 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-6 mb-8">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-br from-primary to-secondary rounded-lg">
                  <ApperIcon name="Zap" className="text-white" size={24} />
                </div>
                <h1 className="text-xl font-bold gradient-text font-display">MarketPulse AI</h1>
              </div>
            </div>
            <nav className="flex-1 px-4 space-y-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      "group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200",
                      isActive
                        ? "bg-gradient-to-r from-primary/10 to-secondary/10 text-primary border-r-2 border-primary"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    )
                  }
                >
                  <ApperIcon
                    name={item.icon}
                    className="mr-3 flex-shrink-0"
                    size={20}
                  />
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={cn(
        "lg:hidden fixed inset-0 flex z-40 transition-opacity duration-300",
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={onToggle} />
        
        <div className={cn(
          "relative flex-1 flex flex-col max-w-xs w-full bg-surface transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={onToggle}
            >
              <ApperIcon name="X" className="h-6 w-6 text-white" />
            </button>
          </div>
          
          <div className="flex-1 h-0 pt-8 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-6 mb-8">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-br from-primary to-secondary rounded-lg">
                  <ApperIcon name="Zap" className="text-white" size={24} />
                </div>
                <h1 className="text-xl font-bold gradient-text font-display">MarketPulse AI</h1>
              </div>
            </div>
            <nav className="px-4 space-y-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onToggle}
                  className={({ isActive }) =>
                    cn(
                      "group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200",
                      isActive
                        ? "bg-gradient-to-r from-primary/10 to-secondary/10 text-primary border-r-2 border-primary"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    )
                  }
                >
                  <ApperIcon
                    name={item.icon}
                    className="mr-3 flex-shrink-0"
                    size={20}
                  />
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;