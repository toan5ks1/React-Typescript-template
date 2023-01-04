import { mockUserAddressList } from "src/squads/user/test-utils/mocks/address";
import { createMockStudent } from "src/squads/user/test-utils/mocks/student";
import {
    TestCommonAppProvider,
    TestQueryWrapper,
    TestStudentDetailProvider,
} from "src/squads/user/test-utils/providers";

import MuiPickersUtilsProvider from "src/squads/user/providers/MuiPickersUtilsProvider";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useBreadcrumb from "src/hooks/useBreadcrumb";
import useReissueUserPassword from "src/squads/user/hooks/useReissueUserPassword";
import { StudentDetail } from "src/squads/user/modules/student-detail/StudentDetail";
import useNormalizeStudentDetail, {
    UseNormalizeStudentDetailReturn,
} from "src/squads/user/modules/student-detail/hooks/useNormalizeStudentDetail";
import useStudentDetailHomeAddress, {
    useStudentDetailHomeAddressReturn,
} from "src/squads/user/modules/student-detail/hooks/useStudentDetailHomeAddress";

const student = createMockStudent({ id: "student_id_01", current_grade: 10 });

jest.mock("src/squads/user/modules/student-detail/hooks/useNormalizeStudentDetail", () => ({
    __esModule: true,
    default: jest.fn(),
}));
jest.mock("src/squads/user/modules/student-detail/hooks/useStudentDetailHomeAddress", () => ({
    __esModule: true,
    default: jest.fn(),
}));
jest.mock("src/hooks/useBreadcrumb", () => jest.fn());

jest.mock("src/squads/user/hooks/useReissueUserPassword", () => jest.fn());

jest.mock("src/squads/user/hooks/useUserFeatureFlag");

const renderComponent = (reIssuePassword?: boolean) => {
    const reissueUserPassword = jest.fn(() => {
        return {
            successful: reIssuePassword ?? true,
            userId: "01F4V8P0M4TSYP4DQK0WEFB53R",
            newPassword: "EFB53R",
        };
    });

    (useReissueUserPassword as jest.Mock).mockReturnValue({ reissueUserPassword });

    return render(
        <MuiPickersUtilsProvider>
            <TestCommonAppProvider>
                <TestStudentDetailProvider>
                    <TestQueryWrapper>
                        <StudentDetail />
                    </TestQueryWrapper>
                </TestStudentDetailProvider>
            </TestCommonAppProvider>
        </MuiPickersUtilsProvider>
    );
};

describe("<StudentDetail />", () => {
    it("should render tab Billing if feature flag is enabled", () => {
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

        (useBreadcrumb as jest.Mock).mockReturnValue({
            breadcrumbs: [
                {
                    url: `/user/students_erp`,
                    name: "resources.students_erp.titles.studentManagement",
                },
            ],
            loading: false,
            loaded: true,
        });

        renderComponent();

        userEvent.click(screen.getByText("Billing"));

        expect(screen.getByText("Billing Info")).toBeInTheDocument();
    });
});
