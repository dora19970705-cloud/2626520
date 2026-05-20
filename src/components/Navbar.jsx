import React, { useState, useEffect } from "react";
import { 
  Search, 
  Bell, 
  Sun, 
  Moon, 
  Globe, 
  Menu
} from "lucide-react";

export default function Navbar({ currentTab, onSearchChange, searchValue, toggleMobileSidebar }) {
  const [isLightMode, setIsLightMode] = useState(false);
  const [notifications, setNotifications] = useState(3);

  // Initialize theme based on document class
  useEffect(() => {
    const isLight = document.documentElement.classList.contains("light-theme");
    setIsLightMode(isLight);
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    if (root.classList.contains("light-theme")) {
      root.classList.remove("light-theme");
      setIsLightMode(false);
    } else {
      root.classList.add("light-theme");
      setIsLightMode(true);
    }
  };

  const getPageTitleText = () => {
    switch (currentTab) {
      case "dashboard":
        return "數據總覽";
      case "orders":
        return "訂單管理";
      case "settings":
        return "系統設定";
      default:
        return "電商後台";
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        {/* Mobile menu trigger */}
        <button 
          className="nav-action-btn mobile-menu-btn" 
          onClick={toggleMobileSidebar}
          style={{ display: "none" }} /* Styled via CSS responsive, handled locally */
        >
          <Menu size={20} />
        </button>

        <h1 className="page-title">{getPageTitleText()}</h1>

        {/* Global Search Bar (Only shown on Orders tab or as a general UI element) */}
        {currentTab === "orders" && (
          <div className="search-bar">
            <Search size={18} className="text-secondary" />
            <input 
              type="text" 
              placeholder="搜尋訂單編號、顧客姓名..." 
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        )}
      </div>

      <div className="navbar-right">
        {/* Language selector (Decorative/Interactive) */}
        <button className="nav-action-btn" title="切換語言">
          <Globe size={18} />
        </button>

        {/* Theme Toggle Button */}
        <button 
          className="nav-action-btn" 
          onClick={toggleTheme} 
          title={isLightMode ? "切換至暗黑模式" : "切換至明亮模式"}
        >
          {isLightMode ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        {/* Notifications Icon */}
        <button 
          className="nav-action-btn" 
          onClick={() => setNotifications(0)} 
          title={`${notifications} 則未讀通知`}
        >
          <Bell size={18} />
          {notifications > 0 && <span className="badge-dot"></span>}
        </button>

        {/* Admin Info */}
        <div className="user-profile">
          <div className="avatar-wrapper">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" 
              alt="Admin Avatar" 
              className="user-avatar"
            />
          </div>
          <div className="user-info">
            <span className="user-name">林思宇</span>
            <span className="user-role">系統管理員</span>
          </div>
        </div>
      </div>
    </header>
  );
}
