import { useState, useCallback, useRef, useEffect } from "react";

export interface UseCounterOptions {
  initialValue?: number;
  initialStep?: number;
  initialAllowNegative?: boolean;
  onBelowZero?: () => void;
}

export interface UseCounterReturn {
  count: number;
  diff: number;
  allowNegative: boolean;
  setDiff: (diff: number) => void;
  setAllowNegative: (value: boolean) => void;
  increment: () => void;
  decrement: () => boolean;
  reset: () => void;
}

export function useCounter(options: UseCounterOptions = {}): UseCounterReturn {
  const {
    initialValue = 0,
    initialStep = 1,
    initialAllowNegative = false,
  } = options;

  const [count, setCount] = useState(initialValue);
  const [diff, setDiff] = useState(initialStep);
  const [allowNegative, setAllowNegative] = useState(initialAllowNegative);

  // Stable ref avoids stale-closure bugs when the callback changes
  const onBelowZeroRef = useRef(options.onBelowZero);
  useEffect(() => {
    onBelowZeroRef.current = options.onBelowZero;
  });

  const increment = useCallback(() => {
    setCount((c) => c + diff);
  }, [diff]);

  /**
   * Returns `true` if the decrement happened, `false` if blocked.
   * When blocked, fires `onBelowZero` callback.
   */
  const decrement = useCallback(() => {
    if (!allowNegative && count - diff < 0) {
      onBelowZeroRef.current?.();
      return false;
    }
    setCount((c) => c - diff);
    return true;
  }, [allowNegative, count, diff]);

  const reset = useCallback(() => {
    setCount(initialValue);
  }, [initialValue]);

  return {
    count,
    diff,
    allowNegative,
    setDiff,
    setAllowNegative,
    increment,
    decrement,
    reset,
  };
}
