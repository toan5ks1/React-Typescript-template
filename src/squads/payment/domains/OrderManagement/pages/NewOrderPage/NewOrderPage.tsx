import { parseQuery } from "src/common/utils/query";
import { getCurrentCurrency } from "src/squads/payment/helpers/price";
import { getSelectedStudentIdsFromQuery } from "src/squads/payment/helpers/student";

import Loading from "src/components/Loading";
import NotFound from "src/components/NotFound";
import NewOrderDialogWithFormProvider from "src/squads/payment/domains/OrderManagement/components/Dialogs/NewOrderDialog/NewOrderDialogWithFormProvider";
import { defaultNotImplementedYetPlugins } from "src/squads/payment/domains/OrderManagement/plugins/common/components/NotImplementedYetPlugins";

import { OrderType } from "manabuf/payment/v1/enums_pb";

import ProductExtensionPluginsProvider from "src/squads/payment/domains/OrderManagement/plugins/new-order";
import useFetchStudentInfo from "src/squads/payment/hooks/useFetchStudentInfo";

const NewOrderPage = () => {
    const { studentId } = parseQuery();

    const { currentCurrency } = getCurrentCurrency();

    const { data: studentInfo, isFetching: isFetchingStudent } = useFetchStudentInfo({
        studentIds: getSelectedStudentIdsFromQuery(studentId),
    });

    if (isFetchingStudent) return <Loading />;

    if (typeof studentInfo === "undefined") return <NotFound data-testid="NewOrder__notfound" />;

    return (
        <ProductExtensionPluginsProvider
            currency={currentCurrency}
            orderType={OrderType.ORDER_TYPE_NEW}
            notImplementedYetPlugins={defaultNotImplementedYetPlugins}
        >
            <NewOrderDialogWithFormProvider studentInfo={studentInfo} />
        </ProductExtensionPluginsProvider>
    );
};

export default NewOrderPage;
