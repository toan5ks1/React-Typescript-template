import { FormProvider, useForm } from "react-hook-form";
import { parseQuery } from "src/common/utils/query";
import { getSelectedStudentIdsFromQuery } from "src/squads/payment/helpers/student";
import { CustomBillingOrderFormValue } from "src/squads/payment/types/form/custom-billing-types";

import Loading from "src/components/Loading";
import NotFound from "src/components/NotFound";
import CustomBillingOrderDialog from "src/squads/payment/domains/OrderManagement/components/Dialogs/CustomBillingOrderDialog";

import useFetchStudentInfo from "src/squads/payment/hooks/useFetchStudentInfo";
import useGoBackToRedirectUrl from "src/squads/payment/hooks/useGoBackToRedirectUrl";

interface CustomBillingOrderDialogWithFormProviderProps {
    studentInfo: CustomBillingOrderFormValue["student"];
}

const CustomBillingOrderDialogWithFormProvider = ({
    studentInfo,
}: CustomBillingOrderDialogWithFormProviderProps) => {
    const hookFormMethods = useForm<CustomBillingOrderFormValue>({
        defaultValues: {
            student: studentInfo,
            billingFieldArrayItem: [],
        },
    });

    const handleCloseDialog = useGoBackToRedirectUrl();

    return (
        <FormProvider {...hookFormMethods}>
            <CustomBillingOrderDialog isOpen onClose={handleCloseDialog} />
        </FormProvider>
    );
};

const CustomBillingOrderPage = () => {
    const { studentId } = parseQuery();

    const { data: studentInfo, isFetching: isFetchingStudent } = useFetchStudentInfo({
        studentIds: getSelectedStudentIdsFromQuery(studentId),
    });

    if (isFetchingStudent) return <Loading />;

    if (typeof studentInfo === "undefined")
        return <NotFound data-testid="CustomBillingOrderPage__notfound" />;

    return <CustomBillingOrderDialogWithFormProvider studentInfo={studentInfo} />;
};

export default CustomBillingOrderPage;
