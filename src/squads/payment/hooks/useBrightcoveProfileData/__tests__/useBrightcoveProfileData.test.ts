import { inferQuery } from "src/squads/payment/service/infer-query";
import { mockWarner } from "src/squads/payment/test-utils/warner";

import { RetrieveBrightCoveProfileDataResponse } from "manabuf/yasuo/v1/brightcove_pb";

import { UseQueryBaseOptions } from "@manabie-com/react-utils";
import { renderHook } from "@testing-library/react-hooks";
import useBrightcoveProfileData from "src/squads/payment/hooks/useBrightcoveProfileData/useBrightcoveProfileData";
import TestApp from "src/squads/payment/test-utils/TestApp";

jest.mock("src/squads/payment/service/infer-query", () => {
    return {
        __esModule: true,
        inferQuery: jest.fn(),
    };
});

const mockShowSnackBar = jest.fn();
jest.mock("src/squads/payment/hooks/useShowSnackbar", () => ({
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
