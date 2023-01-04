import { coursesService } from "src/squads/payment/service/fatima/courses-service/courses-service";
import {
    Payment_GetManyCourseByCourseIdsQuery,
    Payment_GetManyCourseByCourseIdsQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { inferQuery } from "src/squads/payment/service/infer-query";
import { createMockCourseList } from "src/squads/payment/test-utils/mocks/package-course";
import { mockWarner } from "src/squads/payment/test-utils/warner";

import { UseQueryBaseOptions } from "@manabie-com/react-utils";
import { renderHook } from "@testing-library/react-hooks";
import useCourses from "src/squads/payment/domains/OrderManagement/hooks/useCourses";
import useShowSnackbar from "src/squads/payment/hooks/useShowSnackbar";

jest.mock("src/squads/payment/service/infer-query", () => {
    return {
        __esModule: true,
        inferQuery: jest.fn(),
    };
});

jest.mock("src/squads/payment/hooks/useShowSnackbar");

const showSnackbar = jest.fn();
const onSuccess = jest.fn();

const mockCourseList = createMockCourseList();

describe("useCourses", () => {
    const std = mockWarner();

    it("should return courses data on success", () => {
        let callbackRan = false;

        (inferQuery as jest.Mock).mockImplementation(
            (resource: { entity: "courses"; action: keyof typeof coursesService.query }) =>
                (
                    _params: Payment_GetManyCourseByCourseIdsQueryVariables,
                    options: UseQueryBaseOptions<
                        Payment_GetManyCourseByCourseIdsQuery["courses"] | undefined
                    >
                ) => {
                    if (!callbackRan) {
                        if (resource.action === "paymentGetManyCoursesByCourseIds") {
                            callbackRan = true;

                            options.onSuccess?.(mockCourseList);

                            return {
                                data: mockCourseList,
                                isFetched: true,
                            };
                        }
                    }

                    return { data: undefined, isFetched: true };
                }
        );

        const courseIds = mockCourseList.map((course) => course.course_id);

        const { result } = renderHook(() => useCourses({ courseIds, onSuccess }));
        expect(result.current.data).toEqual(mockCourseList);
    });

    it("should log warning and show snackbar when the query fails", () => {
        const queryError = new Error("Error when query in useCourses");
        (inferQuery as jest.Mock).mockImplementation(
            (resource: { entity: "courses"; action: keyof typeof coursesService.query }) =>
                (
                    _params: Payment_GetManyCourseByCourseIdsQueryVariables,
                    options: UseQueryBaseOptions<
                        Payment_GetManyCourseByCourseIdsQuery["courses"] | undefined
                    >
                ) => {
                    if (resource.action === "paymentGetManyCoursesByCourseIds") {
                        options.onError?.(queryError);
                        return { data: undefined, isFetched: true };
                    }
                }
        );

        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);

        const courseIds = mockCourseList.map((course) => course.course_id);

        const { result } = renderHook(() => useCourses({ courseIds, onSuccess }));

        expect(std.warn).toBeCalledWith("useCourses in Payment Order", queryError);

        expect(showSnackbar).toBeCalledWith(
            "ra.message.unableToLoadData course - paymentGetManyCoursesByCourseIds",
            "error"
        );

        expect(result.current.data).toBeUndefined();
    });
});
