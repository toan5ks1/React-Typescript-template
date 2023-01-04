import {
    doQuery,
    HasuraAndDefaultResponse,
} from "src/squads/payment/internals/hasura-client/execute-query";
import {
    Payment_GetManyPackageCourseFeesByPackageIdQuery,
    Payment_GetManyPackageCourseFeesByPackageIdQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { createMockPackageCourseFeeList } from "src/squads/payment/test-utils/mocks/package-course";

import packageCourseFeeFatimaQueries from "src/squads/payment/service/fatima/package-course-fee-service/package-course-fee-fatima.query";

jest.mock("src/squads/payment/internals/hasura-client/execute-query", () => ({
    __esModule: true,
    doQuery: jest.fn(),
}));

const mockPackageCourseFeeList = createMockPackageCourseFeeList();

const mockDoQueryReturnValue: HasuraAndDefaultResponse<Payment_GetManyPackageCourseFeesByPackageIdQuery> =
    {
        data: {
            package_course_fee: mockPackageCourseFeeList,
        },
    };

describe("Package course fee query", () => {
    it("should return package course fees when calling getManyPackageCourseFeeByPackageId", async () => {
        const mockDate = "2022-12-28T02:35:17.677491+00:00";
        (doQuery as jest.Mock).mockReturnValue(mockDoQueryReturnValue);

        const variables: Payment_GetManyPackageCourseFeesByPackageIdQueryVariables = {
            package_id: "package_id_1",
            current_date: mockDate,
        };

        const result = await packageCourseFeeFatimaQueries.getManyPackageCourseFeesByPackageId(
            variables
        );

        expect(result).toEqual(mockPackageCourseFeeList);
    });
});
