// 電商後台管理系統 繁體中文模擬數據

export const mockOrders = [
  {
    id: "ORD-1008",
    customer: "陳冠宇",
    email: "kuanyu.chen@example.com",
    phone: "0912-345-678",
    address: "台北市信義區忠孝東路五段 8 號",
    date: "2026-05-20",
    amount: 12800,
    status: "pending", // pending, shipping, shipped, cancelled
    payment: "unpaid", // paid, unpaid, refunded
    items: [
      { name: "Pro 級抗噪藍牙耳機", quantity: 1, price: 8800 },
      { name: "PD 65W 雙孔極速充電器", quantity: 2, price: 2000 }
    ]
  },
  {
    id: "ORD-1007",
    customer: "林美玲",
    email: "meiling.lin@example.com",
    phone: "0923-456-789",
    address: "台中市西屯區台灣大道三段 99 號",
    date: "2026-05-19",
    amount: 4500,
    status: "shipping",
    payment: "paid",
    items: [
      { name: "人體工學記憶棉腰靠", quantity: 1, price: 1500 },
      { name: "超靜音負離子空氣清淨機", quantity: 1, price: 3000 }
    ]
  },
  {
    id: "ORD-1006",
    customer: "張志豪",
    email: "zhihao.zhang@example.com",
    phone: "0934-567-890",
    address: "高雄市苓雅區五福一路 105 號",
    date: "2026-05-19",
    amount: 32000,
    status: "shipped",
    payment: "paid",
    items: [
      { name: "34 吋 2K 144Hz 曲面電競螢幕", quantity: 1, price: 18000 },
      { name: "RGB 機械式熱插拔鍵盤", quantity: 2, price: 7000 }
    ]
  },
  {
    id: "ORD-1005",
    customer: "王郁婷",
    email: "yuting.wang@example.com",
    phone: "0945-678-901",
    address: "新北市板橋區縣民大道二段 7 號",
    date: "2026-05-18",
    amount: 1580,
    status: "shipped",
    payment: "paid",
    items: [
      { name: "防潑水多功能雙肩電腦包", quantity: 1, price: 1580 }
    ]
  },
  {
    id: "ORD-1004",
    customer: "李建國",
    email: "jianguo.li@example.com",
    phone: "0956-789-012",
    address: "桃園市中壢區中大路 300 號",
    date: "2026-05-17",
    amount: 8900,
    status: "cancelled",
    payment: "refunded",
    items: [
      { name: "多功能智能氣炸烤箱", quantity: 1, price: 8900 }
    ]
  },
  {
    id: "ORD-1003",
    customer: "黃淑芬",
    email: "shufen.huang@example.com",
    phone: "0967-890-123",
    address: "台南市東區大學路 1 號",
    date: "2026-05-17",
    amount: 6200,
    status: "shipped",
    payment: "paid",
    items: [
      { name: "極簡無印風實木邊桌", quantity: 1, price: 3800 },
      { name: "手沖咖啡細口溫控壺", quantity: 1, price: 2400 }
    ]
  },
  {
    id: "ORD-1002",
    customer: "楊智傑",
    email: "zhijie.yang@example.com",
    phone: "0978-901-234",
    address: "新竹市東區光復路二段 101 號",
    date: "2026-05-16",
    amount: 21500,
    status: "shipped",
    payment: "paid",
    items: [
      { name: "人體工學高背網椅 (旗艦版)", quantity: 1, price: 16500 },
      { name: "鋁合金雙螢幕支架", quantity: 1, price: 5000 }
    ]
  },
  {
    id: "ORD-1001",
    customer: "許家豪",
    email: "jiahao.xu@example.com",
    phone: "0989-012-345",
    address: "基隆市仁愛區愛三路 10 號",
    date: "2026-05-15",
    amount: 3200,
    status: "shipped",
    payment: "paid",
    items: [
      { name: "直立式人體工學滑鼠", quantity: 2, price: 1600 }
    ]
  }
];

export const mockSalesData = [
  { date: "05/14", revenue: 48000, orders: 12 },
  { date: "05/15", revenue: 52000, orders: 15 },
  { date: "05/16", revenue: 78000, orders: 22 },
  { date: "05/17", revenue: 61000, orders: 18 },
  { date: "05/18", revenue: 95000, orders: 28 },
  { date: "05/19", revenue: 112000, orders: 34 },
  { date: "05/20", revenue: 135000, orders: 42 }
];

export const mockCategoryData = [
  { name: "電腦周邊", value: 45, color: "#3b82f6" }, // blue
  { name: "智能家電", value: 25, color: "#10b981" }, // emerald
  { name: "居家生活", value: 20, color: "#8b5cf6" }, // violet
  { name: "旅行配件", value: 10, color: "#f59e0b" }  // amber
];
