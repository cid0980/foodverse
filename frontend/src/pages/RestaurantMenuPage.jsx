import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import * as restaurantService from '../services/restaurantService';
import { useCart } from '../context/CartContext';

export default function RestaurantMenuPage() {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [menu, setMenu] = useState([]);
  const [error, setError] = useState('');
  const { addItem, clear } = useCart();

  useEffect(() => {
    restaurantService.getRestaurant(id).then((data) => {
      setRestaurant(data.restaurant);
      setMenu(data.menu || []);
    });
  }, [id]);

  const handleAdd = (item) => {
    const res = addItem({
      restaurantId: restaurant._id,
      menuItemId: item._id,
      name: item.name,
      price: item.price,
      quantity: 1
    });
    if (!res.ok) {
      setError(res.reason);
    } else {
      setError('');
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-ink/50">Menu</p>
          <h2 className="mt-1 text-lg font-semibold text-ink">{restaurant?.name || 'Menu'}</h2>
          <p className="text-xs text-ink/60">{restaurant?.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="rounded-full border border-ink/20 bg-white px-3 py-1 text-xs font-semibold shadow-soft"
            onClick={() => {
              clear();
              setError('');
            }}
          >
            Clear cart
          </button>
          <Link
            to="/cart"
            className="rounded-full bg-lime px-3 py-1 text-xs font-semibold text-ink shadow-soft"
          >
            Go to cart
          </Link>
        </div>
      </div>
      {error ? <p className="mt-4 text-xs text-coral">{error}</p> : null}
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {menu.map((item) => (
          <article key={item._id} className="card p-4">
            <div className="h-36 rounded-2xl bg-sand">
              {item.imageUrl ? (
                <img src={item.imageUrl} alt={item.name} className="h-full w-full rounded-2xl object-cover" />
              ) : null}
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-ink">{item.name}</h3>
                <p className="text-xs text-ink/60">{item.description || 'No description'}</p>
              </div>
              <span className="text-sm font-semibold text-coral">${item.price.toFixed(2)}</span>
            </div>
            <button
              className="mt-3 rounded-full border border-ink/20 bg-white px-4 py-2 text-xs font-semibold shadow-soft"
              onClick={() => handleAdd(item)}
            >
              Add to cart
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
