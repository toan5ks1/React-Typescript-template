import { inferQuery } from "src/squads/communication/service/infer-query";
import { TestApp } from "src/squads/communication/test-utils";
import { mockWarner } from "src/squads/communication/test-utils/warner";

import { RetrieveBrightCoveProfileDataResponse } from "manabuf/yasuo/v1/brightcove_pb";

import useBrightcoveProfileData from "../useBrightcoveProfileData";

import { UseQueryBaseOptions } from "@manabie-com/react-utils";
import { renderHook } from "@testing-library/react-hooks";

jest.mock("src/squads/communication/service/infer-query", () => {
    return {
        __esModule: true,
        inferQuery: jest.fn(),
    };
});

const mockShowSnackBar = jest.fn();
jest.mock("src/squads/communication/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: () => mockShowSnackBar,
}));

const renderUseBrightcoveProfileData = () =>
    renderHook(useBrightcoveProfileData, {
        wrapper: TestApp,
    });

describe(useBrightcoveProfileData.name, () => {
    const warner = mockWarner();

    it("should return default data when get brightcove profile is not success", () => {
        (inferQuery as jest.Mock).mockReturnValue(() => ({ data: undefined }));
        const { result } = renderUseBrightcoveProfileData();

        expect(result.current.accountId).toEqual("");
        expect(result.current.policyKey).toEqual("");
    });

    it("should return Brightcove profile", () => {
        const mockResponse: RetrieveBrightCoveProfileDataResponse.AsObject = {
            accountId: "accountId",
            policyKey: "policyKey",
        };
        (inferQuery as jest.Mock).mockReturnValue(() => ({ data: mockResponse }));

        const { result } = renderUseBrightcoveProfileData();

        expect(result.current).toEqual(mockResponse);
    });

    it("should log error and show error message on error", () => {
        const mockUseQuery = (_: undefined, { onError }: UseQueryBaseOptions) => {
            onError?.(new Error("Test error"));
            return {
                data: undefined,
            };
        };
        (inferQuery as jest.Mock).mockImplementation(() => mockUseQuery);

        const { result } = renderUseBrightcoveProfileData();

        expect(result.current.accountId).toEqual("");
        expect(result.current.policyKey).toEqual("");
        expect(warner.warn).toBeCalledWith("useBrightcoveProfileData", new Error("Test error"));
        expect(mockShowSnackBar).toBeCalledWith("Failed to get Brightcove account information");
    });
});
