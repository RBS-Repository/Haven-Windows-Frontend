import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import CategoryDetail from './pages/CategoryDetail';
import ProductDetail from './pages/ProductDetail';
import WhyUpvc from './pages/WhyUpvc';
import FAQ from './pages/FAQ';
import Terms from './pages/Terms';
import VekaSystem from './pages/VekaSystem';
import StickyBottomNav from './components/StickyBottomNav';

// Admin imports
import { AdminProvider } from './context/AdminContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminPromo from './pages/admin/AdminPromo';
import AdminGallery from './pages/admin/AdminGallery';

function App() {
  return (
    <AuthProvider>
      <AdminProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            {/* Login Route */}
            <Route path="/login" element={<Login />} />

            {/* Admin Routes - No Navbar/Footer */}
            <Route path="/admin-8f3kL2x9" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="promo" element={<AdminPromo />} />
            <Route path="gallery" element={<AdminGallery />} />
          </Route>

          {/* Public Routes */}
          <Route path="/*" element={
            <div className="min-h-screen bg-white pb-20 md:pb-24 overflow-x-hidden">
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/category/:id" element={<CategoryDetail />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/why-upvc" element={<WhyUpvc />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/veka-system" element={<VekaSystem />} />
              </Routes>
              <Footer />
              <StickyBottomNav />
            </div>
          } />
        </Routes>
        </Router>
      </AdminProvider>
    </AuthProvider>
  );
}

export default App;
