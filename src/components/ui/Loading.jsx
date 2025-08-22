import React from "react";

const Loading = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-surface rounded-xl p-6 shadow-custom animate-pulse">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
                <div>
                  <div className="w-20 h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="w-16 h-6 bg-gray-300 rounded"></div>
                </div>
              </div>
              <div className="w-12 h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(9)].map((_, index) => (
          <div key={index} className="bg-surface rounded-xl p-6 shadow-custom animate-pulse">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gray-200 rounded"></div>
                <div className="w-16 h-5 bg-gray-200 rounded"></div>
              </div>
              <div className="w-4 h-4 bg-gray-200 rounded"></div>
            </div>
            <div className="w-3/4 h-5 bg-gray-300 rounded mb-3"></div>
            <div className="w-full h-4 bg-gray-200 rounded mb-2"></div>
            <div className="w-2/3 h-4 bg-gray-200 rounded mb-4"></div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <div className="w-20 h-3 bg-gray-200 rounded"></div>
                <div className="w-12 h-4 bg-gray-300 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;