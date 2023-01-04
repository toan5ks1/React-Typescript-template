import { UserAddress } from "src/squads/user/common/types";
import { mockUserAddressList } from "src/squads/user/test-utils/mocks/address";

import HomeAddressColumn, { HomeAddressColumnProps } from "../HomeAddressColumn";

import { render, screen } from "@testing-library/react";
import useLocale from "src/squads/user/hooks/useLocale";
import { LanguageEnums } from "src/squads/user/typings/i18n-provider";

jest.mock("src/squads/user/hooks/useLocale", () => ({
    __esModule: true,
    default: jest.fn(),
}));
describe("<HomeAddressColumn/>", () => {
    const mockHomeAddress = mockUserAddressList[0];
    const renderComponent = (props?: Partial<HomeAddressColumnProps>) => {
        return render(
            <HomeAddressColumn isLoading={false} homeAddress={mockHomeAddress} {...props} />
        );
    };
    beforeEach(() => {
        (useLocale as jest.Mock).mockReturnValue(LanguageEnums.EN);
    });

    it("should match snapshot", () => {
        const { container } = renderComponent();
        expect(container).toMatchSnapshot();
    });

    it("should render content correct home address", () => {
        renderComponent();

        const { postal_code, prefecture, city, first_street, second_street } = mockHomeAddress;
        const expectedResult = `${postal_code} ${prefecture?.name} ${city} ${first_street} ${second_street}`;
        expect(screen.getByText(expectedResult)).toBeInTheDocument();
        expect(screen.getByTestId("TableColumnHomeAddress__content")).toBeInTheDocument();
    });

    it("should render content correct format with JP language", () => {
        (useLocale as jest.Mock).mockReturnValue(LanguageEnums.JA);
        renderComponent();

        const { postal_code, prefecture, city, first_street, second_street } = mockHomeAddress;
        const expectedResult = `${postal_code} ${prefecture?.name}${city}${first_street}${second_street}`;
        expect(screen.getByText(expectedResult)).toBeInTheDocument();
        expect(screen.getByTestId("TableColumnHomeAddress__content")).toBeInTheDocument();
    });
    it("should render loading UI", () => {
        renderComponent({ isLoading: true, homeAddress: undefined });

        expect(screen.getByTestId("TableColumnHomeAddress__loading")).toBeInTheDocument();
    });
    it("should show double dash when home address is empty", () => {
        renderComponent({ homeAddress: undefined });

        expect(screen.getByText("--")).toBeInTheDocument();
    });
    it("should show double dash when all of home address fields are empty", () => {
        const homeAddress: UserAddress = {
            ...mockHomeAddress,
            postal_code: null,
            prefecture: null,
            city: null,
            first_street: null,
            second_street: null,
        };
        renderComponent({ homeAddress });

        expect(screen.getByText("--")).toBeInTheDocument();
    });
});
