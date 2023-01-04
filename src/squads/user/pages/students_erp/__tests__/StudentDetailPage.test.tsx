import { mockUserAddressList } from "src/squads/user/test-utils/mocks/address";
import { createMockStudent } from "src/squads/user/test-utils/mocks/student";
import {
    TestCommonAppProvider,
    TestStudentDetailProvider,
} from "src/squads/user/test-utils/providers";

import StudentDetailPage from "../[id]/show";

import { render } from "@testing-library/react";
import useNormalizeStudentDetail, {
    UseNormalizeStudentDetailReturn,
} from "src/squads/user/modules/student-detail/hooks/useNormalizeStudentDetail";
import useStudentDetailHomeAddress, {
    useStudentDetailHomeAddressReturn,
} from "src/squads/user/modules/student-detail/hooks/useStudentDetailHomeAddress";

jest.mock("src/squads/user/hooks/useUserFeatureFlag");

jest.mock("src/squads/user/hooks/useReissueUserPassword");

jest.mock("src/hooks/useBreadcrumb", () => ({
    __esModule: true,
    default: () => ({
        breadcrumbs: [
            {
                url: `/students_erp`,
                name: "resources.students_erp.titles.studentManagement",
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
            id: "student-id",
        }),
    };
});

jest.mock("src/squads/user/modules/student-detail/hooks/useNormalizeStudentDetail", () => ({
    __esModule: true,
    default: jest.fn(),
}));
jest.mock("src/squads/user/modules/student-detail/hooks/useStudentDetailHomeAddress", () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe("should render correctly", () => {
    const student = createMockStudent({ id: "student_id_01", current_grade: 10 });
    it("should render to match snapshot", () => {
        (useNormalizeStudentDetail as jest.Mock<UseNormalizeStudentDetailReturn>).mockReturnValue({
            isLoading: false,
            student,
            refetch: jest.fn(),
        });
        (
            useStudentDetailHomeAddress as jest.Mock<useStudentDetailHomeAddressReturn>
        ).mockReturnValue({
            isLoading: false,
            homeAddress: mockUserAddressList[0],
            refetch: jest.fn(),
        });

        const wrapper = render(
            <TestCommonAppProvider>
                <TestStudentDetailProvider>
                    <StudentDetailPage />
                </TestStudentDetailProvider>
            </TestCommonAppProvider>
        );
        expect(wrapper.container).toMatchSnapshot();
    });
});
