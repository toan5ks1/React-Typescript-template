import userGroupList from "src/squads/user/modules/user-group-list";
import { inferQueryPagination } from "src/squads/user/service/infer-service";
import { mockPagination } from "src/squads/user/test-utils/mocks/staff";
import { TestCommonAppProvider, TestQueryWrapper } from "src/squads/user/test-utils/providers";

import UserGroupList from "../index";

import { render, screen } from "@testing-library/react";

jest.mock("src/squads/user/hooks/useStaffFeatureFlag");

jest.mock("@mui/material/utils/useId", () => ({
    __esModule: true,
    default: () => "mui-test-id",
}));

jest.mock("src/squads/user/service/infer-service", () => {
    const original = jest.requireActual("src/squads/user/service/infer-service");
    return {
        __esModule: true,
        ...original,
        inferQueryPagination: jest.fn(),
    };
});

describe("<List /> UserGroup table", () => {
    it("should render correct UserGroups Page", () => {
        (inferQueryPagination as jest.Mock).mockReturnValue(() => ({
            result: {
                isLoading: false,
                refetch: jest.fn(),
            },
            data: { data: userGroupList },
            pagination: mockPagination,
        }));

        const { container } = render(
            <TestCommonAppProvider>
                <TestQueryWrapper>
                    <UserGroupList />
                </TestQueryWrapper>
            </TestCommonAppProvider>
        );

        expect(screen.queryByText("User Group")).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });
});
