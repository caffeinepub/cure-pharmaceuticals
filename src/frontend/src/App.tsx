import AccountPage from "@/components/AccountPage";
import AdminPanel from "@/components/AdminPanel";
import AuthButton from "@/components/AuthButton";
import RegistrationModal from "@/components/RegistrationModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import {
  CheckCircle2,
  ChevronRight,
  Clock,
  Globe,
  HeartPulse,
  Instagram,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Package,
  Pill,
  Search,
  Send,
  Shield,
  Star,
  Truck,
  X,
  Youtube,
} from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import CartPage from "./components/CartPage";
import CheckoutPage from "./components/CheckoutPage";
import OrderConfirmationPage from "./components/OrderConfirmationPage";
import { CartProvider, useCart } from "./contexts/CartContext";
import { useInternetIdentity } from "./hooks/useInternetIdentity";
import { useCallerUserProfile } from "./hooks/useQueries";

// ────────────────────────────────────────
// DATA
// ────────────────────────────────────────
interface Product {
  name: string;
  dosage: string;
  price: number;
  packaging: string;
  count: string;
  type: "tablet" | "jelly" | "sachet";
  image: string;
  strength?: string;
  manufacturedBy?: string;
  form?: string;
  packSize?: string;
  images?: string[];
}

interface Brand {
  id: string;
  name: string;
  subtitle: string;
  color: string;
  products: Product[];
}

const brands: Brand[] = [
  {
    id: "cenforce",
    name: "Cenforce",
    subtitle: "Sildenafil Citrate Tablets",
    color: "#0B6D7A",
    products: [
      {
        name: "Cenforce",
        dosage: "50mg",
        price: 55,
        packaging: "10×10 Blister",
        count: "100 Tablets",
        type: "tablet",
        image: "/assets/generated/cenforce-pack.dim_400x300.jpg",
      },
      {
        name: "Cenforce",
        dosage: "100mg",
        price: 60,
        packaging: "10×10 Blister",
        count: "100 Tablets",
        type: "tablet",
        image: "/assets/generated/cenforce-pack.dim_400x300.jpg",
      },
      {
        name: "Cenforce",
        dosage: "150mg",
        price: 65,
        packaging: "10×10 Blister",
        count: "100 Tablets",
        type: "tablet",
        image: "/assets/generated/cenforce-pack.dim_400x300.jpg",
      },
      {
        name: "Cenforce",
        dosage: "200mg",
        price: 70,
        packaging: "10×10 Blister",
        count: "100 Tablets",
        type: "tablet",
        image: "/assets/generated/cenforce-pack.dim_400x300.jpg",
      },
    ],
  },
  {
    id: "vidalista",
    name: "Vidalista",
    subtitle: "Tadalafil Tablets",
    color: "#B8670A",
    products: [
      {
        name: "Vidalista",
        dosage: "20mg",
        price: 55,
        packaging: "10×10 Blister",
        count: "100 Tablets",
        type: "tablet",
        image: "/assets/generated/vidalista-pack.dim_400x300.jpg",
      },
      {
        name: "Vidalista",
        dosage: "40mg",
        price: 62,
        packaging: "10×10 Blister",
        count: "100 Tablets",
        type: "tablet",
        image: "/assets/generated/vidalista-pack.dim_400x300.jpg",
      },
      {
        name: "Vidalista",
        dosage: "60mg",
        price: 68,
        packaging: "10×10 Blister",
        count: "100 Tablets",
        type: "tablet",
        image: "/assets/generated/vidalista-pack.dim_400x300.jpg",
      },
      {
        name: "Vidalista",
        dosage: "80mg",
        price: 75,
        packaging: "10×10 Blister",
        count: "100 Tablets",
        type: "tablet",
        image: "/assets/generated/vidalista-pack.dim_400x300.jpg",
      },
    ],
  },
  {
    id: "kamagra",
    name: "Kamagra",
    subtitle: "Sildenafil Oral Solutions",
    color: "#2B6FB3",
    products: [
      {
        name: "Kamagra",
        dosage: "Oral Jelly",
        price: 65,
        packaging: "1×7 Box",
        count: "7 Sachets",
        type: "jelly",
        image: "/assets/generated/kamagra-jelly-pack.dim_400x300.jpg",
      },
      {
        name: "Super Kamagra",
        dosage: "100mg+60mg",
        price: 50,
        packaging: "1×4 Box",
        count: "4 Tablets",
        type: "tablet",
        image: "/assets/generated/kamagra-jelly-pack.dim_400x300.jpg",
      },
    ],
  },
  {
    id: "carefill",
    name: "CareFill",
    subtitle: "Tadalafil Tablets",
    color: "#2A7A3B",
    products: [
      {
        name: "CareFill",
        dosage: "20mg",
        price: 55,
        packaging: "10×10 Blister",
        count: "100 Tablets",
        type: "tablet",
        image: "/assets/generated/carefill-pack.dim_400x300.jpg",
      },
      {
        name: "CareFill",
        dosage: "40mg",
        price: 60,
        packaging: "10×10 Blister",
        count: "100 Tablets",
        type: "tablet",
        image: "/assets/generated/carefill-pack.dim_400x300.jpg",
      },
      {
        name: "CareFill",
        dosage: "60mg",
        price: 65,
        packaging: "10×10 Blister",
        count: "100 Tablets",
        type: "tablet",
        image: "/assets/generated/carefill-pack.dim_400x300.jpg",
      },
      {
        name: "CareFill",
        dosage: "80mg",
        price: 70,
        packaging: "10×10 Blister",
        count: "100 Tablets",
        type: "tablet",
        image: "/assets/generated/carefill-pack.dim_400x300.jpg",
      },
    ],
  },
  {
    id: "lovegra",
    name: "Lovegra",
    subtitle: "Sildenafil Oral Jelly for Women",
    color: "#A0305C",
    products: [
      {
        name: "Lovegra",
        dosage: "Oral Jelly",
        price: 65,
        packaging: "1×7 Box",
        count: "7 Sachets",
        type: "jelly",
        image: "/assets/generated/kamagra-jelly-pack.dim_400x300.jpg",
      },
    ],
  },
];

