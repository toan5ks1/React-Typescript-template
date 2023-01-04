import {
    Payment_GetManyPackageCourseByPackageIdQuery,
    Payment_GetManyPackageCourseByPackageIdQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { packageCourseService } from "src/squads/payment/service/fatima/package-course-service/package-course-service";
import { inferQuery } from "src/squads/payment/service/infer-query";
import { createMockPackageCourseList } from "src/squads/payment/test-utils/mocks/package-course";
import { mockWarner } from "src/squads/payment/test-utils/warner";
import { pick1stElement } from "src/squads/payment/utils/array";

import { UseQueryBaseOptions } from "@manabie-com/react-utils";
import { renderHook } from "@testing-library/react-hooks";
import usePackageCourses from "src/squads/payment/domains/OrderManagement/hooks/usePackageCourses";
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

const mockPackageCourseList = createMockPackageCourseList();

describe("usePackageCourses", () => {
    const std = mockWarner();

    it("should return package courses data on success", () => {
        let callbackRan = false;

        (inferQuery as jest.Mock).mockImplementation(
            (resource: {
                    entity: "packageCourse";
                    action: keyof typeof packageCourseService.query;
                }) =>
                (
                    _params: Payment_GetManyPackageCourseByPackageIdQueryVariables,
                    options: UseQueryBaseOptions<
                        Payment_GetManyPackageCourseByPackageIdQuery["package_course"] | undefined
                    >
                ) => {
                    if (!callbackRan) {
                        if (resource.action === "paymentGetManyPackageCourseByPackageId") {
                            callbackRan = true;

                            options.onSuccess?.(mockPackageCourseList);

                            return {
                                data: mockPackageCourseList,
                                isFetched: true,
                            };
                        }
                    }

                    return { data: undefined, isFetched: true };
                }
        );

        const packageId = pick1stElement(mockPackageCourseList)!.package_id;

        const { result } = renderHook(() => usePackageCourses({ packageId, onSuccess }));
        expect(result.current.data).toEqual(mockPackageCourseList);
    });

    it("should log warning and show snackbar when the query fails", () => {
        const queryError = new Error("Error when query in usePackageCourses");
        (inferQuery as jest.Mock).mockImplementation(
            (resource: {
                    entity: "packageCourse";
                    action: keyof typeof packageCourseService.query;
                }) =>
                (
                    _params: Payment_GetManyPackageCourseByPackageIdQueryVariables,
                    options: UseQueryBaseOptions<
                        Payment_GetManyPackageCourseByPackageIdQuery["package_course"] | undefined
                    >
                ) => {
                    if (resource.action === "paymentGetManyPackageCourseByPackageId") {
                        options.onError?.(queryError);
                        return { data: undefined, isFetched: true };
                    }
                }
        );

        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);

        const packageId = pick1stElement(mockPackageCourseList)!.package_id;

        const { result } = renderHook(() => usePackageCourses({ packageId, onSuccess }));

        expect(std.warn).toBeCalledWith("usePackageCourses in Payment Order", queryError);

        expect(showSnackbar).toBeCalledWith(
            "ra.message.unableToLoadData packageCourse - paymentGetManyPackageCourseByPackageId",
            "error"
        );

        expect(result.current.data).toBeUndefined();
    });
});
