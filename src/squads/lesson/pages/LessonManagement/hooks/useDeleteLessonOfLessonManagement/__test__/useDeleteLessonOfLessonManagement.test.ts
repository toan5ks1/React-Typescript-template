import { NsLesson_Bob_LessonsService } from "src/squads/lesson/service/bob/lessons-service/types";
import inferMutation from "src/squads/lesson/service/infer-mutation";
import { UseMutationOptions } from "src/squads/lesson/service/service-creator";
import { getLatestCallParams } from "src/squads/lesson/test-utils/mock-utils";
import { mockWarner } from "src/squads/lesson/test-utils/warner";

import { renderHook } from "@testing-library/react-hooks";
import useShowSnackbar from "src/squads/lesson/hooks/useShowSnackbar";
import useDeleteLessonOfLessonManagement, {
    DeleteLessonProps,
} from "src/squads/lesson/pages/LessonManagement/hooks/useDeleteLessonOfLessonManagement";

jest.mock("src/squads/lesson/hooks/useShowSnackbar", () => {
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

describe("useDeleteLessonOfLessonManagement", () => {
    const std = mockWarner();

    it("should delete lesson", async () => {
        let ranOnSuccess = false;
        const mockMutate = jest.fn();

        (inferMutation as jest.Mock).mockImplementation(() => {
            return (
                _options?: UseMutationOptions<NsLesson_Bob_LessonsService.DeleteLessonRequest, {}>
            ) => {
                return {
                    mutate: mockMutate.mockImplementation(
                        async (
                            _variable: NsLesson_Bob_LessonsService.DeleteLessonRequest,
                            mutateOptions?: { onSuccess: () => void }
                        ) => {
                            if (!ranOnSuccess) {
                                mutateOptions?.onSuccess();
                                ranOnSuccess = true;
                            }
                        }
                    ),
                    isLoading: false,
                };
            };
        });

        const { result } = renderHook(() => useDeleteLessonOfLessonManagement());

        const fakeProps: DeleteLessonProps = {
            lessonId: "Test Lesson ID",
            onSuccess: jest.fn(),
        };

        await result.current.deleteLesson(fakeProps);

        const [mutateVariable] = getLatestCallParams(mockMutate);

        expect(mutateVariable).toEqual<NsLesson_Bob_LessonsService.DeleteLessonRequest>({
            lessonId: fakeProps.lessonId,
        });
        expect(fakeProps.onSuccess).toBeCalled();
    });

    it("should NOT delete lesson", async () => {
        let ranOnError = false;
        const showSnackbar = jest.fn();
        const mockMutate = jest.fn();
        const fakeError = Error("delete lesson failed");

        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);
        (inferMutation as jest.Mock).mockImplementation(() => {
            return (
                _options?: UseMutationOptions<NsLesson_Bob_LessonsService.DeleteLessonRequest, {}>
            ) => {
                return {
                    mutate: mockMutate.mockImplementation(
                        (
                            _variable: NsLesson_Bob_LessonsService.DeleteLessonRequest,
                            mutateOptions?: { onError: (error: Error) => void }
                        ) => {
                            if (!ranOnError) {
                                mutateOptions?.onError(fakeError);
                                ranOnError = true;
                            }
                        }
                    ),
                    isLoading: false,
                };
            };
        });

        const { result } = renderHook(() => useDeleteLessonOfLessonManagement());

        const onErrorMockFunc = jest.fn();

        const fakeProps: DeleteLessonProps = {
            lessonId: "Test Lesson ID",
            onError: onErrorMockFunc,
        };

        await result.current.deleteLesson(fakeProps);

        const [mutateVariable] = getLatestCallParams(mockMutate);

        expect(mutateVariable).toEqual<NsLesson_Bob_LessonsService.DeleteLessonRequest>({
            lessonId: fakeProps.lessonId,
        });
        expect(showSnackbar).toBeCalledWith("ra.manabie-error.unknown", "error");
        expect(std.warn).toBeCalledWith(
            `Error DeleteLessonOfLessonManagement: ${fakeError.message}`
        );
        expect(fakeProps.onError).toBeCalled();
    });
});
