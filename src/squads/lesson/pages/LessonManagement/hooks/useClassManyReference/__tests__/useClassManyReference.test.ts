import { UseQueryBaseOptions } from "src/squads/lesson/hooks/data/data-types";
import {
    Lesson_ClassManyByLocationIdAndCourseIdAndNameQuery,
    Lesson_ClassManyByLocationIdAndCourseIdAndNameQueryVariables,
} from "src/squads/lesson/service/bob/bob-types";
import { inferQuery } from "src/squads/lesson/service/infer-query";
import { generateMockClassMany } from "src/squads/lesson/test-utils/class-course";
import { getLatestCallParams } from "src/squads/lesson/test-utils/mock-utils";

import TranslationProvider from "src/squads/lesson/providers/TranslationProvider";

import { renderHook } from "@testing-library/react-hooks";
import useShowSnackbar from "src/squads/lesson/hooks/useShowSnackbar";
import useClassManyReference from "src/squads/lesson/pages/LessonManagement/hooks/useClassManyReference";

jest.mock("src/squads/lesson/service/infer-query", () => ({
    __esModule: true,
    inferQuery: jest.fn(),
}));

jest.mock("src/squads/lesson/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe("useClassManyReference", () => {
    const mockClassManyReturn = generateMockClassMany();
    const mockInferQueryFunction = jest.fn();

    const runRenderHook = (isEnabled = true) => {
        return renderHook(
            () =>
                useClassManyReference({
                    className: "class name",
                    courseId: "course_id",
                    locationId: "location_id",
                    isEnabled,
                }),
            {
                wrapper: TranslationProvider,
            }
        );
    };

    it("should return class many data", () => {
        (inferQuery as jest.Mock).mockImplementation(
            (__: { entity: "class"; action: "classGetManyReference" }) =>
                mockInferQueryFunction.mockImplementation(() => {
                    return {
                        data: mockClassManyReturn,
                        isLoading: false,
                    };
                })
        );

        const {
            result: { current },
        } = runRenderHook();

        expect(current.classes).toEqual(mockClassManyReturn);

        const [queryVariable] = getLatestCallParams(mockInferQueryFunction);

        expect(queryVariable).toEqual({
            course_id: "course_id",
            location_id: "location_id",
            name: "class name",
        });
    });

    it("should return DEFAULT class many data", () => {
        (inferQuery as jest.Mock).mockImplementation(
            (__: { entity: "class"; action: "classGetManyReference" }) =>
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

        expect(current.classes).toEqual([]);
    });

    it("should throw error when query fail", () => {
        let ranOnError = false;
        const showSnackbar = jest.fn();

        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);

        (inferQuery as jest.Mock).mockImplementation(
            (__: { entity: "class"; action: "classGetManyReference" }) =>
                mockInferQueryFunction.mockImplementation(
                    (
                        _params: Lesson_ClassManyByLocationIdAndCourseIdAndNameQueryVariables,
                        options: UseQueryBaseOptions<
                            Lesson_ClassManyByLocationIdAndCourseIdAndNameQuery | undefined
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

        expect(current.classes).toEqual([]);
        expect(showSnackbar).toBeCalledWith(
            "We meet an unknown error. Please try again or contact with Staff.",
            "error"
        );
    });

    it("should disable query", () => {
        (inferQuery as jest.Mock).mockImplementation(
            (__: { entity: "class"; action: "classGetManyReference" }) =>
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
        expect(current.classes).toEqual([]);
    });
});
