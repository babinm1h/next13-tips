import React, { MutableRefObject, RefObject, useCallback } from "react";

export const useCombinedRef = <T>(...refs: React.Ref<T>[]) => {
  // elem будет браться из JSX элемента: ref={(el) => log(el)}
  const comboRef = useCallback(
    (elem: T) => {
      refs.forEach((ref) => {
        if (!ref) return;

        if (typeof ref === "function") {
          ref(elem);
        } else {
          (ref as MutableRefObject<T>).current = elem;
        }
      });
    },
    [refs]
  );

  return comboRef;
};
