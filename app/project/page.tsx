"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { CounterAlert, useAlert } from "@/components/counter-alert";
import { useCounter } from "@/hooks/use-counter";
import { useState, useCallback, useRef, useEffect } from "react";
import s from "./page.module.css";

function Page() {
  /* ──────────── Alert ──────────── */
  const { isVisible, alertConfig, show: showAlert, dismiss: dismissAlert } = useAlert();

  /* ──────────── Label glow effect ──────────── */
  const [isGlowing, setIsGlowing] = useState(false);
  const glowTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const triggerGlow = useCallback(() => {
    if (glowTimerRef.current) clearTimeout(glowTimerRef.current);
    setIsGlowing(true);
    glowTimerRef.current = setTimeout(() => setIsGlowing(false), 1500);
  }, []);

  useEffect(() => {
    return () => {
      if (glowTimerRef.current) clearTimeout(glowTimerRef.current);
    };
  }, []);

  /* ──────────── Counter ──────────── */
  const handleBelowZero = useCallback(() => {
    showAlert();
    triggerGlow();
  }, [showAlert, triggerGlow]);

  const {
    count,
    diff,
    allowNegative,
    setDiff,
    setAllowNegative,
    increment,
    decrement,
    reset,
  } = useCounter({ onBelowZero: handleBelowZero });

  return (
    <main className="relative flex min-h-screen items-center justify-center p-4">
      <CounterAlert isVisible={isVisible} config={alertConfig} onDismiss={dismissAlert} />

      <div className="w-full max-w-md rounded-2xl border bg-white p-6 shadow-lg sm:p-8">
        {/* Counter display */}
        <div className="flex justify-center text-center mb-6">
          <h1 className={`text-5xl ${s.countGlow}`}>{count}</h1>
        </div>

        {/* Controls row */}
        <div className="flex flex-row justify-between mx-auto my-5">
          <Input
            className="w-20"
            type="number"
            value={diff}
            onChange={(e) => setDiff(Number(e.target.value))}
            aria-label="Step size"
          />

          <FieldGroup className="flex justify-center items-center">
            <Field orientation="horizontal" data-disabled>
              <Checkbox
                id="allow-negative"
                name="allow-negative"
                checked={allowNegative}
                onCheckedChange={(value) => setAllowNegative(!!value)}
              />
              <FieldLabel htmlFor="allow-negative">
                <span className={isGlowing ? s.labelGlow : ""}>
                  negative annotation
                </span>
              </FieldLabel>
            </Field>
          </FieldGroup>

          <Button onClick={reset}>reset</Button>
        </div>

        {/* Action buttons */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button variant="outline" className="w-full sm:flex-1" onClick={increment}>
            increment
          </Button>
          <Button variant="outline" className="w-full sm:flex-1" onClick={decrement}>
            decrement
          </Button>
        </div>
      </div>
    </main>
  );
}

export default Page;
