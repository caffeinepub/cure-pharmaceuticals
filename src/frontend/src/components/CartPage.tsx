import { Button } from "@/components/ui/button";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { motion } from "motion/react";
import { productKey, useCart } from "../contexts/CartContext";

interface CartPageProps {
  onNavigate: (path: string) => void;
}

export default function CartPage({ onNavigate }: CartPageProps) {
  const { cartItems, removeFromCart, updateQuantity, cartSubtotal } = useCart();
  const SHIPPING = cartItems.length > 0 ? 10 : 0;
  const total = cartSubtotal + SHIPPING;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-4">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{ background: "oklch(0.95 0.03 200)" }}
        >
          <ShoppingCart
            className="w-10 h-10"
            style={{ color: "oklch(0.44 0.07 200)" }}
          />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Your cart is empty
          </h2>
          <p className="text-muted-foreground">
            Add some products to get started.
          </p>
        </div>
        <Button
          data-ocid="cart.primary_button"
          onClick={() => onNavigate("/")}
          className="bg-teal-700 hover:bg-teal-800 text-white"
        >
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto px-4 py-10"
    >
      <h1 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-3">
        <ShoppingCart
          className="w-6 h-6"
          style={{ color: "oklch(0.44 0.07 200)" }}
        />
        Shopping Cart
      </h1>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-border bg-white shadow-sm">
        <table className="w-full" data-ocid="cart.table">
          <thead>
            <tr className="bg-muted text-sm text-muted-foreground">
              <th className="text-left px-4 py-3 font-semibold">Product</th>
              <th className="text-right px-4 py-3 font-semibold">Price</th>
              <th className="text-center px-4 py-3 font-semibold">Quantity</th>
              <th className="text-right px-4 py-3 font-semibold">Subtotal</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {cartItems.map((item, i) => {
              const key = productKey(item);
              return (
                <tr key={key} data-ocid={`cart.item.${i + 1}`}>
                  <td className="px-4 py-4">
                    <div className="font-semibold text-foreground">
                      {item.productName} {item.dosage}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {item.brand}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-right font-medium">
                    €{item.price}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        type="button"
                        data-ocid={`cart.secondary_button.${i + 1}`}
                        onClick={() => updateQuantity(key, item.quantity - 1)}
                        className="w-7 h-7 rounded-md border border-border flex items-center justify-center hover:bg-muted transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        data-ocid={`cart.primary_button.${i + 1}`}
                        onClick={() => updateQuantity(key, item.quantity + 1)}
                        className="w-7 h-7 rounded-md border border-border flex items-center justify-center hover:bg-muted transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                  <td
                    className="px-4 py-4 text-right font-semibold"
                    style={{ color: "oklch(0.40 0.07 210)" }}
                  >
                    €{(item.price * item.quantity).toFixed(2)}
                  </td>
                  <td className="px-4 py-4 text-center">
                    <button
                      type="button"
                      data-ocid={`cart.delete_button.${i + 1}`}
                      onClick={() => removeFromCart(key)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Summary */}
      <div className="mt-6 flex flex-col items-end gap-1">
        <div className="w-full max-w-xs space-y-2 bg-white rounded-xl border border-border p-5">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Subtotal</span>
            <span>€{cartSubtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Shipping</span>
            <span>€{SHIPPING.toFixed(2)}</span>
          </div>
          <div className="border-t border-border pt-2 flex justify-between font-bold text-foreground text-base">
            <span>Total</span>
            <span style={{ color: "oklch(0.40 0.07 210)" }}>
              €{total.toFixed(2)}
            </span>
          </div>
        </div>
        <div className="flex gap-3 mt-4">
          <Button
            data-ocid="cart.secondary_button"
            variant="outline"
            onClick={() => onNavigate("/")}
          >
            Continue Shopping
          </Button>
          <Button
            data-ocid="cart.primary_button"
            className="bg-teal-700 hover:bg-teal-800 text-white"
            onClick={() => onNavigate("/checkout")}
          >
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
