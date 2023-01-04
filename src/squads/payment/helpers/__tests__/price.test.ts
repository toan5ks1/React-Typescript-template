import { OrderCurrency, OrderCurrencySymbol } from "src/squads/payment/constants/enum";
import {
    calculatePriceWithBillingRatio,
    getCurrentCurrency,
    getDiscountPriceByType,
    getFormattedItemPrice,
    getProductTaxPrice,
    getTotalProductPrice,
    getTotalValueForBilledAtOrderItems,
} from "src/squads/payment/helpers/price";
import { createMockDiscountChoices } from "src/squads/payment/test-utils/mocks/discount";
import { createMockBilledAtOrderProductsList } from "src/squads/payment/test-utils/mocks/products";

const mockProductDiscounts = createMockDiscountChoices();

describe("getCurrentCurrency", () => {
    it("should return YEN at current", () => {
        const { currentCurrency, currentCurrencySymbol } = getCurrentCurrency();

        expect(currentCurrency).toEqual(OrderCurrency.JAPANESE_YEN);
        expect(currentCurrencySymbol).toEqual(OrderCurrencySymbol.JAPANESE_YEN);
    });
});

describe("getDiscountPriceByType", () => {
    const productPrice: number = 150;

    it("should return discount price based on discount type", () => {
        expect(getDiscountPriceByType(mockProductDiscounts[0], productPrice)).toEqual(
            mockProductDiscounts[0].discount_amount_value
        );

        expect(getDiscountPriceByType(mockProductDiscounts[1], productPrice)).toEqual(
            Math.round(productPrice * (mockProductDiscounts[1].discount_amount_value / 100))
        );

        expect(getDiscountPriceByType(mockProductDiscounts[3], productPrice)).toEqual(
            mockProductDiscounts[3].discount_amount_value
        );
    });
});

describe("getProductTaxPrice", () => {
    it("should return product tax", () => {
        const productPrice = 1000;
        const discountPrice = 250;
        const taxPercentage = 5;
        const productPriceWithDiscount = productPrice - discountPrice;
        const productTax = (productPriceWithDiscount * taxPercentage) / (100 + taxPercentage);

        expect(getProductTaxPrice(productPrice, discountPrice, taxPercentage)).toEqual(productTax);
    });
});

describe("getFormattedItemPrice", () => {
    const currency = OrderCurrency.JAPANESE_YEN;
    const itemPrice = 10;

    it("should append negative sign on discounts", () => {
        const isDiscount = true;
        expect(getFormattedItemPrice(currency, isDiscount, itemPrice)).toEqual(`-￥${itemPrice}`);
    });

    it("should not append negative signs on not discounts", () => {
        const isDiscount = false;
        expect(getFormattedItemPrice(currency, isDiscount, itemPrice)).toEqual(`￥${itemPrice}`);
    });
});

describe("getTotalProductPrice", () => {
    const price = 10000;
    const { currentCurrency, currentCurrencySymbol } = getCurrentCurrency();

    it("should return 0 when price is undefined", () => {
        const price = undefined as unknown as number;
        const amount = getTotalProductPrice(price, currentCurrency, mockProductDiscounts[0]);
        expect(amount).toEqual(`${currentCurrencySymbol}0`);
    });

    it("should return price without discountAmount", () => {
        const undefinedDiscountAmount = {
            ...mockProductDiscounts[0],
            discount_amount_value: undefined as unknown as number,
        };

        const amount = getTotalProductPrice(price, currentCurrency, undefinedDiscountAmount);

        expect(amount).toEqual(`${currentCurrencySymbol}10000`);
    });

    it("should return amount correctly with discountAmount", () => {
        const amount = getTotalProductPrice(price, currentCurrency, mockProductDiscounts[1]);

        expect(amount).toEqual(`${currentCurrencySymbol}8775`);
    });
});

describe("getTotalValueForItems", () => {
    it("should return total value of billedAtOrderProducts", () => {
        let expectedTotalValue: number = 0;
        const mockBilledAtOrderProductsList = createMockBilledAtOrderProductsList();
        mockBilledAtOrderProductsList.forEach((item) => {
            expectedTotalValue += item.productPrice - item.discountPrice;
        });

        const totalValue = getTotalValueForBilledAtOrderItems(mockBilledAtOrderProductsList);
        expect(totalValue).toEqual(expectedTotalValue);
    });
});

describe("calculatePriceWithBillingRatio", () => {
    it("should return price calculated by billing ratio", () => {
        const productPrice = 200;
        const billingRatioNumerator = 1;
        const billingRatioDenominator = 4;

        const finalPrice: number = (productPrice * billingRatioNumerator) / billingRatioDenominator;
        expect(
            calculatePriceWithBillingRatio({
                productPrice,
                billingRatioNumerator,
                billingRatioDenominator,
            })
        ).toBe(finalPrice);
    });

    it("should return product price if there is no billing ratio", () => {
        const productPrice = 200;
        const billingRatioNumerator = undefined;
        const billingRatioDenominator = undefined;

        expect(
            calculatePriceWithBillingRatio({
                productPrice,
                billingRatioNumerator,
                billingRatioDenominator,
            })
        ).toBe(productPrice);
    });

    it("should return 0 if billing ratio numerator is 0", () => {
        const productPrice = 200;
        const billingRatioNumerator = 0;
        const billingRatioDenominator = 4;

        expect(
            calculatePriceWithBillingRatio({
                productPrice,
                billingRatioNumerator,
                billingRatioDenominator,
            })
        ).toBe(0);
    });
});
