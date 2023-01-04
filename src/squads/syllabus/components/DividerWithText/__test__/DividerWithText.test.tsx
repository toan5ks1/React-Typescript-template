import DividerWithText, { DividerWithTextProps } from "../DividerWithText";

import { render, screen } from "@testing-library/react";
import TestThemeProvider from "src/squads/syllabus/test-utils/TestThemeProvider";

describe(DividerWithText.name, () => {
    const defaultProps: DividerWithTextProps = {
        text: "Hello",
    };

    beforeEach(() => {
        render(
            <TestThemeProvider>
                <DividerWithText {...defaultProps} />
            </TestThemeProvider>
        );
    });

    it("should render correct UI", () => {
        expect(screen.queryByTestId("DividerWithText_container")).toBeInTheDocument();
        expect(screen.queryAllByTestId("DividerWithText__hr")).toHaveLength(2);
        expect(screen.queryByTestId("DividerWithText__text")).toBeInTheDocument();
    });
});
