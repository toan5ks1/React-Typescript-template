import { UseFormProps } from "react-hook-form";
import { createMockCompleteOrderFormValues } from "src/squads/payment/test-utils/mocks/order-form";
import { OrderFormValues } from "src/squads/payment/types/form/order-form-types";

import PackageProductDetails, {
    PackageProductDetailsProps,
} from "src/squads/payment/domains/OrderManagement/plugins/new-order/components/PackageProductDetails/PackageProductDetails";

import { PackageType } from "manabuf/payment/v1/enums_pb";

import { render } from "@testing-library/react";
import MuiPickersUtilsProvider from "src/squads/payment/contexts/MuiPickersUtilsProvider";
import TestApp from "src/squads/payment/test-utils/TestApp";
import TestHookFormProvider from "src/squads/payment/test-utils/TestHookFormProvider";
import TestQueryWrapper from "src/squads/payment/test-utils/TestQueryWrapper";

const defaultOrderFormValues = createMockCompleteOrderFormValues();
const defaultOrderFormProductOption: UseFormProps<OrderFormValues> = {
    defaultValues: { ...defaultOrderFormValues },
};
const productIndex = 0;
const firstStudentIndex = 0;
const defaultPackageProductDetailsProps: PackageProductDetailsProps = {
    productFieldItemIndex: productIndex,
    studentIndex: firstStudentIndex,
    isDatePickerDisabled: true,
    children: <>Child Element</>,
    packageType: PackageType.PACKAGE_TYPE_ONE_TIME,
};

const renderPackageProductDetails = (
    packageProductDetailsProps: PackageProductDetailsProps = defaultPackageProductDetailsProps,
    useFormOptions: UseFormProps<OrderFormValues> = defaultOrderFormProductOption
) => {
    return render(
        <TestApp>
            <MuiPickersUtilsProvider>
                <TestQueryWrapper>
                    <TestHookFormProvider<OrderFormValues> useFormOptions={useFormOptions}>
                        <PackageProductDetails {...packageProductDetailsProps} />
                    </TestHookFormProvider>
                </TestQueryWrapper>
            </MuiPickersUtilsProvider>
        </TestApp>
    );
};

describe("<PackageProductDetails />", () => {
    it("should render Package Product discount autocomplete, date picker, and children", () => {
        const wrapper = renderPackageProductDetails();

        expect(wrapper.getByTestId("PackageProductDetails__packageInfo")).toBeInTheDocument();
        expect(wrapper.getByTestId("DiscountsAutocompleteHF__autocomplete")).toBeInTheDocument();
        expect(wrapper.getByTestId("DatePickerHF__input")).toBeInTheDocument();

        expect(wrapper.getByText("Child Element")).toBeInTheDocument();
    });
});