const contactLinks = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    value: "+44 7492 497781",
    href: "https://wa.me/447492497781",
    icon: MessageCircle,
    color: "oklch(0.52 0.15 150)",
    bg: "oklch(0.96 0.03 150)",
    description: "Chat with us directly",
  },
  {
    id: "email",
    label: "Email",
    value: "curepharmaa@outlook.com",
    href: "mailto:curepharmaa@outlook.com",
    icon: Mail,
    color: "oklch(0.44 0.07 200)",
    bg: "oklch(0.96 0.02 200)",
    description: "Send us an email",
  },
  {
    id: "youtube",
    label: "YouTube",
    value: "@curepharmaceuticals",
    href: "https://youtube.com/@curepharmaceuticals?si=ZECq1dEdHW4nQCwX",
    icon: Youtube,
    color: "oklch(0.50 0.20 25)",
    bg: "oklch(0.97 0.03 25)",
    description: "Watch our channel",
  },
  {
    id: "instagram",
    label: "Instagram",
    value: "@cure_phramacy",
    href: "https://www.instagram.com/cure_phramacy?igsh=MXIwOGlpYWNnOTY4bw==",
    icon: Instagram,
    color: "oklch(0.50 0.18 330)",
    bg: "oklch(0.97 0.02 330)",
    description: "Follow us on Instagram",
  },
  {
    id: "telegram",
    label: "Telegram",
    value: "@CurePharma2",
    href: "https://t.me/CurePharma2",
    icon: Send,
    color: "oklch(0.50 0.14 230)",
    bg: "oklch(0.96 0.03 230)",
    description: "Message us on Telegram",
  },
];

const customerReviews = [
  {
    id: 1,
    name: "James T.",
    location: "London, UK",
    rating: 5,
    product: "Cenforce 100mg",
    review:
      "Absolutely outstanding results. Cenforce 100mg worked exactly as described — fast onset and no side effects. Delivery was discreet and arrived in 4 days. Highly recommend Cure Pharmaceuticals.",
    initials: "JT",
    color: "oklch(0.44 0.07 200)",
  },
  {
    id: 2,
    name: "Marco R.",
    location: "Amsterdam, Netherlands",
    rating: 5,
    product: "Vidalista 40mg",
    review:
      "Vidalista 40mg is the best I've tried. Long-lasting effect, well-packaged, and excellent value per box. Cure Pharma delivered to the Netherlands without any issues. Will reorder.",
    initials: "MR",
    color: "oklch(0.55 0.16 150)",
  },
  {
    id: 3,
    name: "David K.",
    location: "Manchester, UK",
    rating: 4,
    product: "Kamagra Oral Jelly",
    review:
      "Kamagra Oral Jelly is very convenient and works quickly. Packaging was secure and delivery was on time. Would give 5 stars if there was a wider flavour choice, but overall very satisfied.",
    initials: "DK",
    color: "oklch(0.50 0.18 30)",
  },
  {
    id: 4,
    name: "Stefan B.",
    location: "Berlin, Germany",
    rating: 5,
    product: "Super Kamagra",
    review:
      "Super Kamagra is excellent — dual action and very effective. Ordered from Germany and received within 5 days. Cure Pharmaceuticals keeps their promise on quality and discreet shipping.",
    initials: "SB",
    color: "oklch(0.48 0.14 270)",
  },
];

// ────────────────────────────────────────
// STAR RATING
// ────────────────────────────────────────
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className="w-4 h-4"
          style={{
            fill: star <= rating ? "oklch(0.75 0.18 75)" : "transparent",
            color:
              star <= rating ? "oklch(0.75 0.18 75)" : "oklch(0.80 0.02 200)",
          }}
        />
      ))}
    </div>
  );
}

