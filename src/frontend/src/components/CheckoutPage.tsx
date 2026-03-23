import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Lock, ShoppingBag } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useCart } from "../contexts/CartContext";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { usePlaceOrder } from "../hooks/useQueries";
import { useCallerUserProfile } from "../hooks/useQueries";

const SHIPPING_FEE = 10;

interface CheckoutPageProps {
  onNavigate: (path: string) => void;
}

export default function CheckoutPage({ onNavigate }: CheckoutPageProps) {
  const { identity, login } = useInternetIdentity();
  const { data: profile } = useCallerUserProfile();
  const { cartItems, cartSubtotal, clearCart } = useCart();
  const placeOrder = usePlaceOrder();

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [street, setStreet] = useState("");
  const [apartment, setApartment] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [billingSame, setBillingSame] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const total = cartSubtotal + SHIPPING_FEE;

  if (!identity || !profile) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-4">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center"
          style={{ background: "oklch(0.95 0.03 200)" }}
        >
          <Lock
            className="w-10 h-10"
            style={{ color: "oklch(0.44 0.07 200)" }}
          />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Sign in to checkout
          </h2>
          <p className="text-muted-foreground">
            You must be signed in to place an order.
          </p>
        </div>
        <Button
          data-ocid="checkout.primary_button"
          className="bg-teal-700 hover:bg-teal-800 text-white"
          onClick={() => login()}
        >
          Sign In
        </Button>
        <Button
          data-ocid="checkout.secondary_button"
          variant="outline"
          onClick={() => onNavigate("/cart")}
        >
          Back to Cart
        </Button>
      </div>
    );
  }

  const handlePlaceOrder = async () => {
    if (!agreeTerms) {
      toast.error("Please agree to the terms and conditions.");
      return;
    }
    if (
      !email ||
      !firstName ||
      !lastName ||
      !country ||
      !street ||
      !city ||
      !state ||
      !zip
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }
    try {
      const items = cartItems.map((item) => ({
        productName: `${item.productName} ${item.dosage}`,
        quantity: BigInt(item.quantity),
        price: item.price,
      }));
      const orderId = await placeOrder.mutateAsync({
        email,
        shippingAddress: {
          firstName,
          lastName,
          phone,
          country,
          streetAddress: street,
          apartment,
          city,
          state,
          zipCode: zip,
        },
        items,
        subtotal: cartSubtotal,
        shipping: SHIPPING_FEE,
        total,
      });
      clearCart();
      onNavigate(`/order-confirmation?orderId=${encodeURIComponent(orderId)}`);
    } catch {
      toast.error("Failed to place order. Please try again.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto px-4 py-10"
    >
      <h1 className="text-2xl font-bold text-foreground mb-8 flex items-center gap-3">
        <ShoppingBag
          className="w-6 h-6"
          style={{ color: "oklch(0.44 0.07 200)" }}
        />
        Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Form */}
        <div className="lg:col-span-2 space-y-8" data-ocid="checkout.panel">
          {/* MY CONTACT */}
          <section className="bg-white rounded-xl border border-border p-6 space-y-4">
            <h2
              className="text-base font-bold text-foreground uppercase tracking-wide"
              style={{ color: "oklch(0.44 0.07 200)" }}
            >
              My Contact
            </h2>
            <div>
              <Label htmlFor="email" className="text-sm font-medium">
                Email <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                data-ocid="checkout.input"
                className="mt-1"
                required
              />
            </div>
          </section>

          {/* SHIPPING TO */}
          <section className="bg-white rounded-xl border border-border p-6 space-y-4">
            <h2
              className="text-base font-bold text-foreground uppercase tracking-wide"
              style={{ color: "oklch(0.44 0.07 200)" }}
            >
              Shipping To
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="text-sm font-medium">
                  First Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="firstName"
                  placeholder="John"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  data-ocid="checkout.input"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-sm font-medium">
                  Last Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="lastName"
                  placeholder="Doe"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  data-ocid="checkout.input"
                  className="mt-1"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="phone" className="text-sm font-medium">
                Shipping Phone
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+44 7000 000000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                data-ocid="checkout.input"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="country" className="text-sm font-medium">
                Country / Region <span className="text-destructive">*</span>
              </Label>
              <Input
                id="country"
                placeholder="United Kingdom"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                data-ocid="checkout.input"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="street" className="text-sm font-medium">
                Street Address <span className="text-destructive">*</span>
              </Label>
              <Input
                id="street"
                placeholder="123 High Street"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                data-ocid="checkout.input"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="apartment" className="text-sm font-medium">
                Apartment, suite, unit etc. (optional)
              </Label>
              <Input
                id="apartment"
                placeholder="Apt 4B"
                value={apartment}
                onChange={(e) => setApartment(e.target.value)}
                data-ocid="checkout.input"
                className="mt-1"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="city" className="text-sm font-medium">
                  Town / City <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="city"
                  placeholder="London"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  data-ocid="checkout.input"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="state" className="text-sm font-medium">
                  State <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="state"
                  placeholder="England"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  data-ocid="checkout.input"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="zip" className="text-sm font-medium">
                  Zip Code <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="zip"
                  placeholder="SW1A 1AA"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  data-ocid="checkout.input"
                  className="mt-1"
                />
              </div>
            </div>
          </section>

          {/* BILLING */}
          <section className="bg-white rounded-xl border border-border p-6 space-y-4">
            <h2
              className="text-base font-bold text-foreground uppercase tracking-wide"
              style={{ color: "oklch(0.44 0.07 200)" }}
            >
              Billing To
            </h2>
            <div className="flex items-center gap-3">
              <Checkbox
                id="billingSame"
                checked={billingSame}
                onCheckedChange={(v) => setBillingSame(!!v)}
                data-ocid="checkout.checkbox"
              />
              <Label htmlFor="billingSame" className="text-sm cursor-pointer">
                Same as shipping address
              </Label>
            </div>
          </section>

          {/* Privacy Note + Terms */}
          <section className="bg-white rounded-xl border border-border p-6 space-y-4">
            <p className="text-xs text-muted-foreground leading-relaxed">
              Your personal data will be used to process your order, support
              your experience throughout this website, and for other purposes
              described in our privacy policy.
            </p>
            <div className="flex items-start gap-3">
              <Checkbox
                id="agreeTerms"
                checked={agreeTerms}
                onCheckedChange={(v) => setAgreeTerms(!!v)}
                data-ocid="checkout.checkbox"
                className="mt-0.5"
              />
              <Label
                htmlFor="agreeTerms"
                className="text-sm cursor-pointer leading-relaxed"
              >
                I have read and agree to the website{" "}
                <span className="text-teal-700 underline cursor-pointer">
                  terms and conditions
                </span>{" "}
                <span className="text-destructive">*</span>
              </Label>
            </div>
          </section>
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-1">
          <div
            className="bg-white rounded-xl border border-border p-6 space-y-4 sticky top-24"
            data-ocid="checkout.card"
          >
            <h2 className="font-bold text-foreground text-base">Your Order</h2>
            <div className="space-y-3 divide-y divide-border">
              {cartItems.map((item) => (
                <div
                  key={`${item.productName}__${item.dosage}`}
                  className="pt-3 first:pt-0 flex justify-between text-sm"
                >
                  <div>
                    <div className="font-medium text-foreground">
                      {item.productName} {item.dosage}
                    </div>
                    <div className="text-muted-foreground text-xs">
                      Qty: {item.quantity}
                    </div>
                  </div>
                  <div className="font-semibold">
                    €{(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-3 space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Sub Total</span>
                <span>€{cartSubtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Shipping</span>
                <span>€{SHIPPING_FEE.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-foreground text-base pt-1 border-t border-border">
                <span>TOTAL</span>
                <span style={{ color: "oklch(0.40 0.07 210)" }}>
                  €{total.toFixed(2)}
                </span>
              </div>
            </div>
            <Button
              data-ocid="checkout.submit_button"
              className="w-full bg-teal-700 hover:bg-teal-800 text-white font-semibold"
              disabled={!agreeTerms || placeOrder.isPending}
              onClick={handlePlaceOrder}
            >
              {placeOrder.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Placing
                  Order...
                </>
              ) : (
                "Place Order"
              )}
            </Button>
            {!agreeTerms && (
              <p
                className="text-xs text-muted-foreground text-center"
                data-ocid="checkout.error_state"
              >
                Please agree to terms to place your order.
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
