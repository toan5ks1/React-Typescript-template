import { Entities } from "src/common/constants/enum";
import { TestApp } from "src/squads/lesson/test-utils";
import {
    lessonDefaultData,
    mockCenters,
    mockStudentInfoList,
    mockTeachers,
} from "src/squads/lesson/test-utils/lesson-management";
import { createMockPaginationWithTotalObject } from "src/squads/lesson/test-utils/pagination";

import FormLessonUpsertV2 from "src/squads/lesson/pages/LessonManagement/components/Forms/FormLessonUpsertV2";

import { CreateLessonSavingMethod } from "manabuf/bob/v1/lessons_pb";

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
    LessonUpsertMode,
} from "src/squads/lesson/pages/LessonManagement/common/types";
import TestHookFormProvider from "src/squads/lesson/test-utils/TestHookFormProvider";
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

const renderComponent = (
    lessonData?: LessonManagementUpsertFormType,
    mode: LessonUpsertMode = "CREATE"
) => {
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
                    <FormLessonUpsertV2
                        lessonData={lessonData}
                        mode={mode}
                        isEnabledRecurringLesson={true}
                        isSavingDraftLesson={false}
                    />
                </TestHookFormProvider>
            </TestQueryWrapper>
        </TestApp>
    );

    const lessonDate = screen.getByTestId("FormLessonUpsertV2__lessonDate");
    const lessonStartTime = screen.getByTestId("FormLessonUpsertV2__lessonStartTime");
    const lessonEndTime = screen.getByTestId("FormLessonUpsertV2__lessonEndTime");

    const onlineMedium: LessonTeachingMediumType = "LESSON_TEACHING_MEDIUM_ONLINE";
    const offlineMedium: LessonTeachingMediumType = "LESSON_TEACHING_MEDIUM_OFFLINE";

    const onlineMediumRadio = screen.getByTestId(`Radio__${onlineMedium}`);
    const offlineMediumRadio = screen.getByTestId(`Radio__${offlineMedium}`);

    const individualMethod: LessonTeachingMethodType = "LESSON_TEACHING_METHOD_INDIVIDUAL";
    const individualMethodRadio = screen.getByTestId(`Radio__${individualMethod}`);

    const teacherAutocomplete = screen.getByTestId("AutocompleteTeachersHF__autocomplete");

    const locationAutocomplete = screen.getByTestId(
        "AutocompleteLowestLevelLocationsHF__autocomplete"
    );

    const courseAutocomplete = screen.getByTestId("FormLessonUpsertV2__course");

    const classAutocomplete = screen.getByTestId("FormLessonUpsertV2__class");

    const uploadInput = screen.getByTestId("UploadInput__inputFile");

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
        locationAutocomplete,
        courseAutocomplete,
        classAutocomplete,
        addStudentButton,
        uploadInput,
        oneTimeRadio,
        weeklyRecurringRadio,
    };
};

describe("FormLessonUpsertV2", () => {
    it("should render all fields of lesson form", async () => {
        const {
            lessonDate,
            lessonStartTime,
            lessonEndTime,
            offlineMediumRadio,
            onlineMediumRadio,
            individualMethodRadio,
            teacherAutocomplete,
            locationAutocomplete,
            addStudentButton,
            uploadInput,
            oneTimeRadio,
            weeklyRecurringRadio,
        } = renderComponent();

        expect(lessonDate).toBeInTheDocument();
        expect(lessonStartTime).toBeInTheDocument();
        expect(lessonEndTime).toBeInTheDocument();

        expect(onlineMediumRadio).toBeInTheDocument();
        expect(offlineMediumRadio).toBeInTheDocument();

        expect(individualMethodRadio).toBeInTheDocument();

        expect(teacherAutocomplete).toBeInTheDocument();

        expect(locationAutocomplete).toBeInTheDocument();

        expect(uploadInput).toBeInTheDocument();

        userEvent.click(addStudentButton);

        const addStudentsDialog = screen.getByTestId("DialogAddStudentInfo__dialogContainer");
        expect(addStudentsDialog).toBeInTheDocument();

        // Recurring Lesson
        expect(oneTimeRadio).toBeInTheDocument();
        expect(weeklyRecurringRadio).toBeInTheDocument();

        const endDateLesson = screen.queryByTestId("FormLessonUpsertV2__lessonEndDate");
        expect(endDateLesson).not.toBeInTheDocument();

        userEvent.click(weeklyRecurringRadio);

        const endDateLessonField = screen.getByTestId("FormLessonUpsertV2__lessonEndDate");
        expect(endDateLessonField).toBeInTheDocument();
    });

    it("should apply default values from lesson prop when method saving is ONE TIME", () => {
        const {
            lessonDate,
            lessonStartTime,
            lessonEndTime,
            onlineMediumRadio,
            individualMethodRadio,
            teacherAutocomplete,
            locationAutocomplete,
            courseAutocomplete,
            classAutocomplete,
            oneTimeRadio,
        } = renderComponent(lessonDefaultData, "EDIT");

        expect(lessonDate.querySelector("input")).toHaveValue("2022/02/02");
        expect(within(lessonStartTime).getByRole("combobox")).toHaveValue("00:15");
        expect(within(lessonEndTime).getByRole("combobox")).toHaveValue("01:15");

        expect(
            within(onlineMediumRadio).getByTestId("RadioButtonUncheckedIcon")
        ).toBeInTheDocument();

        expect(
            within(individualMethodRadio).getByTestId("RadioButtonUncheckedIcon")
        ).toBeInTheDocument();

        expect(
            within(teacherAutocomplete).getByTestId("AutocompleteBase__tagBox")
        ).toBeInTheDocument();

        expect(within(locationAutocomplete).getByRole("combobox")).toHaveValue("Center Name 01");

        expect(within(courseAutocomplete).getByRole("combobox")).toHaveValue("Course Name 1");

        expect(within(classAutocomplete).getByRole("combobox")).toHaveValue("Class Name 1");

        expect(screen.getByTestId("ListMediaChipsBase")).toBeInTheDocument();

        const student = within(screen.getByTestId("TableBase__row")).getByText(
            "Test Student Name 01"
        );
        expect(student).toBeInTheDocument();

        // Recurring Lesson
        expect(within(oneTimeRadio).getByTestId("RadioButtonCheckedIcon")).toBeInTheDocument();
    });

    it("should apply default values from lesson prop when method saving is RECURRENCE", () => {
        const defaultData: LessonManagementUpsertFormType = {
            ...lessonDefaultData,
            method: LessonSavingMethodKeys.CREATE_LESSON_SAVING_METHOD_RECURRENCE,
        };
        const { weeklyRecurringRadio } = renderComponent(defaultData, "EDIT");

        expect(
            within(weeklyRecurringRadio).getByTestId("RadioButtonCheckedIcon")
        ).toBeInTheDocument();

        const endDateLessonField = screen.getByTestId("FormLessonUpsertV2__lessonEndDate");
        expect(endDateLessonField).toBeInTheDocument();
    });
});
