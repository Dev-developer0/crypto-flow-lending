import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Banknote, Link2, ShieldCheck, Wallet, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { scrollToId } from "@/lib/scroll";

const steps = [
  {
    icon: Wallet,
    title: "Connect Wallet",
    desc: "Link MetaMask or WalletConnect in one click. Non-custodial — your keys never leave your wallet.",
    accent: "from-emerald-400/20 via-emerald-500/5 to-transparent",
    glow: "oklch(0.78 0.18 165)",
    visual: (
      <div className="mt-5 rounded-2xl border border-white/10 bg-black/25 p-4">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 text-xs font-bold text-white">
            MM
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-foreground/90">MetaMask</p>
            <p className="truncate font-mono text-[11px] text-muted-foreground">0x7a2…9f4c</p>
          </div>
          <span className="rounded-full bg-emerald-400/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
            Connected
          </span>
        </div>
      </div>
    ),
    action: () => scrollToId("home"),
    actionLabel: "Connect wallet",
  },
  {
    icon: ShieldCheck,
    title: "Deposit Crypto",
    desc: "Transfer BTC, ETH, SOL, USDT, or BNB into insured custody. Real-time collateral valuation and risk monitoring.",
    accent: "from-sky-400/20 via-sky-500/5 to-transparent",
    glow: "oklch(0.68 0.15 230)",
    visual: (
      <div className="mt-5 space-y-2 rounded-2xl border border-white/10 bg-black/25 p-4">
        {[
          { sym: "BTC", amt: "0.50", usd: "$48,210" },
          { sym: "ETH", amt: "4.20", usd: "$15,456" },
        ].map((row) => (
          <div key={row.sym} className="flex items-center justify-between text-xs">
            <span className="font-medium text-foreground/85">{row.sym}</span>
            <span className="font-mono text-muted-foreground">
              {row.amt} · <span className="text-foreground/70">{row.usd}</span>
            </span>
          </div>
        ))}
        <div className="flex items-center justify-between border-t border-white/8 pt-2 text-xs">
          <span className="text-muted-foreground">Vault balance</span>
          <span className="font-mono font-semibold text-emerald-300">$63,666</span>
        </div>
      </div>
    ),
    action: () => scrollToId("assets"),
    actionLabel: "View assets",
  },
  {
    icon: Banknote,
    title: "Receive Loan",
    desc: "Pick your LTV and receive USD stablecoin or fiat. Keep crypto upside while accessing instant liquidity.",
    accent: "from-violet-400/20 via-violet-500/5 to-transparent",
    glow: "oklch(0.72 0.2 275)",
    visual: (
      <div className="mt-5 rounded-2xl border border-white/10 bg-black/25 p-4">
        <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
          Loan disbursed
        </p>
        <p className="mt-1 font-display text-2xl font-semibold text-gradient">$31,833</p>
        <div className="mt-3 flex items-center justify-between text-xs">
          <span className="text-muted-foreground">APR</span>
          <span className="font-mono font-semibold text-emerald-300">5.9%</span>
        </div>
        <div className="mt-1 flex items-center justify-between text-xs">
          <span className="text-muted-foreground">LTV</span>
          <span className="font-mono text-foreground/85">50%</span>
        </div>
      </div>
    ),
    action: () => scrollToId("borrow"),
    actionLabel: "Calculate loan",
  },
] as const;

function StepCard({
  step,
  index,
}: {
  step: (typeof steps)[number];
  index: number;
}) {
  const reduceMotion = useReducedMotion();
  const Icon = step.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduceMotion ? undefined : { y: -8 }}
      className="glass-strong group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 p-6 shadow-[0_24px_80px_-40px_rgba(0,0,0,0.8)] sm:p-7"
    >
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${step.accent} opacity-60 transition-opacity duration-500 group-hover:opacity-100`}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full opacity-20 blur-3xl transition-opacity duration-500 group-hover:opacity-35"
        style={{ background: step.glow }}
        aria-hidden
      />

      <div className="relative flex items-start justify-between gap-3">
        <motion.div
          className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-emerald-400/20 via-sky-500/10 to-violet-500/15 ring-1 ring-white/10"
          whileHover={reduceMotion ? undefined : { scale: 1.05, rotate: 3 }}
          transition={{ type: "spring", stiffness: 400, damping: 18 }}
        >
          <Icon className="h-6 w-6 text-emerald-300" />
        </motion.div>
        <motion.span
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 + index * 0.1, type: "spring", stiffness: 200 }}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10 font-mono text-sm font-semibold text-emerald-300"
        >
          {index + 1}
        </motion.span>
      </div>

      <h3 className="relative mt-5 font-display text-xl font-semibold tracking-tight sm:text-2xl">
        {step.title}
      </h3>
      <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>

      <div className="relative">{step.visual}</div>

      <Button
        type="button"
        variant="ghost"
        onClick={step.action}
        className="relative mt-5 w-full justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-foreground/80 hover:border-emerald-400/25 hover:bg-emerald-400/10 hover:text-foreground"
      >
        {step.actionLabel}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </Button>
    </motion.article>
  );
}

export function HowItWorks() {
  return (
    <section id="how" className="relative scroll-mt-28 py-28 sm:scroll-mt-32 sm:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/20 to-transparent" />
        <div className="absolute left-1/2 top-8 h-[32rem] w-[min(95%,64rem)] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(167,139,250,0.12),transparent_55%)]" />
        <div className="absolute bottom-0 left-1/2 h-64 w-[80%] -translate-x-1/2 bg-[radial-gradient(ellipse_at_bottom,rgba(52,211,153,0.06),transparent_60%)]" />
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:max-w-7xl lg:px-8">
        <motion.header
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end"
        >
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-emerald-300">How it works</p>
            <h2 className="mt-3 text-balance font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Three steps from wallet to funded.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Connect your wallet, deposit collateral, and receive a loan — built with institutional-grade
              security and a premium fintech experience.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="glass inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs text-muted-foreground">
              <Zap className="h-3.5 w-3.5 text-emerald-300" />
              Under 2 minutes
            </div>
            <div className="glass inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs text-muted-foreground">
              <Link2 className="h-3.5 w-3.5 text-sky-300" />
              Non-custodial
            </div>
          </div>
        </motion.header>

        {/* Desktop flow indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-8 hidden items-center justify-center gap-3 md:flex"
        >
          {steps.map((s, i) => (
            <div key={s.title} className="flex items-center gap-3">
              <span className="text-xs font-medium text-muted-foreground">{s.title}</span>
              {i < steps.length - 1 && (
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: 48 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                  className="h-px bg-gradient-to-r from-emerald-400/60 to-sky-400/40"
                />
              )}
            </div>
          ))}
        </motion.div>

        <div className="relative grid gap-6 md:grid-cols-3 md:gap-5 lg:gap-6">
          {steps.map((s, i) => (
            <StepCard key={s.title} step={s} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <Button
            size="lg"
            onClick={() => scrollToId("borrow")}
            className="h-12 rounded-2xl bg-gradient-to-r from-emerald-300 via-emerald-400 to-sky-400 px-8 font-semibold text-slate-950 btn-primary-glow transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Start your loan
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