// ────────────────────────────────────────
// PRODUCT CARD
// ────────────────────────────────────────
function ProductCard({
  product,
  index,
  onAddToCart,
}: { product: Product; index: number; onAddToCart: (p: Product) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="bg-white rounded-xl border border-border shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden group"
    >
      <div className="relative h-44 bg-gradient-to-br from-[oklch(0.96_0.02_200)] to-[oklch(0.92_0.03_200)] overflow-hidden">
        <img
          src={product.image}
          alt={`${product.name} ${product.dosage}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3">
          <Badge className="bg-primary text-white text-xs font-semibold px-2 py-0.5 rounded-md">
            {product.type === "tablet" ? "Tablets" : "Oral Jelly"}
          </Badge>
        </div>
      </div>
      <div className="p-4 space-y-3">
        <div>
          <h4 className="text-base font-bold text-foreground tracking-tight">
            {product.name}{" "}
            <span className="text-primary">{product.dosage}</span>
          </h4>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Package className="w-3.5 h-3.5 flex-shrink-0" />
          <span>{product.packaging}</span>
          <span className="text-border">•</span>
          <Pill className="w-3.5 h-3.5 flex-shrink-0" />
          <span>{product.count}</span>
        </div>
        {(product.strength || product.manufacturedBy || product.form) && (
          <div className="grid grid-cols-1 gap-0.5 text-xs border-t border-border pt-2">
            {product.strength && (
              <div className="flex gap-1">
                <span className="text-muted-foreground font-medium w-20 flex-shrink-0">
                  Strength:
                </span>
                <span className="text-foreground/80">{product.strength}</span>
              </div>
            )}
            {product.manufacturedBy && (
              <div className="flex gap-1">
                <span className="text-muted-foreground font-medium w-20 flex-shrink-0">
                  Mfr by:
                </span>
                <span className="text-foreground/80">
                  {product.manufacturedBy}
                </span>
              </div>
            )}
            {product.form && (
              <div className="flex gap-1">
                <span className="text-muted-foreground font-medium w-20 flex-shrink-0">
                  Form:
                </span>
                <span className="text-foreground/80">{product.form}</span>
              </div>
            )}
            {product.packSize && (
              <div className="flex gap-1">
                <span className="text-muted-foreground font-medium w-20 flex-shrink-0">
                  Pack Size:
                </span>
                <span className="text-foreground/80">{product.packSize}</span>
              </div>
            )}
          </div>
        )}
        <div className="flex items-center justify-between pt-1 border-t border-border">
          <span
            className="text-xl font-extrabold"
            style={{ color: "oklch(0.40 0.07 210)" }}
          >
            €{product.price}
          </span>
          <span className="text-xs text-muted-foreground">per box</span>
        </div>
        <Button
          data-ocid="catalog.primary_button"
          size="sm"
          className="w-full bg-teal-700 hover:bg-teal-800 text-white font-semibold mt-1"
          onClick={() => onAddToCart(product)}
        >
          <ShoppingCart className="w-3.5 h-3.5 mr-1.5" />
          Add to Cart
        </Button>
      </div>
    </motion.div>
  );
}

// ────────────────────────────────────────
// BRAND SECTION
// ────────────────────────────────────────
function BrandSection({
  brand,
  onAddToCart,
}: { brand: Brand; onAddToCart: (p: Product, brandName: string) => void }) {
  return (
    <section id={brand.id} className="scroll-mt-20">
      <div className="flex items-center gap-4 mb-6">
        <div
          className="w-1 h-8 rounded-full"
          style={{ backgroundColor: brand.color }}
        />
        <div>
          <h3 className="text-xl font-extrabold uppercase tracking-wide text-foreground">
            {brand.name}
          </h3>
          <p className="text-sm text-muted-foreground">{brand.subtitle}</p>
        </div>
        <div className="flex-1 h-px bg-border ml-2" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {brand.products.map((product, i) => (
          <ProductCard
            key={`${product.name}-${product.dosage}`}
            product={product}
            index={i}
            onAddToCart={(p) => onAddToCart(p, brand.name)}
          />
        ))}
      </div>
    </section>
  );
}

// ────────────────────────────────────────
// MAIN APP
// ────────────────────────────────────────

// ────────────────────────────────────────
// LIVE ACTIVITY TICKER
// ────────────────────────────────────────
const ACTIVITY_NOTIFICATIONS = [
  { action: "Order placed", detail: "Cenforce 100mg · James T., London" },
  { action: "Order confirmed", detail: "Vidalista 40mg · Marco R., Amsterdam" },
  {
    action: "Delivery dispatched",
    detail: "Kamagra Oral Jelly · Stefan B., Berlin",
  },
  { action: "Order placed", detail: "Super Kamagra 160mg · Luca M., Rome" },
  {
    action: "Package delivered",
    detail: "Cenforce 200mg · Ahmed K., Manchester",
  },
  { action: "Order placed", detail: "Vidalista 60mg · Pierre D., Paris" },
  {
    action: "Delivery dispatched",
    detail: "Kamagra 100mg · Henrik S., Stockholm",
  },
  { action: "Order confirmed", detail: "Fildena 150mg · David W., Birmingham" },
  {
    action: "Package delivered",
    detail: "Super P-Force · Arjun P., Leicester",
  },
  { action: "Order placed", detail: "Cenforce 50mg · Thomas B., Munich" },
  { action: "Order confirmed", detail: "Kamagra Polo · Mikael L., Copenhagen" },
  {
    action: "Delivery dispatched",
    detail: "Vidalista 20mg · Carlos M., Madrid",
  },
  { action: "Order placed", detail: "Extra Super Tadarise · Oliver R., Leeds" },
  { action: "Package delivered", detail: "Cenforce 100mg · Felix H., Hamburg" },
  { action: "Order confirmed", detail: "Super Kamagra · Daan V., Rotterdam" },
  { action: "Order placed", detail: "Kamagra Oral Jelly · Ethan C., Glasgow" },
  {
    action: "Delivery dispatched",
    detail: "Vidalista 40mg · Nikos P., Athens",
  },
  { action: "Order placed", detail: "Cenforce 150mg · Antoine L., Lyon" },
  { action: "Package delivered", detail: "Fildena 100mg · Kwame A., Bristol" },
  { action: "Order confirmed", detail: "Super P-Force · Rafael S., Lisbon" },
  { action: "Order placed", detail: "Kamagra 50mg · Viktor K., Vienna" },
  { action: "Delivery dispatched", detail: "Cenforce 25mg · Sven O., Oslo" },
  { action: "Order placed", detail: "Vidalista 80mg · Matteo F., Milan" },
  {
    action: "Package delivered",
    detail: "Super Kamagra 160mg · Jack H., Sheffield",
  },
  {
    action: "Order confirmed",
    detail: "Kamagra Oral Jelly · Piotr W., Warsaw",
  },
  { action: "Order placed", detail: "Cenforce 100mg · Rui C., Porto" },
  {
    action: "Delivery dispatched",
    detail: "Vidalista 40mg · Lars N., Gothenburg",
  },
  { action: "Order placed", detail: "Fildena 150mg · Ben M., Edinburgh" },
  { action: "Package delivered", detail: "Kamagra 100mg · Georg B., Zurich" },
  {
    action: "Order confirmed",
    detail: "Extra Super Tadarise · Harry T., Liverpool",
  },
  { action: "Order placed", detail: "Cenforce 200mg · Sami V., Helsinki" },
  {
    action: "Delivery dispatched",
    detail: "Super P-Force · Louis D., Brussels",
  },
];

const TIME_LABELS = [
  "just now",
  "1 min ago",
  "2 min ago",
  "2 min ago",
  "3 min ago",
  "3 min ago",
  "4 min ago",
  "5 min ago",
];

function getActionIcon(action: string) {
  if (action.startsWith("Package delivered")) return "✓";
  if (action.startsWith("Delivery dispatched")) return "🚚";
  return "📦";
}

function getActionColor(action: string) {
  if (action.startsWith("Package delivered")) return "#22c55e";
  if (action.startsWith("Delivery dispatched")) return "#3b82f6";
  return "#a855f7";
}

function LiveActivityTicker() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [timeLabel, setTimeLabel] = useState(TIME_LABELS[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % ACTIVITY_NOTIFICATIONS.length);
        setTimeLabel(
          TIME_LABELS[Math.floor(Math.random() * TIME_LABELS.length)],
        );
        setVisible(true);
      }, 400);
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  const notification = ACTIVITY_NOTIFICATIONS[index];
  const color = getActionColor(notification.action);
  const icon = getActionIcon(notification.action);

  return (
    <div
      data-ocid="activity_ticker.toast"
      style={{
        position: "fixed",
        bottom: "24px",
        left: "24px",
        zIndex: 50,
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateY(0) scale(1)"
          : "translateY(8px) scale(0.97)",
        transition: "opacity 0.4s ease, transform 0.4s ease",
        maxWidth: "300px",
        width: "calc(100vw - 48px)",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "12px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.06)",
          padding: "12px 14px",
          display: "flex",
          alignItems: "flex-start",
          gap: "10px",
          borderLeft: `3px solid ${color}`,
        }}
      >
        {/* Icon circle */}
        <div
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            background: `${color}18`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "14px",
            flexShrink: 0,
            marginTop: "1px",
          }}
        >
          {icon}
        </div>
        {/* Text */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              marginBottom: "2px",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: color,
                flexShrink: 0,
              }}
            />
            <p
              style={{
                fontSize: "12px",
                fontWeight: 600,
                color: "#111827",
                margin: 0,
                lineHeight: 1.3,
              }}
            >
              {notification.action}
            </p>
          </div>
          <p
            style={{
              fontSize: "11.5px",
              color: "#374151",
              margin: "0 0 4px 0",
              lineHeight: 1.4,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {notification.detail}
          </p>
          <p style={{ fontSize: "10.5px", color: "#9ca3af", margin: 0 }}>
            {timeLabel}
          </p>
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────
// CART ICON BUTTON
// ────────────────────────────────────────
function CartIconButton({ onNavigate }: { onNavigate: (p: string) => void }) {
  const { cartCount } = useCart();
  return (
    <button
      type="button"
      data-ocid="nav.cart_button"
      className="relative p-2 rounded-lg hover:bg-accent transition-colors"
      onClick={() => onNavigate("/cart")}
      aria-label="View cart"
    >
      <ShoppingCart className="w-5 h-5 text-foreground" />
      {cartCount > 0 && (
        <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-teal-700 text-white text-xs flex items-center justify-center font-bold">
          {cartCount > 9 ? "9+" : cartCount}
        </span>
      )}
    </button>
  );
}

function AppInner() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  // Pathname-based admin routing
  const [pathname, setPathname] = useState(() => window.location.pathname);
  useEffect(() => {
    const onPopState = () => setPathname(window.location.pathname);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);
  const { identity } = useInternetIdentity();
  const { addToCart } = useCart();

  const addToCartFromPage = (p: Product, brandName: string) => {
    addToCart({
      productName: p.name,
      brand: brandName,
      dosage: p.dosage,
      price: p.price,
    });
  };
  const { data: profile, isLoading: profileLoading } = useCallerUserProfile();

  const navigateAccount = () => {
    window.history.pushState({}, "", "/account");
    window.dispatchEvent(new PopStateEvent("popstate"));
  };
  const navigateHome = () => {
    window.history.pushState({}, "", "/");
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  const navigate = (path: string) => {
    window.history.pushState({}, "", path);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  if (pathname === "/Alexx") return <AdminPanel />;
  if (pathname === "/account") return <AccountPage onBack={navigateHome} />;
  if (pathname === "/cart") return <CartPage onNavigate={navigate} />;
  if (pathname === "/checkout") return <CheckoutPage onNavigate={navigate} />;
  if (pathname.startsWith("/order-confirmation"))
    return <OrderConfirmationPage onNavigate={navigate} />;

  // Show registration modal if logged in but no profile yet
  const showRegistration = !!identity && !profileLoading && profile === null;

  const filteredBrands = brands
    .map((brand) => ({
      ...brand,
      products: brand.products.filter(
        (p) =>
          searchQuery === "" ||
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.dosage.toLowerCase().includes(searchQuery.toLowerCase()) ||
          brand.name.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    }))
    .filter((b) => b.products.length > 0);

  const navLinks = [
    { label: "Home", href: "#" },
    { label: "Our Catalog", href: "#catalog" },
    { label: "Shipping", href: "#shipping" },
    { label: "Reviews", href: "#reviews" },
    { label: "About Us", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* ── UTILITY BAR ── */}
      <div
        className="text-white text-xs font-semibold py-2 text-center tracking-widest uppercase"
        style={{
          background:
            "linear-gradient(90deg, oklch(0.44 0.07 200), oklch(0.45 0.1 240))",
        }}
      >
        GLOBAL PHARMA SOLUTIONS — EUROPE &amp; UK FOCUSED
      </div>

      {/* ── HEADER ── */}
      <header
        className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
          scrolled ? "shadow-md" : "border-b border-border"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a
              href="#top"
              className="flex items-center gap-2.5 flex-shrink-0"
              data-ocid="nav.link"
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center text-white"
                style={{ background: "oklch(0.44 0.07 200)" }}
              >
                <HeartPulse className="w-5 h-5" />
              </div>
              <div>
                <div className="text-lg font-extrabold text-foreground tracking-tight leading-none">
                  CURE
                </div>
                <div className="text-[9px] font-semibold text-muted-foreground tracking-[0.15em] leading-none uppercase">
                  Pharmaceuticals
                </div>
              </div>
            </a>

            {/* Desktop Nav */}
            <nav
              className="hidden md:flex items-center gap-1"
              aria-label="Main navigation"
            >
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  data-ocid="nav.link"
                  className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-md hover:bg-accent"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Search + Auth + Mobile toggle */}
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-2 bg-muted border border-border rounded-lg px-3 py-1.5">
                <Search className="w-3.5 h-3.5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  data-ocid="catalog.search_input"
                  className="bg-transparent text-sm outline-none w-36 placeholder:text-muted-foreground text-foreground"
                />
              </div>
              <CartIconButton onNavigate={navigate} />
              <div className="hidden md:block">
                <AuthButton onNavigateAccount={navigateAccount} />
              </div>
              <button
                type="button"
                className="md:hidden p-2 rounded-lg hover:bg-accent"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                data-ocid="nav.toggle"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-border bg-white overflow-hidden"
            >
              <div className="px-4 py-3 space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    data-ocid="nav.link"
                    className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-primary rounded-md hover:bg-accent"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="pt-2 pb-1">
                  <div className="flex items-center gap-2 bg-muted border border-border rounded-lg px-3 py-2">
                    <Search className="w-3.5 h-3.5 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      data-ocid="catalog.search_input"
                      className="bg-transparent text-sm outline-none flex-1 placeholder:text-muted-foreground text-foreground"
                    />
                  </div>
                </div>
                <div className="pt-2 pb-2">
                  <AuthButton
                    onNavigateAccount={() => {
                      setMobileMenuOpen(false);
                      navigateAccount();
                    }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* ── HERO ── */}
        <section
          className="relative overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.96 0.02 200) 0%, oklch(0.98 0.01 220) 60%, white 100%)",
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div className="inline-flex items-center gap-2 bg-white border border-border rounded-full px-3 py-1 text-xs font-semibold text-primary">
                  <Shield className="w-3.5 h-3.5" />
                  Europe &amp; UK Distribution
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-foreground leading-tight">
                  Innovating{" "}
                  <span style={{ color: "oklch(0.44 0.07 200)" }}>
                    Healthcare
                  </span>
                  : Our Product Catalog
                </h1>
                <p className="text-base text-muted-foreground leading-relaxed max-w-md">
                  Premium pharmaceutical solutions distributed across Europe and
                  the United Kingdom. Quality-assured packaging with verified
                  dosages for healthcare professionals.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a href="#catalog" data-ocid="hero.primary_button">
                    <Button
                      className="bg-primary text-white hover:opacity-90 rounded-lg px-6 py-2.5 font-semibold text-sm gap-2"
                      style={{ background: "oklch(0.44 0.07 200)" }}
                    >
                      Browse All Products
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </a>
                  <a href="#shipping" data-ocid="hero.secondary_button">
                    <Button
                      variant="outline"
                      className="rounded-lg px-6 py-2.5 font-semibold text-sm gap-2 border-primary text-primary hover:bg-accent"
                    >
                      <Truck className="w-4 h-4" />
                      Shipping Info
                    </Button>
                  </a>
                </div>
                {/* Stats */}
                <div className="flex gap-6 pt-2">
                  {[
                    { value: "15+", label: "Products" },
                    { value: "5", label: "Brands" },
                    { value: "EU & UK", label: "Coverage" },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <div
                        className="text-xl font-extrabold"
                        style={{ color: "oklch(0.44 0.07 200)" }}
                      >
                        {stat.value}
                      </div>
                      <div className="text-xs text-muted-foreground font-medium">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="relative"
              >
                <div className="rounded-2xl overflow-hidden shadow-2xl border border-border">
                  <img
                    src="/assets/generated/pharma-hero.dim_800x450.jpg"
                    alt="Pharmaceutical product catalog"
                    className="w-full h-72 lg:h-80 object-cover"
                  />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-card border border-border p-3 flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white flex-shrink-0"
                    style={{ background: "oklch(0.44 0.07 200)" }}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-foreground">
                      Quality Verified
                    </div>
                    <div className="text-[10px] text-muted-foreground">
                      EU Standards
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── BRAND FILTER TABS ── */}
        <section className="sticky top-16 z-40 bg-white border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-none">
              <a
                href="#catalog"
                data-ocid="catalog.tab"
                className="flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide bg-primary text-white"
                style={{ background: "oklch(0.44 0.07 200)" }}
              >
                All Brands
              </a>
              {brands.map((brand) => (
                <a
                  key={brand.id}
                  href={`#${brand.id}`}
                  data-ocid="catalog.tab"
                  className="flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide border border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                >
                  {brand.name}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ── CATALOG ── */}
        <section id="catalog" className="scroll-mt-28 py-14 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl font-extrabold uppercase tracking-widest text-foreground mb-2">
                Featured Brands
              </h2>
              <p className="text-muted-foreground text-sm max-w-xl mx-auto">
                Browse our complete selection of pharmaceutical products
                available for Europe-to-Europe and UK-to-UK distribution.
              </p>
            </motion.div>

            {searchQuery && filteredBrands.length === 0 && (
              <div
                className="text-center py-16"
                data-ocid="catalog.empty_state"
              >
                <Pill className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground font-medium">
                  No products found for &quot;{searchQuery}&quot;
                </p>
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="mt-3 text-sm text-primary underline"
                >
                  Clear search
                </button>
              </div>
            )}

            <div className="space-y-14">
              {(searchQuery ? filteredBrands : brands).map((brand) => (
                <BrandSection
                  key={brand.id}
                  brand={brand}
                  onAddToCart={addToCartFromPage}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── SHIPPING ── */}
        <section
          id="shipping"
          className="py-16 scroll-mt-20"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.96 0.02 200) 0%, oklch(0.97 0.015 220) 100%)",
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <h2 className="text-2xl font-extrabold uppercase tracking-widest text-foreground mb-2">
                Shipping Information
              </h2>
              <p className="text-muted-foreground text-sm">
                We offer dedicated shipping lanes for European and UK customers.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Europe to Europe */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl border border-border shadow-card p-8"
                data-ocid="shipping.card"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white"
                    style={{ background: "oklch(0.44 0.07 200)" }}
                  >
                    <Globe className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold uppercase tracking-wide text-foreground">
                      Europe to Europe
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Intra-European Distribution
                    </p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {[
                    "Direct EU-to-EU shipping with full customs compliance",
                    "Discreet pharmaceutical packaging",
                    "Tracked delivery across all EU member states",
                    "Estimated 3–7 business days delivery",
                    "Temperature-controlled transport available",
                    "Bulk order discounts for wholesalers",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-muted-foreground"
                    >
                      <CheckCircle2
                        className="w-4 h-4 flex-shrink-0 mt-0.5"
                        style={{ color: "oklch(0.44 0.07 200)" }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* UK to UK */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl border border-border shadow-card p-8"
                data-ocid="shipping.card"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white"
                    style={{ background: "oklch(0.45 0.1 240)" }}
                  >
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold uppercase tracking-wide text-foreground">
                      UK to UK
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      United Kingdom Distribution
                    </p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {[
                    "Dedicated UK domestic shipping network",
                    "Post-Brexit compliant documentation",
                    "Next-day delivery options available",
                    "Coverage across England, Scotland, Wales & N. Ireland",
                    "Pharmaceutical-grade secure packaging",
                    "Dedicated UK customer support line",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-sm text-muted-foreground"
                    >
                      <CheckCircle2
                        className="w-4 h-4 flex-shrink-0 mt-0.5"
                        style={{ color: "oklch(0.45 0.1 240)" }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Shipping badges */}
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {[
                { icon: <Truck className="w-4 h-4" />, label: "Fast Delivery" },
                {
                  icon: <Shield className="w-4 h-4" />,
                  label: "Secure Packaging",
                },
                {
                  icon: <Clock className="w-4 h-4" />,
                  label: "On-Time Guarantee",
                },
                {
                  icon: <CheckCircle2 className="w-4 h-4" />,
                  label: "Quality Assured",
                },
              ].map((badge) => (
                <div
                  key={badge.label}
                  className="flex items-center gap-2 bg-white border border-border rounded-full px-4 py-2 text-sm font-semibold text-foreground shadow-sm"
                >
                  <span style={{ color: "oklch(0.44 0.07 200)" }}>
                    {badge.icon}
                  </span>
                  {badge.label}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CUSTOMER REVIEWS ── */}
        <section id="reviews" className="py-16 bg-white scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl font-extrabold uppercase tracking-widest text-foreground mb-2">
                Customer Reviews
              </h2>
              <p className="text-muted-foreground text-sm max-w-xl mx-auto">
                Real feedback from verified customers across Europe and the UK.
              </p>
              {/* Overall rating badge */}
              <div className="inline-flex items-center gap-2 mt-4 bg-muted border border-border rounded-full px-5 py-2">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className="w-4 h-4"
                      style={{
                        fill: "oklch(0.75 0.18 75)",
                        color: "oklch(0.75 0.18 75)",
                      }}
                    />
                  ))}
                </div>
                <span className="text-sm font-extrabold text-foreground">
                  4.8 / 5
                </span>
                <span className="text-xs text-muted-foreground">
                  based on verified orders
                </span>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {customerReviews.map((review, i) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  data-ocid="review.card"
                  className="bg-white rounded-2xl border border-border shadow-card hover:shadow-card-hover transition-all duration-300 p-6 flex flex-col gap-4"
                >
                  {/* Stars */}
                  <StarRating rating={review.rating} />

                  {/* Review text */}
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    &ldquo;{review.review}&rdquo;
                  </p>

                  {/* Product tag */}
                  <div
                    className="inline-flex items-center gap-1.5 text-[11px] font-semibold rounded-full px-2.5 py-1 w-fit"
                    style={{
                      background: `color-mix(in oklch, ${review.color} 12%, white)`,
                      color: review.color,
                    }}
                  >
                    <Pill className="w-3 h-3" />
                    {review.product}
                  </div>

                  {/* Reviewer */}
                  <div className="flex items-center gap-3 pt-1 border-t border-border">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-extrabold flex-shrink-0"
                      style={{ background: review.color }}
                    >
                      {review.initials}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-foreground">
                        {review.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {review.location}
                      </div>
                    </div>
                    <CheckCircle2
                      className="w-4 h-4 ml-auto flex-shrink-0"
                      style={{ color: "oklch(0.52 0.15 150)" }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section
          id="about"
          className="py-16 scroll-mt-20"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.96 0.02 200) 0%, oklch(0.97 0.015 220) 100%)",
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-5"
              >
                <h2 className="text-2xl font-extrabold uppercase tracking-widest text-foreground">
                  About Cure Pharmaceuticals
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Cure Pharmaceuticals is a leading distributor of high-quality
                  generic pharmaceutical products across Europe and the United
                  Kingdom. We partner with certified manufacturers to deliver
                  verified, efficacious medications to healthcare professionals
                  and distributors.
                </p>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Our catalog features a curated selection of trusted brands
                  including Cenforce, Vidalista, Kamagra, CareFill, and Lovegra
                  — all manufactured to the highest pharmaceutical standards.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  {[
                    { value: "100%", label: "Quality Guaranteed" },
                    { value: "EU/UK", label: "Regulated Supply" },
                    { value: "5+", label: "Trusted Brands" },
                    { value: "24/7", label: "Support Available" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="bg-white rounded-xl p-4 border border-border"
                    >
                      <div
                        className="text-2xl font-extrabold"
                        style={{ color: "oklch(0.44 0.07 200)" }}
                      >
                        {stat.value}
                      </div>
                      <div className="text-xs text-muted-foreground font-medium mt-1">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-3"
              >
                {brands.slice(0, 4).map((brand) => (
                  <a
                    key={brand.id}
                    href={`#${brand.id}`}
                    data-ocid="about.card"
                    className="bg-white rounded-xl p-5 border border-border hover:border-primary hover:shadow-card transition-all"
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-white mb-3 text-xs font-extrabold"
                      style={{ backgroundColor: brand.color }}
                    >
                      {brand.name.charAt(0)}
                    </div>
                    <div className="font-bold text-sm text-foreground">
                      {brand.name}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {brand.subtitle}
                    </div>
                    <div
                      className="text-xs font-semibold mt-2"
                      style={{ color: "oklch(0.44 0.07 200)" }}
                    >
                      {brand.products.length} variants
                    </div>
                  </a>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" className="py-16 scroll-mt-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl font-extrabold uppercase tracking-widest text-foreground mb-2">
                Get In Touch
              </h2>
              <p className="text-muted-foreground text-sm max-w-xl mx-auto">
                Reach out to us via any of the channels below. We&apos;re
                available to assist with orders, enquiries, and distribution
                partnerships.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
              {contactLinks.map((contact, i) => {
                const Icon = contact.icon;
                return (
                  <motion.a
                    key={contact.id}
                    href={contact.href}
                    target={contact.id !== "email" ? "_blank" : undefined}
                    rel={
                      contact.id !== "email" ? "noopener noreferrer" : undefined
                    }
                    data-ocid={`contact.${contact.id === "whatsapp" ? "primary_button" : "secondary_button"}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="group bg-white rounded-2xl border border-border shadow-card hover:shadow-card-hover transition-all duration-300 p-6 flex flex-col items-start gap-4 cursor-pointer"
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
                      style={{ background: contact.bg }}
                    >
                      <Icon
                        className="w-6 h-6"
                        style={{ color: contact.color }}
                      />
                    </div>
                    <div className="space-y-1 min-w-0">
                      <div className="text-xs font-extrabold uppercase tracking-widest text-muted-foreground">
                        {contact.label}
                      </div>
                      <div
                        className="text-sm font-bold break-all leading-snug"
                        style={{ color: contact.color }}
                      >
                        {contact.value}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {contact.description}
                      </div>
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer
        className="text-white"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.25 0.05 200) 0%, oklch(0.2 0.04 230) 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            {/* Company */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
                  style={{ background: "oklch(0.44 0.07 200)" }}
                >
                  <HeartPulse className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-extrabold tracking-tight">
                    CURE
                  </div>
                  <div className="text-[8px] tracking-[0.15em] opacity-70 uppercase">
                    Pharmaceuticals
                  </div>
                </div>
              </div>
              <p className="text-xs opacity-70 leading-relaxed">
                Premium pharmaceutical distribution for Europe and the United
                Kingdom.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-xs font-extrabold uppercase tracking-widest mb-4 opacity-90">
                Quick Links
              </h4>
              <ul className="space-y-2">
                {[
                  { label: "Home", href: "#" },
                  { label: "Our Catalog", href: "#catalog" },
                  { label: "Shipping & Delivery", href: "#shipping" },
                  { label: "Reviews", href: "#reviews" },
                  { label: "About Us", href: "#about" },
                  { label: "Contact", href: "#contact" },
                ].map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-xs opacity-70 hover:opacity-100 transition-opacity"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Brands */}
            <div>
              <h4 className="text-xs font-extrabold uppercase tracking-widest mb-4 opacity-90">
                Our Brands
              </h4>
              <ul className="space-y-2">
                {brands.map((brand) => (
                  <li key={brand.id}>
                    <a
                      href={`#${brand.id}`}
                      className="text-xs opacity-70 hover:opacity-100 transition-opacity"
                    >
                      {brand.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Distribution */}
            <div>
              <h4 className="text-xs font-extrabold uppercase tracking-widest mb-4 opacity-90">
                Distribution
              </h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-xs opacity-70">
                  <Globe className="w-3.5 h-3.5 flex-shrink-0" />
                  Europe to Europe
                </li>
                <li className="flex items-center gap-2 text-xs opacity-70">
                  <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                  UK to UK
                </li>
                <li className="flex items-center gap-2 text-xs opacity-70">
                  <Shield className="w-3.5 h-3.5 flex-shrink-0" />
                  Quality Assured
                </li>
                <li className="flex items-center gap-2 text-xs opacity-70">
                  <Truck className="w-3.5 h-3.5 flex-shrink-0" />
                  Tracked Delivery
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs opacity-50">
              © {new Date().getFullYear()} Cure Pharmaceuticals. All rights
              reserved.
            </p>
            <p className="text-xs opacity-50">
              Built with love using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:opacity-80"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
      <LiveActivityTicker />
      <RegistrationModal open={showRegistration} />
      <Toaster richColors position="top-right" />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppInner />
    </CartProvider>
  );
}
