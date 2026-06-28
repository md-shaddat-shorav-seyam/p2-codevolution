"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import type { AlertConfig, UseAlertOptions, UseAlertReturn } from "./types";

const DEFAULT_CONFIG: AlertConfig = {
  title: "Cannot decrement",
  description: "Enable negative annotation to go below zero.",
  variant: "warning",
  duration: 5000,
};

export function useAlert(options?: UseAlertOptions): UseAlertReturn {
  const [isVisible, setIsVisible] = useState(false);
  const [alertConfig, setAlertConfig] = useState<AlertConfig>(() => ({
    ...DEFAULT_CONFIG,
    ...options?.initialConfig,
  }));

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const dismiss = useCallback(() => {
    setIsVisible(false);
    clearTimer();
  }, [clearTimer]);

  /**
   * Show the alert. Optionally merge-in overrides for title/description/duration.
   * Previous timer is always cancelled before a new one starts.
   */
  const show = useCallback(
    (overrides?: Partial<AlertConfig>) => {
      clearTimer();

      const mergedConfig: AlertConfig = overrides
        ? { ...DEFAULT_CONFIG, ...options?.initialConfig, ...overrides }
        : { ...DEFAULT_CONFIG, ...options?.initialConfig };

      if (overrides) {
        setAlertConfig(mergedConfig);
      }

      setIsVisible(true);

      timerRef.current = setTimeout(() => {
        setIsVisible(false);
      }, mergedConfig.duration);
    },
    [clearTimer, options?.initialConfig],
  );

  // Cleanup on unmount – prevents timer leaks
  useEffect(() => clearTimer, [clearTimer]);

  return { isVisible, alertConfig, show, dismiss };
}
