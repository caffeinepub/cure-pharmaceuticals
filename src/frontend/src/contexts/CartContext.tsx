import { createContext, useContext, useState } from "react";

export interface CartItem {
  productName: string;
  brand: string;
  dosage: string;
  price: number;
  quantity: number;
}

interface CartContextValue {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (productKey: string) => void;
  updateQuantity: (productKey: string, qty: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
}

const CartContext = createContext<CartContextValue | null>(null);

function productKey(item: Pick<CartItem, "productName" | "dosage">) {
  return `${item.productName}__${item.dosage}`;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    const key = productKey(item);
    setCartItems((prev) => {
      const existing = prev.find((i) => productKey(i) === key);
      if (existing) {
        return prev.map((i) =>
          productKey(i) === key ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (key: string) => {
    setCartItems((prev) => prev.filter((i) => productKey(i) !== key));
  };

  const updateQuantity = (key: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(key);
      return;
    }
    setCartItems((prev) =>
      prev.map((i) => (productKey(i) === key ? { ...i, quantity: qty } : i)),
    );
  };

  const clearCart = () => setCartItems([]);

  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const cartSubtotal = cartItems.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export { productKey };
