import { useHistory } from "react-router";
import { Features } from "src/common/constants/enum";
import { TestThemeProvider } from "src/squads/lesson/test-utils";
import {
    createMockConvertLessonReportData,
    createMockLessonData,
    createMockLessonReportData,
    mockDataConfig,
} from "src/squads/lesson/test-utils/lesson-report";
import { TestQueryWrapper } from "src/squads/lesson/test-utils/react-hooks";
import { selectAutocompleteOptionByLabel } from "src/squads/lesson/test-utils/utils";

import TranslationProvider from "src/squads/lesson/providers/TranslationProvider";

import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useGetLatestPartnerFormConfig from "src/squads/lesson/hooks/useGetLatestPartnerFormConfig";
import useShowSnackbar from "src/squads/lesson/hooks/useShowSnackbar";
import LessonDetail from "src/squads/lesson/pages/LessonManagement/LessonDetail";
import useDeleteLessonOfLessonManagement, {
    DeleteLessonProps,
} from "src/squads/lesson/pages/LessonManagement/hooks/useDeleteLessonOfLessonManagement";
import useLessonReportDetails, {
    UseLessonReportDetailsReturn,
} from "src/squads/lesson/pages/LessonManagement/hooks/useLessonReportDetails";
import useMutationLessonIndividualReport, {
    WriteLessonReportProps,
} from "src/squads/lesson/pages/LessonManagement/hooks/useMutationLessonIndividualReport";
import useTransformReportUpsertData from "src/squads/lesson/pages/LessonManagement/hooks/useTransformReportUpsertData";
import TestingRouter from "src/squads/lesson/test-utils/TestingRouter";

jest.mock("src/squads/lesson/pages/LessonManagement/hooks/useLessonReportDetails", () => {
    return { __esModule: true, default: jest.fn() };
});

jest.mock("src/squads/lesson/pages/LessonManagement/hooks/useTransformReportUpsertData", () => {
    return { __esModule: true, default: jest.fn() };
});

jest.mock("src/squads/lesson/hooks/useShowSnackbar", () => {
    return { __esModule: true, default: jest.fn() };
});

jest.mock("src/hooks/useShowSnackbar", () => {
    return { __esModule: true, default: () => jest.fn() };
});

jest.mock("src/squads/lesson/hooks/useConvertMedia", () => {
    return { __esModule: true, default: () => ({ convertMedia: jest.fn() }) };
});

jest.mock("src/hooks/useBreadcrumb", () => {
    return { __esModule: true, default: () => ({ breadcrumbs: [], loading: false }) };
});

jest.mock("src/squads/lesson/hooks/useGetLatestPartnerFormConfig", () => {
    return { __esModule: true, default: jest.fn() };
});

jest.mock(
    "src/squads/lesson/pages/LessonManagement/hooks/useDeleteLessonOfLessonManagement",
    () => {
        return { __esModule: true, default: jest.fn() };
    }
);

jest.mock(
    "src/squads/lesson/pages/LessonManagement/hooks/useMutationLessonIndividualReport",
    () => {
        return { __esModule: true, default: jest.fn() };
    }
);

jest.mock("react-router", () => {
    const originalModule = jest.requireActual("react-router");
    return {
        __esModule: true,
        ...originalModule,
        useParams: () => ({ lessonId: "Lesson_Id_1" }),
        useHistory: jest.fn(),
    };
});

jest.mock("src/squads/lesson/hooks/useFeatureToggle", () => {
    const { Features } = jest.requireActual("src/common/constants/enum");

    return {
        __esModule: true,
        default: (toggleName: Features) => {
            switch (toggleName) {
                case Features.LESSON_MANAGEMENT_LESSON_REPORT_GROUP:
                case Features.LESSON_MANAGEMENT_RECURRING_LESSON:
                    return { isEnabled: false };

                case Features.LESSON_CREATE_LESSON_GROUP:
                    return { isEnabled: true };

                default:
                    return { isEnabled: true };
            }
        },
    };
});

