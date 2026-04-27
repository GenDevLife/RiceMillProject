import { useLocation, useNavigate } from 'react-router-dom'
import { formatNumber, formatDateThai } from '../config'

function ReceiptPromotion() {
  const location = useLocation()
  const navigate = useNavigate()
  const data = location.state

  if (!data || !data.member) {
    navigate('/')
    return null
  }

  const { member, promotionName, pointsUsed } = data

  return (
    <div className="receipt-page">
      <div className="receipt-container">
        <div className="receipt-header">
          <img src="/images/TechTeam.png" alt="Logo" className="receipt-logo" onClick={() => navigate('/')} />
          <p className="company-name">Tech City โรงสีข้าว</p>
          <p className="company-address">จังหวัดพิจิตร</p>
        </div>
        
        <div className="promotion-badge">
          <span>🎁 คูปองโปรโมชั่น</span>
        </div>
        
        <div className="customer-info">
          <p className="customer-name">{member.name}</p>
          <p className="customer-phone">โทร: {member.phone}</p>
          <p className="receipt-date">{formatDateThai()}</p>
        </div>
        
        <div className="promotion-details">
          <h3>{promotionName} ฟรี!</h3>
          <p className="promo-amount">50 กก.</p>
          <p className="promo-note">* ใช้ได้ภายใน 30 วัน</p>
        </div>
        
        <div className="points-info">
          <p>ใช้คะแนน: <strong>-{formatNumber(pointsUsed)}</strong> คะแนน</p>
          <p className="points-remaining">คะแนนคงเหลือ: <strong>{formatNumber(member.points)}</strong> คะแนน</p>
        </div>
        
        <div className="receipt-footer">
          <p>ขอบคุณที่ใช้บริการ ❤️</p>
        </div>
        
        <button className="print-button" onClick={() => window.print()}>🖨️ พิมพ์ใบเสร็จ</button>
        <button className="print-button secondary" onClick={() => navigate('/')}>← กลับหน้าหลัก</button>
      </div>
    </div>
  )
}

export default ReceiptPromotion
