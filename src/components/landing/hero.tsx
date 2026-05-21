import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  TrendingDown,
  Sparkles,
  Lock,
  Zap,
  Play,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero.png";
import { useLivePrice } from "@/hooks/use-live-price";
import { ASSETS } from "@/lib/assets";
import { scrollToId } from "@/lib/scroll";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      delay: i * 0.09,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

const TRUST_ITEMS = [
  { icon: ShieldCheck, label: "SOC 2 Type II", accent: "text-emerald-400", bg: "bg-emerald-400/10" },
  { icon: Lock, label: "Insured custody", accent: "text-sky-400", bg: "bg-sky-400/10" },
  { icon: Zap, label: "1:1 reserves", accent: "text-violet-400", bg: "bg-violet-400/10" },
] as const;

const PARTNERS = ["Fidelity", "Galaxy", "Jump", "Wintermute", "Kraken", "BitGo"];

/* ---------------- Animated BTC Price Widget ---------------- */
function BtcPriceWidget() {
  const btc = ASSETS[0];
  const { price, delta } = useLivePrice(btc.base, 0.0025);
  const up = delta >= 0;

  const points = Array.from({ length: 24 }).map((_, i) => {
    const t = i / 23;
    const wave = Math.sin(t * Math.PI * 2 + price / 5000) * 6;
    const trend = up ? -t * 10 : t * 10;
    return `${t * 100},${20 + wave + trend}`;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.55, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="glass-strong group relative inline-flex w-full max-w-[340px] items-center gap-3.5 overflow-hidden rounded-2xl border border-white/10 p-3.5 pr-5 sm:w-auto"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-400/5 to-sky-500/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden
      />
      <motion.div
        className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-amber-300 via-amber-400 to-orange-500 text-base font-bold text-slate-950 shadow-lg shadow-orange-500/25"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 18 }}
      >
        â‚¿
      </motion.div>
      <motion.div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
          Live Â· BTC/USD
        </div>
        <motion.div className="flex items-baseline gap-2.5">
          <motion.span
            key={Math.floor(price)}
            initial={{ opacity: 0.5, y: -3 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="font-mono text-xl font-semibold tabular-nums tracking-tight"
          >
            ${price.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </motion.span>
          <span
            className={`inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-[11px] font-semibold ${
              up ? "bg-emerald-400/12 text-emerald-300" : "bg-rose-400/12 text-rose-300"
            }`}
          >
            {up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {(delta * 100).toFixed(2)}%
          </span>
        </motion.div>
      </motion.div>
      <svg viewBox="0 0 100 40" className="h-10 w-[88px] shrink-0 opacity-90">
        <defs>
          <linearGradient id="spark" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={up ? "#34d399" : "#fb7185"} stopOpacity="0.45" />
            <stop offset="100%" stopColor={up ? "#34d399" : "#fb7185"} stopOpacity="0" />
          </linearGradient>
        </defs>
        <polyline
          fill="none"
          stroke={up ? "#34d399" : "#fb7185"}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points.join(" ")}
        />
        <polygon fill="url(#spark)" points={`0,40 ${points.join(" ")} 100,40`} />
      </svg>
    </motion.div>
  );
}

/* ---------------- Floating Crypto Card ---------------- */
function FloatingCard({
  symbol,
  glyph,
  bg,
  base,
  className,
  delay = 0,
  rotate = 0,
}: {
  symbol: string;
  glyph: string;
  bg: string;
  base: number;
  className?: string;
  delay?: number;
  rotate?: number;
}) {
  const reduceMotion = useReducedMotion();
  const { price, delta } = useLivePrice(base, 0.003);
  const up = delta >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 36, rotate }}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{ delay, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={`glass-strong absolute hidden rounded-2xl border border-white/10 p-3.5 shadow-2xl sm:block ${className ?? ""}`}
    >
      <motion.div
        animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay }}
        className="flex items-center gap-3"
      >
        <motion.div
          className="grid h-10 w-10 place-items-center rounded-xl text-sm font-bold text-slate-950 shadow-lg"
          style={{ background: bg }}
          whileHover={{ scale: 1.08 }}
        >
          {glyph}
        </motion.div>
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
            {symbol}
          </p>
          <p className="font-mono text-sm font-semibold tabular-nums">
            ${price.toLocaleString(undefined, { maximumFractionDigits: base < 10 ? 2 : 0 })}
          </p>
        </div>
        <span
          className={`ml-0.5 text-[11px] font-semibold ${up ? "text-emerald-300" : "text-rose-300"}`}
        >
          {up ? "â–²" : "â–¼"} {Math.abs(delta * 100).toFixed(1)}%
        </span>
      </motion.div>
    </motion.div>
  );
}

