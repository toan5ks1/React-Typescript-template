import { Entities } from "src/common/constants/enum";
import { NsLesson_Bob_LessonsService } from "src/squads/lesson/service/bob/lessons-service/types";
import inferMutation from "src/squads/lesson/service/infer-mutation";
import { TestApp } from "src/squads/lesson/test-utils";
import { generateSampleDataWithStudentInfo } from "src/squads/lesson/test-utils/class-course";
import { selectDateForDatePicker } from "src/squads/lesson/test-utils/date-time-picker-helper";
import { mockTeachers } from "src/squads/lesson/test-utils/lesson-management";
import { createMockPaginationWithTotalObject } from "src/squads/lesson/test-utils/pagination";
import { MockInferMutationFn } from "src/squads/lesson/test-utils/types";
import {
    getAutocompleteInputByTestId,
    getRadioInputByTestId,
    selectAutocompleteOptionByLabel,
} from "src/squads/lesson/test-utils/utils";

import { CreateLessonSavingMethod, LessonStatus } from "manabuf/bob/v1/lessons_pb";
import { LessonTeachingMedium, LessonTeachingMethod } from "manabuf/common/v1/enums_pb";

import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useAutocompleteReference from "src/squads/lesson/hooks/useAutocompleteReference";
import useShowSnackbar from "src/squads/lesson/hooks/useShowSnackbar";
import LessonUpsert from "src/squads/lesson/pages/LessonManagement/LessonUpsert";
import {
    LessonTeachingMediumType,
    LessonTeachingMethodType,
    LessonUpsertProps,
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

    return {
        ...mocks,
    };
};

describe("LessonManagementUpsert", () => {
    it("should create a new draft lesson without teacher and student", async () => {
        const { mockShowSnackbar, mockMutateLesson } = renderComponent();

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

        const locationAutocompleteInput = getAutocompleteInputByTestId(
            "AutocompleteLowestLevelLocationsHF__autocomplete"
        );

        userEvent.click(locationAutocompleteInput);
        selectAutocompleteOptionByLabel("Location Name 1");

        expect(locationAutocompleteInput).toHaveValue("Location Name 1");

        const saveDraftButton = screen.getByTestId("LessonUpsertFooter__buttonSaveDraft");
        userEvent.click(saveDraftButton);

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
            savingOption: { method: CreateLessonSavingMethod.CREATE_LESSON_SAVING_METHOD_ONE_TIME },
            studentInfoListList: [],
            teacherIdsList: [],
            teachingMedium: LessonTeachingMedium[onlineMedium],
            teachingMethod: LessonTeachingMethod[groupTeaching],
            courseId: "",
            classId: "",
            schedulingStatus: LessonStatus.LESSON_SCHEDULING_STATUS_DRAFT,
        });
    }, 20000);
});
