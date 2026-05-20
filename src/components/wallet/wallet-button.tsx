import { ConnectButton } from "@rainbow-me/rainbowkit";
import { motion } from "framer-motion";
import { ChevronDown, Copy, ExternalLink, LogOut, Wallet } from "lucide-react";
import { useDisconnect } from "wagmi";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function shortAddr(addr?: string) {
  if (!addr) return "";
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

export function WalletButton() {
  const { disconnect, isPending: isDisconnecting } = useDisconnect();

  return (
    <ConnectButton.Custom>
      {({ account, chain, mounted, openConnectModal, openAccountModal, openChainModal }) => {
        const ready = mounted;
        const connected = ready && account && chain;

        if (!ready) {
          return (
            <div className="h-10 w-[168px] animate-pulse rounded-xl border border-white/10 bg-white/5" />
          );
        }

        if (!connected) {
          return (
            <motion.button
              type="button"
              onClick={openConnectModal}
              whileHover={{ y: -1, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="group relative inline-flex h-10 items-center gap-2 overflow-hidden rounded-xl border border-white/10 bg-gradient-to-r from-emerald-300 via-emerald-400 to-sky-400 px-4 text-sm font-semibold text-slate-950 shadow-[0_16px_50px_-20px_rgba(52,211,153,0.75)] transition-shadow hover:shadow-[0_22px_60px_-18px_rgba(52,211,153,0.9)]"
            >
              <span className="relative z-10 inline-flex items-center gap-2">
                <Wallet className="h-4 w-4" />
                Connect wallet
              </span>
              <span
                className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent animate-shimmer-sweep"
                aria-hidden
              />
            </motion.button>
          );
        }

        return (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={openChainModal}
              className="glass hidden h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 text-sm font-medium text-foreground/90 hover:bg-white/10 md:inline-flex"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              {chain.name}
              <ChevronDown className="h-4 w-4 opacity-70" />
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.button
                  type="button"
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.99 }}
                  className="glass group inline-flex h-10 items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3.5 text-sm font-semibold text-foreground/90 hover:bg-white/10"
                >
                  <span className="inline-flex items-center gap-2">
                    <span className="grid h-7 w-7 place-items-center rounded-lg bg-white/6">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    </span>
                    <span className="hidden sm:inline">{shortAddr(account.address)}</span>
                    <span className="sm:hidden">Wallet</span>
                  </span>
                  <ChevronDown className="h-4 w-4 opacity-70 transition-transform group-hover:translate-y-[1px]" />
                </motion.button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="min-w-[240px] border-white/10 bg-background/90 backdrop-blur-xl"
              >
                <div className="px-2 py-1.5">
                  <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    Connected
                  </p>
                  <p className="mt-1 font-mono text-sm font-semibold text-foreground">
                    {shortAddr(account.address)}
                  </p>
                </div>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem
                  className="cursor-pointer gap-2"
                  onSelect={async () => {
                    await navigator.clipboard.writeText(account.address);
                  }}
                >
                  <Copy className="h-4 w-4" />
                  Copy address
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer gap-2" onSelect={openAccountModal}>
                  <ExternalLink className="h-4 w-4" />
                  Wallet details
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem
                  className="cursor-pointer gap-2 text-rose-300 focus:text-rose-200"
                  disabled={isDisconnecting}
                  onSelect={() => disconnect()}
                >
                  <LogOut className="h-4 w-4" />
                  {isDisconnecting ? "Disconnecting…" : "Disconnect"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}

