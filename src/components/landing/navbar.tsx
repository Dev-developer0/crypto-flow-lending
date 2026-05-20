import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { WalletButton } from "@/components/wallet/wallet-button";

const links = [
  { label: "Home", href: "#home" },
  { label: "Borrow", href: "#borrow" },
  { label: "Assets", href: "#assets" },
  { label: "FAQ", href: "#faq" },
  { label: "Blog", href: "#blog" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="mx-auto mt-4 w-[95%] max-w-6xl">
        <div className="glass flex items-center justify-between rounded-2xl px-4 py-3 sm:px-6">
          <a href="#home" className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-emerald-400 via-sky-400 to-violet-500 text-[15px] font-bold text-slate-950 shadow-lg">
              L
            </span>
            <span className="font-display text-lg font-semibold tracking-tight">Lumen</span>
          </a>

          <nav className="hidden items-center gap-7 md:flex">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <Button variant="ghost" className="text-foreground/80 hover:text-foreground">
              Login
            </Button>
            <Button className="bg-gradient-to-r from-emerald-400 to-sky-500 font-medium text-slate-950 hover:opacity-90">
              Get Started
            </Button>
            <WalletButton />
          </div>

          <button
            aria-label="Menu"
            className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 md:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>

        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass mt-2 flex flex-col gap-1 rounded-2xl p-3 md:hidden"
          >
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-white/5 hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
            <div className="mt-2 flex gap-2 px-1">
              <Button variant="ghost" className="flex-1">Login</Button>
              <Button className="flex-1 bg-gradient-to-r from-emerald-400 to-sky-500 text-slate-950">
                Get Started
              </Button>
            </div>
            <div className="mt-3 px-1">
              <WalletButton />
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}
