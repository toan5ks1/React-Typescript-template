import { formatDate } from "src/common/utils/time";
import { NormalizeStudentInformation } from "src/squads/user/common/types";
import { GenderKeys } from "src/squads/user/common/types/common";
import { createMockStudent } from "src/squads/user/test-utils/mocks/student";
import { TestCommonAppProvider } from "src/squads/user/test-utils/providers";

import GeneralInfoDetail from "../GeneralInfoDetail";

import { render, screen } from "@testing-library/react";
import useUserFeatureToggle, { FeatureFlag } from "src/squads/user/hooks/useUserFeatureFlag";

jest.mock("src/squads/user/hooks/useUserFeatureFlag", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const studentMock = createMockStudent({ id: "student_id_01", current_grade: 10 });

const renderComponent = (student?: NormalizeStudentInformation) => {
    return render(
        <TestCommonAppProvider>
            <GeneralInfoDetail student={student} />
        </TestCommonAppProvider>
    );
};

describe("<GeneralInfoDetail /> when disabled Student Contact Phone Number", () => {
    beforeEach(() => {
        (useUserFeatureToggle as jest.Mock<boolean>).mockImplementation((flags: FeatureFlag) => {
            return !Boolean(flags === "STUDENT_MANAGEMENT_STUDENT_CONTACT_PHONE_NUMBER");
        });
    });

    it("should render match snapshot", () => {
        const wrapper = renderComponent(studentMock);
        expect(wrapper.container).toMatchSnapshot();
    });
    it("should render correct titles UI", () => {
        renderComponent(studentMock);
        expect(screen.getByText(`General Info`)).toBeInTheDocument();
        expect(screen.getByText(`Name`)).toBeInTheDocument();
        expect(screen.getByText(`Phonetic Name`)).toBeInTheDocument();
        expect(screen.getByText(`Enrollment Status`)).toBeInTheDocument();
        expect(screen.getByText(`Email`)).toBeInTheDocument();
        expect(screen.getByText(`Grade`)).toBeInTheDocument();
        expect(screen.getByText(`Phone Number`)).toBeInTheDocument();
        expect(screen.getByText(`External Student ID`)).toBeInTheDocument();
        expect(screen.getByText(`Note`)).toBeInTheDocument();
        expect(screen.getByText(`Gender`)).toBeInTheDocument();
        expect(screen.getByText(`Birthday`)).toBeInTheDocument();
        expect(screen.getByText(`Location`)).toBeInTheDocument();
    });

    it("should render correct detail info student", () => {
        renderComponent(studentMock);

        const email = studentMock.user?.email || "";
        const externalId = studentMock?.student_external_id || "";

        expect(screen.getByText(studentMock.user.name)).toBeInTheDocument();
        expect(screen.getByText(email)).toBeInTheDocument();
        expect(screen.getByText(`Enrolled`)).toBeInTheDocument();
        expect(screen.getByText(`(+81) 0364579988`)).toBeInTheDocument();
        expect(screen.getByText(externalId)).toBeInTheDocument();
        expect(screen.getByText(studentMock.student_note)).toBeInTheDocument();
        expect(
            screen.getByText(formatDate(String(studentMock.user.birthday), "yyyy/LL/dd"))
        ).toBeInTheDocument();
        expect(screen.getByText(`Male`)).toBeInTheDocument();
    });

    it("should render correct without detail info student", () => {
        renderComponent({
            student_id: "",
            student_note: "",
            user: {
                country: "",
                name: "",
                first_name: "",
                last_name: "",
                user_group: "",
                user_id: "",
                gender: GenderKeys.NONE,
                birthday: null,
            },
            enrollment_status: "",
        });

        expect(screen.getByTestId("TabStudentDetail__generalPhoneNumberValue")).toHaveTextContent(
            ""
        );
        expect(
            screen.getByTestId("TabStudentDetail__generalEnrollmentStatusValue")
        ).toHaveTextContent("");
    });
});

describe("<GeneralInfoDetail /> when enabled Student Contact Phone Number", () => {
    beforeEach(() => {
        (useUserFeatureToggle as jest.Mock<boolean>).mockReturnValue(true);
    });
    it("should render match snapshot", () => {
        const wrapper = renderComponent(studentMock);
        expect(wrapper.container).toMatchSnapshot();
    });
    it("should render correct titles UI", () => {
        renderComponent(studentMock);
        expect(screen.getByText(`General Info`)).toBeInTheDocument();
        expect(screen.getByText(`Name`)).toBeInTheDocument();
        expect(screen.getByText(`Phonetic Name`)).toBeInTheDocument();
        expect(screen.getByText(`Enrollment Status`)).toBeInTheDocument();
        expect(screen.getByText(`Email`)).toBeInTheDocument();
        expect(screen.getByText(`Grade`)).toBeInTheDocument();
        expect(screen.getByText(`External Student ID`)).toBeInTheDocument();
        expect(screen.getByText(`Note`)).toBeInTheDocument();
        expect(screen.getByText(`Gender`)).toBeInTheDocument();
        expect(screen.getByText(`Birthday`)).toBeInTheDocument();
        expect(screen.getByText(`Location`)).toBeInTheDocument();
    });

    it("should render correct detail info student", () => {
        renderComponent(studentMock);

        const email = studentMock.user?.email || "";
        const externalId = studentMock?.student_external_id || "";

        expect(screen.getByText(studentMock.user.name)).toBeInTheDocument();
        expect(screen.getByText(email)).toBeInTheDocument();
        expect(screen.getByText(`Enrolled`)).toBeInTheDocument();
        expect(screen.getByText(externalId)).toBeInTheDocument();
        expect(screen.getByText(studentMock.student_note)).toBeInTheDocument();
        expect(
            screen.getByText(formatDate(String(studentMock.user.birthday), "yyyy/LL/dd"))
        ).toBeInTheDocument();
        expect(screen.getByText(`Male`)).toBeInTheDocument();
    });

    it("should render correct without detail info student", () => {
        renderComponent({
            student_id: "",
            student_note: "",
            user: {
                country: "",
                name: "",
                first_name: "",
                last_name: "",
                user_group: "",
                user_id: "",
                gender: GenderKeys.NONE,
                birthday: null,
            },
            enrollment_status: "",
        });

        expect(
            screen.queryByTestId("TabStudentDetail__generalPhoneNumberValue")
        ).not.toBeInTheDocument();
        expect(
            screen.getByTestId("TabStudentDetail__generalEnrollmentStatusValue")
        ).toHaveTextContent("");
    });
});
