import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/signup")({
  component: SignupPage,
});

function SignupPage() {
  return (
    <AuthShell
      title="Create your account"
      subtitle="Start borrowing against crypto in minutes. UI-only signup for now."
    >
      <div className="grid gap-3">
        <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Email</label>
        <Input className="h-12 rounded-2xl border-white/10 bg-white/5" placeholder="you@company.com" />
        <label className="mt-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Password
        </label>
        <Input className="h-12 rounded-2xl border-white/10 bg-white/5" placeholder="Create a strong password" type="password" />
      </div>

      <Button className="mt-7 h-12 w-full rounded-2xl bg-gradient-to-r from-emerald-300 via-emerald-400 to-sky-400 font-semibold text-slate-950 btn-primary-glow">
        <Sparkles className="mr-2 h-4 w-4" />
        Get Started
      </Button>

      <div className="mt-4 text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link to="/login" className="text-foreground underline underline-offset-4 hover:opacity-90">
          Login
        </Link>
      </div>
    </AuthShell>
  );
}

