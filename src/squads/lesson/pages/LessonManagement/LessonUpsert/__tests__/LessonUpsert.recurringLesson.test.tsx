import { Entities } from "src/common/constants/enum";
import { NsLesson_Bob_LessonsService } from "src/squads/lesson/service/bob/lessons-service/types";
import inferMutation from "src/squads/lesson/service/infer-mutation";
import { TestApp } from "src/squads/lesson/test-utils";
import { generateSampleDataWithStudentInfo } from "src/squads/lesson/test-utils/class-course";
import { selectDateForDatePicker } from "src/squads/lesson/test-utils/date-time-picker-helper";
import { mockCenters, mockTeachers } from "src/squads/lesson/test-utils/lesson-management";
import { createMockPaginationWithTotalObject } from "src/squads/lesson/test-utils/pagination";
import { MockInferMutationFn } from "src/squads/lesson/test-utils/types";
import {
    getAutocompleteInputByTestId,
    getRadioInputByTestId,
    selectAutocompleteOptionByLabel,
} from "src/squads/lesson/test-utils/utils";

import { CreateLessonSavingMethod, StudentAttendStatus } from "manabuf/bob/v1/lessons_pb";
import { LessonTeachingMedium, LessonTeachingMethod } from "manabuf/common/v1/enums_pb";

import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useAutocompleteReference from "src/squads/lesson/hooks/useAutocompleteReference";
import useShowSnackbar from "src/squads/lesson/hooks/useShowSnackbar";
import LessonUpsert from "src/squads/lesson/pages/LessonManagement/LessonUpsert";
import {
    LessonUpsertProps,
    LessonSavingMethodKeys,
    LessonTeachingMediumType,
    LessonTeachingMethodType,
} from "src/squads/lesson/pages/LessonManagement/common/types";
import useClassManyReference from "src/squads/lesson/pages/LessonManagement/hooks/useClassManyReference";
import useCourseManyReference from "src/squads/lesson/pages/LessonManagement/hooks/useCourseManyReference";
import useStudentInfoWithFilter from "src/squads/lesson/pages/LessonManagement/hooks/useStudentInfoWithFilter";
import { TestQueryWrapper } from "src/squads/lesson/test-utils/TestQueryWrapper";

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

