import StaffList from "src/squads/user/pages/staff";
import { inferQueryPagination } from "src/squads/user/service/infer-service";
import { mockReturnStaffData, mockPagination } from "src/squads/user/test-utils/mocks/staff";
import { TestCommonAppProvider, TestQueryWrapper } from "src/squads/user/test-utils/providers";

import { render, screen } from "@testing-library/react";
import useUserFeatureToggle from "src/squads/user/hooks/useUserFeatureFlag";

jest.mock("src/squads/user/hooks/useStaffFeatureFlag");

jest.mock("src/squads/user/hooks/useUserFeatureFlag", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/user/service/infer-service", () => {
    const original = jest.requireActual("src/squads/user/service/infer-service");
    return {
        __esModule: true,
        ...original,
        inferQueryPagination: jest.fn(),
    };
});

describe("<StaffList />", () => {
    beforeEach(() => {
        (inferQueryPagination as jest.Mock).mockReturnValue(() => ({
            result: {
                isLoading: false,
                refetch: jest.fn(),
            },
            data: mockReturnStaffData,
            pagination: mockPagination,
        }));
        (useUserFeatureToggle as jest.Mock).mockReturnValue(true);
    });

    it("should render correct StaffList Page", () => {
        const { container } = render(
            <TestCommonAppProvider>
                <TestQueryWrapper>
                    <StaffList />
                </TestQueryWrapper>
            </TestCommonAppProvider>
        );

        expect(screen.queryByText("Staff Management")).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });
});
