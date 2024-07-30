import React from 'react';

const DeviceWrapper = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  );
};

export default DeviceWrapper;