import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Points from './pages/Points'
import SelectMember from './pages/SelectMember'
import OrderService from './pages/OrderService'
import OrderProduct from './pages/OrderProduct'
import OrderProductOnly from './pages/OrderProductOnly'
import OrderPromotion from './pages/OrderPromotion'
import SummaryAll from './pages/SummaryAll'
import SummaryProduct from './pages/SummaryProduct'
import ReceiptAll from './pages/ReceiptAll'
import ReceiptProduct from './pages/ReceiptProduct'
import ReceiptPromotion from './pages/ReceiptPromotion'
import AdminDashboard from './pages/AdminDashboard'

function ProtectedRoute({ children }) {
  const isAdmin = localStorage.getItem('isAdmin') === 'true'
  if (!isAdmin) {
    return <Navigate to="/login" replace />
  }
  return children
}

function App() {
  return (
    <Routes>
      {/* Pages with layout (header + nav) */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/points" element={<Points />} />
        <Route path="/select-member/:flow" element={<SelectMember />} />
        <Route path="/order/service" element={<OrderService />} />
        <Route path="/order/product" element={<OrderProduct />} />
        <Route path="/order/product-only" element={<OrderProductOnly />} />
        <Route path="/order/promotion" element={<OrderPromotion />} />
        <Route path="/summary/all" element={<SummaryAll />} />
        <Route path="/summary/product" element={<SummaryProduct />} />
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } />
      </Route>
      
      {/* Pages without layout */}
      <Route path="/login" element={<Login />} />
      <Route path="/receipt/all" element={<ReceiptAll />} />
      <Route path="/receipt/product" element={<ReceiptProduct />} />
      <Route path="/receipt/promotion" element={<ReceiptPromotion />} />
    </Routes>
  )
}

export default App
