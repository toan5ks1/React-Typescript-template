import { FormProvider, useForm } from "react-hook-form";
import { parseQuery } from "src/common/utils/query";
import { getCurrentCurrency } from "src/squads/payment/helpers/price";
import { getSelectedStudentIdsFromQuery } from "src/squads/payment/helpers/student";
import { ArrayElement } from "src/squads/payment/types/common/array";
import { OrderFormValues } from "src/squads/payment/types/form/order-form-types";

import Loading from "src/components/Loading";
import NotFound from "src/components/NotFound";
import EnrollmentOrderDialog from "src/squads/payment/domains/OrderManagement/components/Dialogs/EnrollmentOrderDialog";
import { defaultNotImplementedYetPlugins } from "src/squads/payment/domains/OrderManagement/plugins/common/components/NotImplementedYetPlugins";

import { OrderType } from "manabuf/payment/v1/enums_pb";

import { defaultProductFieldArrayItems } from "src/squads/payment/domains/OrderManagement/common/constants";
import ProductExtensionPluginsProvider from "src/squads/payment/domains/OrderManagement/plugins/new-order";
import useFetchStudentInfo from "src/squads/payment/hooks/useFetchStudentInfo";

interface EnrollmentOrderDialogWithFormProviderProps {
    studentInfo: ArrayElement<OrderFormValues["students"]>["studentInfo"];
}

const EnrollmentOrderDialogWithFormProvider = ({
    studentInfo,
}: EnrollmentOrderDialogWithFormProviderProps) => {
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
            <EnrollmentOrderDialog isOpen />
        </FormProvider>
    );
};

const EnrollmentOrderPage = () => {
    const { studentId } = parseQuery();

    const { currentCurrency } = getCurrentCurrency();

    const { data: studentInfo, isFetching: isFetchingStudent } = useFetchStudentInfo({
        studentIds: getSelectedStudentIdsFromQuery(studentId),
    });

    if (isFetchingStudent) return <Loading />;

    if (typeof studentInfo === "undefined")
        return <NotFound data-testid="EnrollmentOrderPage__notfound" />;

    return (
        <ProductExtensionPluginsProvider
            currency={currentCurrency}
            orderType={OrderType.ORDER_TYPE_ENROLLMENT}
            notImplementedYetPlugins={defaultNotImplementedYetPlugins}
        >
            <EnrollmentOrderDialogWithFormProvider studentInfo={studentInfo} />
        </ProductExtensionPluginsProvider>
    );
};

export default EnrollmentOrderPage;
