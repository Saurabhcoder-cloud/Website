"use client";

import { useEffect, useMemo, useState } from "react";

import { CookieBanner } from "@/components/analytics/cookie-banner";

import { GoogleTagManager } from "./gtm";

type ConsentState = "unknown" | "granted" | "denied";

const CONSENT_STORAGE_KEY = "taxhelpai-analytics-consent";

const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

function isDoNotTrackEnabled() {
  if (typeof window === "undefined") {
    return false;
  }

  const { doNotTrack = "", msDoNotTrack = "" } = window.navigator as Navigator & {
    msDoNotTrack?: string;
  };

  const vendorDnt = (window as unknown as { doNotTrack?: string }).doNotTrack;

  return [doNotTrack, msDoNotTrack, vendorDnt].some((value) => value === "1" || value === "yes");
}

export function AnalyticsManager() {
  const [consent, setConsent] = useState<ConsentState>("unknown");
  const [doNotTrack, setDoNotTrack] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    setDoNotTrack(isDoNotTrackEnabled());

    const stored = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (stored === "granted" || stored === "denied") {
      setConsent(stored);
    }

    setReady(true);
  }, []);

  const shouldShowBanner = useMemo(() => {
    if (!gtmId || doNotTrack) {
      return false;
    }

    return ready && consent !== "granted";
  }, [consent, doNotTrack, ready]);

  const grantConsent = () => {
    setConsent("granted");
    if (typeof window !== "undefined") {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, "granted");
    }
  };

  const denyConsent = () => {
    setConsent("denied");
    if (typeof window !== "undefined") {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, "denied");
    }
  };

  if (!gtmId) {
    return null;
  }

  if (doNotTrack) {
    if (ready && consent !== "denied") {
      denyConsent();
    }
    return null;
  }

  return (
    <>
      {consent === "granted" && <GoogleTagManager />}
      <CookieBanner open={shouldShowBanner} onAccept={grantConsent} onDecline={denyConsent} />
    </>
  );
}

