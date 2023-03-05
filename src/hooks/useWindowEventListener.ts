import {useEffect} from 'react'

/**
 * Способ прицепить обработчик событий при монтировании и безболезненно отцепить его потом
 * @param eventName {string} Название события
 * @param listener {Function} Обработчик
 */
export default function useWindowEventListener<K extends keyof WindowEventMap>(
  eventName: K,
  listener: (event: WindowEventMap[K]) => void,
) {
  useEffect(() => {
    // Лёгкая задержка, чтобы обработка событий началась только в следующем цикле браузера
    setTimeout(() => window.addEventListener(eventName, listener), 0)
    return () => window.removeEventListener(eventName, listener)
  }, [eventName, listener])
}
