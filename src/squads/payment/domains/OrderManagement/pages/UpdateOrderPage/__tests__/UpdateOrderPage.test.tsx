import { useHistory, useLocation } from "react-router";
import { Payment_GetStudentsManyV3Query } from "src/squads/payment/service/bob/bob-types";
import { Payment_GetLocationNameByLocationIdQuery } from "src/squads/payment/service/fatima/fatima-types";
import { createMockLocation } from "src/squads/payment/test-utils/mocks/location";
import { mockUpdateProducts } from "src/squads/payment/test-utils/mocks/order-form-update";
import { createMockStudentInfo } from "src/squads/payment/test-utils/mocks/student";
import { getAutocompleteInputByTestId } from "src/squads/payment/test-utils/utils";
import { ArrayElement } from "src/squads/payment/types/common/array";
import { ProductsFormValues } from "src/squads/payment/types/form/order-form-types";

import TranslationProvider from "src/providers/TranslationProvider";

import { UseQueryBaseReturn } from "@manabie-com/react-utils";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MuiPickersUtilsProvider from "src/squads/payment/contexts/MuiPickersUtilsProvider";
import useLocationNameById from "src/squads/payment/domains/OrderManagement/hooks/useLocationNameById";
import useUpdateOrderProduct from "src/squads/payment/domains/OrderManagement/hooks/useUpdateOrderProduct";
import UpdateOrderPage from "src/squads/payment/domains/OrderManagement/pages/UpdateOrderPage/index";
import useFetchStudentInfo from "src/squads/payment/hooks/useFetchStudentInfo";
import TestApp from "src/squads/payment/test-utils/TestApp";
import TestHookFormProvider from "src/squads/payment/test-utils/TestHookFormProvider";
import TestQueryWrapper from "src/squads/payment/test-utils/TestQueryWrapper";
import TestThemeProvider from "src/squads/payment/test-utils/TestThemeProvider";

jest.mock("src/squads/payment/hooks/useFetchStudentInfo", () => jest.fn());
jest.mock("src/squads/payment/domains/OrderManagement/hooks/useLocationNameById", () => ({
    __esModule: true,
    default: jest.fn(),
}));
jest.mock(
    "src/squads/payment/domains/OrderManagement/hooks/useUpdateOrderProduct/useUpdateOrderProduct",
    () => ({
        __esModule: true,
        default: jest.fn(),
    })
);
jest.mock("react-router", () => {
    const originalModule = jest.requireActual("react-router");

    return {
        __esModule: true,
        ...originalModule,
        useHistory: jest.fn(() => ({
            goBack: jest.fn(),
            push: jest.fn(),
        })),
        useLocation: jest.fn(),
    };
});

jest.mock("src/common/utils/query", () => {
    const actual = jest.requireActual("src/common/utils/query");
    return {
        __esModule: true,
        ...actual,
        parseQuery: () => ({
            studentId: "student_id_1",
            locationId: "location_id_1",
            studentProductId: "student_product_id_1",
        }),
    };
});

const historyGoBack = jest.fn();
const historyPush = jest.fn();

const studentInfo = createMockStudentInfo();
const locationInfo = createMockLocation();
const mockUpdateOrderProducts = mockUpdateProducts();
let isUpdateOrderProductFetched = false;

const defaultUseFetchStudentInfoData: Pick<
    UseQueryBaseReturn<ArrayElement<Payment_GetStudentsManyV3Query["students"]> | undefined>,
    "data" | "isFetching"
> = {
    data: studentInfo,
    isFetching: false,
};

const defaultUseLocationNameByIdData: Pick<
    UseQueryBaseReturn<
        ArrayElement<Payment_GetLocationNameByLocationIdQuery["locations"]> | undefined
    >,
    "data" | "isFetching"
> = {
    data: locationInfo,
    isFetching: false,
};

const mockUseFetchStudentInfo = (
    useFetchStudentInfoData: Pick<
        UseQueryBaseReturn<ArrayElement<Payment_GetStudentsManyV3Query["students"]> | undefined>,
        "data" | "isFetching"
    > = defaultUseFetchStudentInfoData
) => {
    (useFetchStudentInfo as jest.Mock).mockImplementation(() => {
        return useFetchStudentInfoData;
    });
};

const mockUseLocationNameById = (useLocationNameByIdData = defaultUseLocationNameByIdData) => {
    (useLocationNameById as jest.Mock).mockImplementation(() => {
        return useLocationNameByIdData;
    });
};

const mockUseUpdateOrderProduct = (updateOrderProducts: ProductsFormValues[]) => {
    isUpdateOrderProductFetched = false;
    (useUpdateOrderProduct as jest.Mock).mockImplementation(() => {
        if (isUpdateOrderProductFetched) return;
        isUpdateOrderProductFetched = true;

        return {
            updateOrderProducts,
            isFetching: false,
        };
    });
};

