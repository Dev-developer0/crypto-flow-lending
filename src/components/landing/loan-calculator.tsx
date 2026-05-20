import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";
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

export function LoanCalculator() {
  const reduceMotion = useReducedMotion();
  const [symbol, setSymbol] = useState<AssetSymbol>("BTC");
  const asset = ASSETS.find((a) => a.symbol === symbol)!;
  const [amount, setAmount] = useState(1);
  const [ltv, setLtv] = useState([asset.ltv * 100]);

  const { price, delta } = useLivePrice(asset.base, symbol === "USDT" ? 0.0002 : 0.002);
  const up = delta >= 0;
  const collateralValue = amount * price;
  const loan = (collateralValue * ltv[0]) / 100;
  const monthly = useMemo(
    () => (loan * (parseFloat(asset.apr) / 100)) / 12,
    [loan, asset.apr],
  );
  const interestYearly = useMemo(() => loan * (parseFloat(asset.apr) / 100), [loan, asset.apr]);

  return (
    <section id="borrow" className="relative py-28 sm:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute left-1/2 top-16 h-[560px] w-[min(92%,64rem)] -translate-x-1/2 rounded-full bg-emerald-500/8 blur-[140px]" />
        <div className="absolute right-[-10%] top-48 h-[420px] w-[420px] rounded-full bg-sky-500/8 blur-[140px]" />
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
            <p className="text-sm font-semibold text-emerald-300">Crypto-backed loan calculator</p>
            <h2 className="mt-3 text-balance font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Model your borrowing power in seconds.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              Choose an asset, set collateral and LTV, and view a real-time estimate. No credit checks — just
              transparent, premium terms.
            </p>
          </div>

          <div className="glass inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-emerald-300" />
            Live-style pricing · Instant recalculation
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="glass-strong glow-ring mx-auto grid max-w-5xl gap-10 rounded-[2rem] border border-white/10 p-6 md:p-10 lg:grid-cols-[1.1fr_1fr]"
        >
          <div className="space-y-6">
            <div>
              <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Collateral asset
              </label>
              <Select value={symbol} onValueChange={(v) => setSymbol(v as AssetSymbol)}>
                <SelectTrigger className="mt-2 h-12 rounded-2xl border-white/10 bg-white/5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="border-white/10 bg-background/90 backdrop-blur-xl">
                  {ASSETS.map((a) => (
                    <SelectItem key={a.symbol} value={a.symbol}>
                      <span className="mr-2 inline-block" style={{ color: a.color }}>
                        {a.glyph}
                      </span>
                      {a.name} ({a.symbol})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Collateral amount
              </label>
              <div className="relative mt-2">
                <Input
                  type="number"
                  min={0}
                  step={0.01}
                  value={amount}
                  onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                  className="h-12 rounded-2xl border-white/10 bg-white/5 pr-16 font-mono text-lg"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  {symbol}
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                ≈ ${collateralValue.toLocaleString(undefined, { maximumFractionDigits: 0 })} at live price
              </p>
            </div>

            <div>
              <div className="flex items-baseline justify-between">
                <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Loan-to-Value
                </label>
                <span className="font-mono text-sm font-semibold text-emerald-300">{ltv[0]}%</span>
              </div>
              <Slider
                value={ltv}
                onValueChange={setLtv}
                min={10}
                max={asset.ltv * 100}
                step={1}
                className="mt-4"
              />
              <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                <span>
                  Max for {asset.name}:{" "}
                  <span className="font-semibold text-foreground/85">{Math.round(asset.ltv * 100)}%</span>
                </span>
                <span className={up ? "text-emerald-300" : "text-rose-300"}>
                  {up ? "+" : ""}
                  {(delta * 100).toFixed(2)}%{" "}
                  <span className="text-muted-foreground">({asset.symbol} 24h)</span>
                </span>
              </div>
            </div>
          </div>

          <motion.div
            whileHover={reduceMotion ? undefined : { y: -3 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-400/10 via-sky-500/5 to-violet-500/10 p-6"
          >
            <div
              className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full opacity-25 blur-3xl"
              style={{ background: asset.color }}
              aria-hidden
            />
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground">
                Estimated loan
              </p>
              <p className="mt-1 font-display text-4xl font-semibold text-gradient">
                ${loan.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </p>
              <div className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Interest (APR)</span>
                  <span className="font-mono">{asset.apr}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Yearly interest (est.)</span>
                  <span className="font-mono">
                    ${interestYearly.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Monthly interest</span>
                  <span className="font-mono">
                    ${monthly.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Origination fee</span>
                  <span className="font-mono text-emerald-300">$0.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Collateral value</span>
                  <span className="font-mono">
                    ${collateralValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                </div>
              </div>
            </div>
            <Button
              size="lg"
              className="mt-8 h-[3.25rem] w-full rounded-2xl bg-gradient-to-r from-emerald-300 via-emerald-400 to-sky-400 font-semibold text-slate-950 btn-primary-glow transition-transform duration-300 hover:scale-[1.01] active:scale-[0.98]"
            >
              Apply for this loan
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
