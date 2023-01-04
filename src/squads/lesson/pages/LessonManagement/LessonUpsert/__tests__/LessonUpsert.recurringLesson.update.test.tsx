import { Entities } from "src/common/constants/enum";
import { NsLesson_Bob_LessonsService } from "src/squads/lesson/service/bob/lessons-service/types";
import inferMutation from "src/squads/lesson/service/infer-mutation";
import { TestApp } from "src/squads/lesson/test-utils";
import {
    generateMockClassMany,
    generateMockCourseMany,
} from "src/squads/lesson/test-utils/class-course";
import { selectDateForDatePicker } from "src/squads/lesson/test-utils/date-time-picker-helper";
import {
    generateALessonMember,
    mockCenters,
    mockOneTimeScheduler,
    mockQueriedLessonData,
    mockStudentInfoList,
    mockTeachers,
    mockWeeklyRecurringScheduler,
    submittedRecurringLesson,
} from "src/squads/lesson/test-utils/lesson-management";
import { TestQueryWrapper } from "src/squads/lesson/test-utils/react-hooks";
import { MockInferMutationFn } from "src/squads/lesson/test-utils/types";
import { getRadioInputByTestId } from "src/squads/lesson/test-utils/utils";

import { CreateLessonSavingMethod } from "manabuf/bob/v1/lessons_pb";

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
                | "lessonsSaveDraft";
        }) => {
            switch (true) {
                case entity === "lessons" && action === "lessonsCreate":
                case entity === "lessons" && action === "lessonsUpdate":
                case entity === "lessons" && action === "lessonsSaveDraft": {
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

    const mockLearners = mockStudentInfoList;
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
        mockTeachers,
        mockCenters,
        mockLearners,
        mockCourses,
        mockClasses,
        mockShowSnackbar,
    };
};

const renderComponent = (props: Partial<LessonUpsertProps> = {}) => {
    const mocks = setupCustomHooks();

    render(
        <TestApp>
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
        </TestApp>
    );

    return mocks;
};

const submitLesson = async (
    isRecurringLesson?: boolean,
    isWeeklyRecurringSavingOption?: boolean
) => {
    const buttonSubmit = screen.getByTestId("LessonUpsertFooter__buttonPublish");
    userEvent.click(buttonSubmit);

    if (isRecurringLesson) {
        await waitFor(() => {
            expect(screen.queryByTestId("DialogConfirmSavingMethod__dialog")).toBeInTheDocument();
        });

        const dialogConfirmSavingMethod = screen.getByTestId("DialogConfirmSavingMethod__dialog");

        if (isWeeklyRecurringSavingOption) {
            // select weekly recurring saving option
            const weeklyRecurringLesson =
                LessonSavingMethodKeys.CREATE_LESSON_SAVING_METHOD_RECURRENCE;
            const weeklyRecurringLessonRadio = within(dialogConfirmSavingMethod).getByTestId(
                `Radio__${weeklyRecurringLesson}`
            );
            const weeklyRecurringLessonInput = within(weeklyRecurringLessonRadio).getByRole(
                "radio"
            );

            userEvent.click(weeklyRecurringLessonInput);
        }

        const saveButton = within(dialogConfirmSavingMethod).getByTestId(
            "FooterDialogConfirm__buttonSave"
        );
        userEvent.click(saveButton);
    }
};

// TODO: remove skip test once the lesson squad fixed this test suite
describe.skip("<LessonUpsert /> update lesson successfully", () => {
    it("should update lesson with valid data and one time saving option successfully", async () => {
        const { mockMutateLesson } = setupUseMutation();
        const onUpsertSuccessfully = jest.fn();

        const { mockShowSnackbar } = renderComponent({
            lesson: mockQueriedLessonData,
            scheduler: mockWeeklyRecurringScheduler,
            onUpsertSuccessfully,
        });

        // Recurring Settings are disabled
        const oneTimeLesson = LessonSavingMethodKeys.CREATE_LESSON_SAVING_METHOD_ONE_TIME;
        const oneTimeRadio = getRadioInputByTestId(`Radio__${oneTimeLesson}`);
        expect(oneTimeRadio).toBeDisabled();

        const weeklyRecurringLesson = LessonSavingMethodKeys.CREATE_LESSON_SAVING_METHOD_RECURRENCE;
        const weeklyRecurringRadio = getRadioInputByTestId(`Radio__${weeklyRecurringLesson}`);
        expect(weeklyRecurringRadio).toBeDisabled();

        await submitLesson(true);

        await waitFor(() =>
            expect(mockShowSnackbar).toBeCalledWith("You have edited the lesson successfully!")
        );
        expect(onUpsertSuccessfully).toBeCalled();
        expect(mockMutateLesson).toBeCalledWith({
            ...submittedRecurringLesson,
            savingOption: {
                method: CreateLessonSavingMethod.CREATE_LESSON_SAVING_METHOD_ONE_TIME,
            },
        });
    }, 20000);

    it("should update lesson with valid data and weekly recurring saving option successfully", async () => {
        const { mockMutateLesson } = setupUseMutation();
        const onUpsertSuccessfully = jest.fn();

        const { mockShowSnackbar } = renderComponent({
            lesson: mockQueriedLessonData,
            scheduler: mockWeeklyRecurringScheduler,
            onUpsertSuccessfully,
        });

        await submitLesson(true, true);

        await waitFor(() =>
            expect(mockShowSnackbar).toBeCalledWith("You have edited the lesson successfully!")
        );
        expect(onUpsertSuccessfully).toBeCalled();
        expect(mockMutateLesson).toBeCalledWith(submittedRecurringLesson);
    }, 30000);

    it("should update lesson when editing end date successfully", async () => {
        const onUpsertSuccessfully = jest.fn();

        const { mockMutateLesson } = setupUseMutation();
        const { mockShowSnackbar } = renderComponent({
            lesson: mockQueriedLessonData,
            scheduler: mockWeeklyRecurringScheduler,
            onUpsertSuccessfully,
        });

        // Edit End Date of Recurring Lesson
        const endDate = new Date(mockWeeklyRecurringScheduler.end_date);
        endDate.setMonth(endDate.getMonth() + 1);
        endDate.setDate(1);
        const endDateLesson = screen.getByTestId("FormLessonUpsertV2__lessonEndDate");
        const lessonEndDateInput = within(endDateLesson).getByRole("textbox");
        await selectDateForDatePicker(lessonEndDateInput, endDate, true);

        await submitLesson();
        await waitFor(() =>
            expect(mockShowSnackbar).toBeCalledWith("You have edited the lesson successfully!")
        );

        expect(onUpsertSuccessfully).toBeCalled();
        expect(mockMutateLesson).toBeCalledWith({
            ...submittedRecurringLesson,
            savingOption: {
                method: CreateLessonSavingMethod.CREATE_LESSON_SAVING_METHOD_RECURRENCE,
                recurrence: {
                    endDate: new Date(
                        endDate.getFullYear(),
                        endDate.getMonth(),
                        endDate.getDate(),
                        18,
                        0
                    ),
                },
            },
        });
    }, 15000);

    it("should still update lesson when students have no locations", async () => {
        const onUpsertSuccessfully = jest.fn();

        setupUseMutation();
        const { mockShowSnackbar } = renderComponent({
            lesson: { ...mockQueriedLessonData, studentSubscriptions: [] },
            scheduler: mockWeeklyRecurringScheduler,
            onUpsertSuccessfully,
        });

        await submitLesson(true);
        await waitFor(() =>
            expect(mockShowSnackbar).toBeCalledWith("You have edited the lesson successfully!")
        );

        expect(onUpsertSuccessfully).toBeCalled();
    }, 20000);
});

// TODO: remove skip test once the lesson squad fixed this test suite
describe.skip("<LessonUpsert /> update unsuccessfully", () => {
    it("should NOT update lesson when submit invalid data", async () => {
        const lessonMember1st = generateALessonMember({ studentId: 1, courseId: 1 });
        const lessonMember2nd = generateALessonMember({ studentId: 1, courseId: 2 }); // Same student but different course

        const invalidSubmitLessonData: LessonUpsertProps["lesson"] = {
            ...mockQueriedLessonData,
            lesson_members: [lessonMember1st, lessonMember2nd],
            studentSubscriptions: [
                {
                    studentId: lessonMember1st.user.user_id,
                    courseId: lessonMember1st.course!.course_id,
                    grade: "10",
                    id: "Subscription ID 01",
                    locationIdsList: ["Center Unknown"], // Center is different with `center_id`
                },
            ],
        };

        setupUseMutation();
        const { mockShowSnackbar } = renderComponent({
            lesson: invalidSubmitLessonData,
            scheduler: mockWeeklyRecurringScheduler,
        });

        await submitLesson(true);

        await waitFor(() =>
            expect(mockShowSnackbar).toBeCalledWith(
                "Please add only one student course for one student to the lesson",
                "error"
            )
        );

        const invalidCenterMessage = screen.getByText(
            "This lesson cannot be saved. Please add student from the same center as lesson."
        );

        expect(invalidCenterMessage).toBeInTheDocument();

        const closeButton = screen.getByLabelText("Close", { selector: "button" });
        userEvent.click(closeButton);

        await waitFor(() => expect(invalidCenterMessage).not.toBeInTheDocument());
    }, 20000);

    it("should NOT update lesson when submit valid data but get mutation error", async () => {
        const onUpsertSuccessfully = jest.fn();

        let onErrorRan = false;

        setupUseMutation({
            overrideMutateLessonMock: (options) => {
                const payload = {} as NsLesson_Bob_LessonsService.UpsertLessons;

                return {
                    mutate: async () => {
                        if (!onErrorRan) {
                            await options.onError?.(Error("OnERROR"), { data: payload }, {});
                            onErrorRan = true;
                        }
                    },
                };
            },
        });

        const { mockShowSnackbar } = renderComponent({
            lesson: mockQueriedLessonData,
            scheduler: mockOneTimeScheduler,
            onUpsertSuccessfully,
        });

        await submitLesson();

        await waitFor(() =>
            expect(mockShowSnackbar).toBeCalledWith(
                "We meet an unknown error. Please try again or contact with Staff.",
                "error"
            )
        );

        expect(onUpsertSuccessfully).not.toBeCalled();
    });
});
