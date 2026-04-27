import { useState, useEffect, useCallback } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { apiFetch } from '../config'

const FLOW_CONFIG = {
  service: { title: 'สำหรับใช้บริการสีข้าวและซื้อสินค้า', next: '/order/service' },
  product: { title: 'สำหรับซื้อสินค้าอย่างเดียว', next: '/order/product-only' },
  promotion: { title: 'สำหรับแลกโปรโมชั่น', next: '/order/promotion' },
}

function SelectMember() {
  const { flow } = useParams()
  const navigate = useNavigate()
  const [members, setMembers] = useState([])
  const [selectedId, setSelectedId] = useState(null)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  const config = FLOW_CONFIG[flow] || FLOW_CONFIG.service

  const loadMembers = useCallback(async (keyword) => {
    try {
      const url = keyword ? `/members?q=${encodeURIComponent(keyword)}` : '/members'
      const data = await apiFetch(url)
      setMembers(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadMembers('')
  }, [loadMembers])

  useEffect(() => {
    const timeout = setTimeout(() => {
      loadMembers(search)
    }, 300)
    return () => clearTimeout(timeout)
  }, [search, loadMembers])

  function handleSubmit(e) {
    e.preventDefault()
    if (!selectedId) {
      alert('กรุณาเลือกสมาชิก')
      return
    }
    navigate(config.next, { state: { memberId: selectedId } })
  }

  return (
    <div className="container">
      <div className="single-contact-box">
        <h2>เลือกสมาชิก</h2>
        <p style={{ textAlign: 'center', color: '#666' }}>{config.title}</p>
        
        <div className="search-container" style={{ margin: '20px 0' }}>
          <input
            type="text"
            id="member-search"
            className="search-box"
            placeholder="🔍 ค้นหาชื่อหรือเบอร์โทร..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <form onSubmit={handleSubmit}>
          {loading ? (
            <div className="loading">กำลังโหลด</div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th width="50">เลือก</th>
                  <th>ชื่อ-นามสกุล</th>
                  <th>เบอร์โทร</th>
                  <th>{flow === 'promotion' ? 'คะแนนสะสม' : 'คะแนน'}</th>
                </tr>
              </thead>
              <tbody>
                {members.length === 0 ? (
                  <tr><td colSpan="4" className="no-data">ไม่พบสมาชิก</td></tr>
                ) : (
                  members.map(member => (
                    <tr key={member.id}>
                      <td>
                        <input
                          type="radio"
                          name="member_id"
                          value={member.id}
                          checked={selectedId === member.id}
                          onChange={() => setSelectedId(member.id)}
                        />
                      </td>
                      <td>{member.name}</td>
                      <td>{member.phone}</td>
                      <td style={flow === 'promotion' && member.points >= 200 ? { color: 'green', fontWeight: 'bold' } : {}}>
                        {member.points} {flow === 'promotion' ? 'คะแนน' : ''}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
          
          <div className="button-group">
            <button type="submit" className="btn btn-primary">ถัดไป →</button>
            <Link to="/" className="btn btn-secondary">← กลับหน้าหลัก</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SelectMember
