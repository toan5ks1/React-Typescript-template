import roleService from "src/squads/user/service/define-service/role-service";
import userGroupService from "src/squads/user/service/define-service/user-group-service";
import { inferQuery } from "src/squads/user/service/infer-service";
import { pagination } from "src/squads/user/test-utils/mocks/student";
import { TestCommonAppProvider, TestQueryWrapper } from "src/squads/user/test-utils/providers";

import UserGroupDetailPage from "../[id]/show";

import { render } from "@testing-library/react";
import useGrantedPermissionPackage from "src/squads/user/modules/user-group-detail/hooks/useGrantedPermissionPackage";
import {
    mockGrantedPermissionPackage,
    mockUserGroup,
} from "src/squads/user/test-utils/mocks/userGroups";

jest.mock("src/hooks/useBreadcrumb", () => ({
    __esModule: true,
    default: () => ({
        breadcrumbs: [
            {
                url: `/user_group`,
                name: "resources.user_group.title",
            },
        ],
    }),
}));

jest.mock("@mui/material/utils/useId", () => ({
    __esModule: true,
    default: () => "mui-test-id",
}));
jest.mock("react-router", () => {
    const originalModule = jest.requireActual("react-router");
    return {
        __esModule: true,
        ...originalModule,
        useParams: () => ({
            id: "user-group-id",
        }),
    };
});

jest.mock("src/squads/user/service/infer-service", () => {
    const original = jest.requireActual("src/squads/user/service/infer-service");
    return {
        __esModule: true,
        ...original,
        inferQuery: jest.fn(),
    };
});

jest.mock("src/squads/user/modules/user-group-detail/hooks/useGrantedPermissionPackage", () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe("<UserGroupDetailPage/>", () => {
    it("should render to match snapshot new ui UserGroup", () => {
        const roles = mockGrantedPermissionPackage.map((p) => p.role);

        (inferQuery as jest.Mock).mockImplementation(
            (resource: {
                    entity: "userGroup" | "role";
                    action: keyof typeof userGroupService.query | keyof typeof roleService.query;
                }) =>
                () => {
                    if (resource.entity === "userGroup")
                        return {
                            data: mockUserGroup,
                            isLoading: false,
                        };
                    else if (resource.entity === "role")
                        return {
                            data: roles,
                            isLoading: false,
                        };
                }
        );
        (
            useGrantedPermissionPackage as jest.Mock<ReturnType<typeof useGrantedPermissionPackage>>
        ).mockReturnValue({
            grantedPermissionPackage: mockGrantedPermissionPackage,
            isLoading: false,
            pagination: pagination(5),
            refetch: jest.fn(),
        });
        const wrapper = render(
            <TestQueryWrapper>
                <TestCommonAppProvider>
                    <UserGroupDetailPage />
                </TestCommonAppProvider>
            </TestQueryWrapper>
        );
        expect(wrapper.container).toMatchSnapshot();
    });
});
