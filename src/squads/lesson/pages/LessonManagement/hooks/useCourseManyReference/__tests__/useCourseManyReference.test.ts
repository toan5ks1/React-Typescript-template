import { UseQueryBaseOptions } from "src/squads/lesson/hooks/data/data-types";
import {
    Lesson_CourseManyReferenceByNameAndLocationIdQuery,
    Lesson_CourseManyReferenceByNameAndLocationIdQueryVariables,
} from "src/squads/lesson/service/bob/bob-types";
import { inferQuery } from "src/squads/lesson/service/infer-query";
import { generateMockCourseMany } from "src/squads/lesson/test-utils/class-course";
import { getLatestCallParams } from "src/squads/lesson/test-utils/mock-utils";

import TranslationProvider from "src/squads/lesson/providers/TranslationProvider";

import { renderHook } from "@testing-library/react-hooks";
import useShowSnackbar from "src/squads/lesson/hooks/useShowSnackbar";
import useCourseManyReference from "src/squads/lesson/pages/LessonManagement/hooks/useCourseManyReference";

jest.mock("src/squads/lesson/service/infer-query", () => ({
    __esModule: true,
    inferQuery: jest.fn(),
}));

jest.mock("src/squads/lesson/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe("useCourseManyReference", () => {
    const mockCourseManyReturn = generateMockCourseMany();
    const mockInferQueryFunction = jest.fn();

    const runRenderHook = (isEnabled = true) => {
        return renderHook(
            () =>
                useCourseManyReference({
                    courseName: "class name",
                    locationId: "location_id",
                    isEnabled,
                }),
            { wrapper: TranslationProvider }
        );
    };

    it("should return course many data", () => {
        (inferQuery as jest.Mock).mockImplementation(
            (__: {
                entity: "courseAccessPathsService";
                action: "courseAccessPathsGetManyReference";
            }) =>
                mockInferQueryFunction.mockImplementation(() => {
                    return {
                        data: mockCourseManyReturn,
                        isLoading: false,
                    };
                })
        );

        const {
            result: { current },
        } = runRenderHook();

        expect(current.courses).toEqual(mockCourseManyReturn);

        const [queryVariable] = getLatestCallParams(mockInferQueryFunction);

        expect(queryVariable).toEqual({
            location_id: "location_id",
            name: "class name",
            order_by: {
                course: { course_id: "asc", created_at: "desc", display_order: "asc", name: "asc" },
            },
        });
    });

    it("should return DEFAULT class many data", () => {
        (inferQuery as jest.Mock).mockImplementation(
            (__: {
                entity: "courseAccessPathsService";
                action: "courseAccessPathsGetManyReference";
            }) =>
                mockInferQueryFunction.mockImplementation(() => {
                    return {
                        data: undefined,
                        isLoading: false,
                    };
                })
        );

        const {
            result: { current },
        } = runRenderHook();

        expect(current.courses).toEqual([]);
    });

    it("should throw error when query fail", () => {
        let ranOnError = false;
        const showSnackbar = jest.fn();

        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);

        (inferQuery as jest.Mock).mockImplementation(
            (__: {
                entity: "courseAccessPathsService";
                action: "courseAccessPathsGetManyReference";
            }) =>
                mockInferQueryFunction.mockImplementation(
                    (
                        _params: Lesson_CourseManyReferenceByNameAndLocationIdQueryVariables,
                        options: UseQueryBaseOptions<
                            Lesson_CourseManyReferenceByNameAndLocationIdQuery | undefined
                        >
                    ) => {
                        if (!ranOnError) {
                            options.onError?.(new Error("FAKE ERROR"));
                            ranOnError = true;
                        }

                        return {
                            data: undefined,
                            isLoading: false,
                        };
                    }
                )
        );

        const {
            result: { current },
        } = runRenderHook();

        expect(current.courses).toEqual([]);
        expect(showSnackbar).toBeCalledWith(
            "We meet an unknown error. Please try again or contact with Staff.",
            "error"
        );
    });

    it("should disable query", () => {
        (inferQuery as jest.Mock).mockImplementation(
            (__: {
                entity: "courseAccessPathsService";
                action: "courseAccessPathsGetManyReference";
            }) =>
                mockInferQueryFunction.mockImplementation(() => {
                    return {
                        data: undefined,
                        isLoading: false,
                    };
                })
        );

        const {
            result: { current },
        } = runRenderHook(false);

        const [_, queryOptions] = getLatestCallParams(mockInferQueryFunction);

        expect(queryOptions["enabled"]).toEqual(false);
        expect(current.courses).toEqual([]);
    });
});
