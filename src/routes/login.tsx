import { createFileRoute, Link } from "@tanstack/react-router";
import { Lock, ShieldCheck } from "lucide-react";

import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  return (
    <AuthShell
      title="Login"
      subtitle="Premium access for borrowers. UI-only auth flow (no backend yet)."
    >
      <div className="grid gap-3">
        <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Email</label>
        <Input className="h-12 rounded-2xl border-white/10 bg-white/5" placeholder="you@company.com" />
        <label className="mt-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Password
        </label>
        <Input className="h-12 rounded-2xl border-white/10 bg-white/5" placeholder="••••••••" type="password" />
      </div>

      <Button className="mt-7 h-12 w-full rounded-2xl bg-gradient-to-r from-emerald-300 via-emerald-400 to-sky-400 font-semibold text-slate-950 btn-primary-glow">
        <Lock className="mr-2 h-4 w-4" />
        Continue
      </Button>

      <div className="mt-4 flex items-center justify-between text-sm">
        <Link to="/forgot-password" className="text-muted-foreground underline underline-offset-4 hover:text-foreground">
          Forgot password?
        </Link>
        <Link to="/signup" className="text-muted-foreground underline underline-offset-4 hover:text-foreground">
          Create account
        </Link>
      </div>

      <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
        <ShieldCheck className="h-4 w-4 text-emerald-300" />
        Wallet connect is supported separately via the header button.
      </div>
    </AuthShell>
  );
}

