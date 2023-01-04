import { UserRoles } from "src/common/constants/const";
import { AppProvider, TestApp } from "src/test-utils";
import { UserIdentity } from "src/typings/auth-provider";

import UserDropdown from "src/components/Layout/AppBar/UserDropdown";

import { Country } from "manabie-bob/enum_pb";

import { screen, render, RenderResult, fireEvent } from "@testing-library/react";
import type { GlobalLocationTypesReturn } from "src/hooks/useGlobalLocationTypesWithLocations/useGlobalLocationTypesWithLocations";
import useLogout from "src/squads/user/hooks/auth/useLogout";

const userProfile: UserIdentity = {
    name: "Name",
    id: "id",
    email: "email@domain.com",
    schoolId: 123,
    schoolName: "School",
    countryName: "Vietnam",
    userGroup: UserRoles.USER_GROUP_SCHOOL_ADMIN,
    country: Country.COUNTRY_VN,
    phoneNumber: "",
    avatar: "",
    deviceToken: "",
    schoolIdsList: [],
    schoolsList: [],
};

jest.mock("src/squads/user/hooks/auth/useLogout", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/hooks/useGlobalLocationTypesWithLocations", () => ({
    __esModule: true,
    default: () => {
        const result: GlobalLocationTypesReturn = {
            sortedLocationTypesWithLocations: [],
            setLocationTypesWithLocations: jest.fn(),
        };
        return result;
    },
}));

describe("<UserDropdown />", () => {
    const changeSettingMockFn = jest.fn();
    const onLogout = jest.fn();
    let wrapper: RenderResult;

    const props = {
        userProfile,
        onChangeLocationSetting: changeSettingMockFn,
    };

    beforeEach(() => {
        (useLogout as jest.Mock).mockImplementation(() => {
            return { onLogout };
        });

        wrapper = render(
            <TestApp>
                <AppProvider>
                    <UserDropdown {...props} />
                </AppProvider>
            </TestApp>
        );
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should render menu popper and 2 menu items when clicking the menu", () => {
        const profileButton = screen.getByTestId("Appbar__profileButton");
        expect(profileButton).toBeInTheDocument();

        fireEvent.click(profileButton);
        expect(screen.getByTestId("UserMenu__popper")).toBeInTheDocument();
        expect(screen.getByTestId("UserMenu__setting")).toBeInTheDocument();
        expect(screen.getByTestId("UserMenu__logout")).toBeInTheDocument();

        fireEvent.click(screen.getByTestId("UserMenu__setting"));
        expect(changeSettingMockFn).toBeCalled();

        fireEvent.click(screen.getByTestId("UserMenu__logout"));
        expect(onLogout).toBeCalled();
    });
});
