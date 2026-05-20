import { Github, Twitter, Linkedin } from "lucide-react";

const cols = [
  {
    title: "Product",
    links: ["Borrow", "Earn", "Card", "Exchange", "API"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Press", "Blog", "Security"],
  },
  {
    title: "Resources",
    links: ["Help center", "Status", "Tax docs", "Audits", "Sitemap"],
  },
];

export function Footer() {
  return (
    <footer className="relative mt-12 border-t border-white/10 bg-background/60">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-emerald-400 via-sky-400 to-violet-500 text-[15px] font-bold text-slate-950">
                L
              </span>
              <span className="font-display text-lg font-semibold">Lumen</span>
            </div>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              The premium way to unlock liquidity from your crypto. Built by ex-Coinbase and
              Stripe engineers.
            </p>
            <div className="mt-5 flex gap-2">
              {[Twitter, Github, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 text-muted-foreground transition hover:bg-white/5 hover:text-foreground"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <p className="text-sm font-semibold">{c.title}</p>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Lumen Finance. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Disclosures</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
