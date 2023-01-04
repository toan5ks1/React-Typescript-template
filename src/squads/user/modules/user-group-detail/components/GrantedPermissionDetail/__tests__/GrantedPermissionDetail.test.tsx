import { pagination } from "src/squads/user/test-utils/mocks/student";
import { TestCommonAppProvider, TestQueryWrapper } from "src/squads/user/test-utils/providers";

import { GrantedPermissionDetail, GrantedPermissionDetailProps } from "../GrantedPermissionDetail";

import { render, screen } from "@testing-library/react";
import { mockGrantedPermissionPackage } from "src/squads/user/test-utils/mocks/userGroups";

describe("<Detail /> User Group Granted Permission detail", () => {
    const props: GrantedPermissionDetailProps = {
        grantedPermissionPackage: mockGrantedPermissionPackage,
        isLoading: false,
        pagination: pagination(5),
    };
    const renderComponent = () => {
        return render(
            <TestQueryWrapper>
                <TestCommonAppProvider>
                    <GrantedPermissionDetail {...props} />
                </TestCommonAppProvider>
            </TestQueryWrapper>
        );
    };
    it("should be to match snapshot", () => {
        const wrapper = renderComponent();

        expect(wrapper.container).toMatchSnapshot();
    });
    it("should render correct User Group Granted Permission detail", () => {
        renderComponent();
        expect(screen.getByTestId("UserGroupNavbar__title")).toHaveTextContent(
            "Granted Permissions"
        );
    });
    it("should render UserGroupGrantedPermission Table", () => {
        renderComponent();
        expect(screen.getByTestId("UserGroupTable")).toBeInTheDocument();
    });
});
