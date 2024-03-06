// SkeletonLoading.jsx

import React from "react";
import "./SkeletonLoading.css";

const SkeletonLoading = () => {
  return (
    <div className="skeleton-loading">
      <div className="skeleton-box"></div>
      <div className="skeleton-box"></div>
      <div className="skeleton-box"></div>
      <div className="skeleton-box"></div>
    </div>
  );
};

export default SkeletonLoading;
