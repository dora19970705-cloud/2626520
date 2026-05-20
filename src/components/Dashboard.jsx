import React, { useState } from "react";
import { 
  DollarSign, 
  ShoppingBag, 
  Truck, 
  Activity, 
  ArrowUpRight,
  TrendingUp
} from "lucide-react";
import StatCard from "./StatCard";
import { mockSalesData, mockCategoryData } from "../data/mockData";

export default function Dashboard({ orders }) {
  const [activeTooltip, setActiveTooltip] = useState(null);

  // Dynamic statistics calculations
  const nonCancelledOrders = orders.filter(o => o.status !== "cancelled");
  const totalRevenue = nonCancelledOrders.reduce((sum, o) => sum + o.amount, 0);
  const totalOrdersCount = orders.length;
  const pendingShipments = orders.filter(o => o.status === "pending" || o.status === "shipping").length;
  const averageOrderValue = nonCancelledOrders.length > 0 
    ? Math.round(totalRevenue / nonCancelledOrders.length) 
    : 0;

  // Formatting utility
  const formatCurrency = (val) => {
    return new Intl.NumberFormat("zh-TW", { style: "currency", currency: "TWD", maximumFractionDigits: 0 }).format(val);
  };

  // SVG Sales Trend Chart Calculations
  const chartWidth = 600;
  const chartHeight = 220;
  const paddingX = 40;
  const paddingY = 30;

  const maxVal = Math.max(...mockSalesData.map(d => d.revenue));
  const minVal = Math.min(...mockSalesData.map(d => d.revenue)) * 0.8; // Give some baseline padding

  const getCoordinates = () => {
    const points = [];
    const count = mockSalesData.length;
    mockSalesData.forEach((d, i) => {
      const x = paddingX + (i * (chartWidth - 2 * paddingX) / (count - 1));
      const y = chartHeight - paddingY - ((d.revenue - minVal) / (maxVal - minVal) * (chartHeight - 2 * paddingY));
      points.push({ x, y, data: d });
    });
    return points;
  };

  const coordinates = getCoordinates();
  
  // Build Line Path
  const linePath = coordinates.reduce((path, p, i) => {
    return i === 0 ? `M ${p.x} ${p.y}` : `${path} L ${p.x} ${p.y}`;
  }, "");

  // Build Area Path (for gradient fill below the line)
  const areaPath = coordinates.length > 0 
    ? `${linePath} L ${coordinates[coordinates.length - 1].x} ${chartHeight - paddingY} L ${coordinates[0].x} ${chartHeight - paddingY} Z`
    : "";

  // Donut Chart calculations
  const donutRadius = 50;
  const donutCircumference = 2 * Math.PI * donutRadius;
  let accumulatedPercentage = 0;

  return (
    <div className="content-container">
      {/* Stat Cards Grid */}
      <div className="stats-grid">
        <StatCard 
          label="總銷售營收" 
          value={formatCurrency(totalRevenue)} 
          change="+14.8%" 
          isUp={true} 
          icon={DollarSign}
          glowColor="linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)"
        />
        <StatCard 
          label="總訂單件數" 
          value={`${totalOrdersCount} 筆`} 
          change="+8.2%" 
          isUp={true} 
          icon={ShoppingBag}
          glowColor="linear-gradient(135deg, #10b981 0%, #059669 100%)"
        />
        <StatCard 
          label="待出貨訂單" 
          value={`${pendingShipments} 筆`} 
          change={pendingShipments > 0 ? "急需處理" : "已全部處理"} 
          isUp={pendingShipments > 0 ? false : true} 
          icon={Truck}
          glowColor="linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"
        />
        <StatCard 
          label="平均客單價 (AOV)" 
          value={formatCurrency(averageOrderValue)} 
          change="+4.5%" 
          isUp={true} 
          icon={Activity}
          glowColor="linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)"
        />
      </div>

      {/* Charts Grid */}
      <div className="charts-grid">
        {/* Sales Trend Chart Card */}
        <div className="dashboard-card">
          <div className="card-header">
            <span className="card-title">
              <TrendingUp size={18} className="text-secondary" style={{ marginRight: "4px" }} />
              營收成長趨勢圖 (近 7 日)
            </span>
            <span style={{ fontSize: "12px", color: "var(--text-secondary)", fontWeight: "500" }}>
              單位：新台幣 (TWD)
            </span>
          </div>

          <div className="chart-container">
            <svg 
              viewBox={`0 0 ${chartWidth} ${chartHeight}`} 
              className="chart-svg"
            >
              {/* Definitions for Gradients */}
              <defs>
                <linearGradient id="chart-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--accent-color)" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="var(--accent-color)" stopOpacity="0.00" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((ratio, index) => {
                const y = paddingY + ratio * (chartHeight - 2 * paddingY);
                const gridVal = maxVal - ratio * (maxVal - minVal);
                return (
                  <g key={index}>
                    <line 
                      x1={paddingX} 
                      y1={y} 
                      x2={chartWidth - paddingX} 
                      y2={y} 
                      className="chart-grid-line"
                    />
                    <text 
                      x={paddingX - 10} 
                      y={y + 4} 
                      fill="var(--text-muted)" 
                      fontSize="9" 
                      textAnchor="end"
                    >
                      {Math.round(gridVal / 1000)}k
                    </text>
                  </g>
                );
              })}

              {/* Chart Gradient Area */}
              {areaPath && <path d={areaPath} className="chart-path-area" />}

              {/* Chart Line */}
              {linePath && <path d={linePath} className="chart-path-line" />}

              {/* Interactive Dots */}
              {coordinates.map((p, i) => (
                <circle
                  key={i}
                  cx={p.x}
                  cy={p.y}
                  r="5"
                  className="chart-dot"
                  onMouseEnter={(e) => {
                    const rect = e.target.getBoundingClientRect();
                    const containerRect = e.target.ownerSVGElement.parentNode.getBoundingClientRect();
                    setActiveTooltip({
                      x: rect.left - containerRect.left + rect.width / 2,
                      y: rect.top - containerRect.top,
                      date: p.data.date,
                      revenue: p.data.revenue,
                      orders: p.data.orders
                    });
                  }}
                  onMouseLeave={() => setActiveTooltip(null)}
                />
              ))}

              {/* X Axis Labels */}
              {coordinates.map((p, i) => (
                <text
                  key={i}
                  x={p.x}
                  y={chartHeight - 10}
                  fill="var(--text-secondary)"
                  fontSize="10"
                  textAnchor="middle"
                  fontWeight="500"
                >
                  {p.data.date}
                </text>
              ))}
            </svg>

            {/* Tooltip Popup */}
            {activeTooltip && (
              <div 
                className="chart-tooltip"
                style={{ 
                  left: `${activeTooltip.x}px`, 
                  top: `${activeTooltip.y}px`,
                  opacity: 1
                }}
              >
                <div className="tooltip-title">{activeTooltip.date}</div>
                <div className="tooltip-value">{formatCurrency(activeTooltip.revenue)}</div>
                <div style={{ color: "var(--text-secondary)", fontSize: "10px", marginTop: "2px" }}>
                  訂單數: {activeTooltip.orders} 筆
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Category Share Card */}
        <div className="dashboard-card">
          <div className="card-header">
            <span className="card-title">品類銷售佔比</span>
          </div>

          <div className="donut-container">
            <svg viewBox="0 0 120 120" className="donut-svg">
              <circle cx="60" cy="60" r={donutRadius} className="donut-track" />
              {mockCategoryData.map((cat, i) => {
                const strokeDashoffset = donutCircumference - (cat.value / 100) * donutCircumference;
                const strokeDasharray = `${donutCircumference} ${donutCircumference}`;
                const rotation = (accumulatedPercentage / 100) * 360;
                accumulatedPercentage += cat.value;
                return (
                  <circle
                    key={i}
                    cx="60"
                    cy="60"
                    r={donutRadius}
                    className="donut-segment"
                    stroke={cat.color}
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    transform={`rotate(${rotation} 60 60)`}
                  />
                );
              })}
            </svg>
            <div className="donut-center-text">
              <span className="donut-center-val">100%</span>
              <span className="donut-center-lbl">品類總計</span>
            </div>
          </div>

          {/* Donut Legend */}
          <div className="donut-legend">
            {mockCategoryData.map((cat, i) => (
              <div key={i} className="legend-item">
                <span className="legend-color" style={{ backgroundColor: cat.color }}></span>
                <span>{cat.name} ({cat.value}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Latest Orders Snapshot */}
      <div className="dashboard-card">
        <div className="card-header">
          <span className="card-title">最新交易動態</span>
          <span className="action-btn btn-primary" style={{ fontSize: "12px", cursor: "pointer", padding: "6px 12px" }}>
            即時監控中
          </span>
        </div>

        <div className="table-wrapper">
          <table className="custom-table">
            <thead>
              <tr>
                <th>訂單編號</th>
                <th>顧客名稱</th>
                <th>交易日期</th>
                <th>付款狀態</th>
                <th>配送狀態</th>
                <th>交易金額</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 3).map((order) => (
                <tr key={order.id}>
                  <td><span className="order-id">{order.id}</span></td>
                  <td>
                    <div className="customer-cell">
                      <span className="customer-avatar-txt">{order.customer[0]}</span>
                      <span>{order.customer}</span>
                    </div>
                  </td>
                  <td>{order.date}</td>
                  <td>
                    <span className={`payment-indicator ${order.payment}`}>
                      {order.payment === "paid" && "● 已付款"}
                      {order.payment === "unpaid" && "○ 未付款"}
                      {order.payment === "refunded" && "◌ 已退款"}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${order.status}`}>
                      <span className="badge-pulse"></span>
                      {order.status === "pending" && "待處理"}
                      {order.status === "shipping" && "出貨中"}
                      {order.status === "shipped" && "已出貨"}
                      {order.status === "cancelled" && "已取消"}
                    </span>
                  </td>
                  <td><span style={{ fontWeight: 700 }}>{formatCurrency(order.amount)}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
