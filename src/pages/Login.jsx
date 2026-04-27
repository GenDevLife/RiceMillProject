import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
      const data = await res.json()
      if (res.ok) {
        localStorage.setItem('isAdmin', 'true')
        navigate('/admin')
      } else {
        setError(data.error || 'เกิดข้อผิดพลาด')
      }
    } catch {
      setError('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้')
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <img src="/images/TechTeam.png" alt="Tech Team Logo" className="login-logo" />
        <h2>เข้าสู่ระบบ</h2>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="login-username">ชื่อผู้ใช้:</label>
            <input
              type="text"
              id="login-username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="กรอกชื่อผู้ใช้"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="login-password">รหัสผ่าน:</label>
            <input
              type="password"
              id="login-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="กรอกรหัสผ่าน"
            />
          </div>
          
          {error && <p className="error-message">{error}</p>}
          
          <div className="button-group">
            <button type="button" className="btn-secondary" onClick={() => navigate('/')}>
              ย้อนกลับ
            </button>
            <button type="submit" className="btn-primary">
              เข้าสู่ระบบ
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
