import { TestCommonAppProvider } from "src/squads/user/test-utils/providers";

import { GeneralUserGroupDetail } from "../GeneralUserGroupDetail";

import { render, screen } from "@testing-library/react";
import { mockUserGroup } from "src/squads/user/test-utils/mocks/userGroups";

describe("<GeneralUserGroupDetail /> User Group General detail", () => {
    const renderComponent = () => {
        return render(
            <TestCommonAppProvider>
                <GeneralUserGroupDetail userGroup={mockUserGroup} />
            </TestCommonAppProvider>
        );
    };
    it("should be to match snapshot", () => {
        const wrapper = renderComponent();

        expect(wrapper.container).toMatchSnapshot();
    });
    it("should render correct User Group General detail", () => {
        renderComponent();
        expect(screen.getByTestId("GeneralUserGroupDetail__subTitle")).toHaveTextContent(
            "General Info"
        );
        expect(screen.getByTestId("GeneralUserGroupDetail__generalNameValue")).toHaveTextContent(
            mockUserGroup?.user_group_name
        );
    });
});
