import { useHistory, useLocation } from "react-router";
import { convertTimestampToDate, formatDate } from "src/common/utils/time";
import { getCurrentCurrency, getFormattedItemPrice } from "src/squads/payment/helpers/price";
import { Payment_GetManyOrderItemsByStudentProductIdsQuery } from "src/squads/payment/service/fatima/fatima-types";
import { createMockOrderProducts } from "src/squads/payment/test-utils/mocks/order-products";
import { createMockPaginationWithTotalObject } from "src/squads/payment/test-utils/pagination";

import StudentBillingProductListTable, {
    StudentBillingProductListTableProps,
} from "src/squads/payment/domains/OrderManagement/components/Tables/StudentBillingProductListTable/StudentBillingProductListTable";

import {
    FeeType,
    MaterialType,
    PackageType,
    ProductType,
    QuantityType,
    StudentProductLabel,
    StudentProductStatus,
} from "manabuf/payment/v1/enums_pb";
import { RetrieveListOfOrderProductsResponse } from "manabuf/payment/v1/order_pb";

import { render } from "@testing-library/react";
import useOrderItemsByStudentProductIds from "src/squads/payment/domains/OrderManagement/hooks/useOrderItemsByStudentProductIds";
import StudentBillingPluginsProvider from "src/squads/payment/domains/OrderManagement/plugins/student-billing/StudentBillingPluginsProvider";
import useFeatureToggle from "src/squads/payment/hooks/useFeatureToggle";
import TestApp from "src/squads/payment/test-utils/TestApp";

jest.mock("react-router", () => {
    const originalModule = jest.requireActual("react-router");

    return {
        __esModule: true,
        ...originalModule,
        useHistory: jest.fn(() => ({
            push: jest.fn(),
        })),
        useLocation: jest.fn(),
    };
});

