import { useHistory, useParams } from "react-router";
import { Entities, Features } from "src/common/constants/enum";
import { NsLesson_Bob_LessonsService } from "src/squads/lesson/service/bob/lessons-service/types";
import { TestThemeProvider } from "src/squads/lesson/test-utils";
import {
    createMockConvertLessonReportData,
    createMockLessonData,
    createMockLessonReportData,
} from "src/squads/lesson/test-utils/lesson-report";
import { TestQueryWrapper } from "src/squads/lesson/test-utils/react-hooks";

import MuiPickersUtilsProvider from "src/squads/lesson/providers/MuiPickersUtilsProvider";
import TranslationProvider from "src/squads/lesson/providers/TranslationProvider";

import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useAutocompleteReference from "src/squads/lesson/hooks/useAutocompleteReference";
import useShowSnackbar from "src/squads/lesson/hooks/useShowSnackbar";
import LessonDetail from "src/squads/lesson/pages/LessonManagement/LessonDetail";
import useClassManyReference from "src/squads/lesson/pages/LessonManagement/hooks/useClassManyReference";
import useCourseManyReference from "src/squads/lesson/pages/LessonManagement/hooks/useCourseManyReference";
import useDeleteLessonOfLessonManagement, {
    DeleteLessonProps,
} from "src/squads/lesson/pages/LessonManagement/hooks/useDeleteLessonOfLessonManagement";
import useLessonReportDetails, {
    UseLessonReportDetailsReturn,
} from "src/squads/lesson/pages/LessonManagement/hooks/useLessonReportDetails";
import useTransformReportUpsertData from "src/squads/lesson/pages/LessonManagement/hooks/useTransformReportUpsertData";
import useUpsertLessonOfLessonManagement, {
    UseUpsertLessonOfLessonManagementProps,
} from "src/squads/lesson/pages/LessonManagement/hooks/useUpsertLessonOfLessonManagement";
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

jest.mock("src/squads/lesson/hooks/useAutocompleteReference", () => {
    return { __esModule: true, default: jest.fn() };
});

jest.mock("src/squads/lesson/hooks/useConvertMedia", () => {
    return { __esModule: true, default: () => ({ convertMedia: jest.fn() }) };
});

jest.mock("src/squads/lesson/pages/LessonManagement/hooks/useClassManyReference", () => {
    return { __esModule: true, default: jest.fn() };
});

jest.mock("src/squads/lesson/pages/LessonManagement/hooks/useCourseManyReference", () => {
    return { __esModule: true, default: jest.fn() };
});

jest.mock("src/hooks/useBreadcrumb", () => {
    return { __esModule: true, default: () => ({ breadcrumbs: [], loading: false }) };
});

jest.mock(
    "src/squads/lesson/pages/LessonManagement/hooks/useDeleteLessonOfLessonManagement",
    () => {
        return { __esModule: true, default: jest.fn() };
    }
);

jest.mock(
    "src/squads/lesson/pages/LessonManagement/hooks/useUpsertLessonOfLessonManagement",
    () => {
        return { __esModule: true, default: jest.fn() };
    }
);

jest.mock("react-router", () => {
    const originalModule = jest.requireActual("react-router");
    return {
        __esModule: true,
        ...originalModule,
        useParams: jest.fn(),
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
                case Features.LESSON_MANAGEMENT_SHOW_ALERT_WHEN_NO_STUDENT:
                    return { isEnabled: true };

                default:
                    return { isEnabled: true };
            }
        },
    };
});

