import { TestThemeProvider } from "src/squads/lesson/test-utils";

import DetailSectionReportHeaderInd, {
    DetailSectionReportHeaderIndProps,
} from "src/squads/lesson/components/DetailSections/DetailSectionReportHeaderInd";

import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { lessonReports } from "src/squads/lesson/pages/LessonManagement/common/real-data-from-hasura";
import useMutationLessonIndividualReport, {
    DeleteLessonReportProps,
} from "src/squads/lesson/pages/LessonManagement/hooks/useMutationLessonIndividualReport";

jest.mock("src/squads/lesson/pages/LessonManagement/hooks/useMutationLessonIndividualReport", () =>
    jest.fn()
);

const mockLessonReports = lessonReports[0];

const mockUseMutationLessonReport = () => {
    (useMutationLessonIndividualReport as jest.Mock).mockImplementation(() => {
        return {
            onDeleteLessonReport: (param: DeleteLessonReportProps) => {
                param.onSuccess?.();
            },
        };
    });
};

const renderDetailSectionReportHeaderIndWrapper = (props: DetailSectionReportHeaderIndProps) => {
    mockUseMutationLessonReport();
    return render(
        <TestThemeProvider>
            <DetailSectionReportHeaderInd {...props} />
        </TestThemeProvider>
    );
};

describe("<DetailSectionReportHeaderInd />  render correct lesson report status color with submitted status", () => {
    const props: DetailSectionReportHeaderIndProps = {
        lessonReports: mockLessonReports,
        onEdit: jest.fn(),
        onDelete: jest.fn(),
    };

    // Currently all our customers don't need Delete Report feature
    // https://manabie.atlassian.net/browse/LT-8942
    it.skip("should trigger delete action", async () => {
        const wrapper = renderDetailSectionReportHeaderIndWrapper(props);
        userEvent.click(wrapper.getByTestId("ActionPanel__trigger"));

        const actionPanelPopover = wrapper.getByTestId("ActionPanel__popover--open");
        const deleteButton = actionPanelPopover.querySelector("button:last-child")!;

        expect(deleteButton).toBeVisible();
        userEvent.click(deleteButton);

        const confirmButton = wrapper.getByTestId("FooterDialogConfirm__buttonSave");
        userEvent.click(confirmButton);

        await waitFor(() => {
            expect(props.onDelete).toBeCalled();
        });
    });

    it("should render correct lesson report status color with submitted status", () => {
        const wrapper = renderDetailSectionReportHeaderIndWrapper(props);
        document.head.innerHTML = document.head.innerHTML;
        const lessonReportStatusChip = wrapper.getByTestId(
            "DetailSectionReportHeaderInd__chipLessonReportStatus"
        );

        expect(lessonReportStatusChip).toHaveStyle(
            "background: linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), #F44336;; color: rgb(59, 135, 62);"
        );
    });
});

describe("<DetailSectionReportHeaderInd /> renders draft status", () => {
    const mockLessonReportWithDraftStatus = {
        ...mockLessonReports,
        report_submitting_status: "LESSON_REPORT_SUBMITTING_STATUS_SAVED",
    };
    const props: DetailSectionReportHeaderIndProps = {
        lessonReports: mockLessonReportWithDraftStatus,
        onEdit: jest.fn(),
        onDelete: jest.fn(),
    };

    it("should render correct lesson report status color with draft status", () => {
        const wrapper = renderDetailSectionReportHeaderIndWrapper(props);
        document.head.innerHTML = document.head.innerHTML;
        const lessonReportStatusChip = wrapper.getByTestId(
            "DetailSectionReportHeaderInd__chipLessonReportStatus"
        );
        expect(lessonReportStatusChip).toHaveStyle(
            "background-color: rgba(245, 245, 245, 1); color: rgba(117, 117, 117, 1);"
        );
    });
});
