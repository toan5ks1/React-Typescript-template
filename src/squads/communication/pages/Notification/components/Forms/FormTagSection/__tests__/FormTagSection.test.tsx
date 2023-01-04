import { MAX_LENGTH_TAG } from "src/squads/communication/common/constants/enum";
import { TestApp } from "src/squads/communication/test-utils";
import { TestQueryWrapper } from "src/squads/communication/test-utils/react-hooks";

import FormTagSection from "src/squads/communication/pages/Notification/components/Forms/FormTagSection/FormTagSection";

import { UpsertTagResponse } from "manabuf/notificationmgmt/v1/tags_pb";

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useAutocompleteReference from "src/squads/communication/hooks/useAutocompleteReference";
import useDialog from "src/squads/communication/hooks/useDialog";
import useShowSnackbar from "src/squads/communication/hooks/useShowSnackbar";
import useTagMutation from "src/squads/communication/pages/Notification/hooks/useTagMutation";
import TestHookFormProvider from "src/squads/communication/test-utils/TestHookFormProvider";

jest.mock("src/squads/communication/hooks/useDialog", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/communication/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/communication/hooks/useAutocompleteReference", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/communication/pages/Notification/hooks/useTagMutation", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const onOpenCreateTagConfirmDialogMock = jest.fn();
const onCloseCreateTagConfirmDialogMock = jest.fn();
const mockShowSnackbar = jest.fn();
const mockOnUpsertTag = jest.fn();
const mockOnUpsertTagReturn: UpsertTagResponse.AsObject = { tagId: "tagId" };

const mockFormTagSectionConfirmDialog = (isOpen = true) => {
    (useDialog as jest.Mock).mockReturnValue({
        open: isOpen,
        onOpen: onOpenCreateTagConfirmDialogMock,
        onClose: onCloseCreateTagConfirmDialogMock,
    });
};

const mockAutocompleteInputValue = (inputValue: string = "") => {
    (useAutocompleteReference as jest.Mock).mockReturnValue({
        options: [],
        isFetching: false,
        setInputVal: jest.fn(),
        inputVal: inputValue,
    });
};

const mockUseTagMutation = (isSuccess = true) => {
    (useTagMutation as jest.Mock).mockReturnValue({
        onUpsert: mockOnUpsertTag.mockReturnValue(isSuccess ? mockOnUpsertTagReturn : undefined),
    });
};

const renderFormTagSection = () => {
    (useShowSnackbar as jest.Mock).mockImplementation(() => mockShowSnackbar);

    return render(
        <TestApp>
            <TestQueryWrapper>
                <TestHookFormProvider
                    useFormOptions={{
                        defaultValues: {
                            tags: [],
                        },
                    }}
                >
                    <FormTagSection />
                </TestHookFormProvider>
            </TestQueryWrapper>
        </TestApp>
    );
};

describe("<FormTagSection/>", () => {
    it("should render correct UI with the TagAutocompleteHF", () => {
        mockUseTagMutation();
        mockAutocompleteInputValue();
        mockFormTagSectionConfirmDialog(false);
        renderFormTagSection();

        expect(screen.getByTestId("FormTagSection__tagAutocomplete")).toBeInTheDocument();
    });

    it("should call onOpenCreateTagConfirmDialog upon clicking add option", () => {
        const inputValue = "inputValue";

        mockUseTagMutation();
        mockAutocompleteInputValue(inputValue);
        mockFormTagSectionConfirmDialog(false);
        renderFormTagSection();

        const tagInput = screen.getByRole("combobox");

        userEvent.type(tagInput, inputValue);

        const addOptionElement = screen.getByText(`Add "${inputValue}"`);

        expect(addOptionElement).toBeInTheDocument();

        userEvent.click(addOptionElement);

        expect(onOpenCreateTagConfirmDialogMock).toBeCalledTimes(1);
    });

    it("should have onUpsertTag to return value after creating new tag successfully", async () => {
        mockUseTagMutation();
        mockAutocompleteInputValue();
        mockFormTagSectionConfirmDialog(true);
        renderFormTagSection();

        userEvent.click(screen.getByText("Save"));

        expect(mockShowSnackbar).toBeCalledWith("Work in progress", "info");

        await waitFor(() => {
            expect(mockOnUpsertTag).toBeCalledTimes(1);
        });

        expect(mockOnUpsertTag).toHaveReturnedWith(mockOnUpsertTagReturn);
    });

    it("should have onUpsertTag to return undefined after creating new tag failed", async () => {
        mockUseTagMutation(false);
        mockAutocompleteInputValue();
        mockFormTagSectionConfirmDialog(true);
        renderFormTagSection();

        userEvent.click(screen.getByText("Save"));

        expect(mockShowSnackbar).toBeCalledWith("Work in progress", "info");

        await waitFor(() => {
            expect(mockOnUpsertTag).toBeCalledTimes(1);
        });

        expect(mockOnUpsertTag).toHaveReturnedWith(undefined);
    });
});

describe("<FormTagSection/> validation", () => {
    it("should prompt max length error", () => {
        const inputValue = "i".repeat(MAX_LENGTH_TAG + 1);

        mockUseTagMutation();
        mockAutocompleteInputValue(inputValue);
        mockFormTagSectionConfirmDialog(false);
        renderFormTagSection();

        const tagInput = screen.getByRole("combobox");

        userEvent.type(tagInput, inputValue);

        const addOptionElement = screen.getByText(`Add "${inputValue}"`);
        userEvent.click(addOptionElement);

        expect(onOpenCreateTagConfirmDialogMock).toBeCalledTimes(0);
        expect(
            screen.getByText(`Tags must not exceed ${MAX_LENGTH_TAG} characters`)
        ).toBeInTheDocument();
    });
});
