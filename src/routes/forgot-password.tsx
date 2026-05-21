import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail } from "lucide-react";

import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/forgot-password")({
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  return (
    <AuthShell
      title="Reset your password"
      subtitle="Enter your email to receive a reset link. UI-only flow for now."
    >
      <div className="grid gap-3">
        <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Email</label>
        <Input className="h-12 rounded-2xl border-white/10 bg-white/5" placeholder="you@company.com" />
      </div>

      <Button
        variant="outline"
        className="mt-7 h-12 w-full rounded-2xl border-white/12 bg-white/[0.04] font-semibold text-foreground/90 hover:bg-white/[0.08]"
      >
        <Mail className="mr-2 h-4 w-4" />
        Send reset link
      </Button>

      <div className="mt-4 text-sm text-muted-foreground">
        Remembered it?{" "}
        <Link to="/login" className="text-foreground underline underline-offset-4 hover:opacity-90">
          Back to login
        </Link>
      </div>
    </AuthShell>
  );
}

