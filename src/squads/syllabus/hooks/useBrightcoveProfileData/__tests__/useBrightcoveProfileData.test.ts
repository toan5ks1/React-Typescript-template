import logger from "src/squads/syllabus/internals/logger";
import { inferQuery } from "src/squads/syllabus/services/infer-query";
import { getLatestCallParams } from "src/squads/syllabus/test-utils/mock-utils";

import useBrightcoveProfileData from "../useBrightcoveProfileData";

import { renderHook } from "@testing-library/react-hooks";
import useShowSnackbar from "src/squads/syllabus/hooks/useShowSnackbar";
import TestApp from "src/squads/syllabus/test-utils/TestApp";

jest.mock("src/squads/syllabus/internals/logger");

const mockShowSnackBar = jest.fn();
jest.mock("src/squads/syllabus/hooks/useShowSnackbar");

jest.mock("src/squads/syllabus/services/infer-query", () => {
    return {
        __esModule: true,
        inferQuery: jest.fn(),
    };
});

const mockWarner = jest.fn();

describe(useBrightcoveProfileData.name, () => {
    beforeEach(() => {
        (useShowSnackbar as jest.Mock).mockReturnValue(mockShowSnackBar);
        (logger.warn as jest.Mock).mockImplementation(mockWarner);
    });

    it("shouldn't crash when get brightcove profile is not success", () => {
        (inferQuery as jest.Mock).mockReturnValue(() => ({ data: undefined }));
        const { result } = renderHook(useBrightcoveProfileData, {
            wrapper: TestApp,
        });

        expect(result.current.accountId).toEqual("");
        expect(result.current.policyKey).toEqual("");
    });

    it("should log error and show error message on error", () => {
        const mockQuery = jest.fn().mockReturnValue({});
        (inferQuery as jest.Mock).mockReturnValue(mockQuery);

        renderHook(useBrightcoveProfileData, {
            wrapper: TestApp,
        });

        const [_, options] = getLatestCallParams(mockQuery);
        const error = new Error("Test error");
        options.onError(error);

        expect(mockWarner).toBeCalledWith("useBrightcoveProfileData", error);
        expect(mockShowSnackBar).toBeCalledWith(
            "Failed to get Brightcove account information",
            "error"
        );
    });
});
