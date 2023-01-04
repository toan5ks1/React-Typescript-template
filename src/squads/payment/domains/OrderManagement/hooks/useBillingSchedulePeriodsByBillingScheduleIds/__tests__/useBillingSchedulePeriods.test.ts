import { billingSchedulePeriodService } from "src/squads/payment/service/fatima/billing-schedule-period-service/billing-schedule-period-service";
import {
    Payment_GetManyBillingSchedulePeriodsByManyBillingScheduleIdQuery,
    Payment_GetManyBillingSchedulePeriodsByManyBillingScheduleIdQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { inferQuery } from "src/squads/payment/service/infer-query";
import { getMockBillingSchedulePeriods } from "src/squads/payment/test-utils/mocks/billing-schedule-period";
import { mockWarner } from "src/squads/payment/test-utils/warner";

import { UseQueryBaseOptions } from "@manabie-com/react-utils";
import { renderHook } from "@testing-library/react-hooks";
import useBillingSchedulePeriodsByBillingScheduleIds from "src/squads/payment/domains/OrderManagement/hooks/useBillingSchedulePeriodsByBillingScheduleIds/useBillingSchedulePeriodsByBillingScheduleIds";
import useShowSnackbar from "src/squads/payment/hooks/useShowSnackbar";

jest.mock("src/squads/payment/service/infer-query", () => {
    return {
        __esModule: true,
        inferQuery: jest.fn(),
    };
});

jest.mock("src/squads/payment/hooks/useShowSnackbar");

const showSnackbar = jest.fn();

const mockBillingSchedulePeriods = getMockBillingSchedulePeriods();

describe("useBillingSchedulePeriodsByBillingScheduleIds", () => {
    const std = mockWarner();

    it("should return billing schedule periods", () => {
        let callbackRan = false;

        (inferQuery as jest.Mock).mockImplementation(
            (resource: {
                    entity: "billingSchedulePeriod";
                    action: keyof typeof billingSchedulePeriodService.query;
                }) =>
                (
                    _params: Payment_GetManyBillingSchedulePeriodsByManyBillingScheduleIdQueryVariables,
                    options: UseQueryBaseOptions<
                        | Payment_GetManyBillingSchedulePeriodsByManyBillingScheduleIdQuery["billing_schedule_period"]
                        | undefined
                    >
                ) => {
                    if (!callbackRan) {
                        if (
                            resource.action ===
                            "paymentGetManyBillingSchedulePeriodsByManyBillingScheduleId"
                        ) {
                            callbackRan = true;

                            options.onSuccess?.(mockBillingSchedulePeriods);

                            return {
                                data: mockBillingSchedulePeriods,
                                isFetched: true,
                            };
                        }
                    }

                    return { data: undefined, isFetched: true };
                }
        );

        const billingScheduleIds: Payment_GetManyBillingSchedulePeriodsByManyBillingScheduleIdQueryVariables["billingScheduleIds"] =
            [mockBillingSchedulePeriods[0].billing_schedule_id];
        const { result } = renderHook(() =>
            useBillingSchedulePeriodsByBillingScheduleIds({ billingScheduleIds })
        );
        expect(result.current.data).toEqual(mockBillingSchedulePeriods);
    });

    it("should log warning and show snackbar when the query fails", () => {
        const queryError = new Error(
            "Error when query in useBillingSchedulePeriodsByBillingScheduleIds"
        );
        (inferQuery as jest.Mock).mockImplementation(
            (resource: {
                    entity: "billingSchedulePeriods";
                    action: keyof typeof billingSchedulePeriodService.query;
                }) =>
                (
                    _params: Payment_GetManyBillingSchedulePeriodsByManyBillingScheduleIdQueryVariables,
                    options: UseQueryBaseOptions<
                        | Payment_GetManyBillingSchedulePeriodsByManyBillingScheduleIdQuery["billing_schedule_period"]
                        | undefined
                    >
                ) => {
                    if (
                        resource.action ===
                        "paymentGetManyBillingSchedulePeriodsByManyBillingScheduleId"
                    ) {
                        options.onError?.(queryError);
                        return { data: undefined, isFetched: true };
                    }
                }
        );

        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);

        const billingScheduleIds: Payment_GetManyBillingSchedulePeriodsByManyBillingScheduleIdQueryVariables["billingScheduleIds"] =
            [mockBillingSchedulePeriods[0].billing_schedule_id];

        const { result } = renderHook(() =>
            useBillingSchedulePeriodsByBillingScheduleIds({ billingScheduleIds })
        );

        expect(std.warn).toBeCalledWith(
            "useBillingSchedulePeriodsByBillingScheduleIds in Payment Order",
            queryError
        );

        expect(showSnackbar).toBeCalledWith(
            "ra.message.unableToLoadData billingSchedulePeriod - paymentGetManyBillingSchedulePeriodsByManyBillingScheduleId",
            "error"
        );

        expect(result.current.data).toBeUndefined();
    });
});
