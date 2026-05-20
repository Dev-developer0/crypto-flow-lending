import { useEffect, useState } from "react";

/**
 * Lightweight simulated live price (no external API required).
 * Drifts a base price with small random walks so the UI feels alive.
 */
export function useLivePrice(base: number, volatility = 0.0015) {
  const [price, setPrice] = useState(base);
  const [delta, setDelta] = useState(0);

  useEffect(() => {
    setPrice(base);
    const id = setInterval(() => {
      setPrice((prev) => {
        const change = (Math.random() - 0.48) * volatility * prev;
        const next = Math.max(0.0001, prev + change);
        setDelta((next - base) / base);
        return next;
      });
    }, 1800);
    return () => clearInterval(id);
  }, [base, volatility]);

  return { price, delta };
}
