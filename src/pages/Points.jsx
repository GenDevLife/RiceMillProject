import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { apiFetch, formatNumber } from '../config'

function Points() {
  const [members, setMembers] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    apiFetch('/members?sort=points')
      .then(setMembers)
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const filtered = members.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="container">
      <div className="single-contact-box">
        <h2>🏆 คะแนนสะสมสมาชิก</h2>
        
        <div className="search-container" style={{ margin: '20px 0' }}>
          <input
            type="text"
            id="points-search"
            className="search-box"
            placeholder="🔍 ค้นหาชื่อสมาชิก..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        {loading ? (
          <div className="loading">กำลังโหลด</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th width="60">อันดับ</th>
                <th>ชื่อ-นามสกุล</th>
                <th>คะแนนสะสม</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan="3" className="no-data">ไม่พบข้อมูลสมาชิก</td></tr>
              ) : (
                filtered.map((member, i) => {
                  const rank = i + 1
                  const icon = rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : rank
                  return (
                    <tr key={member.id}>
                      <td>{icon}</td>
                      <td>{member.name}</td>
                      <td><strong>{formatNumber(member.points)}</strong> คะแนน</td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        )}
        
        <div className="button-group">
          <Link to="/" className="btn btn-secondary">← กลับหน้าหลัก</Link>
        </div>
      </div>
    </div>
  )
}

export default Points
