import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

declare global {
  interface WindowEventMap {
    "lumen:open-demo": CustomEvent;
  }
}

export function DemoModalProvider() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("lumen:open-demo", handler);
    return () => window.removeEventListener("lumen:open-demo", handler);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="glass-strong max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-background/70 p-0 backdrop-blur-xl">
        <div className="p-6 sm:p-7">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 font-display text-xl tracking-tight">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-400/12 ring-1 ring-white/10">
                <Play className="h-4 w-4 text-emerald-300" />
              </span>
              Platform demo
            </DialogTitle>
          </DialogHeader>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 overflow-hidden rounded-2xl border border-white/10 bg-black/30"
          >
            <div className="grid aspect-video place-items-center">
              <div className="text-center">
                <p className="text-sm font-medium text-foreground/90">Demo video placeholder</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Swap this with an embedded video (YouTube/Vimeo) when ready.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

