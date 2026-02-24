export default function DeliveryPanel({ availableOrders, assignedOrders, onAccept, onStatus }) {
  return (
    <div className="rounded-3xl border border-ink/10 bg-white/90 p-6 shadow-soft">
      <p className="text-xs uppercase tracking-[0.3em] text-ink/40">Delivery desk</p>
      <h2 className="mt-2 text-lg font-semibold">Pickups and drop-offs</h2>

      <h3 className="mt-4 text-sm font-semibold">Available orders</h3>
      <div className="mt-3 grid gap-3">
        {availableOrders.map((order) => (
          <div key={order._id} className="rounded-2xl border border-ink/10 bg-white p-3 text-xs">
            <p className="font-semibold">{order.restaurant?.name}</p>
            <p className="text-ink/60">Status: {order.status}</p>
            <button
              className="mt-2 rounded-full bg-lime px-3 py-1 text-xs font-semibold text-ink"
              onClick={() => onAccept(order._id)}
            >
              Accept
            </button>
          </div>
        ))}
        {availableOrders.length === 0 ? (
          <p className="text-xs text-ink/50">No available orders.</p>
        ) : null}
      </div>

      <h3 className="mt-6 text-sm font-semibold">Assigned orders</h3>
      <div className="mt-3 grid gap-3">
        {assignedOrders.map((order) => (
          <div key={order._id} className="rounded-2xl border border-ink/10 bg-white p-3 text-xs">
            <p className="font-semibold">{order.restaurant?.name}</p>
            <p className="text-ink/60">Status: {order.status}</p>
            <button
              className="mt-2 rounded-full border border-ink/20 px-3 py-1"
              onClick={() => onStatus(order._id, 'delivered')}
              disabled={order.status !== 'out_for_delivery'}
            >
              Delivered
            </button>
          </div>
        ))}
        {assignedOrders.length === 0 ? (
          <p className="text-xs text-ink/50">No assigned orders.</p>
        ) : null}
      </div>
    </div>
  );
}
