import {
    Payment_GetManyTaxesByTaxIdsQuery,
    Payment_GetManyTaxesByTaxIdsQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { inferQuery } from "src/squads/payment/service/infer-query";
import { createMockGetManyTaxDataList } from "src/squads/payment/test-utils/mocks/tax";
import { mockWarner } from "src/squads/payment/test-utils/warner";
import { ArrayElement } from "src/squads/payment/types/common/array";

import { UseQueryBaseOptions } from "@manabie-com/react-utils";
import { renderHook } from "@testing-library/react-hooks";
import useTaxes, { UseTaxesProps } from "src/squads/payment/domains/OrderManagement/hooks/useTaxes";

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

const useTaxesDefaultProps: UseTaxesProps = {
    taxIds: ["tax_id_1", "tax_id_2"],
    onSuccess,
};

const mockTaxesData = createMockGetManyTaxDataList();

describe("useTaxes with taxIds", () => {
    const std = mockWarner();

    it("return tax list with taxIds parameter", () => {
        let callbackRan = false;

        (inferQuery as jest.Mock).mockImplementation(
            (resource: { entity: "tax"; action: "paymentGetManyTaxesByTaxIds" }) =>
                (
                    _params: Payment_GetManyTaxesByTaxIdsQueryVariables,
                    options: UseQueryBaseOptions<
                        Payment_GetManyTaxesByTaxIdsQuery["tax"] | undefined
                    >
                ) => {
                    if (!callbackRan) {
                        if (
                            resource.entity === "tax" &&
                            resource.action === "paymentGetManyTaxesByTaxIds"
                        ) {
                            callbackRan = true;
                            options.onSuccess?.(mockTaxesData);

                            return { data: mockTaxesData };
                        }
                    }

                    return { data: null };
                }
        );

        const {
            result: {
                current: { data },
            },
        } = renderHook(() => useTaxes(useTaxesDefaultProps));

        expect(data).toEqual(mockTaxesData);

        expect(onSuccess).toBeCalledWith(mockTaxesData);
    });

    it("should log warning and show snackbar when the query fails", () => {
        let callbackRan = false;

        (inferQuery as jest.Mock).mockImplementation(
            (resource: { entity: "tax"; action: "paymentGetManyTaxesByTaxIds" }) =>
                (
                    _params: Payment_GetManyTaxesByTaxIdsQueryVariables,
                    options: UseQueryBaseOptions<
                        ArrayElement<Payment_GetManyTaxesByTaxIdsQuery["tax"]> | undefined
                    >
                ) => {
                    if (!callbackRan) {
                        if (
                            resource.entity === "tax" &&
                            resource.action === "paymentGetManyTaxesByTaxIds"
                        ) {
                            callbackRan = true;

                            options.onError?.(Error("ERROR tax - paymentGetManyTaxesByTaxIds"));
                        }
                    }

                    return { data: null };
                }
        );

        renderHook(() => useTaxes(useTaxesDefaultProps));

        expect(std.warn).toBeCalledWith(
            "useTaxes in Payment Order",
            Error("ERROR tax - paymentGetManyTaxesByTaxIds")
        );

        expect(mockShowSnackbar).toBeCalledWith(
            `ra.message.unableToLoadData tax - paymentGetManyTaxesByTaxIds`,
            "error"
        );
    });
});
