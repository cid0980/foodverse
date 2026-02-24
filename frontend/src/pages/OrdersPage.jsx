import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import * as orderService from '../services/orderService';

export default function OrdersPage() {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    orderService.listMyOrders(token).then((data) => setOrders(data.orders || []));
  }, [token]);

  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <h2 className="text-lg font-semibold text-ink">My orders</h2>
      <div className="mt-6 grid gap-3">
        {orders.map((order) => (
          <div key={order._id} className="rounded-2xl border border-ink/10 bg-white p-3 text-xs">
            <p className="font-semibold">{order.restaurant?.name}</p>
            <p className="text-ink/60">Status: {order.status}</p>
            <p className="text-ink/60">Total: ${order.total.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