const renderUpdateOrderPage = () => {
    (useHistory as jest.Mock).mockImplementation(() => ({
        goBack: historyGoBack,
        push: historyPush,
    }));

    return render(
        <TestApp>
            <MuiPickersUtilsProvider>
                <TranslationProvider>
                    <TestThemeProvider>
                        <TestQueryWrapper>
                            <TestHookFormProvider>
                                <UpdateOrderPage />
                            </TestHookFormProvider>
                        </TestQueryWrapper>
                    </TestThemeProvider>
                </TranslationProvider>
            </MuiPickersUtilsProvider>
        </TestApp>
    );
};

describe("<UpdateOrderPage />", () => {
    const redirectUrl = "studentPageTab";

    const locationIncludeRedirect = {
        pathname: "/order",
        search: `?redirectUrl=${redirectUrl}`,
    } as Location;

    beforeEach(() => {
        (useLocation as jest.Mock).mockImplementation(() => locationIncludeRedirect);
        mockUseUpdateOrderProduct(mockUpdateOrderProducts);
        mockUseFetchStudentInfo();
        mockUseLocationNameById();
    });

    it("should render the dialog with update order form and mock update product", () => {
        const wrapper = renderUpdateOrderPage();

        expect(wrapper.getByTestId("UpdateOrderDialog__dialog")).toBeInTheDocument();
        expect(wrapper.getByTestId("TableAddDeleteRow__root")).toBeInTheDocument();

        mockUpdateOrderProducts.forEach((mockUpdateOrderProduct) => {
            const { autocompleteInput: productInput } = getAutocompleteInputByTestId(
                "ProductAutocompleteWithIdsHF__autocomplete"
            );
            expect(productInput).toHaveValue(mockUpdateOrderProduct.product?.name ?? "");

            const { autocompleteInput: discountInput } = getAutocompleteInputByTestId(
                "DiscountsAutocompleteHF__autocomplete"
            );
            expect(discountInput).toHaveValue(mockUpdateOrderProduct.discount?.name ?? "");
        });
    });

    it("should render loading indication when studentInfo is fetching", () => {
        mockUseFetchStudentInfo({
            ...defaultUseFetchStudentInfoData,
            isFetching: true,
        });
        const wrapper = renderUpdateOrderPage();

        expect(wrapper.getByTestId("Loading__root")).toBeInTheDocument();
    });

    it("should render loading indication when locationInfo is fetching", () => {
        mockUseLocationNameById({
            ...defaultUseLocationNameByIdData,
            isFetching: true,
        });
        const wrapper = renderUpdateOrderPage();

        expect(wrapper.getByTestId("Loading__root")).toBeInTheDocument();
    });

    it("should render NotFound page when studentInfo is undefined", () => {
        mockUseFetchStudentInfo({
            ...defaultUseFetchStudentInfoData,
            data: undefined,
        });
        const wrapper = renderUpdateOrderPage();

        expect(wrapper.getByTestId("UpdateOrderPage__notfound")).toBeInTheDocument();
        expect(wrapper.getByText("This page is not found.")).toBeInTheDocument();
    });

    it("should render NotFound page when locationInfo is undefined", () => {
        mockUseLocationNameById({
            ...defaultUseLocationNameByIdData,
            data: undefined,
        });
        const wrapper = renderUpdateOrderPage();

        expect(wrapper.getByTestId("UpdateOrderPage__notfound")).toBeInTheDocument();
        expect(wrapper.getByText("This page is not found.")).toBeInTheDocument();
    });

    it("should call history.push when click close button", () => {
        const wrapper = renderUpdateOrderPage();

        userEvent.click(wrapper.getByTestId("DialogFullScreen__buttonClose"));
        userEvent.click(wrapper.getByTestId("FooterDialogConfirm__buttonSave"));

        expect(historyPush).toBeCalledTimes(1);
        expect(historyPush).toBeCalledWith(redirectUrl);
    });

    it("should call history.push when click cancel button and redirectUrl is available", () => {
        const wrapper = renderUpdateOrderPage();

        userEvent.click(wrapper.getByTestId("OrderDialogFooter__buttonCancel"));
        userEvent.click(wrapper.getByTestId("FooterDialogConfirm__buttonSave"));

        expect(historyPush).toBeCalledTimes(1);
        expect(historyPush).toBeCalledWith(redirectUrl);
    });

    it("should call history.back when redirectUrl is not available", () => {
        (useLocation as jest.Mock).mockImplementation(() => location);
        const wrapper = renderUpdateOrderPage();

        userEvent.click(wrapper.getByTestId("OrderDialogFooter__buttonCancel"));
        userEvent.click(wrapper.getByTestId("FooterDialogConfirm__buttonSave"));

        expect(historyGoBack).toBeCalledTimes(1);
    });
});
