import { useEffect, useState } from "react";

export function useNumberAnimation(target: number, duration = 1500) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const start = performance.now();
    let frameId: number;

    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [target, duration]);

  return count;
}
