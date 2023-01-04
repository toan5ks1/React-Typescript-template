import { billingRatioService } from "src/squads/payment/service/fatima/billing-ratio-service/billing-ratio-service";
import { Payment_GetManyBillingRatiosByBillingSchedulePeriodIdQueryVariables } from "src/squads/payment/service/fatima/fatima-types";
import { InvalidParamError } from "src/squads/payment/service/service-types";
import { getMockBillingRatios } from "src/squads/payment/test-utils/mocks/billing-ratio";

import billingRatioQueriesFatima from "src/squads/payment/service/fatima/billing-ratio-service/billing-ratio-fatima.query";

jest.mock(
    "src/squads/payment/service/fatima/billing-ratio-service/billing-ratio-fatima.query",
    () => ({
        __esModule: true,
        default: {
            getManyBillingRatiosByBillingSchedulePeriodId: jest.fn(),
        },
    })
);

const mockBillingRatios = getMockBillingRatios();

describe("Billing ratio service", () => {
    it("should return billing ratios when calling query paymentGetManyBillingRatiosByBillingSchedulePeriodId", async () => {
        (
            billingRatioQueriesFatima.getManyBillingRatiosByBillingSchedulePeriodId as jest.Mock
        ).mockResolvedValue(mockBillingRatios);

        const queryVariable: Payment_GetManyBillingRatiosByBillingSchedulePeriodIdQueryVariables = {
            billingSchedulePeriodId: "billing_schedule_period_id_1",
        };

        const response =
            await billingRatioService.query.paymentGetManyBillingRatiosByBillingSchedulePeriodId(
                queryVariable
            );

        expect(
            billingRatioQueriesFatima.getManyBillingRatiosByBillingSchedulePeriodId
        ).toBeCalledWith(queryVariable);
        expect(response).toEqual(mockBillingRatios);
    });

    it("should throw an error if billing_schedule_period_id is undefined when calling paymentGetOneProductMaterialByProductId", async () => {
        (
            billingRatioQueriesFatima.getManyBillingRatiosByBillingSchedulePeriodId as jest.Mock
        ).mockResolvedValue(mockBillingRatios);

        const queryVariable: Partial<Payment_GetManyBillingRatiosByBillingSchedulePeriodIdQueryVariables> =
            {
                billingSchedulePeriodId: undefined,
            };

        await expect(async () => {
            await billingRatioService.query.paymentGetManyBillingRatiosByBillingSchedulePeriodId(
                queryVariable
            );
        }).rejects.toThrowError(
            new InvalidParamError({
                action: "paymentGetManyBillingRatiosByBillingSchedulePeriodId",
                errors: [
                    {
                        field: "billing_schedule_period_id",
                        fieldValueIfNotSensitive: queryVariable,
                    },
                ],
                serviceName: "fatimaGraphQL",
            })
        );

        expect(
            billingRatioQueriesFatima.getManyBillingRatiosByBillingSchedulePeriodId
        ).not.toBeCalled();
    });
});
