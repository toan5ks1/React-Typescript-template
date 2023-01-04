import { useEffect, useMemo } from "react";

import useSafeSetState from "src/squads/payment/hooks/useSafeState";

const debounce = (callback: Function, delay: number) => {
    let timeout: number;

    const debouncedFunction = (...args: any) => {
        window.clearTimeout(timeout);
        timeout = window.setTimeout(() => {
            callback(...args);
        }, delay);
    };
    return debouncedFunction;
};

const useDebounce = <TValue extends unknown>(value: TValue, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useSafeSetState(value);

    const setValueDebounced = useMemo(
        () => debounce(setDebouncedValue, delay),
        [setDebouncedValue, delay]
    );

    useEffect(() => {
        setValueDebounced(value);
    }, [value, setValueDebounced]);

    return debouncedValue;
};

const DEFAULT_DEBOUNCE_AUTOCOMPLETE_TIME = 200;
const useAutocompleteDebounce = <TValue extends unknown>(value: TValue) => {
    return useDebounce(value, DEFAULT_DEBOUNCE_AUTOCOMPLETE_TIME);
};

export default useAutocompleteDebounce;
