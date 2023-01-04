import { lessonReportUpdateDataSample } from "src/squads/lesson/test-utils/lesson-management";
import { mockDataConfig } from "src/squads/lesson/test-utils/lesson-report";
import { selectAutocompleteOptionByLabel } from "src/squads/lesson/test-utils/utils";

import FormLessonReportInd, {
    FormLessonReportIndProps,
} from "src/squads/lesson/pages/LessonManagement/components/Forms/FormLessonReportInd";
import TranslationProvider from "src/squads/lesson/providers/TranslationProvider";

import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useShowSnackbar from "src/squads/lesson/hooks/useShowSnackbar";
import { LessonManagementReportsIndividualData } from "src/squads/lesson/pages/LessonManagement/common/types";
import TestHookFormProvider from "src/squads/lesson/test-utils/TestHookFormProvider";
import TestThemeProvider from "src/squads/lesson/test-utils/TestThemeProvider";

jest.mock("src/squads/lesson/hooks/useShowSnackbar", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

jest.mock("src/squads/lesson/service/infer-query", () => ({
    __esModule: true,
    inferQuery: () => () => ({ data: [] }),
}));

describe("FormLessonReportInd", () => {
    const showSnackbar = jest.fn();

    const props: FormLessonReportIndProps = {
        isLoadingData: false,
        lessonReportData: lessonReportUpdateDataSample,
        partnerFormConfig: mockDataConfig,
    };

    const renderComponent = (
        defaultFormValues: LessonManagementReportsIndividualData,
        overrideProps: Partial<FormLessonReportIndProps> = {}
    ) => {
        render(
            <TestThemeProvider>
                <TranslationProvider>
                    <TestHookFormProvider useFormOptions={{ defaultValues: defaultFormValues }}>
                        <FormLessonReportInd {...props} {...overrideProps} />
                    </TestHookFormProvider>
                </TranslationProvider>
            </TestThemeProvider>
        );
    };

    it("should update bulk attendance status", async () => {
        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);
        renderComponent(lessonReportUpdateDataSample);

        const bulkActionButton = screen.getByTestId("TableAction__buttonAdd");
        userEvent.click(bulkActionButton);

        const dialogBulkAction = await screen.findByTestId("DialogBulkUpdateAttendance__dialog");
        const attendanceAutocompleteInputs = within(dialogBulkAction).getAllByRole("combobox");

        attendanceAutocompleteInputs.forEach((attendanceAutocompleteInput) => {
            userEvent.click(attendanceAutocompleteInput);
            selectAutocompleteOptionByLabel("Absent");
        });

        const saveBulkAttendanceButton = within(dialogBulkAction).getByTestId(
            "FooterDialogConfirm__buttonSave"
        );
        userEvent.click(saveBulkAttendanceButton);

        expect(showSnackbar).toBeCalledWith("You have Bulk Action successfully");
    });

    it("should still render lesson report form while refetching data", () => {
        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);
        renderComponent(lessonReportUpdateDataSample, { isLoadingData: true });

        const lessonReportFormHeading = screen.getByTestId("FormLessonReportInd__tableAction");
        expect(lessonReportFormHeading).toBeInTheDocument();

        const studentsList = screen.getByTestId("ListStudent__root");
        expect(studentsList).toBeInTheDocument();

        const studentReportForm = screen.getByTestId("FormReportDetailInd__formDetail.0");
        expect(studentReportForm).toBeInTheDocument();
    });

    it("should get error when fetching partner form config", () => {
        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);
        renderComponent(lessonReportUpdateDataSample, {
            isLoadingData: false,
            partnerFormConfig: undefined,
            errorGetPartnerFormConfig: new Error("FETCH DATA ERROR"),
        });

        const errorMessage = screen.getByText(
            "Error while fetching form config: Unable to get form configuration."
        );
        expect(errorMessage).toBeInTheDocument();
    });

    it("should loading while fetching data", () => {
        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);
        renderComponent(lessonReportUpdateDataSample, {
            isLoadingData: true,
            partnerFormConfig: undefined,
        });

        expect(screen.getByTestId("Loading__root")).toBeInTheDocument();
    });
});
