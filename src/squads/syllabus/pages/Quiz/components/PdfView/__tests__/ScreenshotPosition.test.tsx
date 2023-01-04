import { createRect } from "src/squads/syllabus/test-utils/rect";

import ScreenshotPosition from "../ScreenshotPosition";
import { SelectFieldState } from "../enum";

import { fireEvent, render, screen } from "@testing-library/react";
import { ScreenshotState } from "src/squads/syllabus/pages/Quiz/hooks/useScreenShot";

describe("<ScreenshotPosition />", () => {
    it("should call correct event handler", () => {
        const onMouseDown = jest.fn();
        const onMouseMove = jest.fn();
        const onMouseUp = jest.fn();

        render(
            <ScreenshotPosition
                processedScreenshot={createRect()}
                screenshotState={ScreenshotState.START}
                screenshotRect={{ top: 500, left: 300, image: "", height: 500, width: 300 }}
                selectFieldState={SelectFieldState.FIELD_TYPE}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
            />
        );

        const screenshotElement = screen.getByLabelText("screenshot");

        fireEvent.mouseDown(screenshotElement);
        expect(onMouseDown).toHaveBeenCalled();

        fireEvent.mouseUp(screenshotElement);
        expect(onMouseUp).toHaveBeenCalled();

        fireEvent.mouseMove(screenshotElement);
        expect(onMouseMove).toHaveBeenCalled();
    });

    it("should show crosshairs correctly based on screenshotState", () => {
        const rectPos = {
            top: 500,
            left: 300,
        };
        const { rerender } = render(
            <ScreenshotPosition
                processedScreenshot={createRect()}
                screenshotState={ScreenshotState.START}
                screenshotRect={{ ...rectPos, image: "", height: 500, width: 300 }}
                selectFieldState={SelectFieldState.FIELD_TYPE}
            />
        );
        //render on state START
        expect(screen.getByLabelText("crosshairs")).toBeInTheDocument();
        expect(window.getComputedStyle(screen.getByLabelText("crosshairs")).top).toEqual(
            `${rectPos.top}px`
        );
        expect(window.getComputedStyle(screen.getByLabelText("crosshairs")).left).toEqual(
            `${rectPos.left}px`
        );

        //not render on other state
        rerender(
            <ScreenshotPosition
                processedScreenshot={createRect()}
                screenshotState={ScreenshotState.SELECTING}
                screenshotRect={{ top: 500, left: 300, image: "", height: 500, width: 300 }}
                selectFieldState={SelectFieldState.FIELD_TYPE}
            />
        );
        expect(screen.getByLabelText("crosshairs").getAttribute("class")).toContain("hidden");
    });

    it("should not draw select box when selectFieldState is null and ScreenshotState is IDLE", () => {
        const rectPos = {
            top: 400,
            left: 200,
        };
        render(
            <ScreenshotPosition
                processedScreenshot={createRect()}
                screenshotState={ScreenshotState.IDLE}
                screenshotRect={{ ...rectPos, image: "", height: 500, width: 300 }}
                selectFieldState={null}
            />
        );
        expect(screen.getByLabelText("Screenshot area").getAttribute("class")).toContain("hidden");
    });

    it("should not draw select box", () => {
        const rectPos = {
            top: 400,
            left: 200,
        };
        render(
            <ScreenshotPosition
                processedScreenshot={createRect()}
                screenshotState={ScreenshotState.SELECTING}
                screenshotRect={{ ...rectPos, image: "", height: 500, width: 300 }}
                selectFieldState={SelectFieldState.FIELD_TYPE}
            />
        );
        expect(screen.getByLabelText("Screenshot area")).toBeInTheDocument();
    });
});
