import { PropsWithChildren, ReactElement } from "react";

import { useToggle } from "react-use";
import { Entities } from "src/common/constants/enum";

import DialogCancelConfirm from "src/components/Dialogs/DialogCancelConfirm";
import DialogFullScreen from "src/components/Dialogs/DialogFullScreen";
import OrderDialogFooter from "src/squads/payment/domains/OrderManagement/components/Dialogs/OrderDialogFooter";

import useGoBackToRedirectUrl from "src/squads/payment/hooks/useGoBackToRedirectUrl";
import useResourceTranslate from "src/squads/payment/hooks/useResourceTranslate";
import useTranslate from "src/squads/payment/hooks/useTranslate";

export interface EnrollmentOrderDialogContainerProps {
    isOpen: boolean;
    onSave: () => void;
    isLoading?: boolean;
    footerComponent?: ReactElement;
}

const EnrollmentOrderDialogContainer = ({
    isOpen,
    children,
    isLoading = false,
    onSave,
    footerComponent,
}: PropsWithChildren<EnrollmentOrderDialogContainerProps>) => {
    const t = useTranslate();
    const tOrder = useResourceTranslate(Entities.ORDERS);
    const handleCloseDialog = useGoBackToRedirectUrl();

    const [isOpenDialogCancel, setIsOpenDialogCancel] = useToggle(false);

    const openDialogCancel = () => setIsOpenDialogCancel(true);
    const closeDialogCancel = () => setIsOpenDialogCancel(false);

    const Footer = footerComponent || (
        <OrderDialogFooter onCancel={openDialogCancel} onSubmit={onSave} />
    );

    return (
        <DialogFullScreen
            title={tOrder("title.createEnrollment")}
            open={isOpen}
            onClose={openDialogCancel}
            onSave={onSave}
            data-testid="EnrollmentOrderDialog__dialog"
            isShowingBackdrop={isLoading}
            footer={Footer}
        >
            {children}
            <DialogCancelConfirm
                open={isOpenDialogCancel}
                onClose={closeDialogCancel}
                onSave={() => {
                    closeDialogCancel();
                    handleCloseDialog();
                }}
                textSave={t("ra.common.action.leave")}
            />
        </DialogFullScreen>
    );
};

export default EnrollmentOrderDialogContainer;
