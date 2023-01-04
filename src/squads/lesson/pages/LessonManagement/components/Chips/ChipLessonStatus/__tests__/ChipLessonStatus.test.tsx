import { getThemeWithMuiV5 } from "src/styles";

import ChipLessonStatus, {
    ChipLessonStatusProps,
} from "src/squads/lesson/pages/LessonManagement/components/Chips/ChipLessonStatus";
import TranslationProvider from "src/squads/lesson/providers/TranslationProvider";

import { render, screen } from "@testing-library/react";
import theme from "src/styles/themes/variants/manabieV5";

const muiTheme = getThemeWithMuiV5({ options: theme });

const renderComponent = (props: Pick<ChipLessonStatusProps, "status" | "isLoading">) => {
    return render(
        <TranslationProvider>
            <ChipLessonStatus {...props} />
        </TranslationProvider>
    );
};

describe("<ChipLessonStatus/>", () => {
    it(`should render label and background: ${muiTheme.palette.error.lightBackground} in status Cancelled`, () => {
        renderComponent({ status: "LESSON_SCHEDULING_STATUS_CANCELED", isLoading: false });

        expect(screen.getByTestId("ChipStatus")).toHaveStyle(
            `background: ${muiTheme.palette.error.lightBackground}`
        );

        expect(screen.getByText("Cancelled")).toBeInTheDocument();
    });

    it(`should render label and background: ${muiTheme.palette.grey?.[100]} in status Draft`, () => {
        renderComponent({ status: "LESSON_SCHEDULING_STATUS_DRAFT", isLoading: false });

        expect(screen.getByTestId("ChipStatus")).toHaveStyle(
            `background: ${muiTheme.palette.grey?.[100]}`
        );
        expect(screen.getByText("Draft")).toBeInTheDocument();
    });

    it(`should render label and background: ${muiTheme.palette.success.lightBackground} in status Completed`, () => {
        renderComponent({ status: "LESSON_SCHEDULING_STATUS_COMPLETED", isLoading: false });

        expect(screen.getByTestId("ChipStatus")).toHaveStyle(
            `background: ${muiTheme.palette.success.lightBackground}`
        );
        expect(screen.getByText("Completed")).toBeInTheDocument();
    });

    it(`should render label and background: ${muiTheme.palette.purple?.[50]} in status Published`, () => {
        renderComponent({ status: "LESSON_SCHEDULING_STATUS_PUBLISHED", isLoading: false });
        // due to https://github.com/testing-library/jest-dom/issues/49
        // the problem can fix when source base update testing-library version
        expect(screen.getByTestId("ChipStatus")).toHaveStyle("background: rgba(243, 229, 245)");
        expect(screen.getByText("Published")).toBeInTheDocument();
    });

    it("should render correctly when isLoading = true", () => {
        renderComponent({ status: "LESSON_SCHEDULING_STATUS_PUBLISHED", isLoading: true });
        const statusColLoading = screen.getByTestId("ChipLessonStatus__loading");

        expect(statusColLoading).toBeInTheDocument();
    });
});
