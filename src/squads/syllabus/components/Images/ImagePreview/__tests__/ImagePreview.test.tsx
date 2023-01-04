import ImagePreview from "../ImagePreview";

import { fireEvent, render, screen } from "@testing-library/react";

describe(ImagePreview.name, () => {
    const imgTestId = "ImagePreview__img";
    const deleteTestId = "ImagePreview__delete";
    const defaultTestId = "ImagePreview__default";

    it("should render image with readonly", () => {
        render(<ImagePreview src="dynamic_src_image" />);

        // Render image src
        expect(screen.getByTestId(imgTestId).querySelector("img")).toHaveAttribute(
            "src",
            "dynamic_src_image"
        );

        // Not render delete UI
        expect(screen.queryByTestId(deleteTestId)).not.toBeInTheDocument();

        // Not render default image
        expect(screen.queryByTestId(defaultTestId)).not.toBeInTheDocument();
    });

    it("should render trigger delete image", () => {
        const onDelete = jest.fn();
        render(<ImagePreview src="dynamic_src_image" onDelete={onDelete} />);

        const deleteElement = screen.getByTestId(deleteTestId);

        expect(onDelete).not.toBeCalled();

        fireEvent.click(deleteElement);

        expect(onDelete).toBeCalled();
    });

    it("should render default image", () => {
        render(<ImagePreview />);

        // Not render delete UI
        expect(screen.queryByTestId(deleteTestId)).not.toBeInTheDocument();

        // Render default image
        expect(screen.getByTestId(defaultTestId)).toBeInTheDocument();
    });
});
