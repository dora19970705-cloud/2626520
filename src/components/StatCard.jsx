import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

export default function StatCard({ label, value, change, isUp, icon: Icon, glowColor }) {
  return (
    <div className="dashboard-card" style={{ position: "relative" }}>
      {/* Decorative top glow border */}
      <div 
        className="stat-card-glow" 
        style={{ 
          background: glowColor || "var(--accent-gradient)" 
        }} 
      />
      
      <div className="stat-card-content">
        <div className="stat-info">
          <span className="stat-label">{label}</span>
          <span className="stat-value">{value}</span>
          
          {change && (
            <div className={`stat-change ${isUp ? "up" : "down"}`}>
              {isUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              <span>{change}</span>
              <span style={{ color: "var(--text-muted)", fontWeight: "normal", marginLeft: "4px" }}>
                較上週
              </span>
            </div>
          )}
        </div>

        <div className="stat-icon-box" style={{ 
          color: glowColor ? "white" : "var(--accent-color)",
          background: glowColor ? glowColor : "rgba(59, 130, 246, 0.1)"
        }}>
          <Icon size={22} />
        </div>
      </div>
    </div>
  );
}
