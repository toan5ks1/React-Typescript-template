import { createMockTeacher } from "src/squads/user/test-utils/mocks/staff";
import { TestCommonAppProvider, TestQueryWrapper } from "src/squads/user/test-utils/providers";

import { render } from "@testing-library/react";
import StaffDetail from "src/squads/user/pages/staff/[id]/show";

const mockStaff = createMockTeacher();
jest.mock("src/hooks/useBreadcrumb", () => ({
    __esModule: true,
    default: () => ({
        breadcrumbs: [
            {
                url: `/staff`,
                name: "resources.staff.titles.staffManagement",
            },
        ],
    }),
}));

jest.mock("react-router", () => {
    const originalModule = jest.requireActual("react-router");
    return {
        __esModule: true,
        ...originalModule,
        useParams: () => ({
            id: mockStaff.teacher_id,
        }),
    };
});

jest.mock("src/squads/user/service/infer-service", () => ({
    __esModule: true,
    inferQuery: () => () => ({
        data: mockStaff,
        isLoading: false,
    }),
}));

jest.mock("src/squads/user/hooks/useStaffFeatureFlag");

describe("<StaffDetail/>", () => {
    it("should render correct StaffDetail Page", () => {
        const wrapper = render(
            <TestQueryWrapper>
                <TestCommonAppProvider>
                    <StaffDetail />
                </TestCommonAppProvider>
            </TestQueryWrapper>
        );
        expect(wrapper.container).toMatchSnapshot();
    });
});
