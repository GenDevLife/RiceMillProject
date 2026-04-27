import { useState, useEffect } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { apiFetch, PROMOTION_POINTS, SERVICE_NAMES, formatNumber } from '../config'

function OrderPromotion() {
  const location = useLocation()
  const navigate = useNavigate()
  const memberId = location.state?.memberId

  const [member, setMember] = useState(null)
  const [promotionType, setPromotionType] = useState('')

  useEffect(() => {
    if (!memberId) { navigate('/select-member/promotion'); return }
    apiFetch(`/members/${memberId}`).then(setMember).catch(() => navigate('/select-member/promotion'))
  }, [memberId, navigate])

  async function handleSubmit(e) {
    e.preventDefault()
    if (!promotionType) { alert('กรุณาเลือกโปรโมชั่น'); return }
    
    try {
      const data = await apiFetch('/promotions', {
        method: 'POST',
        body: { member_id: memberId, promotion_type: promotionType }
      })
      navigate('/receipt/promotion', { state: data })
    } catch (err) {
      alert(err.message)
    }
  }

  if (!member) return <div className="loading">กำลังโหลด</div>

  const points = member.points

  return (
    <div className="container">
      <div className="single-contact-box">
        <h2>แลกโปรโมชั่น</h2>
        
        <div className="summary" style={{ marginBottom: '20px' }}>
          <div><strong>สมาชิก:</strong> {member.name}</div>
          <div><strong>เบอร์โทร:</strong> {member.phone}</div>
          <div><strong>คะแนนสะสม:</strong> <span style={{ color: 'green', fontSize: '1.2em' }}>{formatNumber(points)}</span> คะแนน</div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="service_product-details">
            <h3>เลือกโปรโมชั่น</h3>
            
            <div className="radio-group">
              {Object.entries(PROMOTION_POINTS).map(([type, requiredPoints]) => {
                const disabled = points < requiredPoints
                return (
                  <label key={type} className={`radio-option ${disabled ? 'disabled' : ''} ${promotionType === type ? 'selected' : ''}`}>
                    <input
                      type="radio"
                      name="promotion_type"
                      value={type}
                      checked={promotionType === type}
                      onChange={(e) => setPromotionType(e.target.value)}
                      disabled={disabled}
                      required
                    />
                    <span className="promo-text">
                      <strong>{SERVICE_NAMES[type]} ฟรี 50 กก.</strong>
                      <small>
                        ใช้ {formatNumber(requiredPoints)} คะแนน
                        {disabled && <span style={{ color: 'red' }}> (คะแนนไม่พอ)</span>}
                      </small>
                    </span>
                  </label>
                )
              })}
            </div>
          </div>
          
          <div className="button-group">
            <button type="submit" className="btn btn-primary">ยืนยันการแลก →</button>
            <Link to="/select-member/promotion" className="btn btn-secondary">← กลับ</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default OrderPromotion
