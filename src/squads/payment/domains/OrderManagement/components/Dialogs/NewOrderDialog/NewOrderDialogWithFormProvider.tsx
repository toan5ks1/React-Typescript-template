import { FormProvider, useForm } from "react-hook-form";
import { ArrayElement } from "src/common/constants/types";
import { OrderFormValues } from "src/squads/payment/types/form/order-form-types";

import NewOrderDialog from "src/squads/payment/domains/OrderManagement/components/Dialogs/NewOrderDialog";

import { defaultProductFieldArrayItems } from "src/squads/payment/domains/OrderManagement/common/constants";
import useGoBackToRedirectUrl from "src/squads/payment/hooks/useGoBackToRedirectUrl";

interface NewOrderDialogWithFormProviderProps {
    studentInfo: ArrayElement<OrderFormValues["students"]>["studentInfo"];
}

const NewOrderDialogWithFormProvider = ({ studentInfo }: NewOrderDialogWithFormProviderProps) => {
    const handleCloseDialog = useGoBackToRedirectUrl();

    const hookFormMethods = useForm<OrderFormValues>({
        defaultValues: {
            students: [
                {
                    studentInfo,
                    productFieldArrayItems: defaultProductFieldArrayItems,
                },
            ],
        },
    });

    return (
        <FormProvider {...hookFormMethods}>
            <NewOrderDialog isOpen onClose={handleCloseDialog} />
        </FormProvider>
    );
};

export default NewOrderDialogWithFormProvider;
