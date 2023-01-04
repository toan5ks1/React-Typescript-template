import { createMockPackageBasedFrequencyProductPrices } from "src/squads/payment/test-utils/mocks/price";
import { createBasedPackageCourseList } from "src/squads/payment/test-utils/mocks/recurring-products";

import {
    getProductPricesBySlotOrWeight,
    getProductPriceWithSlot,
    getTotalCoursesSlot,
    getTotalCoursesWeight,
} from "src/squads/payment/domains/OrderManagement/plugins/new-order/helpers/price";

const mockPackageCourses = createBasedPackageCourseList();
const totalCoursesSlot = getTotalCoursesSlot(mockPackageCourses);
const totalCoursesWeight = getTotalCoursesWeight(mockPackageCourses);
const productPrices = createMockPackageBasedFrequencyProductPrices();

describe("getProductPricesBySlotOrWeight", () => {
    it("should return correct product price list with total slot", () => {
        const productPricesWithSlot = getProductPricesBySlotOrWeight({
            getTotalCoursesQuantity: getTotalCoursesSlot,
            productPrices: productPrices || [],
            packageCourses: mockPackageCourses,
        });

        productPricesWithSlot.forEach((productPrice) => {
            expect(productPrice.quantity).toBe(totalCoursesSlot);
        });
    });

    it("should return correct product price list with total weight", () => {
        const productPricesWithSlot = getProductPricesBySlotOrWeight({
            getTotalCoursesQuantity: getTotalCoursesWeight,
            productPrices: productPrices || [],
            packageCourses: mockPackageCourses,
        });

        productPricesWithSlot.forEach((productPrice) => {
            expect(productPrice.quantity).toBe(totalCoursesWeight);
        });
    });

    test.each([
        { productPrices: productPrices, packageCourses: undefined },
        { productPrices: undefined, packageCourses: mockPackageCourses },
    ])(
        "should return empty array if productPrices or packageCourses is undefined",
        ({ productPrices, packageCourses }) => {
            const productPricesWithSlot = getProductPricesBySlotOrWeight({
                getTotalCoursesQuantity: jest.fn(),
                productPrices,
                packageCourses,
            });

            expect(productPricesWithSlot).toEqual(new Array());
        }
    );
});

describe("getProductPriceWithSlot", () => {
    it("should return correct product price with total slot", () => {
        const productPriceWithSlot = getProductPriceWithSlot(mockPackageCourses, productPrices);
        expect(productPriceWithSlot?.quantity).toBe(totalCoursesSlot);
    });

    test.each([
        { productPrices: productPrices, packageCourses: undefined },
        { productPrices: undefined, packageCourses: mockPackageCourses },
    ])(
        "should return undefined if productPrices or packageCourses is not defined",
        ({ productPrices, packageCourses }) => {
            const productPriceWithSlot = getProductPriceWithSlot(packageCourses, productPrices);

            expect(productPriceWithSlot).toBeUndefined();
        }
    );
});
