import { KeyTaxCategoryTypes } from "src/squads/payment/constants/const";
import { getProductTaxPrice } from "src/squads/payment/helpers/price";
import { getTaxValuesForBilledAtOrderItems } from "src/squads/payment/helpers/tax";
import { createMockBilledAtOrderProductsList } from "src/squads/payment/test-utils/mocks/products";
import { taxDataList } from "src/squads/payment/test-utils/mocks/tax";

const mockBilledAtOrderProductsList = createMockBilledAtOrderProductsList()[0];

describe("getTaxValuesForBilledAtOrderItems", () => {
    const { productPrice, discountPrice } = mockBilledAtOrderProductsList;

    test.each(taxDataList)("should return correct billed At Order Tax Inclusions", (productTax) => {
        const { tax_category, tax_percentage } = productTax;

        const billedAtOrderTaxInclusions = getTaxValuesForBilledAtOrderItems([
            { ...mockBilledAtOrderProductsList, productTax: productTax },
        ]);

        let taxPrice: number | undefined = undefined;

        switch (tax_category) {
            case KeyTaxCategoryTypes.TAX_CATEGORY_INCLUSIVE:
                taxPrice = getProductTaxPrice(productPrice, discountPrice, tax_percentage);
                break;
            case KeyTaxCategoryTypes.TAX_CATEGORY_EXCLUSIVE:
            case KeyTaxCategoryTypes.TAX_CATEGORY_NONE:
                break;
        }

        expect(billedAtOrderTaxInclusions[productTax.tax_percentage]).toEqual(taxPrice);
    });
});
