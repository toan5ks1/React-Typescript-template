import { ModeImportUserTypes } from "src/squads/user/common/types";
import { inferMutation } from "src/squads/user/service/infer-service";

import useGenerateTemplateFile from "../useGenerateTemplateFile";

import { renderHook } from "@testing-library/react-hooks";
import useShowSnackbar from "src/squads/user/hooks/useShowSnackbar";

jest.mock("src/squads/user/hooks/useShowSnackbar", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});
jest.mock("src/squads/user/service/infer-service", () => ({
    __esModule: true,
    inferMutation: jest.fn(),
}));

const testUseGenerateTemplateFile = (mode: ModeImportUserTypes) => {
    const mutateAsync = jest.fn();
    const mockShowSnackbar = jest.fn();

    beforeEach(() => {
        (inferMutation as jest.Mock).mockImplementation(() => {
            return () => {
                return {
                    mutateAsync,
                    isLoading: false,
                };
            };
        });
        (useShowSnackbar as jest.Mock).mockImplementation(() => mockShowSnackbar);
    });

    it("should return func and state loading", () => {
        mutateAsync.mockReturnValue("import-template");
        const {
            result: { current },
        } = renderHook(() => useGenerateTemplateFile(mode));

        expect(typeof current.generateTemplate).toBe("function");
        expect(current.isLoading).toBe(false);
    });

    it("should throw error when data return Unit8Array", async () => {
        mutateAsync.mockReturnValue(new Uint8Array());

        const {
            result: { current },
        } = renderHook(() => useGenerateTemplateFile(mode));

        expect(current.isLoading).toBe(false);

        await current.generateTemplate();

        expect(mockShowSnackbar).toBeCalledWith("ra.manabie-error.invalid_params", "error");
    });

    it("should throw error when call api fail", async () => {
        mutateAsync.mockRejectedValue(new Error("error"));

        const {
            result: { current },
        } = renderHook(() => useGenerateTemplateFile(mode));

        expect(current.isLoading).toBe(false);

        await current.generateTemplate();

        expect(mockShowSnackbar).toBeCalledWith("error", "error");
    });
};

describe("useGenerateTemplateFile with mode: IMPORT_STUDENT_CSV", () => {
    testUseGenerateTemplateFile("IMPORT_STUDENT_CSV");
});

describe("useGenerateTemplateFile with mode: IMPORT_PARENT_CSV", () => {
    testUseGenerateTemplateFile("IMPORT_PARENT_CSV");
});
