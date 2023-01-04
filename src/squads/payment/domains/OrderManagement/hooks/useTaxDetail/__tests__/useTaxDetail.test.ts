import {
    Payment_GetTaxByTaxIdV2Query,
    Payment_GetTaxByTaxIdV2QueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { taxService } from "src/squads/payment/service/fatima/tax-fatima-service/tax-service";
import { inferQuery } from "src/squads/payment/service/infer-query";
import { createMockTaxDataList } from "src/squads/payment/test-utils/mocks/tax";
import { mockWarner } from "src/squads/payment/test-utils/warner";
import { ArrayElement } from "src/squads/payment/types/common/array";

import { UseQueryBaseOptions } from "@manabie-com/react-utils";
import { renderHook } from "@testing-library/react-hooks";
import useTaxDetail, {
    UseTaxDetailProps,
} from "src/squads/payment/domains/OrderManagement/hooks/useTaxDetail";

jest.mock("src/squads/payment/service/infer-query", () => {
    return {
        __esModule: true,
        inferQuery: jest.fn(),
    };
});

const mockShowSnackbar = jest.fn();
jest.mock("src/squads/payment/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: () => mockShowSnackbar,
}));

const onSuccess = jest.fn();

const useTaxDetailDefaultProps: UseTaxDetailProps = {
    taxId: "tax_id_1",
    onSuccess,
};

const mockTaxData = createMockTaxDataList()[0];

describe("useTaxDetail with tax_id", () => {
    const std = mockWarner();

    it("return tax data with tax_id parameter", () => {
        let callbackRan = false;

        (inferQuery as jest.Mock).mockImplementation(
            (resource: { entity: "tax"; action: keyof typeof taxService.query }) =>
                (
                    _params: Payment_GetTaxByTaxIdV2QueryVariables,
                    options: UseQueryBaseOptions<
                        ArrayElement<Payment_GetTaxByTaxIdV2Query["tax"]> | undefined
                    >
                ) => {
                    if (!callbackRan) {
                        if (resource.entity === "tax") {
                            callbackRan = true;

                            options.onSuccess?.(mockTaxData);

                            return { data: mockTaxData };
                        }
                    }

                    return { data: null };
                }
        );

        const {
            result: {
                current: { data: taxPercentageData },
            },
        } = renderHook(() => useTaxDetail(useTaxDetailDefaultProps));

        expect(mockTaxData).toEqual(taxPercentageData);

        expect(onSuccess).toBeCalledWith(mockTaxData);
    });

    it("should log warning and show snackbar when the query fails", () => {
        let callbackRan = false;

        (inferQuery as jest.Mock).mockImplementation(
            (resource: { entity: "tax"; action: keyof typeof taxService.query }) =>
                (
                    _params: Payment_GetTaxByTaxIdV2QueryVariables,
                    options: UseQueryBaseOptions<
                        ArrayElement<Payment_GetTaxByTaxIdV2Query["tax"]> | undefined
                    >
                ) => {
                    if (!callbackRan) {
                        if (resource.entity === "tax") {
                            callbackRan = true;

                            options.onError?.(Error("ERROR tax - paymentGetOneTaxByTaxId"));
                        }
                    }

                    return { data: null };
                }
        );

        renderHook(() => useTaxDetail(useTaxDetailDefaultProps));

        expect(std.warn).toBeCalledWith(
            "useTaxDetail in Payment Order",
            Error("ERROR tax - paymentGetOneTaxByTaxId")
        );

        expect(mockShowSnackbar).toBeCalledWith(
            `ra.message.unableToLoadData tax - paymentGetOneTaxByTaxId`,
            "error"
        );
    });
});
