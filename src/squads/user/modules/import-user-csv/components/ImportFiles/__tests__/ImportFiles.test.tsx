import { PORTAL_DIALOG_FOOTER } from "src/common/constants/other";
import { createMockFiles } from "src/squads/user/test-utils/mocks/file";
import { TestCommonAppProvider, TestQueryWrapper } from "src/squads/user/test-utils/providers";

import ImportFiles, {
    ImportFilesProps,
} from "src/squads/user/modules/import-user-csv/components/ImportFiles";

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const mockFiles = createMockFiles(1);

describe("<ImportFiles />", () => {
    const onClose = jest.fn();
    const onRemove = jest.fn();
    const onChange = jest.fn();

    const renderComponent = (props?: Partial<ImportFilesProps>) => {
        return render(
            <TestCommonAppProvider>
                <TestQueryWrapper>
                    <ImportFiles
                        onClose={onClose}
                        multiple={false}
                        disabled={false}
                        files={mockFiles}
                        onChange={onChange}
                        onRemove={onRemove}
                        {...props}
                    />
                    <div id={PORTAL_DIALOG_FOOTER} />
                </TestQueryWrapper>
            </TestCommonAppProvider>
        );
    };

    it("should match snapshot on non-file", () => {
        const wrapper = renderComponent({ files: [] });
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should match on file", () => {
        const wrapper = renderComponent();
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should render ListMediaChip, input file and footer on non-file", () => {
        renderComponent({ files: [] });
        expect(screen.queryByTestId("ChipFileDescription")).not.toBeInTheDocument();
        expect(screen.queryByTestId("ChipRemoveIcon__icon")).not.toBeInTheDocument();
        expect(screen.getByTestId("UploadInput")).toBeInTheDocument();

        expect(screen.getByTestId("DialogWithHeaderFooter__dialogActions")).toBeInTheDocument();
        expect(screen.getByTestId("FooterDialogConfirm__buttonClose")).not.toBeDisabled();
        expect(screen.getByTestId("FooterDialogConfirm__buttonSave")).not.toBeDisabled();
    });

    it("should render ListMediaChip, input file and footer on file", () => {
        renderComponent();
        expect(screen.getByTestId("ChipFileDescription")).toBeInTheDocument();
        expect(screen.getByTestId("ChipRemoveIcon__icon")).toBeInTheDocument();

        expect(screen.getByTestId("DialogWithHeaderFooter__dialogActions")).toBeInTheDocument();
        expect(screen.getByTestId("FooterDialogConfirm__buttonClose")).not.toBeDisabled();
        expect(screen.getByTestId("FooterDialogConfirm__buttonSave")).not.toBeDisabled();
    });

    it("should be call onClose", () => {
        renderComponent();

        userEvent.click(screen.getByTestId("FooterDialogConfirm__buttonClose"));
        expect(onClose).toBeCalledTimes(1);
    });

    it("should be call onChange when upload file", async () => {
        renderComponent({ files: [] });

        userEvent.upload(screen.getByTestId("UploadInput__inputFile"), mockFiles);

        await waitFor(() => {
            expect(onChange).toBeCalledTimes(1);
        });
    });

    it("should be call  onRemove when remove file", async () => {
        renderComponent();

        userEvent.click(screen.getByTestId("ChipRemoveIcon__icon"));

        await waitFor(() => {
            expect(onRemove).toBeCalledTimes(1);
        });
    });

    it("should disabled import button", () => {
        renderComponent({ files: [], disabled: true });

        expect(screen.getByTestId("FooterDialogConfirm__buttonSave")).toBeDisabled();
        expect(screen.getByTestId("UploadInput__inputFile")).toBeDefined();
    });
});
