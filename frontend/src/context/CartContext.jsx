import { createContext, useContext, useMemo, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    const raw = localStorage.getItem('cart');
    return raw ? JSON.parse(raw) : [];
  });

  const save = (next) => {
    setItems(next);
    localStorage.setItem('cart', JSON.stringify(next));
  };

  const clear = () => save([]);

  const addItem = (item) => {
    const sameRestaurant = items.length === 0 || items[0].restaurantId === item.restaurantId;
    if (!sameRestaurant) {
      return { ok: false, reason: 'Cart has items from another restaurant' };
    }
    const existing = items.find((i) => i.menuItemId === item.menuItemId);
    if (existing) {
      const next = items.map((i) =>
        i.menuItemId === item.menuItemId
          ? { ...i, quantity: i.quantity + item.quantity }
          : i
      );
      save(next);
      return { ok: true };
    }
    save([...items, item]);
    return { ok: true };
  };

  const updateQty = (menuItemId, quantity) => {
    const next = items
      .map((i) => (i.menuItemId === menuItemId ? { ...i, quantity } : i))
      .filter((i) => i.quantity > 0);
    save(next);
  };

  const value = useMemo(
    () => ({ items, addItem, updateQty, clear }),
    [items]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used within CartProvider');
  }
  return ctx;
}
