import { createMockStudent } from "src/squads/user/test-utils/mocks/student";
import { TestCommonAppProvider } from "src/squads/user/test-utils/providers";

import { HeaderStudentDetail } from "../HeaderStudentDetail";

import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const student = createMockStudent({ id: "student_id_01", current_grade: 10 });

//TODO: Will update when we move component in phase - 2
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

// TODO: @payment team will remove it when Order is available in UAT and Prod
jest.mock("src/squads/user/hooks/useUserFeatureFlag");

const onAction = jest.fn();

const renderComponent = () => {
    const wrapper = render(
        <TestCommonAppProvider>
            <HeaderStudentDetail student={student} isLoading={false} onAction={onAction} />
        </TestCommonAppProvider>
    );

    return wrapper;
};

describe("<HeaderStudentDetail/>", () => {
    it("should be to match snapshot", () => {
        const wrapper = renderComponent();

        //TODO: Will update when we move components in phase -2
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should render correct breadcrumb", () => {
        const wrapper = renderComponent();

        expect(wrapper.queryByTestId("BreadcrumbItem")).toBeInTheDocument();
        expect(wrapper.queryByTestId("BreadcrumbItem")).toHaveAttribute("href", "/students_erp");

        expect(wrapper.queryByTestId("Breadcrumbs__entityName")).toBeInTheDocument();
        expect(wrapper.getByTestId("Breadcrumbs__entityName").textContent).toEqual(
            "Name student_id_01"
        );
    });

    it("should render correct status student", () => {
        const wrapper = renderComponent();

        expect(wrapper.queryByTestId("ChipStatus")).toBeInTheDocument();
        expect(wrapper.getByText("Enrolled")).toBeInTheDocument();
    });

    it("should render correct Never Logged In", () => {
        const wrapper = renderComponent();

        expect(wrapper.queryByTestId("ChipAutocomplete")).toBeInTheDocument();
        //TODO: Will update when we move WrapperPageHeader component in phase -2
        expect(
            wrapper.getByText("resources.students_erp.titles.neverLoggedIn")
        ).toBeInTheDocument();
    });

    it("should render correct button action and re-issue password and call fn onAction", () => {
        const wrapper = renderComponent();

        const buttonAction = wrapper.getByTestId("ActionPanel__trigger");
        expect(buttonAction).toBeInTheDocument();

        userEvent.click(buttonAction);

        //TODO: Will update when we move component in phase - 2
        // const buttonReIssuePassword = wrapper.getByText("Re-Issue password");
        const buttonReIssuePassword = wrapper.getByText("ra.common.action.reIssuePassword");

        expect(buttonReIssuePassword).toBeInTheDocument();

        userEvent.click(buttonReIssuePassword);
        expect(onAction).toBeCalledTimes(1);
    });
});
