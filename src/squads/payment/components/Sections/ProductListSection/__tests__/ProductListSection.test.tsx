import { MutableRefObject } from "react";

import { UseFormProps } from "react-hook-form";

import ProductListSection, {
    ProductListSectionProps,
    ProductListSectionRefs,
} from "../ProductListSection";

import { render, screen } from "@testing-library/react";
import TestApp from "src/squads/payment/test-utils/TestApp";
import TestHookFormProvider from "src/squads/payment/test-utils/TestHookFormProvider";
import TestQueryWrapper from "src/squads/payment/test-utils/TestQueryWrapper";
import TestThemeProvider from "src/squads/payment/test-utils/TestThemeProvider";

jest.mock("src/squads/payment/domains/OrderManagement/hooks/useProductExtension");
jest.mock("src/squads/payment/domains/OrderManagement/hooks/useTaxDetail");
jest.mock("src/squads/payment/domains/OrderManagement/hooks/useProductPriceDetail");
jest.mock("src/squads/payment/domains/OrderManagement/hooks/useBillingSchedulePeriods");

const defaultProductListSectionProps: ProductListSectionProps = {
    studentIndex: 0,
};

const defaultUseFormProps: UseFormProps = {
    defaultValues: {
        students: [
            {
                productFieldArrayItems: [],
            },
        ],
    },
};

const productListSectionRef: MutableRefObject<ProductListSectionRefs | undefined> = {
    current: {
        replace: jest.fn(),
    },
};

const renderProductListSectionComponent = (
    productListSectionProps: ProductListSectionProps = defaultProductListSectionProps,
    useFormProps: UseFormProps = defaultUseFormProps
) => {
    return render(
        <TestApp>
            <TestThemeProvider>
                <TestQueryWrapper>
                    <TestHookFormProvider useFormOptions={useFormProps}>
                        <ProductListSection
                            {...productListSectionProps}
                            ref={productListSectionRef}
                        />
                    </TestHookFormProvider>
                </TestQueryWrapper>
            </TestThemeProvider>
        </TestApp>
    );
};

describe("<ProductListSection /> render product list section", () => {
    it("should render correct title, add button and product list item detail in component", () => {
        renderProductListSectionComponent();

        expect(screen.getByTestId("TableAddDeleteRow__title")).toBeInTheDocument();
        expect(screen.getByTestId("TableAddDeleteRow__addButton")).toBeInTheDocument();
        expect(screen.getByTestId("TableAddDeleteRow__root")).toBeInTheDocument();
    });
});
