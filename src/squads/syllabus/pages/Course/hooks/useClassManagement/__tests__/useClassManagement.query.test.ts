import {
    Lesson_ClassListByCourseIdV3Query,
    Lesson_ClassListByCourseIdV3QueryVariables,
} from "src/squads/syllabus/services/bob/bob-types";
import { inferQueryPagination } from "src/squads/syllabus/services/infer-query";
import {
    DataWithTotal,
    UseQueryPaginationOptions,
} from "src/squads/syllabus/services/service-creator";
import { generateMockClassList } from "src/squads/syllabus/test-utils/class";
import { getLatestCallParams } from "src/squads/syllabus/test-utils/mock-utils";
import { createFakePagination } from "src/squads/syllabus/test-utils/pagination";

import { renderHook } from "@testing-library/react-hooks";
import { ClassData } from "src/squads/syllabus/pages/Course/common/types";
import useClassManagement from "src/squads/syllabus/pages/Course/hooks/useClassManagement";

jest.mock("src/squads/syllabus/services/infer-query", () => ({
    __esModule: true,
    inferQueryPagination: jest.fn(),
}));

jest.mock("src/squads/syllabus/services/infer-mutation", () => ({
    __esModule: true,
    default: () => jest.fn().mockImplementation(() => ({ mutate: jest.fn(), isLoading: false })),
}));

jest.mock("src/squads/syllabus/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe("useClassManagement", () => {
    it("should return class list data", () => {
        const mockInferQueryPaginationFunction = jest.fn();
        const fakeReturnClassList = generateMockClassList();

        let ranSelector = false;

        (inferQueryPagination as jest.Mock).mockImplementation(
            (inferBase: { entity: "class"; action: "classGetListByCourseId" }) =>
                mockInferQueryPaginationFunction.mockImplementation(
                    (
                        _params: Lesson_ClassListByCourseIdV3QueryVariables,
                        options: UseQueryPaginationOptions<
                            DataWithTotal<Lesson_ClassListByCourseIdV3Query["class"] | undefined>,
                            DataWithTotal<ClassData[]>
                        >
                    ) => {
                        const { entity, action } = inferBase;

                        switch (true) {
                            case entity === "class" && action === "classGetListByCourseId": {
                                if (!ranSelector) {
                                    options.selector?.({
                                        data: fakeReturnClassList,
                                        total: fakeReturnClassList.length,
                                    });

                                    ranSelector = true;
                                }

                                return {
                                    data: {
                                        data: fakeReturnClassList,
                                        total: fakeReturnClassList.length,
                                    },
                                    result: {
                                        isLoading: false,
                                        refetch: jest.fn(),
                                        isFetching: false,
                                    },
                                    pagination: createFakePagination(),
                                };
                            }
                        }
                    }
                )
        );

        const {
            result: { current },
        } = renderHook(() => useClassManagement({ courseId: "course_id" }));

        expect(current.classesList).toEqual(fakeReturnClassList);

        const [queryVariable] = getLatestCallParams(mockInferQueryPaginationFunction);

        expect(queryVariable).toEqual({ course_id: "course_id" });
    });

    it("should return DEFAULT class list data", () => {
        let ranSelector = false;

        (inferQueryPagination as jest.Mock).mockImplementation(
            (inferBase: { entity: "class"; action: "classGetListByCourseId" }) =>
                (
                    _params: Lesson_ClassListByCourseIdV3QueryVariables,
                    options: UseQueryPaginationOptions<
                        DataWithTotal<Lesson_ClassListByCourseIdV3Query["class"] | undefined>,
                        DataWithTotal<ClassData[]>
                    >
                ) => {
                    const { entity, action } = inferBase;

                    switch (true) {
                        case entity === "class" && action === "classGetListByCourseId": {
                            if (!ranSelector) {
                                options.selector?.({ data: undefined, total: 0 });

                                ranSelector = true;
                            }

                            return {
                                result: { isLoading: false, refetch: jest.fn(), isFetching: false },
                                data: undefined,
                                pagination: createFakePagination(),
                            };
                        }
                    }
                }
        );

        const {
            result: { current },
        } = renderHook(() => useClassManagement({ courseId: "course_id" }));

        expect(current.classesList).toEqual([]);
    });
});
