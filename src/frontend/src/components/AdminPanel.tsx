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
import {
  Edit2,
  Eye,
  EyeOff,
  ImagePlus,
  LogOut,
  Plus,
  ShoppingBag,
  Trash2,
  Users,
  X,
} from "lucide-react";
import { useRef, useState } from "react";
import { useGetAllOrders, useGetAllUsers } from "../hooks/useQueries";

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
  strength: string;
  manufacturedBy: string;
  form: string;
  packSize: string;
  images: string[]; // base64 data URLs, max 3
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
    strength: "50mg Sildenafil Citrate",
    manufacturedBy: "Centurion Remedies Pvt. Ltd.",
    form: "Film-Coated Tablet",
    packSize: "10 Tablets",
    images: [],
  },
  {
    brand: "Cenforce",
    name: "Cenforce",
    dosage: "100mg",
    price: 60,
    packaging: "10×10 Blister",
    count: "100 Tablets",
    strength: "100mg Sildenafil Citrate",
    manufacturedBy: "Centurion Remedies Pvt. Ltd.",
    form: "Film-Coated Tablet",
    packSize: "10 Tablets",
    images: [],
  },
  {
    brand: "Cenforce",
    name: "Cenforce",
    dosage: "150mg",
    price: 65,
    packaging: "10×10 Blister",
    count: "100 Tablets",
    strength: "150mg Sildenafil Citrate",
    manufacturedBy: "Centurion Remedies Pvt. Ltd.",
    form: "Film-Coated Tablet",
    packSize: "10 Tablets",
    images: [],
  },
  {
    brand: "Cenforce",
    name: "Cenforce",
    dosage: "200mg",
    price: 70,
    packaging: "10×10 Blister",
    count: "100 Tablets",
    strength: "200mg Sildenafil Citrate",
    manufacturedBy: "Centurion Remedies Pvt. Ltd.",
    form: "Film-Coated Tablet",
    packSize: "10 Tablets",
    images: [],
  },
  {
    brand: "Vidalista",
    name: "Vidalista",
    dosage: "20mg",
    price: 55,
    packaging: "10×10 Blister",
    count: "100 Tablets",
    strength: "20mg Tadalafil",
    manufacturedBy: "Centurion Remedies Pvt. Ltd.",
    form: "Film-Coated Tablet",
    packSize: "10 Tablets",
    images: [],
  },
  {
    brand: "Vidalista",
    name: "Vidalista",
    dosage: "40mg",
    price: 60,
    packaging: "10×10 Blister",
    count: "100 Tablets",
    strength: "40mg Tadalafil",
    manufacturedBy: "Centurion Remedies Pvt. Ltd.",
    form: "Film-Coated Tablet",
    packSize: "10 Tablets",
    images: [],
  },
  {
    brand: "Vidalista",
    name: "Vidalista",
    dosage: "60mg",
    price: 65,
    packaging: "10×10 Blister",
    count: "100 Tablets",
    strength: "60mg Tadalafil",
    manufacturedBy: "Centurion Remedies Pvt. Ltd.",
    form: "Film-Coated Tablet",
    packSize: "10 Tablets",
    images: [],
  },
  {
    brand: "Kamagra",
    name: "Kamagra",
    dosage: "100mg",
    price: 55,
    packaging: "10×10 Blister",
    count: "100 Tablets",
    strength: "100mg Sildenafil Citrate",
    manufacturedBy: "Ajanta Pharma Ltd.",
    form: "Film-Coated Tablet",
    packSize: "4 Tablets",
    images: [],
  },
  {
    brand: "Kamagra",
    name: "Kamagra Oral Jelly",
    dosage: "100mg",
    price: 60,
    packaging: "1×7 Box",
    count: "7 Sachets",
    strength: "100mg Sildenafil Citrate",
    manufacturedBy: "Ajanta Pharma Ltd.",
    form: "Oral Jelly Sachet",
    packSize: "7 Sachets",
    images: [],
  },
  {
    brand: "Kamagra",
    name: "Kamagra Polo",
    dosage: "100mg",
    price: 50,
    packaging: "1×4 Strip",
    count: "4 Tablets",
    strength: "100mg Sildenafil Citrate",
    manufacturedBy: "Ajanta Pharma Ltd.",
    form: "Chewable Tablet",
    packSize: "4 Tablets",
    images: [],
  },
  {
    brand: "Kamagra",
    name: "Super Kamagra",
    dosage: "160mg",
    price: 75,
    packaging: "4×4 Blister",
    count: "16 Tablets",
    strength: "100mg Sildenafil + 60mg Dapoxetine",
    manufacturedBy: "Ajanta Pharma Ltd.",
    form: "Film-Coated Tablet",
    packSize: "4 Tablets",
    images: [],
  },
  {
    brand: "Fildena",
    name: "Fildena",
    dosage: "100mg",
    price: 55,
    packaging: "10×10 Blister",
    count: "100 Tablets",
    strength: "100mg Sildenafil Citrate",
    manufacturedBy: "Fortune Healthcare Pvt. Ltd.",
    form: "Film-Coated Tablet",
    packSize: "10 Tablets",
    images: [],
  },
  {
    brand: "Fildena",
    name: "Fildena",
    dosage: "150mg",
    price: 65,
    packaging: "10×10 Blister",
    count: "100 Tablets",
    strength: "150mg Sildenafil Citrate",
    manufacturedBy: "Fortune Healthcare Pvt. Ltd.",
    form: "Film-Coated Tablet",
    packSize: "10 Tablets",
    images: [],
  },
  {
    brand: "Fildena",
    name: "Super P-Force",
    dosage: "160mg",
    price: 75,
    packaging: "4×4 Blister",
    count: "16 Tablets",
    strength: "100mg Sildenafil + 60mg Dapoxetine",
    manufacturedBy: "Sunrise Remedies Pvt. Ltd.",
    form: "Film-Coated Tablet",
    packSize: "4 Tablets",
    images: [],
  },
  {
    brand: "Lovegra",
    name: "Lovegra",
    dosage: "Oral Jelly",
    price: 65,
    packaging: "1×7 Box",
    count: "7 Sachets",
    strength: "100mg Sildenafil Citrate",
    manufacturedBy: "Sunrise Remedies Pvt. Ltd.",
    form: "Oral Jelly Sachet",
    packSize: "7 Sachets",
    images: [],
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
// Image Upload Slot
// ────────────────────────────────────────
function ImageSlot({
  label,
  image,
  onUpload,
  onRemove,
}: {
  label: string;
  image: string | undefined;
  onUpload: (dataUrl: string) => void;
  onRemove: () => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") onUpload(reader.result);
    };
    reader.readAsDataURL(file);
    // reset so same file can be re-uploaded
    e.target.value = "";
  };

  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      {image ? (
        <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-border bg-muted">
          <img src={image} alt={label} className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={onRemove}
            className="absolute top-1 right-1 bg-destructive text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-700 transition-colors"
            data-ocid="products.delete_button"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="w-full aspect-video rounded-lg border-2 border-dashed border-teal-300 bg-teal-50/50 hover:bg-teal-100/50 transition-colors flex flex-col items-center justify-center gap-1 text-teal-600"
          data-ocid="products.upload_button"
        >
          <ImagePlus className="w-5 h-5" />
          <span className="text-xs">Upload image</span>
        </button>
      )}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFile}
      />
    </div>
  );
}

