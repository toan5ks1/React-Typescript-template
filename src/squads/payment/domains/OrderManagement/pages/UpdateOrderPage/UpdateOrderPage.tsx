import { FormProvider, useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router";
import { parseQuery } from "src/common/utils/query";
import { getCurrentCurrency } from "src/squads/payment/helpers/price";
import { getSelectedStudentIdsFromQuery } from "src/squads/payment/helpers/student";
import { ArrayElement } from "src/squads/payment/types/common/array";
import {
    OrderFormValues,
    ProductsFormValues,
} from "src/squads/payment/types/form/order-form-types";
import {
    isValidQueryField,
    parseQueryParameterToStringArray,
} from "src/squads/payment/utils/types";

import Loading from "src/components/Loading";
import NotFound from "src/components/NotFound";
import UpdateOrderDialog from "src/squads/payment/domains/OrderManagement/components/Dialogs/UpdateOrderDialog";
import { updateOrderNotImplementedYetPlugins } from "src/squads/payment/domains/OrderManagement/plugins/common/components/NotImplementedYetPlugins";

import { OrderType } from "manabuf/payment/v1/enums_pb";

import useLocationNameById from "src/squads/payment/domains/OrderManagement/hooks/useLocationNameById";
import useUpdateOrderProduct from "src/squads/payment/domains/OrderManagement/hooks/useUpdateOrderProduct";
import ProductExtensionPluginsProvider from "src/squads/payment/domains/OrderManagement/plugins/new-order";
import useFetchStudentInfo from "src/squads/payment/hooks/useFetchStudentInfo";

interface UpdateOrderDialogWithFormProvider {
    studentInfo: ArrayElement<OrderFormValues["students"]>["studentInfo"];
    locationInfo: OrderFormValues["location"];
    products: ProductsFormValues[];
}

const UpdateOrderDialogWithFormProvider = ({
    studentInfo,
    locationInfo,
    products,
}: UpdateOrderDialogWithFormProvider) => {
    const history = useHistory();
    const { search } = useLocation();

    const hookFormMethods = useForm<OrderFormValues>({
        defaultValues: {
            students: [
                {
                    studentInfo,
                    productFieldArrayItems: products,
                    comment: "",
                },
            ],
            location: locationInfo,
        },
    });

    const handleCloseDialog = () => {
        const queryParams = new URLSearchParams(search);
        const redirectUrl = queryParams.get("redirectUrl");
        redirectUrl ? history.push(redirectUrl) : history.goBack();
    };

    return (
        <FormProvider {...hookFormMethods}>
            <UpdateOrderDialog isOpen onClose={handleCloseDialog} defaultProducts={products} />
        </FormProvider>
    );
};

const UpdateOrderPage = () => {
    const { studentId, locationId, studentProductId } = parseQuery();
    const selectedLocationId = isValidQueryField(locationId);
    const selectedStudentProductId = parseQueryParameterToStringArray(studentProductId);

    const { currentCurrency } = getCurrentCurrency();

    const { data: studentInfo, isFetching: isFetchingStudent } = useFetchStudentInfo({
        studentIds: getSelectedStudentIdsFromQuery(studentId),
    });

    const { data: locationName, isFetching: isFetchingLocation } = useLocationNameById({
        locationId: selectedLocationId ?? "",
    });

    const { updateOrderProducts, isFetching: isFetchingProduct } = useUpdateOrderProduct({
        studentProductIds: selectedStudentProductId,
    });

    const fetchingData = isFetchingStudent || isFetchingLocation || isFetchingProduct;

    if (fetchingData) return <Loading />;

    if (
        typeof studentInfo === "undefined" ||
        typeof locationName?.name !== "string" ||
        typeof selectedLocationId !== "string" ||
        typeof selectedStudentProductId === "undefined"
    )
        return <NotFound data-testid="UpdateOrderPage__notfound" />;

    return (
        <ProductExtensionPluginsProvider
            currency={currentCurrency}
            orderType={OrderType.ORDER_TYPE_UPDATE}
            notImplementedYetPlugins={updateOrderNotImplementedYetPlugins}
        >
            <UpdateOrderDialogWithFormProvider
                studentInfo={studentInfo}
                locationInfo={{
                    locationId: selectedLocationId,
                    name: locationName.name,
                }}
                products={updateOrderProducts}
            />
        </ProductExtensionPluginsProvider>
    );
};

export default UpdateOrderPage;
