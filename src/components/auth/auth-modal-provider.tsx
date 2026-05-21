import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Lock, Mail, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

type AuthMode = "login" | "signup";

declare global {
  interface WindowEventMap {
    "lumen:open-auth": CustomEvent<{ mode?: AuthMode }>;
  }
}

export function AuthModalProvider() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<AuthMode>("signup");

  useEffect(() => {
    const handler = (e: WindowEventMap["lumen:open-auth"]) => {
      setMode(e.detail?.mode ?? "signup");
      setOpen(true);
    };
    window.addEventListener("lumen:open-auth", handler as EventListener);
    return () => window.removeEventListener("lumen:open-auth", handler as EventListener);
  }, []);

  const title = useMemo(() => (mode === "login" ? "Welcome back" : "Create your account"), [mode]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="glass-strong max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-background/70 p-0 backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
          <div className="absolute -top-24 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-emerald-400/15 blur-3xl" />
          <div className="absolute right-[-20%] top-28 h-[320px] w-[320px] rounded-full bg-sky-400/12 blur-3xl" />
        </div>

        <div className="p-7 sm:p-8">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl tracking-tight">{title}</DialogTitle>
          </DialogHeader>

          <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-emerald-300" />
            Sign-in is demo-only (no transactions).
          </div>

          <div className="mt-7 grid gap-3">
            <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Email</label>
            <Input className="h-12 rounded-2xl border-white/10 bg-white/5" placeholder="you@company.com" />
            <label className="mt-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Password
            </label>
            <Input className="h-12 rounded-2xl border-white/10 bg-white/5" placeholder="••••••••" type="password" />
          </div>

          <div className="mt-7 grid gap-3">
            <Button className="h-12 rounded-2xl bg-gradient-to-r from-emerald-300 via-emerald-400 to-sky-400 font-semibold text-slate-950 btn-primary-glow">
              <Lock className="mr-2 h-4 w-4" />
              Continue
            </Button>
            <Button
              variant="outline"
              className="h-12 rounded-2xl border-white/12 bg-white/[0.04] font-medium text-foreground/90 hover:bg-white/[0.08]"
            >
              <Mail className="mr-2 h-4 w-4" />
              Continue with email code
            </Button>
          </div>

          <div className="mt-6 text-sm text-muted-foreground">
            {mode === "login" ? (
              <button
                type="button"
                className="underline underline-offset-4 hover:text-foreground"
                onClick={() => setMode("signup")}
              >
                Need an account? Create one
              </button>
            ) : (
              <button
                type="button"
                className="underline underline-offset-4 hover:text-foreground"
                onClick={() => setMode("login")}
              >
                Already have an account? Sign in
              </button>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-7 rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-muted-foreground"
          >
            This is a UI-only authentication flow. Wallet connect is real; transactions are disabled.
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

