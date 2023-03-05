import { DependencyList, EffectCallback, useEffect, useRef } from "react";

export function useDidUpdateEffect(effect: EffectCallback, deps?: DependencyList) {
  const didMountRef = useRef(false);

  useEffect(() => {
    if (didMountRef.current) {
      effect();
    } else {
      didMountRef.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
