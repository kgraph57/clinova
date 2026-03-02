"use client";

import { useEffect } from "react";

export function ServiceWorkerRegistration() {
  useEffect(() => {
    if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
      const basePath = "/hoshizu";
      navigator.serviceWorker.register(`${basePath}/sw.js`).catch(() => {
        // SW registration failed silently
      });
    }
  }, []);

  return null;
}
