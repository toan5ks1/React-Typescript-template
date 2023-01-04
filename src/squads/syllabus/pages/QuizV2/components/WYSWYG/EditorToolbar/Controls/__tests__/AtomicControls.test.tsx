import { EditorState } from "draft-js";
import { act } from "react-dom/test-utils";
import { AttachmentInfo } from "src/common/utils/file";
import { createFile } from "src/squads/syllabus/test-utils/file";
import { getLatestCallParams } from "src/squads/syllabus/test-utils/mock-utils";

import ImageIcon from "@mui/icons-material/Image";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import UploadInput, { UploadInputProps } from "src/components/Inputs/UploadInput";

import { MediaType } from "manabuf/bob/v1/enums_pb";

import AtomicControls from "../AtomicControls";
import { MediaControlGroupProps, MediaTypes } from "../control-types";

import { fireEvent, render, screen } from "@testing-library/react";
import useUploadFiles from "src/squads/syllabus/hooks/useUploadFiles";
import TestCommonAppProvider from "src/squads/syllabus/test-utils/TestCommonAppProvider";

const manualControl: MediaTypes[] = [
    {
        label: "audio",
        icon: VolumeUpIcon,
        accept: "audio/*",
        craftFn: jest.fn(),
    },
    {
        label: "image",
        icon: ImageIcon,
        accept: "image/*",
        craftFn: jest.fn(),
    },
];
const editorState = EditorState.createEmpty();
const onChange = jest.fn();
const onUploadFilesFn = jest.fn();

jest.mock("src/components/Inputs/UploadInput", () => {
    const actual = jest.requireActual("src/components/Inputs/UploadInput");

    return {
        __esModule: true,
        default: jest.fn(actual),
    };
});

jest.mock("src/squads/syllabus/hooks/useUploadFiles", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

const mockUseUploadFiles = () => {
    (useUploadFiles as jest.Mock).mockReturnValue({
        onUploadFiles: onUploadFilesFn,
    });
};

const renderUtil = (props: MediaControlGroupProps) =>
    render(<AtomicControls {...props} />, { wrapper: TestCommonAppProvider });

describe(AtomicControls.name, () => {
    beforeEach(() => {
        mockUseUploadFiles();
    });

    it("should call onChange with craftFn's value and close dialog upload file after that", () => {
        const onChangeFn = jest.fn();

        const inputFile = createFile();

        (UploadInput as jest.Mock).mockImplementation(({ onChange }: UploadInputProps) => {
            return (
                <button data-testid="Upload" onClick={() => onChange!([inputFile])}>
                    Upload
                </button>
            );
        });

        const currentEditorState: EditorState = EditorState.createEmpty();

        const controlCraptFn = jest.fn();

        const control: MediaTypes = {
            accept: "pdf",
            icon: () => <span data-testid="Media__icon">Icon</span>,
            label: "LABEL",
            craftFn: controlCraptFn,
        };

        const createNewEditorState = (url: string) => `New content__${url}`;
        controlCraptFn.mockImplementation((_editorState, url: string) => {
            return createNewEditorState(url);
        });

        renderUtil({
            onChange: onChangeFn,
            manualControl: [control],
            editorState: currentEditorState,
        });

        fireEvent.click(screen.getByTestId("Media__icon"));

        expect(screen.getByTestId("BaseDialog__root")).toBeInTheDocument();

        fireEvent.click(screen.getByTestId("Upload"));

        const [_, callback] = getLatestCallParams(onUploadFilesFn);

        const attachmentInfo: AttachmentInfo = {
            name: "attachmentInfo_Name",
            resource: "attachmentInfo_URL",
            type: MediaType.MEDIA_TYPE_IMAGE,
        };

        act(() => {
            callback.onSuccess({ attachments: [attachmentInfo] });
        });

        expect(controlCraptFn).toBeCalledWith(currentEditorState, attachmentInfo.resource);

        expect(onChangeFn).toBeCalledWith(createNewEditorState(attachmentInfo.resource));

        expect(screen.queryByTestId("BaseDialog__root")).not.toBeInTheDocument();
    });

    it("should render audio and image buttons", () => {
        renderUtil({ editorState, onChange, manualControl });

        expect(screen.getByRole("button", { name: "Audio" })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "Image" })).toBeInTheDocument();
    });
});
