import React from 'react';

const ProgressBar = ({ percentage }) => {
  return (
    <div className="relative h-2 rounded-full bg-gray-200 shadow-sm">
      <div
        className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-600"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;