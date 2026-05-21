import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";

export function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute -top-56 left-1/2 h-[720px] w-[720px] -translate-x-1/2 rounded-full bg-emerald-500/15 blur-[140px]" />
        <div className="absolute right-[-10%] top-24 h-[520px] w-[520px] rounded-full bg-violet-500/12 blur-[140px]" />
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="hero-noise absolute inset-0" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-6 lg:px-8">
        <Button asChild variant="ghost" className="mb-8 inline-flex items-center gap-2 text-foreground/80">
          <Link to="/">
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </Button>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-lg"
        >
          <div className="glass-strong overflow-hidden rounded-3xl border border-white/10 p-7 sm:p-8">
            <h1 className="font-display text-3xl font-semibold tracking-tight">{title}</h1>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{subtitle}</p>
            <div className="mt-7">{children}</div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

