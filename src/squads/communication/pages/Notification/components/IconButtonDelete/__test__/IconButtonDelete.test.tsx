import { IconButtonBaseProps } from "src/components/IconButton/IconButtonBase";

import IconButtonDelete from "../IconButtonDelete";

import { render, screen } from "@testing-library/react";

const renderIconButtonDelete = (props: IconButtonBaseProps = {}) => {
    return render(<IconButtonDelete {...props} />);
};

describe("<IconButtonDelete />", () => {
    it("should match snapshot", () => {
        const { container } = renderIconButtonDelete();

        expect(container).toMatchSnapshot();
    });

    it("should have disabled class when disabled prop is true", () => {
        renderIconButtonDelete({ disabled: true });

        const iconButton = screen.getByTestId("IconButtonDelete__root");
        expect(iconButton).toBeDisabled();
    });
});
