import React, { useState } from "react";
import { Edit, Eye, Filter, Plus, RotateCcw, AlertCircle } from "lucide-react";
import OrderModal from "./OrderModal";

export default function Orders({ orders, setOrders, searchValue, setSearchValue }) {
  // Filter States
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Modal State
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Formatting Utility
  const formatCurrency = (val) => {
    return new Intl.NumberFormat("zh-TW", { style: "currency", currency: "TWD", maximumFractionDigits: 0 }).format(val);
  };

  // Reset Filters
  const handleResetFilters = () => {
    setStatusFilter("all");
    setPaymentFilter("all");
    setSearchValue("");
    setCurrentPage(1);
  };

  // Filter & Search Logic
  const filteredOrders = orders.filter((order) => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchValue.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchValue.toLowerCase()) ||
      order.items.some(item => item.name.toLowerCase().includes(searchValue.toLowerCase()));

    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    const matchesPayment = paymentFilter === "all" || order.payment === paymentFilter;

    return matchesSearch && matchesStatus && matchesPayment;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Handle Edit Save
  const handleSaveOrder = (orderId, updatedFields) => {
    const updatedOrders = orders.map((o) => {
      if (o.id === orderId) {
        return { ...o, ...updatedFields };
      }
      return o;
    });
    setOrders(updatedOrders);
    setSelectedOrder(null);
  };

  // Generate new mock order
  const handleAddMockOrder = () => {
    const names = ["林書豪", "蔡英文", "柯文哲", "郭台銘", "周杰倫", "蔡依林"];
    const products = [
      { name: "USB-C To HDMI 轉接器", price: 890 },
      { name: "無線垂直靜音人體工學滑鼠", price: 1890 },
      { name: "可折疊金屬筆電散熱支架", price: 1200 },
      { name: "GaN 100W 四孔充電頭", price: 2100 },
      { name: "20000mAh 雙向快充行動電源", price: 1500 }
    ];

    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomProduct = products[Math.floor(Math.random() * products.length)];
    const qty = Math.floor(Math.random() * 2) + 1;
    const newId = `ORD-${1000 + orders.length + 1}`;
    
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];

    const newOrder = {
      id: newId,
      customer: randomName,
      email: `${randomName}@mock.com`,
      phone: "0999-999-999",
      address: "新北市板橋區中山路一段 161 號",
      date: formattedDate,
      amount: randomProduct.price * qty,
      status: "pending",
      payment: "paid",
      items: [{ name: randomProduct.name, quantity: qty, price: randomProduct.price }]
    };

    setOrders([newOrder, ...orders]);
    setCurrentPage(1); // Go to first page to see the new order
  };

  return (
    <div className="content-container">
      {/* Search and Filters Area */}
      <div className="filter-bar">
        <div className="filter-group">
          {/* Inner Search for orders if not searching via header */}
          <div className="search-bar" style={{ display: "flex", width: "260px" }}>
            <input 
              type="text" 
              placeholder="搜尋編號、姓名、商品..." 
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          {/* Shipping Status Dropdown */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span className="filter-label">配送狀態</span>
            <select 
              className="filter-select"
              value={statusFilter} 
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="all">全部狀態</option>
              <option value="pending">待處理</option>
              <option value="shipping">出貨中</option>
              <option value="shipped">已出貨</option>
              <option value="cancelled">已取消</option>
            </select>
          </div>

          {/* Payment Status Dropdown */}
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span className="filter-label">付款狀態</span>
            <select 
              className="filter-select"
              value={paymentFilter} 
              onChange={(e) => {
                setPaymentFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="all">全部狀態</option>
              <option value="paid">已付款</option>
              <option value="unpaid">未付款</option>
              <option value="refunded">已退款</option>
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: "10px" }}>
          <button className="action-btn" onClick={handleResetFilters} title="重設篩選">
            <RotateCcw size={16} />
            重設
          </button>
          <button className="action-btn btn-primary" onClick={handleAddMockOrder}>
            <Plus size={16} />
            模擬新訂單
          </button>
        </div>
      </div>

      {/* Orders Table Card */}
      <div className="dashboard-card" style={{ padding: "0 0 24px 0" }}>
        <div className="card-header" style={{ padding: "24px 24px 12px 24px", marginBottom: "0" }}>
          <span className="card-title">訂單清單 ({filteredOrders.length} 筆)</span>
        </div>

        <div className="table-wrapper">
          <table className="custom-table">
            <thead>
              <tr>
                <th style={{ paddingLeft: "24px" }}>訂單編號</th>
                <th>顧客名稱</th>
                <th>訂單日期</th>
                <th>商品內容</th>
                <th>付款狀態</th>
                <th>配送狀態</th>
                <th>總金額</th>
                <th style={{ paddingRight: "24px", textAlign: "center" }}>操作</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((order) => (
                  <tr key={order.id}>
                    <td style={{ paddingLeft: "24px" }}><span className="order-id">{order.id}</span></td>
                    <td>
                      <div className="customer-cell">
                        <span className="customer-avatar-txt">{order.customer[0]}</span>
                        <span>{order.customer}</span>
                      </div>
                    </td>
                    <td>{order.date}</td>
                    <td style={{ maxWidth: "250px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      <span title={order.items.map(i => `${i.name} x${i.quantity}`).join(", ")}>
                        {order.items[0].name}
                        {order.items.length > 1 ? ` 等 ${order.items.length} 件商品` : ` x ${order.items[0].quantity}`}
                      </span>
                    </td>
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
                    <td style={{ paddingRight: "24px", textAlign: "center" }}>
                      <button 
                        className="action-btn" 
                        onClick={() => setSelectedOrder(order)}
                        style={{ margin: "0 auto" }}
                      >
                        <Edit size={14} />
                        編輯狀態
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" style={{ textAlign: "center", padding: "48px 0" }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", color: "var(--text-secondary)" }}>
                      <AlertCircle size={32} className="text-muted" />
                      <span>沒有找到符合篩選條件的訂單</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Section */}
        {filteredOrders.length > 0 && (
          <div className="pagination" style={{ padding: "0 24px" }}>
            <span className="page-info">
              顯示第 {indexOfFirstItem + 1} 至 {Math.min(indexOfLastItem, filteredOrders.length)} 筆，共 {filteredOrders.length} 筆
            </span>
            <div className="pagination-controls">
              <button 
                className="pagination-btn"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                上一頁
              </button>
              <span style={{ display: "flex", alignItems: "center", padding: "0 12px", fontSize: "14px", fontWeight: "600" }}>
                {currentPage} / {totalPages}
              </span>
              <button 
                className="pagination-btn"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                下一頁
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Edit Order Modal */}
      {selectedOrder && (
        <OrderModal 
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onSave={handleSaveOrder}
        />
      )}
    </div>
  );
}