jest.mock("src/squads/lesson/pages/LessonManagement/hooks/useStudentInfoWithFilter", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

jest.mock("src/squads/lesson/hooks/useConvertMedia", () => {
    return {
        __esModule: true,
        default: () => ({ convertMedia: jest.fn() }),
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
                                return { data: { mediaIds: ["Media_Id"] } };
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

    const { studentInfos, locationsManyQueried, coursesManyQueried, classesManyQueried } =
        generateSampleDataWithStudentInfo(1);

    const mockLearners = studentInfos;
    const mockClasses = classesManyQueried;
    const mockCourses = coursesManyQueried;

    (useAutocompleteReference as jest.Mock).mockImplementation(({ resource }) => {
        switch (resource) {
            case Entities.TEACHERS:
                return { options: mockTeachers, loading: false, setInputVal: jest.fn() };
            case Entities.LOCATIONS:
                return { options: locationsManyQueried, loading: false, setInputVal: jest.fn() };
        }
    });

    (useStudentInfoWithFilter as jest.Mock).mockImplementation(() => {
        return {
            studentInfosList: mockLearners,
            isLoadingStudentsCourses: false,
            isLoadingGrades: false,
            pagination: createMockPaginationWithTotalObject(),
            handleEnterSearchBar: jest.fn(),
            handleApplyFilterCriteria: jest.fn(),
        };
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

    const { mockMutateLesson } = setupUseMutation();

    return {
        mockTeachers,
        mockCenters,
        mockLearners,
        mockCourses,
        mockClasses,
        mockShowSnackbar,
        mockMutateLesson,
    };
};

const renderComponent = (props: Partial<LessonUpsertProps> = {}) => {
    const mocks = setupCustomHooks();

    render(
        <TestApp>
            <TestQueryWrapper>
                <LessonUpsert
                    isOpen={true}
                    mode="CREATE"
                    isEnabledLessonGroup={true}
                    onCloseUpsertDialog={jest.fn()}
                    onUpsertSuccessfully={jest.fn()}
                    {...props}
                />
            </TestQueryWrapper>
        </TestApp>
    );

    const oneTimeLesson = LessonSavingMethodKeys.CREATE_LESSON_SAVING_METHOD_ONE_TIME;
    const oneTimeRadio = getRadioInputByTestId(`Radio__${oneTimeLesson}`);

    const weeklyRecurringLesson = LessonSavingMethodKeys.CREATE_LESSON_SAVING_METHOD_RECURRENCE;
    const weeklyRecurringRadio = getRadioInputByTestId(`Radio__${weeklyRecurringLesson}`);

    return {
        ...mocks,
        oneTimeRadio,
        weeklyRecurringRadio,
    };
};

describe("LessonUpsert", () => {
    it("should render recurring lesson field correctly", () => {
        const { oneTimeRadio, weeklyRecurringRadio } = renderComponent();
        const endDateLesson = screen.queryByTestId("FormLessonUpsertV2__lessonEndDate");

        expect(oneTimeRadio).toBeInTheDocument();
        expect(weeklyRecurringRadio).toBeInTheDocument();
        expect(endDateLesson).not.toBeInTheDocument();
    });

    it("should render or hide end date lesson field when we select weekly recurring radio or one time radio ", () => {
        const { oneTimeRadio, weeklyRecurringRadio } = renderComponent();
        userEvent.click(weeklyRecurringRadio);
        const endDateLesson = screen.getByTestId("FormLessonUpsertV2__lessonEndDate");
        expect(endDateLesson).toBeInTheDocument();

        userEvent.click(oneTimeRadio);
        const endDateLessonField = screen.queryByTestId("FormLessonUpsertV2__lessonEndDate");
        expect(endDateLessonField).not.toBeInTheDocument();
    });

    it.skip("should create a new lesson", async () => {
        const {
            mockLearners,
            mockTeachers,
            mockShowSnackbar,
            mockMutateLesson,
            weeklyRecurringRadio,
        } = renderComponent();

        const now = new Date();
        const overMiddleMonth = now.getDate() > 15;

        const chosenDate = new Date();
        chosenDate.setDate(now.getDate() - (overMiddleMonth ? 1 : -1));

        const lessonDate = screen.getByTestId("FormLessonUpsertV2__lessonDate");
        const lessonDateInput = within(lessonDate).getByRole("textbox");

        await selectDateForDatePicker(lessonDateInput, chosenDate);

        const startTimeAutocompleteInput = getAutocompleteInputByTestId(
            "FormLessonUpsertV2__lessonStartTime"
        );
        userEvent.click(startTimeAutocompleteInput);
        selectAutocompleteOptionByLabel("00:15");

        const endTimeAutocompleteInput = getAutocompleteInputByTestId(
            "FormLessonUpsertV2__lessonEndTime"
        );

        userEvent.click(endTimeAutocompleteInput);
        selectAutocompleteOptionByLabel("01:00");

        const onlineMedium: LessonTeachingMediumType = "LESSON_TEACHING_MEDIUM_ONLINE";
        const onlineMediumRadio = getRadioInputByTestId(`Radio__${onlineMedium}`);

        userEvent.click(onlineMediumRadio);

        const groupTeaching: LessonTeachingMethodType = "LESSON_TEACHING_METHOD_GROUP";
        const groupTeachingRadio = getRadioInputByTestId(`Radio__${groupTeaching}`);

        userEvent.click(groupTeachingRadio);

        const teachersAutocompleteInput = getAutocompleteInputByTestId(
            "AutocompleteTeachersHF__autocomplete"
        );

        userEvent.click(teachersAutocompleteInput);

        mockTeachers.forEach((teacher) => {
            selectAutocompleteOptionByLabel(teacher.name);
        });

        const teacherChips = within(teachersAutocompleteInput.parentElement!).getAllByTestId(
            "AutocompleteBase__tagBox"
        );
        expect(teacherChips).toHaveLength(mockTeachers.length);

        const locationAutocompleteInput = getAutocompleteInputByTestId(
            "AutocompleteLowestLevelLocationsHF__autocomplete"
        );

        userEvent.click(locationAutocompleteInput);
        selectAutocompleteOptionByLabel("Location Name 1");

        expect(locationAutocompleteInput).toHaveValue("Location Name 1");

        const courseAutocompleteInput = getAutocompleteInputByTestId("FormLessonUpsertV2__course");

        userEvent.click(courseAutocompleteInput);
        selectAutocompleteOptionByLabel("Course Name 1");

        expect(courseAutocompleteInput).toHaveValue("Course Name 1");

        const classAutocompleteInput = getAutocompleteInputByTestId("FormLessonUpsertV2__class");

        userEvent.click(classAutocompleteInput);
        selectAutocompleteOptionByLabel("Class Name 1");

        expect(classAutocompleteInput).toHaveValue("Class Name 1");

        //  Recurring Lesson
        const endDate = new Date();
        endDate.setMonth(now.getMonth() + 1);
        endDate.setDate(1);

        userEvent.click(weeklyRecurringRadio);
        const endDateLesson = screen.getByTestId("FormLessonUpsertV2__lessonEndDate");
        const lessonEndDateInput = within(endDateLesson).getByRole("textbox");

        await selectDateForDatePicker(lessonEndDateInput, endDate, true);

        // add Student
        const addButton = screen.getByTestId("TableAction__buttonAdd");
        userEvent.click(addButton);

        const addStudentsDialog = screen.getByTestId("DialogAddStudentInfo__dialogContainer");
        expect(addStudentsDialog).toBeInTheDocument();

        const dialogContainer = within(addStudentsDialog);

        mockLearners.forEach((learner) => {
            const checkboxCell = screen.getByRole("cell", { name: learner.student.studentName });
            const checkbox = within(checkboxCell).getByRole("checkbox");
            userEvent.click(checkbox);
        });

        const checkedBoxes = dialogContainer.queryAllByRole("checkbox", { checked: true });
        expect(checkedBoxes).toHaveLength(2); // Include checkbox header

        const addStudentsButton = dialogContainer.getByTestId("FooterDialogConfirm__buttonSave");
        userEvent.click(addStudentsButton);

        await waitFor(() =>
            expect(mockShowSnackbar).toBeCalledWith("You have added students successfully!")
        );

        const file = new File(["(⌐□_□)"], "newFile.pdf", { type: "application/pdf" });

        const uploadInput = screen.getByTestId("UploadInput__inputFile");
        userEvent.upload(uploadInput, file);

        const chipFileDescription = await screen.findByTestId("ChipFileDescription__name");
        expect(chipFileDescription).toBeInTheDocument();

        const submitButton = screen.getByTestId("LessonUpsertFooter__buttonPublish");
        userEvent.click(submitButton);

        await waitFor(() =>
            expect(mockShowSnackbar).toBeCalledWith("You have created a lesson successfully!")
        );

        expect(mockMutateLesson).toBeCalledWith({
            lessonId: undefined,
            centerId: "Location_Id_1",
            startTime: new Date(
                chosenDate.getFullYear(),
                chosenDate.getMonth(),
                chosenDate.getDate(),
                0,
                15
            ),
            endTime: new Date(
                chosenDate.getFullYear(),
                chosenDate.getMonth(),
                chosenDate.getDate(),
                1,
                0
            ),
            mediaIds: ["Media_Id"],
            savingOption: {
                method: CreateLessonSavingMethod.CREATE_LESSON_SAVING_METHOD_RECURRENCE,
                recurrence: {
                    endDate: new Date(
                        endDate.getFullYear(),
                        endDate.getMonth(),
                        endDate.getDate(),
                        1,
                        0
                    ),
                },
            },
            studentInfoListList: [
                {
                    attendanceStatus: StudentAttendStatus.STUDENT_ATTEND_STATUS_EMPTY,
                    courseId: "Course_Id_1",
                    locationId: "Location_Id_1",
                    studentId: "Student_Id_1",
                },
            ],
            teacherIdsList: mockTeachers.map((teacher) => teacher.user_id),
            teachingMedium: LessonTeachingMedium[onlineMedium],
            teachingMethod: LessonTeachingMethod[groupTeaching],
            courseId: "Course_Id_1",
            classId: "Class_Id_1",
        });
    }, 30000);
});
