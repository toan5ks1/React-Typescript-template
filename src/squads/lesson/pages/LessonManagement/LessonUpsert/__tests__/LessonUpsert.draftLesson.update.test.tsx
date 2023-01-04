import { Entities } from "src/common/constants/enum";
import { NsLesson_Bob_LessonsService } from "src/squads/lesson/service/bob/lessons-service/types";
import inferMutation from "src/squads/lesson/service/infer-mutation";
import { TestThemeProvider } from "src/squads/lesson/test-utils";
import {
    generateMockClassMany,
    generateMockCourseMany,
} from "src/squads/lesson/test-utils/class-course";
import {
    mockCenters,
    mockQueriedLessonData,
    mockTeachers,
    mockWeeklyRecurringScheduler,
} from "src/squads/lesson/test-utils/lesson-management";
import { TestQueryWrapper } from "src/squads/lesson/test-utils/react-hooks";
import { MockInferMutationFn } from "src/squads/lesson/test-utils/types";

import MuiPickersUtilsProvider from "src/squads/lesson/providers/MuiPickersUtilsProvider";
import TranslationProvider from "src/squads/lesson/providers/TranslationProvider";

import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useAutocompleteReference from "src/squads/lesson/hooks/useAutocompleteReference";
import useShowSnackbar from "src/squads/lesson/hooks/useShowSnackbar";
import LessonUpsert from "src/squads/lesson/pages/LessonManagement/LessonUpsert";
import {
    LessonUpsertProps,
    LessonSavingMethodKeys,
} from "src/squads/lesson/pages/LessonManagement/common/types";
import useClassManyReference from "src/squads/lesson/pages/LessonManagement/hooks/useClassManyReference";
import useCourseManyReference from "src/squads/lesson/pages/LessonManagement/hooks/useCourseManyReference";

