import { HtmlHTMLAttributes, CSSProperties, forwardRef, useMemo } from "react";

import clsx from "clsx";
import { Rect } from "src/squads/syllabus/models/canvas";

import { styled } from "@mui/material/styles";

import { SelectFieldState } from "./enum";

import {
    ScreenshotRect,
    ScreenshotState,
} from "src/squads/syllabus/pages/Quiz/hooks/useScreenShot";

const PREFIX = "ScreenshotPosition";

const classes = {
    box: `${PREFIX}-box`,
    hidden: `${PREFIX}-hidden`,
    crosshairs: `${PREFIX}-crosshairs`,
};

const borderStyle = `2px solid #3f51b5`;

const Root = styled("div")(() => {
    return {
        width: "100%",
        height: "calc(100% - 20px)",
        position: "absolute",
        left: 0,
        top: 0,
        overflow: "hidden",

        [`& .${classes.box}`]: {
            border: borderStyle,
            position: "absolute",
        },
        [`& .${classes.hidden}`]: {
            display: "none",
        },
        [`& .${classes.crosshairs}`]: {
            position: "absolute",
            height: "100%",
            width: "100%",
            zIndex: 2147483647 - 2, //max zIndex available -2. We dont want screenshot to be the max, maybe something will need higher zIndex?

            "&:before, &:after": {
                content: `""`,
                height: "100%",
                width: "100%",
                position: "absolute",
                border: "none !important",
                borderImage: "none",

                // higher specificity rules
                "&&": {
                    borderRight: borderStyle,
                    borderBottom: borderStyle,
                },
            },

            "&:before": {
                left: "-100%",
                top: "-100%",
            },

            "&:after": {
                left: 0,
                top: 0,
            },
        },
    };
});

export type CSSPosition = {
    top: CSSProperties["top"];
    right: CSSProperties["right"];
    bottom: CSSProperties["bottom"];
    left: CSSProperties["left"];
};

export interface ScreenshotPositionProps extends HtmlHTMLAttributes<HTMLDivElement> {
    screenshotState: ScreenshotState;
    processedScreenshot: Rect | null;
    screenshotRect: ScreenshotRect | null;
    selectFieldState: SelectFieldState | null;
}

const ScreenshotPosition = forwardRef<HTMLDivElement, ScreenshotPositionProps>(
    (props: ScreenshotPositionProps, ref) => {
        const {
            processedScreenshot,
            screenshotState,
            screenshotRect,
            selectFieldState,
            onMouseDown,
            onMouseUp,
            onMouseMove,
        } = props;

        const capturedPosition = useMemo(() => {
            // prioritize the processed one
            return {
                left: processedScreenshot?.left || screenshotRect?.left,
                top: processedScreenshot?.top || screenshotRect?.top,
                width: processedScreenshot?.width || screenshotRect?.width,
                height: processedScreenshot?.height || screenshotRect?.height,
            };
        }, [screenshotRect, processedScreenshot]);

        const shouldHideSelectBox =
            screenshotState === ScreenshotState.IDLE && selectFieldState === null;

        return (
            <Root
                id="screenshot"
                aria-label="screenshot"
                onMouseDown={onMouseDown}
                onMouseUp={onMouseUp}
                onMouseMove={onMouseMove}
            >
                <div>
                    <div
                        className={clsx(
                            classes.crosshairs,
                            screenshotState !== ScreenshotState.START && classes.hidden
                        )}
                        aria-label="crosshairs"
                        style={{
                            left: screenshotRect?.left,
                            top: screenshotRect?.top,
                        }}
                    />
                    <div
                        ref={ref}
                        aria-label="Screenshot area"
                        className={clsx(classes.box, shouldHideSelectBox && classes.hidden)}
                        style={capturedPosition}
                    />
                </div>
            </Root>
        );
    }
);

export default ScreenshotPosition;
