import { useState, useEffect } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'

function Layout() {
  const [time, setTime] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    function updateTime() {
      const now = new Date()
      const thaiDays = ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์']
      const thaiMonths = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
        'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม']
      const pad = (n) => n < 10 ? '0' + n : n
      setTime(
        `วัน${thaiDays[now.getDay()]} ${now.getDate()} ${thaiMonths[now.getMonth()]} ${now.getFullYear() + 543} | ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())} น.`
      )
    }
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <div className="header">
        <div className="menu">
          <div className="logo">
            <img
              onClick={() => navigate('/')}
              src="/images/TechTeam.png"
              alt="Tech City Logo"
            />
          </div>
          <nav className="main-nav">
            <NavLink to="/select-member/service" className={({ isActive }) => isActive ? 'active' : ''}>
              บริการและสินค้า
            </NavLink>
            <NavLink to="/select-member/product" className={({ isActive }) => isActive ? 'active' : ''}>
              สินค้า
            </NavLink>
            <NavLink to="/points" className={({ isActive }) => isActive ? 'active' : ''}>
              คะแนนสะสม
            </NavLink>
            <NavLink to="/register" className={({ isActive }) => isActive ? 'active' : ''}>
              สมัครสมาชิก
            </NavLink>
            <NavLink to="/login" className={({ isActive }) => isActive ? 'active' : ''}>
              เข้าสู่ระบบ
            </NavLink>
          </nav>
        </div>
      </div>
      <main className="main-content">
        <Outlet />
      </main>
      <p className="time">{time}</p>
    </>
  )
}

export default Layout
