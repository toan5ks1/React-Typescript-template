import { Entities } from "src/common/constants/enum";
import { TestApp } from "src/squads/lesson/test-utils";
import {
    mockCenters,
    mockMedias,
    mockStudentInfoList,
    mockTeachers,
} from "src/squads/lesson/test-utils/lesson-management";
import { createMockPaginationWithTotalObject } from "src/squads/lesson/test-utils/pagination";

import FormLessonUpsert from "src/squads/lesson/pages/LessonManagement/components/Forms/FormLessonUpsert";

import { CreateLessonSavingMethod, StudentAttendStatus } from "manabuf/bob/v1/lessons_pb";

import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useAutocompleteReference from "src/squads/lesson/hooks/useAutocompleteReference";
import useLessonStudentInfoListFilter, {
    UseLessonStudentInfoListFilterReturn,
} from "src/squads/lesson/hooks/useLessonStudentInfoListFilter";
import {
    LessonManagementUpsertFormType,
    LessonSavingMethodKeys,
    LessonTeachingMediumKeys,
    LessonTeachingMediumType,
    LessonTeachingMethodKeys,
    LessonTeachingMethodType,
} from "src/squads/lesson/pages/LessonManagement/common/types";
import TestHookFormProvider from "src/squads/lesson/test-utils/TestHookFormProvider";
import { TestQueryWrapper } from "src/squads/lesson/test-utils/TestQueryWrapper";

