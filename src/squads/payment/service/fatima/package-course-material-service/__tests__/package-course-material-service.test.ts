import { Payment_GetManyPackageCourseMaterialsByPackageIdQueryVariables } from "src/squads/payment/service/fatima/fatima-types";
import { packageCourseMaterialService } from "src/squads/payment/service/fatima/package-course-material-service/package-course-material-service";
import { InvalidParamError } from "src/squads/payment/service/service-types";
import { createMockPackageCourseMaterialList } from "src/squads/payment/test-utils/mocks/package-course";

import packageCourseMaterialFatimaQueries from "src/squads/payment/service/fatima/package-course-material-service/package-course-material-fatima.query";

jest.mock(
    "src/squads/payment/service/fatima/package-course-material-service/package-course-material-fatima.query",
    () => ({
        __esModule: true,
        default: {
            getManyPackageCourseMaterialByPackageId: jest.fn(),
        },
    })
);

const mockPackageCourseMaterialList = createMockPackageCourseMaterialList();

describe("Package course materials service", () => {
    it("should return package course materials when calling paymentGetManyPackageCourseMaterialByPackageId", async () => {
        (
            packageCourseMaterialFatimaQueries.getManyPackageCourseMaterialByPackageId as jest.Mock
        ).mockResolvedValue(mockPackageCourseMaterialList);

        const mockDate = "2022-12-28T02:35:17.677491+00:00";
        const queryVariable: Payment_GetManyPackageCourseMaterialsByPackageIdQueryVariables = {
            package_id: "package_id_1",
            current_date: mockDate,
        };

        const response =
            await packageCourseMaterialService.query.paymentGetManyPackageCourseMaterialByPackageId(
                queryVariable
            );

        expect(
            packageCourseMaterialFatimaQueries.getManyPackageCourseMaterialByPackageId
        ).toBeCalledWith(queryVariable);
        expect(response).toEqual(mockPackageCourseMaterialList);
    });

    it("should throw an error when calling paymentGetManyPackageCourseMaterialByPackageId with undefined package_id", async () => {
        (
            packageCourseMaterialFatimaQueries.getManyPackageCourseMaterialByPackageId as jest.Mock
        ).mockResolvedValue(mockPackageCourseMaterialList);

        const queryVariable: Partial<Payment_GetManyPackageCourseMaterialsByPackageIdQueryVariables> =
            {
                package_id: undefined,
            };

        await expect(async () => {
            await packageCourseMaterialService.query.paymentGetManyPackageCourseMaterialByPackageId(
                queryVariable
            );
        }).rejects.toThrowError(
            new InvalidParamError({
                action: "paymentGetManyPackageCourseMaterialByPackageId",
                errors: [{ field: "package_id", fieldValueIfNotSensitive: queryVariable }],
                serviceName: "fatimaGraphQL",
            })
        );

        expect(
            packageCourseMaterialFatimaQueries.getManyPackageCourseMaterialByPackageId
        ).not.toBeCalled();
    });
});
