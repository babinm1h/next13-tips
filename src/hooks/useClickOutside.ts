import { MutableRefObject, RefObject, useCallback } from "react";

import useWindowEventListener from "./useWindowEventListener";

const noop = () => null;

/** Хук для события "мы тут кликнули снаружи от компонента"
 * @returns ref - ref для того, чтобы передать его в рендер компонента, к которому надо прицепиться
 */
const useClickOutside = (
  ref: MutableRefObject<Element | undefined> | RefObject<Element | null>,
  listener: VoidFunction = noop
) => {
  const handler = useCallback(
    (e: Event) => {
      const node = ref.current;
      if (node instanceof Element && !node.contains(e.target as Node)) {
        listener();
      }
    },
    [listener, ref]
  );
  
  useWindowEventListener("click", handler);
  return ref;
};

export default useClickOutside;
