import { useState, useEffect } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { apiFetch, PRICES, SERVICE_NAMES, calculateServicePrice, formatPrice } from '../config'

function OrderProduct() {
  const location = useLocation()
  const navigate = useNavigate()
  const { memberId, serviceType, weightKg } = location.state || {}

  const [member, setMember] = useState(null)
  const [products, setProducts] = useState({ rice_bran_kg: 0, husk_kg: 0, rice_chunks_kg: 0, broken_rice_kg: 0 })

  useEffect(() => {
    if (!memberId || !serviceType || !weightKg) { navigate('/select-member/service'); return }
    apiFetch(`/members/${memberId}`).then(setMember).catch(() => navigate('/select-member/service'))
  }, [memberId, serviceType, weightKg, navigate])

  const servicePrice = calculateServicePrice(serviceType, weightKg)

  function handleSubmit(e) {
    e.preventDefault()
    navigate('/summary/all', {
      state: { memberId, serviceType, weightKg, servicePrice, ...products }
    })
  }

  if (!member) return <div className="loading">กำลังโหลด</div>

  return (
    <div className="container">
      <div className="single-contact-box">
        <h2>สั่งสินค้า</h2>
        
        <div className="summary" style={{ marginBottom: '20px' }}>
          <div><strong>สมาชิก:</strong> {member.name}</div>
          <div><strong>บริการ:</strong> {SERVICE_NAMES[serviceType]} {weightKg.toLocaleString()} กก.</div>
          <div><strong>ราคาบริการ:</strong> {formatPrice(servicePrice)} บาท</div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="service_product-details">
            <h3>เลือกสินค้า (ถ้าต้องการ)</h3>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>กรอกจำนวน กก. ที่ต้องการซื้อ (ว่างไว้ถ้าไม่ซื้อ)</p>
            
            <div className="product-list">
              <div className="product-item">
                <label>รำข้าว ({PRICES.product.rice_bran} บาท/กก.)</label>
                <input type="number" id="rice-bran" value={products.rice_bran_kg} onChange={(e) => setProducts({...products, rice_bran_kg: parseFloat(e.target.value) || 0})} min="0" max="1000" step="0.1" />
                <span className="unit">กก.</span>
              </div>
              <div className="product-item">
                <label>แกลบ ({PRICES.product.husk} บาท/กก.)</label>
                <input type="number" id="husk" value={products.husk_kg} onChange={(e) => setProducts({...products, husk_kg: parseFloat(e.target.value) || 0})} min="0" max="1000" step="0.1" />
                <span className="unit">กก.</span>
              </div>
              <div className="product-item">
                <label>ข้าวท่อน ({PRICES.product.rice_chunks} บาท/กก.)</label>
                <input type="number" id="rice-chunks" value={products.rice_chunks_kg} onChange={(e) => setProducts({...products, rice_chunks_kg: parseFloat(e.target.value) || 0})} min="0" max="1000" step="0.1" />
                <span className="unit">กก.</span>
              </div>
              <div className="product-item">
                <label>ข้าวปลาย ({PRICES.product.broken_rice} บาท/กก.)</label>
                <input type="number" id="broken-rice" value={products.broken_rice_kg} onChange={(e) => setProducts({...products, broken_rice_kg: parseFloat(e.target.value) || 0})} min="0" max="1000" step="0.1" />
                <span className="unit">กก.</span>
              </div>
            </div>
          </div>
          
          <div className="button-group">
            <button type="submit" className="btn btn-primary">ดูสรุปรายการ →</button>
            <Link to="/select-member/service" className="btn btn-secondary">← เริ่มใหม่</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default OrderProduct
