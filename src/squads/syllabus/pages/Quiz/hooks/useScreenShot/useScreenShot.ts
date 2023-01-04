import { useCallback, useState } from "react";

import { unstable_batchedUpdates } from "react-dom";
import { useKey } from "react-use";

export function getBoundingClientFromElement(element: HTMLElement | null) {
    const boundingClient = element?.getBoundingClientRect();
    return {
        top: boundingClient?.top || 0,
        left: boundingClient?.left || 0,
        offsetLeft: element?.offsetLeft || 0,
        offsetTop: element?.offsetTop || 0,
    };
}

export function drawCanvasInCanvas(
    rect: ScreenshotRect,
    parentCanvas: HTMLCanvasElement,
    ratio: number
) {
    const croppedCanvas = document.createElement("canvas");
    croppedCanvas.width = rect.width;
    croppedCanvas.height = rect.height;

    const croppedCanvasContext = croppedCanvas.getContext("2d");

    if (croppedCanvasContext) {
        croppedCanvasContext.drawImage(
            parentCanvas,
            rect.left * ratio,
            rect.top * ratio,
            croppedCanvas.width * ratio,
            croppedCanvas.height * ratio,
            0,
            0,
            croppedCanvas.width,
            croppedCanvas.height
        );

        return croppedCanvas.toDataURL();
    }

    return null;
}

export enum ScreenshotState {
    IDLE = "IDLE",
    START = "START",
    SELECTING = "SELECTING",
}

interface RectPosition {
    left: number;
    top: number;
}

export interface ScreenshotRect extends RectPosition {
    width: number;
    height: number;
    image?: string;
}

export interface UseScreenShotOptions {
    disabled?: boolean;
    canvasSelector: string; //selector of canvas element
    onScreenshotComplete: (screenshot: ScreenshotRect) => void;
    onError: (msg: string) => void;
}

function useScreenShot({
    disabled = false,
    canvasSelector,
    onScreenshotComplete,
    onError,
}: UseScreenShotOptions) {
    const [screenshotRect, setScreenshotRect] = useState<ScreenshotRect | null>(null);
    const [screenshotState, setScreenshotState] = useState<ScreenshotState>(ScreenshotState.IDLE);

    const toPdfScreenshotCoord = useCallback(
        (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            const parentElement = event.currentTarget.parentElement;
            const scrollLeft = parentElement?.scrollLeft || 0;
            const scrollTop = parentElement?.scrollTop || 0;
            const { left, top } = getBoundingClientFromElement(parentElement);

            return [event.clientX - left + scrollLeft, event.clientY - top + scrollTop];
        },
        []
    );

    const onMouseDown = useCallback(
        (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            event.stopPropagation();
            event.preventDefault();

            if (screenshotState === ScreenshotState.IDLE && !disabled) {
                setScreenshotState(ScreenshotState.START);

                const [left, top] = toPdfScreenshotCoord(event);
                setScreenshotRect({
                    left,
                    top,
                    width: 0,
                    height: 0,
                });
            }
        },
        [screenshotState, disabled, toPdfScreenshotCoord]
    );

    const onMouseMove = useCallback(
        (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            event.stopPropagation();
            event.preventDefault();

            if (
                screenshotState !== ScreenshotState.START &&
                screenshotState !== ScreenshotState.SELECTING
            ) {
                return;
            }
            if (screenshotRect == null) return;

            const [currentX, currentY] = toPdfScreenshotCoord(event);
            const startX = screenshotRect.left;
            const startY = screenshotRect.top;

            if (currentX > startX && currentY > startY) {
                setScreenshotState(ScreenshotState.SELECTING);
                setScreenshotRect((prev) => {
                    if (!prev) {
                        return prev;
                    }
                    return {
                        ...prev,
                        width: currentX - prev.left,
                        height: currentY - prev.top,
                    };
                });
            }
        },
        [screenshotRect, screenshotState, toPdfScreenshotCoord]
    );

    const takeScreenshot = useCallback((): string | null => {
        const allPdfCanvasCollection = document.getElementsByClassName(canvasSelector);

        if (
            allPdfCanvasCollection.length > 0 &&
            screenshotRect &&
            screenshotRect.width &&
            screenshotRect.height
        ) {
            const parentCanvas = allPdfCanvasCollection[0] as HTMLCanvasElement;
            return drawCanvasInCanvas(screenshotRect, parentCanvas, window.devicePixelRatio || 1);
        }

        return null;
    }, [screenshotRect, canvasSelector]);

    useKey(
        "Escape",
        () => {
            unstable_batchedUpdates(() => {
                setScreenshotState(ScreenshotState.IDLE);
                setScreenshotRect(null);
            });
        },
        { event: "keyup" }
    );

    const onMouseUp = useCallback(
        (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            event.stopPropagation();
            event.preventDefault();

            switch (screenshotState) {
                case ScreenshotState.SELECTING:
                    const image = takeScreenshot();

                    if (!image || !screenshotRect) {
                        return onError("ra.manabie-error.screenshotFailed");
                    }

                    onScreenshotComplete({
                        image,
                        ...screenshotRect,
                    });

                    setScreenshotRect(null);
                    return setScreenshotState(ScreenshotState.IDLE);
                case ScreenshotState.START:
                    setScreenshotState(ScreenshotState.IDLE);
            }
        },
        [screenshotState, takeScreenshot, screenshotRect, onScreenshotComplete, onError]
    );

    const onScreenshotCancel = useCallback(() => {
        setScreenshotRect(null);
        setScreenshotState(ScreenshotState.IDLE);
    }, []);

    return {
        screenshotState,
        screenshotRect,
        takeScreenshot,
        onMouseUp,
        onMouseMove,
        onMouseDown,
        onScreenshotCancel,
    };
}

export default useScreenShot;
