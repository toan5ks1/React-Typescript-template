import ButtonShowHide, { ButtonShowHideProps } from "../ButtonShowHide";

import { fireEvent, render, screen } from "@testing-library/react";

describe(ButtonShowHide.name, () => {
    const buttonTestId = "ButtonShowHide";
    const iconShowTestId = "ButtonShowHide__iconShow";
    const iconHideTestId = "ButtonShowHide__iconHide";

    const onClick = jest.fn();

    const defaultProps: ButtonShowHideProps = {
        visible: true,
        onClick,
    };

    it("should render with show icon when visible is true", () => {
        render(<ButtonShowHide {...defaultProps} />);

        expect(screen.getByTestId(iconShowTestId)).toBeInTheDocument();
    });

    it("should render with hide icon when visible is false", () => {
        render(<ButtonShowHide {...defaultProps} visible={false} />);

        expect(screen.getByTestId(iconHideTestId)).toBeInTheDocument();
    });

    it("should call onClick when clicking on button", () => {
        render(<ButtonShowHide {...defaultProps} />);

        fireEvent.click(screen.getByTestId(buttonTestId));

        expect(onClick).toHaveBeenCalled();
    });
});
