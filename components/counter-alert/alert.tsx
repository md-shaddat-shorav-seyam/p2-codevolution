"use client";

import { AlertTriangleIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import type { CounterAlertProps } from "./types";
import s from "./alert.module.css";

export function CounterAlert({ isVisible, config }: CounterAlertProps) {
  if (!isVisible) return null;

  return (
    <div className={s.alertWrapper} role="alert" aria-live="assertive">
      <div className={s.glowVibrate}>
        <Alert className="max-w-md border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-50">
          <AlertTriangleIcon className="h-4 w-4" />
          <AlertTitle>{config.title}</AlertTitle>
          <AlertDescription>{config.description}</AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
