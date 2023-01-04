import { arrayHasItem } from "src/common/utils/other";
import {
    createPackageCourses,
    createSlotBasedPackageCourses,
} from "src/squads/payment/test-utils/mocks/package-course";
import {
    createMockProductChoices,
    createMockProductPriceList,
} from "src/squads/payment/test-utils/mocks/products";
import { ProductAndProductExtensionType } from "src/squads/payment/types/service/product-types";

import { BilledAtOrderItemType } from "src/squads/payment/components/Sections/BilledAtOrderSection/types";
import ProductExtensionPluginsProvider, {
    useProductPluginsContext,
} from "src/squads/payment/domains/OrderManagement/plugins/common/providers/ProductExtensionPluginsProvider";
import PackageCourseBilledAtOrderDetail, {
    PackageCourseBilledDetailProps,
} from "src/squads/payment/domains/OrderManagement/plugins/new-order/components/PackageCourseBilledDetail/PackageCourseBilledDetail";

import { render, within } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { OrderPluginFunctions } from "src/squads/payment/domains/OrderManagement/plugins/new-order/types";

const mockPackageCourses = createPackageCourses();
const mockSlotBasedPackageCourses = createSlotBasedPackageCourses();
const products = createMockProductChoices();
const productPrices = createMockProductPriceList();
const productIndex = 0;

const defaultPackageCourseBilledDetailProps: PackageCourseBilledDetailProps = {
    packageCourses: mockPackageCourses,
};

const renderOneTimePackageCourseDetail = (
    oneTimePackageCourseDetail: PackageCourseBilledDetailProps = defaultPackageCourseBilledDetailProps
) => {
    return render(<PackageCourseBilledAtOrderDetail {...oneTimePackageCourseDetail} />);
};

describe("<PackageCourseBilledAtOrderDetail />", () => {
    let getProductPluginsMap: (
        productAndProductExtensionType: ProductAndProductExtensionType
    ) => OrderPluginFunctions;

    beforeEach(() => {
        const {
            result: { current },
        } = renderHook(() => useProductPluginsContext(), {
            wrapper: ProductExtensionPluginsProvider,
        });
        getProductPluginsMap = current.getProductPluginsMap;
    });

    it("should and matched correct product price according to courses weight", () => {
        const productFieldArrayItem = [
            {
                product: products[productIndex],
                productPrices,
                packageCourses: mockPackageCourses,
            },
        ];

        const mockProductAndProductExtension: ProductAndProductExtensionType = {
            productEntityType: "packageEntity",
            productExtensionType: "PACKAGE_TYPE_ONE_TIME",
        };

        const billedAtOrderProducts = productFieldArrayItem.reduce(
            (billedAtOrderProducts: BilledAtOrderItemType[], productFieldArrayItem) => {
                if (
                    !productFieldArrayItem.product ||
                    !arrayHasItem(productFieldArrayItem.productPrices)
                ) {
                    return [...billedAtOrderProducts];
                }

                const { generateBilledAtOrderBillingItems } = getProductPluginsMap(
                    mockProductAndProductExtension
                );

                return [
                    ...billedAtOrderProducts,
                    ...generateBilledAtOrderBillingItems(productFieldArrayItem),
                ];
            },
            []
        );

        const productPrice = billedAtOrderProducts.map(
            (billedAtOrderProduct) => billedAtOrderProduct.productPrice
        );

        expect(productPrice[productIndex]).toEqual(
            productFieldArrayItem[productIndex].productPrices[productIndex].price
        );
    });

    it("should and matched correct product price according to courses selected slot", () => {
        const productFieldArrayItem = [
            {
                product: products[productIndex],
                productPrices,
                packageCourses: mockSlotBasedPackageCourses,
            },
        ];

        const mockProductAndProductExtension: ProductAndProductExtensionType = {
            productEntityType: "packageEntity",
            productExtensionType: "PACKAGE_TYPE_SLOT_BASED",
        };

        const billedAtOrderProducts = productFieldArrayItem.reduce(
            (billedAtOrderProducts: BilledAtOrderItemType[], productFieldArrayItem) => {
                if (
                    !productFieldArrayItem.product ||
                    !arrayHasItem(productFieldArrayItem.productPrices)
                ) {
                    return [...billedAtOrderProducts];
                }

                const { generateBilledAtOrderBillingItems } = getProductPluginsMap(
                    mockProductAndProductExtension
                );

                return [
                    ...billedAtOrderProducts,
                    ...generateBilledAtOrderBillingItems(productFieldArrayItem),
                ];
            },
            []
        );

        const productPrice = billedAtOrderProducts.map(
            (billedAtOrderProduct) => billedAtOrderProduct.productPrice
        );

        expect(productPrice[productIndex]).toEqual(
            productFieldArrayItem[productIndex].productPrices[productIndex].price
        );
    });

    test.each(mockPackageCourses)(
        "should render the correct course name when product Extension Type is PACKAGE_TYPE_ONE_TIME or PACKAGE_TYPE_SCHEDULED",
        ({ course }) => {
            const wrapper = renderOneTimePackageCourseDetail({
                ...defaultPackageCourseBilledDetailProps,
            });

            const courseName = wrapper.getByTestId("PackageCourseBilledDetail__course");

            expect(wrapper.getByTestId("MenuItemLink__root")).toBeInTheDocument();
            expect(within(courseName).getByText(course.name ?? "")).toBeInTheDocument();
        }
    );

    test.each(mockPackageCourses)(
        "should render the  correct course name when product Extension Type is PACKAGE_TYPE_SLOT_BASED",
        ({ course, slot }) => {
            const wrapper = renderOneTimePackageCourseDetail({
                ...defaultPackageCourseBilledDetailProps,
                renderCourseSlot: (slot) => ` (${slot})`,
            });

            const courseName = wrapper.getByTestId("PackageCourseBilledDetail__course");

            expect(wrapper.getByTestId("MenuItemLink__root")).toBeInTheDocument();
            expect(within(courseName).getByText(`${course.name} (${slot})`)).toBeInTheDocument();
        }
    );

    test.each(mockPackageCourses)(
        "should render the  correct course name when product Extension Type is PACKAGE_TYPE_FREQUENCY",
        ({ course, slot }) => {
            const wrapper = renderOneTimePackageCourseDetail({
                ...defaultPackageCourseBilledDetailProps,
                renderCourseSlot: (slot) => ` (${slot}/wk)`,
            });

            const courseName = wrapper.getByTestId("PackageCourseBilledDetail__course");

            expect(wrapper.getByTestId("MenuItemLink__root")).toBeInTheDocument();
            expect(within(courseName).getByText(`${course.name} (${slot}/wk)`)).toBeInTheDocument();
        }
    );
});
