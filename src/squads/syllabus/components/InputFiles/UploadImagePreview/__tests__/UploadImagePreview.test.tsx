import { act } from "react-dom/test-utils";
import { AttachmentInfo } from "src/common/utils/file";
import { createFile } from "src/squads/syllabus/test-utils/file";
import { getLatestCallParams } from "src/squads/syllabus/test-utils/mock-utils";

import { MediaType } from "manabuf/bob/v1/enums_pb";

import UploadImagePreview, { UploadImagePreviewProps } from "../UploadImagePreview";

import { screen, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useUploadFiles from "src/squads/syllabus/hooks/useUploadFiles";
import TestTranslationProvider from "src/squads/syllabus/test-utils/translate/TestTranslationProvider";

jest.mock("src/squads/syllabus/hooks/useUploadFiles", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

jest.mock("src/squads/syllabus/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: () => jest.fn(),
}));

const renderUtil = (props: UploadImagePreviewProps) => {
    return render(<UploadImagePreview {...props} />, { wrapper: TestTranslationProvider });
};

const voidFn = () => {};

describe(UploadImagePreview.name, () => {
    it("should render loading when upload is in progress", () => {
        (useUploadFiles as jest.Mock).mockReturnValue({
            isUploading: true,
        });

        renderUtil({ onChange: voidFn, onRemove: voidFn });

        expect(screen.getByTestId("Loading__root")).toBeInTheDocument();
    });

    it("should render defaultValue as image src when passed", () => {
        const defaultImageSrc = "https://image.png";
        (useUploadFiles as jest.Mock).mockReturnValue({
            isUploading: false,
        });

        renderUtil({ onChange: voidFn, onRemove: voidFn, defaultValue: defaultImageSrc });

        expect(screen.getByTestId("ImagePreview__root").querySelector("img")).toHaveAttribute(
            "src",
            defaultImageSrc
        );
    });

    it("should render correct upload UI when image src not found", () => {
        (useUploadFiles as jest.Mock).mockReturnValue({
            isUploading: false,
        });

        renderUtil({ onChange: voidFn, onRemove: voidFn });

        expect(screen.getByTestId("ImageIcon")).toBeInTheDocument();
        expect(screen.getByText("Max size: 10MB")).toBeInTheDocument();
    });

    it("should update the new src after upload successfully", async () => {
        const onUploadFilesFn = jest.fn();

        (useUploadFiles as jest.Mock).mockReturnValue({
            onUploadFiles: onUploadFilesFn,
        });

        renderUtil({ onChange: voidFn, onRemove: voidFn });

        const file = createFile("File_name", {
            type: "image/png",
        });

        userEvent.upload(screen.getByTestId("UploadImagePreview__input"), file);

        await waitFor(() => {
            expect(onUploadFilesFn).toBeCalled();
        });
        const [_filesUpload, callback] = getLatestCallParams(onUploadFilesFn);

        const attachmentInfo: AttachmentInfo = {
            name: "attachmentInfo_Name",
            resource: "attachmentInfo_URL",
            type: MediaType.MEDIA_TYPE_PDF,
        };

        act(() => {
            callback.onSuccess({ attachments: [attachmentInfo] });
        });

        expect(screen.getByTestId("ImagePreview__root").querySelector("img")).toHaveAttribute(
            "src",
            attachmentInfo.resource
        );
    });

    it("should clear image and call onRemove prop when delete image", () => {
        const defaultImageSrc = "https://image.png";
        const onRemoveFn = jest.fn();

        (useUploadFiles as jest.Mock).mockReturnValue({
            onUploadFiles: () => {},
        });

        renderUtil({ onChange: voidFn, onRemove: onRemoveFn, defaultValue: defaultImageSrc });

        expect(screen.getByTestId("ImagePreview__root")).toBeInTheDocument();

        userEvent.click(screen.getByTestId("ImagePreview__delete"));

        expect(screen.getByTestId("ImageIcon")).toBeInTheDocument();

        expect(onRemoveFn).toBeCalled();
    });
});