jest.mock("src/squads/lesson/hooks/useShowSnackbar", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

jest.mock("src/hooks/useShowSnackbar", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

jest.mock("src/squads/lesson/hooks/useAutocompleteReference", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

jest.mock("src/squads/lesson/service/infer-mutation", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

jest.mock("src/squads/lesson/pages/LessonManagement/hooks/useClassManyReference", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

jest.mock("src/squads/lesson/pages/LessonManagement/hooks/useCourseManyReference", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

jest.mock("src/squads/lesson/hooks/useFeatureToggle", () => {
    return {
        __esModule: true,
        default: () => ({ isEnabled: true }),
    };
});

const setupUseMutation = (props?: {
    overrideMutateLessonMock?: MockInferMutationFn<NsLesson_Bob_LessonsService.UpsertLessons>;
}) => {
    const mockMutateLesson = jest.fn();

    let onSuccessRan = false;

    (inferMutation as jest.Mock).mockImplementation(
        ({
            entity,
            action,
        }: {
            entity: "lessons" | "upload" | "classes";
            action:
                | "lessonsUpdate"
                | "lessonsCreate"
                | "uploadFilterAndUploadFiles"
                | "classesConvertMedia"
                | "lessonsSaveDraft"
                | "lessonsUpdateDraft";
        }) => {
            switch (true) {
                case entity === "lessons" && action === "lessonsCreate":
                case entity === "lessons" && action === "lessonsUpdate":
                case entity === "lessons" && action === "lessonsSaveDraft":
                case entity === "lessons" && action === "lessonsUpdateDraft": {
                    if (props?.overrideMutateLessonMock) return props.overrideMutateLessonMock;

                    const mockMutate: MockInferMutationFn<NsLesson_Bob_LessonsService.UpsertLessons> =
                        (options) => ({
                            mutate: mockMutateLesson.mockImplementation(async ({ data }) => {
                                if (!onSuccessRan) {
                                    await options.onSuccess?.({}, { data }, {});
                                    onSuccessRan = true;
                                }
                            }),
                        });

                    return mockMutate;
                }

                case entity === "upload" && action === "uploadFilterAndUploadFiles": {
                    return () => {
                        return {
                            mutateAsync: () => {
                                return { data: { mediaIds: [] } };
                            },
                        };
                    };
                }

                case entity === "classes" && action === "classesConvertMedia": {
                    return () => {
                        return { mutate: jest.fn() };
                    };
                }
            }
        }
    );

    return { mockMutateLesson };
};

const setupCustomHooks = () => {
    const mockShowSnackbar = jest.fn();

    const mockClasses = generateMockClassMany();
    const mockCourses = generateMockCourseMany().map((data) => data.course);

    (useAutocompleteReference as jest.Mock).mockImplementation(({ resource }) => {
        switch (resource) {
            case Entities.TEACHERS:
                return { options: mockTeachers, loading: false, setInputVal: jest.fn() };
            case Entities.LOCATIONS:
                return { options: mockCenters, loading: false, setInputVal: jest.fn() };
        }
    });

    (useClassManyReference as jest.Mock).mockImplementation(() => {
        return {
            classes: mockClasses,
            isLoading: false,
        };
    });

    (useCourseManyReference as jest.Mock).mockImplementation(() => {
        return {
            courses: mockCourses,
            isLoading: false,
        };
    });

    (useShowSnackbar as jest.Mock).mockImplementation(() => mockShowSnackbar);

    return {
        mockShowSnackbar,
    };
};

const renderComponent = (props: Partial<LessonUpsertProps> = {}) => {
    const mocks = setupCustomHooks();

    render(
        <TranslationProvider>
            <MuiPickersUtilsProvider>
                <TestThemeProvider>
                    <TestQueryWrapper>
                        <LessonUpsert
                            isOpen={true}
                            mode="EDIT"
                            centerName="Center Name 01"
                            className="Class Name 1"
                            isEnabledLessonGroup={true}
                            onCloseUpsertDialog={jest.fn()}
                            onUpsertSuccessfully={jest.fn()}
                            {...props}
                        />
                    </TestQueryWrapper>
                </TestThemeProvider>
            </MuiPickersUtilsProvider>
        </TranslationProvider>
    );

    return mocks;
};
describe("<LessonUpsert /> update lesson", () => {
    it("should update lesson when saving draft lesson with valid data", async () => {
        const onUpsertSuccessfully = jest.fn();

        setupUseMutation();
        const { mockShowSnackbar } = renderComponent({
            lesson: mockQueriedLessonData,
            onUpsertSuccessfully,
        });

        const saveDraftButton = screen.getByTestId("LessonUpsertFooter__buttonSaveDraft");
        userEvent.click(saveDraftButton);

        await waitFor(() =>
            expect(mockShowSnackbar).toBeCalledWith("You have edited the lesson successfully!")
        );

        expect(onUpsertSuccessfully).toBeCalled();
    });

    it("should update lesson when saving draft lesson with valid data without teacher and student", async () => {
        const onUpsertSuccessfully = jest.fn();

        setupUseMutation();
        const { mockShowSnackbar } = renderComponent({
            lesson: {
                ...mockQueriedLessonData,
                lessons_teachers: [],
                studentSubscriptions: [],
            },
            onUpsertSuccessfully,
        });

        const saveDraftButton = screen.getByTestId("LessonUpsertFooter__buttonSaveDraft");
        userEvent.click(saveDraftButton);

        await waitFor(() =>
            expect(mockShowSnackbar).toBeCalledWith("You have edited the lesson successfully!")
        );

        expect(onUpsertSuccessfully).toBeCalled();
    });

    it("should update weekly recurring lesson when saving draft lesson with valid data without teacher and student", async () => {
        const onUpsertSuccessfully = jest.fn();

        setupUseMutation();
        const { mockShowSnackbar } = renderComponent({
            lesson: {
                ...mockQueriedLessonData,
                lessons_teachers: [],
                studentSubscriptions: [],
            },
            scheduler: mockWeeklyRecurringScheduler,
            onUpsertSuccessfully,
        });

        const saveDraftButton = screen.getByTestId("LessonUpsertFooter__buttonSaveDraft");
        userEvent.click(saveDraftButton);

        await waitFor(() => {
            expect(screen.getByTestId("DialogConfirmSavingMethod__dialog")).toBeInTheDocument();
        });

        const dialogConfirmSavingMethod = screen.getByTestId("DialogConfirmSavingMethod__dialog");

        // select weekly recurring saving option
        const weeklyRecurringLesson = LessonSavingMethodKeys.CREATE_LESSON_SAVING_METHOD_RECURRENCE;
        const weeklyRecurringLessonRadio = within(dialogConfirmSavingMethod).getByTestId(
            `Radio__${weeklyRecurringLesson}`
        );
        const weeklyRecurringLessonInput = within(weeklyRecurringLessonRadio).getByRole("radio");

        userEvent.click(weeklyRecurringLessonInput);

        const saveButton = within(dialogConfirmSavingMethod).getByTestId(
            "FooterDialogConfirm__buttonSave"
        );
        userEvent.click(saveButton);

        await waitFor(() =>
            expect(mockShowSnackbar).toBeCalledWith("You have edited the lesson successfully!")
        );

        expect(onUpsertSuccessfully).toBeCalled();
    });
});
