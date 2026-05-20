import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mainnet } from "wagmi/chains";

const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID as string | undefined;

export const wagmiConfig = getDefaultConfig({
  appName: "Lumen",
  projectId: projectId ?? "missing_walletconnect_project_id",
  chains: [mainnet],
  ssr: true,
});

