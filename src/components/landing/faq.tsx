import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "How does a crypto-backed loan work?",
    a: "You deposit supported crypto as collateral into an insured vault. Based on the loan-to-value ratio you choose, we send you a stablecoin or fiat loan instantly. Repay anytime to release your collateral.",
  },
  {
    q: "Will I be liquidated?",
    a: "Liquidation only happens if your collateral's market value drops below the maintenance margin. We send proactive alerts at 65%, 75%, and 85% LTV so you can top up or repay before any action is taken.",
  },
  {
    q: "What are the fees?",
    a: "Zero origination fees, zero prepayment penalties. You only pay interest for the days you borrow — starting at 4.8% APR for stablecoin collateral.",
  },
  {
    q: "Is my crypto safe?",
    a: "Yes. Assets are held in segregated, insured cold storage with our regulated custody partners. We're SOC 2 Type II certified and undergo regular third-party audits.",
  },
  {
    q: "Which countries do you support?",
    a: "Lumen is available in 100+ countries. Check the supported regions page for the latest list.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="relative py-24">
      <div className="mx-auto max-w-3xl px-5">
        <div className="mb-10 text-center">
          <p className="text-sm font-medium text-emerald-300">FAQ</p>
          <h2 className="mt-2 text-3xl font-semibold sm:text-4xl">
            Answers, before you ask.
          </h2>
        </div>

        <Accordion type="single" collapsible className="glass-strong rounded-2xl px-2">
          {faqs.map((f, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="border-white/10 px-4 last:border-b-0"
            >
              <AccordionTrigger className="text-left text-base font-medium hover:no-underline">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
