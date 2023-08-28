import React, { useState } from 'react';

const Tab = ({ tabs, children }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex space-x-2">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`px-4 py-1 rounded-full ${
              index === activeTab
                ? 'bg-blue-500 dark:bg-blue-700 text-white font-semibold'
                : 'bg-gray-200 dark:bg-gray-700 text-blue-500'
            }`}
            onClick={() => setActiveTab(index)}
          >
            {tab}
          </button>
        ))}
      </div>
        {children}
    </div>
  );
};

export default Tab;