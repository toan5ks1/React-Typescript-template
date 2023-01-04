import { billingSchedulePeriodService } from "src/squads/payment/service/fatima/billing-schedule-period-service/billing-schedule-period-service";
import {
    Payment_GetManyBillingSchedulePeriodsByBillingScheduleIdQueryVariables,
    Payment_GetManyBillingSchedulePeriodsByManyBillingScheduleIdQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { InvalidParamError } from "src/squads/payment/service/service-types";
import { getMockBillingSchedulePeriods } from "src/squads/payment/test-utils/mocks/billing-schedule-period";

import billingSchedulePeriodQueriesFatima from "src/squads/payment/service/fatima/billing-schedule-period-service/billing-schedule-period-fatima.query";

jest.mock(
    "src/squads/payment/service/fatima/billing-schedule-period-service/billing-schedule-period-fatima.query",
    () => ({
        __esModule: true,
        default: {
            getMany: jest.fn(),
            getManyBillingSchedulePeriodsByManyBillingScheduleId: jest.fn(),
        },
    })
);

const mockBillingSchedulePeriods = getMockBillingSchedulePeriods();

describe("Billing schedule period", () => {
    it("should return billing schedule period when calling paymentGetManyBillingSchedulePeriodByBillingScheduleId", async () => {
        (billingSchedulePeriodQueriesFatima.getMany as jest.Mock).mockResolvedValue(
            mockBillingSchedulePeriods
        );

        const queryVariable: Payment_GetManyBillingSchedulePeriodsByBillingScheduleIdQueryVariables =
            {
                billingScheduleId: "billing_schedule_id_1",
            };

        const response =
            await billingSchedulePeriodService.query.paymentGetManyBillingSchedulePeriodsByBillingScheduleId(
                queryVariable
            );

        expect(billingSchedulePeriodQueriesFatima.getMany).toBeCalledWith(queryVariable);
        expect(response).toEqual(mockBillingSchedulePeriods);
    });

    it("should throw an error if billingScheduleId is undefined when calling paymentGetManyBillingSchedulePeriodByBillingScheduleId", async () => {
        (billingSchedulePeriodQueriesFatima.getMany as jest.Mock).mockResolvedValue(
            mockBillingSchedulePeriods
        );

        const queryVariable: Partial<Payment_GetManyBillingSchedulePeriodsByBillingScheduleIdQueryVariables> =
            {
                billingScheduleId: undefined,
            };

        await expect(async () => {
            await billingSchedulePeriodService.query.paymentGetManyBillingSchedulePeriodsByBillingScheduleId(
                queryVariable
            );
        }).rejects.toThrowError(
            new InvalidParamError({
                action: "paymentGetManyBillingSchedulePeriodsByBillingScheduleId",
                errors: [
                    {
                        field: "billing_schedule_id",
                        fieldValueIfNotSensitive: queryVariable,
                    },
                ],
                serviceName: "fatimaGraphQL",
            })
        );

        expect(billingSchedulePeriodQueriesFatima.getMany).not.toBeCalled();
    });
});

describe("Billing schedule period by many billing schedule id", () => {
    it("should return billing schedule period when calling paymentGetManyBillingSchedulePeriodByManyBillingScheduleId", async () => {
        (
            billingSchedulePeriodQueriesFatima.getManyBillingSchedulePeriodsByManyBillingScheduleId as jest.Mock
        ).mockResolvedValue(mockBillingSchedulePeriods);

        const queryVariable: Payment_GetManyBillingSchedulePeriodsByManyBillingScheduleIdQueryVariables =
            {
                billingScheduleIds: ["billing_schedule_id_1", "billing_schedule_id_2"],
            };

        const response =
            await billingSchedulePeriodService.query.paymentGetManyBillingSchedulePeriodsByManyBillingScheduleId(
                queryVariable
            );

        expect(
            billingSchedulePeriodQueriesFatima.getManyBillingSchedulePeriodsByManyBillingScheduleId
        ).toBeCalledWith(queryVariable);
        expect(response).toEqual(mockBillingSchedulePeriods);
    });

    it("should throw an error if billingScheduleId is undefined when calling paymentGetManyBillingSchedulePeriodByBillingScheduleId", async () => {
        (
            billingSchedulePeriodQueriesFatima.getManyBillingSchedulePeriodsByManyBillingScheduleId as jest.Mock
        ).mockResolvedValue(mockBillingSchedulePeriods);

        const queryVariable: Partial<Payment_GetManyBillingSchedulePeriodsByManyBillingScheduleIdQueryVariables> =
            {
                billingScheduleIds: undefined,
            };

        await expect(async () => {
            await billingSchedulePeriodService.query.paymentGetManyBillingSchedulePeriodsByManyBillingScheduleId(
                queryVariable
            );
        }).rejects.toThrowError(
            new InvalidParamError({
                action: "paymentGetManyBillingSchedulePeriodsByBillingScheduleId",
                errors: [
                    {
                        field: "billing_schedule_id",
                        fieldValueIfNotSensitive: queryVariable,
                    },
                ],
                serviceName: "fatimaGraphQL",
            })
        );

        expect(
            billingSchedulePeriodQueriesFatima.getManyBillingSchedulePeriodsByManyBillingScheduleId
        ).not.toBeCalled();
    });
});
