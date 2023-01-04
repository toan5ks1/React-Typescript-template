import {
    doQuery,
    HasuraAndDefaultResponse,
} from "src/squads/payment/internals/hasura-client/execute-query";
import {
    Payment_GetManyPackageCourseByPackageIdQuery,
    Payment_GetManyPackageCourseByPackageIdQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { createMockPackageCourseList } from "src/squads/payment/test-utils/mocks/package-course";

import packageCourseFatimaQueries from "src/squads/payment/service/fatima/package-course-service/package-course-fatima.query";

jest.mock("src/squads/payment/internals/hasura-client/execute-query", () => ({
    __esModule: true,
    doQuery: jest.fn(),
}));

const mockPackageCourseList = createMockPackageCourseList();

const mockDoQueryReturnValue: HasuraAndDefaultResponse<Payment_GetManyPackageCourseByPackageIdQuery> =
    {
        data: {
            package_course: mockPackageCourseList,
        },
    };

describe("Package course query", () => {
    it("should return package courses when calling getManyPackageCourseByPackageId", async () => {
        (doQuery as jest.Mock).mockReturnValue(mockDoQueryReturnValue);

        const variables: Payment_GetManyPackageCourseByPackageIdQueryVariables = {
            package_id: "package_id_1",
        };

        const result = await packageCourseFatimaQueries.getManyPackageCourseByPackageId(variables);

        expect(result).toEqual(mockPackageCourseList);
    });
});
