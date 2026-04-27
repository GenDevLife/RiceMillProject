import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="action-buttons">
      <Link to="/select-member/service">บริการและสินค้า</Link>
      <Link to="/select-member/product">สินค้า</Link>
      <Link to="/points">คะแนนสะสม</Link>
      <Link to="/select-member/promotion">ใช้โปรโมชั่น</Link>
      <Link to="/register">สมัครสมาชิก</Link>
    </div>
  )
}

export default Home
