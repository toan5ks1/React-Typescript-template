import { UserAddress } from "src/squads/user/common/types";
import { mockUserAddressList } from "src/squads/user/test-utils/mocks/address";
import { TestCommonAppProvider } from "src/squads/user/test-utils/providers";

import HomeAddressDetail, { HomeAddressDetailProps } from "../HomeAddressDetail";

import { render, screen } from "@testing-library/react";

describe("<HomeAddressDetail />", () => {
    const mockHomeAddress = mockUserAddressList[0];
    const renderComponent = (props?: Partial<HomeAddressDetailProps>) => {
        return render(
            <TestCommonAppProvider>
                <HomeAddressDetail homeAddress={mockHomeAddress} {...props} />
            </TestCommonAppProvider>
        );
    };
    it("should render match snapshot", () => {
        const wrapper = renderComponent();
        expect(wrapper.container).toMatchSnapshot();
    });
    it("should render correct UI", () => {
        renderComponent();
        expect(screen.getByText(`Postal Code`)).toBeInTheDocument();
        expect(screen.getByText(`Prefecture`)).toBeInTheDocument();
        expect(screen.getByText(`City`)).toBeInTheDocument();
        expect(screen.getByText(`Street 1`)).toBeInTheDocument();
        expect(screen.getByText(`Street 2`)).toBeInTheDocument();
    });

    it("should render home address info correctly", () => {
        renderComponent();

        expect(screen.getByText(mockHomeAddress.postal_code!)).toBeInTheDocument();
        expect(screen.getByText(mockHomeAddress.prefecture?.name!)).toBeInTheDocument();
        expect(screen.getByText(mockHomeAddress.city!)).toBeInTheDocument();
        expect(screen.getByText(mockHomeAddress.first_street!)).toBeInTheDocument();
        expect(screen.getByText(mockHomeAddress.second_street!)).toBeInTheDocument();
    });
    it("should show double dash when home address is empty", () => {
        renderComponent({ homeAddress: undefined });

        expect(screen.queryAllByText("--")).toHaveLength(5);
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

        expect(screen.queryAllByText("--")).toHaveLength(5);
    });
});
