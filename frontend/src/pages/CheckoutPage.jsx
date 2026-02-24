import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import * as orderService from '../services/orderService';
import Banner from '../components/Banner';

export default function CheckoutPage() {
  const { items, clear } = useCart();
  const { token } = useAuth();
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    setError('');
    if (items.length === 0) {
      setError('Your cart is empty');
      return;
    }
    if (!address) {
      setError('Delivery address is required');
      return;
    }
    try {
      await orderService.placeOrder(token, {
        restaurantId: items[0].restaurantId,
        items: items.map((i) => ({ menuItemId: i.menuItemId, quantity: i.quantity })),
        deliveryAddress: address
      });
      clear();
      navigate('/orders');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <div className="mb-4">
        <p className="text-xs uppercase tracking-[0.3em] text-ink/50">Payment</p>
        <h2 className="mt-1 text-lg font-semibold text-ink">Checkout</h2>
      </div>
      <div className="card p-5">
        <p className="text-xs uppercase tracking-[0.3em] text-ink/50">Summary</p>
        <p className="mt-2 text-sm text-ink/60">Payment is simulated for now (no card processor).</p>
        <input
          className="mt-4 w-full rounded-xl border border-ink/10 bg-white px-3 py-2 text-sm"
          placeholder="Delivery address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-ink/60">Total</span>
          <span className="text-lg font-semibold text-ink">${subtotal.toFixed(2)}</span>
        </div>
        <button className="mt-4 w-full rounded-2xl bg-lime py-3 text-sm font-semibold text-ink shadow-soft" onClick={handleCheckout}>
          Pay & place order
        </button>
      </div>
      {error ? <div className="mt-4"><Banner tone="warn">{error}</Banner></div> : null}
    </div>
  );
}
