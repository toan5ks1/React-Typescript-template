import { NsLesson_Bob_LessonsService } from "src/squads/lesson/service/bob/lessons-service/types";
import { NsLesson_Bob_UploadService } from "src/squads/lesson/service/bob/upload-service/types";
import inferMutation from "src/squads/lesson/service/infer-mutation";
import { mockLessonUpsertData } from "src/squads/lesson/test-utils/lesson-management";
import { MockInferMutationFn } from "src/squads/lesson/test-utils/types";

import { LessonStatus } from "manabuf/bob/v1/lessons_pb";

import { renderHook } from "@testing-library/react-hooks";
import useUpsertLessonOfLessonManagement, {
    UpsertLessonMiddlewareFunction,
    UseUpsertLessonOfLessonManagementProps,
} from "src/squads/lesson/pages/LessonManagement/hooks/useUpsertLessonOfLessonManagement/useUpsertLessonOfLessonManagement";

jest.mock("src/squads/lesson/service/infer-mutation", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

jest.mock("src/squads/lesson/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: () => jest.fn(),
}));

jest.mock("src/squads/lesson/hooks/useConvertMedia", () => {
    return {
        __esModule: true,
        default: () => ({
            convertMedia: jest.fn(),
        }),
    };
});

const mockInferMutation = (params?: {
    lessonMockFn?: MockInferMutationFn<NsLesson_Bob_LessonsService.UpsertLessons>;
    uploadMockFn?: MockInferMutationFn<NsLesson_Bob_UploadService.FilterUploadFiles[]>;
}) => {
    const { lessonMockFn, uploadMockFn } = params || {};

    (inferMutation as jest.Mock).mockImplementation(
        ({
            entity,
            action,
        }: {
            entity: "lessons" | "upload";
            action:
                | "lessonsUpdate"
                | "lessonsCreate"
                | "uploadFilterAndUploadFiles"
                | "lessonsSaveDraft"
                | "lessonsUpdateDraft";
        }) => {
            switch (true) {
                case entity === "lessons" && action === "lessonsCreate":
                case entity === "lessons" && action === "lessonsSaveDraft":
                case entity === "lessons" && action === "lessonsUpdate":
                case entity === "lessons" && action === "lessonsUpdateDraft": {
                    if (lessonMockFn) return lessonMockFn;

                    return () => ({ mutate: jest.fn() });
                }

                case entity === "upload" && action === "uploadFilterAndUploadFiles": {
                    if (uploadMockFn) return uploadMockFn;

                    return () => {
                        return {
                            mutateAsync: jest.fn().mockImplementation(() => {
                                return { data: [] };
                            }),
                        };
                    };
                }
            }
        }
    );
};

describe("useUpsertLessonOfLessonManagement without middleWares", () => {
    const hookProps: UseUpsertLessonOfLessonManagementProps = {
        lessonId: "LessonId",
        onError: jest.fn(),
        onSuccess: jest.fn(),
        isEnabledLessonGroup: false,
    };

    it("should call onSuccess", async () => {
        let onSuccessRan = false;

        mockInferMutation({
            lessonMockFn: (options) => {
                return {
                    mutate: jest.fn(async () => {
                        if (!onSuccessRan) {
                            await options.onSuccess?.(
                                {},
                                { data: {} as NsLesson_Bob_LessonsService.UpsertLessons },
                                {}
                            );
                            onSuccessRan = true;
                        }
                    }),
                };
            },
        });

        const {
            result: {
                current: { upsertLessonWithMiddleWares },
            },
        } = renderHook(() => useUpsertLessonOfLessonManagement(hookProps));

        await upsertLessonWithMiddleWares({
            data: mockLessonUpsertData,
            middleWares: [],
            schedulingStatus: LessonStatus.LESSON_SCHEDULING_STATUS_PUBLISHED,
        });

        expect(hookProps.onSuccess).toBeCalled();
    });

    it("should call onError", async () => {
        let onErrorRan = false;

        mockInferMutation({
            lessonMockFn: (options) => {
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

        const {
            result: {
                current: { upsertLessonWithMiddleWares },
            },
        } = renderHook(() => useUpsertLessonOfLessonManagement(hookProps));

        await upsertLessonWithMiddleWares({
            data: mockLessonUpsertData,
            middleWares: [],
            schedulingStatus: LessonStatus.LESSON_SCHEDULING_STATUS_DRAFT,
        });

        expect(hookProps.onError).toBeCalled();
    });
});

describe("useUpsertLessonOfLessonManagement with middleWares", () => {
    const hookProps: UseUpsertLessonOfLessonManagementProps = {
        lessonId: "LessonId",
        onError: jest.fn(),
        onSuccess: jest.fn(),
        isEnabledLessonGroup: false,
    };

    const falsyFunction = jest.fn();

    it("should fail because can not pass the middleware", async () => {
        let onSuccessRan = false;

        mockInferMutation({
            lessonMockFn: (options) => {
                return {
                    mutate: jest.fn(async () => {
                        if (!onSuccessRan) {
                            await options.onSuccess?.(
                                {},
                                { data: {} as NsLesson_Bob_LessonsService.UpsertLessons },
                                {}
                            );
                            onSuccessRan = true;
                        }
                    }),
                };
            },
        });

        const {
            result: {
                current: { upsertLessonWithMiddleWares },
            },
        } = renderHook(() => useUpsertLessonOfLessonManagement(hookProps));

        const fakeMiddleware: UpsertLessonMiddlewareFunction = {
            middleWareFunction: () => false,
            onFalse: falsyFunction,
        };

        await upsertLessonWithMiddleWares({
            data: mockLessonUpsertData,
            middleWares: [fakeMiddleware],
            schedulingStatus: LessonStatus.LESSON_SCHEDULING_STATUS_PUBLISHED,
        });

        expect(hookProps.onSuccess).not.toBeCalled();
        expect(falsyFunction).toBeCalled();
    });

    it("should pass the middleware", async () => {
        let onSuccessRan = false;

        mockInferMutation({
            lessonMockFn: (options) => {
                return {
                    mutate: jest.fn(async () => {
                        if (!onSuccessRan) {
                            await options.onSuccess?.(
                                {},
                                { data: {} as NsLesson_Bob_LessonsService.UpsertLessons },
                                {}
                            );
                            onSuccessRan = true;
                        }
                    }),
                };
            },
        });

        const {
            result: {
                current: { upsertLessonWithMiddleWares },
            },
        } = renderHook(() => useUpsertLessonOfLessonManagement(hookProps));

        const fakeMiddleware: UpsertLessonMiddlewareFunction = {
            middleWareFunction: () => true,
            onFalse: falsyFunction,
        };

        await upsertLessonWithMiddleWares({
            data: mockLessonUpsertData,
            middleWares: [fakeMiddleware],
            schedulingStatus: LessonStatus.LESSON_SCHEDULING_STATUS_PUBLISHED,
        });

        expect(falsyFunction).not.toBeCalled();
        expect(hookProps.onSuccess).toBeCalled();
    });
});
