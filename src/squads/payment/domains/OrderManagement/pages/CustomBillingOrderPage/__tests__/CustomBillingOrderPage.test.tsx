import { Payment_GetStudentsManyV3Query } from "src/squads/payment/service/bob/bob-types";
import { createMockStudentInfo } from "src/squads/payment/test-utils/mocks/student";
import { ArrayElement } from "src/squads/payment/types/common/array";

import { UseQueryBaseReturn } from "@manabie-com/react-utils";
import { render } from "@testing-library/react";
import CustomBillingOrderPage from "src/squads/payment/domains/OrderManagement/pages/CustomBillingOrderPage/CustomBillingOrderPage";
import useFetchStudentInfo from "src/squads/payment/hooks/useFetchStudentInfo";
import TestApp from "src/squads/payment/test-utils/TestApp";
import TestHookFormProvider from "src/squads/payment/test-utils/TestHookFormProvider";
import TestQueryWrapper from "src/squads/payment/test-utils/TestQueryWrapper";

const mockStudentInfo = createMockStudentInfo();

jest.mock("src/squads/payment/hooks/useFetchStudentInfo", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/payment/hooks/useGoBackToRedirectUrl", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const defaultUseFetchStudentInfoData: Pick<
    UseQueryBaseReturn<ArrayElement<Payment_GetStudentsManyV3Query["students"]> | undefined>,
    "data" | "isFetching"
> = {
    data: mockStudentInfo,
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

const renderCustomBillingOrderPage = () => {
    return render(
        <TestApp>
            <TestQueryWrapper>
                <TestHookFormProvider>
                    <CustomBillingOrderPage />
                </TestHookFormProvider>
            </TestQueryWrapper>
        </TestApp>
    );
};

describe("<CustomBillingOrderPage />", () => {
    it("should render correctly custom billing dialog with valid student", () => {
        mockUseFetchStudentInfo();
        const { getByText } = renderCustomBillingOrderPage();

        expect(getByText("Create Custom Billing")).toBeInTheDocument();
    });

    it("should render loading indication when studentInfo is fetching", () => {
        mockUseFetchStudentInfo({
            ...defaultUseFetchStudentInfoData,
            isFetching: true,
        });
        const { getByTestId } = renderCustomBillingOrderPage();

        expect(getByTestId("Loading__root")).toBeInTheDocument();
    });

    it("should render NotFound page when studentInfo is undefined", () => {
        mockUseFetchStudentInfo({
            ...defaultUseFetchStudentInfoData,
            data: undefined,
        });
        const { getByTestId } = renderCustomBillingOrderPage();

        expect(getByTestId("CustomBillingOrderPage__notfound")).toBeInTheDocument();
    });
});
