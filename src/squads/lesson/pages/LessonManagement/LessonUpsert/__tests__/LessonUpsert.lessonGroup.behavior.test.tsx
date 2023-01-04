import { Entities } from "src/common/constants/enum";
import { NsLesson_Bob_LessonsService } from "src/squads/lesson/service/bob/lessons-service/types";
import inferMutation from "src/squads/lesson/service/infer-mutation";
import { TestApp } from "src/squads/lesson/test-utils";
import {
    generateMockClassMany,
    generateMockCourseMany,
} from "src/squads/lesson/test-utils/class-course";
import {
    mockCenters,
    mockQueriedLessonData,
    mockStudentInfoList,
    mockTeachers,
} from "src/squads/lesson/test-utils/lesson-management";
import { TestQueryWrapper } from "src/squads/lesson/test-utils/react-hooks";
import { MockInferMutationFn } from "src/squads/lesson/test-utils/types";
import {
    getAutocompleteInputByTestId,
    getRadioInputByTestId,
    selectAutocompleteOptionByLabel,
} from "src/squads/lesson/test-utils/utils";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useAutocompleteReference from "src/squads/lesson/hooks/useAutocompleteReference";
import useShowSnackbar from "src/squads/lesson/hooks/useShowSnackbar";
import LessonUpsert from "src/squads/lesson/pages/LessonManagement/LessonUpsert";
import {
    LessonUpsertProps,
    LessonTeachingMethodType,
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

                    const payload = {} as NsLesson_Bob_LessonsService.UpsertLessons;

                    const mockMutate: MockInferMutationFn<NsLesson_Bob_LessonsService.UpsertLessons> =
                        (options) => ({
                            mutate: async () => {
                                if (!onSuccessRan) {
                                    await options.onSuccess?.(payload, { data: payload }, {});
                                    onSuccessRan = true;
                                }
                            },
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

    setupUseMutation();

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
    setupCustomHooks();

    render(
        <TestApp>
            <TestQueryWrapper>
                <LessonUpsert
                    isOpen={true}
                    mode="CREATE"
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

    const startTimeAutocompleteInput = getAutocompleteInputByTestId(
        "FormLessonUpsertV2__lessonStartTime"
    );
    const endTimeAutocompleteInput = getAutocompleteInputByTestId(
        "FormLessonUpsertV2__lessonEndTime"
    );

    const individualTeaching: LessonTeachingMethodType = "LESSON_TEACHING_METHOD_INDIVIDUAL";
    const individualTeachingRadio = getRadioInputByTestId(`Radio__${individualTeaching}`);

    const groupTeaching: LessonTeachingMethodType = "LESSON_TEACHING_METHOD_GROUP";
    const groupTeachingRadio = getRadioInputByTestId(`Radio__${groupTeaching}`);

    const locationAutocompleteInput = getAutocompleteInputByTestId(
        "AutocompleteLowestLevelLocationsHF__autocomplete"
    );
    const courseAutocompleteInput = getAutocompleteInputByTestId("FormLessonUpsertV2__course");
    const classAutocompleteInput = getAutocompleteInputByTestId("FormLessonUpsertV2__class");

    return {
        startTimeAutocompleteInput,
        endTimeAutocompleteInput,
        courseAutocompleteInput,
        classAutocompleteInput,
        locationAutocompleteInput,
        groupTeachingRadio,
        individualTeachingRadio,
    };
};

describe("<LessonUpsert />", () => {
    it("should disable course and class on individual teaching method", () => {
        const { courseAutocompleteInput, classAutocompleteInput } = renderComponent();

        expect(courseAutocompleteInput).toBeDisabled();
        expect(classAutocompleteInput).toBeDisabled();
    });

    it("should able to select course and class while selecting teaching group", () => {
        const { courseAutocompleteInput, classAutocompleteInput, groupTeachingRadio } =
            renderComponent();

        userEvent.click(groupTeachingRadio);

        expect(courseAutocompleteInput).not.toBeDisabled();
        expect(classAutocompleteInput).not.toBeDisabled();
    });

    it("should reset course and class", () => {
        const {
            locationAutocompleteInput,
            courseAutocompleteInput,
            classAutocompleteInput,
            groupTeachingRadio,
        } = renderComponent();

        userEvent.click(groupTeachingRadio);

        userEvent.click(locationAutocompleteInput);
        selectAutocompleteOptionByLabel("Center Name 01");
        expect(locationAutocompleteInput).toHaveValue("Center Name 01");

        userEvent.click(courseAutocompleteInput);
        selectAutocompleteOptionByLabel("Course Name 1");
        expect(courseAutocompleteInput).toHaveValue("Course Name 1");

        userEvent.click(classAutocompleteInput);
        selectAutocompleteOptionByLabel("Class Name 1");
        expect(classAutocompleteInput).toHaveValue("Class Name 1");

        userEvent.click(locationAutocompleteInput);
        selectAutocompleteOptionByLabel("Center Name 02");

        expect(courseAutocompleteInput).toHaveValue("");
        expect(classAutocompleteInput).toHaveValue("");
    });

    it("should disable teaching method and course and class while editing individual lesson", () => {
        const {
            individualTeachingRadio,
            groupTeachingRadio,
            courseAutocompleteInput,
            classAutocompleteInput,
        } = renderComponent({
            lesson: {
                ...mockQueriedLessonData,
                teaching_method: "LESSON_TEACHING_METHOD_INDIVIDUAL",
            },
            mode: "EDIT",
        });

        expect(individualTeachingRadio).toBeDisabled();
        expect(groupTeachingRadio).toBeDisabled();

        expect(courseAutocompleteInput).toBeDisabled();
        expect(courseAutocompleteInput).toHaveValue("");

        expect(classAutocompleteInput).toBeDisabled();
        expect(classAutocompleteInput).toHaveValue("");
    });

    it("should have defaults of course and class and disable teaching method", () => {
        const {
            individualTeachingRadio,
            groupTeachingRadio,
            courseAutocompleteInput,
            classAutocompleteInput,
        } = renderComponent({
            lesson: {
                ...mockQueriedLessonData,
                teaching_method: "LESSON_TEACHING_METHOD_GROUP",
            },
            mode: "EDIT",
        });

        expect(individualTeachingRadio).toBeDisabled();
        expect(groupTeachingRadio).toBeDisabled();

        expect(courseAutocompleteInput).not.toBeDisabled();
        expect(courseAutocompleteInput).toHaveValue("Course Name 1");

        expect(classAutocompleteInput).not.toBeDisabled();
        expect(classAutocompleteInput).toHaveValue("Class Name 1");
    });

    it("should change lesson start time and end time", async () => {
        const { startTimeAutocompleteInput, endTimeAutocompleteInput } = renderComponent({
            lesson: mockQueriedLessonData,
            mode: "EDIT",
        });

        expect(screen.getByText("60 minutes")).toBeInTheDocument();

        userEvent.click(startTimeAutocompleteInput);
        selectAutocompleteOptionByLabel("16:45");

        userEvent.click(endTimeAutocompleteInput);
        selectAutocompleteOptionByLabel("17:30");

        expect(screen.getByText("45 minutes")).toBeInTheDocument();
    });
});
