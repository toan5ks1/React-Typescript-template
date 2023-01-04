import { useFormContext, useWatch } from "react-hook-form";
import { getTotalValueForBilledAtOrderItems } from "src/squads/payment/helpers/price";
import { getStudentName } from "src/squads/payment/helpers/student";
import { getTaxValuesForBilledAtOrderItems } from "src/squads/payment/helpers/tax";
import { OrderFormValues } from "src/squads/payment/types/form/order-form-types";

import WrapperPortalBase from "src/components/Wrappers/WrapperPortalBase";
import EnrollmentOrderDialogContainer from "src/squads/payment/domains/OrderManagement/components/Dialogs/EnrollmentOrderDialog/EnrollmentOrderDialogContainer";
import EnrollmentPreviewForm from "src/squads/payment/domains/OrderManagement/components/Dialogs/EnrollmentPreviewForm";
import EnrollmentPreviewFormDialogFooter from "src/squads/payment/domains/OrderManagement/components/Dialogs/EnrollmentPreviewFormDialogFooter";

import { useProductPluginsContext } from "src/squads/payment/domains/OrderManagement/plugins/new-order";
import useGetBilledAtOrderProducts from "src/squads/payment/hooks/useGetBilledAtOrderProducts";

export interface EnrollmentPreviewFormDialogProps {
    showEnrollmentForm?: boolean;
    closeEnrollmentForm?: () => void;
    studentIndex: number;
}

const EnrollmentPreviewFormDialog = ({
    showEnrollmentForm = false,
    closeEnrollmentForm,
    studentIndex,
}: EnrollmentPreviewFormDialogProps) => {
    const { getValues } = useFormContext<OrderFormValues>();

    const [productFieldArrayItems] = useWatch<
        OrderFormValues,
        [`students.${number}.productFieldArrayItems`]
    >({
        name: [`students.${studentIndex}.productFieldArrayItems`],
    });

    const { getProductPluginsMap } = useProductPluginsContext();

    const billedAtOrderProducts = useGetBilledAtOrderProducts({
        productFieldArrayItems,
        getProductPluginsMap,
    });

    const totalValue = getTotalValueForBilledAtOrderItems(billedAtOrderProducts);
    const billedAtOrderTaxInclusions = getTaxValuesForBilledAtOrderItems(billedAtOrderProducts);

    return (
        <WrapperPortalBase selector="enrollment-preview-form">
            <EnrollmentOrderDialogContainer
                isOpen={showEnrollmentForm}
                onSave={() => {}}
                footerComponent={
                    <EnrollmentPreviewFormDialogFooter closeEnrollmentForm={closeEnrollmentForm} />
                }
            >
                <EnrollmentPreviewForm
                    studentName={getStudentName(
                        getValues(`students.${studentIndex}.studentInfo`)?.user
                    )}
                    billedAtOrderProducts={billedAtOrderProducts}
                    billedAtOrderTaxInclusions={billedAtOrderTaxInclusions}
                    totalValue={totalValue}
                />
            </EnrollmentOrderDialogContainer>
        </WrapperPortalBase>
    );
};

export default EnrollmentPreviewFormDialog;
