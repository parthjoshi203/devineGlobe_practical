import React from "react";

const LoadingFallback = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="animate-spin h-12 w-12 border-b-2 border-blue-500 rounded-full"></div>
    </div>
  );
};

export default LoadingFallback;
