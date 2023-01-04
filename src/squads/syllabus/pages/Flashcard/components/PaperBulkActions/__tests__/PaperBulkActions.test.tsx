import PaperBulkActions, { PaperBulkActionsProps } from "../PaperBulkActions";

import { fireEvent, render, screen } from "@testing-library/react";

describe(PaperBulkActions.name, () => {
    const onDelete = jest.fn();
    const props: PaperBulkActionsProps = {
        onDelete,
        actions: <div data-testid="Dynamic__customActions"></div>,
    };

    beforeEach(() => {
        render(
            <PaperBulkActions {...props}>
                <div data-testid="Dynamic__customChildren"></div>
            </PaperBulkActions>
        );
    });

    it("should render delete icon and trigger onDelete when click", () => {
        const deleteElement = screen.getByTestId("PaperBulkActions__delete");

        expect(onDelete).not.toBeCalled();

        fireEvent.click(deleteElement);

        expect(onDelete).toBeCalled();
    });

    it("should render custom actions", () => {
        expect(screen.getByTestId("Dynamic__customActions")).toBeInTheDocument();
    });

    it("should render the children", () => {
        expect(screen.getByTestId("Dynamic__customChildren")).toBeInTheDocument();
    });
});
