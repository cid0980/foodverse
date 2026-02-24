import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const { items, updateQty } = useCart();
  const navigate = useNavigate();

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-ink/50">Checkout</p>
          <h2 className="mt-1 text-lg font-semibold text-ink">Your cart</h2>
        </div>
        <Link to="/restaurants" className="text-xs font-semibold text-ink/60">Back to restaurants</Link>
      </div>
      <div className="mt-6 space-y-4">
        {items.map((item) => (
          <div key={item.menuItemId} className="card flex items-center gap-4 p-4">
            <div className="h-16 w-16 rounded-2xl bg-sand" />
            <div className="flex-1">
              <p className="text-sm font-semibold text-ink">{item.name}</p>
              <p className="text-xs text-coral">${item.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="rounded-full border border-coral px-2 py-1 text-xs text-coral shadow-soft"
                onClick={() => updateQty(item.menuItemId, item.quantity - 1)}
              >
                -
              </button>
              <span className="text-sm font-semibold text-ink">{item.quantity}</span>
              <button
                className="rounded-full border border-coral px-2 py-1 text-xs text-coral shadow-soft"
                onClick={() => updateQty(item.menuItemId, item.quantity + 1)}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 card p-5">
        <div className="flex items-center justify-between text-sm">
          <span className="text-ink/60">Subtotal</span>
          <span className="text-lg font-semibold text-ink">${subtotal.toFixed(2)}</span>
        </div>
        <button
          className="mt-4 w-full rounded-2xl bg-lime py-3 text-sm font-semibold text-ink shadow-soft"
          onClick={() => navigate('/checkout')}
          disabled={items.length === 0}
        >
          Proceed to checkout
        </button>
      </div>
    </div>
  );
}
