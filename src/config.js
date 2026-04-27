// ===== Price Constants =====
export const PRICES = {
  service: { mill: 8, sort: 3, dry: 8 },
  product: { rice_bran: 8, husk: 8, rice_chunks: 7, broken_rice: 14 }
};

export const PROMOTION_POINTS = { mill: 500, sort: 200, dry: 500 };

export const SERVICE_NAMES = {
  mill: 'สีข้าว',
  sort: 'คัด/ฝัดเมล็ดข้าว',
  dry: 'อบข้าว'
};

export const PRODUCT_NAMES = {
  rice_bran: 'รำข้าว',
  husk: 'แกลบ',
  rice_chunks: 'ข้าวท่อน',
  broken_rice: 'ข้าวปลาย'
};

// ===== Helper Functions =====

export function calculateServicePrice(serviceType, weightKg) {
  return (PRICES.service[serviceType] || 0) * weightKg;
}

export function calculateProductPrice(riceBran, husk, riceChunks, brokenRice) {
  return (riceBran * PRICES.product.rice_bran) +
         (husk * PRICES.product.husk) +
         (riceChunks * PRICES.product.rice_chunks) +
         (brokenRice * PRICES.product.broken_rice);
}

export function calculatePoints(totalAmount) {
  return Math.floor(totalAmount / 100);
}

export function formatPrice(price) {
  return price.toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function formatNumber(num) {
  return num.toLocaleString('th-TH');
}

export function formatDateThai(dateStr) {
  const months = [
    'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
    'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
  ];
  const d = dateStr ? new Date(dateStr) : new Date();
  const day = d.getDate();
  const month = months[d.getMonth()];
  const year = d.getFullYear() + 543;
  return `${day} ${month} ${year}`;
}

// ===== API Helper =====
const API_BASE = '/api';

export async function apiFetch(endpoint, options = {}) {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'เกิดข้อผิดพลาด');
  return data;
}
