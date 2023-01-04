import { PORTAL_DIALOG_FOOTER } from "src/common/constants/other";
import { OrderManagementCategory } from "src/squads/payment/constants/master";
import { createMockFiles } from "src/squads/payment/test-utils/mocks/file";

import MasterImport from "src/squads/payment/domains/MasterData/components/MasterImport";

import { render, RenderResult, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TranslationProvider from "src/squads/payment/contexts/TranslationProvider";
import TestApp from "src/squads/payment/test-utils/TestApp";
import TestQueryWrapper from "src/squads/payment/test-utils/TestQueryWrapper";
import TestThemeProvider from "src/squads/payment/test-utils/TestThemeProvider";

const mockFiles = createMockFiles(2);
const mockOnImportFiles = jest.fn();

jest.mock("src/squads/payment/domains/MasterData/hooks/useFiles", () => {
    return () => ({
        files: mockFiles,
        onChange: jest.fn(),
        onRemove: jest.fn(),
    });
});

jest.mock("src/squads/payment/domains/MasterData/hooks/useImport", () => {
    return () => ({
        onImportFiles: mockOnImportFiles,
    });
});

describe("<MasterImport />", () => {
    const onClose = jest.fn();
    let wrapper: RenderResult;

    beforeEach(() => {
        (onClose as jest.Mock).mockReturnValue(onClose);

        //TODO: remove CommonTranslationProvider after cloning <UploadInput />, <DialogFooterConfirm />
        wrapper = render(
            <TestApp>
                <TestThemeProvider>
                    <TranslationProvider>
                        <TestQueryWrapper>
                            <MasterImport
                                category={OrderManagementCategory.AccountingCategory}
                                onClose={onClose}
                            />
                            <div id={PORTAL_DIALOG_FOOTER} />
                        </TestQueryWrapper>
                    </TranslationProvider>
                </TestThemeProvider>
            </TestApp>
        );
    });

    it("should render UI correctly", () => {
        expect(wrapper.getByTestId("ListMediaChipsBase")).toBeInTheDocument();
        expect(wrapper.getByTestId("UploadInput")).toBeInTheDocument();
    });

    it("onClose should called when clicking cancel button", () => {
        const cancelButton = wrapper.getByTestId("FooterDialogConfirm__buttonClose");
        expect(cancelButton).toBeInTheDocument();
        userEvent.click(cancelButton);
        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("onClose should called when click submit button", async () => {
        const saveButton = wrapper.getByTestId("FooterDialogConfirm__buttonSave");
        expect(saveButton).toBeInTheDocument();
        expect(saveButton).not.toBeDisabled();

        userEvent.click(saveButton);

        expect(mockOnImportFiles).toBeCalledTimes(1);

        await waitFor(() => {
            expect(wrapper.queryByTestId("DialogWithHeaderFooter_wrapper")).not.toBeInTheDocument();
        });

        expect(onClose).toHaveBeenCalledTimes(1);
    });
});
