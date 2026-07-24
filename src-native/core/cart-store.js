import { getDemoProduct } from './demo-catalog.js';

export function createCartStore() {
  const quantities = new Map();
  const listeners = new Set();

  function snapshot() {
    const items = [...quantities.entries()].map(([productId, quantity]) => {
      const product = getDemoProduct(productId);
      return product ? { ...product, quantity, lineTotal: product.price * quantity } : null;
    }).filter(Boolean);
    return Object.freeze({
      items,
      count: items.reduce((sum, item) => sum + item.quantity, 0),
      total: items.reduce((sum, item) => sum + item.lineTotal, 0),
    });
  }

  function emit() {
    const state = snapshot();
    listeners.forEach((listener) => listener(state));
  }

  return Object.freeze({
    subscribe(listener) {
      listeners.add(listener);
      listener(snapshot());
      return () => listeners.delete(listener);
    },
    add(productId) {
      if (!getDemoProduct(productId)) return;
      quantities.set(productId, (quantities.get(productId) ?? 0) + 1);
      emit();
    },
    setQuantity(productId, quantity) {
      if (!getDemoProduct(productId)) return;
      if (quantity <= 0) quantities.delete(productId);
      else quantities.set(productId, quantity);
      emit();
    },
    clear() {
      quantities.clear();
      emit();
    },
    getState: snapshot,
  });
}
