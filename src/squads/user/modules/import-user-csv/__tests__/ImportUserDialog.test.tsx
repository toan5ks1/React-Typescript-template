import { useDispatch } from "react-redux";
import { fileToPayload } from "src/common/utils/file";
import { mockDataBase64CSV } from "src/squads/user/test-utils/mocks/const";
import { createMockFileByBase64 } from "src/squads/user/test-utils/mocks/file";
import { TestCommonAppProvider, TestQueryWrapper } from "src/squads/user/test-utils/providers";

import ImportUserDialog, { ImportUsersDialogProps } from "../ImportUserDialog";

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useShowSnackbar from "src/squads/user/hooks/useShowSnackbar";
import useGenerateTemplateFile from "src/squads/user/modules/import-user-csv/hooks/useGenerateTemplateFile";

jest.mock("src/squads/user/modules/import-user-csv/hooks/useGenerateTemplateFile", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("react-redux", () => {
    const redux = jest.requireActual("react-redux");
    return {
        __esModule: true,
        ...redux,
        useDispatch: jest.fn(),
        useSelector: () => ({
            isUserImporting: false,
            isParentImporting: false,
        }),
    };
});

jest.mock("src/squads/user/hooks/useShowSnackbar", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

jest.mock("src/common/utils/file", () => {
    const fileUtils = jest.requireActual("src/common/utils/file");

    return {
        __esModule: true,
        ...fileUtils,
        fileToPayload: jest.fn(),
    };
});

describe("<ImportUserDialog/>", () => {
    const mockFileTrueExtensionCSV = createMockFileByBase64(mockDataBase64CSV, "name.csv");
    const onClose = jest.fn();
    const downloadTemplateFile = jest.fn();
    const showSnackbar = jest.fn();

    const renderComponent = (props?: Partial<ImportUsersDialogProps>) => {
        return render(
            <TestCommonAppProvider>
                <TestQueryWrapper>
                    <ImportUserDialog
                        mode="IMPORT_STUDENT_CSV"
                        open={true}
                        onClose={onClose}
                        {...props}
                    />
                </TestQueryWrapper>
            </TestCommonAppProvider>
        );
    };

    beforeEach(() => {
        (
            useGenerateTemplateFile as jest.Mock<ReturnType<typeof useGenerateTemplateFile>>
        ).mockReturnValue({
            generateTemplate: downloadTemplateFile,
            isLoading: false,
        });

        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);
    });

    it("should match snapshot with mode: IMPORT_STUDENTS_CSV", () => {
        renderComponent({ mode: "IMPORT_STUDENT_CSV" });
        expect(screen.getByTestId("ImportUserDialog__root")).toMatchSnapshot("IMPORT_STUDENT_CSV");
    });

    it("should match snapshot with mode: IMPORT_PARENTS_CSV", () => {
        renderComponent({ mode: "IMPORT_PARENT_CSV" });
        expect(screen.getByTestId("ImportUserDialog__root")).toMatchSnapshot("IMPORT_PARENT_CSV");
    });

    it("should render header, footer, download button and zone dnd correctly on on file", () => {
        renderComponent();

        expect(screen.getByTestId("ImportUserDialog__root")).toBeInTheDocument();
        expect(screen.getByTestId("ImportDataDialog__buttonDownload")).toBeInTheDocument();
        expect(
            screen.getByText("You can import up to 1000 records through CSV file")
        ).toBeInTheDocument();
        expect(screen.getByTestId("FooterDialogConfirm__buttonSave")).toBeInTheDocument();
        expect(screen.getByTestId("FooterDialogConfirm__buttonSave")).not.toBeDisabled();
        expect(screen.getByTestId("UploadInput")).toBeInTheDocument();
    });

    it("should call onClose one times", () => {
        renderComponent();

        userEvent.click(screen.getByTestId("DialogWithHeaderFooter__buttonExit"));
        userEvent.click(screen.getByTestId("FooterDialogConfirm__buttonClose"));
        expect(onClose).toBeCalledTimes(2);
    });
    it("should be hide and show on upload file", async () => {
        renderComponent();
        userEvent.upload(screen.getByTestId("UploadInput__inputFile"), [mockFileTrueExtensionCSV]);

        await waitFor(() => {
            expect(screen.queryByTestId("UploadInput")).not.toBeInTheDocument();
        });

        userEvent.click(screen.getByTestId("ChipRemoveIcon__icon"));

        await waitFor(() => {
            expect(screen.queryByTestId("UploadInput")).toBeInTheDocument();
        });
    });

    it("should be call download template function", () => {
        renderComponent();

        userEvent.click(screen.getByTestId("ImportDataDialog__buttonDownload"));
        expect(downloadTemplateFile).toBeCalledTimes(1);
    });

    it("should be call dispatch mock successfully", async () => {
        const mockDispatch = jest.fn();
        (useDispatch as jest.Mock).mockReturnValue(mockDispatch);

        renderComponent();
        userEvent.upload(screen.getByTestId("UploadInput__inputFile"), [mockFileTrueExtensionCSV]);

        await waitFor(() => {
            expect(screen.queryByTestId("UploadInput")).not.toBeInTheDocument();
        });
        userEvent.click(await screen.findByTestId("FooterDialogConfirm__buttonSave"));
        await waitFor(() => {
            expect(mockDispatch).toBeCalledTimes(1);
        });
    });

    it("should call dispatch mock successfully for parents", async () => {
        const mockDispatch = jest.fn();
        (useDispatch as jest.Mock).mockReturnValue(mockDispatch);

        renderComponent({ mode: "IMPORT_PARENT_CSV" });
        userEvent.upload(screen.getByTestId("UploadInput__inputFile"), [mockFileTrueExtensionCSV]);

        await waitFor(() => {
            expect(screen.queryByTestId("UploadInput")).not.toBeInTheDocument();
        });
        userEvent.click(await screen.findByTestId("FooterDialogConfirm__buttonSave"));
        await waitFor(() => {
            expect(mockDispatch).toBeCalledTimes(1);
        });
    });

    it("should throw a context error when import fails", async () => {
        const mockError = new Error("error");
        (fileToPayload as jest.Mock).mockRejectedValue(mockError);

        renderComponent();

        userEvent.upload(screen.getByTestId("UploadInput__inputFile"), [mockFileTrueExtensionCSV]);

        await waitFor(() => {
            expect(screen.queryByTestId("UploadInput")).not.toBeInTheDocument();
        });

        userEvent.click(await screen.findByTestId("FooterDialogConfirm__buttonSave"));

        await waitFor(() => {
            expect(showSnackbar).toBeCalledTimes(1);
        });

        expect(showSnackbar).toBeCalledWith(mockError.message, "error");
    });
});
