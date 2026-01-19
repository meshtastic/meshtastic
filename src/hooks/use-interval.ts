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
