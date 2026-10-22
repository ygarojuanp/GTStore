import { useMemo, useState } from "react";
import CartContext from "./CartContext";

export default function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  function addItem(product) {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }

      return [...currentItems, { ...product, quantity: 1 }];
    });
  }

  function removeItem(productId) {
    setItems((currentItems) => currentItems.filter((item) => item.id !== productId));
  }

  function clearCart() {
    setItems([]);
  }

  function updateQuantity(productId, quantity) {
    if (quantity < 1) {
      removeItem(productId);
      return;
    }

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item,
      ),
    );
  }

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items],
  );

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  const value = useMemo(
    () => ({ items, addItem, removeItem, updateQuantity, clearCart, total, itemCount }),
    [items, total, itemCount],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}