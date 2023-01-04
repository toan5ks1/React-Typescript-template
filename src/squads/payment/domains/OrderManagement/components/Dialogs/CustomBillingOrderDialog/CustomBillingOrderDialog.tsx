import { PropsWithChildren, useCallback, useEffect, useState } from "react";

import { useFormContext } from "react-hook-form";
import { useToggle } from "react-use";
import { Entities } from "src/common/constants/enum";
import { CustomBillingOrderFormValue } from "src/squads/payment/types/form/custom-billing-types";

import DialogCancelConfirm from "src/components/Dialogs/DialogCancelConfirm";
import DialogFullScreen from "src/components/Dialogs/DialogFullScreen";
import CustomBillingOrderForm from "src/squads/payment/domains/OrderManagement/components/CustomBillingOrderForm";
import OrderDialogFooter from "src/squads/payment/domains/OrderManagement/components/Dialogs/OrderDialogFooter";

import { OrderType } from "manabuf/payment/v1/enums_pb";

import { transformDataToCreateCustomBillingOrder } from "src/squads/payment/domains/OrderManagement/common/transformers";
import useCustomBillingOrderMutation from "src/squads/payment/domains/OrderManagement/hooks/useCustomBillingOrderMutation";
import useCustomBillingOrderValidationRules from "src/squads/payment/hooks/useCustomBillingOrderValidationRules";
import useResourceTranslate from "src/squads/payment/hooks/useResourceTranslate";
import useTranslate from "src/squads/payment/hooks/useTranslate";

export interface CustomBillingOrderDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

export interface CustomBillingOrderDialogContainerProps extends CustomBillingOrderDialogProps {
    onSave: () => void;
    isLoading: boolean;
}

const CustomBillingOrderDialogContainer = ({
    isOpen,
    onClose,
    isLoading,
    onSave,
    children,
}: PropsWithChildren<CustomBillingOrderDialogContainerProps>) => {
    const t = useTranslate();
    const tOrder = useResourceTranslate(Entities.ORDERS);

    const [isOpenDialogCancel, setIsOpenDialogCancel] = useToggle(false);

    const openDialogCancel = useCallback(() => {
        setIsOpenDialogCancel(true);
    }, [setIsOpenDialogCancel]);

    return (
        <DialogFullScreen
            title={tOrder("title.createCustomBilling")}
            open={isOpen}
            onClose={openDialogCancel}
            onSave={onSave}
            data-testid="CustomBillingOrderDialogContainer__dialog"
            isShowingBackdrop={isLoading}
            footer={
                <OrderDialogFooter
                    onCancel={openDialogCancel}
                    onSubmit={onSave}
                    submitButtonTitle={t("ra.common.action.save")}
                />
            }
        >
            {children}
            <DialogCancelConfirm
                open={isOpenDialogCancel}
                onClose={() => setIsOpenDialogCancel(false)}
                onSave={() => {
                    onClose();
                    setIsOpenDialogCancel(false);
                }}
                textSave={t("ra.common.action.leave")}
            />
        </DialogFullScreen>
    );
};

const CustomBillingOrderDialog = ({ isOpen, onClose }: CustomBillingOrderDialogProps) => {
    const [billingErrorMessage, setBillingErrorMessage] = useState<string | null>(null);

    const validationRules = useCustomBillingOrderValidationRules();

    const { handleSubmit, resetField, getValues, formState } =
        useFormContext<CustomBillingOrderFormValue>();

    const { onCreateCustomBillingOrder, isOnCreateCustomBillingOrderLoading } =
        useCustomBillingOrderMutation();

    const onSaveCustomBillingOrder = useCallback(
        (customBillingOrderFormValue: CustomBillingOrderFormValue) => {
            const { isError, errorMessage } = validationRules.billingItemArrayTable.validate(
                customBillingOrderFormValue.billingFieldArrayItem
            );
            if (isError) {
                setBillingErrorMessage(errorMessage);
                return;
            }

            const transformedData = transformDataToCreateCustomBillingOrder(
                customBillingOrderFormValue,
                OrderType.ORDER_TYPE_CUSTOM_BILLING
            );

            onCreateCustomBillingOrder({ data: transformedData });
        },
        [validationRules, onCreateCustomBillingOrder]
    );

    const onLocationChange = (): void => {
        resetField("billingFieldArrayItem");
        setBillingErrorMessage(null);
    };

    useEffect(() => {
        if (billingErrorMessage !== null && formState.submitCount) {
            const { isError } = validationRules.billingItemArrayTable.validate(
                getValues().billingFieldArrayItem
            );

            !isError && setBillingErrorMessage(null);
        }
    }, [formState, getValues, billingErrorMessage, validationRules.billingItemArrayTable]);

    return (
        <CustomBillingOrderDialogContainer
            isOpen={isOpen}
            onSave={handleSubmit(onSaveCustomBillingOrder)}
            isLoading={isOnCreateCustomBillingOrderLoading}
            onClose={onClose}
        >
            <CustomBillingOrderForm
                onLocationChange={onLocationChange}
                billingErrorMessage={billingErrorMessage}
            />
        </CustomBillingOrderDialogContainer>
    );
};

export default CustomBillingOrderDialog;
