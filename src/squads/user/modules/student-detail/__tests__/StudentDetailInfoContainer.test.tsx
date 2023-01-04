import { mockUserAddressList } from "src/squads/user/test-utils/mocks/address";
import { mockStudentContact } from "src/squads/user/test-utils/mocks/contact-phone-number";
import { createMockStudent } from "src/squads/user/test-utils/mocks/student";
import { TestCommonAppProvider } from "src/squads/user/test-utils/providers";

import {
    StudentDetailInfoContainer,
    StudentDetailContainerProps,
} from "../StudentDetailInfoContainer";

import { render, screen, within } from "@testing-library/react";
import useUserFeatureToggle, { FeatureFlag } from "src/squads/user/hooks/useUserFeatureFlag";

jest.mock("src/squads/user/hooks/useUserFeatureFlag", () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe("<StudentDetailInfoContainer />", () => {
    const mockStudent = createMockStudent({ id: "student_id_01", current_grade: 10 });

    const renderComponent = () => {
        const props: StudentDetailContainerProps = {
            student: mockStudent,
            homeAddress: mockUserAddressList[0],
            contactInfo: mockStudentContact,
            onClickEdit: jest.fn(),
        };
        return render(
            <TestCommonAppProvider>
                <StudentDetailInfoContainer {...props} />
            </TestCommonAppProvider>
        );
    };

    beforeEach(() => {
        (useUserFeatureToggle as jest.Mock<boolean>).mockImplementation(() => true);
    });

    it("should render match snapshot", () => {
        const wrapper = renderComponent();
        expect(wrapper.container).toMatchSnapshot();
    });
    it("should render titles correctly", () => {
        renderComponent();
        expect(screen.getByText(`General Info`)).toBeInTheDocument();
        expect(screen.getByText(`Home Address`)).toBeInTheDocument();
        expect(screen.getByText(`School History`)).toBeInTheDocument();
    });

    it("should render correct button edit", () => {
        renderComponent();

        const buttonEdit = screen.getByTestId(`TabStudentDetail__buttonEdit`);
        expect(buttonEdit).toBeInTheDocument();
        expect(buttonEdit).toHaveTextContent("Edit");
        expect(buttonEdit).toHaveStyle("color: rgb(33, 150, 243)");

        const svgEdit = within(buttonEdit).getByTestId("TabStudentDetail__svgEdit");
        expect(svgEdit).toBeInTheDocument();
    });

    it("should render school history when feature toggle is enable", () => {
        renderComponent();

        expect(screen.getByText(`School History`)).toBeInTheDocument();
        expect(screen.getByTestId(`SchoolHistoryDetail__root`)).toBeInTheDocument();
        expect(screen.getByTestId(`SchoolHistoryDetail__table`)).toBeInTheDocument();
    });

    it("should not render school history when feature toggle is disable", () => {
        (useUserFeatureToggle as jest.Mock<boolean>).mockImplementation((flags: FeatureFlag) => {
            return !Boolean(flags === "STUDENT_MANAGEMENT_SCHOOL_HISTORY");
        });

        renderComponent();

        expect(screen.queryByText(`School History`)).not.toBeInTheDocument();
        expect(screen.queryByTestId(`SchoolHistoryDetail__root`)).not.toBeInTheDocument();
        expect(screen.queryByTestId(`SchoolHistoryDetail__table`)).not.toBeInTheDocument();
    });

    it("should render contact phone number when feature toggle is enable", () => {
        renderComponent();

        expect(screen.getByText(`Phone Number`)).toBeInTheDocument();
        expect(screen.getByTestId(`ContactDetail__root`)).toBeInTheDocument();
    });

    it("should not render contact phone number when feature toggle is disable", () => {
        (useUserFeatureToggle as jest.Mock<boolean>).mockImplementation((flags: FeatureFlag) => {
            return !Boolean(flags === "STUDENT_MANAGEMENT_STUDENT_CONTACT_PHONE_NUMBER");
        });

        renderComponent();

        expect(screen.queryByTestId(`ContactDetail__title`)).not.toBeInTheDocument();
        expect(screen.queryByTestId(`ContactDetail__root`)).not.toBeInTheDocument();
    });
    it("should render home address when feature toggle is enable", () => {
        renderComponent();

        expect(screen.getByText(`Home Address`)).toBeInTheDocument();
        expect(screen.getByTestId(`HomeAddressDetail__root`)).toBeInTheDocument();
    });

    it("should not render home address when feature toggle is disable", () => {
        (useUserFeatureToggle as jest.Mock<boolean>).mockImplementation((flags: FeatureFlag) => {
            return !Boolean(flags === "STUDENT_MANAGEMENT_STUDENT_HOME_ADDRESS");
        });

        renderComponent();

        expect(screen.queryByText(`Home Address`)).not.toBeInTheDocument();
        expect(screen.queryByTestId(`HomeAddressDetail__root`)).not.toBeInTheDocument();
    });
});
