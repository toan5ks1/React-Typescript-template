import { UseQueryBaseOptions } from "src/squads/lesson/hooks/data/data-types";
import {
    Lesson_ClassManyByNullableCourseIdsAndNameQuery,
    Lesson_ClassManyByNullableCourseIdsAndNameQueryVariables,
} from "src/squads/lesson/service/bob/bob-types";
import { inferQuery } from "src/squads/lesson/service/infer-query";
import { generateMockClassMany } from "src/squads/lesson/test-utils/class-course";
import { getLatestCallParams } from "src/squads/lesson/test-utils/mock-utils";

import { renderHook } from "@testing-library/react-hooks";
import useShowSnackbar from "src/squads/lesson/hooks/useShowSnackbar";
import useClassManyWithNullableCourse, {
    UseClassManyWithNullableCourseProps,
} from "src/squads/lesson/pages/LessonManagement/hooks/useClassManyWithNullableCourse";

jest.mock("src/squads/lesson/service/infer-query", () => ({
    __esModule: true,
    inferQuery: jest.fn(),
}));

jest.mock("src/squads/lesson/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe("useClassManyWithNullableCourse", () => {
    const mockClassManyReturn = generateMockClassMany();
    const mockInferQueryFunction = jest.fn();

    const props: UseClassManyWithNullableCourseProps = {
        className: "Class Name",
        courseIds: ["Course_Id"],
    };

    it("should return class many data", () => {
        (inferQuery as jest.Mock).mockImplementation(
            (__: { entity: "class"; action: "classGetManyByNullableCourseAndName" }) =>
                mockInferQueryFunction.mockImplementation(() => {
                    return { data: mockClassManyReturn, isLoading: false };
                })
        );

        const {
            result: { current },
        } = renderHook(() => useClassManyWithNullableCourse(props));

        expect(current.classes).toEqual(mockClassManyReturn);

        const [queryVariable] = getLatestCallParams(mockInferQueryFunction);
        expect(queryVariable).toEqual({
            name: props.className,
            course_ids: props.courseIds,
        });
    });

    it("should throw error when query fail", () => {
        let ranOnError = false;
        const showSnackbar = jest.fn();

        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);

        (inferQuery as jest.Mock).mockImplementation(
            (__: { entity: "class"; action: "classGetManyByNullableCourseAndName" }) =>
                mockInferQueryFunction.mockImplementation(
                    (
                        _params: Lesson_ClassManyByNullableCourseIdsAndNameQueryVariables,
                        options: UseQueryBaseOptions<
                            Lesson_ClassManyByNullableCourseIdsAndNameQuery | undefined
                        >
                    ) => {
                        if (!ranOnError) {
                            options.onError?.(new Error("FAKE ERROR"));
                            ranOnError = true;
                        }

                        return { data: undefined, isLoading: false };
                    }
                )
        );

        const {
            result: { current },
        } = renderHook(() => useClassManyWithNullableCourse(props));

        expect(current.classes).toEqual([]);
        expect(showSnackbar).toBeCalledWith("ra.manabie-error.unknown", "error");
    });
});