const setupMocks = (
    overrideProps: Partial<{
        isNonLessonReportData: boolean;
    }> = {}
) => {
    const { isNonLessonReportData } = overrideProps;

    const mockShowSnackbar = jest.fn();
    const mockLessonData = createMockLessonData("1", {
        teachingMethod: "GROUP",
        studentHasAttendanceStatus: true,
    });
    const mockLessonReportsData = createMockLessonReportData("1");
    const mockRefetchLessonAndLessonReport = jest.fn();
    const mockRefetchForLessonReport = jest.fn();
    const mockHistoryPush = jest.fn();

    (useHistory as jest.Mock).mockImplementation(() => {
        return { push: mockHistoryPush };
    });

    (useShowSnackbar as jest.Mock).mockImplementation(() => mockShowSnackbar);

    (useLessonReportDetails as jest.Mock).mockImplementation(() => {
        const result: UseLessonReportDetailsReturn = {
            lessonStatus: undefined,
            isLoadingLesson: false,
            isLoadingLessonReport: false,
            isLoadingCenter: false,
            isLoadingMedia: false,
            isLoadingClass: false,
            isLoadingScheduler: false,
            lessonData: mockLessonData,
            lessonReports: !isNonLessonReportData ? mockLessonReportsData : undefined,
            center: { location_id: mockLessonData.center_id!, name: "Location Name 1" },
            classData: { class_id: mockLessonData.class_id!, name: "Class Name 1" },
            mediasList: [],
            scheduler: {
                end_date: mockLessonData.end_time!,
                start_date: mockLessonData.start_time!,
                scheduler_id: "Scheduler_Id",
            },
            refetchLessonAndLessonReportDetail: mockRefetchLessonAndLessonReport,
            refetchForLessonReport: {
                refetch: mockRefetchForLessonReport,
                isRefetching: false,
            },
        };

        return result;
    });

    (useTransformReportUpsertData as jest.Mock).mockImplementation(() => {
        return {
            convertLessonReportData: () => ({
                lessonReportData: createMockConvertLessonReportData("1"),
                partnerFormConfig: { ...mockLessonReportsData.partner_form_config },
            }),
        };
    });

    (useDeleteLessonOfLessonManagement as jest.Mock).mockImplementation(() => {
        return {
            deleteLesson: (props: DeleteLessonProps) => {
                props.onSuccess?.();
            },
            isDeleting: false,
        };
    });

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

    (useMutationLessonIndividualReport as jest.Mock).mockImplementation(() => {
        return {
            upsertLessonReport: mockMutateUpsert,
            isSubmittingLessonReport: false,
            saveDraftLessonReport: mockMutateSaveDraft,
            isSavingDraftLessonReport: false,
        };
    });

    (useGetLatestPartnerFormConfig as jest.Mock).mockImplementation(() => {
        return { data: mockDataConfig, isLoading: false, error: undefined };
    });

    return {
        mockLessonData,
        mockShowSnackbar,
        mockRefetchForLessonReport,
    };
};

const renderComponent = () => {
    render(
        <TestQueryWrapper>
            <TestThemeProvider>
                <TranslationProvider>
                    <TestingRouter>
                        <LessonDetail />
                    </TestingRouter>
                </TranslationProvider>
            </TestThemeProvider>
        </TestQueryWrapper>
    );
};

describe("LessonDetail", () => {
    it("should refetch lesson report details after submit lesson report success", async () => {
        const { mockRefetchForLessonReport, mockShowSnackbar, mockLessonData } = setupMocks({
            isNonLessonReportData: true,
        });
        renderComponent();

        const createReportButton = screen.getByTestId("LessonDetail__createReportButton");
        userEvent.click(createReportButton);

        await waitFor(() => {
            expect(screen.getByTestId("LessonReportUpsertInd__dialog")).toBeInTheDocument();
        });

        for (let index = 0; index < mockLessonData.lesson_members.length; index++) {
            const studentName = mockLessonData.lesson_members[index].user.name;
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

        const submitAllButton = screen.getByTestId("LessonReportUpsertFooterInd__buttonSubmitAll");
        userEvent.click(submitAllButton);

        await waitFor(() => {
            expect(screen.getByTestId("LessonReportUpsertInd__dialog")).toBeInTheDocument();
        });

        const confirmSubmitButton = screen.getByTestId("FooterDialogConfirm__buttonSave");
        userEvent.click(confirmSubmitButton);

        await waitFor(() => {
            expect(mockRefetchForLessonReport).toBeCalled();
        });
        expect(mockShowSnackbar).toBeCalledWith(
            "You have submitted individual report successfully"
        );
    }, 20000);

    it("should refetch lesson report details after save draft lesson report success", async () => {
        const { mockRefetchForLessonReport, mockShowSnackbar } = setupMocks();
        renderComponent();

        const reportTab = screen.getByRole("tab", { name: "Report" });
        userEvent.click(reportTab);

        const reportContainer = screen.getByTestId("TabLessonReport__container");
        const editReportButton = within(reportContainer).getByRole("button", { name: "Edit" });
        userEvent.click(editReportButton);

        const saveDraftReportButton = screen.getByTestId(
            "LessonReportUpsertFooterInd__buttonSaveDraft"
        );
        userEvent.click(saveDraftReportButton);

        await waitFor(() => {
            expect(mockRefetchForLessonReport).toBeCalled();
        });
        expect(mockShowSnackbar).toBeCalledWith("You have edited individual report successfully");
    });
});
