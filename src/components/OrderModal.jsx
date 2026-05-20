import React, { useState } from "react";
import { X, User, Phone, MapPin, Mail, ShoppingCart } from "lucide-react";

export default function OrderModal({ order, onClose, onSave }) {
  const [status, setStatus] = useState(order.status);
  const [payment, setPayment] = useState(order.payment);

  const formatCurrency = (val) => {
    return new Intl.NumberFormat("zh-TW", { style: "currency", currency: "TWD", maximumFractionDigits: 0 }).format(val);
  };

  const handleSave = () => {
    onSave(order.id, { status, payment });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="modal-close" onClick={onClose} title="關閉">
          <X size={18} />
        </button>

        {/* Modal Title */}
        <h3 className="modal-title">
          <ShoppingCart size={22} className="text-secondary" />
          訂單明細 - <span className="order-id">{order.id}</span>
        </h3>

        <div className="modal-body">
          {/* Customer details info card */}
          <div style={{ 
            backgroundColor: "rgba(255, 255, 255, 0.03)", 
            padding: "16px", 
            borderRadius: "var(--border-radius-md)",
            border: "1px solid var(--border-color)",
            display: "flex",
            flexDirection: "column",
            gap: "10px"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px" }}>
              <User size={16} className="text-muted" />
              <span style={{ fontWeight: 600 }}>顧客姓名：</span>
              <span>{order.customer}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px" }}>
              <Mail size={16} className="text-muted" />
              <span style={{ fontWeight: 600 }}>電子郵件：</span>
              <span>{order.email}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px" }}>
              <Phone size={16} className="text-muted" />
              <span style={{ fontWeight: 600 }}>聯絡電話：</span>
              <span>{order.phone}</span>
            </div>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "8px", fontSize: "14px" }}>
              <MapPin size={16} className="text-muted" style={{ marginTop: "3px" }} />
              <span style={{ fontWeight: 600, flexShrink: 0 }}>配送地址：</span>
              <span style={{ lineHeight: "1.4" }}>{order.address}</span>
            </div>
          </div>

          {/* Items Purchased */}
          <div className="modal-field">
            <label>購買商品清單</label>
            <div style={{ 
              border: "1px solid var(--border-color)", 
              borderRadius: "var(--border-radius-sm)",
              overflow: "hidden"
            }}>
              {order.items.map((item, index) => (
                <div key={index} style={{ 
                  display: "flex", 
                  justifyContent: "space-between", 
                  padding: "12px 16px",
                  borderBottom: index < order.items.length - 1 ? "1px solid var(--border-color)" : "none",
                  fontSize: "13px",
                  backgroundColor: "rgba(255, 255, 255, 0.01)"
                }}>
                  <div>
                    <span style={{ fontWeight: 500, color: "var(--text-primary)" }}>{item.name}</span>
                    <span style={{ color: "var(--text-muted)", marginLeft: "8px" }}>x {item.quantity}</span>
                  </div>
                  <span style={{ fontWeight: 700, color: "var(--accent-light)" }}>
                    {formatCurrency(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
            <div style={{ 
              display: "flex", 
              justifyContent: "space-between", 
              padding: "12px 16px 0 16px", 
              fontWeight: 700,
              fontSize: "15px"
            }}>
              <span>應付總額</span>
              <span style={{ color: "var(--text-primary)", fontSize: "18px" }}>
                {formatCurrency(order.amount)}
              </span>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            {/* Payment status dropdown */}
            <div className="modal-field">
              <label htmlFor="payment-select">付款狀態</label>
              <select 
                id="payment-select"
                value={payment} 
                onChange={(e) => setPayment(e.target.value)}
              >
                <option value="paid">已付款</option>
                <option value="unpaid">未付款</option>
                <option value="refunded">已退款</option>
              </select>
            </div>

            {/* Shipping status dropdown */}
            <div className="modal-field">
              <label htmlFor="status-select">出貨管理</label>
              <select 
                id="status-select"
                value={status} 
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="pending">待處理</option>
                <option value="shipping">出貨中</option>
                <option value="shipped">已出貨</option>
                <option value="cancelled">已取消</option>
              </select>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="modal-footer">
          <button className="action-btn" onClick={onClose}>
            取消
          </button>
          <button className="action-btn btn-primary" onClick={handleSave}>
            儲存變更
          </button>
        </div>
      </div>
    </div>
  );
}
