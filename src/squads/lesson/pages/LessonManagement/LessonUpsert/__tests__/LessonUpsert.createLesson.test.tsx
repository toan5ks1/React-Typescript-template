import { Entities } from "src/common/constants/enum";
import { NsLesson_Bob_LessonsService } from "src/squads/lesson/service/bob/lessons-service/types";
import inferMutation from "src/squads/lesson/service/infer-mutation";
import { UseMutationOptions } from "src/squads/lesson/service/service-creator";
import { TestApp } from "src/squads/lesson/test-utils";
import {
    selectDateForDatePicker,
    selectTimeForTimePickerAMPM,
} from "src/squads/lesson/test-utils/date-time-picker-helper";
import {
    mockCenters,
    mockStudentInfoList,
    mockTeachers,
} from "src/squads/lesson/test-utils/lesson-management";
import { createMockPaginationWithTotalObject } from "src/squads/lesson/test-utils/pagination";
import {
    getAutocompleteInputByTestId,
    getRadioInputByTestId,
    selectAutocompleteOptionByLabel,
} from "src/squads/lesson/test-utils/utils";

import {
    CreateLessonSavingMethod,
    LessonStatus,
    StudentAttendStatus,
} from "manabuf/bob/v1/lessons_pb";
import { LessonTeachingMedium, LessonTeachingMethod } from "manabuf/common/v1/enums_pb";

import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useAutocompleteReference from "src/squads/lesson/hooks/useAutocompleteReference";
import useLessonStudentInfoListFilter, {
    UseLessonStudentInfoListFilterReturn,
} from "src/squads/lesson/hooks/useLessonStudentInfoListFilter";
import useShowSnackbar from "src/squads/lesson/hooks/useShowSnackbar";
import LessonUpsert from "src/squads/lesson/pages/LessonManagement/LessonUpsert";
import {
    LessonUpsertProps,
    LessonTeachingMediumType,
} from "src/squads/lesson/pages/LessonManagement/common/types";
import { TestQueryWrapper } from "src/squads/lesson/test-utils/TestQueryWrapper";