/* ---------------- Hero ---------------- */
export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="home"
      className="relative overflow-hidden pt-32 pb-24 sm:pt-40 sm:pb-32 lg:pt-48 lg:pb-36"
    >
      {/* Background */}
      <motion.div
        className="pointer-events-none absolute inset-0 -z-10"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        <div className="absolute -top-56 left-1/2 h-[720px] w-[720px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,oklch(0.72_0.18_155/0.28),transparent_65%)] blur-[120px] animate-blob" />
        <div
          className="absolute right-[-8%] top-16 h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,oklch(0.7_0.2_280/0.22),transparent_65%)] blur-[120px] animate-blob"
          style={{ animationDelay: "-6s" }}
        />
        <motion.div
          className="absolute left-[-12%] top-80 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,oklch(0.68_0.15_230/0.2),transparent_65%)] blur-[120px] animate-blob"
          style={{ animationDelay: "-12s" }}
          animate={reduceMotion ? undefined : { x: [0, 20, 0], y: [0, -15, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-0 bg-grid opacity-50"
          animate={reduceMotion ? undefined : { opacity: [0.4, 0.55, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div className="hero-noise absolute inset-0" aria-hidden />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent" />
        <div className="absolute left-1/2 top-0 h-80 w-[min(90%,56rem)] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(110,231,183,0.14),transparent_55%)]" />
        <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-background to-transparent" />
      </motion.div>

      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-[1.08fr_0.92fr] lg:gap-12 xl:gap-16">
          {/* LEFT */}
          <motion.div
            initial="hidden"
            animate="visible"
            className="relative max-w-2xl lg:max-w-none"
          >
            {/* Eyebrow */}
            <motion.div
              custom={0}
              variants={fadeUp}
              className="glass group inline-flex items-center gap-2.5 rounded-full border border-white/10 px-4 py-2 text-xs shadow-[0_8px_32px_-12px_rgba(0,0,0,0.5)]"
            >
              <span className="flex items-center gap-1.5 rounded-full bg-emerald-400/15 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-emerald-300">
                <Sparkles className="h-3 w-3" />
                New
              </span>
              <span className="h-3.5 w-px bg-white/12" />
              <span className="text-muted-foreground transition-colors group-hover:text-foreground/80">
                Instant approvals â€” borrow in under 60 seconds
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              custom={1}
              variants={fadeUp}
              className="mt-8 text-balance font-display text-[2.625rem] font-semibold leading-[1.02] tracking-[-0.04em] sm:mt-10 sm:text-[3.5rem] lg:text-[4.5rem] xl:text-[4.75rem]"
            >
              Unlock liquidity{" "}
              <span className="relative inline-block">
                <span className="text-gradient-hero">without selling</span>
                <motion.svg
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-3 w-full text-emerald-400/50"
                  viewBox="0 0 200 12"
                  preserveAspectRatio="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
                >
                  <motion.path
                    d="M0 6 Q 50 0 100 6 T 200 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.6, duration: 1.2, ease: "easeOut" }}
                  />
                </motion.svg>
              </span>{" "}
              your crypto.
            </motion.h1>

            <motion.p
              custom={2}
              variants={fadeUp}
              className="mt-7 max-w-[34rem] text-[1.0625rem] leading-[1.7] text-muted-foreground sm:mt-8 sm:text-lg sm:leading-[1.75]"
            >
              Borrow against BTC, ETH, and 40+ digital assets at rates from{" "}
              <span className="font-semibold text-foreground">5.9% APR</span>. Keep your upside,
              access cash on demand — secured by institutional-grade custody.
            </motion.p>

            {/* CTAs */}
            <motion.div
              custom={3}
              variants={fadeUp}
              className="mt-10 flex flex-col gap-4 sm:mt-11 sm:flex-row sm:flex-wrap sm:items-center"
            >
              <Button
                size="lg"
                onClick={() => scrollToId("borrow")}
                className="group relative h-[3.25rem] w-full overflow-hidden rounded-2xl border-0 bg-gradient-to-r from-emerald-300 via-emerald-400 to-sky-400 px-8 text-[15px] font-semibold tracking-[-0.01em] text-slate-950 btn-primary-glow transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98] sm:w-auto"
              >
                <span className="relative z-10 flex items-center justify-center">
                  Borrow Now
                  <ArrowRight className="ml-2.5 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <span
                  className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent animate-shimmer-sweep"
                  aria-hidden
                />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToId("rates")}
                className="h-[3.25rem] w-full rounded-2xl border-white/12 bg-white/[0.04] px-7 text-[15px] font-medium tracking-[-0.01em] text-foreground/90 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08] sm:w-auto"
              >
                View Rates
              </Button>
              <button
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent("lumen:open-demo"))}
                className="group inline-flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:ml-1"
              >
                <span className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5 transition-all group-hover:border-white/20 group-hover:bg-white/10">
                  <Play className="h-3.5 w-3.5 fill-current text-foreground/80" />
                </span>
                Watch demo
              </button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div custom={4} variants={fadeUp} className="mt-12 sm:mt-14">
              <div className="flex flex-wrap gap-3">
                {TRUST_ITEMS.map(({ icon: Icon, label, accent, bg }) => (
                  <motion.div
                    key={label}
                    whileHover={{ y: -2 }}
                    transition={{ type: "spring", stiffness: 400, damping: 22 }}
                    className="trust-pill flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 backdrop-blur-sm"
                  >
                    <span
                      className={`grid h-8 w-8 place-items-center rounded-lg ${bg}`}
                    >
                      <Icon className={`h-4 w-4 ${accent}`} />
                    </span>
                    <span className="text-[13px] font-medium text-foreground/85">{label}</span>
                  </motion.div>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-emerald-400/80" />
                  <span>
                    <strong className="font-semibold text-foreground">$8.2B+</strong> lent
                  </span>
                </span>
                <span className="hidden h-4 w-px bg-white/10 sm:block" />
                <span>
                  <strong className="font-semibold text-foreground">1.4M+</strong> active users
                </span>
                <span className="hidden h-4 w-px bg-white/10 sm:block" />
                <span>
                  <strong className="font-semibold text-foreground">40+</strong> assets supported
                </span>
              </div>
            </motion.div>

            <motion.div className="mt-10 sm:mt-11">
              <BtcPriceWidget />
            </motion.div>
          </motion.div>

          {/* RIGHT â€” visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto h-[460px] w-full max-w-md sm:h-[540px] lg:max-w-lg"
          >
            <div className="absolute inset-0 -z-10 mx-auto h-[440px] w-[440px] translate-y-8 rounded-full bg-gradient-to-br from-emerald-400/25 via-sky-400/15 to-violet-500/25 blur-3xl animate-pulse-soft" />
            <div className="absolute left-1/2 top-1/2 -z-10 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/8 blur-2xl" />
            <motion.div
              className="absolute inset-4 -z-10 rounded-[2rem] border border-white/[0.06] bg-gradient-to-b from-white/[0.04] to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />

            <motion.img
              src={heroImg}
              alt="Crypto-backed lending dashboard illustration"
              width={1024}
              height={1024}
              className="animate-float relative z-10 mx-auto h-full w-auto object-contain drop-shadow-[0_32px_80px_rgba(56,189,248,0.28)]"
              initial={{ y: 24, opacity: 0.9 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            />

            <FloatingCard
              symbol="Bitcoin"
              glyph="â‚¿"
              bg="linear-gradient(135deg,#fcd34d,#f97316)"
              base={ASSETS[0].base}
              delay={0.55}
              rotate={-5}
              className="left-[-8px] top-6 sm:left-[-28px]"
            />
            <FloatingCard
              symbol="Ethereum"
              glyph="Îž"
              bg="linear-gradient(135deg,#c4b5fd,#6366f1)"
              base={ASSETS[1].base}
              delay={0.85}
              rotate={4}
              className="right-[-8px] top-28 sm:right-[-24px]"
            />
            <FloatingCard
              symbol="Solana"
              glyph="â—Ž"
              bg="linear-gradient(135deg,#22d3ee,#14f195)"
              base={ASSETS[2].base}
              delay={1.15}
              rotate={-3}
              className="bottom-20 left-[6px] sm:left-[-12px]"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 1, type: "spring", stiffness: 120, damping: 14 }}
              className="glass-strong absolute right-[-8px] bottom-8 hidden rounded-2xl border border-white/10 px-5 py-4 shadow-2xl sm:block"
            >
              <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                Loan APR
              </p>
              <p className="mt-0.5 font-mono text-2xl font-semibold tracking-tight text-emerald-300">
                from 5.9%
              </p>
              <p className="mt-1 text-[11px] text-muted-foreground">up to 90% LTV Â· no hidden fees</p>
            </motion.div>
          </motion.div>
        </div>

        {/* Logo strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-24 sm:mt-28"
        >
          <motion.div
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
          <p className="pt-10 text-center text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground/80">
            Trusted by teams at
          </p>
          <div className="relative mt-7 overflow-hidden">
            <motion.div
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent sm:w-24"
              aria-hidden
            />
            <motion.div
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent sm:w-24"
              aria-hidden
            />
            <div className="grid grid-cols-2 items-center gap-x-8 gap-y-5 sm:grid-cols-3 md:grid-cols-6">
              {PARTNERS.map((name, i) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 * i, duration: 0.5 }}
                  className="text-center font-display text-sm font-semibold tracking-[-0.02em] text-foreground/45 transition-all duration-300 hover:text-foreground/75"
                >
                  {name}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
