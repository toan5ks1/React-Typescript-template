import { RectTypes } from "src/squads/syllabus/models/canvas";
import { getLatestCallParams } from "src/squads/syllabus/test-utils/mock-utils";

import RectTypeSelection, { RectTypeSelectionProps } from "../RectTypeSelection";

import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TestApp from "src/squads/syllabus/test-utils/TestApp";

const renderUtil = (props: RectTypeSelectionProps) => {
    return render(<RectTypeSelection {...props} />, { wrapper: TestApp });
};
describe("<RectTypeSelection />", () => {
    it("should show OCR rect options and call its handler", () => {
        const mockOnSelect = jest.fn();
        const mockProps: RectTypeSelectionProps = {
            onSelect: mockOnSelect,
        };

        renderUtil(mockProps);

        // Text, Image, Tex
        expect(screen.getAllByRole("button")).toHaveLength(3);
        const text = screen.getAllByRole("button")[0]; //first option: TEXT
        const image = screen.getAllByRole("button")[1]; //first option: IMAGE
        const tex = screen.getAllByRole("button")[2]; //first option: TEX

        expect(text.textContent).toEqual("Text");
        expect(within(text).getByTestId("TextFieldsIcon")).toBeInTheDocument();
        userEvent.click(text);
        expect(getLatestCallParams(mockOnSelect)).toEqual([RectTypes.TEXT]);

        expect(image.textContent).toEqual("Image");
        expect(within(image).getByTestId("ImageIcon")).toBeInTheDocument();
        userEvent.click(image);
        expect(getLatestCallParams(mockOnSelect)).toEqual([RectTypes.IMAGE]);

        expect(tex.textContent).toEqual("Tex");
        expect(within(tex).getByTestId("FunctionsIcon")).toBeInTheDocument();
        userEvent.click(tex);
        expect(getLatestCallParams(mockOnSelect)).toEqual([RectTypes.TEX]);
    });
});
