import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, EyeOff, LogOut, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

// ────────────────────────────────────────
// Types
// ────────────────────────────────────────
interface AdminProduct {
  brand: string;
  name: string;
  dosage: string;
  price: number;
  packaging: string;
  count: string;
}

interface AdminReview {
  id: number;
  name: string;
  location: string;
  rating: number;
  product: string;
  review: string;
}

interface AdminNotification {
  id: number;
  action: string;
  detail: string;
}

// ────────────────────────────────────────
// Initial data
// ────────────────────────────────────────
const initialProducts: AdminProduct[] = [
  {
    brand: "Cenforce",
    name: "Cenforce",
    dosage: "50mg",
    price: 55,
    packaging: "10×10 Blister",
    count: "100 Tablets",
  },
  {
    brand: "Cenforce",
    name: "Cenforce",
    dosage: "100mg",
    price: 60,
    packaging: "10×10 Blister",
    count: "100 Tablets",
  },
  {
    brand: "Cenforce",
    name: "Cenforce",
    dosage: "150mg",
    price: 65,
    packaging: "10×10 Blister",
    count: "100 Tablets",
  },
  {
    brand: "Cenforce",
    name: "Cenforce",
    dosage: "200mg",
    price: 70,
    packaging: "10×10 Blister",
    count: "100 Tablets",
  },
  {
    brand: "Vidalista",
    name: "Vidalista",
    dosage: "20mg",
    price: 55,
    packaging: "10×10 Blister",
    count: "100 Tablets",
  },
  {
    brand: "Vidalista",
    name: "Vidalista",
    dosage: "40mg",
    price: 60,
    packaging: "10×10 Blister",
    count: "100 Tablets",
  },
  {
    brand: "Vidalista",
    name: "Vidalista",
    dosage: "60mg",
    price: 65,
    packaging: "10×10 Blister",
    count: "100 Tablets",
  },
  {
    brand: "Kamagra",
    name: "Kamagra",
    dosage: "100mg",
    price: 55,
    packaging: "10×10 Blister",
    count: "100 Tablets",
  },
  {
    brand: "Kamagra",
    name: "Kamagra Oral Jelly",
    dosage: "100mg",
    price: 60,
    packaging: "1×7 Box",
    count: "7 Sachets",
  },
  {
    brand: "Kamagra",
    name: "Kamagra Polo",
    dosage: "100mg",
    price: 50,
    packaging: "1×4 Strip",
    count: "4 Tablets",
  },
  {
    brand: "Kamagra",
    name: "Super Kamagra",
    dosage: "160mg",
    price: 75,
    packaging: "4×4 Blister",
    count: "16 Tablets",
  },
  {
    brand: "Fildena",
    name: "Fildena",
    dosage: "100mg",
    price: 55,
    packaging: "10×10 Blister",
    count: "100 Tablets",
  },
  {
    brand: "Fildena",
    name: "Fildena",
    dosage: "150mg",
    price: 65,
    packaging: "10×10 Blister",
    count: "100 Tablets",
  },
  {
    brand: "Fildena",
    name: "Super P-Force",
    dosage: "160mg",
    price: 75,
    packaging: "4×4 Blister",
    count: "16 Tablets",
  },
  {
    brand: "Lovegra",
    name: "Lovegra",
    dosage: "Oral Jelly",
    price: 65,
    packaging: "1×7 Box",
    count: "7 Sachets",
  },
];

const initialReviews: AdminReview[] = [
  {
    id: 1,
    name: "James T.",
    location: "London, UK",
    rating: 5,
    product: "Cenforce 100mg",
    review:
      "Absolutely outstanding results. Cenforce 100mg worked exactly as described — fast onset and no side effects. Delivery was discreet and arrived in 4 days. Highly recommend Cure Pharmaceuticals.",
  },
  {
    id: 2,
    name: "Marco R.",
    location: "Amsterdam, Netherlands",
    rating: 5,
    product: "Vidalista 40mg",
    review:
      "Vidalista 40mg is the best I've tried. Long-lasting effect, well-packaged, and excellent value per box. Cure Pharma delivered to the Netherlands without any issues. Will reorder.",
  },
  {
    id: 3,
    name: "David K.",
    location: "Manchester, UK",
    rating: 4,
    product: "Kamagra Oral Jelly",
    review:
      "Kamagra Oral Jelly is very convenient and works quickly. Packaging was secure and delivery was on time. Would give 5 stars if there was a wider flavour choice, but overall very satisfied.",
  },
  {
    id: 4,
    name: "Stefan B.",
    location: "Berlin, Germany",
    rating: 5,
    product: "Super Kamagra",
    review:
      "Super Kamagra is excellent — dual action and very effective. Ordered from Germany and received within 5 days. Cure Pharmaceuticals keeps their promise on quality and discreet shipping.",
  },
];

