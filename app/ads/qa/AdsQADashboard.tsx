"use client";

import { useEffect, useState } from "react";

type EventParams = Record<string, string | number | boolean | undefined>;
const fired = new Set<string>();

function isEnabled() {
  return process.env.NEXT_PUBLIC_ANALYTICS_ENABLED !== "0";
}

function isDebug() {
  return (
    process.env.NODE_ENV !== "production" &&
    process.env.NEXT_PUBLIC_ANALYTICS_DEBUG === "1"
  );
}

function generateEventId() {
  try {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
      return crypto.randomUUID();
    }
  } catch {}
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

function dispatchGA4(eventName: string, params: EventParams) {
  try {
    const w = window as any;
    
    // Priority 1: Use dataLayer if available
    if (Array.isArray(w.dataLayer)) {
      w.dataLayer.push({ event: eventName, ...params });
      if (isDebug()) {
        console.log("[QA Analytics] Dispatched via dataLayer", eventName, params);
      }
      return;
    }
    
    // Priority 2: Fallback to gtag if dataLayer not available
    if (typeof w.gtag === "function") {
      w.gtag("event", eventName, params);
      if (isDebug()) {
        console.log("[QA Analytics] Dispatched via gtag", eventName, params);
      }
      return;
    }
    
    if (isDebug()) console.log("[QA Analytics] No GA4 detected", eventName);
  } catch (e) {
    if (isDebug()) console.log("[QA Analytics] Dispatch error", e);
  }
}

function track(eventName: string, params: EventParams = {}) {
  if (typeof window === "undefined") return;
  if (!isEnabled()) return;

  const event_id = (params.event_id as string) || generateEventId();
  const payload = { ...params, event_id };

  const key = `${eventName}:${event_id}`;
  if (fired.has(key)) return;
  fired.add(key);

  dispatchGA4(eventName, payload);
  if (isDebug()) console.log("[QA Analytics] Tracked", eventName, payload);
}

function readCookie(name: string) {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(new RegExp(`${name}=([^;]+)`));
  return match ? decodeURIComponent(match[1]) : undefined;
}

function getAttributionFromCookies(): Record<string, string> {
  const keys = [
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
  ];

  const out: Record<string, string> = {};
  keys.forEach((k) => {
    const v = readCookie(`sb_${k}`);
    if (v) out[k] = v;
  });
  return out;
}

export default function AdsQADashboard() {
  const [mounted, setMounted] = useState(false);
  const [log, setLog] = useState<string[]>([]);
  const [attribution, setAttribution] = useState<Record<string, string>>({});

  useEffect(() => {
    // Ensures first render matches server HTML, then loads cookies after mount
    setMounted(true);
    setAttribution(getAttributionFromCookies());
  }, []);

  const addLog = (msg: string) =>
    setLog((prev) => [...prev, `${new Date().toISOString()} — ${msg}`]);

  const refresh = () => {
    setAttribution(getAttributionFromCookies());
    addLog("Refreshed attribution cookies");
  };

  const testDedupe = () => {
    const eid = generateEventId();
    track("sb_diagnostic_start", {
      exam: "TEAS7",
      flow: "diagnostic",
      version: "v1",
      diagnostic_id: "dedupe-test",
      event_id: eid,
    });
    track("sb_diagnostic_start", {
      exam: "TEAS7",
      flow: "diagnostic",
      version: "v1",
      diagnostic_id: "dedupe-test",
      event_id: eid,
    });
    addLog("Test Dedupe fired twice with same event_id (should show once)");
  };

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>
        Ads QA Dashboard
      </h1>

      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: 10,
          padding: 16,
          marginBottom: 16,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2 style={{ fontSize: 18, fontWeight: 600 }}>Attribution Cookies</h2>
          <button onClick={refresh} style={{ padding: "8px 12px" }}>
            Refresh
          </button>
        </div>

        {!mounted ? (
          <p style={{ marginTop: 10 }}>Loading cookies...</p>
        ) : Object.keys(attribution).length === 0 ? (
          <p style={{ marginTop: 10 }}>
            No cookies found. Visit a page with UTMs first, e.g.
            <code> ?utm_source=test&utm_medium=cpc&utm_campaign=test</code>
          </p>
        ) : (
          <pre
            style={{
              background: "#f7f7f7",
              padding: 12,
              borderRadius: 8,
              marginTop: 10,
            }}
          >
            {JSON.stringify(attribution, null, 2)}
          </pre>
        )}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <button
          onClick={() => {
            track("sb_diagnostic_start", {
              exam: "TEAS7",
              flow: "diagnostic",
              version: "v1",
              diagnostic_id: "qa-123",
            });
            addLog("Fired sb_diagnostic_start");
          }}
        >
          sb_diagnostic_start
        </button>

        <button
          onClick={() => {
            track("sb_diagnostic_complete", {
              exam: "TEAS7",
              flow: "diagnostic",
              version: "v1",
              diagnostic_id: "qa-123",
              score: 85,
              time_seconds: 1200,
            });
            addLog("Fired sb_diagnostic_complete");
          }}
        >
          sb_diagnostic_complete
        </button>

        <button
          onClick={() => {
            track("sb_pricing_view", {});
            addLog("Fired sb_pricing_view");
          }}
        >
          sb_pricing_view
        </button>

        <button
          onClick={() => {
            track("generate_lead", {});
            addLog("Fired generate_lead");
          }}
        >
          generate_lead
        </button>

        <button onClick={testDedupe} style={{ gridColumn: "1 / -1" }}>
          Test Dedupe (same event_id twice)
        </button>
      </div>

      {log.length > 0 && (
        <div
          style={{
            marginTop: 16,
            background: "#111",
            color: "#0f0",
            padding: 14,
            borderRadius: 10,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 8,
            }}
          >
            <strong style={{ color: "#fff" }}>Log</strong>
            <button onClick={() => setLog([])} style={{ padding: "4px 10px" }}>
              Clear
            </button>
          </div>
          {log.map((l, i) => (
            <div key={i}>{l}</div>
          ))}
        </div>
      )}
    </div>
  );
}