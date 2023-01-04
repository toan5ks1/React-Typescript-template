import { render, screen } from "@testing-library/react";
import TranslationProvider from "src/squads/payment/contexts/TranslationProvider";
import useBillingItemName, {
    UseBillingItemNameProps,
} from "src/squads/payment/domains/OrderManagement/hooks/useBillingItemName/useBillingItemName";

describe("useBillingItemName", () => {
    const defaultProps: UseBillingItemNameProps = {
        productName: "product name",
        billingSchedulePeriodName: "billing period name",
        billingRatioNumerator: undefined,
        billingRatioDenominator: undefined,
    };

    const BillingItemName = (props: UseBillingItemNameProps) => {
        const billingItemName = useBillingItemName(props);
        return <div>{billingItemName}</div>;
    };

    const TestComponent = (props: UseBillingItemNameProps) => {
        return (
            <TranslationProvider>
                <BillingItemName {...props} />
            </TranslationProvider>
        );
    };

    it("should return product name without billing ratio when billingRatioNumerator and billingRatioDenominator are not provided", () => {
        const props = { ...defaultProps };
        render(<TestComponent {...props} />);

        const billingItemName = `${props.productName} - ${props.billingSchedulePeriodName}`;
        expect(screen.getByText(billingItemName)).toBeInTheDocument();
    });

    it("should return product name with billing ratio when billingRatioNumerator and billingRatioDenominator are provided", () => {
        const props: UseBillingItemNameProps = {
            ...defaultProps,
            billingRatioNumerator: 1,
            billingRatioDenominator: 4,
        };
        render(<TestComponent {...props} />);

        const billingItemName = `${props.productName} - ${props.billingSchedulePeriodName} (billing ratio: ${props.billingRatioNumerator}/${props.billingRatioDenominator})`;
        expect(screen.getByText(billingItemName)).toBeInTheDocument();
    });

    it("should return product name with billing ratio when billingRatioNumerator = 0 and billingRatioDenominator are provided", () => {
        const props: UseBillingItemNameProps = {
            ...defaultProps,
            billingRatioNumerator: 0,
            billingRatioDenominator: 4,
        };
        render(<TestComponent {...props} />);

        const billingItemName = `${props.productName} - ${props.billingSchedulePeriodName} (billing ratio: ${props.billingRatioNumerator}/${props.billingRatioDenominator})`;
        expect(screen.getByText(billingItemName)).toBeInTheDocument();
    });

    it("should return product name without billing ratio when billingRatioDenominator is not provided", () => {
        const props: UseBillingItemNameProps = { ...defaultProps, billingRatioDenominator: 1 };
        render(<TestComponent {...props} />);

        const billingItemName = `${props.productName} - ${props.billingSchedulePeriodName}`;
        expect(screen.getByText(billingItemName)).toBeInTheDocument();
    });

    it("should return only product name when billingSchedulePeriodName and billingRatioDenominator are not provided", () => {
        const props: UseBillingItemNameProps = {
            ...defaultProps,
            billingSchedulePeriodName: undefined,
        };
        render(<TestComponent {...props} />);

        expect(screen.getByText(props.productName)).toBeInTheDocument();
    });
});