const initialNotifications: AdminNotification[] = [
  {
    id: 1,
    action: "Order placed",
    detail: "Cenforce 100mg · James T., London",
  },
  {
    id: 2,
    action: "Order confirmed",
    detail: "Vidalista 40mg · Marco R., Amsterdam",
  },
  {
    id: 3,
    action: "Delivery dispatched",
    detail: "Kamagra Oral Jelly · Stefan B., Berlin",
  },
  {
    id: 4,
    action: "Order placed",
    detail: "Super Kamagra 160mg · Luca M., Rome",
  },
  {
    id: 5,
    action: "Package delivered",
    detail: "Cenforce 200mg · Ahmed K., Manchester",
  },
  {
    id: 6,
    action: "Order placed",
    detail: "Vidalista 60mg · Pierre D., Paris",
  },
  {
    id: 7,
    action: "Delivery dispatched",
    detail: "Kamagra 100mg · Henrik S., Stockholm",
  },
  {
    id: 8,
    action: "Order confirmed",
    detail: "Fildena 150mg · David W., Birmingham",
  },
  {
    id: 9,
    action: "Package delivered",
    detail: "Super P-Force · Arjun P., Leicester",
  },
  {
    id: 10,
    action: "Order placed",
    detail: "Cenforce 50mg · Thomas B., Munich",
  },
];

