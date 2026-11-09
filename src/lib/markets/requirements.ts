import type { ReportType } from "./schema";

/** Stable coverage keys shared by validation and report-generation instructions. */
export const REQUIRED_TOPICS: Record<ReportType, readonly string[]> = {
  "opening-bell": ["index-open", "sectors", "attribution", "breadth-bank-nifty", "cross-assets", "catalysts", "watchlist", "historical-returns"],
  "mid-market-review": ["intraday-direction", "bull-bear-evidence", "news-attribution", "stocks-indices", "conditional-triggers"],
  "daily-study": ["index-closes", "attribution", "breadth", "sector-rotation", "corporate-developments", "institutional-flows", "company-deep-dive", "philosophy-fit", "historical-returns", "cross-assets"],
  "opening-brief": ["index-open", "sectors", "attribution", "breadth-bank-nifty", "cross-assets", "catalysts", "watchlist", "historical-returns"],
  "market-review": ["index-closes", "attribution", "breadth", "sector-rotation", "corporate-developments", "institutional-flows", "company-deep-dive", "philosophy-fit", "historical-returns", "cross-assets", "indices-volatility", "currency-flows", "commodities", "india-rates-liquidity", "us-rates-policy", "credit-spreads", "causal-channels", "yield-vs-price"],
  "risk-monitor": ["indices-volatility", "currency-flows", "commodities", "india-rates-liquidity", "us-rates-policy", "credit-spreads", "causal-channels", "yield-vs-price", "historical-returns"],
};