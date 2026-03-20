import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  CalendarDays,
  HeartPulse,
  LogOut,
  Shield,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useCallerUserProfile } from "../hooks/useQueries";

interface AccountPageProps {
  onBack: () => void;
}

function formatDate(ts: bigint): string {
  // ts is nanoseconds
  const ms = Number(ts / 1_000_000n);
  return new Date(ms).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function AccountPage({ onBack }: AccountPageProps) {
  const { identity, clear } = useInternetIdentity();
  const { data: profile, isLoading } = useCallerUserProfile();

  if (!identity) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">
            You must be signed in to view this page.
          </p>
          <Button onClick={onBack} variant="outline">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const principal = identity.getPrincipal().toString();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              data-ocid="account.button"
              className="gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <Separator orientation="vertical" className="h-5" />
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center text-white"
                style={{ background: "oklch(0.44 0.07 200)" }}
              >
                <HeartPulse className="w-4 h-4" />
              </div>
              <span className="font-bold text-foreground tracking-tight">
                CURE
              </span>
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                Account
              </span>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={clear}
            data-ocid="account.delete_button"
            className="gap-1.5 text-muted-foreground"
          >
            <LogOut className="w-3.5 h-3.5" />
            Sign Out
          </Button>
        </div>
      </header>

      <main
        className="max-w-5xl mx-auto px-4 sm:px-6 py-10"
        data-ocid="account.section"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          {/* Profile hero */}
          <div
            className="rounded-2xl p-8 text-white flex flex-col sm:flex-row items-center sm:items-start gap-6"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.44 0.07 200) 0%, oklch(0.38 0.1 220) 100%)",
            }}
          >
            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
              <User className="w-10 h-10 text-white" />
            </div>
            <div className="text-center sm:text-left">
              {isLoading ? (
                <div className="space-y-2">
                  <div className="h-7 w-40 bg-white/20 rounded animate-pulse" />
                  <div className="h-4 w-56 bg-white/20 rounded animate-pulse" />
                </div>
              ) : (
                <>
                  <h1 className="text-2xl font-bold">
                    {profile?.username ?? "Unnamed User"}
                  </h1>
                  <p className="text-white/70 text-sm mt-1">
                    Verified Cure Pharmaceuticals Member
                  </p>
                  <Badge className="mt-3 bg-white/20 text-white border-0 hover:bg-white/30">
                    Active Account
                  </Badge>
                </>
              )}
            </div>
          </div>

          {/* Details grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card data-ocid="account.card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                  <User className="w-3.5 h-3.5" />
                  Account Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground">Username</p>
                  <p className="font-semibold text-foreground">
                    {isLoading ? "—" : (profile?.username ?? "Not set")}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Member Since</p>
                  <p className="font-semibold text-foreground flex items-center gap-1.5">
                    <CalendarDays className="w-3.5 h-3.5 text-muted-foreground" />
                    {isLoading
                      ? "—"
                      : profile?.registrationDate
                        ? formatDate(profile.registrationDate)
                        : "Unknown"}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card data-ocid="account.card">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5" />
                  Identity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground">Principal ID</p>
                  <p className="font-mono text-xs text-foreground break-all leading-relaxed">
                    {principal}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Info callout */}
          <div className="rounded-xl border border-border bg-muted/40 p-5">
            <h3 className="font-semibold text-foreground mb-1 text-sm">
              Your Privacy
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Your account is secured via Internet Identity — a
              privacy-preserving authentication system that never shares
              personal data. Your identity is yours alone.
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
