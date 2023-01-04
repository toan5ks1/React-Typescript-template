import { useState, useRef, useEffect, useCallback, SetStateAction, Dispatch } from "react";

export default function useSafeSetState<T>(initialState?: T): [T, Dispatch<SetStateAction<T>>] {
    const [state, setState] = useState(initialState);

    const mountedRef = useRef(false);
    useEffect(() => {
        mountedRef.current = true;
        return () => {
            mountedRef.current = false;
        };
    }, []);
    const safeSetState = useCallback(
        (args) => {
            if (mountedRef.current) {
                return setState(args);
            }
        },
        [mountedRef, setState]
    );

    return [state!, safeSetState];
}
