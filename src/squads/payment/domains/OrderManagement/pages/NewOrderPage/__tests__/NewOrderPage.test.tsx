import { Payment_GetStudentsManyV3Query } from "src/squads/payment/service/bob/bob-types";
import { createMockStudentInfo } from "src/squads/payment/test-utils/mocks/student";
import { ArrayElement } from "src/squads/payment/types/common/array";

import { UseQueryBaseReturn } from "@manabie-com/react-utils";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NewOrderPage from "src/squads/payment/domains/OrderManagement/pages/NewOrderPage/index";
import useFetchStudentInfo from "src/squads/payment/hooks/useFetchStudentInfo";
import useGoBackToRedirectUrl from "src/squads/payment/hooks/useGoBackToRedirectUrl";
import TestApp from "src/squads/payment/test-utils/TestApp";
import TestHookFormProvider from "src/squads/payment/test-utils/TestHookFormProvider";
import TestQueryWrapper from "src/squads/payment/test-utils/TestQueryWrapper";
import TestThemeProvider from "src/squads/payment/test-utils/TestThemeProvider";

jest.mock("src/hooks/useAutocompleteReference");

jest.mock("src/squads/payment/hooks/useFetchStudentInfo", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/payment/domains/OrderManagement/hooks/useProductExtension", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock(
    "src/squads/payment/domains/OrderManagement/hooks/useProductIdsByGradeAndLocation",
    () => {
        return () => ({
            productIds: ["product_id_1", "product_id_2"],
        });
    }
);

jest.mock("src/squads/payment/hooks/useGoBackToRedirectUrl", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const studentInfo = createMockStudentInfo();

const defaultUseFetchStudentInfoData: Pick<
    UseQueryBaseReturn<ArrayElement<Payment_GetStudentsManyV3Query["students"]> | undefined>,
    "data" | "isFetching"
> = {
    data: studentInfo,
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

const goBackToRedirectUrl = jest.fn();

const renderNewOrderPage = () => {
    (useGoBackToRedirectUrl as jest.Mock).mockImplementation(() => goBackToRedirectUrl);

    return render(
        <TestApp>
            <TestThemeProvider>
                <TestQueryWrapper>
                    <TestHookFormProvider>
                        <NewOrderPage />
                    </TestHookFormProvider>
                </TestQueryWrapper>
            </TestThemeProvider>
        </TestApp>
    );
};

describe("<CreateOrder/>", () => {
    it("should render the dialog", () => {
        mockUseFetchStudentInfo();
        const wrapper = renderNewOrderPage();

        expect(wrapper.getByTestId("NewOrderDialog__dialog")).toBeInTheDocument();
    });

    it("should render loading indication when studentInfo is fetching", () => {
        mockUseFetchStudentInfo({
            ...defaultUseFetchStudentInfoData,
            isFetching: true,
        });
        const wrapper = renderNewOrderPage();

        expect(wrapper.getByTestId("Loading__root")).toBeInTheDocument();
    });

    it("should call goBackToRedirectUrl when click close button", () => {
        mockUseFetchStudentInfo();
        const wrapper = renderNewOrderPage();

        userEvent.click(wrapper.getByTestId("DialogFullScreen__buttonClose"));
        userEvent.click(wrapper.getByTestId("FooterDialogConfirm__buttonSave"));

        expect(goBackToRedirectUrl).toBeCalledTimes(1);
    });

    it("should call goBackToRedirectUrl when click cancel button", () => {
        mockUseFetchStudentInfo();
        const wrapper = renderNewOrderPage();

        userEvent.click(wrapper.getByTestId("OrderDialogFooter__buttonCancel"));
        userEvent.click(wrapper.getByTestId("FooterDialogConfirm__buttonSave"));

        expect(goBackToRedirectUrl).toBeCalledTimes(1);
    });

    it("should render NotFound page when studentInfo is undefined", () => {
        mockUseFetchStudentInfo({
            ...defaultUseFetchStudentInfoData,
            data: undefined,
        });
        const wrapper = renderNewOrderPage();

        expect(wrapper.getByTestId("NewOrder__notfound")).toBeInTheDocument();
    });
});
