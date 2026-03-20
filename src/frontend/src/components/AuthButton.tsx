import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, LogIn, LogOut, UserCircle } from "lucide-react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useCallerUserProfile } from "../hooks/useQueries";

interface AuthButtonProps {
  onNavigateAccount: () => void;
}

export default function AuthButton({ onNavigateAccount }: AuthButtonProps) {
  const { identity, login, clear, isLoggingIn, isInitializing } =
    useInternetIdentity();
  const { data: profile } = useCallerUserProfile();

  if (isInitializing) {
    return <div className="w-24 h-8 bg-muted rounded-lg animate-pulse" />;
  }

  if (!identity) {
    return (
      <Button
        size="sm"
        onClick={login}
        disabled={isLoggingIn}
        data-ocid="auth.primary_button"
        className="gap-1.5 text-white"
        style={{ background: "oklch(0.44 0.07 200)" }}
      >
        <LogIn className="w-3.5 h-3.5" />
        {isLoggingIn ? "Connecting…" : "Sign In"}
      </Button>
    );
  }

  const displayName = `${identity.getPrincipal().toString().slice(0, 8)}…`;
  const initials = profile?.username
    ? profile.username.slice(0, 2).toUpperCase()
    : "?";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 border-border"
          data-ocid="auth.dropdown_menu"
        >
          <Avatar className="w-5 h-5">
            <AvatarFallback
              className="text-[9px] font-bold text-white"
              style={{ background: "oklch(0.44 0.07 200)" }}
            >
              {initials}
            </AvatarFallback>
          </Avatar>
          <span className="hidden sm:inline max-w-[100px] truncate text-sm font-medium">
            {displayName}
          </span>
          <ChevronDown className="w-3 h-3 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem
          onClick={onNavigateAccount}
          data-ocid="auth.link"
          className="gap-2 cursor-pointer"
        >
          <UserCircle className="w-4 h-4" />
          My Account
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={clear}
          data-ocid="auth.button"
          className="gap-2 text-destructive focus:text-destructive cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
