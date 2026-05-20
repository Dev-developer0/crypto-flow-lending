import "@rainbow-me/rainbowkit/styles.css";

import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";

import { wagmiConfig } from "@/lib/wallet";

export function WalletProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <RainbowKitProvider
        theme={darkTheme({
          accentColor: "#34d399",
          accentColorForeground: "#07150f",
          borderRadius: "large",
          overlayBlur: "small",
        })}
        modalSize="compact"
      >
        {children}
      </RainbowKitProvider>
    </WagmiProvider>
  );
}