const setupMocks = (
    overrideProps: Partial<{
        isUndefinedLessonId: boolean;
        isLoadingData: boolean;
        isNonLessonData: boolean;
        isNonLessonReportData: boolean;
        isNonLessonStudent: boolean;
    }> = {}
) => {
    const {
        isUndefinedLessonId,
        isLoadingData = false,
        isNonLessonData,
        isNonLessonReportData,
        isNonLessonStudent,
    } = overrideProps;

    const mockShowSnackbar = jest.fn();
    const mockLessonData = createMockLessonData("1", {
        teachingMethod: "GROUP",
        studentHasAttendanceStatus: true,
        isNonLessonStudent,
    });
    const mockLessonReportsData = createMockLessonReportData("1");
    const mockRefetchLessonAndLessonReport = jest.fn();
    const mockRefetchForLessonReport = jest.fn();
    const mockHistoryPush = jest.fn();

    (useHistory as jest.Mock).mockImplementation(() => {
        return { push: mockHistoryPush };
    });

    (useParams as jest.Mock).mockImplementation(() => {
        return { lessonId: !isUndefinedLessonId ? "Lesson_Id_1" : undefined };
    });

    (useShowSnackbar as jest.Mock).mockImplementation(() => mockShowSnackbar);

    (useLessonReportDetails as jest.Mock).mockImplementation(() => {
        const result: UseLessonReportDetailsReturn = {
            lessonStatus: !isNonLessonData ? mockLessonData.scheduling_status : undefined,
            isLoadingLesson: isLoadingData,
            isLoadingLessonReport: isLoadingData,
            isLoadingCenter: isLoadingData,
            isLoadingMedia: isLoadingData,
            isLoadingClass: isLoadingData,
            isLoadingScheduler: isLoadingData,
            lessonData: !isNonLessonData ? mockLessonData : undefined,
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
            refetchForLessonReport: { refetch: mockRefetchForLessonReport, isRefetching: false },
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

    (useAutocompleteReference as jest.Mock).mockImplementation(({ resource }) => {
        switch (resource) {
            case Entities.TEACHERS:
                return { options: [], loading: false, setInputVal: jest.fn() };
            case Entities.LOCATIONS:
                return { options: [], loading: false, setInputVal: jest.fn() };
        }
    });

    (useClassManyReference as jest.Mock).mockImplementation(() => {
        return { classes: [], isLoading: false };
    });

    (useCourseManyReference as jest.Mock).mockImplementation(() => {
        return { courses: [], isLoading: false };
    });

    (useUpsertLessonOfLessonManagement as jest.Mock).mockImplementation(
        (props: UseUpsertLessonOfLessonManagementProps) => {
            return {
                upsertLessonWithMiddleWares: () => {
                    const fakeData = {} as NsLesson_Bob_LessonsService.UpsertLessons;
                    props.onSuccess?.(fakeData);
                },
                isLoading: false,
            };
        }
    );

    return {
        mockShowSnackbar,
        mockRefetchLessonAndLessonReport,
        mockHistoryPush,
    };
};

const renderComponent = () => {
    render(
        <TestQueryWrapper>
            <TestThemeProvider>
                <TestingRouter>
                    <TranslationProvider>
                        <MuiPickersUtilsProvider>
                            <LessonDetail />
                        </MuiPickersUtilsProvider>
                    </TranslationProvider>
                </TestingRouter>
            </TestThemeProvider>
        </TestQueryWrapper>
    );
};

describe("LessonDetail", () => {
    it("should show alert dialog cannot create report when lesson don't have student", async () => {
        setupMocks({
            isNonLessonReportData: true,
            isNonLessonStudent: true,
        });
        renderComponent();

        const createReportButton = screen.getByTestId("LessonDetail__createReportButton");
        userEvent.click(createReportButton);

        await waitFor(() => {
            const showAlertDialog = screen.getByTestId("DialogWithHeaderFooter_wrapper");
            expect(showAlertDialog).toHaveTextContent(
                "You cannot create lesson report when there is no student in the lesson"
            );
        });
    });
    it("should refetch lesson detail after upsert lesson success", async () => {
        const { mockRefetchLessonAndLessonReport, mockShowSnackbar } = setupMocks();
        renderComponent();

        const editLessonButton = screen.getByTestId("TabLessonDetail__buttonEdit");
        userEvent.click(editLessonButton);

        const lessonUpsertDialog = await screen.findByTestId("LessonUpsert__dialog");

        const saveLessonButton = within(lessonUpsertDialog).getByTestId(
            "LessonUpsertFooter__buttonPublish"
        );
        userEvent.click(saveLessonButton);

        await waitFor(() => {
            expect(screen.queryByTestId("LessonUpsert__dialog")).not.toBeInTheDocument();
        });
        expect(mockRefetchLessonAndLessonReport).toBeCalled();
        expect(mockShowSnackbar).toBeCalledWith("You have edited the lesson successfully!");
    });

    it("should refetch lesson detail after upsert lesson success", async () => {
        const { mockHistoryPush, mockShowSnackbar } = setupMocks();
        renderComponent();

        const actionPanel = screen.getByTestId("ActionPanel__root");
        const menuButton = within(actionPanel).getByRole("button");
        userEvent.click(menuButton);

        const buttonDelete = screen.getByRole("menuitem", { name: "ra.action.delete" });
        userEvent.click(buttonDelete);

        const deleteDialog = await screen.findByTestId("DialogDeleteLesson__dialog");
        const confirmDeleteButton = within(deleteDialog).getByRole("button", { name: "Delete" });

        userEvent.click(confirmDeleteButton);

        expect(mockShowSnackbar).toBeCalledWith("You have deleted the lesson successfully!");
        expect(mockHistoryPush).toBeCalled();
    });

    it("should loading while fetching data", () => {
        setupMocks({ isLoadingData: true });
        renderComponent();

        expect(screen.getByTestId("Loading__root")).toBeInTheDocument();
    });

    it("should show error message when getting data fail", () => {
        setupMocks({ isNonLessonData: true });
        renderComponent();

        expect(screen.getByText("Unable to find this lesson's information")).toBeInTheDocument();
        expect(screen.queryByRole("tab", { name: "Lesson Info" })).not.toBeInTheDocument();
    });

    it("should redirect if lessonId is undefined", () => {
        const { mockShowSnackbar } = setupMocks({ isUndefinedLessonId: true });
        renderComponent();

        expect(mockShowSnackbar).toBeCalledWith("Unable to get lesson id", "error");
    });
});
