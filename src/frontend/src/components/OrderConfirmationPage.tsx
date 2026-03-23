import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

interface OrderConfirmationPageProps {
  onNavigate: (path: string) => void;
}

export default function OrderConfirmationPage({
  onNavigate,
}: OrderConfirmationPageProps) {
  const params = new URLSearchParams(window.location.search);
  const orderId = params.get("orderId") ?? "";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="min-h-[70vh] flex flex-col items-center justify-center gap-6 px-4"
      data-ocid="order.success_state"
    >
      <div
        className="w-24 h-24 rounded-full flex items-center justify-center"
        style={{ background: "oklch(0.93 0.05 155)" }}
      >
        <CheckCircle2
          className="w-14 h-14"
          style={{ color: "oklch(0.50 0.17 155)" }}
        />
      </div>
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-foreground">
          Order Placed Successfully!
        </h1>
        <p className="text-muted-foreground text-base">
          Thank you for your order. We'll get it ready for you soon.
        </p>
        {orderId && (
          <p className="text-sm font-mono bg-muted border border-border rounded-md px-4 py-2 inline-block mt-2">
            Order ID:{" "}
            <span className="font-bold text-foreground">{orderId}</span>
          </p>
        )}
      </div>
      <Button
        data-ocid="order.primary_button"
        className="bg-teal-700 hover:bg-teal-800 text-white mt-2"
        onClick={() => onNavigate("/")}
      >
        Continue Shopping
      </Button>
    </motion.div>
  );
}
