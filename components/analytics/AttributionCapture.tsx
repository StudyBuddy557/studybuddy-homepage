"use client";

import { useEffect } from "react";
import { useSearchParams, usePathname } from "next/navigation";

const ATTRIBUTION_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "gclid",
  "gbraid",
  "wbraid",
  "fbclid",
  "ttclid",
] as const;

const COOKIE_PREFIX = "sb_";
const MAX_AGE = 604800; // 7 days in seconds

export default function AttributionCapture() {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window === "undefined" || typeof document === "undefined") {
      return;
    }

    // Collect attribution parameters from URL
    const attributionData: Record<string, string> = {};
    
    ATTRIBUTION_KEYS.forEach((key) => {
      const value = searchParams?.get(key);
      if (value) {
        attributionData[key] = value;
      }
    });

    // Only write cookies if we found at least one attribution parameter
    if (Object.keys(attributionData).length === 0) {
      return;
    }

    // Determine if we should set Secure flag
    const isHttps = window.location.protocol === "https:";
    const secureFlag = isHttps ? "; Secure" : "";

    // Write each attribution value to a cookie
    Object.entries(attributionData).forEach(([key, value]) => {
      const cookieName = ${COOKIE_PREFIX}${key};
      const cookieValue = encodeURIComponent(value);
      const cookie = ${cookieName}=${cookieValue}; max-age=${MAX_AGE}; path=/; SameSite=Lax${secureFlag};
      
      document.cookie = cookie;
    });
  }, [searchParams, pathname]);

  return null;
}
