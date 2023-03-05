import { useEffect, useRef } from "react";

export function usePrevious<T>(value: T) {
  const previousValue = useRef<T>();

  useEffect(() => {
    previousValue.current = value;
  });

  return previousValue.current;
}
