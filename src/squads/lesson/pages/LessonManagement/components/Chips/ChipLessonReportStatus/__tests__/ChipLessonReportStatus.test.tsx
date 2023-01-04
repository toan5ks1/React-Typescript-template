import { getThemeWithMuiV5 } from "src/styles";

import ChipLessonReportStatus, {
    ChipLessonReportStatusProps,
} from "src/squads/lesson/pages/LessonManagement/components/Chips/ChipLessonReportStatus";
import TranslationProvider from "src/squads/lesson/providers/TranslationProvider";

import { render, screen } from "@testing-library/react";
import theme from "src/styles/themes/variants/manabieV5";

const muiTheme = getThemeWithMuiV5({ options: theme });

const renderComponent = (props: Pick<ChipLessonReportStatusProps, "status" | "isLoading">) => {
    return render(
        <TranslationProvider>
            <ChipLessonReportStatus {...props} />
        </TranslationProvider>
    );
};

describe("<ChipLessonReportStatus/>", () => {
    it(`should render label and background: ${muiTheme.palette.error.lightBackground} in status Cancelled`, () => {
        renderComponent({ status: "LESSON_REPORT_SUBMITTING_STATUS_SUBMITTED", isLoading: false });

        expect(screen.getByTestId("ChipStatus")).toHaveStyle(
            `background: ${muiTheme.palette.error.lightBackground}`
        );

        expect(screen.getByText("Submitted")).toBeInTheDocument();
    });

    it(`should render label and background: ${muiTheme.palette.grey?.[100]} in status Draft`, () => {
        renderComponent({ status: "LESSON_REPORT_SUBMITTING_STATUS_SAVED", isLoading: false });

        expect(screen.getByTestId("ChipStatus")).toHaveStyle(
            `background: ${muiTheme.palette.grey?.[100]}`
        );
        expect(screen.getByText("Draft")).toBeInTheDocument();
    });

    it("should render correctly when isLoading = true", () => {
        renderComponent({ status: "LESSON_REPORT_SUBMITTING_STATUS_SAVED", isLoading: true });
        const statusColLoading = screen.getByTestId("ChipLessonReportStatus__loading");

        expect(statusColLoading).toBeInTheDocument();
    });
});
