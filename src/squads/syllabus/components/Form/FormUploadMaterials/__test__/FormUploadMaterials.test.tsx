import FormUploadMaterials, { InputFile } from "../FormUploadMaterials";

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TestAppWithQueryClient from "src/squads/syllabus/test-utils/TestAppWithQueryClient";

jest.mock("src/hooks/useOnChangeVideoLink", () => ({
    __esModule: true,
    default: () => jest.fn(),
}));

const mockFiles = [new File(["Example"], "file.pdf"), new File(["Example1"], "file1.pdf")];

const renderComponent = (filesAttached?: InputFile[]) => {
    const props = {
        onChange: jest.fn(),
        files: filesAttached,
    };
    return render(
        <TestAppWithQueryClient>
            <FormUploadMaterials {...props} />
        </TestAppWithQueryClient>
    );
};

describe("FormUploadMaterials", () => {
    it("should render with init files uploaded", () => {
        renderComponent(mockFiles);
        const fileAttached = screen.getAllByTestId("ChipFileDescription");
        expect(fileAttached).toHaveLength(2);
    });

    it("should render correctly", () => {
        renderComponent();

        expect(screen.queryByTestId("ChipFileDescription")).not.toBeInTheDocument();

        expect(screen.queryByTestId("UploadInput")).toBeInTheDocument();
        expect(screen.queryByTestId("UploadInput__inputFile")).toBeInTheDocument();

        expect(screen.queryByTestId("FormUploadBrightCove__button")).toBeInTheDocument();
        expect(screen.queryByTestId("FormUploadBrightCove__input")).toBeInTheDocument();
    });

    it("should remove material correctly", async () => {
        renderComponent(mockFiles);

        const removeButton = screen.getAllByTestId("ChipRemoveIcon__icon")[0];
        if (removeButton) {
            userEvent.click(removeButton);
        }

        const confirmRemoveButton = screen.queryByTestId("FooterDialogConfirm__buttonSave");
        expect(confirmRemoveButton).toBeInTheDocument();
        if (confirmRemoveButton) {
            userEvent.click(confirmRemoveButton);
        }

        await waitFor(() => expect(screen.getAllByTestId("ChipFileDescription")).toHaveLength(1));
    });
});
