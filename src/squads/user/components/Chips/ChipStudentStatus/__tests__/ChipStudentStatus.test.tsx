import { KeyStudentEnrollmentStatus } from "src/squads/user/common/constants/student";
import { StatusStudentTypes } from "src/squads/user/common/types/student";
import { TestCommonAppProvider } from "src/squads/user/test-utils/providers";
import { getThemeWithMuiV5 } from "src/styles";

import ChipStudentStatus from "../ChipStudentStatus";

import { render } from "@testing-library/react";
import theme from "src/styles/themes/variants/manabieV5";

const muiTheme = getThemeWithMuiV5({ options: theme });

//renderComponent
const renderComponent = (status: StatusStudentTypes) => {
    return render(
        <TestCommonAppProvider>
            <ChipStudentStatus status={status} />
        </TestCommonAppProvider>
    );
};

jest.mock("src/squads/user/hooks/useFeatureController", () => ({
    __esModule: true,
    default: jest.fn(),
}));

// Test case
describe("<ChipStudentStatus/>", () => {
    it("should be match snapshot STUDENT_ENROLLMENT_STATUS_ENROLLED", () => {
        const wrapper = renderComponent(
            KeyStudentEnrollmentStatus.STUDENT_ENROLLMENT_STATUS_ENROLLED
        );
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should be match snapshot STUDENT_ENROLLMENT_STATUS_POTENTIAL", () => {
        const wrapper = renderComponent(
            KeyStudentEnrollmentStatus.STUDENT_ENROLLMENT_STATUS_POTENTIAL
        );
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should be match snapshot STUDENT_ENROLLMENT_STATUS_WITHDRAWN", () => {
        const wrapper = renderComponent(
            KeyStudentEnrollmentStatus.STUDENT_ENROLLMENT_STATUS_WITHDRAWN
        );
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should be match snapshot STUDENT_ENROLLMENT_STATUS_GRADUATED", () => {
        const wrapper = renderComponent(
            KeyStudentEnrollmentStatus.STUDENT_ENROLLMENT_STATUS_GRADUATED
        );
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should be match snapshot STUDENT_ENROLLMENT_STATUS_LOA", () => {
        const wrapper = renderComponent(KeyStudentEnrollmentStatus.STUDENT_ENROLLMENT_STATUS_LOA);
        expect(wrapper.container).toMatchSnapshot();
    });

    //STUDENT_ENROLLMENT_STATUS_ENROLLED
    it(`should render label and background: ${muiTheme.palette.success.lightBackground} in status Enrolled`, () => {
        const { getByTestId, getByText } = renderComponent(
            KeyStudentEnrollmentStatus.STUDENT_ENROLLMENT_STATUS_ENROLLED
        );

        expect(getByTestId("ChipStatus")).toHaveStyle(
            `background: ${muiTheme.palette.success.lightBackground}`
        );

        expect(getByText(`Enrolled`)).toBeInTheDocument();
    });

    //STUDENT_ENROLLMENT_STATUS_POTENTIAL
    it(`should render label and background: ${muiTheme.palette.warning.lightBackground} in status Potential`, () => {
        const { getByTestId, getByText } = renderComponent(
            KeyStudentEnrollmentStatus.STUDENT_ENROLLMENT_STATUS_POTENTIAL
        );

        expect(getByTestId("ChipStatus")).toHaveStyle(
            `background: ${muiTheme.palette.warning.lightBackground}`
        );
        expect(getByText("Potential")).toBeInTheDocument();
    });

    //STUDENT_ENROLLMENT_STATUS_WITHDRAWN
    it(`should render label and background: ${muiTheme.palette.purple?.[50]} in status Withdrawn`, () => {
        const { getByTestId, getByText } = renderComponent(
            KeyStudentEnrollmentStatus.STUDENT_ENROLLMENT_STATUS_WITHDRAWN
        );

        expect(getByTestId("ChipStatus")).toHaveStyle(
            `background: ${muiTheme.palette.purple?.[50]}`
        );
        expect(getByText(`Withdrawn`)).toBeInTheDocument();
    });

    //STUDENT_ENROLLMENT_STATUS_GRADUATED
    it(`should render label and background: ${muiTheme.palette.success.lightBackground} in status Graduated`, () => {
        const { getByTestId, getByText } = renderComponent(
            KeyStudentEnrollmentStatus.STUDENT_ENROLLMENT_STATUS_GRADUATED
        );

        expect(getByTestId("ChipStatus")).toHaveStyle(
            `background: ${muiTheme.palette.success.lightBackground}`
        );
        expect(getByText(`Graduated`)).toBeInTheDocument();
    });

    //STUDENT_ENROLLMENT_STATUS_LOA
    it(`should render label and background: ${muiTheme.palette.success.lightBackground} in status LOA`, () => {
        const { getByTestId, getByText } = renderComponent(
            KeyStudentEnrollmentStatus.STUDENT_ENROLLMENT_STATUS_LOA
        );

        expect(getByTestId("ChipStatus")).toHaveStyle(
            `background: ${muiTheme.palette.purple?.[50]}`
        );
        expect(getByText(`LOA`)).toBeInTheDocument();
    });
});
