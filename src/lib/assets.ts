// Crypto data with mock baseline prices used as fallback for the live ticker.
export type AssetSymbol = "BTC" | "ETH" | "SOL" | "USDT" | "BNB";

export const ASSETS: {
  symbol: AssetSymbol;
  name: string;
  ltv: number;
  apr: string;
  color: string;
  glyph: string;
  base: number;
}[] = [
  { symbol: "BTC", name: "Bitcoin", ltv: 0.5, apr: "5.9%", color: "#F7931A", glyph: "₿", base: 96420 },
  { symbol: "ETH", name: "Ethereum", ltv: 0.5, apr: "6.4%", color: "#8C8DFC", glyph: "Ξ", base: 3680 },
  { symbol: "SOL", name: "Solana", ltv: 0.4, apr: "7.2%", color: "#14F195", glyph: "◎", base: 184 },
  { symbol: "USDT", name: "Tether", ltv: 0.9, apr: "4.8%", color: "#26A17B", glyph: "₮", base: 1 },
  { symbol: "BNB", name: "BNB", ltv: 0.45, apr: "6.9%", color: "#F3BA2F", glyph: "⬡", base: 615 },
];
