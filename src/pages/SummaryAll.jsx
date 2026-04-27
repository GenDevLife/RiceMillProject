import { useEffect, useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { apiFetch, PRICES, SERVICE_NAMES, calculateServicePrice, calculateProductPrice, calculatePoints, formatPrice } from '../config'

function SummaryAll() {
  const location = useLocation()
  const navigate = useNavigate()
  const state = location.state || {}
  const { memberId, serviceType, weightKg, servicePrice: sp, rice_bran_kg = 0, husk_kg = 0, rice_chunks_kg = 0, broken_rice_kg = 0 } = state

  const [member, setMember] = useState(null)

  useEffect(() => {
    if (!memberId) { navigate('/select-member/service'); return }
    apiFetch(`/members/${memberId}`).then(setMember).catch(() => navigate('/select-member/service'))
  }, [memberId, navigate])

  if (!member) return <div className="loading">กำลังโหลด</div>

  const servicePrice = sp || calculateServicePrice(serviceType, weightKg)
  const productPrice = calculateProductPrice(rice_bran_kg, husk_kg, rice_chunks_kg, broken_rice_kg)
  const totalPrice = servicePrice + productPrice
  const earnedPoints = calculatePoints(totalPrice)

  async function handleConfirm() {
    try {
      const data = await apiFetch('/orders/service-product', {
        method: 'POST',
        body: {
          member_id: memberId,
          service_type: serviceType,
          weight_kg: weightKg,
          rice_bran_kg, husk_kg, rice_chunks_kg, broken_rice_kg
        }
      })
      navigate('/receipt/all', { state: data })
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className="container">
      <div className="single-contact-box">
        <h2>สรุปรายการ</h2>
        
        <div className="summary" style={{ marginBottom: '20px' }}>
          <div><strong>สมาชิก:</strong> {member.name}</div>
          <div><strong>เบอร์โทร:</strong> {member.phone}</div>
        </div>
        
        <div className="summary-section">
          <div className="summary-category">
            <h3>🔧 บริการ</h3>
            <div className="summary-items">
              <div className="summary-item">
                <span>{SERVICE_NAMES[serviceType]} ({weightKg?.toLocaleString()} กก.)</span>
                <span>{formatPrice(servicePrice)} บาท</span>
              </div>
            </div>
          </div>
          
          {productPrice > 0 && (
            <div className="summary-category">
              <h3>📦 สินค้า</h3>
              <div className="summary-items">
                {rice_bran_kg > 0 && (
                  <div className="summary-item">
                    <span>รำข้าว ({rice_bran_kg.toFixed(1)} กก.)</span>
                    <span>{formatPrice(rice_bran_kg * PRICES.product.rice_bran)} บาท</span>
                  </div>
                )}
                {husk_kg > 0 && (
                  <div className="summary-item">
                    <span>แกลบ ({husk_kg.toFixed(1)} กก.)</span>
                    <span>{formatPrice(husk_kg * PRICES.product.husk)} บาท</span>
                  </div>
                )}
                {rice_chunks_kg > 0 && (
                  <div className="summary-item">
                    <span>ข้าวท่อน ({rice_chunks_kg.toFixed(1)} กก.)</span>
                    <span>{formatPrice(rice_chunks_kg * PRICES.product.rice_chunks)} บาท</span>
                  </div>
                )}
                {broken_rice_kg > 0 && (
                  <div className="summary-item">
                    <span>ข้าวปลาย ({broken_rice_kg.toFixed(1)} กก.)</span>
                    <span>{formatPrice(broken_rice_kg * PRICES.product.broken_rice)} บาท</span>
                  </div>
                )}
              </div>
            </div>
          )}
          
          <div className="summary-total">
            <p><strong>ยอดรวมทั้งหมด: {formatPrice(totalPrice)} บาท</strong></p>
            <p style={{ color: 'green' }}>ได้รับ {earnedPoints} คะแนน</p>
          </div>
        </div>
        
        <div className="button-group">
          <button onClick={handleConfirm} className="btn btn-primary">ยืนยัน - ออกใบเสร็จ →</button>
          <Link to="/select-member/service" className="btn btn-secondary">← เริ่มใหม่</Link>
        </div>
      </div>
    </div>
  )
}

export default SummaryAll
