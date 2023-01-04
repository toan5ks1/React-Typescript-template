import { TestThemeProvider } from "src/squads/lesson/test-utils";
import { lessonReportCreateDataSample } from "src/squads/lesson/test-utils/lesson-management";
import { mockDataConfig } from "src/squads/lesson/test-utils/lesson-report";
import { selectAutocompleteOptionByLabel } from "src/squads/lesson/test-utils/utils";

import TranslationProvider from "src/squads/lesson/providers/TranslationProvider";

import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useGetLatestPartnerFormConfig from "src/squads/lesson/hooks/useGetLatestPartnerFormConfig";
import useShowSnackbar from "src/squads/lesson/hooks/useShowSnackbar";
import LessonReportUpsertInd, {
    LessonReportUpsertIndProps,
} from "src/squads/lesson/pages/LessonManagement/LessonReportUpsertInd";
import useMutationLessonIndividualReport, {
    WriteLessonReportProps,
} from "src/squads/lesson/pages/LessonManagement/hooks/useMutationLessonIndividualReport";
import useTransformReportSubmitData from "src/squads/lesson/pages/LessonManagement/hooks/useTransformReportSubmitData";
import { TestQueryWrapper } from "src/squads/lesson/test-utils/TestQueryWrapper";

jest.mock("src/squads/lesson/hooks/useGetLatestPartnerFormConfig", () => {
    return { __esModule: true, default: jest.fn() };
});

jest.mock(
    "src/squads/lesson/pages/LessonManagement/hooks/useMutationLessonIndividualReport",
    () => {
        return { __esModule: true, default: jest.fn() };
    }
);

jest.mock("src/squads/lesson/pages/LessonManagement/hooks/useTransformReportSubmitData", () => {
    return { __esModule: true, default: jest.fn() };
});

jest.mock("src/squads/lesson/hooks/useShowSnackbar", () => {
    return { __esModule: true, default: jest.fn() };
});

const setupMocks = () => {
    const mockMutateUpsert = jest
        .fn()
        .mockImplementation(({ onSuccess }: WriteLessonReportProps) => {
            onSuccess?.();
        });

    const mockMutateSaveDraft = jest
        .fn()
        .mockImplementation(({ onSuccess }: WriteLessonReportProps) => {
            onSuccess?.();
        });

    const mockTransformData = { data: "data" };
    const mockShowSnackbar = jest.fn();

    (useGetLatestPartnerFormConfig as jest.Mock).mockImplementation(() => {
        return { data: mockDataConfig, isLoading: false, error: undefined };
    });

    (useMutationLessonIndividualReport as jest.Mock).mockImplementation(() => {
        return {
            upsertLessonReport: mockMutateUpsert,
            isSubmittingLessonReport: false,
            saveDraftLessonReport: mockMutateSaveDraft,
            isSavingDraftLessonReport: false,
        };
    });

    (useTransformReportSubmitData as jest.Mock).mockImplementation(() => {
        return () => mockTransformData;
    });

    (useShowSnackbar as jest.Mock).mockImplementation(() => mockShowSnackbar);

    return { mockMutateUpsert, mockMutateSaveDraft, mockTransformData, mockShowSnackbar };
};

