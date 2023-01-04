import { TestThemeProvider } from "src/test-utils";

import ButtonDelete from "src/components/Buttons/ButtonDelete";

import TableActions, { TableActionsProps } from "../TableActions";

import { fireEvent, render, RenderResult, screen } from "@testing-library/react";

describe("<TableActions /> with default props", () => {
    it("should match snapshot and rendered header text has delete button", () => {
        const props: TableActionsProps = {
            title: "Test",
            ButtonDeleteProps: {
                onClick: jest.fn(),
            },
        };
        const wrapper = render(
            <TestThemeProvider>
                <TableActions {...props} />
            </TestThemeProvider>
        );

        expect(wrapper.container).toMatchSnapshot();
        expect(screen.getByText(props.title)).toBeInTheDocument();
        expect(screen.getByText("ra.common.action.delete")).toBeInTheDocument();
        expect(screen.getByText("ra.common.action.add")).toBeInTheDocument();
    });
});

describe("<TableActions /> with overridden props ", () => {
    let wrapper: RenderResult;

    const props = {
        title: "Test",
        ButtonDeleteProps: {
            children: "Delete Button",
            onClick: jest.fn(),
        },
        ButtonAddProps: {
            children: "Add Button",
            onClick: jest.fn(),
        },
    };

    beforeEach(() => {
        wrapper = render(
            <TestThemeProvider>
                <TableActions {...props} />
            </TestThemeProvider>
        );
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should call onClick of delete and add button", () => {
        expect(screen.getByText(props.title)).toBeInTheDocument();

        const deleteBtn = screen.getByText("Delete Button");
        expect(deleteBtn).toBeInTheDocument();
        fireEvent.click(deleteBtn);
        expect(props.ButtonDeleteProps.onClick).toBeCalled();

        const addBtn = screen.getByText("Add Button");
        expect(addBtn).toBeInTheDocument();
        fireEvent.click(addBtn);
        expect(props.ButtonAddProps.onClick).toBeCalled();
    });
});

describe("<TableActions /> with overridden children ", () => {
    let wrapper: RenderResult;

    const props = {
        title: "Test",
        children: <ButtonDelete />,
    };

    beforeEach(() => {
        wrapper = render(
            <TestThemeProvider>
                <TableActions {...props} />
            </TestThemeProvider>
        );
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should render children", () => {
        const deleteBtn = screen.getByText("ra.common.action.delete");
        expect(deleteBtn).toBeInTheDocument();
    });
});
