import { PropsWithChildren, useCallback, useEffect, useRef, useState } from "react";

import { useFormContext, useWatch } from "react-hook-form";
import { useToggle } from "react-use";
import { Entities } from "src/common/constants/enum";
import {
    OrderFormValues,
    ProductsFormValues,
} from "src/squads/payment/types/form/order-form-types";

import DialogCancelConfirm from "src/components/Dialogs/DialogCancelConfirm";
import DialogFullScreen from "src/components/Dialogs/DialogFullScreen";
import { ProductListSectionRefs } from "src/squads/payment/components/Sections/ProductListSection";
import OrderDialogFooter from "src/squads/payment/domains/OrderManagement/components/Dialogs/OrderDialogFooter";
import OrderForm from "src/squads/payment/domains/OrderManagement/components/OrderForm";
import UpdateOrderPreview from "src/squads/payment/domains/OrderManagement/components/UpdateOrderPreview";

import { OrderType } from "manabuf/payment/v1/enums_pb";

import useSubmitOrder from "src/squads/payment/domains/OrderManagement/hooks/useSubmitOrder";
import useOrderValidationRules from "src/squads/payment/hooks/useOrderValidationRules";
import useResourceTranslate from "src/squads/payment/hooks/useResourceTranslate";
import useTranslate from "src/squads/payment/hooks/useTranslate";

export interface UpdateOrderDialogProps {
    isOpen: boolean;
    onClose: () => void;
    defaultProducts: ProductsFormValues[];
}

export interface UpdateOrderDialogContainerProps
    extends Omit<UpdateOrderDialogProps, "onClose" | "defaultProducts"> {
    onSave: () => void;
    isLoading: boolean;
    openDialogCancel: () => void;
    hasNextPage: boolean;
    onNextPage: () => void;
    onPreviousPage: () => void;
}

const UpdateOrderDialogContainer = ({
    isOpen,
    hasNextPage,
    onNextPage,
    children,
    isLoading,
    onSave,
    openDialogCancel,
    onPreviousPage,
}: PropsWithChildren<UpdateOrderDialogContainerProps>) => {
    const tOrder = useResourceTranslate(Entities.ORDERS);

    return (
        <DialogFullScreen
            title={tOrder("title.updateProducts")}
            open={isOpen}
            onClose={openDialogCancel}
            onSave={onSave}
            data-testid="UpdateOrderDialog__dialog"
            isShowingBackdrop={isLoading}
            footer={
                <OrderDialogFooter
                    onCancel={openDialogCancel}
                    hasNextPage={hasNextPage}
                    onNextPage={onNextPage}
                    onPreviousPage={onPreviousPage}
                    onSubmit={onSave}
                />
            }
        >
            {children}
        </DialogFullScreen>
    );
};

const UpdateOrderDialog = ({ isOpen, onClose, defaultProducts }: UpdateOrderDialogProps) => {
    const t = useTranslate();
    const productListSectionRef = useRef<ProductListSectionRefs>();
    const [isPreviewShowing, setIsPreviewShowing] = useState<boolean>(false);
    const [isOpenDialogCancel, setIsOpenDialogCancel] = useToggle(false);

    const openDialogCancel = useCallback(() => {
        setIsOpenDialogCancel(true);
    }, [setIsOpenDialogCancel]);

    const { handleSubmit, formState, setValue, reset, trigger } = useFormContext<OrderFormValues>();

    const firstStudentIndex = 0;

    // TODO update this logic to check correct product index when moving to bulk cancellation
    useEffect(() => {
        const updateProductIndex = 0;
        const isUpdateProductDirty = Boolean(
            formState.dirtyFields?.students &&
                formState.dirtyFields.students[firstStudentIndex].productFieldArrayItems
        );

        setValue(
            `students.${firstStudentIndex}.productFieldArrayItems.${updateProductIndex}.updateOrderDetails.hasUpdate`,
            isUpdateProductDirty
        );
    }, [formState, setValue]);

    const [productFieldArrayItems] = useWatch<
        OrderFormValues,
        [`students.${number}.productFieldArrayItems`]
    >({
        name: [`students.${firstStudentIndex}.productFieldArrayItems`],
    });

    const onCreateError = (error: string) => {
        if (error === "ra.manabie-error.specified.orderMismatch") {
            reset();
        }
    };

    const { createOrder, isOnCreateLoading } = useSubmitOrder({
        orderType: OrderType.ORDER_TYPE_UPDATE,
        onCreateError,
    });

    const { errorMessages } = useOrderValidationRules();

    const onNextPage = async () => {
        await trigger();

        if (!errorMessages.productArrayTable(firstStudentIndex)) setIsPreviewShowing(true);
    };

    return (
        <>
            <UpdateOrderDialogContainer
                isOpen={isOpen}
                onSave={handleSubmit(createOrder)}
                isLoading={isOnCreateLoading}
                openDialogCancel={openDialogCancel}
                hasNextPage={!isPreviewShowing}
                onNextPage={onNextPage}
                onPreviousPage={() => setIsPreviewShowing(false)}
            >
                {isPreviewShowing ? (
                    <UpdateOrderPreview
                        beforeProductFieldItem={defaultProducts[0]}
                        afterProductFieldItem={productFieldArrayItems[0]}
                    />
                ) : (
                    <OrderForm
                        productListSectionRef={productListSectionRef}
                        studentIndex={firstStudentIndex}
                    />
                )}
            </UpdateOrderDialogContainer>
            <DialogCancelConfirm
                open={isOpenDialogCancel}
                onClose={() => setIsOpenDialogCancel(false)}
                onSave={() => {
                    onClose();
                    setIsOpenDialogCancel(false);
                }}
                textSave={t("ra.common.action.leave")}
            />
        </>
    );
};

export default UpdateOrderDialog;
