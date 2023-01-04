import { MAX_SIZE_EDITOR_UPLOAD } from "src/common/constants/file-size";
import { NotificationFormData } from "src/squads/communication/common/constants/types";
import { TestApp } from "src/squads/communication/test-utils";
import {
    createMockNotificationFormData,
    createMockNotificationMedia,
} from "src/squads/communication/test-utils/notification";
import { TestQueryWrapper } from "src/squads/communication/test-utils/react-hooks";

import MuiPickersUtilsProvider from "src/squads/communication/providers/MuiPickersUtilsProvider";

import FormUploadNotificationFile, {
    FormUploadNotificationFileProps,
} from "../FormUploadNotificationFile";

import { render, RenderResult, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useMediaList from "src/squads/communication/hooks/useMediaList";
import useUploadFiles from "src/squads/communication/hooks/useUploadFiles";
import TestHookFormProvider from "src/squads/communication/test-utils/TestHookFormProvider";

jest.mock("src/squads/communication/hooks/useUploadFiles", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/communication/hooks/useMediaList", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const defaultValuesHookForm: NotificationFormData = {
    ...createMockNotificationFormData(),
    mediaIds: [],
};

const defaultFormUploadNotificationFileProps: FormUploadNotificationFileProps = {
    isSubmittingForm: false,
    maxSize: MAX_SIZE_EDITOR_UPLOAD,
    multiple: false,
};

const onUploadFiles = jest.fn();

const renderFormUploadNotificationFile = (
    props: FormUploadNotificationFileProps = defaultFormUploadNotificationFileProps,
    defaultValues: NotificationFormData = defaultValuesHookForm
): RenderResult => {
    (useUploadFiles as jest.Mock).mockImplementation(() => {
        return {
            isUploading: false,
            onUploadFiles,
        };
    });

    (useMediaList as jest.Mock).mockImplementation(() => ({
        isLoadingMediaList: false,
        mediaList: createMockNotificationMedia(),
    }));

    const wrapper: RenderResult = render(
        <TestApp>
            <MuiPickersUtilsProvider>
                <TestQueryWrapper>
                    <TestHookFormProvider useFormOptions={{ defaultValues }}>
                        <FormUploadNotificationFile {...props} />
                    </TestHookFormProvider>
                </TestQueryWrapper>
            </MuiPickersUtilsProvider>
        </TestApp>
    );
    return wrapper;
};

describe("<FormUploadNotificationFile />", () => {
    it("should render correct UI", () => {
        const wrapper: RenderResult = renderFormUploadNotificationFile();

        expect(
            wrapper.getByTestId("MediaListUploadNotification__buttonUpload")
        ).toBeInTheDocument();
    });

    it("should show and close upload dialog", async () => {
        const wrapper: RenderResult = renderFormUploadNotificationFile();

        userEvent.click(wrapper.getByTestId("MediaListUploadNotification__buttonUpload"));

        expect(wrapper.getByTestId("DialogWithHeaderFooter_wrapper")).toBeInTheDocument();
        const dialogUploadTitle = within(
            wrapper.getByTestId("DialogWithHeaderFooter_wrapper")
        ).getByTestId("DialogWithHeaderFooter__dialogTitle");
        expect(dialogUploadTitle).toHaveTextContent("Upload Material");

        userEvent.click(wrapper.getByTestId("DialogWithHeaderFooter__buttonExit"));

        await waitFor(() => {
            expect(wrapper.queryByTestId("DialogWithHeaderFooter_wrapper")).not.toBeInTheDocument();
        });
    });

    it("should show upload dialog and render file", async () => {
        const wrapper: RenderResult = renderFormUploadNotificationFile();

        const file = [new File(["Example"], "file.pdf")];
        userEvent.click(wrapper.getByTestId("MediaListUploadNotification__buttonUpload"));

        await waitFor(() => {
            expect(wrapper.getByTestId("UploadInput__inputFile")).toBeInTheDocument();
        });

        const inputTarget = wrapper.getByTestId("UploadInput__inputFile") as HTMLInputElement;
        userEvent.upload(inputTarget, file);

        await waitFor(() => {
            expect(onUploadFiles).toBeCalled();
        });
    });

    it("should remove file when clicking on close icon of media list", async () => {
        const wrapper: RenderResult = renderFormUploadNotificationFile(
            defaultFormUploadNotificationFileProps,
            { ...defaultValuesHookForm, mediaIds: ["mediaIds"] }
        );

        expect(
            wrapper.queryByTestId("MediaListUploadNotification__buttonUpload")
        ).not.toBeInTheDocument();
        expect(wrapper.getByTestId("ChipRemoveIcon__icon")).toBeInTheDocument();

        const chipIcon = wrapper.getByTestId("ChipRemoveIcon__icon");

        userEvent.click(chipIcon);

        await waitFor(() => {
            expect(chipIcon).not.toBeInTheDocument();
        });

        expect(
            wrapper.getByTestId("MediaListUploadNotification__buttonUpload")
        ).toBeInTheDocument();
    });
});
