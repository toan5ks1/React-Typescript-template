import { FileRejection } from "react-dropzone";

import TranslationProvider from "src/squads/user/providers/TranslationProvider/TranslationProvider";

import { act, renderHook } from "@testing-library/react-hooks";
import useShowSnackbar from "src/squads/user/hooks/useShowSnackbar";
import useUploadFiles from "src/squads/user/hooks/useUploadFiles";

jest.mock("src/squads/user/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe("useUploadFiles", () => {
    const showSnackbar = jest.fn();
    it("should return a callback function", () => {
        const { result } = renderHook(() => useUploadFiles());

        expect(typeof result.current.onDropRejected).toEqual("function");
    });

    it("should throw context error on file size limit", () => {
        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);

        const rejectionsMock: FileRejection[] = [
            {
                file: new File(["students-import"], "students.csv", {
                    type: "text/csv",
                }),
                errors: [
                    {
                        code: "file-too-large",
                        message: "File is larger than 5000000 bytes",
                    },
                ],
            },
        ];

        const { result } = renderHook(() => useUploadFiles(), { wrapper: TranslationProvider });

        act(() => {
            result.current.onDropRejected(rejectionsMock);
        });

        expect(showSnackbar).toBeCalledWith(
            "Invalid File type or File size is bigger than 5MB",
            "error"
        );
    });

    it("should not throw a missing error message", () => {
        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);

        const rejectionsMock: FileRejection[] = [
            {
                file: new File(["students-import-a"], "students_a.csv", {
                    type: "text/csv",
                }),
                errors: [],
            },
            {
                file: new File(["students-import-b"], "students_b.csv", {
                    type: "text/csv",
                }),
                errors: [],
            },
        ];

        const { result } = renderHook(() => useUploadFiles());

        act(() => {
            result.current.onDropRejected(rejectionsMock);
        });

        expect(showSnackbar).not.toBeCalled();
    });

    it("should check number of files uploaded", () => {
        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);

        const rejectionsMock: FileRejection[] = [
            {
                file: new File(["students-import-a"], "students_a.csv", {
                    type: "text/csv",
                }),
                errors: [
                    {
                        code: "too-many-files",
                        message: "Too many files",
                    },
                ],
            },
            {
                file: new File(["students-import-b"], "students_b.csv", {
                    type: "text/csv",
                }),
                errors: [
                    {
                        code: "too-many-files",
                        message: "Too many files",
                    },
                ],
            },
        ];

        const { result } = renderHook(() => useUploadFiles());

        act(() => {
            result.current.onDropRejected(rejectionsMock);
        });

        expect(rejectionsMock).toHaveLength(2);
    });

    it("it should throw context error on file upload limit", () => {
        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);

        const rejectionsMock: FileRejection[] = [
            {
                file: new File(["students-import-a"], "students_a.csv", {
                    type: "text/csv",
                }),
                errors: [
                    {
                        code: "too-many-files",
                        message: "Too many files",
                    },
                ],
            },
            {
                file: new File(["students-import-b"], "students_b.csv", {
                    type: "text/csv",
                }),
                errors: [
                    {
                        code: "too-many-files",
                        message: "Too many files",
                    },
                ],
            },
        ];

        const { result } = renderHook(() => useUploadFiles(), { wrapper: TranslationProvider });

        act(() => {
            result.current.onDropRejected(rejectionsMock);
        });

        expect(showSnackbar).toBeCalledWith("Only one file is uploaded at a time", "error");
    });
});
