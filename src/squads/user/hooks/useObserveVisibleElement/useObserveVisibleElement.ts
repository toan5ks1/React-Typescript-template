import { MutableRefObject, RefObject, useEffect, useRef, useState } from "react";

interface UseObserveVisibleElementProps {
    defaultHeight?: number;
    visibleOffset?: number;
    root?: HTMLElement | null;
}
export interface UseObserveVisibleElementReturn<T> {
    isVisible: boolean;
    placeholderHeight: MutableRefObject<number>;
    intersectionRef: RefObject<T>;
    rendered: boolean;
    resetRendered: () => void;
}
const isServer = typeof window === "undefined";

export default function useObserveVisibleElement<T extends HTMLElement>({
    defaultHeight = 300,
    visibleOffset = 1000,
    root = null,
}: UseObserveVisibleElementProps): UseObserveVisibleElementReturn<T> {
    const [isVisible, setIsVisible] = useState<boolean>(isServer);
    const placeholderHeight = useRef<number>(defaultHeight);
    const intersectionRef = useRef<T>(null);
    const [rendered, setRendered] = useState(isServer);

    const resetRendered = () => {
        setRendered(false);
    };
    // Set visibility with intersection observer
    const callbackFunction = (entries: IntersectionObserverEntry[]) => {
        if (typeof window !== undefined && window.requestAnimationFrame) {
            window.requestAnimationFrame(() => {
                setIsVisible(entries[0].isIntersecting);
            });
        } else {
            setIsVisible(entries[0].isIntersecting);
        }
    };

    const options: IntersectionObserverInit = {
        root,
        rootMargin: `${visibleOffset}px 0px ${visibleOffset}px 0px`,
        threshold: 0,
    };

    useEffect(() => {
        const observer = new IntersectionObserver(callbackFunction, options);

        if (intersectionRef.current) observer.observe(intersectionRef.current);
        if (rendered && intersectionRef.current) observer.unobserve(intersectionRef.current);
        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            if (intersectionRef.current) observer.unobserve(intersectionRef.current);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rendered]);

    // Set true height for placeholder element after render.
    useEffect(() => {
        if (intersectionRef.current && isVisible) {
            placeholderHeight.current = intersectionRef.current.offsetHeight;
            setRendered(true);
        }
    }, [isVisible]);

    return {
        intersectionRef,
        isVisible,
        placeholderHeight,
        rendered,
        resetRendered,
    };
}
