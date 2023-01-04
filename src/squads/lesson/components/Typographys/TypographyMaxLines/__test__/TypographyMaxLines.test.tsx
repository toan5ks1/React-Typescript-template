import { TestThemeProvider } from "src/squads/lesson/test-utils";

import TypographyMaxLines, { TypographyMaxLinesProps } from "../TypographyMaxLines";

import { render, waitFor, act, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock("src/hooks/useTextClamped", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const wrapRender = (props: TypographyMaxLinesProps) => {
    return render(
        <TestThemeProvider>
            <TypographyMaxLines {...props} />
        </TestThemeProvider>
    );
};

const mockHeightElement = (scrollHeight: number, clientHeight: number) => {
    Object.defineProperty(HTMLElement.prototype, "scrollHeight", {
        configurable: true,
        value: scrollHeight,
    });
    Object.defineProperty(HTMLElement.prototype, "clientHeight", {
        configurable: true,
        value: clientHeight,
    });
};

describe("<TypographyMaxLines />", () => {
    it("should not show title when hover element not overflow", async () => {
        const props: TypographyMaxLinesProps = {
            children: `content`,
            maxLines: 2,
        };
        wrapRender(props);
        const typographyElement = screen.getByTestId("TypographyMaxLines__TypographyBase");
        userEvent.hover(typographyElement);

        await waitFor(() => {
            expect(typographyElement).toHaveAttribute("title", "");
        });
    });

    //TODO: after catch multiple error in https://manabie.atlassian.net/browse/LT-18801, @lesson will fix under case
    it.skip("should not show title when not hovering oveflow element", async () => {
        const props: TypographyMaxLinesProps = {
            children: `content`,
            maxLines: 2,
        };
        mockHeightElement(1, 2);
        wrapRender(props);
        const typographyElement = screen.getByTestId("TypographyMaxLines__TypographyBase");
        await waitFor(() => {
            expect(typographyElement).toHaveAttribute("title", "");
        });
    });

    it("should show title on hover", async () => {
        jest.useFakeTimers("modern");
        mockHeightElement(1, 2);
        const props: TypographyMaxLinesProps = {
            children: `content`,
            maxLines: 2,
        };

        wrapRender(props);
        const typographyElement = screen.getByTestId("TypographyMaxLines__TypographyBase");
        userEvent.hover(typographyElement);

        await waitFor(() => {
            expect(typographyElement).toHaveAttribute("title", "content");
        });
        act(() => {
            jest.runAllTimers();
        });
    });
});
