import { getCurrentCurrency } from "src/squads/payment/helpers/price";
import { createMockUpdateOrderFormValues } from "src/squads/payment/test-utils/mocks/order-form-update";

import UpdateOrderPreview, {
    UpdateOrderPreviewProps,
} from "src/squads/payment/domains/OrderManagement/components/UpdateOrderPreview";
import { updateOrderNotImplementedYetPlugins } from "src/squads/payment/domains/OrderManagement/plugins/common/components/NotImplementedYetPlugins";

import { OrderType } from "manabuf/payment/v1/enums_pb";

import { render } from "@testing-library/react";
import ProductExtensionPluginsProvider from "src/squads/payment/domains/OrderManagement/plugins/new-order";
import TestApp from "src/squads/payment/test-utils/TestApp";
import TestQueryWrapper from "src/squads/payment/test-utils/TestQueryWrapper";

const mockOrderFormValues = createMockUpdateOrderFormValues();
const { currentCurrency: currency } = getCurrentCurrency();
const firstStudentIndex = 0;
const mockUpdateOrderPreviewProps: UpdateOrderPreviewProps = {
    beforeProductFieldItem:
        mockOrderFormValues.students[firstStudentIndex].productFieldArrayItems[0],
    afterProductFieldItem:
        mockOrderFormValues.students[firstStudentIndex].productFieldArrayItems[1],
};

const renderUpdateOrderPreview = (
    updateOrderPreviewProps: UpdateOrderPreviewProps = mockUpdateOrderPreviewProps
) => {
    return render(
        <TestApp>
            <TestQueryWrapper>
                <ProductExtensionPluginsProvider
                    currency={currency}
                    orderType={OrderType.ORDER_TYPE_UPDATE}
                    notImplementedYetPlugins={updateOrderNotImplementedYetPlugins}
                >
                    <UpdateOrderPreview {...updateOrderPreviewProps} />
                </ProductExtensionPluginsProvider>
            </TestQueryWrapper>
        </TestApp>
    );
};

describe("<UpdateOrderPreview />", () => {
    it("should render before and after section of preview", () => {
        const wrapper = renderUpdateOrderPreview();

        expect(wrapper.getByText("Before Update Info")).toBeInTheDocument();
        expect(wrapper.getByText("After Update Info")).toBeInTheDocument();
    });
});
