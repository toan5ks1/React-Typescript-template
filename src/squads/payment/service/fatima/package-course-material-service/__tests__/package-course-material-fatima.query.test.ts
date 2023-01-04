import {
    doQuery,
    HasuraAndDefaultResponse,
} from "src/squads/payment/internals/hasura-client/execute-query";
import {
    Payment_GetManyPackageCourseMaterialsByPackageIdQuery,
    Payment_GetManyPackageCourseMaterialsByPackageIdQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { createMockPackageCourseMaterialList } from "src/squads/payment/test-utils/mocks/package-course";

import packageCourseMaterialFatimaQueries from "src/squads/payment/service/fatima/package-course-material-service/package-course-material-fatima.query";

jest.mock("src/squads/payment/internals/hasura-client/execute-query", () => ({
    __esModule: true,
    doQuery: jest.fn(),
}));

const mockPackageCourseMaterialList = createMockPackageCourseMaterialList();

const mockDoQueryReturnValue: HasuraAndDefaultResponse<Payment_GetManyPackageCourseMaterialsByPackageIdQuery> =
    {
        data: {
            package_course_material: mockPackageCourseMaterialList,
        },
    };

describe("Package course material query", () => {
    it("should return package course material when calling getManyPackageCourseMaterialByPackageId", async () => {
        const mockDate = "2022-12-28T02:35:17.677491+00:00";
        (doQuery as jest.Mock).mockReturnValue(mockDoQueryReturnValue);

        const variables: Payment_GetManyPackageCourseMaterialsByPackageIdQueryVariables = {
            package_id: "package_id_1",
            current_date: mockDate,
        };

        const result =
            await packageCourseMaterialFatimaQueries.getManyPackageCourseMaterialByPackageId(
                variables
            );

        expect(result).toEqual(mockPackageCourseMaterialList);
    });
});