// ────────────────────────────────────────
// Products Tab
// ────────────────────────────────────────
const EMPTY_FORM: AdminProduct = {
  brand: "",
  name: "",
  dosage: "",
  price: 0,
  packaging: "",
  count: "",
  strength: "",
  manufacturedBy: "",
  form: "",
  packSize: "",
  images: [],
};

function ProductsTab() {
  const [products, setProducts] = useState<AdminProduct[]>(initialProducts);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState<AdminProduct>(EMPTY_FORM);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const openAdd = () => {
    setFormData(EMPTY_FORM);
    setEditingIndex(null);
    setEditorOpen(true);
  };

  const openEdit = (i: number) => {
    setFormData({ ...products[i] });
    setEditingIndex(i);
    setEditorOpen(true);
  };

  const closeEditor = () => {
    setEditorOpen(false);
    setEditingIndex(null);
    setFormData(EMPTY_FORM);
  };

  const saveProduct = () => {
    if (!formData.brand.trim() || !formData.name.trim()) return;
    if (editingIndex !== null) {
      setProducts((prev) =>
        prev.map((p, i) => (i === editingIndex ? { ...formData } : p)),
      );
    } else {
      setProducts((prev) => [...prev, { ...formData }]);
    }
    closeEditor();
  };

  const confirmDelete = (i: number) => {
    setDeleteConfirm(i);
  };

  const doDelete = () => {
    if (deleteConfirm !== null) {
      setProducts((prev) => prev.filter((_, i) => i !== deleteConfirm));
      setDeleteConfirm(null);
      if (editorOpen && editingIndex === deleteConfirm) closeEditor();
    }
  };

  const setImage = (slot: number, dataUrl: string) => {
    const imgs = [...(formData.images || []), "", "", ""].slice(0, 3);
    imgs[slot] = dataUrl;
    setFormData((f) => ({ ...f, images: imgs }));
  };

  const removeImage = (slot: number) => {
    const imgs = [...(formData.images || []), "", "", ""].slice(0, 3);
    imgs[slot] = "";
    setFormData((f) => ({ ...f, images: imgs }));
  };

  const field = (key: keyof AdminProduct, label: string, type = "text") => (
    <div className="space-y-1">
      <Label className="text-xs">{label}</Label>
      <Input
        type={type}
        value={String(formData[key])}
        onChange={(e) =>
          setFormData((f) => ({
            ...f,
            [key]: type === "number" ? Number(e.target.value) : e.target.value,
          }))
        }
        className="h-8 text-sm"
        data-ocid="products.input"
      />
    </div>
  );

  const imgs = [...(formData.images || []), "", "", ""].slice(0, 3);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {products.length} product{products.length !== 1 ? "s" : ""}
        </p>
        <Button
          data-ocid="products.open_modal_button"
          size="sm"
          className="bg-teal-600 hover:bg-teal-700 text-white gap-1.5"
          onClick={openAdd}
        >
          <Plus className="w-3.5 h-3.5" />
          Add Product
        </Button>
      </div>

      {/* Delete Confirmation */}
      {deleteConfirm !== null && (
        <div
          data-ocid="products.dialog"
          className="p-4 rounded-lg border border-destructive/30 bg-destructive/5 flex items-center justify-between gap-3"
        >
          <p className="text-sm text-destructive font-medium">
            Delete «{products[deleteConfirm]?.name}{" "}
            {products[deleteConfirm]?.dosage}»? This cannot be undone.
          </p>
          <div className="flex gap-2 flex-shrink-0">
            <Button
              data-ocid="products.cancel_button"
              size="sm"
              variant="ghost"
              onClick={() => setDeleteConfirm(null)}
            >
              Cancel
            </Button>
            <Button
              data-ocid="products.confirm_button"
              size="sm"
              variant="destructive"
              onClick={doDelete}
            >
              Delete
            </Button>
          </div>
        </div>
      )}

      {/* Product list */}
      <div className="space-y-2" data-ocid="products.list">
        {products.map((p, i) => (
          <div
            key={`${p.brand}-${p.name}-${p.dosage}-${i}`}
            data-ocid={`products.item.${i + 1}`}
            className="group flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-muted/30 transition-colors"
          >
            {/* Thumbnail */}
            {p.images?.[0] ? (
              <img
                src={p.images[0]}
                alt={p.name}
                className="w-10 h-10 rounded object-cover flex-shrink-0 border border-border"
              />
            ) : (
              <div className="w-10 h-10 rounded bg-teal-100 flex items-center justify-center flex-shrink-0 border border-teal-200">
                <span className="text-teal-600 text-xs font-bold">
                  {p.brand.slice(0, 2).toUpperCase()}
                </span>
              </div>
            )}

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge
                  variant="outline"
                  className="text-xs font-semibold border-teal-300 text-teal-700"
                >
                  {p.brand}
                </Badge>
                <span className="text-sm font-medium">
                  {p.name} {p.dosage}
                </span>
                <span className="text-xs text-muted-foreground">
                  €{p.price}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5 truncate">
                {p.form} · {p.strength}
              </p>
            </div>

            <div className="flex gap-1.5 flex-shrink-0">
              <Button
                data-ocid={`products.edit_button.${i + 1}`}
                size="sm"
                variant="ghost"
                className="h-7 w-7 p-0 text-teal-600 hover:text-teal-800 hover:bg-teal-50"
                onClick={() => openEdit(i)}
              >
                <Edit2 className="w-3.5 h-3.5" />
              </Button>
              <Button
                data-ocid={`products.delete_button.${i + 1}`}
                size="sm"
                variant="ghost"
                className="h-7 w-7 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={() => confirmDelete(i)}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        ))}
        {products.length === 0 && (
          <div
            data-ocid="products.empty_state"
            className="text-center py-12 text-muted-foreground text-sm"
          >
            No products yet. Add the first one!
          </div>
        )}
      </div>

      {/* Product Editor */}
      {editorOpen && (
        <Card
          data-ocid="products.panel"
          className="border-teal-200 bg-teal-50/30 mt-4"
        >
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">
                {editingIndex !== null ? "Edit Product" : "Add New Product"}
              </CardTitle>
              <Button
                data-ocid="products.close_button"
                size="sm"
                variant="ghost"
                className="h-7 w-7 p-0"
                onClick={closeEditor}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* Basic Info */}
            <div>
              <p className="text-xs font-semibold text-teal-700 uppercase tracking-wide mb-3">
                Basic Information
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {field("brand", "Brand")}
                {field("name", "Product Name")}
                {field("dosage", "Dosage")}
                {field("price", "Price (€)", "number")}
                {field("packaging", "Packaging")}
                {field("count", "Count")}
              </div>
            </div>

            {/* Description */}
            <div>
              <p className="text-xs font-semibold text-teal-700 uppercase tracking-wide mb-3">
                Description
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {field("strength", "Strength")}
                {field("manufacturedBy", "Manufactured By")}
                {field("form", "Form")}
                {field("packSize", "Pack Size")}
              </div>
            </div>

            {/* Images */}
            <div>
              <p className="text-xs font-semibold text-teal-700 uppercase tracking-wide mb-3">
                Product Images (up to 3)
              </p>
              <div className="grid grid-cols-3 gap-3">
                {([0, 1, 2] as const).map((slot) => (
                  <ImageSlot
                    key={slot}
                    label={`Image ${slot + 1}`}
                    image={imgs[slot] || undefined}
                    onUpload={(url) => setImage(slot, url)}
                    onRemove={() => removeImage(slot)}
                  />
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 justify-end pt-2 border-t border-teal-200">
              <Button
                data-ocid="products.cancel_button"
                size="sm"
                variant="ghost"
                onClick={closeEditor}
              >
                Cancel
              </Button>
              <Button
                data-ocid="products.save_button"
                size="sm"
                className="bg-teal-600 hover:bg-teal-700 text-white"
                onClick={saveProduct}
              >
                Save Product
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
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
// Orders Tab
// ────────────────────────────────────────
function OrdersTab() {
  const { data: orders, isLoading } = useGetAllOrders();

  function formatDate(ts: bigint): string {
    const ms = Number(ts / 1_000_000n);
    return new Date(ms).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <ShoppingBag className="w-4 h-4" />
        <span>
          {isLoading ? "Loading\u2026" : `${orders?.length ?? 0} order(s)`}
        </span>
      </div>
      <Table data-ocid="admin.table">
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow data-ocid="admin.loading_state">
              <TableCell
                colSpan={7}
                className="text-center text-muted-foreground py-6"
              >
                Loading orders...
              </TableCell>
            </TableRow>
          ) : orders && orders.length > 0 ? (
            orders.map((order, i) => (
              <TableRow key={order.orderId} data-ocid={`admin.item.${i + 1}`}>
                <TableCell className="text-muted-foreground text-sm">
                  {i + 1}
                </TableCell>
                <TableCell className="font-mono text-xs max-w-[120px] truncate">
                  {order.orderId}
                </TableCell>
                <TableCell className="font-medium">{`${order.customerUsername || order.customerId.toString().slice(0, 12)}...`}</TableCell>
                <TableCell className="text-sm">
                  {order.items.length} item(s)
                </TableCell>
                <TableCell className="font-semibold">
                  \u20ac{order.total.toFixed(2)}
                </TableCell>
                <TableCell>
                  <Badge className="bg-teal-100 text-teal-800 border-teal-200 text-xs">
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm">
                  {formatDate(order.createdAt)}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={7}
                className="text-center text-muted-foreground py-8"
                data-ocid="admin.empty_state"
              >
                No orders placed yet.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

// ────────────────────────────────────────
// Users Tab
// ────────────────────────────────────────
function UsersTab() {
  const { data: users, isLoading } = useGetAllUsers();

  function formatDate(ts: bigint): string {
    const ms = Number(ts / 1_000_000n);
    return new Date(ms).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Users className="w-4 h-4" />
        <span>
          {isLoading
            ? "Loading\u2026"
            : `${users?.length ?? 0} registered user(s)`}
        </span>
      </div>
      <Table data-ocid="admin.table">
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Principal</TableHead>
            <TableHead>Registered</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow data-ocid="admin.loading_state">
              <TableCell
                colSpan={4}
                className="text-center text-muted-foreground py-6"
              >
                Loading users...
              </TableCell>
            </TableRow>
          ) : users && users.length > 0 ? (
            users.map(([principal, profile], i) => (
              <TableRow
                key={principal.toString()}
                data-ocid={`admin.item.${i + 1}`}
              >
                <TableCell className="text-muted-foreground text-sm">
                  {i + 1}
                </TableCell>
                <TableCell className="font-medium">
                  {profile.username}
                </TableCell>
                <TableCell className="font-mono text-xs text-muted-foreground max-w-[160px] truncate">
                  {principal.toString()}
                </TableCell>
                <TableCell className="text-sm">
                  {formatDate(profile.registrationDate)}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center text-muted-foreground py-8"
                data-ocid="admin.empty_state"
              >
                No registered users yet.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

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
            <TabsTrigger value="users" data-ocid="admin.users_tab">
              Users
            </TabsTrigger>
            <TabsTrigger value="orders" data-ocid="admin.orders_tab">
              Orders
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

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Customer Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <OrdersTab />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Registered Users</CardTitle>
              </CardHeader>
              <CardContent>
                <UsersTab />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
