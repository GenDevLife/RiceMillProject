import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { apiFetch, formatNumber } from '../config'

function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    apiFetch('/stats')
      .then(setStats)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="loading">กำลังโหลด</div>
  if (!stats) return <div className="no-data">ไม่สามารถโหลดข้อมูลได้</div>

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>📊 แดชบอร์ดผู้ดูแลระบบ</h1>
        <div>
          <Link to="/" className="btn btn-primary">🏠 หน้าหลัก</Link>
        </div>
      </div>
      
      <div className="stats-grid">
        <div className="stat-card primary">
          <div className="stat-icon">👥</div>
          <div className="stat-value">{formatNumber(stats.totalMembers)}</div>
          <div className="stat-label">สมาชิกทั้งหมด</div>
        </div>
        
        <div className="stat-card success">
          <div className="stat-icon">💰</div>
          <div className="stat-value">{formatNumber(stats.todaySales)}</div>
          <div className="stat-label">ยอดขายวันนี้ (บาท)</div>
        </div>
        
        <div className="stat-card warning">
          <div className="stat-icon">📦</div>
          <div className="stat-value">{formatNumber(stats.todayOrders)}</div>
          <div className="stat-label">รายการวันนี้</div>
        </div>
        
        <div className="stat-card info">
          <div className="stat-icon">📅</div>
          <div className="stat-value">{formatNumber(stats.monthlySales)}</div>
          <div className="stat-label">ยอดขายเดือนนี้ (บาท)</div>
        </div>
      </div>
      
      <h3 className="section-title">👥 สมาชิกล่าสุด</h3>
      <table className="data-table">
        <thead>
          <tr>
            <th>รหัส</th>
            <th>ชื่อ-นามสกุล</th>
            <th>เบอร์โทร</th>
            <th>คะแนน</th>
            <th>วันที่สมัคร</th>
          </tr>
        </thead>
        <tbody>
          {stats.recentMembers.length === 0 ? (
            <tr><td colSpan="5" style={{ textAlign: 'center', color: '#999' }}>ไม่พบข้อมูลสมาชิก</td></tr>
          ) : (
            stats.recentMembers.map(member => (
              <tr key={member.id}>
                <td>{member.id}</td>
                <td>{member.name}</td>
                <td>{member.phone}</td>
                <td><strong>{formatNumber(member.points)}</strong></td>
                <td>{member.created_at}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default AdminDashboard
