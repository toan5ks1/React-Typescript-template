import { PropsWithChildren } from "react";

import { AppProvider, TestApp } from "src/test-utils";

import { render } from "@testing-library/react";
import type { UseFetchGlobalLocationTypesReturns } from "src/hooks/useFetchGlobalLocationTypes/useFetchGlobalLocationTypes";
import type { UseFetchGlobalLocationsReturns } from "src/hooks/useFetchGlobalLocations/useFetchGlobalLocations";

jest.mock("src/providers/BrightcoveProfileDataProvider", () => {
    const ComponentMock = ({ children }: PropsWithChildren<{}>) => {
        return <div data-testid="BrightcoveProfileDataProvider">{children}</div>;
    };

    return ComponentMock;
});

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

jest.mock("src/squads/user/hooks/auth/useLogout", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const Guard = ({ children }: PropsWithChildren<{}>) => <div data-testid="Guard">{children}</div>;

const MainLayout = require("../MainLayout").default;
const Component = ({ withGuard = true }: { withGuard?: boolean }) => {
    return (
        <TestApp>
            <AppProvider
                customStores={{
                    app: {
                        sidebarOpen: true,
                        prevPathname: "",
                        redirectAfterLogin: "/",
                        redirectAfterLogout: "/login",
                    },
                }}
            >
                <MainLayout guard={withGuard ? Guard : undefined}>
                    <div data-testid="Content">Content</div>
                </MainLayout>
            </AppProvider>
        </TestApp>
    );
};
describe("<MainLayout /> in layout", () => {
    beforeEach(() => {
        window.__MANA__.getManaSidebar = () => {
            return {
                registerSidebarItems: jest.fn(),
                getAllItems: jest.fn(),
                onValueChanged: jest.fn(),
                removeSidebarItems: jest.fn(),
            };
        };
    });
    afterEach(() => {
        window.__MANA__.getManaSidebar = undefined as any;
    });
    it("should match snapshot", () => {
        const wrapper = render(<Component />);
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should render correct UI", () => {
        const wrapper = render(<Component />);
        expect(wrapper.getByTestId("Guard")).toBeInTheDocument();
        expect(wrapper.getByTestId("BrightcoveProfileDataProvider")).toBeInTheDocument();
        expect(wrapper.getByTestId("Content")).toBeInTheDocument();
    });

    it("should render correct UI without Guard", () => {
        const wrapper = render(<Component withGuard={false} />);
        expect(wrapper.getByTestId("BrightcoveProfileDataProvider")).toBeInTheDocument();
        expect(wrapper.getByTestId("Content")).toBeInTheDocument();
    });
});
