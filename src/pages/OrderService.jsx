import { useState, useEffect } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { apiFetch, PRICES, formatNumber } from '../config'

function OrderService() {
  const location = useLocation()
  const navigate = useNavigate()
  const memberId = location.state?.memberId

  const [member, setMember] = useState(null)
  const [serviceType, setServiceType] = useState('')
  const [weightKg, setWeightKg] = useState('')

  useEffect(() => {
    if (!memberId) { navigate('/select-member/service'); return }
    apiFetch(`/members/${memberId}`).then(setMember).catch(() => navigate('/select-member/service'))
  }, [memberId, navigate])

  function handleSubmit(e) {
    e.preventDefault()
    if (!serviceType) { alert('กรุณาเลือกบริการ'); return }
    navigate('/order/product', {
      state: { memberId, serviceType, weightKg: parseFloat(weightKg) }
    })
  }

  if (!member) return <div className="loading">กำลังโหลด</div>

  return (
    <div className="container">
      <div className="single-contact-box">
        <h2>สั่งบริการ</h2>
        
        <div className="summary" style={{ marginBottom: '20px' }}>
          <div><strong>สมาชิก:</strong> {member.name}</div>
          <div><strong>เบอร์โทร:</strong> {member.phone}</div>
          <div><strong>คะแนนสะสม:</strong> {formatNumber(member.points)} คะแนน</div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="service_product-details">
            <h3>เลือกบริการ</h3>
            
            <div className="radio-group">
              <label className={`radio-option ${serviceType === 'mill' ? 'selected' : ''}`}>
                <input type="radio" name="service_type" value="mill" checked={serviceType === 'mill'} onChange={(e) => setServiceType(e.target.value)} required />
                <span className="promo-text">
                  <strong>สีข้าว</strong>
                  <small>{PRICES.service.mill} บาท/กก.</small>
                </span>
              </label>
              
              <label className={`radio-option ${serviceType === 'sort' ? 'selected' : ''}`}>
                <input type="radio" name="service_type" value="sort" checked={serviceType === 'sort'} onChange={(e) => setServiceType(e.target.value)} />
                <span className="promo-text">
                  <strong>คัด/ฝัดเมล็ดข้าว</strong>
                  <small>{PRICES.service.sort} บาท/กก.</small>
                </span>
              </label>
              
              <label className={`radio-option ${serviceType === 'dry' ? 'selected' : ''}`}>
                <input type="radio" name="service_type" value="dry" checked={serviceType === 'dry'} onChange={(e) => setServiceType(e.target.value)} />
                <span className="promo-text">
                  <strong>อบข้าว</strong>
                  <small>{PRICES.service.dry} บาท/กก.</small>
                </span>
              </label>
            </div>
            
            <div className="form-group" style={{ marginTop: '20px' }}>
              <label htmlFor="weight-kg">น้ำหนักข้าว (กก.)</label>
              <input type="number" id="weight-kg" value={weightKg} onChange={(e) => setWeightKg(e.target.value)} min="1" max="10000" required placeholder="กรอกน้ำหนัก" />
            </div>
          </div>
          
          <div className="button-group">
            <button type="submit" className="btn btn-primary">ถัดไป - สั่งสินค้า →</button>
            <Link to="/select-member/service" className="btn btn-secondary">← กลับ</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default OrderService
