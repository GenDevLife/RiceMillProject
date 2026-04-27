import express from 'express';
import cors from 'cors';
import DB from './database.js';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const db = new DB();

// ===== Price Constants =====
const PRICES = {
  service: { mill: 8, sort: 3, dry: 8 },
  product: { rice_bran: 8, husk: 8, rice_chunks: 7, broken_rice: 14 }
};

const PROMOTION_POINTS = { mill: 500, sort: 200, dry: 500 };

const SERVICE_NAMES = {
  mill: 'สีข้าว',
  sort: 'คัด/ฝัดเมล็ดข้าว',
  dry: 'อบข้าว'
};

// Helper functions
function calculatePoints(totalAmount) {
  return Math.floor(totalAmount / 100);
}

function calculateServicePrice(serviceType, weightKg) {
  return (PRICES.service[serviceType] || 0) * weightKg;
}

function calculateProductPrice(riceBran, husk, riceChunks, brokenRice) {
  return (riceBran * PRICES.product.rice_bran) +
         (husk * PRICES.product.husk) +
         (riceChunks * PRICES.product.rice_chunks) +
         (brokenRice * PRICES.product.broken_rice);
}

// ==================== API Routes ====================

// --- Config ---
app.get('/api/config', (req, res) => {
  res.json({ prices: PRICES, promotionPoints: PROMOTION_POINTS, serviceNames: SERVICE_NAMES });
});

// --- Members ---
app.get('/api/members', (req, res) => {
  try {
    const { q, sort } = req.query;
    let members;
    if (sort === 'points') {
      members = db.getMembersByPoints(50);
    } else if (q) {
      members = db.searchMembers(q);
    } else {
      members = db.getMembers(50, 0);
    }
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/members/:id', (req, res) => {
  try {
    const member = db.getMember(parseInt(req.params.id));
    if (!member) return res.status(404).json({ error: 'Member not found' });
    res.json(member);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/members', (req, res) => {
  try {
    const { name, phone, address, subdistrict, district, province } = req.body;
    if (!name || !phone) {
      return res.status(400).json({ error: 'กรุณากรอกชื่อและเบอร์โทร' });
    }
    const id = db.registerMember(name, phone, address || '', subdistrict || '', district || '', province || 'พิจิตร');
    res.json({ id, message: `สมัครสมาชิกสำเร็จ! รหัสสมาชิก: ${id}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Orders: Service + Product (combined) ---
app.post('/api/orders/service-product', (req, res) => {
  try {
    const { 
      member_id, service_type, weight_kg,
      rice_bran_kg = 0, husk_kg = 0, rice_chunks_kg = 0, broken_rice_kg = 0 
    } = req.body;
    
    const memberId = parseInt(member_id);
    const member = db.getMember(memberId);
    if (!member) return res.status(404).json({ error: 'Member not found' });
    
    const servicePrice = calculateServicePrice(service_type, parseFloat(weight_kg));
    const productPrice = calculateProductPrice(
      parseFloat(rice_bran_kg), parseFloat(husk_kg), 
      parseFloat(rice_chunks_kg), parseFloat(broken_rice_kg)
    );
    const totalPrice = servicePrice + productPrice;
    const earnedPoints = calculatePoints(totalPrice);
    
    // Save service order
    db.insertOrderService(memberId, service_type, parseFloat(weight_kg), servicePrice);
    
    // Save product order if any
    if (productPrice > 0) {
      db.insertOrderProduct(memberId, parseFloat(rice_bran_kg), parseFloat(husk_kg), 
        parseFloat(rice_chunks_kg), parseFloat(broken_rice_kg), productPrice);
    }
    
    // Add points
    db.addMemberPoints(memberId, earnedPoints);
    
    const updatedMember = db.getMember(memberId);
    
    res.json({
      member: updatedMember,
      serviceType: service_type,
      serviceName: SERVICE_NAMES[service_type] || service_type,
      weightKg: parseFloat(weight_kg),
      servicePrice,
      riceBranKg: parseFloat(rice_bran_kg),
      huskKg: parseFloat(husk_kg),
      riceChunksKg: parseFloat(rice_chunks_kg),
      brokenRiceKg: parseFloat(broken_rice_kg),
      productPrice,
      totalPrice,
      earnedPoints
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Orders: Product Only ---
app.post('/api/orders/product', (req, res) => {
  try {
    const { member_id, rice_bran_kg = 0, husk_kg = 0, rice_chunks_kg = 0, broken_rice_kg = 0 } = req.body;
    
    const memberId = parseInt(member_id);
    const member = db.getMember(memberId);
    if (!member) return res.status(404).json({ error: 'Member not found' });
    
    const totalPrice = calculateProductPrice(
      parseFloat(rice_bran_kg), parseFloat(husk_kg), 
      parseFloat(rice_chunks_kg), parseFloat(broken_rice_kg)
    );
    
    if (totalPrice <= 0) {
      return res.status(400).json({ error: 'กรุณาเลือกสินค้าอย่างน้อย 1 รายการ' });
    }
    
    const earnedPoints = calculatePoints(totalPrice);
    
    db.insertOrderProduct(memberId, parseFloat(rice_bran_kg), parseFloat(husk_kg), 
      parseFloat(rice_chunks_kg), parseFloat(broken_rice_kg), totalPrice);
    db.addMemberPoints(memberId, earnedPoints);
    
    const updatedMember = db.getMember(memberId);
    
    res.json({
      member: updatedMember,
      riceBranKg: parseFloat(rice_bran_kg),
      huskKg: parseFloat(husk_kg),
      riceChunksKg: parseFloat(rice_chunks_kg),
      brokenRiceKg: parseFloat(broken_rice_kg),
      totalPrice,
      earnedPoints
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Promotions ---
app.post('/api/promotions', (req, res) => {
  try {
    const { member_id, promotion_type } = req.body;
    
    const memberId = parseInt(member_id);
    const member = db.getMember(memberId);
    if (!member) return res.status(404).json({ error: 'Member not found' });
    
    const pointsRequired = PROMOTION_POINTS[promotion_type] || 0;
    
    if (member.points < pointsRequired) {
      return res.status(400).json({ error: 'คะแนนไม่เพียงพอ' });
    }
    
    db.insertPromotion(memberId, promotion_type, pointsRequired);
    db.deductMemberPoints(memberId, pointsRequired);
    
    const updatedMember = db.getMember(memberId);
    
    res.json({
      member: updatedMember,
      promotionType: promotion_type,
      promotionName: SERVICE_NAMES[promotion_type] || promotion_type,
      pointsUsed: pointsRequired
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Statistics (Admin) ---
app.get('/api/stats', (req, res) => {
  try {
    const now = new Date();
    const totalMembers = db.countMembers();
    const todaySales = db.getTodaySales();
    const todayOrders = db.getTodayOrderCount();
    const monthlySales = db.getMonthlySales(now.getFullYear(), now.getMonth() + 1);
    const recentMembers = db.getMembers(10, 0);
    
    res.json({ totalMembers, todaySales, todayOrders, monthlySales, recentMembers });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- Auth (simple) ---
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'owner' && password === '12345678') {
    res.json({ success: true, username });
  } else {
    res.status(401).json({ error: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
  }
});

app.listen(PORT, () => {
  console.log(`🌾 RiceMill API Server running on http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  db.close();
  process.exit(0);
});
