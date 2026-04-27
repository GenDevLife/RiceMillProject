import { useState } from 'react'
import { Link } from 'react-router-dom'
import { apiFetch } from '../config'

function Register() {
  const [form, setForm] = useState({
    name: '', phone: '', address: '', subdistrict: '', district: '', province: 'พิจิตร'
  })
  const [message, setMessage] = useState(null)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setMessage(null)
    try {
      const data = await apiFetch('/members', { method: 'POST', body: form })
      setMessage({ type: 'success', text: data.message })
      setForm({ name: '', phone: '', address: '', subdistrict: '', district: '', province: 'พิจิตร' })
    } catch (err) {
      setMessage({ type: 'error', text: err.message })
    }
  }

  return (
    <div className="container">
      <div className="single-contact-box">
        <h2>สมัครสมาชิกใหม่</h2>
        
        {message && (
          <div className={`alert alert-${message.type}`}>{message.text}</div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="reg-name">ชื่อ-นามสกุล *</label>
            <input type="text" id="reg-name" name="name" value={form.name} onChange={handleChange} required placeholder="กรอกชื่อ-นามสกุล" />
          </div>
          
          <div className="form-group">
            <label htmlFor="reg-phone">เบอร์โทรศัพท์ *</label>
            <input type="tel" id="reg-phone" name="phone" value={form.phone} onChange={handleChange} required placeholder="เช่น 0812345678" pattern="[0-9]{10}" maxLength="10" />
          </div>
          
          <div className="form-group">
            <label htmlFor="reg-address">ที่อยู่</label>
            <input type="text" id="reg-address" name="address" value={form.address} onChange={handleChange} placeholder="เช่น 123 ม.5" />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="reg-subdistrict">ตำบล</label>
              <input type="text" id="reg-subdistrict" name="subdistrict" value={form.subdistrict} onChange={handleChange} placeholder="ตำบล" />
            </div>
            <div className="form-group">
              <label htmlFor="reg-district">อำเภอ</label>
              <input type="text" id="reg-district" name="district" value={form.district} onChange={handleChange} placeholder="อำเภอ" />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="reg-province">จังหวัด</label>
            <input type="text" id="reg-province" name="province" value={form.province} onChange={handleChange} placeholder="จังหวัด" />
          </div>
          
          <div className="button-group">
            <button type="submit" className="btn btn-primary">สมัครสมาชิก</button>
            <Link to="/" className="btn btn-secondary">← กลับหน้าหลัก</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
