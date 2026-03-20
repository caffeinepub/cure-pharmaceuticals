import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, UserCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useRegisterUser } from "../hooks/useQueries";

interface RegistrationModalProps {
  open: boolean;
}

export default function RegistrationModal({ open }: RegistrationModalProps) {
  const [username, setUsername] = useState("");
  const { mutateAsync: registerUser, isPending } = useRegisterUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = username.trim();
    if (trimmed.length < 3) {
      toast.error("Username must be at least 3 characters");
      return;
    }
    try {
      await registerUser(trimmed);
      toast.success("Welcome to Cure Pharmaceuticals!");
    } catch {
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent
        className="sm:max-w-md"
        data-ocid="registration.modal"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <div className="flex items-center gap-3 mb-1">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white"
              style={{ background: "oklch(0.44 0.07 200)" }}
            >
              <UserCheck className="w-5 h-5" />
            </div>
            <DialogTitle className="text-xl">Complete Your Account</DialogTitle>
          </div>
          <DialogDescription>
            You&apos;re almost there! Choose a username to finish setting up
            your Cure Pharmaceuticals account.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="e.g. john_doe"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isPending}
              minLength={3}
              maxLength={32}
              data-ocid="registration.input"
              autoFocus
            />
            <p className="text-xs text-muted-foreground">
              3–32 characters. Letters, numbers, and underscores.
            </p>
          </div>

          <DialogFooter>
            <Button
              type="submit"
              disabled={isPending || username.trim().length < 3}
              className="w-full"
              style={{ background: "oklch(0.44 0.07 200)" }}
              data-ocid="registration.submit_button"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account…
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
