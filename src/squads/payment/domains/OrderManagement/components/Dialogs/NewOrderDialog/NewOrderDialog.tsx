import { useRef } from "react";

import { useFormContext } from "react-hook-form";
import { OrderFormValues } from "src/squads/payment/types/form/order-form-types";

import { ProductListSectionRefs } from "src/squads/payment/components/Sections/ProductListSection";
import NewOrderDialogContainer from "src/squads/payment/domains/OrderManagement/components/Dialogs/NewOrderDialog/NewOrderDialogContainer";
import OrderForm from "src/squads/payment/domains/OrderManagement/components/OrderForm";

import { OrderType } from "manabuf/payment/v1/enums_pb";

import {
    defaultProductFieldArrayItems,
    FIRST_STUDENT_IDX,
} from "src/squads/payment/domains/OrderManagement/common/constants";
import useSubmitOrder from "src/squads/payment/domains/OrderManagement/hooks/useSubmitOrder";

export interface NewOrderDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

const NewOrderDialog = ({ isOpen, onClose }: NewOrderDialogProps) => {
    const productListSectionRef = useRef<ProductListSectionRefs>();

    const { handleSubmit } = useFormContext<OrderFormValues>();

    const onCreateError = (error: string) => {
        if (error === "ra.manabie-error.specified.orderMismatch") {
            productListSectionRef.current?.replace(defaultProductFieldArrayItems);
        }
    };

    const { createOrder, isOnCreateLoading } = useSubmitOrder({
        orderType: OrderType.ORDER_TYPE_NEW,
        onCreateError,
    });

    const onLocationChange = (): void => {
        productListSectionRef.current?.replace(defaultProductFieldArrayItems);
    };

    return (
        <NewOrderDialogContainer
            isOpen={isOpen}
            onSave={handleSubmit(createOrder)}
            isLoading={isOnCreateLoading}
            onClose={onClose}
        >
            <OrderForm
                onLocationChange={onLocationChange}
                productListSectionRef={productListSectionRef}
                studentIndex={FIRST_STUDENT_IDX}
            />
        </NewOrderDialogContainer>
    );
};

export default NewOrderDialog;
