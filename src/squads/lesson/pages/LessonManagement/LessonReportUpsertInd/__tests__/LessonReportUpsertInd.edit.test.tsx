import { TestThemeProvider } from "src/squads/lesson/test-utils";
import { lessonReportUpdateDataSample } from "src/squads/lesson/test-utils/lesson-management";
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
        mode: "EDIT",
        isLoading: false,
        openDialogUpsertReport: true,
        lessonReportData: lessonReportUpdateDataSample,
        onCloseDialog: jest.fn(),
        onUpsertSuccess: jest.fn(),
        partnerFormConfig: mockDataConfig,
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

        expect(screen.getByText("Edit Individual Report")).toBeInTheDocument();
        expect(useGetLatestPartnerFormConfig).toBeCalledWith({ featureName: undefined });
    };

    const selectStudentItemOnStudentsList = (studentName: string) => {
        const studentItemList = screen.getByRole("button", { name: studentName });
        userEvent.click(studentItemList);
    };

    const getAttendanceStatusAutocompleteInput = async (formIndex: number) => {
        const formContainer = await screen.findByTestId(
            `FormReportDetailInd__formDetail.${formIndex}`
        );

        const comboboxes = within(formContainer).getAllByRole("combobox");
        return comboboxes[0];
    };

    const selectAttendanceStatuses = async (
        studentsList: LessonReportUpsertIndProps["lessonReportData"]["students"]
    ) => {
        for (let index = 0; index < studentsList.length; index++) {
            selectStudentItemOnStudentsList(studentsList[index].user.name);
            const attendanceStatusInput = await getAttendanceStatusAutocompleteInput(index);

            userEvent.click(attendanceStatusInput);
            selectAutocompleteOptionByLabel("Late");

            expect(attendanceStatusInput).toHaveValue("Late");
        }
    };

    it("should apply default form value", async () => {
        setupMocks();
        renderComponent();

        const studentsList = props.lessonReportData.students;

        for (let index = 0; index < studentsList.length; index++) {
            selectStudentItemOnStudentsList(studentsList[index].user.name);
            const attendanceStatusInput = await getAttendanceStatusAutocompleteInput(index);

            const defaultAttendanceValue =
                props.lessonReportData.lessonReportDetails[index].dynamicFields.attendance_status!;

            expect(attendanceStatusInput).toHaveValue(defaultAttendanceValue["label"]);
        }
    });

    it("should save draft in edit mode", async () => {
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

        expect(mockShowSnackbar).toBeCalledWith("You have edited individual report successfully");
    }, 20000);

    it("should discard changes", async () => {
        setupMocks();
        renderComponent();

        await selectAttendanceStatuses(props.lessonReportData.students);

        const discardButton = screen.getByTestId("LessonReportUpsertFooterInd__buttonDiscard");
        userEvent.click(discardButton);

        await waitFor(() => {
            expect(screen.getByTestId("DialogCancelConfirm__dialog")).toBeInTheDocument();
        });

        const confirmDiscardButton = screen.getByTestId("FooterDialogConfirm__buttonSave");
        userEvent.click(confirmDiscardButton);

        expect(props.onCloseDialog).toBeCalled();
    }, 20000);

    it("should cancel discard changes", async () => {
        setupMocks();
        renderComponent();

        const discardButton = screen.getByTestId("LessonReportUpsertFooterInd__buttonDiscard");
        userEvent.click(discardButton);

        await waitFor(() => {
            expect(screen.getByTestId("DialogCancelConfirm__dialog")).toBeInTheDocument();
        });

        const cancelDiscardButton = screen.getByTestId("FooterDialogConfirm__buttonClose");
        userEvent.click(cancelDiscardButton);

        await waitFor(() => {
            expect(screen.queryByTestId("DialogCancelConfirm__dialog")).not.toBeInTheDocument();
        });
    });

    it("should close dialog upsert lesson report", async () => {
        setupMocks();
        renderComponent();

        await selectAttendanceStatuses(props.lessonReportData.students);

        const closeIcon = screen.getByRole("button", { name: "close" });
        userEvent.click(within(closeIcon).getByTestId("CloseIcon"));

        await waitFor(() => {
            expect(screen.getByTestId("DialogCancelConfirm__dialog")).toBeInTheDocument();
        });

        const confirmDiscardButton = screen.getByTestId("FooterDialogConfirm__buttonSave");
        userEvent.click(confirmDiscardButton);

        expect(props.onCloseDialog).toBeCalled();
    }, 20000);
});
