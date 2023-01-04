import DialogAccountInfo, { DialogAccountInfoProps } from "../DialogAccountInfo";

import { render, RenderResult, fireEvent } from "@testing-library/react";

describe("<DialogAccountInfo />", () => {
    const props: DialogAccountInfoProps = {
        student: {
            email: "trungtest2@gmail.com",
            password: "8PTJJK",
        },
        parents: [
            {
                email: "parent-khai123@manabie.com",
                password: "CQC7X0",
            },
        ],
        title: "titles.dialogStudentAccountInfo",
        description: "description.dialogStudentAccountInfo",
        open: true,
        onClose: jest.fn(),
    };
    let wrapper: RenderResult;
    beforeEach(() => {
        wrapper = render(<DialogAccountInfo {...props} />);
    });

    it("should match snapshot", () => {
        expect(wrapper.queryByTestId("DialogWithHeaderFooter_wrapper")).toMatchSnapshot();
    });

    it("should render correct UI", () => {
        expect(wrapper.getByText("titles.dialogStudentAccountInfo")).toBeInTheDocument();
        expect(wrapper.getByText("description.dialogStudentAccountInfo")).toBeInTheDocument();
        expect(wrapper.getAllByText("resources.students_erp.labels.email")).toHaveLength(2);
    });

    it("should call the onClose function", () => {
        const button = wrapper.getByTestId("DialogStudentAccountInfoFooter__buttonClose");
        fireEvent.click(button);

        expect(props.onClose).toBeCalled();
    });
});
