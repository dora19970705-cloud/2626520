import React from "react";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Settings, 
  ChevronLeft, 
  ChevronRight, 
  Store
} from "lucide-react";

export default function Sidebar({ currentTab, setCurrentTab, isCollapsed, setIsCollapsed }) {
  const menuItems = [
    { id: "dashboard", label: "數據總覽", icon: LayoutDashboard },
    { id: "orders", label: "訂單管理", icon: ShoppingBag },
    { id: "settings", label: "系統設定", icon: Settings },
  ];

  return (
    <aside className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      {/* Brand Section */}
      <div className="sidebar-brand">
        <div className="brand-icon">
          <Store size={22} />
        </div>
        <span className="brand-name">Apex Control</span>
      </div>

      {/* Menu List */}
      <ul className="sidebar-menu">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`menu-item ${currentTab === item.id ? "active" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentTab(item.id);
                }}
              >
                <Icon size={20} />
                <span className="menu-text">{item.label}</span>
              </a>
            </li>
          );
        })}
      </ul>

      {/* Sidebar Footer with Collapse Button */}
      <div className="sidebar-footer" style={{ justifyContent: isCollapsed ? "center" : "flex-end" }}>
        <button 
          className="collapse-btn" 
          onClick={() => setIsCollapsed(!isCollapsed)}
          title={isCollapsed ? "展開側邊欄" : "收合側邊欄"}
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>
    </aside>
  );
}
