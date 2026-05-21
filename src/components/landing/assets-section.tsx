import { motion, useReducedMotion } from "framer-motion";
import { TrendingDown, TrendingUp } from "lucide-react";
import { ASSETS, type AssetSymbol } from "@/lib/assets";
import { useLivePrice } from "@/hooks/use-live-price";
import { scrollToId } from "@/lib/scroll";

const SUPPORTED: AssetSymbol[] = ["BTC", "ETH", "SOL", "USDT", "BNB"];

function Sparkline({ symbol, seed, up }: { symbol: string; seed: number; up: boolean }) {
  const gradId = `spark-${symbol}-${up ? "up" : "dn"}`;
  const points = Array.from({ length: 22 }).map((_, i) => {
    const t = i / 21;
    const wave = Math.sin(t * Math.PI * 2 + seed / 1400) * 7;
    const drift = (up ? 1 : -1) * (t - 0.5) * 10;
    return `${t * 100},${20 - wave - drift}`;
  });

  return (
    <svg viewBox="0 0 100 40" className="h-10 w-[92px]" aria-hidden>
      <defs>
        <linearGradient id={gradId} x1="0" x2="0" y1="0" y2="1">
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
      <polygon fill={`url(#${gradId})`} points={`0,40 ${points.join(" ")} 100,40`} />
    </svg>
  );
}

function AssetCard({ symbol, i }: { symbol: AssetSymbol; i: number }) {
  const reduceMotion = useReducedMotion();
  const a = ASSETS.find((x) => x.symbol === symbol)!;
  const { price, delta } = useLivePrice(a.base, symbol === "USDT" ? 0.0002 : 0.002);
  const up = delta >= 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.65, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduceMotion ? undefined : { y: -8 }}
      className="glass-strong group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 p-5 shadow-[0_24px_80px_-40px_rgba(0,0,0,0.85)] sm:p-6"
    >
      {/* Gradient bloom */}
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full opacity-20 blur-3xl transition-opacity duration-500 group-hover:opacity-40"
        style={{ background: a.color }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden
      />

      {/* Header */}
      <div className="relative flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <motion.div
            className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-lg font-bold text-slate-950 shadow-lg"
            style={{ background: `linear-gradient(135deg, ${a.color}, ${a.color}dd)` }}
            whileHover={reduceMotion ? undefined : { scale: 1.06, rotate: 2 }}
            transition={{ type: "spring", stiffness: 400, damping: 18 }}
          >
            {a.glyph}
          </motion.div>
          <div className="min-w-0">
            <h3 className="truncate font-display text-lg font-semibold tracking-tight">{a.name}</h3>
            <p className="mt-0.5 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              {a.symbol}/USD
            </p>
          </div>
        </div>

        <span
          className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
            up ? "bg-emerald-400/12 text-emerald-300" : "bg-rose-400/12 text-rose-300"
          }`}
        >
          {up ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
          {up ? "+" : ""}
          {(delta * 100).toFixed(2)}%
        </span>
      </div>

      {/* Live price */}
      <div className="relative mt-6 flex items-end justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Live price
          </p>
          <motion.p
            key={Math.floor(price * (price < 5 ? 10000 : 1))}
            initial={{ opacity: 0.6, y: 2 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-1.5 font-mono text-2xl font-semibold tabular-nums tracking-tight sm:text-3xl"
          >
            ${price.toLocaleString(undefined, { maximumFractionDigits: price < 5 ? 4 : 0 })}
          </motion.p>
        </div>
        <Sparkline symbol={symbol} seed={price} up={up} />
      </div>

      {/* Terms */}
      <div className="relative mt-5 grid grid-cols-2 gap-3 rounded-2xl border border-white/8 bg-white/[0.03] p-3 text-xs">
        <div>
          <p className="text-muted-foreground">Max LTV</p>
          <p className="mt-0.5 font-mono font-semibold text-foreground/90">
            {Math.round(a.ltv * 100)}%
          </p>
        </div>
        <div className="text-right">
          <p className="text-muted-foreground">APR from</p>
          <p className="mt-0.5 font-mono font-semibold text-emerald-300">{a.apr}</p>
        </div>
      </div>

      {/* CTA */}
      <button
        type="button"
        onClick={() => scrollToId("borrow")}
        className="relative mt-5 w-full rounded-xl border border-white/10 bg-white/[0.04] py-2.5 text-sm font-medium text-foreground/80 transition-all hover:border-emerald-400/30 hover:bg-emerald-400/10 hover:text-foreground"
      >
        Borrow against {a.symbol}
      </button>
    </motion.article>
  );
}

export function AssetsSection() {
  return (
    <section id="assets" className="relative scroll-mt-28 py-28 sm:scroll-mt-32 sm:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent" />
        <div className="absolute left-1/2 top-0 h-[28rem] w-[min(95%,64rem)] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(52,211,153,0.08),transparent_55%)]" />
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:max-w-7xl lg:px-8">
        <motion.header
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 flex flex-col items-start justify-between gap-6 sm:mb-14 lg:flex-row lg:items-end"
        >
          <div className="max-w-2xl">
            <p className="text-sm font-semibold text-emerald-300">Supported Assets</p>
            <h2 className="mt-3 text-balance font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Borrow against BTC, ETH, SOL, USDT, and BNB.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Premium glass cards with live-style pricing, percentage changes, and institutional loan
              terms — fully responsive across mobile and desktop.
            </p>
          </div>

          <div className="glass inline-flex items-center gap-2.5 rounded-full border border-white/10 px-4 py-2.5 text-xs text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Live-style pricing · Updates every ~2s
          </div>
        </motion.header>

        {/* Responsive grid: 1 → 2 → 3 cols; 5th card spans nicely on lg */}
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-5">
          {SUPPORTED.map((sym, i) => (
            <AssetCard key={sym} symbol={sym} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
