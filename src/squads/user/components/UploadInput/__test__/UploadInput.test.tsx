import { createFile } from "src/squads/user/test-utils/mocks/file";
import { TestCommonAppProvider, TestQueryWrapper } from "src/squads/user/test-utils/providers";

import UploadInput, { UploadInputProps } from "../UploadInput";

import { render, fireEvent, waitFor } from "@testing-library/react";

const inputTestId: string = "UploadInput__inputFile";
const showerTestId: string = "UploadInput__shower";
const descriptionTestId: string = "UploadInput__description";

const renderUtil = (props: UploadInputProps) => {
    return render(
        <TestCommonAppProvider>
            <TestQueryWrapper>
                <UploadInput {...props} />
            </TestQueryWrapper>
        </TestCommonAppProvider>
    );
};
describe("<UploadInput /> UI", () => {
    it("should match snapshot", async () => {
        const props: UploadInputProps = {
            accept: "image/png",
            description: "DESCRIPTION",
            show: () => <div data-testid="UploadInput__shower">SHOWER</div>,
        };

        const { container } = renderUtil(props);

        expect(container).toMatchSnapshot();
    });

    it("should render correct UI", () => {
        const props: UploadInputProps = {
            description: "DESCRIPTION",
            show: () => <div data-testid="UploadInput__shower">SHOWER</div>,
        };

        const { getByTestId } = renderUtil(props);

        expect(getByTestId(descriptionTestId).textContent).toMatch(/DESCRIPTION/gi);
        expect(getByTestId(showerTestId)).toBeInTheDocument();
    });
});

describe("<UploadInput /> handler", () => {
    it("should call exactly the callback", async () => {
        const props: UploadInputProps = {
            onChange: jest.fn(),
            accept: "image/png",
            show: () => <div data-testid="UploadInput__shower">SHOWER</div>,
        };

        const { getByTestId, container } = renderUtil(props);

        expect(container).toMatchSnapshot();

        const inputTarget = getByTestId(inputTestId) as HTMLInputElement;
        const file = createFile();
        Object.defineProperty(inputTarget, "files", { value: [file] });

        fireEvent.change(inputTarget);

        await waitFor(() => {
            expect(props.onChange).toBeCalledTimes(1);
        });
    });
});
