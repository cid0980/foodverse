import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as restaurantService from '../services/restaurantService';

export default function RestaurantsPage() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    restaurantService.listRestaurants().then((data) => setRestaurants(data.restaurants || []));
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-ink/50">Discover</p>
          <h2 className="mt-1 text-lg font-semibold text-ink">Restaurants</h2>
        </div>
        <Link
          to="/cart"
          className="rounded-full border border-ink/20 bg-white px-4 py-2 text-xs font-semibold shadow-soft"
        >
          View cart
        </Link>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {restaurants.map((r) => (
          <article key={r._id} className="card p-4">
            <div className="h-36 rounded-2xl bg-sand" />
            <div className="mt-4">
              <h3 className="text-base font-semibold text-ink">{r.name}</h3>
              <p className="text-xs text-ink/60">{r.description || 'No description'}</p>
              <Link
                to={`/restaurants/${r._id}`}
                className="mt-4 inline-flex rounded-full bg-lime px-4 py-2 text-xs font-semibold text-ink shadow-soft"
              >
                View menu
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
