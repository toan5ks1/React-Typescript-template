import { doQuery } from "src/squads/payment/internals/hasura-client/execute-query";
import { Payment_GetManyBillingRatiosByBillingSchedulePeriodIdQueryVariables } from "src/squads/payment/service/fatima/fatima-types";
import { getMockBillingRatios } from "src/squads/payment/test-utils/mocks/billing-ratio";

import billingRatioQueriesFatima from "src/squads/payment/service/fatima/billing-ratio-service/billing-ratio-fatima.query";

jest.mock("src/squads/payment/internals/hasura-client/execute-query", () => ({
    __esModule: true,
    doQuery: jest.fn(),
}));

const mockBillingRatios = getMockBillingRatios();
const mockDoQueryGetManyBillingRatiosByBillingSchedulePeriodIdReturnValue = {
    data: {
        billing_ratio: mockBillingRatios,
    },
};

describe("Billing ratio query", () => {
    it("should return billing ratios when calling getManyBillingRatiosByBillingSchedulePeriodId", async () => {
        (doQuery as jest.Mock).mockReturnValue(
            mockDoQueryGetManyBillingRatiosByBillingSchedulePeriodIdReturnValue
        );

        const variables: Payment_GetManyBillingRatiosByBillingSchedulePeriodIdQueryVariables = {
            billingSchedulePeriodId: "billing_schedule_period_id_1",
        };

        const result =
            await billingRatioQueriesFatima.getManyBillingRatiosByBillingSchedulePeriodId(
                variables
            );
        expect(result).toEqual(mockBillingRatios);
    });
});
