export default function CustomerPanel({
  restaurants,
  menuItems,
  orderForm,
  onSelectRestaurant,
  onSelectMenuItem,
  onOrderChange,
  onCreateOrder,
  orders
}) {
  return (
    <div className="rounded-3xl border border-ink/10 bg-white/90 p-6 shadow-soft">
      <p className="text-xs uppercase tracking-[0.3em] text-ink/40">User desk</p>
      <h2 className="mt-2 text-lg font-semibold">Place an order</h2>
      <form className="mt-4 grid gap-3" onSubmit={onCreateOrder}>
        <select
          className="rounded-xl border border-ink/10 bg-white px-3 py-2 text-sm"
          value={orderForm.restaurantId}
          onChange={(e) => onSelectRestaurant(e.target.value)}
        >
          <option value="">Select restaurant</option>
          {restaurants.map((r) => (
            <option key={r._id} value={r._id}>
              {r.name}
            </option>
          ))}
        </select>
        <select
          className="rounded-xl border border-ink/10 bg-white px-3 py-2 text-sm"
          value={orderForm.menuItemId}
          onChange={(e) => onSelectMenuItem(e.target.value)}
        >
          <option value="">Select menu item</option>
          {menuItems.map((item) => (
            <option key={item._id} value={item._id}>
              {item.name}
            </option>
          ))}
        </select>
        <input
          className="rounded-xl border border-ink/10 bg-white px-3 py-2 text-sm"
          type="number"
          min="1"
          value={orderForm.quantity}
          onChange={(e) => onOrderChange('quantity', e.target.value)}
        />
        <input
          className="rounded-xl border border-ink/10 bg-white px-3 py-2 text-sm"
          placeholder="Delivery address"
          value={orderForm.deliveryAddress}
          onChange={(e) => onOrderChange('deliveryAddress', e.target.value)}
        />
        <button className="rounded-full bg-lime px-4 py-2 text-xs font-semibold text-ink">
          Place order
        </button>
      </form>

      <h3 className="mt-6 text-sm font-semibold">My orders</h3>
      <div className="mt-3 grid gap-3">
        {orders.map((order) => (
          <div key={order._id} className="rounded-2xl border border-ink/10 bg-white p-3 text-xs">
            <p className="font-semibold">{order.restaurant?.name}</p>
            <p className="text-ink/60">Status: {order.status}</p>
            <p className="text-ink/60">Total: ${order.total.toFixed(2)}</p>
          </div>
        ))}
        {orders.length === 0 ? <p className="text-xs text-ink/50">No orders yet.</p> : null}
      </div>
    </div>
  );
}
