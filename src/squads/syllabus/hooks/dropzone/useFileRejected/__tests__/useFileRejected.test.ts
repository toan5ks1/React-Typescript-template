import { FileRejection } from "react-dropzone";
import { convertByte } from "src/common/utils/file";
import { createFileWithSize } from "src/squads/syllabus/test-utils/file";

import useFileRejected from "../useFileRejected";

import { renderHook } from "@testing-library/react-hooks";
import useShowSnackbar from "src/squads/syllabus/hooks/useShowSnackbar";
import TestTranslationProvider from "src/squads/syllabus/test-utils/translate/TestTranslationProvider";

jest.mock("src/squads/syllabus/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe(useFileRejected.name, () => {
    it("should show corectly the msg error (single file rejected)", () => {
        const snackbarFn = jest.fn();
        const maxSize = 555;
        (useShowSnackbar as jest.Mock).mockReturnValue(snackbarFn);

        const { result } = renderHook(() => useFileRejected({ maxSize }), {
            wrapper: TestTranslationProvider,
        });

        const fileName = "fileNameInvalid";
        const fileSize = 1999;

        const files: FileRejection[] = [
            {
                errors: [
                    {
                        message: "message",
                        code: "ANY_ERROR",
                    },
                ],
                file: createFileWithSize({ size: fileSize, fileName }),
            },
        ];

        result.current.onDropRejected(files);

        const { unit, size } = convertByte(fileSize);
        expect(snackbarFn).toBeCalledWith(
            `PNG file type is not allowed or File size is bigger than ${size}${unit}`,
            "error"
        );
    });
});
