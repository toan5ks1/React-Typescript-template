import {
    doQuery,
    HasuraAndDefaultResponse,
} from "src/squads/payment/internals/hasura-client/execute-query";
import {
    Payment_GetManyBillingSchedulePeriodsByBillingScheduleIdQuery,
    Payment_GetManyBillingSchedulePeriodsByBillingScheduleIdQueryVariables,
    Payment_GetManyBillingSchedulePeriodsByManyBillingScheduleIdQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { getMockBillingSchedulePeriods } from "src/squads/payment/test-utils/mocks/billing-schedule-period";

import billingSchedulePeriodQueriesFatima from "src/squads/payment/service/fatima/billing-schedule-period-service/billing-schedule-period-fatima.query";

jest.mock("src/squads/payment/internals/hasura-client/execute-query", () => ({
    __esModule: true,
    doQuery: jest.fn(),
}));

const mockBillingSchedulePeriods = getMockBillingSchedulePeriods();

const mockDoQueryGetManyReturnValue: HasuraAndDefaultResponse<Payment_GetManyBillingSchedulePeriodsByBillingScheduleIdQuery> =
    {
        data: {
            billing_schedule_period: mockBillingSchedulePeriods,
        },
    };

describe("Billing schedule period query", () => {
    it("should return billing schedule period when calling getMany", async () => {
        (doQuery as jest.Mock).mockReturnValue(mockDoQueryGetManyReturnValue);

        const variables: Payment_GetManyBillingSchedulePeriodsByBillingScheduleIdQueryVariables = {
            billingScheduleId: "billing_schedule_id_1",
        };

        const result = await billingSchedulePeriodQueriesFatima.getMany(variables);

        expect(result).toEqual(mockBillingSchedulePeriods);
    });
});

describe("Billing schedule period by many billing scheduel id query", () => {
    it("should return billing schedule period when calling getManyBillingSchedulePeriodsByManyBillingScheduleId", async () => {
        (doQuery as jest.Mock).mockReturnValue(mockDoQueryGetManyReturnValue);

        const variables: Payment_GetManyBillingSchedulePeriodsByManyBillingScheduleIdQueryVariables =
            {
                billingScheduleIds: ["billing_schedule_id_1"],
            };

        const result =
            await billingSchedulePeriodQueriesFatima.getManyBillingSchedulePeriodsByManyBillingScheduleId(
                variables
            );

        expect(result).toEqual(mockBillingSchedulePeriods);
    });
});
