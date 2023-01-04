import { PropsWithChildren, useCallback } from "react";

import { useToggle } from "react-use";
import { Entities } from "src/common/constants/enum";

import DialogCancelConfirm from "src/components/Dialogs/DialogCancelConfirm";
import DialogFullScreen from "src/components/Dialogs/DialogFullScreen";
import OrderDialogFooter from "src/squads/payment/domains/OrderManagement/components/Dialogs/OrderDialogFooter";

import useResourceTranslate from "src/squads/payment/hooks/useResourceTranslate";
import useTranslate from "src/squads/payment/hooks/useTranslate";

export interface NewOrderDialogContainerProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: () => void;
    isLoading: boolean;
}

const NewOrderDialogContainer = ({
    isOpen,
    children,
    isLoading,
    onSave,
    onClose,
}: PropsWithChildren<NewOrderDialogContainerProps>) => {
    const t = useTranslate();
    const tOrder = useResourceTranslate(Entities.ORDERS);

    const [isOpenDialogCancel, setIsOpenDialogCancel] = useToggle(false);

    const openDialogCancel = useCallback(() => {
        setIsOpenDialogCancel(true);
    }, [setIsOpenDialogCancel]);

    return (
        <DialogFullScreen
            title={tOrder("title.createOrder")}
            open={isOpen}
            onClose={openDialogCancel}
            onSave={onSave}
            data-testid="NewOrderDialog__dialog"
            isShowingBackdrop={isLoading}
            footer={<OrderDialogFooter onCancel={openDialogCancel} onSubmit={onSave} />}
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

export default NewOrderDialogContainer;
