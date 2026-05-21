import { motion } from "framer-motion";
import { ArrowRight, BadgePercent, ShieldCheck, Zap } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ASSETS } from "@/lib/assets";

export function RatesSection() {
  return (
    <section id="rates" className="relative py-28 sm:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute left-1/2 top-12 h-[520px] w-[min(92%,64rem)] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(52,211,153,0.10),transparent_60%)]" />
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
            <p className="text-sm font-semibold text-emerald-300">Rates</p>
            <h2 className="mt-3 text-balance font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Transparent pricing with premium terms.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              View indicative APR and maximum LTV across top collateral assets. Final terms depend on market
              conditions and risk settings.
            </p>
          </div>

          <div className="glass inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs text-muted-foreground">
            <BadgePercent className="h-3.5 w-3.5 text-emerald-300" />
            No hidden fees · Transparent APR
          </div>
        </motion.div>

        <div className="grid gap-5 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="glass-strong overflow-hidden rounded-3xl border border-white/10 p-7"
          >
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-400/12 ring-1 ring-white/10">
                <Zap className="h-5 w-5 text-emerald-300" />
              </div>
              <div>
                <p className="font-display text-lg font-semibold tracking-tight">Fast funding</p>
                <p className="text-sm text-muted-foreground">Borrow in minutes, not days.</p>
              </div>
            </div>
            <div className="mt-6 space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center justify-between">
                <span>Origination fee</span>
                <span className="font-mono font-semibold text-emerald-300">$0.00</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Prepayment</span>
                <span className="font-mono font-semibold text-foreground/85">$0.00</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Rate updates</span>
                <span className="font-mono font-semibold text-foreground/85">Real-time</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="glass-strong rounded-3xl border border-white/10 p-7 lg:col-span-2"
          >
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-sky-400/12 ring-1 ring-white/10">
                  <ShieldCheck className="h-5 w-5 text-sky-300" />
                </div>
                <div>
                  <p className="font-display text-lg font-semibold tracking-tight">Indicative rates</p>
                  <p className="text-sm text-muted-foreground">APR and max LTV by collateral.</p>
                </div>
              </div>
              <Button
                variant="outline"
                className="h-10 rounded-2xl border-white/12 bg-white/[0.04] px-4 text-sm font-medium text-foreground/90 hover:bg-white/[0.08]"
              >
                Full pricing <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="mt-7 overflow-hidden rounded-2xl border border-white/10">
              <div className="grid grid-cols-[1.2fr_0.8fr_0.8fr] gap-px bg-white/10 text-xs">
                <div className="bg-background/50 px-4 py-3 font-medium text-muted-foreground">Asset</div>
                <div className="bg-background/50 px-4 py-3 text-right font-medium text-muted-foreground">
                  Max LTV
                </div>
                <div className="bg-background/50 px-4 py-3 text-right font-medium text-muted-foreground">
                  APR from
                </div>
                {ASSETS.slice(0, 5).map((a) => (
                  <div key={a.symbol} className="contents">
                    <div className="bg-background/35 px-4 py-3">
                      <span className="mr-2 font-semibold" style={{ color: a.color }}>
                        {a.glyph}
                      </span>
                      <span className="font-medium text-foreground/85">
                        {a.name}{" "}
                        <span className="text-muted-foreground">({a.symbol})</span>
                      </span>
                    </div>
                    <div className="bg-background/35 px-4 py-3 text-right font-mono">
                      {Math.round(a.ltv * 100)}%
                    </div>
                    <div className="bg-background/35 px-4 py-3 text-right font-mono text-emerald-300">
                      {a.apr}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