jest.mock("src/squads/lesson/hooks/useShowSnackbar", () => () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

jest.mock("src/hooks/useShowSnackbar", () => () => {
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

jest.mock("src/squads/lesson/hooks/useLessonStudentInfoListFilter", () => {
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

const renderComponent = (lessonData?: LessonManagementUpsertFormType) => {
    (useAutocompleteReference as jest.Mock).mockImplementation(({ resource }) => {
        switch (resource) {
            case Entities.TEACHERS:
                return { options: mockTeachers, loading: false, setInputVal: jest.fn() };
            case Entities.LOCATIONS:
                return { options: mockCenters, loading: false, setInputVal: jest.fn() };
        }
    });

    (useLessonStudentInfoListFilter as jest.Mock).mockImplementation(() => {
        const data: UseLessonStudentInfoListFilterReturn = {
            data: mockStudentInfoList,
            isFetchingStudentsCourses: false,
            isLoadingGrades: false,
            pagination: createMockPaginationWithTotalObject(5, 0),
            handleEnterSearchBar: jest.fn(),
            handleApplyFilterCriteria: jest.fn(),
        };

        return data;
    });

    render(
        <TestApp>
            <TestQueryWrapper>
                <TestHookFormProvider
                    useFormOptions={{
                        defaultValues: {
                            teachers: [],
                            teachingMethod:
                                LessonTeachingMethodKeys.LESSON_TEACHING_METHOD_INDIVIDUAL,
                            teachingMedium: LessonTeachingMediumKeys.LESSON_TEACHING_MEDIUM_OFFLINE,
                            date: new Date(),
                            startTime: new Date(),
                            endTime: new Date(),
                            method: CreateLessonSavingMethod.CREATE_LESSON_SAVING_METHOD_ONE_TIME,
                            materialsList: [],
                            learners: [],
                            ...lessonData,
                        },
                    }}
                >
                    <FormLessonUpsert
                        lessonData={lessonData}
                        isEnabledRecurringLesson={true}
                        mode="CREATE"
                        isSavingDraftLesson={false}
                    />
                </TestHookFormProvider>
            </TestQueryWrapper>
        </TestApp>
    );

    // Datetime
    const lessonDate = screen.getByTestId("FormLessonUpsert__lessonDate");
    const lessonStartTime = screen.getByTestId("FormLessonUpsert__lessonStartTime");
    const lessonEndTime = screen.getByTestId("FormLessonUpsert__lessonEndTime");

    // Teaching medium
    const onlineMedium: LessonTeachingMediumType = "LESSON_TEACHING_MEDIUM_ONLINE";
    const offlineMedium: LessonTeachingMediumType = "LESSON_TEACHING_MEDIUM_OFFLINE";

    const onlineMediumRadio = screen.getByTestId(`Radio__${onlineMedium}`);
    const offlineMediumRadio = screen.getByTestId(`Radio__${offlineMedium}`);

    // Teaching method
    const individualMethod: LessonTeachingMethodType = "LESSON_TEACHING_METHOD_INDIVIDUAL";
    const individualMethodRadio = screen.getByTestId(`Radio__${individualMethod}`);

    // Teacher
    const teacherAutocomplete = screen.getByTestId("AutocompleteTeachersHF__autocomplete");

    // Center
    const centerAutocomplete = screen.getByTestId(
        "AutocompleteLowestLevelLocationsHF__autocomplete"
    );

    // Upload file
    const uploadInput = screen.getByTestId("UploadInput__inputFile");

    // Student
    const addStudentButton = screen.getByTestId("TableAction__buttonAdd");

    // recurring Lesson
    const oneTimeLesson = LessonSavingMethodKeys.CREATE_LESSON_SAVING_METHOD_ONE_TIME;
    const oneTimeRadio = screen.getByTestId(`Radio__${oneTimeLesson}`);

    const weeklyRecurringLesson = LessonSavingMethodKeys.CREATE_LESSON_SAVING_METHOD_RECURRENCE;
    const weeklyRecurringRadio = screen.getByTestId(`Radio__${weeklyRecurringLesson}`);

    return {
        lessonDate,
        lessonStartTime,
        lessonEndTime,
        offlineMediumRadio,
        onlineMediumRadio,
        individualMethodRadio,
        teacherAutocomplete,
        centerAutocomplete,
        addStudentButton,
        uploadInput,
        oneTimeRadio,
        weeklyRecurringRadio,
    };
};

describe("FormLessonUpsert", () => {
    it("should render all fields of lesson form", () => {
        const {
            lessonDate,
            lessonStartTime,
            lessonEndTime,
            offlineMediumRadio,
            onlineMediumRadio,
            individualMethodRadio,
            teacherAutocomplete,
            centerAutocomplete,
            addStudentButton,
            uploadInput,
            oneTimeRadio,
            weeklyRecurringRadio,
        } = renderComponent();

        expect(lessonDate).toBeInTheDocument();
        expect(lessonStartTime).toBeInTheDocument();
        expect(lessonEndTime).toBeInTheDocument();

        // Teaching medium
        expect(onlineMediumRadio).toBeInTheDocument();
        expect(offlineMediumRadio).toBeInTheDocument();

        // Teaching method
        expect(individualMethodRadio).toBeInTheDocument();

        // Teacher
        expect(teacherAutocomplete).toBeInTheDocument();

        // Center
        expect(centerAutocomplete).toBeInTheDocument();

        // Upload file
        expect(uploadInput).toBeInTheDocument();

        // Student
        userEvent.click(addStudentButton);

        const addStudentsDialog = screen.getByTestId(
            "DialogAddStudentSubscriptions__dialogContainer"
        );
        expect(addStudentsDialog).toBeInTheDocument();

        // Recurring Lesson
        expect(oneTimeRadio).toBeInTheDocument();
        expect(weeklyRecurringRadio).toBeInTheDocument();

        const endDateLesson = screen.queryByTestId("FormLessonUpsert__lessonEndDate");
        expect(endDateLesson).not.toBeInTheDocument();

        userEvent.click(weeklyRecurringRadio);

        const endDateLessonField = screen.getByTestId("FormLessonUpsert__lessonEndDate");
        expect(endDateLessonField).toBeInTheDocument();
    });

    it("should apply default values from lesson prop", () => {
        const lessonDefaultData: LessonManagementUpsertFormType = {
            date: new Date("2022/02/02"),
            startTime: new Date("2022/02/02"),
            endTime: new Date("2022/02/02"),
            teachers: [
                {
                    user_id: "Teacher ID 01",
                    name: "Teacher 01",
                    email: "teacher01@email",
                },
            ],
            center: {
                locationId: "Center ID 01",
                name: "Center Name 01",
            },
            learners: [
                {
                    studentSubscriptionId: "Test Info Id",
                    student: {
                        studentId: "Test Student ID 1",
                        studentName: "Test Student Name 01",
                    },
                    attendanceStatus: StudentAttendStatus.STUDENT_ATTEND_STATUS_ATTEND,
                    course: {
                        courseId: "Test Course ID 1",
                        courseName: "Course Name 01",
                    },
                    grade: 1,
                },
            ],
            materialsList: mockMedias,
            method: LessonSavingMethodKeys.CREATE_LESSON_SAVING_METHOD_ONE_TIME,
            teachingMedium: "LESSON_TEACHING_MEDIUM_ONLINE",
            teachingMethod: "LESSON_TEACHING_METHOD_INDIVIDUAL",
        };

        const {
            lessonDate,
            lessonStartTime,
            lessonEndTime,
            onlineMediumRadio,
            individualMethodRadio,
            teacherAutocomplete,
            centerAutocomplete,
            oneTimeRadio,
        } = renderComponent(lessonDefaultData);

        expect(lessonDate.querySelector("input")).toHaveValue("2022/02/02");
        expect(lessonStartTime.querySelector("input")).toHaveValue("00:00");
        expect(lessonEndTime.querySelector("input")).toHaveValue("00:00");

        // Teaching medium
        expect(
            within(onlineMediumRadio).getByTestId("RadioButtonUncheckedIcon")
        ).toBeInTheDocument();

        // Teaching method
        expect(
            within(individualMethodRadio).getByTestId("RadioButtonUncheckedIcon")
        ).toBeInTheDocument();

        // Teacher
        expect(
            within(teacherAutocomplete).getByTestId("AutocompleteBase__tagBox")
        ).toBeInTheDocument();

        // Center
        expect(centerAutocomplete.querySelector("input")).toHaveValue("Center Name 01");

        // Upload file
        expect(screen.getByTestId("ListMediaChipsBase")).toBeInTheDocument();

        // Student
        const student = within(screen.getByTestId("TableBase__row")).getByText(
            "Test Student Name 01"
        );
        expect(student).toBeInTheDocument();

        // Recurring Lesson
        expect(within(oneTimeRadio).getByTestId("RadioButtonCheckedIcon")).toBeInTheDocument();
    });
});
