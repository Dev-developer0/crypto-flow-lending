import { motion } from "framer-motion";
import { Star } from "lucide-react";

const items = [
  {
    quote:
      "I unlocked a six-figure loan against my BTC in under ten minutes — without triggering a taxable event. The UX feels like Stripe for crypto.",
    name: "Marcus Chen",
    title: "Founder, Northwind Capital",
    initials: "MC",
  },
  {
    quote:
      "Lumen's transparency and instant funding made it our default treasury tool. The rates are unmatched in the industry.",
    name: "Sofia Alvarez",
    title: "CFO, Helio Labs",
    initials: "SA",
  },
  {
    quote:
      "Custody is institutional-grade, the calculator is honest, and customer support actually picks up. Easy 10/10.",
    name: "Dimitri Volkov",
    title: "Long-term BTC holder",
    initials: "DV",
  },
];

export function Testimonials() {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-12 text-center">
          <p className="text-sm font-medium text-emerald-300">Trusted globally</p>
          <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">
            Loved by holders, builders & funds.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {items.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-strong flex flex-col justify-between rounded-3xl p-6"
            >
              <div className="flex gap-1 text-emerald-300">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <blockquote className="mt-4 text-sm leading-relaxed text-foreground/90">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-emerald-400 to-violet-500 text-sm font-semibold text-slate-950">
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.title}</p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
