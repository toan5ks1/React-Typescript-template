import { TestThemeProvider } from "src/test-utils";
import { createFile } from "src/test-utils/file";
import { TestQueryWrapper } from "src/test-utils/react-hooks";

import UploadInput, { UploadInputProps } from "../UploadInput";

import { render, fireEvent, waitFor } from "@testing-library/react";

const inputTestId: string = "UploadInput__inputFile";

const descriptionTestId: string = "UploadInput__description";

const renderUtil = (props: UploadInputProps) => {
    return render(
        <TestQueryWrapper>
            <TestThemeProvider>
                <UploadInput {...props} />
            </TestThemeProvider>
        </TestQueryWrapper>
    );
};

jest.mock("src/internals/configuration/configuration");
jest.mock("src/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: () => jest.fn(),
}));

describe("<UploadInput /> UI", () => {
    it("should match snapshot", async () => {
        const props: UploadInputProps = {
            accept: "image/png",
            description: "DESCRIPTION",
        };

        const { container } = renderUtil(props);

        expect(container).toMatchSnapshot();
    });

    it("should render correct UI", () => {
        const props: UploadInputProps = {
            description: "DESCRIPTION",
        };

        const { getByTestId } = renderUtil(props);

        expect(getByTestId(descriptionTestId).textContent).toMatch(/DESCRIPTION/gi);
    });
});

describe("<UploadInput /> handler", () => {
    it("should call exactly the callback", async () => {
        const props: UploadInputProps = {
            onChange: jest.fn(),
            accept: "image/png",
        };

        const { getByTestId, container } = renderUtil(props);

        expect(container).toMatchSnapshot();

        const inputTarget = getByTestId(inputTestId) as HTMLInputElement;
        const file = createFile();
        Object.defineProperty(inputTarget, "files", { value: [file] });

        fireEvent.change(inputTarget);

        await waitFor(() => {
            expect(props.onChange).toBeCalled();
        });
        expect(props.onChange).toHaveBeenCalledWith([file]);
    });
});
