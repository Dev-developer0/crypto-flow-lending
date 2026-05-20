import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, TrendingDown, TrendingUp } from "lucide-react";
import { ASSETS, type AssetSymbol } from "@/lib/assets";
import { useLivePrice } from "@/hooks/use-live-price";

const SUPPORTED: AssetSymbol[] = ["BTC", "ETH", "SOL", "USDT", "BNB"];

function Sparkline({ seed, up }: { seed: number; up: boolean }) {
  const points = Array.from({ length: 22 }).map((_, i) => {
    const t = i / 21;
    const wave = Math.sin(t * Math.PI * 2 + seed / 1400) * 7;
    const drift = (up ? 1 : -1) * (t - 0.5) * 10;
    return `${t * 100},${20 - wave - drift}`;
  });

  return (
    <svg viewBox="0 0 100 40" className="h-10 w-[92px]">
      <defs>
        <linearGradient id={up ? "a_up" : "a_dn"} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={up ? "#34d399" : "#fb7185"} stopOpacity="0.45" />
          <stop offset="100%" stopColor={up ? "#34d399" : "#fb7185"} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline
        fill="none"
        stroke={up ? "#34d399" : "#fb7185"}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points.join(" ")}
      />
      <polygon fill={`url(#${up ? "a_up" : "a_dn"})`} points={`0,40 ${points.join(" ")} 100,40`} />
    </svg>
  );
}

function AssetCard({ symbol, i }: { symbol: AssetSymbol; i: number }) {
  const reduceMotion = useReducedMotion();
  const a = ASSETS.find((x) => x.symbol === symbol)!;
  const { price, delta } = useLivePrice(a.base, symbol === "USDT" ? 0.0002 : 0.002);
  const up = delta >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduceMotion ? undefined : { y: -6, scale: 1.01 }}
      className="glass-strong group relative overflow-hidden rounded-3xl border border-white/10 p-6 shadow-[0_24px_80px_-40px_rgba(0,0,0,0.8)] transition-colors"
    >
      {/* Ambient color + sheen */}
      <div
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-25 blur-3xl transition-opacity duration-500 group-hover:opacity-45"
        style={{ background: a.color }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(120deg, rgba(255,255,255,0.0) 0%, rgba(255,255,255,0.06) 35%, rgba(255,255,255,0.0) 70%)",
        }}
        aria-hidden
      />

      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className="grid h-11 w-11 place-items-center rounded-2xl text-lg font-bold text-slate-950 shadow-lg"
            style={{ background: a.color }}
          >
            {a.glyph}
          </div>
          <div className="min-w-0">
            <p className="truncate font-display text-lg font-semibold tracking-tight">{a.name}</p>
            <p className="mt-0.5 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {a.symbol}
            </p>
          </div>
        </div>

        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
            up ? "bg-emerald-400/12 text-emerald-300" : "bg-rose-400/12 text-rose-300"
          }`}
        >
          {up ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
          {(delta * 100).toFixed(2)}%
        </span>
      </div>

      <div className="mt-7 flex items-end justify-between gap-5">
        <div className="min-w-0">
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Live price
          </p>
          <p className="mt-2 font-mono text-3xl font-semibold tabular-nums tracking-tight">
            ${price.toLocaleString(undefined, { maximumFractionDigits: price < 5 ? 4 : 0 })}
          </p>
        </div>

        <div className="shrink-0 opacity-90">
          <Sparkline seed={price} up={up} />
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between text-xs text-muted-foreground">
        <span>
          LTV up to{" "}
          <span className="font-semibold text-foreground/85">{Math.round(a.ltv * 100)}%</span>
        </span>
        <span>
          From <span className="font-semibold text-foreground/85">{a.apr}</span> APR
        </span>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-white/8 pt-4">
        <span className="text-xs text-muted-foreground">Deep liquidity · Instant settlement</span>
        <span className="inline-flex items-center gap-1 text-xs font-medium text-foreground/80 transition-colors group-hover:text-foreground">
          Details <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </motion.div>
  );
}

export function AssetsSection() {
  return (
    <section id="assets" className="relative py-28 sm:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute left-1/2 top-0 h-96 w-[min(92%,62rem)] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.10),transparent_60%)]" />
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:max-w-7xl lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 flex flex-col items-start justify-between gap-6 sm:mb-14 sm:flex-row sm:items-end"
        >
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-emerald-300">Supported Assets</p>
            <h2 className="mt-3 text-balance font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Premium collateral coverage for crypto-backed loans.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Glass-style market cards with live-like pricing, change indicators, and institutional-grade terms —
              optimized for mobile and built to match a world-class fintech aesthetic.
            </p>
          </div>

          <div className="glass inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_0_3px_rgba(52,211,153,0.12)]" />
            Live-style pricing · Updated continuously
          </div>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SUPPORTED.map((sym, i) => (
            <AssetCard key={sym} symbol={sym} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
