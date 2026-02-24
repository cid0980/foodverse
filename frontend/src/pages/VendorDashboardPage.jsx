import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import * as restaurantService from '../services/restaurantService';
import * as orderService from '../services/orderService';
import Banner from '../components/Banner';

export default function VendorDashboardPage() {
  const { token } = useAuth();
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState('');
  const [newRestaurant, setNewRestaurant] = useState({ name: '', description: '', address: '' });
  const [newMenuItem, setNewMenuItem] = useState({ name: '', price: '', description: '', imageUrl: '' });
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  const loadRestaurants = async () => {
    const data = await restaurantService.listRestaurants();
    setRestaurants(data.restaurants || []);
  };

  const loadOrders = async () => {
    const data = await orderService.listVendorOrders(token);
    setOrders(data.orders || []);
  };

  useEffect(() => {
    loadRestaurants();
    loadOrders();
  }, []);

  const handleCreateRestaurant = async (e) => {
    e.preventDefault();
    setError('');
    if (!newRestaurant.name) {
      setError('Restaurant name is required');
      return;
    }
    await restaurantService.createRestaurant(token, newRestaurant);
    setNewRestaurant({ name: '', description: '', address: '' });
    await loadRestaurants();
  };

  const handleAddMenuItem = async (e) => {
    e.preventDefault();
    setError('');
    if (!selectedRestaurant) {
      setError('Select a restaurant first');
      return;
    }
    if (!newMenuItem.name || !newMenuItem.price) {
      setError('Menu item name and price are required');
      return;
    }
    await restaurantService.addMenuItem(token, selectedRestaurant, {
      ...newMenuItem,
      price: Number(newMenuItem.price)
    });
    setNewMenuItem({ name: '', price: '', description: '', imageUrl: '' });
  };

  const updateStatus = async (orderId, status) => {
    await orderService.updateOrderStatus(token, orderId, status);
    await loadOrders();
  };

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <p className="text-xs uppercase tracking-[0.3em] text-ink/50">Vendor</p>
      <h2 className="mt-1 text-lg font-semibold text-ink">Vendor dashboard</h2>
      {error ? <div className="mt-4"><Banner tone="warn">{error}</Banner></div> : null}

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="card p-5">
          <h3 className="text-sm font-semibold">Create restaurant</h3>
          <form className="mt-3 grid gap-3" onSubmit={handleCreateRestaurant}>
            <input className="rounded-xl border border-ink/10 bg-white px-3 py-2 text-sm" placeholder="Name" value={newRestaurant.name} onChange={(e) => setNewRestaurant((p) => ({ ...p, name: e.target.value }))} />
            <input className="rounded-xl border border-ink/10 bg-white px-3 py-2 text-sm" placeholder="Description" value={newRestaurant.description} onChange={(e) => setNewRestaurant((p) => ({ ...p, description: e.target.value }))} />
            <input className="rounded-xl border border-ink/10 bg-white px-3 py-2 text-sm" placeholder="Address" value={newRestaurant.address} onChange={(e) => setNewRestaurant((p) => ({ ...p, address: e.target.value }))} />
            <button className="rounded-full bg-ink px-4 py-2 text-xs font-semibold text-sand">Create</button>
          </form>
        </div>

        <div className="card p-5">
          <h3 className="text-sm font-semibold">Add menu item</h3>
          <form className="mt-3 grid gap-3" onSubmit={handleAddMenuItem}>
            <select className="rounded-xl border border-ink/10 bg-white px-3 py-2 text-sm" value={selectedRestaurant} onChange={(e) => setSelectedRestaurant(e.target.value)}>
              <option value="">Select restaurant</option>
              {restaurants.map((r) => (
                <option key={r._id} value={r._id}>{r.name}</option>
              ))}
            </select>
            <input className="rounded-xl border border-ink/10 bg-white px-3 py-2 text-sm" placeholder="Name" value={newMenuItem.name} onChange={(e) => setNewMenuItem((p) => ({ ...p, name: e.target.value }))} />
            <input className="rounded-xl border border-ink/10 bg-white px-3 py-2 text-sm" placeholder="Price" type="number" value={newMenuItem.price} onChange={(e) => setNewMenuItem((p) => ({ ...p, price: e.target.value }))} />
            <input className="rounded-xl border border-ink/10 bg-white px-3 py-2 text-sm" placeholder="Description" value={newMenuItem.description} onChange={(e) => setNewMenuItem((p) => ({ ...p, description: e.target.value }))} />
            <input className="rounded-xl border border-ink/10 bg-white px-3 py-2 text-sm" placeholder="Image URL" value={newMenuItem.imageUrl} onChange={(e) => setNewMenuItem((p) => ({ ...p, imageUrl: e.target.value }))} />
            <button className="rounded-full border border-ink/20 px-4 py-2 text-xs font-semibold">Add</button>
          </form>
        </div>
      </div>

      <div className="mt-8 card p-5">
        <h3 className="text-sm font-semibold">Incoming orders</h3>
        <div className="mt-3 grid gap-3">
          {orders.map((order) => (
            <div key={order._id} className="rounded-2xl border border-ink/10 bg-white p-3 text-xs shadow-soft">
              <p className="font-semibold">{order.restaurant?.name}</p>
              <p className="text-ink/60">Status: {order.status}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <button className="rounded-full border border-ink/20 px-3 py-1" onClick={() => updateStatus(order._id, 'preparing')} disabled={order.status !== 'pending'}>Preparing</button>
                <button className="rounded-full border border-ink/20 px-3 py-1" onClick={() => updateStatus(order._id, 'ready_for_pickup')} disabled={order.status !== 'preparing'}>Ready</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