// ────────────────────────────────────────
// Login Screen
// ────────────────────────────────────────
function AdminLogin({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "Alex@thomas2026") {
      onLogin();
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-950 via-teal-900 to-cyan-900 flex items-center justify-center p-4">
      <Card
        className="w-full max-w-sm shadow-2xl border-teal-700/30"
        data-ocid="admin.panel"
      >
        <CardHeader className="text-center pb-2">
          <div className="mx-auto mb-3 w-12 h-12 rounded-full bg-teal-600/20 flex items-center justify-center">
            <span className="text-2xl">🔐</span>
          </div>
          <CardTitle className="text-xl font-bold text-foreground">
            Admin Access
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Cure Pharmaceuticals · Admin Panel
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="admin-password">Password</Label>
              <div className="relative">
                <Input
                  id="admin-password"
                  data-ocid="admin.input"
                  type={showPass ? "text" : "password"}
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  className="pr-10"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  tabIndex={-1}
                >
                  {showPass ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {error && (
                <p
                  data-ocid="admin.error_state"
                  className="text-xs text-destructive"
                >
                  {error}
                </p>
              )}
            </div>
            <Button
              data-ocid="admin.submit_button"
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white"
            >
              Login
            </Button>
          </form>
          <div className="mt-4 text-center">
            <a
              href="/"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Back to catalog
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ────────────────────────────────────────
// Products Tab
// ────────────────────────────────────────
function ProductsTab() {
  const [products, setProducts] = useState<AdminProduct[]>(initialProducts);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");

  const startEdit = (i: number) => {
    setEditingIndex(i);
    setEditValue(String(products[i].price));
  };

  const saveEdit = (i: number) => {
    const parsed = Number.parseFloat(editValue);
    if (!Number.isNaN(parsed) && parsed > 0) {
      setProducts((prev) =>
        prev.map((p, idx) => (idx === i ? { ...p, price: parsed } : p)),
      );
    }
    setEditingIndex(null);
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Click any price to edit it inline.
      </p>
      <div className="rounded-lg border overflow-hidden">
        <Table data-ocid="products.table">
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Brand</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Dosage</TableHead>
              <TableHead>Price (€)</TableHead>
              <TableHead>Packaging</TableHead>
              <TableHead>Count</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((p, i) => (
              <TableRow
                key={`${p.brand}-${p.name}-${p.dosage}`}
                data-ocid={`products.item.${i + 1}`}
              >
                <TableCell>
                  <Badge variant="outline" className="text-xs font-semibold">
                    {p.brand}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium text-sm">{p.name}</TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {p.dosage}
                </TableCell>
                <TableCell>
                  {editingIndex === i ? (
                    <Input
                      data-ocid="products.input"
                      className="w-24 h-7 text-sm"
                      value={editValue}
                      autoFocus
                      onChange={(e) => setEditValue(e.target.value)}
                      onBlur={() => saveEdit(i)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") saveEdit(i);
                        if (e.key === "Escape") setEditingIndex(null);
                      }}
                    />
                  ) : (
                    <button
                      type="button"
                      onClick={() => startEdit(i)}
                      className="text-sm font-semibold text-teal-600 hover:text-teal-800 hover:underline transition-colors cursor-pointer"
                    >
                      €{p.price}
                    </button>
                  )}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {p.packaging}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {p.count}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

// ────────────────────────────────────────
// Reviews Tab
// ────────────────────────────────────────
function ReviewsTab() {
  const [reviews, setReviews] = useState<AdminReview[]>(initialReviews);
  const [form, setForm] = useState({
    name: "",
    product: "",
    rating: "5",
    comment: "",
    location: "",
  });
  const [adding, setAdding] = useState(false);

  const addReview = () => {
    if (!form.name.trim() || !form.product.trim() || !form.comment.trim())
      return;
    const newReview: AdminReview = {
      id: Date.now(),
      name: form.name.trim(),
      location: form.location.trim() || "Europe",
      rating: Math.min(5, Math.max(1, Number.parseInt(form.rating) || 5)),
      product: form.product.trim(),
      review: form.comment.trim(),
    };
    setReviews((prev) => [...prev, newReview]);
    setForm({ name: "", product: "", rating: "5", comment: "", location: "" });
    setAdding(false);
  };

  const deleteReview = (id: number) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {reviews.length} review{reviews.length !== 1 ? "s" : ""}
        </p>
        <Button
          data-ocid="reviews.open_modal_button"
          size="sm"
          variant="outline"
          onClick={() => setAdding((v) => !v)}
          className="gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Review
        </Button>
      </div>

      {adding && (
        <Card
          data-ocid="reviews.panel"
          className="border-teal-200 bg-teal-50/50"
        >
          <CardContent className="pt-4 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs">Reviewer Name</Label>
                <Input
                  data-ocid="reviews.input"
                  placeholder="e.g. James T."
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  className="h-8 text-sm"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Location</Label>
                <Input
                  placeholder="e.g. London, UK"
                  value={form.location}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, location: e.target.value }))
                  }
                  className="h-8 text-sm"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs">Product</Label>
                <Input
                  placeholder="e.g. Cenforce 100mg"
                  value={form.product}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, product: e.target.value }))
                  }
                  className="h-8 text-sm"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Rating (1–5)</Label>
                <Input
                  type="number"
                  min="1"
                  max="5"
                  value={form.rating}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, rating: e.target.value }))
                  }
                  className="h-8 text-sm"
                />
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Comment</Label>
              <textarea
                data-ocid="reviews.textarea"
                className="w-full text-sm border border-input rounded-md px-3 py-2 min-h-[80px] resize-none focus:outline-none focus:ring-2 focus:ring-ring bg-background"
                placeholder="Customer review text..."
                value={form.comment}
                onChange={(e) =>
                  setForm((f) => ({ ...f, comment: e.target.value }))
                }
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button
                data-ocid="reviews.cancel_button"
                size="sm"
                variant="ghost"
                onClick={() => setAdding(false)}
              >
                Cancel
              </Button>
              <Button
                data-ocid="reviews.submit_button"
                size="sm"
                className="bg-teal-600 hover:bg-teal-700 text-white"
                onClick={addReview}
              >
                Save Review
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-3" data-ocid="reviews.list">
        {reviews.map((r, i) => (
          <Card
            key={r.id}
            data-ocid={`reviews.item.${i + 1}`}
            className="group"
          >
            <CardContent className="pt-4">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-semibold text-sm">{r.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {r.location}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {r.product}
                    </Badge>
                    <span className="text-xs text-amber-500 font-medium">
                      {"★".repeat(r.rating)}
                      {"☆".repeat(5 - r.rating)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {r.review}
                  </p>
                </div>
                <Button
                  data-ocid={`reviews.delete_button.${i + 1}`}
                  size="sm"
                  variant="ghost"
                  className="text-destructive hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                  onClick={() => deleteReview(r.id)}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {reviews.length === 0 && (
          <div
            data-ocid="reviews.empty_state"
            className="text-center py-12 text-muted-foreground text-sm"
          >
            No reviews yet. Add the first one!
          </div>
        )}
      </div>
    </div>
  );
}

