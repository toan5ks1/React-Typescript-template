import { UseFormProps } from "react-hook-form";
import { getCurrentCurrency } from "src/squads/payment/helpers/price";
import { createMockCompleteOrderFormValues } from "src/squads/payment/test-utils/mocks/order-form";
import { mockUpdateProducts } from "src/squads/payment/test-utils/mocks/order-form-update";
import { OrderFormValues } from "src/squads/payment/types/form/order-form-types";

import UpcomingBillingSection from "src/squads/payment/components/Sections/UpcomingBillingSection";
import { updateOrderNotImplementedYetPlugins } from "src/squads/payment/domains/OrderManagement/plugins/common/components/NotImplementedYetPlugins";

import { OrderType } from "manabuf/payment/v1/enums_pb";

import { render } from "@testing-library/react";
import TranslationProvider from "src/squads/payment/contexts/TranslationProvider";
import ProductExtensionPluginsProvider from "src/squads/payment/domains/OrderManagement/plugins/new-order";
import TestHookFormProvider from "src/squads/payment/test-utils/TestHookFormProvider";

const firstStudentIndex = 0;

const defaultMockOrderFormValues = createMockCompleteOrderFormValues();
const { currentCurrency: currency } = getCurrentCurrency();

const updateOrderMockFormValues = mockUpdateProducts()[0];
const updateFormOptions: UseFormProps<OrderFormValues> = {
    defaultValues: {
        students: [
            {
                studentInfo: defaultMockOrderFormValues.students[firstStudentIndex].studentInfo,
                productFieldArrayItems: [updateOrderMockFormValues],
            },
        ],
        location: defaultMockOrderFormValues.location,
    },
};

const renderUpdateOrderUpcomingBillingSection = (
    useFormOptions: UseFormProps<OrderFormValues> = updateFormOptions
) => {
    return render(
        <TranslationProvider>
            <ProductExtensionPluginsProvider
                currency={currency}
                orderType={OrderType.ORDER_TYPE_UPDATE}
                notImplementedYetPlugins={updateOrderNotImplementedYetPlugins}
            >
                <TestHookFormProvider<OrderFormValues> useFormOptions={useFormOptions}>
                    <UpcomingBillingSection studentIndex={firstStudentIndex} />
                </TestHookFormProvider>
            </ProductExtensionPluginsProvider>
        </TranslationProvider>
    );
};

describe("<UpcomingBillingSection/>  UpdateOrder One Time Material", () => {
    it("should show no information", () => {
        const wrapper = renderUpdateOrderUpcomingBillingSection();

        expect(wrapper.getByTestId("UpcomingBillingSection__noDataContainer")).toBeInTheDocument();
        expect(wrapper.getByText("No Information")).toBeInTheDocument();
    });
});
