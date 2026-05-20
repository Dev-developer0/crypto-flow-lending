import { motion } from "framer-motion";
import { Users, Coins, Layers, ShieldCheck } from "lucide-react";

const metrics = [
  { icon: Users, label: "Active users", value: "1.4M+" },
  { icon: Coins, label: "Loans issued", value: "$8.2B" },
  { icon: Layers, label: "Supported assets", value: "40+" },
  { icon: ShieldCheck, label: "Security", value: "SOC 2 II" },
];

export function TrustMetrics() {
  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-6xl px-5">
        <div className="glass-strong grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-white/5 md:grid-cols-4">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="bg-background/40 p-6 md:p-8"
            >
              <m.icon className="h-5 w-5 text-emerald-300" />
              <p className="mt-4 font-display text-3xl font-semibold tracking-tight md:text-4xl">
                {m.value}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{m.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
