import { headers } from "next/headers";
import { LRUCache } from "lru-cache";

type Options = {
  uniqueTokenPerInterval?: number;
  interval?: number;
};

export function IP() {
  const FALLBACK_IP_ADDRESS = "0.0.0.0";
  const forwardedFor = headers().get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0] ?? FALLBACK_IP_ADDRESS;
  }

  return headers().get("x-real-ip") ?? FALLBACK_IP_ADDRESS;
}

export function rateLimit(options?: Options) {
  const tokenCache = new LRUCache({
    max: options?.uniqueTokenPerInterval || 500,
    ttl: options?.interval || 60000,
  });

  return {
    check: (limit: number, token?: string) => {
      const resolvedToken = token || IP();
      const tokenCount = (tokenCache.get(resolvedToken) as number[]) || [0];
      if (tokenCount[0] === 0) {
        tokenCache.set(resolvedToken, tokenCount);
      }
      tokenCount[0] += 1;

      const currentUsage = tokenCount[0];

      return currentUsage >= limit;
    },
  };
}
