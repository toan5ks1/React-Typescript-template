import { Entities } from "src/common/constants/enum";
import { NsLesson_Bob_LessonsService } from "src/squads/lesson/service/bob/lessons-service/types";
import inferMutation from "src/squads/lesson/service/infer-mutation";
import { UseMutationOptions } from "src/squads/lesson/service/service-creator";
import { TestApp } from "src/squads/lesson/test-utils";
import {
    generateALessonMember,
    mockCenters,
    mockQueriedLessonData,
    mockStudentInfoList,
    mockTeachers,
} from "src/squads/lesson/test-utils/lesson-management";
import { TestQueryWrapper } from "src/squads/lesson/test-utils/react-hooks";
import { MockInferMutationFn } from "src/squads/lesson/test-utils/types";

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useAutocompleteReference from "src/squads/lesson/hooks/useAutocompleteReference";
import useShowSnackbar from "src/squads/lesson/hooks/useShowSnackbar";
import LessonUpsert from "src/squads/lesson/pages/LessonManagement/LessonUpsert";
import { LessonUpsertProps } from "src/squads/lesson/pages/LessonManagement/common/types";

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

const setupUseMutation = (props?: {
    overrideMutateLessonMock?: MockInferMutationFn<NsLesson_Bob_LessonsService.UpsertLessons>;
}) => {
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

                    return (
                        props: UseMutationOptions<
                            { data: NsLesson_Bob_LessonsService.UpsertLessons },
                            unknown,
                            Error
                        >
                    ) => ({
                        mutate: jest.fn(async () => {
                            if (!onSuccessRan) {
                                await props.onSuccess?.(
                                    {},
                                    {
                                        data: {} as NsLesson_Bob_LessonsService.UpsertLessons,
                                    },
                                    {}
                                );
                                onSuccessRan = true;
                            }
                        }),
                    });
                }

                case entity === "upload" && action === "uploadFilterAndUploadFiles": {
                    return () => {
                        return {
                            mutateAsync: jest.fn().mockImplementation(() => {
                                return { data: [] };
                            }),
                        };
                    };
                }

                case entity === "classes" && action === "classesConvertMedia": {
                    return () => {
                        return {
                            mutate: jest.fn(),
                        };
                    };
                }
            }
        }
    );
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

    (useShowSnackbar as jest.Mock).mockImplementation(() => mockShowSnackbar);

    return {
        mockTeachers,
        mockCenters,
        mockLearners,
        mockShowSnackbar,
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
                    centerName="Center Name 01"
                    isEnabledLessonGroup={false}
                    mode="EDIT"
                    {...props}
                />
            </TestQueryWrapper>
        </TestApp>
    );

    return { wrapper, ...mocks };
};

// TODO: Remove after release epic https://manabie.atlassian.net/browse/LT-13374
describe("<LessonUpsert /> update lesson", () => {
    const submitLesson = () => {
        const buttonSubmit = screen.getByTestId("LessonUpsertFooter__buttonPublish");
        userEvent.click(buttonSubmit);
    };

    it("should NOT update lesson when submit invalid data", async () => {
        const lessonMember1st = generateALessonMember({ studentId: 1, courseId: 1 });
        const lessonMember2nd = generateALessonMember({ studentId: 1, courseId: 2 }); // Same student but different course

        const invalidSubmitLessonData: LessonUpsertProps["lesson"] = {
            ...mockQueriedLessonData,
            lesson_members: [lessonMember1st, lessonMember2nd],
            center_id: "Center ID 01",
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
        const { mockShowSnackbar } = renderComponent({ lesson: invalidSubmitLessonData });

        submitLesson();

        await waitFor(() =>
            expect(mockShowSnackbar).toBeCalledWith(
                "Please add only one student course for one student to the lesson",
                "error"
            )
        );

        const invalidCenterMessage = screen.getByText(
            "This lesson cannot be saved. Please add student from the same center as lesson."
        );

        expect(invalidCenterMessage).toBeVisible();

        const closeButton = screen.getByLabelText("Close", { selector: "button" });
        userEvent.click(closeButton);

        expect(invalidCenterMessage).not.toBeVisible();
    });

    it("should NOT update lesson when submit valid data but get mutation error", async () => {
        const onUpsertSuccessfully = jest.fn();

        let onErrorRan = false;

        setupUseMutation({
            overrideMutateLessonMock: (options) => {
                return {
                    mutate: jest.fn(async () => {
                        if (!onErrorRan) {
                            await options.onError?.(
                                Error("OnERROR"),
                                { data: {} as NsLesson_Bob_LessonsService.UpsertLessons },
                                {}
                            );
                            onErrorRan = true;
                        }
                    }),
                };
            },
        });

        const { mockShowSnackbar } = renderComponent({
            lesson: mockQueriedLessonData,
            onUpsertSuccessfully,
        });

        submitLesson();

        await waitFor(() =>
            expect(mockShowSnackbar).toBeCalledWith(
                "We meet an unknown error. Please try again or contact with Staff.",
                "error"
            )
        );

        expect(onUpsertSuccessfully).not.toBeCalled();
    });

    it("should update lesson when submit valid data", async () => {
        const onUpsertSuccessfully = jest.fn();

        setupUseMutation();
        const { mockShowSnackbar } = renderComponent({
            lesson: mockQueriedLessonData,
            onUpsertSuccessfully,
        });

        submitLesson();

        await waitFor(() =>
            expect(mockShowSnackbar).toBeCalledWith("You have edited the lesson successfully!")
        );

        expect(onUpsertSuccessfully).toBeCalled();
    });

    it("should still update lesson when students have no locations", async () => {
        const onUpsertSuccessfully = jest.fn();

        setupUseMutation();
        const { mockShowSnackbar } = renderComponent({
            lesson: { ...mockQueriedLessonData, studentSubscriptions: [] },
            onUpsertSuccessfully,
        });

        submitLesson();

        await waitFor(() =>
            expect(mockShowSnackbar).toBeCalledWith("You have edited the lesson successfully!")
        );

        expect(onUpsertSuccessfully).toBeCalled();
    });
});
