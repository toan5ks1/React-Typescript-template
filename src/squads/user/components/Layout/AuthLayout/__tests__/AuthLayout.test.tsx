import { PropsWithChildren } from "react";

import { LOGIN_BG } from "src/squads/user/common/constants/const";
import { TestCommonAppProvider } from "src/squads/user/test-utils/providers";

import AuthLayout from "../AuthLayout";

import { render, RenderResult } from "@testing-library/react";
import useUserFeatureToggle from "src/squads/user/hooks/useUserFeatureFlag";

jest.mock("src/squads/user/hooks/useUserFeatureFlag", () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe("<AuthLayout /> in login", () => {
    let wrapper: RenderResult;
    const testIdBackground: string = "AuthLayout__background";
    beforeEach(() => {
        (useUserFeatureToggle as jest.Mock).mockReturnValue(false);

        const props: PropsWithChildren<{}> = {
            children: <div />,
        };
        wrapper = render(
            <TestCommonAppProvider>
                <AuthLayout {...props} />
            </TestCommonAppProvider>
        );
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should render the correctly background image ", () => {
        const backgroundImg = wrapper.getByTestId(testIdBackground);
        expect(backgroundImg).toHaveStyle(`background-image: url(${LOGIN_BG})`);
    });

    it("should render logo icon", () => {
        const backgroundLogo = wrapper.getByTestId("AuthLayout__logo");
        expect(backgroundLogo).toBeInTheDocument();
    });
});

describe("<AuthLayout /> in multi-tenant login", () => {
    let wrapper: RenderResult;
    const testIdBackground: string = "AuthLayout__background";
    beforeEach(() => {
        (useUserFeatureToggle as jest.Mock).mockReturnValue(true);

        const props: PropsWithChildren<{}> = {
            children: <div />,
        };
        wrapper = render(
            <TestCommonAppProvider>
                <AuthLayout {...props} />
            </TestCommonAppProvider>
        );
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should render the correctly background image ", () => {
        const backgroundImg = wrapper.getByTestId(testIdBackground);
        expect(backgroundImg).toHaveStyle(`background-image: url(${LOGIN_BG})`);
    });

    it("should not render logo icon", () => {
        const backgroundLogo = wrapper.queryByTestId("AuthLayout__logo");
        expect(backgroundLogo).toBeNull();
    });
});
