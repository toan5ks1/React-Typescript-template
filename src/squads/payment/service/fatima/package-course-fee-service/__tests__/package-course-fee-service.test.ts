import { Payment_GetManyPackageCourseFeesByPackageIdQueryVariables } from "src/squads/payment/service/fatima/fatima-types";
import { packageCourseFeeService } from "src/squads/payment/service/fatima/package-course-fee-service/package-course-fee-service";
import { InvalidParamError } from "src/squads/payment/service/service-types";
import { createMockPackageCourseFeeList } from "src/squads/payment/test-utils/mocks/package-course";

import packageCourseFeeFatimaQueries from "src/squads/payment/service/fatima/package-course-fee-service/package-course-fee-fatima.query";

jest.mock(
    "src/squads/payment/service/fatima/package-course-fee-service/package-course-fee-fatima.query",
    () => ({
        __esModule: true,
        default: {
            getManyPackageCourseFeesByPackageId: jest.fn(),
        },
    })
);

const mockPackageCourseFeeList = createMockPackageCourseFeeList();

describe("Package course fee service", () => {
    it("should return package course fees when calling paymentGetManyPackageCourseFeesByPackageId", async () => {
        (
            packageCourseFeeFatimaQueries.getManyPackageCourseFeesByPackageId as jest.Mock
        ).mockResolvedValue(mockPackageCourseFeeList);

        const mockDate = "2022-12-28T02:35:17.677491+00:00";
        const queryVariable: Payment_GetManyPackageCourseFeesByPackageIdQueryVariables = {
            package_id: "package_id_1",
            current_date: mockDate,
        };

        const response =
            await packageCourseFeeService.query.paymentGetManyPackageCourseFeesByPackageId(
                queryVariable
            );

        expect(packageCourseFeeFatimaQueries.getManyPackageCourseFeesByPackageId).toBeCalledWith(
            queryVariable
        );
        expect(response).toEqual(mockPackageCourseFeeList);
    });

    it("should throw an error when calling paymentGetManyPackageCourseFeesByPackageId with undefined package_id", async () => {
        (
            packageCourseFeeFatimaQueries.getManyPackageCourseFeesByPackageId as jest.Mock
        ).mockResolvedValue(mockPackageCourseFeeList);

        const queryVariable: Partial<Payment_GetManyPackageCourseFeesByPackageIdQueryVariables> = {
            package_id: undefined,
        };

        await expect(async () => {
            await packageCourseFeeService.query.paymentGetManyPackageCourseFeesByPackageId(
                queryVariable
            );
        }).rejects.toThrowError(
            new InvalidParamError({
                action: "paymentGetManyPackageCourseFeesByPackageId",
                errors: [{ field: "package_id", fieldValueIfNotSensitive: queryVariable }],
                serviceName: "fatimaGraphQL",
            })
        );

        expect(packageCourseFeeFatimaQueries.getManyPackageCourseFeesByPackageId).not.toBeCalled();
    });
});
