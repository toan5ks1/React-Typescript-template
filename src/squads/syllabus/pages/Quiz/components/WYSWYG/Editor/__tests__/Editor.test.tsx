import { getExampleDraftContent } from "src/squads/syllabus/test-utils/draft-js";
import { createFile } from "src/squads/syllabus/test-utils/file";

import Editor from "../Editor";

import { fireEvent, render, waitFor } from "@testing-library/react";
import useUploadFiles from "src/squads/syllabus/hooks/useUploadFiles";
import TestThemeProvider from "src/squads/syllabus/test-utils/TestThemeProvider";

jest.mock("src/squads/syllabus/hooks/useUploadFiles", () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe("<Editor />", () => {
    it("should has correct content based on editorState", () => {
        const onUploadFilesAsync = jest.fn();
        (useUploadFiles as jest.Mock).mockImplementation(() => {
            return {
                isUploading: false,
                onUploadFilesAsync,
            };
        });

        const { getByRole } = render(
            <TestThemeProvider>
                <Editor editorState={getExampleDraftContent()} />
            </TestThemeProvider>
        );

        expect(getByRole("textbox").textContent).toEqual("IamBatman");
    });

    it("should upload image and run onChange 2 times when paste image form clipboard", async () => {
        const onChange = jest.fn();
        const onUploadFilesAsync = jest.fn().mockImplementation(() => {
            return Promise.resolve({
                attachments: [{ resource: "imageUrl" }],
            });
        });

        (useUploadFiles as jest.Mock).mockImplementation(() => {
            return {
                onUploadFilesAsync,
            };
        });

        const wrapper = render(
            <TestThemeProvider>
                <Editor editorState={getExampleDraftContent()} onChange={onChange} canPasteFile />
            </TestThemeProvider>
        );

        const textbox = wrapper.getByRole("textbox");
        //create fake image/png file
        const image = createFile();
        const inputTarget = document.createElement("input");
        Object.defineProperty(inputTarget, "files", { value: [image] });

        fireEvent.change(inputTarget);

        let clipboardEvent = new Event("paste", {
            bubbles: true,
            cancelable: true,
            composed: true,
        });
        clipboardEvent["clipboardData"] = {
            files: inputTarget.files!,
        };

        textbox.dispatchEvent(clipboardEvent);

        await waitFor(() => {
            expect(onUploadFilesAsync).toBeCalled();
        });
        expect(onChange).toHaveBeenCalledTimes(2);
    });

    it("should not upload and not run onChange when pasted file form clipboard is not an image ", async () => {
        const onChange = jest.fn();
        const onUploadFilesAsync = jest.fn();

        (useUploadFiles as jest.Mock).mockImplementation(() => {
            return {
                onUploadFilesAsync,
            };
        });

        const wrapper = render(
            <TestThemeProvider>
                <Editor editorState={getExampleDraftContent()} onChange={onChange} canPasteFile />
            </TestThemeProvider>
        );

        const textbox = wrapper.getByRole("textbox");
        //create fake application/pdf file
        const file = createFile("pdfFileName", {
            type: "application/pdf",
        });
        const inputTarget = document.createElement("input");
        Object.defineProperty(inputTarget, "files", { value: [file] });

        fireEvent.change(inputTarget);

        let clipboardEvent = new Event("paste", {
            bubbles: true,
            cancelable: true,
            composed: true,
        });
        clipboardEvent["clipboardData"] = {
            files: inputTarget.files!,
        };

        textbox.dispatchEvent(clipboardEvent);

        await waitFor(() => {
            expect(onUploadFilesAsync).not.toBeCalled();
        });
        await waitFor(() => {
            expect(onChange).not.toBeCalled();
        });
    });
});
