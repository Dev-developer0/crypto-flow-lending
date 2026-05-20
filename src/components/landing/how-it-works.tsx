import { motion } from "framer-motion";
import { Banknote, ChevronRight, ShieldCheck, Wallet } from "lucide-react";

const steps = [
  {
    icon: Wallet,
    title: "Connect Wallet",
    desc: "Securely connect MetaMask or WalletConnect. We never custody keys — you stay in control.",
  },
  {
    icon: ShieldCheck,
    title: "Deposit Crypto",
    desc: "Deposit supported assets into an insured vault. Collateral is monitored with real-time risk controls.",
  },
  {
    icon: Banknote,
    title: "Receive Loan",
    desc: "Select your LTV and term. Get funded instantly while keeping upside exposure to your crypto.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="relative py-28 sm:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute left-1/2 top-12 h-[520px] w-[min(92%,64rem)] -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,rgba(167,139,250,0.10),transparent_60%)]" />
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
            <p className="text-sm font-semibold text-emerald-300">How it works</p>
            <h2 className="mt-3 text-balance font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              From wallet to funded in three premium steps.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              A streamlined flow designed like a world-class fintech platform — fast onboarding, protected
              collateral, instant loan issuance.
            </p>
          </div>

          <div className="glass inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_0_3px_rgba(52,211,153,0.12)]" />
            Typically under 2 minutes end-to-end
          </div>
        </motion.div>

        <div className="relative grid gap-5 md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="glass-strong group relative overflow-hidden rounded-3xl border border-white/10 p-7 shadow-[0_24px_80px_-40px_rgba(0,0,0,0.75)]"
            >
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-25 blur-3xl transition-opacity duration-500 group-hover:opacity-40"
                style={{
                  background:
                    i === 0
                      ? "oklch(0.78 0.18 165)"
                      : i === 1
                        ? "oklch(0.68 0.15 230)"
                        : "oklch(0.72 0.2 275)",
                }}
                aria-hidden
              />

              <div className="flex items-start justify-between gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-emerald-400/18 via-sky-500/10 to-violet-500/18 ring-1 ring-white/10">
                  <s.icon className="h-5 w-5 text-emerald-300" />
                </div>
                <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] text-muted-foreground">
                  0{i + 1}
                </span>
              </div>

              <h3 className="mt-5 font-display text-xl font-semibold tracking-tight">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>

              <div className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-foreground/70 transition-colors group-hover:text-foreground/90">
                Learn more <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
