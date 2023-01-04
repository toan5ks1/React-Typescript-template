import { StudentContactPhoneNumberFormProps } from "src/squads/user/common/types";
import { mockStudentContact } from "src/squads/user/test-utils/mocks/contact-phone-number";
import { TestCommonAppProvider } from "src/squads/user/test-utils/providers";

import ContactDetail from "../ContactDetail";

import { render, screen } from "@testing-library/react";

const renderComponent = (contactInfo?: StudentContactPhoneNumberFormProps) => {
    return render(
        <TestCommonAppProvider>
            <ContactDetail contactInfo={contactInfo} />
        </TestCommonAppProvider>
    );
};

describe("<ContactDetail />", () => {
    it("should render match snapshot", () => {
        const wrapper = renderComponent(mockStudentContact);
        expect(wrapper.container).toMatchSnapshot();
    });
    it("should render correct UI", () => {
        renderComponent(mockStudentContact);
        expect(screen.getAllByText("Student Phone Number")[0]).toBeInTheDocument();
        expect(screen.getAllByText("Home Phone Number")[0]).toBeInTheDocument();
        expect(screen.getAllByText("Parent Primary Phone Number")[0]).toBeInTheDocument();
        expect(screen.getAllByText("Parent Secondary Phone Number")[0]).toBeInTheDocument();
        expect(screen.getAllByText("Preferred Contact Number")[0]).toBeInTheDocument();
    });

    it("should render contact detail correctly if have data", () => {
        renderComponent(mockStudentContact);

        expect(screen.getByTestId("TabStudentDetail__studentPhoneNumber")).toHaveTextContent(
            mockStudentContact.studentPhoneNumber!
        );
        expect(screen.getByTestId("TabStudentDetail__homePhoneNumber")).toHaveTextContent(
            mockStudentContact.homePhoneNumber!
        );
        expect(screen.getByTestId("TabStudentDetail__parentPrimaryPhoneNumber")).toHaveTextContent(
            mockStudentContact.parentPrimaryPhoneNumber!
        );
        expect(
            screen.getByTestId("TabStudentDetail__parentSecondaryPhoneNumber")
        ).toHaveTextContent(mockStudentContact.parentSecondaryPhoneNumber!);
        expect(screen.getByTestId("TabStudentDetail__preferredContactNumber")).toHaveTextContent(
            mockStudentContact.preferredContactNumber!
        );
    });

    it("should display double dash if have no data", () => {
        renderComponent();

        expect(screen.getByTestId("TabStudentDetail__studentPhoneNumber")).toHaveTextContent("--");
        expect(screen.getByTestId("TabStudentDetail__homePhoneNumber")).toHaveTextContent("--");
        expect(screen.getByTestId("TabStudentDetail__parentPrimaryPhoneNumber")).toHaveTextContent(
            "--"
        );
        expect(
            screen.getByTestId("TabStudentDetail__parentSecondaryPhoneNumber")
        ).toHaveTextContent("--");
        expect(screen.getByTestId("TabStudentDetail__preferredContactNumber")).toHaveTextContent(
            "--"
        );
    });
});