jest.mock("src/squads/lesson/hooks/useShowSnackbar", () => {
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

jest.mock("src/squads/lesson/service/infer-mutation", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

const setupUseMutation = () => {
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
                    return (
                        props: UseMutationOptions<
                            { data: NsLesson_Bob_LessonsService.UpsertLessons },
                            unknown,
                            Error
                        >
                    ) => ({
                        mutate: mockMutateLesson.mockImplementation(async ({ data }) => {
                            if (!onSuccessRan) {
                                await props.onSuccess?.({}, { data }, {});
                                onSuccessRan = true;
                            }
                        }),
                    });
                }

                case entity === "upload" && action === "uploadFilterAndUploadFiles": {
                    return () => {
                        return {
                            mutateAsync: jest.fn().mockImplementation(() => {
                                return { data: { mediaIds: ["Media_Id"] } };
                            }),
                        };
                    };
                }

                case entity === "classes" && action === "classesConvertMedia": {
                    return () => {
                        return { mutate: mockMutateLesson };
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
            data: mockLearners,
            isFetchingStudentsCourses: false,
            isLoadingGrades: false,
            pagination: createMockPaginationWithTotalObject(5, 0),
            handleEnterSearchBar: jest.fn(),
            handleApplyFilterCriteria: jest.fn(),
        };

        return data;
    });

    (useShowSnackbar as jest.Mock).mockImplementation(() => mockShowSnackbar);

    const { mockMutateLesson } = setupUseMutation();

    return {
        mockTeachers,
        mockCenters,
        mockLearners,
        mockShowSnackbar,
        mockMutateLesson,
    };
};

const renderComponent = (props: Partial<LessonUpsertProps> = {}) => {
    const mocks = setupCustomHooks();

    const wrapper = render(
        <TestApp>
            <TestQueryWrapper>
                <LessonUpsert
                    isOpen={true}
                    onCloseUpsertDialog={() => {}}
                    onUpsertSuccessfully={async () => {}}
                    isEnabledLessonGroup={false}
                    mode="CREATE"
                    {...props}
                />
            </TestQueryWrapper>
        </TestApp>
    );

    return { wrapper, ...mocks };
};

// TODO: Remove after release epic https://manabie.atlassian.net/browse/LT-13374
describe("LessonManagementUpsertForm", () => {
    it("should create a new lesson", async () => {
        const { wrapper, mockTeachers, mockShowSnackbar, mockMutateLesson } = renderComponent();

        // Select lesson date
        const lessonDate = screen.getByTestId("FormLessonUpsert__lessonDate");
        const lessonDateInput = within(lessonDate).getByRole("textbox");

        const now = new Date();
        const overMiddleMonth = now.getDate() > 15;

        const chosenDate = new Date();
        chosenDate.setDate(now.getDate() - (overMiddleMonth ? 1 : -1));

        await selectDateForDatePicker(lessonDateInput, chosenDate);

        // Select lesson start time
        const lessonStartTime = screen.getByTestId("FormLessonUpsert__lessonStartTime");
        const lessonStartTimeInput = within(lessonStartTime).getByRole("textbox");

        await selectTimeForTimePickerAMPM(wrapper, lessonStartTimeInput, 0, 30, "AM");

        // Select lesson end time
        const lessonEndTimeTime = screen.getByTestId("FormLessonUpsert__lessonEndTime");
        const lessonEndTimeTimeInput = within(lessonEndTimeTime).getByRole("textbox");

        await selectTimeForTimePickerAMPM(wrapper, lessonEndTimeTimeInput, 11, 30, "AM");

        // Select medium
        const onlineMedium: LessonTeachingMediumType = "LESSON_TEACHING_MEDIUM_ONLINE";
        const onlineMediumRadio = getRadioInputByTestId(`Radio__${onlineMedium}`);

        userEvent.click(onlineMediumRadio);

        // Select teachers
        const teachersInput = getAutocompleteInputByTestId("AutocompleteTeachersHF__autocomplete");

        userEvent.type(teachersInput, "Teacher");

        mockTeachers.forEach((teacher) => {
            selectAutocompleteOptionByLabel(teacher.name);
        });

        const teacherChips = within(teachersInput.parentElement!).getAllByTestId(
            "AutocompleteBase__tagBox"
        );
        expect(teacherChips).toHaveLength(2);

        // Select centers
        const centerInput = getAutocompleteInputByTestId(
            "AutocompleteLowestLevelLocationsHF__autocomplete"
        );

        userEvent.type(centerInput, "Center");
        selectAutocompleteOptionByLabel("Center Name 01");

        expect(centerInput).toHaveValue("Center Name 01");

        // Select students
        const addButton = screen.getByTestId("TableAction__buttonAdd");
        userEvent.click(addButton);

        const addStudentsDialog = screen.getByTestId(
            "DialogAddStudentSubscriptions__dialogContainer"
        );
        expect(addStudentsDialog).toBeVisible();

        const dialogContainer = within(addStudentsDialog);

        const tableRows = dialogContainer.getAllByTestId("TableRowWithCheckbox__checkboxRow");
        const studentCheckboxes = tableRows.map((row) => {
            return row.querySelector('input[type="checkbox"]');
        });

        expect(studentCheckboxes).toHaveLength(2);
        studentCheckboxes.forEach((checkbox) => userEvent.click(checkbox!));

        const checkedBoxes = dialogContainer.queryAllByRole("checkbox", { checked: true });
        expect(checkedBoxes).toHaveLength(3); // Include checkbox header

        const addStudentsButton = dialogContainer.getByTestId("FooterDialogConfirm__buttonSave");
        userEvent.click(addStudentsButton);

        await waitFor(() =>
            expect(mockShowSnackbar).toBeCalledWith("You have added students successfully!")
        );

        // Upload files
        const file = new File(["(⌐□_□)"], "newFile.pdf", { type: "application/pdf" });

        const uploadInput = screen.getByTestId("UploadInput__inputFile");
        userEvent.upload(uploadInput, file);

        const chipFileDescription = await screen.findByTestId("ChipFileDescription__name");
        expect(chipFileDescription).toBeVisible();

        // Submit lesson
        const submitButton = screen.getByTestId("LessonUpsertFooter__buttonPublish");
        userEvent.click(submitButton);

        await waitFor(() =>
            expect(mockShowSnackbar).toBeCalledWith("You have created a lesson successfully!")
        );

        expect(mockMutateLesson).toBeCalledWith({
            lessonId: undefined,
            centerId: "Center ID 01",
            startTime: new Date(
                chosenDate.getFullYear(),
                chosenDate.getMonth(),
                chosenDate.getDate(),
                0,
                30
            ),
            endTime: new Date(
                chosenDate.getFullYear(),
                chosenDate.getMonth(),
                chosenDate.getDate(),
                11,
                30
            ),
            mediaIds: ["Media_Id"],
            savingOption: { method: CreateLessonSavingMethod.CREATE_LESSON_SAVING_METHOD_ONE_TIME },
            studentInfoListList: [
                {
                    attendanceStatus: StudentAttendStatus.STUDENT_ATTEND_STATUS_EMPTY,
                    courseId: "Course_Id_1",
                    locationId: "",
                    studentId: "Student_Id_1",
                },
                {
                    attendanceStatus: StudentAttendStatus.STUDENT_ATTEND_STATUS_EMPTY,
                    courseId: "Course_Id_2",
                    locationId: "",
                    studentId: "Student_Id_2",
                },
            ],
            teacherIdsList: mockTeachers.map((teacher) => teacher.user_id),
            teachingMedium: LessonTeachingMedium[onlineMedium],
            teachingMethod: LessonTeachingMethod.LESSON_TEACHING_METHOD_INDIVIDUAL,
            classId: "",
            courseId: "",
            schedulingStatus: LessonStatus.LESSON_SCHEDULING_STATUS_PUBLISHED,
        });
    }, 40000);
});