describe("LessonReportUpsertInd", () => {
    const props: LessonReportUpsertIndProps = {
        mode: "CREATE",
        isLoading: false,
        openDialogUpsertReport: true,
        lessonReportData: lessonReportCreateDataSample,
        onCloseDialog: jest.fn(),
        onUpsertSuccess: jest.fn(),
    };

    const renderComponent = () => {
        render(
            <TestQueryWrapper>
                <TranslationProvider>
                    <TestThemeProvider>
                        <LessonReportUpsertInd {...props} />
                    </TestThemeProvider>
                </TranslationProvider>
            </TestQueryWrapper>
        );

        expect(screen.getByText("Create Individual Report")).toBeInTheDocument();
    };

    const selectAttendanceStatuses = async (
        studentsList: LessonReportUpsertIndProps["lessonReportData"]["students"]
    ) => {
        for (let index = 0; index < studentsList.length; index++) {
            const studentName = studentsList[index].user.name;
            const studentItemList = screen.getByRole("button", { name: studentName });

            userEvent.click(studentItemList);

            const formContainer = await screen.findByTestId(
                `FormReportDetailInd__formDetail.${index}`
            );

            const comboboxes = within(formContainer).getAllByRole("combobox");
            const attendanceStatusInput = comboboxes[0];

            userEvent.click(attendanceStatusInput);
            selectAutocompleteOptionByLabel("Late");

            expect(attendanceStatusInput).toHaveValue("Late");
        }
    };

    it("should submit all lesson report", async () => {
        const { mockMutateUpsert, mockTransformData, mockShowSnackbar } = setupMocks();
        renderComponent();

        await selectAttendanceStatuses(props.lessonReportData.students);

        const submitAllButton = screen.getByTestId("LessonReportUpsertFooterInd__buttonSubmitAll");
        userEvent.click(submitAllButton);

        await waitFor(() => {
            const dialogSubmit = screen.getByTestId("LessonReportUpsertInd__dialogSubmit");
            expect(dialogSubmit).toBeInTheDocument();
        });

        const confirmSubmitButton = screen.getByTestId("FooterDialogConfirm__buttonSave");
        userEvent.click(confirmSubmitButton);

        await waitFor(() => {
            expect(mockMutateUpsert).toBeCalledWith({
                data: mockTransformData,
                onSuccess: expect.any(Function),
            });
        });

        expect(mockShowSnackbar).toBeCalledWith(
            "You have submitted individual report successfully"
        );
    }, 25000);

    it("should cancel submit all lesson report", async () => {
        setupMocks();
        renderComponent();

        await selectAttendanceStatuses(props.lessonReportData.students);

        const submitAllButton = screen.getByTestId("LessonReportUpsertFooterInd__buttonSubmitAll");
        userEvent.click(submitAllButton);

        await waitFor(() => {
            const dialogSubmit = screen.getByTestId("LessonReportUpsertInd__dialogSubmit");
            expect(dialogSubmit).toBeInTheDocument();
        });

        const cancelSubmitButton = screen.getByTestId("FooterDialogConfirm__buttonClose");
        userEvent.click(cancelSubmitButton);

        await waitFor(() => {
            const dialogSubmit = screen.queryByTestId("LessonReportUpsertInd__dialogSubmit");
            expect(dialogSubmit).not.toBeInTheDocument();
        });
    }, 20000);

    it("should save draft lesson report", async () => {
        const { mockMutateSaveDraft, mockTransformData, mockShowSnackbar } = setupMocks();
        renderComponent();

        await selectAttendanceStatuses(props.lessonReportData.students);

        const saveDraftButton = screen.getByTestId("LessonReportUpsertFooterInd__buttonSaveDraft");
        userEvent.click(saveDraftButton);

        await waitFor(() => {
            expect(mockMutateSaveDraft).toBeCalledWith({
                data: mockTransformData,
                onSuccess: expect.any(Function),
            });
        });

        expect(mockShowSnackbar).toBeCalledWith("You have created individual report successfully");
    }, 20000);

    it("should NOT submit all lesson report without student's attendance status", async () => {
        const { mockMutateUpsert } = setupMocks();
        renderComponent();

        const submitAllButton = screen.getByTestId("LessonReportUpsertFooterInd__buttonSubmitAll");
        userEvent.click(submitAllButton);

        await waitFor(() => {
            expect(screen.getAllByText("This field is required")).not.toBeNull();
        });

        const errorIcons = screen.getAllByTestId("ErrorOutlineOutlinedIcon");
        expect(errorIcons).toHaveLength(props.lessonReportData.students.length);

        expect(mockMutateUpsert).not.toBeCalled();
    });

    it("should save draft lesson report without student's attendance status", async () => {
        const { mockMutateSaveDraft, mockTransformData, mockShowSnackbar } = setupMocks();
        renderComponent();

        const saveDraftButton = screen.getByTestId("LessonReportUpsertFooterInd__buttonSaveDraft");
        userEvent.click(saveDraftButton);

        await waitFor(() => {
            expect(mockMutateSaveDraft).toBeCalledWith({
                data: mockTransformData,
                onSuccess: expect.any(Function),
            });
        });

        expect(mockShowSnackbar).toBeCalledWith("You have created individual report successfully");
    });
});
