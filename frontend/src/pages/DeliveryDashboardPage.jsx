import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import * as orderService from '../services/orderService';

export default function DeliveryDashboardPage() {
  const { token } = useAuth();
  const [available, setAvailable] = useState([]);
  const [assigned, setAssigned] = useState([]);

  const load = async () => {
    const [availableRes, assignedRes] = await Promise.all([
      orderService.listAvailableOrders(token),
      orderService.listMyOrders(token)
    ]);
    setAvailable(availableRes.orders || []);
    setAssigned(assignedRes.orders || []);
  };

  useEffect(() => {
    load();
  }, []);

  const accept = async (id) => {
    await orderService.acceptOrder(token, id);
    await load();
  };

  const deliver = async (id) => {
    await orderService.updateOrderStatus(token, id, 'delivered');
    await load();
  };

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <p className="text-xs uppercase tracking-[0.3em] text-ink/50">Delivery</p>
      <h2 className="mt-1 text-lg font-semibold text-ink">Delivery dashboard</h2>
      <div className="mt-6 card p-5">
        <h3 className="text-sm font-semibold">Available orders</h3>
        <div className="mt-3 grid gap-3">
          {available.map((order) => (
            <div key={order._id} className="rounded-2xl border border-ink/10 bg-white p-3 text-xs">
              <p className="font-semibold">{order.restaurant?.name}</p>
              <p className="text-ink/60">Status: {order.status}</p>
              <button className="mt-2 rounded-full bg-lime px-3 py-1 text-xs font-semibold text-ink" onClick={() => accept(order._id)}>
                Accept
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 card p-5">
        <h3 className="text-sm font-semibold">Assigned orders</h3>
        <div className="mt-3 grid gap-3">
          {assigned.map((order) => (
            <div key={order._id} className="rounded-2xl border border-ink/10 bg-white p-3 text-xs">
              <p className="font-semibold">{order.restaurant?.name}</p>
              <p className="text-ink/60">Status: {order.status}</p>
              <button className="mt-2 rounded-full border border-ink/20 px-3 py-1" onClick={() => deliver(order._id)} disabled={order.status !== 'out_for_delivery'}>
                Delivered
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
