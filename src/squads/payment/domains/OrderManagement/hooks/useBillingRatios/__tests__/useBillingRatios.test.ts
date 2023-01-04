import { billingRatioService } from "src/squads/payment/service/fatima/billing-ratio-service/billing-ratio-service";
import {
    Payment_GetManyBillingRatiosByBillingSchedulePeriodIdQuery,
    Payment_GetManyBillingRatiosByBillingSchedulePeriodIdQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { inferQuery } from "src/squads/payment/service/infer-query";
import { getMockBillingRatios } from "src/squads/payment/test-utils/mocks/billing-ratio";
import { mockWarner } from "src/squads/payment/test-utils/warner";

import { UseQueryBaseOptions } from "@manabie-com/react-utils";
import { renderHook } from "@testing-library/react-hooks";
import useBillingRatios from "src/squads/payment/domains/OrderManagement/hooks/useBillingRatios/useBillingRatios";
import useShowSnackbar from "src/squads/payment/hooks/useShowSnackbar";

jest.mock("src/squads/payment/service/infer-query", () => {
    return {
        __esModule: true,
        inferQuery: jest.fn(),
    };
});

jest.mock("src/squads/payment/hooks/useShowSnackbar");

const showSnackbar = jest.fn();

const mockBillingRatios = getMockBillingRatios();

describe("useBillingRatios", () => {
    const std = mockWarner();

    it("should return correct data", () => {
        let callbackRan = false;

        (inferQuery as jest.Mock).mockImplementation(
            (resource: {
                    entity: "billingRatio";
                    action: keyof typeof billingRatioService.query;
                }) =>
                (
                    _params: Payment_GetManyBillingRatiosByBillingSchedulePeriodIdQueryVariables,
                    options: UseQueryBaseOptions<
                        | Payment_GetManyBillingRatiosByBillingSchedulePeriodIdQuery["billing_ratio"]
                        | undefined
                    >
                ) => {
                    if (!callbackRan) {
                        if (
                            resource.action ===
                            "paymentGetManyBillingRatiosByBillingSchedulePeriodId"
                        ) {
                            callbackRan = true;

                            options.onSuccess?.(mockBillingRatios);

                            return {
                                data: mockBillingRatios,
                                isFetched: true,
                            };
                        }
                    }

                    return { data: undefined, isFetched: true };
                }
        );

        const billingSchedulePeriodId: Payment_GetManyBillingRatiosByBillingSchedulePeriodIdQueryVariables["billingSchedulePeriodId"] =
            mockBillingRatios[0].billing_schedule_period_id;
        const { result } = renderHook(() => useBillingRatios({ billingSchedulePeriodId }));
        expect(result.current.data).toEqual(mockBillingRatios);
    });

    it("should log warning and show snackbar when the query fails", () => {
        const queryError = new Error("Error when query in useBillingRatios");
        (inferQuery as jest.Mock).mockImplementation(
            (resource: {
                    entity: "billingRatio";
                    action: keyof typeof billingRatioService.query;
                }) =>
                (
                    _params: Payment_GetManyBillingRatiosByBillingSchedulePeriodIdQueryVariables,
                    options: UseQueryBaseOptions<
                        | Payment_GetManyBillingRatiosByBillingSchedulePeriodIdQuery["billing_ratio"]
                        | undefined
                    >
                ) => {
                    if (
                        resource.action === "paymentGetManyBillingRatiosByBillingSchedulePeriodId"
                    ) {
                        options.onError?.(queryError);
                        return { data: undefined, isFetched: true };
                    }
                }
        );

        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);

        const billingSchedulePeriodId: Payment_GetManyBillingRatiosByBillingSchedulePeriodIdQueryVariables["billingSchedulePeriodId"] =
            mockBillingRatios[0].billing_schedule_period_id;

        const { result } = renderHook(() => useBillingRatios({ billingSchedulePeriodId }));

        expect(std.warn).toBeCalledWith("useBillingRatios in Payment Order", queryError);

        expect(showSnackbar).toBeCalledWith(
            "ra.message.unableToLoadData billingRatio - paymentGetManyBillingRatiosByBillingSchedulePeriodId",
            "error"
        );

        expect(result.current.data).toBeUndefined();
    });
});