// ────────────────────────────────────────
// Notifications Tab
// ────────────────────────────────────────
function NotificationsTab() {
  const [notifications, setNotifications] =
    useState<AdminNotification[]>(initialNotifications);
  const [actionText, setActionText] = useState("");
  const [detailText, setDetailText] = useState("");

  const addNotification = () => {
    if (!actionText.trim() || !detailText.trim()) return;
    setNotifications((prev) => [
      { id: Date.now(), action: actionText.trim(), detail: detailText.trim() },
      ...prev,
    ]);
    setActionText("");
    setDetailText("");
  };

  const deleteNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="space-y-4">
      <Card
        data-ocid="notifications.panel"
        className="border-teal-200 bg-teal-50/50"
      >
        <CardContent className="pt-4">
          <p className="text-xs text-muted-foreground mb-3">
            Add a new live ticker notification (display-only preview — main app
            uses its own data).
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <div className="space-y-1">
              <Label className="text-xs">Action</Label>
              <Input
                data-ocid="notifications.input"
                placeholder="e.g. Order placed"
                value={actionText}
                onChange={(e) => setActionText(e.target.value)}
                className="h-8 text-sm"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Detail</Label>
              <Input
                placeholder="e.g. Cenforce 100mg · John D., Berlin"
                value={detailText}
                onChange={(e) => setDetailText(e.target.value)}
                className="h-8 text-sm"
                onKeyDown={(e) => {
                  if (e.key === "Enter") addNotification();
                }}
              />
            </div>
          </div>
          <Button
            data-ocid="notifications.submit_button"
            size="sm"
            className="bg-teal-600 hover:bg-teal-700 text-white gap-1.5"
            onClick={addNotification}
          >
            <Plus className="w-3.5 h-3.5" />
            Add Notification
          </Button>
        </CardContent>
      </Card>

      <div className="space-y-2" data-ocid="notifications.list">
        {notifications.map((n, i) => (
          <div
            key={n.id}
            data-ocid={`notifications.item.${i + 1}`}
            className="group flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-muted/30 transition-colors"
          >
            <div className="flex-1 min-w-0">
              <span className="text-sm font-medium">{n.action}</span>
              <span className="text-sm text-muted-foreground">
                {" "}
                · {n.detail}
              </span>
            </div>
            <Button
              data-ocid={`notifications.delete_button.${i + 1}`}
              size="sm"
              variant="ghost"
              className="text-destructive hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
              onClick={() => deleteNotification(n.id)}
            >
              <Trash2 className="w-3.5 h-3.5" />
            </Button>
          </div>
        ))}
        {notifications.length === 0 && (
          <div
            data-ocid="notifications.empty_state"
            className="text-center py-12 text-muted-foreground text-sm"
          >
            No notifications yet.
          </div>
        )}
      </div>
    </div>
  );
}

// ────────────────────────────────────────
// Main Admin Panel
// ────────────────────────────────────────
export default function AdminPanel() {
  const [authenticated, setAuthenticated] = useState(false);

  if (!authenticated) {
    return <AdminLogin onLogin={() => setAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-teal-800 text-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-lg font-bold tracking-tight">
              Cure Pharmaceuticals
            </span>
            <span className="text-teal-300 text-sm hidden sm:inline">
              Admin Panel
            </span>
            <Badge className="bg-teal-600/50 text-teal-100 border-teal-500/30 text-xs">
              Internal
            </Badge>
          </div>
          <Button
            data-ocid="admin.close_button"
            size="sm"
            variant="ghost"
            className="text-teal-100 hover:text-white hover:bg-teal-700 gap-1.5"
            onClick={() => {
              window.history.pushState({}, "", "/");
              window.dispatchEvent(new PopStateEvent("popstate"));
            }}
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <Tabs defaultValue="products" data-ocid="admin.tab">
          <TabsList className="mb-6">
            <TabsTrigger value="products" data-ocid="admin.products_tab">
              Products
            </TabsTrigger>
            <TabsTrigger value="reviews" data-ocid="admin.reviews_tab">
              Reviews
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              data-ocid="admin.notifications_tab"
            >
              Notifications
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Product Catalog</CardTitle>
              </CardHeader>
              <CardContent>
                <ProductsTab />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Customer Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <ReviewsTab />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Live Ticker Notifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <NotificationsTab />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
