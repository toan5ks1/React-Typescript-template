import { useHistory, useLocation } from "react-router";
import { Payment_GetStudentsManyV3Query } from "src/squads/payment/service/bob/bob-types";
import { mockEnrollmentProductFormValues } from "src/squads/payment/test-utils/mocks/enrollment";
import { createMockStudentInfo } from "src/squads/payment/test-utils/mocks/student";
import { ArrayElement } from "src/squads/payment/types/common/array";

import TranslationProvider from "src/providers/TranslationProvider";

import { UseQueryBaseReturn } from "@manabie-com/react-utils";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useEnrollmentProducts from "src/squads/payment/domains/OrderManagement/hooks/useEnrollmentProducts";
import EnrollmentOrderPage from "src/squads/payment/domains/OrderManagement/pages/EnrollmentOrderPage/EnrollmentOrderPage";
import useFetchStudentInfo from "src/squads/payment/hooks/useFetchStudentInfo";
import TestApp from "src/squads/payment/test-utils/TestApp";
import TestQueryWrapper from "src/squads/payment/test-utils/TestQueryWrapper";
import TestThemeProvider from "src/squads/payment/test-utils/TestThemeProvider";

jest.mock("src/hooks/useAutocompleteReference");
jest.mock("src/squads/payment/hooks/useFetchStudentInfo", () => jest.fn());
jest.mock("src/squads/payment/domains/OrderManagement/hooks/useEnrollmentProducts", () =>
    jest.fn()
);
jest.mock("src/squads/payment/domains/OrderManagement/hooks/useProductExtension", () => jest.fn());

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

jest.mock("src/squads/payment/domains/OrderManagement/hooks/useSubmitOrder", () => {
    return {
        __esModule: true,
        default: () => {
            return {
                createOrder: jest.fn(),
                isOnCreateLoading: false,
            };
        },
    };
});

const historyGoBack = jest.fn();
const historyPush = jest.fn();

const studentInfo = createMockStudentInfo();
const enrollmentProducts = mockEnrollmentProductFormValues();

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

const renderEnrollmentPage = () => {
    (useHistory as jest.Mock).mockImplementation(() => ({
        goBack: historyGoBack,
        push: historyPush,
    }));

    return render(
        <TestApp>
            <TranslationProvider>
                <TestThemeProvider>
                    <TestQueryWrapper>
                        <EnrollmentOrderPage />
                    </TestQueryWrapper>
                </TestThemeProvider>
            </TranslationProvider>
        </TestApp>
    );
};

describe("<EnrollmentOrderPage />", () => {
    const redirectUrl = "studentPage";
    const viewEnrollmentFormButtonText = "View Enrollment Form";

    const locationIncludeRedirect = {
        pathname: "/order",
        search: `?redirectUrl=${redirectUrl}`,
    } as Location;

    beforeEach(() => {
        let isEnrollmentFetched = false;
        (useLocation as jest.Mock).mockImplementation(() => locationIncludeRedirect);
        (useEnrollmentProducts as jest.Mock).mockImplementation(({ onFinishFetchingData }) => {
            if (isEnrollmentFetched) return;
            onFinishFetchingData?.(enrollmentProducts);
            isEnrollmentFetched = true;
        });
    });

    it("should render the dialog with enrollment order form and mock enrollment product", () => {
        mockUseFetchStudentInfo();
        renderEnrollmentPage();

        expect(screen.getByTestId("EnrollmentOrderDialog__dialog")).toBeInTheDocument();
        expect(screen.getByTestId("TableAddDeleteRow__root")).toBeInTheDocument();

        const enrollmentProductName = enrollmentProducts[0].product?.name!;
        expect(screen.getByText(enrollmentProductName)).toBeInTheDocument();
    });

    it("should render preview form when click view enrollment form", () => {
        mockUseFetchStudentInfo();
        renderEnrollmentPage();

        expect(screen.getByText(viewEnrollmentFormButtonText)).toBeInTheDocument();

        userEvent.click(screen.getByText(viewEnrollmentFormButtonText));

        expect(screen.getByText("Preview the Form")).toBeInTheDocument();
    });

    it("should render enrollment order form when click button back in enrollment form", () => {
        mockUseFetchStudentInfo();
        renderEnrollmentPage();

        expect(screen.getByText(viewEnrollmentFormButtonText)).toBeInTheDocument();

        userEvent.click(screen.getByText(viewEnrollmentFormButtonText));

        expect(screen.getByText("Back")).toBeInTheDocument();

        userEvent.click(screen.getByText("Back"));

        expect(screen.getByText(viewEnrollmentFormButtonText)).toBeInTheDocument();
    });

    it("should render loading indication when studentInfo is fetching", () => {
        mockUseFetchStudentInfo({
            ...defaultUseFetchStudentInfoData,
            isFetching: true,
        });
        const screen = renderEnrollmentPage();

        expect(screen.getByTestId("Loading__root")).toBeInTheDocument();
    });

    it("should render NotFound page when studentInfo is undefined", () => {
        mockUseFetchStudentInfo({
            ...defaultUseFetchStudentInfoData,
            data: undefined,
        });
        renderEnrollmentPage();

        expect(screen.getByTestId("EnrollmentOrderPage__notfound")).toBeInTheDocument();
        expect(screen.getByText("This page is not found.")).toBeInTheDocument();
    });
});
