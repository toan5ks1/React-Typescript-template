import { LOGIN_BG } from "src/squads/user/common/constants/const";
import { TestCommonAppProvider } from "src/squads/user/test-utils/providers";

import LoginCard, { LoginProps } from "../LoginCard";

import { render } from "@testing-library/react";

describe("<LoginCard/>", () => {
    const defaultProps: LoginProps = {
        children: <h1>Testing</h1>,
    };

    it("should render the correctly background image and card content", () => {
        const imageUrl: string = LOGIN_BG;

        const regex = /Testing/i;
        const wrapper = render(
            <TestCommonAppProvider>
                <LoginCard {...defaultProps} backgroundImage={imageUrl} />
            </TestCommonAppProvider>
        );

        expect(wrapper.getByTestId("LoginCard__background")).toHaveStyle({
            backgroundImage: imageUrl,
        });
        expect(wrapper.getByTestId("LoginCard__content")).toBeInTheDocument();
        expect(wrapper.getByText(regex).textContent).toMatch(regex);
    });
});
