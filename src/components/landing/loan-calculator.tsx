import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Calculator, Percent, TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ASSETS, type AssetSymbol } from "@/lib/assets";
import { useLivePrice } from "@/hooks/use-live-price";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

function AnimatedUsd({ value, className }: { value: number; className?: string }) {
  return (
    <motion.span
      key={Math.floor(value)}
      initial={{ opacity: 0.5, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      ${value.toLocaleString(undefined, { maximumFractionDigits: value < 100 ? 2 : 0 })}
    </motion.span>
  );
}

export function LoanCalculator() {
  const reduceMotion = useReducedMotion();
  const [symbol, setSymbol] = useState<AssetSymbol>("BTC");
  const asset = ASSETS.find((a) => a.symbol === symbol)!;
  const [amount, setAmount] = useState(1);
  const maxLtv = Math.round(asset.ltv * 100);
  const [ltv, setLtv] = useState([maxLtv]);

  const { price, delta } = useLivePrice(asset.base, symbol === "USDT" ? 0.0002 : 0.002);
  const up = delta >= 0;
  const aprNum = parseFloat(asset.apr);

  const collateralValue = amount * price;
  const ltvPct = ltv[0];
  const estimatedLoan = (collateralValue * ltvPct) / 100;
  const yearlyInterest = useMemo(() => estimatedLoan * (aprNum / 100), [estimatedLoan, aprNum]);
  const monthlyInterest = yearlyInterest / 12;

  useEffect(() => {
    const nextMax = Math.round(asset.ltv * 100);
    setLtv((prev) => [Math.min(prev[0], nextMax)]);
  }, [symbol, asset.ltv]);

  const handleAssetChange = (v: string) => {
    const next = ASSETS.find((a) => a.symbol === v)!;
    setSymbol(v as AssetSymbol);
    setLtv([Math.round(next.ltv * 100)]);
  };

  return (
    <section id="borrow" className="relative scroll-mt-28 py-28 sm:scroll-mt-32 sm:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/25 to-transparent" />
        <div className="absolute left-1/2 top-20 h-[600px] w-[min(92%,64rem)] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-[140px]" />
        <div className="absolute right-[-8%] top-40 h-[480px] w-[480px] rounded-full bg-violet-500/8 blur-[140px]" />
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
            <p className="text-sm font-semibold text-emerald-300">Loan calculator</p>
            <h2 className="mt-3 text-balance font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Estimate your crypto-backed loan instantly.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Select collateral, set amount and LTV — see estimated loan size and interest in real time.
            </p>
          </div>
          <div className="glass inline-flex items-center gap-2.5 rounded-full border border-white/10 px-4 py-2.5 text-xs text-muted-foreground">
            <Calculator className="h-3.5 w-3.5 text-emerald-300" />
            No credit check · Instant estimates
          </div>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="glass-strong glow-ring mx-auto grid max-w-5xl gap-8 overflow-hidden rounded-[2rem] border border-white/10 p-6 md:gap-10 md:p-10 lg:grid-cols-[1.05fr_0.95fr]"
        >
          {/* Inputs */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-7"
          >
            {/* Asset selector */}
            <motion.div custom={0} variants={fadeUp}>
              <label
                htmlFor="collateral-asset"
                className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground"
              >
                Crypto asset (collateral)
              </label>
              <Select value={symbol} onValueChange={handleAssetChange}>
                <SelectTrigger
                  id="collateral-asset"
                  className="mt-2.5 h-14 rounded-2xl border-white/10 bg-white/[0.04] text-base shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="border-white/10 bg-background/95 backdrop-blur-xl">
                  {ASSETS.map((a) => (
                    <SelectItem key={a.symbol} value={a.symbol} className="py-2.5">
                      <span
                        className="mr-2.5 inline-flex h-7 w-7 items-center justify-center rounded-lg text-sm font-bold text-slate-950"
                        style={{ background: a.color }}
                      >
                        {a.glyph}
                      </span>
                      {a.name}{" "}
                      <span className="text-muted-foreground">({a.symbol})</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                <span className="font-mono text-foreground/80">
                  ${price.toLocaleString(undefined, { maximumFractionDigits: price < 5 ? 4 : 0 })}
                </span>
                <span className={up ? "text-emerald-300" : "text-rose-300"}>
                  {up ? <TrendingUp className="mr-0.5 inline h-3 w-3" /> : <TrendingDown className="mr-0.5 inline h-3 w-3" />}
                  {(delta * 100).toFixed(2)}%
                </span>
              </p>
            </motion.div>

            {/* Collateral amount */}
            <motion.div custom={1} variants={fadeUp}>
              <label
                htmlFor="collateral-amount"
                className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground"
              >
                Collateral amount
              </label>
              <div className="relative mt-2.5">
                <Input
                  id="collateral-amount"
                  type="number"
                  min={0}
                  step={symbol === "USDT" ? 100 : symbol === "BTC" ? 0.01 : 0.1}
                  value={amount || ""}
                  onChange={(e) => setAmount(Math.max(0, parseFloat(e.target.value) || 0))}
                  className="h-14 rounded-2xl border-white/10 bg-white/[0.04] pr-16 font-mono text-xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 rounded-lg bg-white/5 px-2 py-0.5 text-sm font-semibold text-muted-foreground">
                  {symbol}
                </span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Collateral value:{" "}
                <AnimatedUsd value={collateralValue} className="font-mono font-semibold text-foreground/90" />
              </p>
            </motion.div>

            {/* LTV */}
            <motion.div custom={2} variants={fadeUp}>
              <div className="flex items-end justify-between gap-4">
                <label className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
                  LTV ratio
                </label>
                <motion.span
                  key={ltvPct}
                  initial={{ scale: 0.92, opacity: 0.6 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="font-mono text-2xl font-semibold text-emerald-300"
                >
                  {ltvPct}%
                </motion.span>
              </div>

              <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-sky-400"
                  initial={false}
                  animate={{ width: `${(ltvPct / maxLtv) * 100}%` }}
                  transition={{ type: "spring", stiffness: 120, damping: 20 }}
                />
              </div>

              <Slider
                value={ltv}
                onValueChange={setLtv}
                min={10}
                max={maxLtv}
                step={1}
                className="mt-5"
              />

              <div className="mt-3 flex justify-between text-xs text-muted-foreground">
                <span>Min 10%</span>
                <span>
                  Max <span className="font-semibold text-foreground/85">{maxLtv}%</span> for {asset.name}
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Results */}
          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={reduceMotion ? undefined : { y: -4 }}
            className="relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-400/[0.12] via-sky-500/[0.06] to-violet-500/[0.1] p-6 sm:p-7"
          >
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-30 blur-3xl"
              style={{ background: asset.color }}
              aria-hidden
            />

            <div className="relative flex items-center gap-2 text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">
              <Wallet className="h-4 w-4 text-emerald-300" />
              Loan estimate
            </div>

            <p className="relative mt-2 text-xs text-muted-foreground">Estimated loan amount</p>
            <motion.p
              key={Math.floor(estimatedLoan)}
              initial={{ opacity: 0.6, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="relative mt-1 font-display text-4xl font-semibold tracking-tight text-gradient sm:text-5xl"
            >
              ${estimatedLoan.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </motion.p>

            <div className="relative mt-8 space-y-3 rounded-2xl border border-white/10 bg-black/20 p-4 backdrop-blur-sm">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Percent className="h-4 w-4" />
                  Interest (APR)
                </span>
                <span className="font-mono font-semibold">{asset.apr}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Yearly interest (est.)</span>
                <span className="font-mono font-medium">
                  <AnimatedUsd value={yearlyInterest} />
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Monthly interest (est.)</span>
                <span className="font-mono font-medium">
                  <AnimatedUsd value={monthlyInterest} />
                </span>
              </div>
              <div className="h-px bg-white/10" />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Collateral locked</span>
                <span className="font-mono font-medium">
                  <AnimatedUsd value={collateralValue} />
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Origination fee</span>
                <span className="font-mono font-semibold text-emerald-300">$0.00</span>
              </div>
            </div>

            <div className="relative mt-6 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="h-12 flex-1 rounded-2xl bg-gradient-to-r from-emerald-300 via-emerald-400 to-sky-400 font-semibold text-slate-950 btn-primary-glow transition-transform hover:scale-[1.01] active:scale-[0.98]"
              >
                <Link to="/signup">
                  Apply Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 flex-1 rounded-2xl border-white/12 bg-white/[0.04] font-medium hover:bg-white/[0.08]"
              >
                <Link to="/signup">Submit Application</Link>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
