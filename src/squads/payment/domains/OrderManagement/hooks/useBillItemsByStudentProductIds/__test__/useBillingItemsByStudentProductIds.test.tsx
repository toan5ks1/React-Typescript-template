import { billItemService } from "src/squads/payment/service/fatima/bill-item-service/bill-item-service";
import {
    Payment_GetManyBillItemsByStudentProductIdsV2Query,
    Payment_GetManyBillItemsByStudentProductIdsV2QueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { inferQuery } from "src/squads/payment/service/infer-query";
import { createMockBillItemListByStudentProductId } from "src/squads/payment/test-utils/mocks/bill-item";
import { mockWarner } from "src/squads/payment/test-utils/warner";

import { UseQueryBaseOptions } from "@manabie-com/react-utils";
import { renderHook } from "@testing-library/react-hooks";
import useBillItemsByStudentProductIds, {
    UseBillItemsByStudentProductIdsProps,
} from "src/squads/payment/domains/OrderManagement/hooks/useBillItemsByStudentProductIds";
import useShowSnackbar from "src/squads/payment/hooks/useShowSnackbar";

jest.mock("src/squads/payment/service/infer-query", () => {
    return {
        __esModule: true,
        inferQuery: jest.fn(),
    };
});

jest.mock("src/squads/payment/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const onSuccess = jest.fn();
const showSnackbar = jest.fn();

const useBillItemsByStudentProductIdsDefaultProps: UseBillItemsByStudentProductIdsProps = {
    studentProductIds: ["student_product_id_1", "student_product_id_2"],
    onSuccess,
};

const mockBillItemData = createMockBillItemListByStudentProductId();

describe("useBillItemsByStudentProductIds", () => {
    const std = mockWarner();

    it("return bill item list by studentProductIds", () => {
        let callbackRan = false;

        (inferQuery as jest.Mock).mockImplementation(
            (resource: {
                    entity: "billItem";
                    action: "paymentGetManyBillItemsByStudentProductIds";
                }) =>
                (
                    _params: Payment_GetManyBillItemsByStudentProductIdsV2QueryVariables,
                    options: UseQueryBaseOptions<
                        Payment_GetManyBillItemsByStudentProductIdsV2Query["bill_item"] | undefined
                    >
                ) => {
                    if (!callbackRan) {
                        if (
                            resource.entity === "billItem" &&
                            resource.action === "paymentGetManyBillItemsByStudentProductIds"
                        ) {
                            callbackRan = true;
                            options.onSuccess?.(mockBillItemData);

                            return { data: mockBillItemData };
                        }
                    }

                    return { data: null };
                }
        );

        const {
            result: {
                current: { data },
            },
        } = renderHook(() =>
            useBillItemsByStudentProductIds(useBillItemsByStudentProductIdsDefaultProps)
        );

        expect(data).toEqual(mockBillItemData);

        expect(onSuccess).toBeCalledWith(mockBillItemData);
    });

    it("should log warning and show snackbar when the query fails", () => {
        const queryError = new Error("Error when query in useBillItemsByStudentProductIds");
        (inferQuery as jest.Mock).mockImplementation(
            (resource: { entity: "billItem"; action: keyof typeof billItemService.query }) =>
                (
                    _params: Payment_GetManyBillItemsByStudentProductIdsV2QueryVariables,
                    options: UseQueryBaseOptions<
                        Payment_GetManyBillItemsByStudentProductIdsV2Query["bill_item"] | undefined
                    >
                ) => {
                    if (resource.action === "paymentGetManyBillItemsByStudentProductIds") {
                        options.onError?.(queryError);
                        return { data: undefined, isFetched: true };
                    }
                }
        );

        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);

        const { result } = renderHook(() =>
            useBillItemsByStudentProductIds(useBillItemsByStudentProductIdsDefaultProps)
        );

        expect(std.warn).toBeCalledWith(
            "useBillItemsByStudentProductIds in Payment Order",
            queryError
        );

        expect(showSnackbar).toBeCalledWith(
            "ra.message.unableToLoadData billItem - paymentGetManyBillItemsByStudentProductIds",
            "error"
        );

        expect(result.current.data).toBeUndefined();
    });
});
