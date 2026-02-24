export default function VendorPanel({
  restaurants,
  selectedRestaurant,
  newRestaurant,
  onRestaurantChange,
  onCreateRestaurant,
  newMenuItem,
  onMenuChange,
  onSelectRestaurant,
  onAddMenuItem,
  vendorOrders,
  onUpdateStatus
}) {
  return (
    <div className="rounded-3xl border border-ink/10 bg-white/90 p-6 shadow-soft">
      <p className="text-xs uppercase tracking-[0.3em] text-ink/40">Vendor desk</p>
      <h2 className="mt-2 text-lg font-semibold">Manage menu + orders</h2>

      <form className="mt-4 grid gap-3" onSubmit={onCreateRestaurant}>
        <input
          className="rounded-xl border border-ink/10 bg-white px-3 py-2 text-sm"
          placeholder="Restaurant name"
          value={newRestaurant.name}
          onChange={(e) => onRestaurantChange('name', e.target.value)}
        />
        <input
          className="rounded-xl border border-ink/10 bg-white px-3 py-2 text-sm"
          placeholder="Description"
          value={newRestaurant.description}
          onChange={(e) => onRestaurantChange('description', e.target.value)}
        />
        <input
          className="rounded-xl border border-ink/10 bg-white px-3 py-2 text-sm"
          placeholder="Address"
          value={newRestaurant.address}
          onChange={(e) => onRestaurantChange('address', e.target.value)}
        />
        <button className="rounded-full bg-ink px-4 py-2 text-xs font-semibold text-sand">
          Create restaurant
        </button>
      </form>

      <form className="mt-6 grid gap-3" onSubmit={onAddMenuItem}>
        <h3 className="text-sm font-semibold">Add menu item</h3>
        <select
          className="rounded-xl border border-ink/10 bg-white px-3 py-2 text-sm"
          value={selectedRestaurant}
          onChange={(e) => onSelectRestaurant(e.target.value)}
        >
          <option value="">Select restaurant</option>
          {restaurants.map((r) => (
            <option key={r._id} value={r._id}>
              {r.name}
            </option>
          ))}
        </select>
        <input
          className="rounded-xl border border-ink/10 bg-white px-3 py-2 text-sm"
          placeholder="Menu item name"
          value={newMenuItem.name}
          onChange={(e) => onMenuChange('name', e.target.value)}
        />
        <input
          className="rounded-xl border border-ink/10 bg-white px-3 py-2 text-sm"
          placeholder="Price"
          type="number"
          min="0"
          value={newMenuItem.price}
          onChange={(e) => onMenuChange('price', e.target.value)}
        />
        <input
          className="rounded-xl border border-ink/10 bg-white px-3 py-2 text-sm"
          placeholder="Description"
          value={newMenuItem.description}
          onChange={(e) => onMenuChange('description', e.target.value)}
        />
        <input
          className="rounded-xl border border-ink/10 bg-white px-3 py-2 text-sm"
          placeholder="Image URL"
          value={newMenuItem.imageUrl}
          onChange={(e) => onMenuChange('imageUrl', e.target.value)}
        />
        <button className="rounded-full border border-ink/20 px-4 py-2 text-xs font-semibold">
          Add menu item
        </button>
      </form>

      <h3 className="mt-6 text-sm font-semibold">Incoming orders</h3>
      <div className="mt-3 grid gap-3">
        {vendorOrders.map((order) => (
          <div key={order._id} className="rounded-2xl border border-ink/10 bg-white p-3 text-xs">
            <p className="font-semibold">{order.restaurant?.name}</p>
            <p className="text-ink/60">Status: {order.status}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <button
                className="rounded-full border border-ink/20 px-3 py-1"
                onClick={() => onUpdateStatus(order._id, 'preparing')}
                disabled={order.status !== 'pending'}
              >
                Preparing
              </button>
              <button
                className="rounded-full border border-ink/20 px-3 py-1"
                onClick={() => onUpdateStatus(order._id, 'ready_for_pickup')}
                disabled={order.status !== 'preparing'}
              >
                Ready
              </button>
            </div>
          </div>
        ))}
        {vendorOrders.length === 0 ? (
          <p className="text-xs text-ink/50">No orders yet.</p>
        ) : null}
      </div>
    </div>
  );
}
