import { AttachmentInfo } from "src/common/utils/file";
import { createFile } from "src/squads/syllabus/test-utils/file";
import { getLatestCallParams } from "src/squads/syllabus/test-utils/mock-utils";

import UploadInput, { UploadInputProps } from "src/components/Inputs/UploadInput";

import { MediaType } from "manabuf/bob/v1/enums_pb";

import QuizMaterialUpload, { QuizMaterialUploadProps } from "../QuizMaterialUpload";

import { fireEvent, screen, render } from "@testing-library/react";
import useUploadFiles from "src/squads/syllabus/hooks/useUploadFiles";

jest.mock("src/squads/syllabus/hooks/useUploadFiles", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

jest.mock("src/components/Inputs/UploadInput", () => {
    const actual = jest.requireActual("src/components/Inputs/UploadInput");

    return {
        __esModule: true,
        default: jest.fn(actual),
    };
});

const renderUtil = (props: QuizMaterialUploadProps) => {
    return render(<QuizMaterialUpload {...props} />);
};

describe(QuizMaterialUpload.name, () => {
    it("should setPdfUrl after upload material successfully", () => {
        const onUploadFilesFn = jest.fn();
        const uploadSuccessFn = jest.fn();
        const inputFile = createFile();

        (useUploadFiles as jest.Mock).mockReturnValue({
            onUploadFiles: onUploadFilesFn,
        });

        (UploadInput as jest.Mock).mockImplementation(({ onChange }: UploadInputProps) => {
            return <button data-testid="Upload" onClick={() => onChange!([inputFile])}></button>;
        });

        renderUtil({ onUploadSuccess: uploadSuccessFn });

        fireEvent.click(screen.getByTestId("Upload"));

        const [filesUpload, callback] = getLatestCallParams(onUploadFilesFn);

        const attachmentInfo: AttachmentInfo = {
            name: "attachmentInfo_Name",
            resource: "attachmentInfo_URL",
            type: MediaType.MEDIA_TYPE_PDF,
        };

        callback.onSuccess({ attachments: [attachmentInfo] });

        expect(filesUpload).toEqual([inputFile]);
        expect(uploadSuccessFn).toBeCalledWith(attachmentInfo.resource);
    });
});
