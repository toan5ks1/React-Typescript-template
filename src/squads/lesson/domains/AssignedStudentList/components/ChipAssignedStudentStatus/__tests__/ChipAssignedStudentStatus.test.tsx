import { getThemeWithMuiV5 } from "src/styles";

import {
    ChipAssignedStudentStatus,
    ChipAssignedStudentStatusProps,
} from "src/squads/lesson/domains/AssignedStudentList/components/ChipAssignedStudentStatus";
import TranslationProvider from "src/squads/lesson/providers/TranslationProvider";

import { render, screen } from "@testing-library/react";
import theme from "src/styles/themes/variants/manabieV5";

const muiTheme = getThemeWithMuiV5({ options: theme });

const renderComponent = (props: Pick<ChipAssignedStudentStatusProps, "status" | "isLoading">) => {
    return render(
        <TranslationProvider>
            <ChipAssignedStudentStatus {...props} />
        </TranslationProvider>
    );
};

describe("<ChipAssignedStudentStatus/>", () => {
    it(`should render label and background: ${muiTheme.palette.success.lightBackground} in status Just assigned`, () => {
        renderComponent({ status: "STUDENT_ASSIGNED_STATUS_JUST_ASSIGNED", isLoading: false });

        expect(screen.getByTestId("ChipStatus")).toHaveStyle(
            `background: ${muiTheme.palette.success.lightBackground}`
        );

        expect(screen.getByText("Just assigned")).toBeInTheDocument();
    });

    it(`should render label and background: ${muiTheme.palette.grey?.[100]} in status Under assigned`, () => {
        renderComponent({ status: "STUDENT_ASSIGNED_STATUS_UNDER_ASSIGNED", isLoading: false });

        expect(screen.getByTestId("ChipStatus")).toHaveStyle(
            `background: ${muiTheme.palette.grey?.[100]}`
        );
        expect(screen.getByText("Under assigned")).toBeInTheDocument();
    });

    it(`should render label and background: ${muiTheme.palette.error.lightBackground} in status Over assigned`, () => {
        renderComponent({ status: "STUDENT_ASSIGNED_STATUS_OVER_ASSIGNED", isLoading: false });

        expect(screen.getByTestId("ChipStatus")).toHaveStyle(
            `background: ${muiTheme.palette.error.lightBackground}`
        );
        expect(screen.getByText("Over assigned")).toBeInTheDocument();
    });

    it("should render correctly when isLoading = true", () => {
        renderComponent({ status: "STUDENT_ASSIGNED_STATUS_OVER_ASSIGNED", isLoading: true });
        const statusColLoading = screen.getByTestId("TableColumnStatus__loading");

        expect(statusColLoading).toBeInTheDocument();
    });
});
