import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_PATH = path.join(__dirname, '..', 'database', 'ricemill.db');

class DB {
  constructor() {
    this.db = new Database(DB_PATH);
    this.db.pragma('journal_mode = WAL');
    this.db.pragma('foreign_keys = ON');
  }

  // ==================== Member Methods ====================
  
  getMembers(limit = 100, offset = 0) {
    return this.db.prepare(
      'SELECT * FROM members ORDER BY id DESC LIMIT ? OFFSET ?'
    ).all(limit, offset);
  }

  getMember(id) {
    return this.db.prepare('SELECT * FROM members WHERE id = ?').get(id);
  }

  searchMembers(keyword) {
    const kw = `%${keyword}%`;
    return this.db.prepare(
      'SELECT * FROM members WHERE name LIKE ? OR phone LIKE ? ORDER BY name LIMIT 50'
    ).all(kw, kw);
  }

  registerMember(name, phone, address, subdistrict, district, province = 'พิจิตร') {
    const result = this.db.prepare(
      `INSERT INTO members (name, phone, points, address, subdistrict, district, province, created_at) 
       VALUES (?, ?, 0, ?, ?, ?, ?, date('now'))`
    ).run(name, phone, address, subdistrict, district, province);
    return result.lastInsertRowid;
  }

  addMemberPoints(memberId, pointsToAdd) {
    return this.db.prepare(
      'UPDATE members SET points = points + ? WHERE id = ?'
    ).run(pointsToAdd, memberId);
  }

  deductMemberPoints(memberId, pointsToDeduct) {
    return this.db.prepare(
      'UPDATE members SET points = points - ? WHERE id = ?'
    ).run(pointsToDeduct, memberId);
  }

  getMembersByPoints(limit = 50) {
    return this.db.prepare(
      'SELECT * FROM members ORDER BY points DESC LIMIT ?'
    ).all(limit);
  }

  countMembers() {
    return this.db.prepare('SELECT COUNT(*) as count FROM members').get().count;
  }

  // ==================== Order Product Methods ====================
  
  insertOrderProduct(memberId, riceBranKg, huskKg, riceChunksKg, brokenRiceKg, totalPrice) {
    const result = this.db.prepare(
      `INSERT INTO order_products (member_id, order_date, rice_bran_kg, husk_kg, rice_chunks_kg, broken_rice_kg, total_price) 
       VALUES (?, date('now'), ?, ?, ?, ?, ?)`
    ).run(memberId, riceBranKg, huskKg, riceChunksKg, brokenRiceKg, totalPrice);
    return result.lastInsertRowid;
  }

  // ==================== Order Service Methods ====================
  
  insertOrderService(memberId, serviceType, weightKg, totalPrice) {
    const result = this.db.prepare(
      `INSERT INTO order_services (member_id, order_date, service_type, weight_kg, total_price) 
       VALUES (?, date('now'), ?, ?, ?)`
    ).run(memberId, serviceType, weightKg, totalPrice);
    return result.lastInsertRowid;
  }

  // ==================== Promotion Methods ====================
  
  insertPromotion(memberId, promotionType, pointsUsed) {
    const result = this.db.prepare(
      `INSERT INTO promotions (member_id, redeem_date, promotion_type, points_used) 
       VALUES (?, date('now'), ?, ?)`
    ).run(memberId, promotionType, pointsUsed);
    return result.lastInsertRowid;
  }

  // ==================== Statistics Methods ====================
  
  getTodaySales() {
    const products = this.db.prepare(
      "SELECT COALESCE(SUM(total_price), 0) as total FROM order_products WHERE order_date = date('now')"
    ).get();
    const services = this.db.prepare(
      "SELECT COALESCE(SUM(total_price), 0) as total FROM order_services WHERE order_date = date('now')"
    ).get();
    return (products.total || 0) + (services.total || 0);
  }

  getTodayOrderCount() {
    const products = this.db.prepare(
      "SELECT COUNT(*) as count FROM order_products WHERE order_date = date('now')"
    ).get();
    const services = this.db.prepare(
      "SELECT COUNT(*) as count FROM order_services WHERE order_date = date('now')"
    ).get();
    return (products.count || 0) + (services.count || 0);
  }

  getMonthlySales(year, month) {
    const startDate = `${String(year).padStart(4, '0')}-${String(month).padStart(2, '0')}-01`;
    const endDate = `${String(year).padStart(4, '0')}-${String(month).padStart(2, '0')}-31`;
    
    const products = this.db.prepare(
      'SELECT COALESCE(SUM(total_price), 0) as total FROM order_products WHERE order_date BETWEEN ? AND ?'
    ).get(startDate, endDate);
    const services = this.db.prepare(
      'SELECT COALESCE(SUM(total_price), 0) as total FROM order_services WHERE order_date BETWEEN ? AND ?'
    ).get(startDate, endDate);
    
    return (products.total || 0) + (services.total || 0);
  }

  close() {
    this.db.close();
  }
}

export default DB;
