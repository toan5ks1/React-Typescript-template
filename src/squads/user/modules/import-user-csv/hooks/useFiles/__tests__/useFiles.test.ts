import {
    mockDataBase64CSV,
    mockDataBase64PDFWithCSVExtension,
} from "src/squads/user/test-utils/mocks/const";
import { createMockFileByBase64 } from "src/squads/user/test-utils/mocks/file";
import { TestCommonAppProvider } from "src/squads/user/test-utils/providers";

import { renderHook, act } from "@testing-library/react-hooks";
import useShowSnackbar from "src/squads/user/hooks/useShowSnackbar";
import useFiles from "src/squads/user/modules/import-user-csv/hooks/useFiles";

jest.mock("src/squads/user/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe("master-import > useFiles", () => {
    const showSnackbar = jest.fn();
    beforeEach(() => {
        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);
    });
    const mockFileTrueExtensionCSV = createMockFileByBase64(mockDataBase64CSV, "name.csv");

    it("should return array file when importing files", async () => {
        const { result } = renderHook(() => useFiles(), { wrapper: TestCommonAppProvider });

        await act(async () => result.current.onChange([mockFileTrueExtensionCSV]));
        expect(result.current.files).toHaveLength(1);
        expect(result.current.files).toEqual([mockFileTrueExtensionCSV]);
    });

    it("should return empty file when removing a file", () => {
        const { result } = renderHook(() => useFiles([mockFileTrueExtensionCSV]), {
            wrapper: TestCommonAppProvider,
        });

        act(() => {
            result.current.onRemove(0);
        });
        expect(result.current.files).toHaveLength(0);
        expect(result.current.files).toEqual([]);
    });

    it("should call fn showSnackbar and return empty file", async () => {
        const { result } = renderHook(() => useFiles(), { wrapper: TestCommonAppProvider });
        const mockFileBase64PDFWithCSVExtension = createMockFileByBase64(
            mockDataBase64PDFWithCSVExtension,
            "name.csv"
        );
        await act(async () => result.current.onChange([mockFileBase64PDFWithCSVExtension]));

        expect(result.current.files).toHaveLength(0);
        expect(result.current.files).toEqual([]);
        expect(showSnackbar).toBeCalledTimes(1);
        expect(showSnackbar).toBeCalledWith(
            "Invalid File type or File size is bigger than 5MB",
            "error"
        );
    });
});
