import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import RestaurantsPage from './pages/RestaurantsPage';
import RestaurantMenuPage from './pages/RestaurantMenuPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrdersPage from './pages/OrdersPage';
import VendorDashboardPage from './pages/VendorDashboardPage';
import DeliveryDashboardPage from './pages/DeliveryDashboardPage';
import ProfilePage from './pages/ProfilePage';

export default function App() {
  const { user, logout } = useAuth();
  const homePath = user
    ? user.role === 'vendor'
      ? '/vendor'
      : user.role === 'delivery_partner'
        ? '/delivery'
        : '/restaurants'
    : '/login';

  return (
    <div className="min-h-screen bg-sand text-ink">
      <Header user={user} onLogout={logout} />
      <Routes>
        <Route path="/" element={<Navigate to={homePath} replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route
          path="/restaurants"
          element={
            <ProtectedRoute roles={['customer', 'admin']}>
              <RestaurantsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/restaurants/:id"
          element={
            <ProtectedRoute roles={['customer', 'admin']}>
              <RestaurantMenuPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute roles={['customer', 'admin']}>
              <CartPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute roles={['customer', 'admin']}>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute roles={['customer', 'admin']}>
              <OrdersPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/vendor"
          element={
            <ProtectedRoute roles={['vendor', 'admin']}>
              <VendorDashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/delivery"
          element={
            <ProtectedRoute roles={['delivery_partner', 'admin']}>
              <DeliveryDashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute roles={['customer', 'vendor', 'delivery_partner', 'admin']}>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
      </Routes>
      {user?.role === 'customer' ? <NavBar /> : null}
    </div>
  );
}
