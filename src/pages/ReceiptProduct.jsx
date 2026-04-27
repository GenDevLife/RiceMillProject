import { useLocation, useNavigate } from 'react-router-dom'
import { PRICES, formatPrice, formatNumber, formatDateThai } from '../config'

function ReceiptProduct() {
  const location = useLocation()
  const navigate = useNavigate()
  const data = location.state

  if (!data || !data.member) {
    navigate('/')
    return null
  }

  const { member, riceBranKg, huskKg, riceChunksKg, brokenRiceKg, totalPrice, earnedPoints } = data

  return (
    <div className="receipt-page">
      <div className="receipt-container">
        <div className="receipt-header">
          <img src="/images/TechTeam.png" alt="Logo" className="receipt-logo" onClick={() => navigate('/')} />
          <p className="company-name">Tech City โรงสีข้าว</p>
          <p className="company-address">จังหวัดพิจิตร</p>
        </div>
        
        <div className="customer-info">
          <p className="customer-name">{member.name}</p>
          <p className="customer-phone">โทร: {member.phone}</p>
          <p className="receipt-date">{formatDateThai()}</p>
        </div>
        
        <table className="receipt-table">
          <thead>
            <tr>
              <th>รายการ</th>
              <th>จำนวน</th>
              <th>ราคา</th>
            </tr>
          </thead>
          <tbody>
            {riceBranKg > 0 && (
              <tr>
                <td>รำข้าว</td>
                <td>{riceBranKg.toFixed(1)} กก.</td>
                <td>{formatPrice(riceBranKg * PRICES.product.rice_bran)}</td>
              </tr>
            )}
            {huskKg > 0 && (
              <tr>
                <td>แกลบ</td>
                <td>{huskKg.toFixed(1)} กก.</td>
                <td>{formatPrice(huskKg * PRICES.product.husk)}</td>
              </tr>
            )}
            {riceChunksKg > 0 && (
              <tr>
                <td>ข้าวท่อน</td>
                <td>{riceChunksKg.toFixed(1)} กก.</td>
                <td>{formatPrice(riceChunksKg * PRICES.product.rice_chunks)}</td>
              </tr>
            )}
            {brokenRiceKg > 0 && (
              <tr>
                <td>ข้าวปลาย</td>
                <td>{brokenRiceKg.toFixed(1)} กก.</td>
                <td>{formatPrice(brokenRiceKg * PRICES.product.broken_rice)}</td>
              </tr>
            )}
          </tbody>
        </table>
        
        <div className="grand-total">
          <p><strong>ยอดรวม: {formatPrice(totalPrice)} บาท</strong></p>
        </div>
        
        <div className="points-info">
          <p>ได้รับคะแนน: <strong>+{earnedPoints}</strong> คะแนน</p>
          <p className="points-remaining">คะแนนสะสมรวม: <strong>{formatNumber(member.points)}</strong> คะแนน</p>
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

export default ReceiptProduct
