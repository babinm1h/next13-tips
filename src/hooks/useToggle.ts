import { useCallback, useState } from "react";

export type ToggleResult = {
  isOn: boolean;
  setTrue: () => void;
  setFalse: () => void;
  toggleValue: () => void;
};

/**
 * Переключает состояние true/false или задаёт новое явно.
 *
 * @param defaultValue Начальное значение, по умолчанию false
 * @returns {ToggleResult}
 */

export function useToggle(defaultValue = false): ToggleResult {
  const [isOn, setValue] = useState<boolean>(defaultValue);

  const setTrue = useCallback(() => {
    setValue(true);
  }, []);

  const setFalse = useCallback(() => {
    setValue(false);
  }, []);

  const toggleValue = useCallback(() => {
    setValue((isOpen) => !isOpen);
  }, []);

  return { isOn, toggleValue, setFalse, setTrue };
}
