import React from 'react';

const SkeletonLoader = ({ className = '', lines = 3, showAvatar = false }) => (
  <div className={`space-y-3 ${className}`}>
    {showAvatar && (
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full shimmer flex-shrink-0" />
        <div className="space-y-2 flex-1">
          <div className="h-3 w-1/2 rounded-full shimmer" />
          <div className="h-2 w-1/3 rounded-full shimmer" />
        </div>
      </div>
    )}
    {Array.from({ length: lines }).map((_, i) => (
      <div
        key={i}
        className="h-3 rounded-full shimmer"
        style={{ width: i === lines - 1 ? '65%' : '100%', animationDelay: `${i * 0.12}s` }}
      />
    ))}
  </div>
);

export const SkeletonCard = ({ className = '' }) => (
  <div
    className={`p-6 rounded-[20px] ${className}`}
    style={{ background: "rgba(10,10,20,0.6)", border: "1px solid rgba(255,255,255,0.06)" }}
  >
    <div className="flex items-start justify-between mb-5">
      <div className="w-9 h-9 rounded-xl shimmer" />
      <div className="w-14 h-5 rounded-full shimmer" />
    </div>
    <div className="h-3 w-1/2 rounded-full shimmer mb-3" />
    <div className="h-7 w-3/4 rounded-full shimmer" />
  </div>
);

export default SkeletonLoader;