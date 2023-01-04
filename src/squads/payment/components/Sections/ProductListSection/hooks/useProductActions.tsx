import { UseFieldArrayReturn, useFormContext } from "react-hook-form";
import { ProductListItemStatus } from "src/squads/payment/constants/enum";
import {
    OrderFormProductFieldArrayItemsFieldName,
    OrderFormValues,
    ProductFieldItem,
} from "src/squads/payment/types/form/order-form-types";

import { MenuItemProps } from "@mui/material";

import { OrderType } from "manabuf/payment/v1/enums_pb";

import useTranslate from "src/squads/payment/hooks/useTranslate";

interface UseProductActionsProps {
    fieldArrayMethods: UseFieldArrayReturn<
        OrderFormValues,
        OrderFormProductFieldArrayItemsFieldName
    >;
    orderType: OrderType;
}

interface UseProductActionsReturnType {
    getProductActions: (productFieldItem: ProductFieldItem) => MenuItemProps[];
}

export const useProductActions = ({
    fieldArrayMethods: { fields, remove, update },
    orderType,
}: UseProductActionsProps): UseProductActionsReturnType => {
    const t = useTranslate();

    const { reset } = useFormContext<OrderFormValues>();

    const getProductActions: UseProductActionsReturnType["getProductActions"] = ({
        id: itemId,
        updateOrderDetails,
    }) => {
        const ActionsMap = {
            default: [
                {
                    key: t("ra.common.action.deleteRow"),
                    onClick: () => remove(fields.findIndex(({ id }) => id === itemId)),
                    children: t("ra.common.action.deleteRow"),
                },
            ],
            [ProductListItemStatus.ACTIVE]: [
                {
                    key: t("ra.common.action.cancel"),
                    onClick: () => {
                        reset();
                        const productIndex = fields.findIndex(({ id }) => id === itemId);

                        const fieldItem = fields[productIndex];

                        if (!fieldItem.updateOrderDetails) return;

                        update(productIndex, {
                            ...fieldItem,
                            updateOrderDetails: {
                                ...fieldItem.updateOrderDetails,
                                orderStatus: ProductListItemStatus.CANCELLED,
                            },
                        });
                    },
                    children: t("ra.common.action.cancel"),
                },
            ],
            [ProductListItemStatus.CANCELLED]: [
                {
                    key: t("ra.common.action.restore"),
                    onClick: () => reset(),
                    children: t("ra.common.action.restore"),
                },
            ],
        };

        switch (orderType) {
            case OrderType.ORDER_TYPE_UPDATE:
                return ActionsMap[updateOrderDetails?.orderStatus || ""] || [];

            default:
                return ActionsMap.default;
        }
    };

    return { getProductActions };
};

export type { UseProductActionsReturnType, UseProductActionsProps };
