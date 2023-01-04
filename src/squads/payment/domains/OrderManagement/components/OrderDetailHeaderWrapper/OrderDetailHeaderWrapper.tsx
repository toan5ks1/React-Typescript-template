import { useMemo } from "react";

import { useToggle } from "react-use";
import { Entities, Features } from "src/common/constants/enum";
import { convertTimestampToDate, formatDate } from "src/common/utils/time";
import { KeyOrderTypes } from "src/squads/payment/constants/const";
import {
    Payment_GetOrderByOrderIdQuery,
    Payment_GetOrderItemsByOrderIdQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { ArrayElement } from "src/squads/payment/types/common/array";

import DialogCancelConfirm from "src/components/Dialogs/DialogCancelConfirm";
import OrderDetailHeader from "src/squads/payment/domains/OrderManagement/components/OrderDetailHeader";

import { StudentProductLabel } from "manabuf/payment/v1/enums_pb";

import useOrderItemsInfoListV2 from "src/squads/payment/domains/OrderManagement/hooks/useOrderItemsInfoListV2";
import useVoidOrderMutation from "src/squads/payment/domains/OrderManagement/hooks/useVoidOrderMutation";
import useFeatureToggle from "src/squads/payment/hooks/useFeatureToggle";
import useResourceTranslate from "src/squads/payment/hooks/useResourceTranslate";

export interface OrderDetailHeaderWrapperProps {
    order: ArrayElement<Payment_GetOrderByOrderIdQuery["order"]>;
    orderId: Payment_GetOrderItemsByOrderIdQueryVariables["orderId"];
    refetch: () => void;
}

const OrderDetailHeaderWrapper = ({ order, orderId, refetch }: OrderDetailHeaderWrapperProps) => {
    const tOrder = useResourceTranslate(Entities.ORDERS);

    const [openVoidDialog, setOpenVoidDialog] = useToggle(false);
    const onClickVoid = () => setOpenVoidDialog(true);

    const { onVoid } = useVoidOrderMutation({ refetch });
    const handleVoidConfirm = () => {
        setOpenVoidDialog(false);
        onVoid({ data: { orderId } });
    };

    const { data: orderItemsDetailArray } = useOrderItemsInfoListV2({
        orderId,
        enabled: order.order_type !== KeyOrderTypes.ORDER_TYPE_CUSTOM_BILLING,
    });

    const isUpdateOrderEffectiveDatePassed = useMemo(() => {
        const currentDate = formatDate(new Date(), "yyyy/LL/dd");
        const effectiveDates =
            orderItemsDetailArray?.itemsList.map((product) =>
                formatDate(convertTimestampToDate(product.startDate), "yyyy/LL/dd")
            ) || [];
        if (order.order_type === "ORDER_TYPE_UPDATE") {
            return effectiveDates?.some((effectiveDate) => effectiveDate <= currentDate);
        }
        return false;
    }, [orderItemsDetailArray?.itemsList, order.order_type]);

    const productHasUpdateScheduleTag = useMemo(() => {
        const studentProductLabels = orderItemsDetailArray?.itemsList.map(
            (product) => product.studentProductLabel
        );
        return studentProductLabels?.some(
            (studentProductLabel) => studentProductLabel === StudentProductLabel.UPDATE_SCHEDULED
        );
    }, [orderItemsDetailArray?.itemsList]);

    const isVoidDisabled =
        order.order_status === "ORDER_STATUS_VOIDED" ||
        order.order_status === "ORDER_STATUS_INVOICED" ||
        isUpdateOrderEffectiveDatePassed ||
        productHasUpdateScheduleTag;

    const { isEnabled: shouldShowVoidOrder } = useFeatureToggle(
        Features.PAYMENT_ORDER_MANAGEMENT_VOID_ORDER
    );

    const menuItems = [
        ...(shouldShowVoidOrder
            ? [
                  {
                      key: tOrder("label.void"),
                      disabled: isVoidDisabled,
                      onClick: onClickVoid,
                      children: tOrder("label.void"),
                  },
              ]
            : []),
    ];

    return (
        <>
            <OrderDetailHeader
                orderSequenceNumber={order.order_sequence_number}
                orderStatus={order.order_status}
                menuItems={menuItems}
            />
            <DialogCancelConfirm
                open={openVoidDialog}
                onClose={() => setOpenVoidDialog(false)}
                onSave={handleVoidConfirm}
                title={tOrder("title.voidOrder")}
                textCancelDialog={tOrder("dialog.voidDialogMessage")}
            />
        </>
    );
};

export default OrderDetailHeaderWrapper;
