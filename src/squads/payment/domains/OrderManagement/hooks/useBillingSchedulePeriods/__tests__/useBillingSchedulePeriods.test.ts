import { billingSchedulePeriodService } from "src/squads/payment/service/fatima/billing-schedule-period-service/billing-schedule-period-service";
import {
    Payment_GetManyBillingSchedulePeriodsByBillingScheduleIdQuery,
    Payment_GetManyBillingSchedulePeriodsByBillingScheduleIdQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { inferQuery } from "src/squads/payment/service/infer-query";
import { getMockBillingSchedulePeriods } from "src/squads/payment/test-utils/mocks/billing-schedule-period";
import { mockWarner } from "src/squads/payment/test-utils/warner";

import { UseQueryBaseOptions } from "@manabie-com/react-utils";
import { renderHook } from "@testing-library/react-hooks";
import useBillingSchedulePeriods from "src/squads/payment/domains/OrderManagement/hooks/useBillingSchedulePeriods/useBillingSchedulePeriods";
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

describe("useBillingSchedulePeriods", () => {
    const std = mockWarner();

    it("should return correct data", () => {
        let callbackRan = false;

        (inferQuery as jest.Mock).mockImplementation(
            (resource: {
                    entity: "billingSchedulePeriod";
                    action: keyof typeof billingSchedulePeriodService.query;
                }) =>
                (
                    _params: Payment_GetManyBillingSchedulePeriodsByBillingScheduleIdQueryVariables,
                    options: UseQueryBaseOptions<
                        | Payment_GetManyBillingSchedulePeriodsByBillingScheduleIdQuery["billing_schedule_period"]
                        | undefined
                    >
                ) => {
                    if (!callbackRan) {
                        if (
                            resource.action ===
                            "paymentGetManyBillingSchedulePeriodsByBillingScheduleId"
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

        const billingScheduleId: Payment_GetManyBillingSchedulePeriodsByBillingScheduleIdQueryVariables["billingScheduleId"] =
            mockBillingSchedulePeriods[0].billing_schedule_id;
        const { result } = renderHook(() => useBillingSchedulePeriods({ billingScheduleId }));
        expect(result.current.data).toEqual(mockBillingSchedulePeriods);
    });

    it("should log warning and show snackbar when the query fails", () => {
        const queryError = new Error("Error when query in useBillingSchedulePeriods");
        (inferQuery as jest.Mock).mockImplementation(
            (resource: {
                    entity: "billingSchedulePeriods";
                    action: keyof typeof billingSchedulePeriodService.query;
                }) =>
                (
                    _params: Payment_GetManyBillingSchedulePeriodsByBillingScheduleIdQueryVariables,
                    options: UseQueryBaseOptions<
                        | Payment_GetManyBillingSchedulePeriodsByBillingScheduleIdQuery["billing_schedule_period"]
                        | undefined
                    >
                ) => {
                    if (
                        resource.action ===
                        "paymentGetManyBillingSchedulePeriodsByBillingScheduleId"
                    ) {
                        options.onError?.(queryError);
                        return { data: undefined, isFetched: true };
                    }
                }
        );

        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);

        const billingScheduleId: Payment_GetManyBillingSchedulePeriodsByBillingScheduleIdQueryVariables["billingScheduleId"] =
            mockBillingSchedulePeriods[0].billing_schedule_id;

        const { result } = renderHook(() => useBillingSchedulePeriods({ billingScheduleId }));

        expect(std.warn).toBeCalledWith("useBillingSchedulePeriods in Payment Order", queryError);

        expect(showSnackbar).toBeCalledWith(
            "ra.message.unableToLoadData billingSchedulePeriod - paymentGetManyBillingSchedulePeriodsByBillingScheduleId",
            "error"
        );

        expect(result.current.data).toBeUndefined();
    });
});
