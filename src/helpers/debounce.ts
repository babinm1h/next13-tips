/**
 * Декоратор `debounce`
 * позволяет превратить несколько вызовов функции в течение определенного времени в один вызов,
 * причём задержка начинает отсчитываться заново с каждой новой попыткой вызова.
 *
 * Пример применения: обработчик ввода текста нужно вызвать один раз по завершению ввода.
 *
 * @see https://habr.com/ru/post/60957/
 */

export interface IDebounceParams {
    /**
     * Выполнять первый вызов мгновенно.
     * @default false
     */
    leading?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IDebouncedFunction<F extends Func> {
    (...args: Parameters<F>): void;
    /** Отменить отложенный вызов */
    cancel: () => void;
}

export function debounce<Fn extends Func>(
    func: Fn,
    wait: number,
    params: IDebounceParams = {},
): IDebouncedFunction<Fn> {
    let timeout: number = 0;

    function cancelDelayedCall() {
        if (timeout) {
            clearTimeout(timeout);
            timeout = 0;
        }
    }

    function debouncedFunc(this: ThisParameterType<Fn>) {
        var context = this,
            args = arguments;

        var later = function() {
            timeout = 0;
            func.apply(context, args);
        };

        var callNow = params.leading && !timeout;
        cancelDelayedCall();
        timeout = setTimeout(later, wait) as unknown as number;
        if (callNow) func.apply(context, args);
    }

    debouncedFunc.cancel = cancelDelayedCall;

    return debouncedFunc;
}

export function isDebounced<F extends Func>(fn: Func): fn is IDebouncedFunction<F> {
    return fn.name === 'debouncedFunc';
}

  
  /**
 * Декоратор `throttle`
 * позволяет превратить несколько вызовов функции в течение определенного времени в один вызов,
 * причём функция будет выполняться не чаще одного раза в указанный период.
 * Т.е. все промежуточные вызовы будут игнорироваться.
 *
 * Пример применения: обработчик изменения размеров окна браузера
 * нужно выполнять по мере изменения размеров, но не слишком часто.
 *
 * @see https://habr.com/ru/post/60957/
 */

export interface IThrottleParams {
    /** Форсировать хвостовой вызов функции
     * (если был "висящий" вызов до таймаута, то функция гарантированно будет вызвана после таймаута)
     **/
    delayedLastCall?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface IThrottledFunction<TArgs extends any[]> {
    (...a: TArgs): void;
    /** Отменить отложенный вызов */
    cancel: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function throttle<TArgs extends any[]>(fn: (...a: TArgs) => void, wait: number, params?: IThrottleParams) {
    let prevTime: number;
    let timer: number = 0;
    let delayedLastCall = params && params.delayedLastCall;

    function cancelDelayedCall() {
        if (timer) {
            clearTimeout(timer);
            timer = 0;
        }
    }

    const throttledFn = function() {
        const currentTime = Date.now();
        const args = arguments;

        const execute = () => {
            fn.apply(undefined, args);
            prevTime = Date.now();
            timer = 0;
        };

        // отменяем запланированное
        cancelDelayedCall();

        // если предыдущего запуска не было или прошло уже больше таймаута
        if ((prevTime === undefined) || (currentTime - prevTime) > wait) {
            // выполняем
            execute();
            // если включен хвостовой вызов
        } else if (delayedLastCall) {
            // планируем на момент времени: предыдущий вызов + таймаут (ближайшая точка, когда можно вызвать)
            timer = (setTimeout as Window['setTimeout'])(execute, wait - (currentTime - prevTime));
        }
    } as IThrottledFunction<TArgs>;

    throttledFn.cancel = cancelDelayedCall;

    return throttledFn;
}
