import { Payment_GetManyPackageCourseByPackageIdQueryVariables } from "src/squads/payment/service/fatima/fatima-types";
import { packageCourseService } from "src/squads/payment/service/fatima/package-course-service/package-course-service";
import { InvalidParamError } from "src/squads/payment/service/service-types";
import { createMockPackageCourseList } from "src/squads/payment/test-utils/mocks/package-course";

import packageCourseQueriesFatima from "src/squads/payment/service/fatima/package-course-service/package-course-fatima.query";

jest.mock(
    "src/squads/payment/service/fatima/package-course-service/package-course-fatima.query",
    () => ({
        __esModule: true,
        default: {
            getManyPackageCourseByPackageId: jest.fn(),
        },
    })
);

const mockPackageCourseList = createMockPackageCourseList();

describe("Package course service", () => {
    it("should return package courses when calling paymentGetManyPackageCourseByPackageId", async () => {
        (packageCourseQueriesFatima.getManyPackageCourseByPackageId as jest.Mock).mockResolvedValue(
            mockPackageCourseList
        );

        const queryVariable: Payment_GetManyPackageCourseByPackageIdQueryVariables = {
            package_id: "package_id_1",
        };

        const response = await packageCourseService.query.paymentGetManyPackageCourseByPackageId(
            queryVariable
        );

        expect(packageCourseQueriesFatima.getManyPackageCourseByPackageId).toBeCalledWith(
            queryVariable
        );
        expect(response).toEqual(mockPackageCourseList);
    });

    it("should throw an error when calling paymentGetManyPackageCourseByPackageId with undefined package_id", async () => {
        (packageCourseQueriesFatima.getManyPackageCourseByPackageId as jest.Mock).mockResolvedValue(
            mockPackageCourseList
        );

        const queryVariable: Partial<Payment_GetManyPackageCourseByPackageIdQueryVariables> = {
            package_id: undefined,
        };

        await expect(async () => {
            await packageCourseService.query.paymentGetManyPackageCourseByPackageId(queryVariable);
        }).rejects.toThrowError(
            new InvalidParamError({
                action: "paymentGetManyPackageCourseByPackageId",
                errors: [{ field: "package_id", fieldValueIfNotSensitive: queryVariable }],
                serviceName: "fatimaGraphQL",
            })
        );

        expect(packageCourseQueriesFatima.getManyPackageCourseByPackageId).not.toBeCalled();
    });
});
