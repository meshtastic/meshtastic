import { useEffect } from "react";
import { useEffectEvent } from "./use-effect-event";

export function useInterval(
  onTick: (tick: number) => void,
  timeout: number | (() => number) = 1000,
) {
  const onTickEvent = useEffectEvent(onTick);
  const getTimeout = useEffectEvent(() =>
    typeof timeout === "function" ? timeout() : timeout,
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: useEffectEvent returns stable references
  useEffect(() => {
    let ticks = 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    function tick() {
      onTickEvent(++ticks);
      timeoutId = setTimeout(tick, getTimeout());
    }

    timeoutId = setTimeout(tick, getTimeout());

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);
}
