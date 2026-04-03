import React from "react";

/**
 * Shared premium page header for all tool pages.
 * Uses CSS variables — works in both light and dark mode.
 */
const ToolPageHeader = ({ label = "Tools", title, subtitle, badge }) => (
  <div className="px-6 pt-6 pb-0">
    <div
      className="max-w-6xl mx-auto p-6 rounded-2xl relative overflow-hidden mb-6"
      style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
        boxShadow: "var(--shadow-md)",
      }}
    >
      {/* Subtle primary glow */}
      <div
        className="absolute -top-16 -right-16 w-64 h-64 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, color-mix(in oklch, var(--primary) 12%, transparent) 0%, transparent 65%)",
        }}
      />
      <div className="relative z-10 flex items-center justify-between gap-4 flex-wrap">
        <div>
          <p
            className="text-xs font-black uppercase tracking-widest mb-1.5"
            style={{ color: "var(--primary)", letterSpacing: "0.2em" }}
          >
            {label}
          </p>
          <h1
            className="text-2xl font-bold tracking-tight mb-1"
            style={{ color: "var(--foreground)", letterSpacing: "-0.02em" }}
          >
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
              {subtitle}
            </p>
          )}
        </div>
        {badge && (
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{
              background: "var(--muted)",
              border: "1px solid var(--border)",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "#10b981", boxShadow: "0 0 5px #10b981" }}
            />
            <span className="text-xs font-semibold" style={{ color: "var(--muted-foreground)" }}>
              {badge}
            </span>
          </div>
        )}
      </div>
    </div>
  </div>
);

export default ToolPageHeader;
