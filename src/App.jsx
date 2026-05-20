import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Orders from "./components/Orders";
import { mockOrders } from "./data/mockData";
import { Save, Shield, BellRing, Settings2 } from "lucide-react";

function App() {
  const [currentTab, setCurrentTab] = useState("dashboard");
  const [orders, setOrders] = useState(mockOrders);
  const [searchValue, setSearchValue] = useState("");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarActive, setIsMobileSidebarActive] = useState(false);

  // Settings State (Mocked)
  const [shopName, setShopName] = useState("Apex 潮玩數位旗艦店");
  const [shopEmail, setShopEmail] = useState("service@apex-studio.tw");
  const [shopPhone, setShopPhone] = useState("02-2345-6789");

  const toggleMobileSidebar = () => {
    setIsMobileSidebarActive(!isMobileSidebarActive);
  };

  const renderContent = () => {
    switch (currentTab) {
      case "dashboard":
        return <Dashboard orders={orders} />;
      case "orders":
        return (
          <Orders 
            orders={orders} 
            setOrders={setOrders} 
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
        );
      case "settings":
        return (
          <div className="content-container">
            <div className="dashboard-card">
              <div className="card-header">
                <span className="card-title">
                  <Settings2 size={18} className="text-secondary" style={{ marginRight: "4px" }} />
                  商店基本設定
                </span>
              </div>
              <div className="modal-body" style={{ marginTop: "10px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
                  <div className="modal-field">
                    <label htmlFor="shop-name-input">商店名稱</label>
                    <input 
                      id="shop-name-input"
                      type="text" 
                      value={shopName} 
                      onChange={(e) => setShopName(e.target.value)} 
                    />
                  </div>
                  <div className="modal-field">
                    <label htmlFor="shop-email-input">客服信箱</label>
                    <input 
                      id="shop-email-input"
                      type="email" 
                      value={shopEmail} 
                      onChange={(e) => setShopEmail(e.target.value)} 
                    />
                  </div>
                  <div className="modal-field">
                    <label htmlFor="shop-phone-input">聯絡電話</label>
                    <input 
                      id="shop-phone-input"
                      type="text" 
                      value={shopPhone} 
                      onChange={(e) => setShopPhone(e.target.value)} 
                    />
                  </div>
                  <div className="modal-field">
                    <label htmlFor="currency-select">商店幣別</label>
                    <select id="currency-select" defaultValue="TWD">
                      <option value="TWD">TWD - 新台幣</option>
                      <option value="USD">USD - 美元</option>
                      <option value="JPY">JPY - 日圓</option>
                    </select>
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "16px" }}>
                  <button className="action-btn btn-primary" onClick={() => alert("商店基本設定已儲存！")}>
                    <Save size={16} />
                    儲存商店設定
                  </button>
                </div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
              {/* Notification card */}
              <div className="dashboard-card">
                <div className="card-header">
                  <span className="card-title">
                    <BellRing size={18} className="text-secondary" style={{ marginRight: "4px" }} />
                    即時通知通知設定
                  </span>
                </div>
                <div className="modal-body">
                  <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div>
                        <div style={{ fontSize: "14px", fontWeight: "600" }}>新訂單 Email 通知</div>
                        <div style={{ fontSize: "12px", color: "var(--text-secondary)" }}>當顧客下單後自動傳送通知</div>
                      </div>
                      <input type="checkbox" defaultChecked style={{ width: "20px", height: "20px", cursor: "pointer" }} />
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div>
                        <div style={{ fontSize: "14px", fontWeight: "600" }}>低庫存警告</div>
                        <div style={{ fontSize: "12px", color: "var(--text-secondary)" }}>商品庫存低於 5 件時系統提示</div>
                      </div>
                      <input type="checkbox" defaultChecked style={{ width: "20px", height: "20px", cursor: "pointer" }} />
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div>
                        <div style={{ fontSize: "14px", fontWeight: "600" }}>LINE 即時出貨推播</div>
                        <div style={{ fontSize: "12px", color: "var(--text-secondary)" }}>結合 LINE Notify 推送出貨訊息</div>
                      </div>
                      <input type="checkbox" style={{ width: "20px", height: "20px", cursor: "pointer" }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Security card */}
              <div className="dashboard-card">
                <div className="card-header">
                  <span className="card-title">
                    <Shield size={18} className="text-secondary" style={{ marginRight: "4px" }} />
                    安全性與金鑰管理
                  </span>
                </div>
                <div className="modal-body">
                  <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                    <div>
                      <div style={{ fontSize: "14px", fontWeight: "600" }}>管理員雙重身分驗證 (2FA)</div>
                      <div style={{ fontSize: "12px", color: "var(--text-secondary)", marginBottom: "8px" }}>已啟用 Authenticator 安全保護</div>
                      <button className="action-btn" style={{ fontSize: "12px" }}>重新設定</button>
                    </div>
                    <hr style={{ borderColor: "var(--border-color)" }} />
                    <div>
                      <div style={{ fontSize: "14px", fontWeight: "600" }}>API 連接金鑰</div>
                      <div style={{ fontSize: "12px", color: "var(--text-secondary)", marginBottom: "8px" }}>對接物流或金流 API 之串接權限</div>
                      <button className="action-btn btn-primary" style={{ fontSize: "12px" }}>生成新憑證</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <Dashboard orders={orders} />;
    }
  };

  return (
    <div className={`app-container ${isMobileSidebarActive ? "sidebar-open" : ""}`}>
      {/* Overlay to close mobile sidebar */}
      {isMobileSidebarActive && (
        <div 
          onClick={toggleMobileSidebar} 
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 1000
          }}
        />
      )}

      {/* Sidebar Component */}
      <Sidebar 
        currentTab={currentTab} 
        setCurrentTab={(tab) => {
          setCurrentTab(tab);
          setIsMobileSidebarActive(false); // Close mobile sidebar on select
        }}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
      />

      {/* Main Content Area */}
      <div className="main-wrapper">
        <Navbar 
          currentTab={currentTab} 
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          toggleMobileSidebar={toggleMobileSidebar}
        />
        {renderContent()}
      </div>
    </div>
  );
}

export default App;
