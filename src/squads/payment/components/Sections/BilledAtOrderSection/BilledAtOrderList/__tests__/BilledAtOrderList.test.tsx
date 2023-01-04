import { getCurrentCurrency, getFormattedItemPrice } from "src/squads/payment/helpers/price";
import { createMockBilledAtOrderProductsList } from "src/squads/payment/test-utils/mocks/products";

import BilledAtOrderList, {
    BilledAtOrderListProps,
} from "src/squads/payment/components/Sections/BilledAtOrderSection/BilledAtOrderList";
import { defaultNotImplementedYetPlugins } from "src/squads/payment/domains/OrderManagement/plugins/common/components/NotImplementedYetPlugins";

import { OrderType } from "manabuf/payment/v1/enums_pb";

import { render, within } from "@testing-library/react";
import TranslationProvider from "src/squads/payment/contexts/TranslationProvider";
import ProductExtensionPluginsProvider from "src/squads/payment/domains/OrderManagement/plugins/new-order";

const taxInclusionPercentage = 10;
const taxInclusionValue = 100;
const ODD_TAX_INCLUSION_PERCENTAGE = 5;
const ODD_TAX_INCLUSION_VALUE = 5;

const { currentCurrency: currency } = getCurrentCurrency();

const defaultBilledAtOrderListProps: BilledAtOrderListProps = {
    billedAtOrderProducts: createMockBilledAtOrderProductsList(),
    totalValue: 1000,
    currency: currency,
    taxInclusions: {
        [taxInclusionPercentage]: taxInclusionValue,
    },
};

interface TaxPercentageBilledAtOrderListTestResourceItem {
    props: BilledAtOrderListProps;
    expects: {
        taxInclusionValue: string;
        taxInclusionValueByFunction: string;
    };
}

interface TaxPercentageBilledAtOrderListTestResource {
    default: TaxPercentageBilledAtOrderListTestResourceItem;
    odd: TaxPercentageBilledAtOrderListTestResourceItem;
}

/**
Since tax inclusion value always same as each other when they caclulated from same function,
we should define some expectation for test without using any function. (for taxInclusionValue)
*/
const taxPercentageBilledAtOrderListTestResource: TaxPercentageBilledAtOrderListTestResource = {
    default: {
        props: defaultBilledAtOrderListProps,
        expects: {
            taxInclusionValue: "￥100",
            taxInclusionValueByFunction: getFormattedItemPrice(currency, false, taxInclusionValue),
        },
    },
    odd: {
        props: {
            ...defaultBilledAtOrderListProps,
            totalValue: 90,
            taxInclusions: {
                [ODD_TAX_INCLUSION_PERCENTAGE]: ODD_TAX_INCLUSION_VALUE,
            },
        },
        expects: {
            taxInclusionValue: "￥5",
            taxInclusionValueByFunction: getFormattedItemPrice(
                currency,
                false,
                ODD_TAX_INCLUSION_VALUE
            ),
        },
    },
};

const renderBilledAtOrderList = (
    billedAtOrderListProps: BilledAtOrderListProps = defaultBilledAtOrderListProps
) => {
    return render(
        <TranslationProvider>
            <ProductExtensionPluginsProvider
                currency={currency}
                orderType={OrderType.ORDER_TYPE_NEW}
                notImplementedYetPlugins={defaultNotImplementedYetPlugins}
            >
                <BilledAtOrderList {...billedAtOrderListProps} />
            </ProductExtensionPluginsProvider>
        </TranslationProvider>
    );
};

describe("<BilledAtOrderList />", () => {
    it("should render billed at order items, total, and tax", () => {
        const wrapper = renderBilledAtOrderList();

        const formattedTotalValue = getFormattedItemPrice(
            currency,
            false,
            defaultBilledAtOrderListProps.totalValue
        );

        expect(wrapper.getByTestId("BilledAtOrderList__container")).toBeInTheDocument();
        expect(wrapper.getByTestId("BilledAtOrderList__orderItemList")).toBeInTheDocument();
        expect(wrapper.getByTestId("BilledAtOrderList__taxInclusions")).toBeInTheDocument();

        const subtotalElement = wrapper.getByTestId("BilledAtOrderList__subtotal");
        expect(within(subtotalElement).getByText("Sub-total")).toBeInTheDocument();
        expect(within(subtotalElement).getByText(formattedTotalValue)).toBeInTheDocument();

        const totalElement = wrapper.getByTestId("BilledAtOrderList__total");
        expect(wrapper.getByText("Total")).toBeInTheDocument();
        expect(within(totalElement).getByText(formattedTotalValue)).toBeInTheDocument();
    });

    it("should calculate and render tax correctly with even (default) price and tax", () => {
        const {
            default: { props, expects },
        } = taxPercentageBilledAtOrderListTestResource;

        const wrapper = renderBilledAtOrderList(props);

        const taxInclusionElement = wrapper.getByTestId("BilledAtOrderList__taxInclusions");

        expect(
            within(taxInclusionElement).getByText(expects.taxInclusionValue)
        ).toBeInTheDocument();

        expect(
            within(taxInclusionElement).getByText(expects.taxInclusionValueByFunction)
        ).toBeInTheDocument();
    });

    it("should calculate and render tax correctly with odd price and tax", () => {
        const {
            odd: { props, expects },
        } = taxPercentageBilledAtOrderListTestResource;

        const wrapper = renderBilledAtOrderList(props);

        const taxInclusionElement = wrapper.getByTestId("BilledAtOrderList__taxInclusions");

        expect(
            within(taxInclusionElement).getByText(expects.taxInclusionValue)
        ).toBeInTheDocument();

        expect(
            within(taxInclusionElement).getByText(expects.taxInclusionValueByFunction)
        ).toBeInTheDocument();
    });
});