jest.mock("src/squads/payment/hooks/useFeatureToggle", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock(
    "src/squads/payment/domains/OrderManagement/hooks/useOrderItemsByStudentProductIds",
    () => ({
        __esModule: true,
        default: jest.fn(),
    })
);

const historyPush = jest.fn();

const { currentCurrency } = getCurrentCurrency();

interface StudentBillingProductMock
    extends RetrieveListOfOrderProductsResponse.OrderProduct.AsObject {
    locationInfo: RetrieveListOfOrderProductsResponse.OrderProduct.LocationInfo.AsObject;
    discountInfo: RetrieveListOfOrderProductsResponse.OrderProduct.DiscountInfo.AsObject;
    duration: RetrieveListOfOrderProductsResponse.OrderProduct.Duration.AsObject;
}

const defaultMockProductRecurringMaterial: StudentBillingProductMock = {
    locationInfo: {
        locationName: "location 1",
        locationId: "location_id_1",
    },
    productName: "recurring material 1",
    productType: ProductType.PRODUCT_TYPE_MATERIAL,
    packageType: PackageType.PACKAGE_TYPE_NONE,
    quantityType: QuantityType.QUANTITY_TYPE_NONE,
    materialType: MaterialType.MATERIAL_TYPE_RECURRING,
    feeType: FeeType.FEE_TYPE_NONE,
    courseItemsList: [],
    status: StudentProductStatus.ORDERED,
    discountInfo: {
        discountName: "Discount 1",
        discountId: "discount_id_1",
    },
    duration: {
        from: {
            seconds: 1642460400,
            nanos: 0,
        },
        to: {
            seconds: 1660777200,
            nanos: 0,
        },
    },
    amount: 1000,
    upcomingBillingDate: {
        seconds: 1653082844,
        nanos: 222943000,
    },
    index: 1,
    productId: "product_id_1",
    studentProductId: "student_product_id_1",
    studentProductLabel: StudentProductLabel.CREATED,
    updatedFromStudentProductId: { value: "" },
    updatedToStudentProductId: { value: "" },
};

const mockOrderProducts = createMockOrderProducts();
const mockPagination = createMockPaginationWithTotalObject(5);

const defaultStudentBillingProductListTableProps: StudentBillingProductListTableProps = {
    studentId: "student_id_1",
    dataSource: mockOrderProducts,
    loading: false,
    pagination: mockPagination,
};

const mockOrderItemsData: Payment_GetManyOrderItemsByStudentProductIdsQuery["order_item"] = [
    {
        product_id: "product_id_1",
        discount_id: "discount_id_1",
        student_product_id: "student_product_id_1",
        order_id: "order_id_1",
    },
];

const renderStudentBillingProductListTable = (
    studentBillingProductListTableProps: StudentBillingProductListTableProps = defaultStudentBillingProductListTableProps
) => {
    return render(
        <StudentBillingPluginsProvider>
            <TestApp>
                <StudentBillingProductListTable {...studentBillingProductListTableProps} />
            </TestApp>
        </StudentBillingPluginsProvider>
    );
};

describe("<StudentBillingProductListTable />", () => {
    const locationIncludeRedirect = {
        pathname: "/student",
        search: "?tab=studentPageTab",
    } as Location;

    beforeEach(() => {
        (useLocation as jest.Mock).mockImplementation(() => locationIncludeRedirect);
        (useHistory as jest.Mock).mockImplementation(() => ({
            push: historyPush,
        }));

        (useFeatureToggle as jest.Mock).mockImplementation(() => {
            return {
                isEnabled: true,
            };
        });
        (useOrderItemsByStudentProductIds as jest.Mock).mockReturnValue({
            data: mockOrderItemsData,
            isFetching: false,
        });
    });

    const createMockProductRecurringMaterial = (): StudentBillingProductMock[] => {
        return [
            {
                ...defaultMockProductRecurringMaterial,
            },
            {
                ...defaultMockProductRecurringMaterial,
                productName: "recurring material 2",
                index: 2,
                productId: "product_id_2",
                studentProductId: "student_product_id_2",
            },
        ];
    };
    const mockOrderRecurringProducts = createMockProductRecurringMaterial();
    const numberOfRecurringMockData = mockOrderRecurringProducts.length;
    it("should render product list table with recurring material data", () => {
        const wrapper = renderStudentBillingProductListTable({
            ...defaultStudentBillingProductListTableProps,
            dataSource: mockOrderRecurringProducts,
        });

        const productRowList = wrapper.getAllByTestId("TableBase__row");

        expect(productRowList.length).toBeGreaterThan(0);
        expect(productRowList).toHaveLength(numberOfRecurringMockData);

        productRowList.forEach((productRow, index) => {
            const tableColumns = productRow.getElementsByTagName("td");

            const columnLocation = tableColumns[1];
            expect(columnLocation).toHaveTextContent(
                mockOrderRecurringProducts[index].locationInfo.locationName
            );

            const columnProductDetails = tableColumns[2];
            expect(columnProductDetails).toHaveTextContent(
                mockOrderRecurringProducts[index].productName
            );

            const columnDuration = tableColumns[4];
            const durationDates = `${formatDate(
                convertTimestampToDate(mockOrderRecurringProducts[index].duration.from),
                "yyyy/LL/dd"
            )} - ${formatDate(
                convertTimestampToDate(mockOrderRecurringProducts[index].duration.to),
                "yyyy/LL/dd"
            )}`;
            expect(columnDuration).toHaveTextContent(durationDates);

            const columnAmount = tableColumns[6];
            const amount = getFormattedItemPrice(
                currentCurrency,
                false,
                mockOrderRecurringProducts[index].amount
            );
            expect(columnAmount).toHaveTextContent(amount);
        });
    });
    it("should render product list table with discount and upcoming billing date details", () => {
        const wrapper = renderStudentBillingProductListTable({
            ...defaultStudentBillingProductListTableProps,
            dataSource: mockOrderRecurringProducts,
        });

        const productRowList = wrapper.getAllByTestId("TableBase__row");

        productRowList.forEach((productRow, index) => {
            const tableColumns = productRow.getElementsByTagName("td");

            const columnProductDetails = tableColumns[2];
            expect(columnProductDetails).toHaveTextContent(
                mockOrderRecurringProducts[index].discountInfo.discountName
            );
            expect(columnProductDetails).not.toHaveTextContent("--");

            const columnUpcomingBillingDate = tableColumns[5];
            const upcomingBillingDate = formatDate(
                convertTimestampToDate(mockOrderRecurringProducts[index].upcomingBillingDate),
                "yyyy/LL/dd"
            );
            expect(columnUpcomingBillingDate).toHaveTextContent(upcomingBillingDate);
            expect(columnUpcomingBillingDate).not.toHaveTextContent("--");
        });
    });

    const createMockProductRecurringMaterialNoDiscountAndUpcomingBillingDate =
        (): StudentBillingProductMock[] => {
            return [
                {
                    ...defaultMockProductRecurringMaterial,
                    discountInfo: {
                        discountName: "",
                        discountId: "discount_id_0",
                    },
                    upcomingBillingDate: undefined,
                },
                {
                    ...defaultMockProductRecurringMaterial,
                    productName: "recurring material 2",
                    discountInfo: {
                        discountName: "",
                        discountId: "discount_id_0",
                    },
                    upcomingBillingDate: undefined,
                    index: 2,
                    productId: "product_id_2",
                    studentProductId: "student_product_id_2",
                },
            ];
        };
    const mockOrderRecurringProductsNoDiscount =
        createMockProductRecurringMaterialNoDiscountAndUpcomingBillingDate();
    it("should render product list table with double dash with no discount and upcoming billing date", () => {
        const wrapper = renderStudentBillingProductListTable({
            ...defaultStudentBillingProductListTableProps,
            dataSource: mockOrderRecurringProductsNoDiscount,
        });

        const productRowList = wrapper.getAllByTestId("TableBase__row");

        productRowList.forEach((productRow) => {
            const tableColumns = productRow.getElementsByTagName("td");

            const columnProductDetails = tableColumns[2];
            expect(columnProductDetails).toHaveTextContent("--");

            const columnUpcomingBillingDate = tableColumns[5];
            expect(columnUpcomingBillingDate).toHaveTextContent("--");
        });
    });
});
