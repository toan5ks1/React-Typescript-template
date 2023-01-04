import { AppProvider, TestApp } from "src/test-utils";

import CustomAppBar, { AppBarProps } from "../Appbar";

import { screen, render, RenderResult, fireEvent } from "@testing-library/react";
import type { UseFetchGlobalLocationTypesReturns } from "src/hooks/useFetchGlobalLocationTypes/useFetchGlobalLocationTypes";
import type { UseFetchGlobalLocationsReturns } from "src/hooks/useFetchGlobalLocations/useFetchGlobalLocations";
import type { GlobalLocationTypesReturn } from "src/hooks/useGlobalLocationTypesWithLocations/useGlobalLocationTypesWithLocations";
import useToggleSidebar from "src/hooks/useToggleSidebar";
import useUserFeatureToggle from "src/squads/user/hooks/useUserFeatureFlag";

jest.mock("src/hooks/useGetLocalProfile", () => {
    const original = jest.requireActual("src/hooks/useGetLocalProfile");
    return {
        __esModule: true,
        ...original,
        default: () => {
            return {
                userProfile: {
                    name: "Name",
                    id: "id",
                    schoolName: "School",
                    countryName: "Vietnam",
                    userGroup: "USER_GROUP_SCHOOL_ADMIN",
                },
            };
        },
    };
});

jest.mock("src/hooks/useToggleSidebar", () => jest.fn());

jest.mock("src/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: () => jest.fn(),
}));

jest.mock("src/hooks/useFeatureToggle", () => ({
    __esModule: true,
    default: () => ({ isEnabled: true }),
}));

jest.mock("src/hooks/useFetchGlobalLocations", () => ({
    __esModule: true,
    default: (): Partial<UseFetchGlobalLocationsReturns> => {
        return {
            data: {
                locationsArray: [],
                locationsMap: new Map(),
                locationsTree: [],
            },
            isLoading: false,
        };
    },
}));

jest.mock("src/hooks/useFetchGlobalLocationTypes", () => ({
    __esModule: true,
    default: (): Partial<UseFetchGlobalLocationTypesReturns> => {
        return {
            data: {
                locationTypesMap: new Map(),
            },
            isLoading: false,
        };
    },
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

jest.mock("src/squads/user/hooks/auth/useLogout", () => ({
    __esModule: true,
    default: () => ({
        onLogout: jest.fn(),
    }),
}));

jest.mock("src/squads/user/hooks/useUserFeatureFlag", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const renderComponent = (props: AppBarProps) => {
    return render(
        <TestApp>
            <AppProvider>
                <CustomAppBar {...props} />
            </AppProvider>
        </TestApp>
    );
};

describe("<Appbar /> sidebar is open in normal login", () => {
    const toggleSidebar = jest.fn();
    let wrapper: RenderResult;
    const props: AppBarProps = {
        sidebarOpen: true,
    };
    beforeEach(() => {
        (useToggleSidebar as jest.Mock).mockImplementation(() => {
            return toggleSidebar;
        });
        (useUserFeatureToggle as jest.Mock).mockReturnValue(false);

        wrapper = renderComponent(props);
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should render correct UI", () => {
        expect(screen.getByTestId("Appbar__chevronLeft")).toBeInTheDocument();
        expect(screen.getByTestId("Appbar__logo")).toBeInTheDocument();
        expect(screen.getByTestId("LocaleSwitcher")).toBeInTheDocument();

        expect(screen.getByTestId("Appbar__role")).toHaveTextContent("School Admin of School");
    });

    it("should call toggle func", () => {
        fireEvent.click(screen.getByTestId("Appbar__chevron"));
        expect(toggleSidebar).toHaveBeenCalled();
    });
});

describe("<Appbar /> sidebar is open in multi-tenant login", () => {
    const toggleSidebar = jest.fn();
    let wrapper: RenderResult;
    const props: AppBarProps = {
        sidebarOpen: true,
    };
    beforeEach(() => {
        (useToggleSidebar as jest.Mock).mockImplementation(() => {
            return toggleSidebar;
        });
        (useUserFeatureToggle as jest.Mock).mockReturnValue(true);

        wrapper = renderComponent(props);
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should render correct UI", () => {
        expect(screen.getByTestId("Appbar__chevronLeft")).toBeInTheDocument();
        expect(screen.queryByTestId("Appbar__logo")).toBeNull();
        expect(screen.getByTestId("LocaleSwitcher")).toBeInTheDocument();

        expect(screen.getByTestId("Appbar__role")).toHaveTextContent("School Admin of School");
    });
});

describe("<Appbar /> sidebar is close", () => {
    it("should render correct UI", () => {
        (useToggleSidebar as jest.Mock).mockImplementation(() => {
            return jest.fn();
        });

        const props: AppBarProps = {
            sidebarOpen: false,
        };

        renderComponent(props);

        expect(screen.getByTestId("Appbar__chevronRight")).toBeInTheDocument();
    });
});
