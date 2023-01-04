import { getCurrentCurrency } from "src/squads/payment/helpers/price";
import { createMockUpdateOrderFormValues } from "src/squads/payment/test-utils/mocks/order-form-update";

import UpdateOrderPreviewItem, {
    UpdateOrderPreviewItemProps,
} from "src/squads/payment/domains/OrderManagement/components/UpdateOrderPreview/UpdateOrderPreviewItem";
import { updateOrderNotImplementedYetPlugins } from "src/squads/payment/domains/OrderManagement/plugins/common/components/NotImplementedYetPlugins";

import { OrderType } from "manabuf/payment/v1/enums_pb";

import { render } from "@testing-library/react";
import ProductExtensionPluginsProvider from "src/squads/payment/domains/OrderManagement/plugins/new-order";
import TestApp from "src/squads/payment/test-utils/TestApp";
import TestQueryWrapper from "src/squads/payment/test-utils/TestQueryWrapper";

const mockOrderFormValues = createMockUpdateOrderFormValues();
const firstStudentIndex = 0;
const mockProductFieldItem =
    mockOrderFormValues.students[firstStudentIndex].productFieldArrayItems[0];
const mockProductFieldItemCancelled =
    mockOrderFormValues.students[firstStudentIndex].productFieldArrayItems[1];
const { currentCurrency: currency } = getCurrentCurrency();

const mockUpdateOrderPreviewItemProps: UpdateOrderPreviewItemProps = {
    productFieldItem: mockProductFieldItem,
};

const mockCancelledUpdateOrderPreviewItemProps: UpdateOrderPreviewItemProps = {
    productFieldItem: mockProductFieldItemCancelled,
};

const renderUpdateOrderPreviewItem = (
    updateOrderPreviewItemProps: UpdateOrderPreviewItemProps = mockUpdateOrderPreviewItemProps
) => {
    return render(
        <TestApp>
            <TestQueryWrapper>
                <ProductExtensionPluginsProvider
                    currency={currency}
                    orderType={OrderType.ORDER_TYPE_UPDATE}
                    notImplementedYetPlugins={updateOrderNotImplementedYetPlugins}
                >
                    <UpdateOrderPreviewItem {...updateOrderPreviewItemProps} />
                </ProductExtensionPluginsProvider>
            </TestQueryWrapper>
        </TestApp>
    );
};

describe("<UpdateOrderPreviewItem />", () => {
    it("should render product name of active product", () => {
        const wrapper = renderUpdateOrderPreviewItem();

        expect(wrapper.getByText(mockProductFieldItem.product?.name ?? "")).toBeInTheDocument();
        expect(wrapper.queryByText("[Cancelled]")).not.toBeInTheDocument();
    });

    it("should render canclled tag when product is cancelled", () => {
        const wrapper = renderUpdateOrderPreviewItem(mockCancelledUpdateOrderPreviewItemProps);

        expect(wrapper.getByText("[Cancelled]")).toBeInTheDocument();
    });
});
