"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Utility to generate a simple session ID
const getSessionId = () => {
  if (typeof window === "undefined") return null;
  let sessionId = sessionStorage.getItem("aegivon_session_id");
  if (!sessionId) {
    sessionId = Math.random().toString(36).substring(2, 15);
    sessionStorage.setItem("aegivon_session_id", sessionId);
  }
  return sessionId;
};

// Fire and forget tracking function
export const trackEvent = async (eventType: "PAGE_VIEW" | "CLICK", element?: string) => {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://aegivon-9sc9-eight.vercel.app";
    const path = window.location.pathname;
    const sessionId = getSessionId();

    await fetch(`${API_URL}/api/v1/analytics/track`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventType,
        path,
        element,
        sessionId,
      }),
      // Fire and forget, don't keep connection open
      keepalive: true,
    });
  } catch (error) {
    // Fail silently - analytics shouldn't break the app
    console.error("Analytics tracking failed:", error);
  }
};

export function Tracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Track page view on every route change
    trackEvent("PAGE_VIEW");
  }, [pathname]);

  return null;
}
