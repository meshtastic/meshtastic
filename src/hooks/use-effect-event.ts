import { useCallback, useInsertionEffect, useRef } from "react";

/**
 * useEffectEvent - Stable callback reference for use in effects
 *
 * This hook creates a stable function reference that always calls the latest
 * version of the provided callback, without requiring the callback to be in
 * the effect's dependency array.
 *
 * Based on the React RFC for useEffectEvent (formerly useEvent).
 * @see https://react.dev/learn/separating-events-from-effects#declaring-an-effect-event
 */
export function useEffectEvent<T extends (...args: never[]) => unknown>(
  fn: T,
): T {
  const ref = useRef<T>(fn);

  useInsertionEffect(() => {
    ref.current = fn;
  });

  return useCallback((...args: Parameters<T>) => ref.current(...args), []) as T;
}
