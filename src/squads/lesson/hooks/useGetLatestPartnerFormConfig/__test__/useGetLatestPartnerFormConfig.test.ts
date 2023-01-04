import { UseQueryBaseOptions } from "src/squads/lesson/hooks/data/data-types";
import {
    PartnerFormConfigsOneQuery,
    PartnerFormConfigsOneQueryVariables,
} from "src/squads/lesson/service/bob/bob-types";
import { inferQuery } from "src/squads/lesson/service/infer-query";
import { mockDataConfig } from "src/squads/lesson/test-utils/lesson-report";
import { mockWarner } from "src/squads/lesson/test-utils/warner";

import { renderHook, RenderHookResult } from "@testing-library/react-hooks";
import useGetLatestPartnerFormConfig, {
    UseGetLatestPartnerFormConfigReturn,
} from "src/squads/lesson/hooks/useGetLatestPartnerFormConfig";
import useShowSnackbar from "src/squads/lesson/hooks/useShowSnackbar";

jest.mock("src/squads/lesson/hooks/useShowSnackbar", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

jest.mock("src/squads/lesson/service/infer-query", () => ({
    __esModule: true,
    inferQuery: jest.fn(),
}));

describe("useGetLatestPartnerFormConfig fetch data success", () => {
    it("should return lesson reports", () => {
        const showSnackbar = jest.fn();
        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);
        (inferQuery as jest.Mock).mockImplementation(
            (__: {
                    entity: "partnerDynamicFormFieldValues";
                    action: "partnerFormConfigsGetOneLatestConfig";
                }) =>
                () => {
                    return {
                        data: mockDataConfig,
                        isLoading: false,
                    };
                }
        );
        const {
            result,
        }: RenderHookResult<{ featureName: string }, UseGetLatestPartnerFormConfigReturn> =
            renderHook(() =>
                useGetLatestPartnerFormConfig({
                    featureName: "FeatureNameSample",
                })
            );

        expect(result.current.data).toMatchObject(mockDataConfig);
        expect(result.current.isLoading).toEqual(false);
    });
});

describe("useGetLatestPartnerFormConfig fetch data fail", () => {
    const std = mockWarner();

    it("should not return lesson reports cause fetching error", () => {
        const showSnackbar = jest.fn();
        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);

        (inferQuery as jest.Mock).mockImplementation(
            (__: {
                    entity: "partnerDynamicFormFieldValues";
                    action: "partnerFormConfigsGetOneLatestConfig";
                }) =>
                (
                    _params: PartnerFormConfigsOneQueryVariables,
                    options: UseQueryBaseOptions<PartnerFormConfigsOneQuery | undefined>
                ) => {
                    options.onError?.(Error("FETCH DATA FAIL"));
                }
        );

        renderHook(() =>
            useGetLatestPartnerFormConfig({
                featureName: "FeatureNameSample",
            })
        );

        expect(std.warn).toBeCalledWith(
            "useGetLatestPartnerFormConfig fetch error: ",
            Error("FETCH DATA FAIL")
        );
    });

    it("should show snackbar with error message cause data which queried is undefined", () => {
        const showSnackbar = jest.fn();
        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);
        (inferQuery as jest.Mock).mockImplementation(
            (__: {
                    entity: "partnerDynamicFormFieldValues";
                    action: "partnerFormConfigsGetOneLatestConfig";
                }) =>
                (
                    _params: PartnerFormConfigsOneQueryVariables,
                    options: UseQueryBaseOptions<PartnerFormConfigsOneQuery | undefined>
                ) => {
                    options?.onSuccess?.(undefined);
                }
        );

        renderHook(() =>
            useGetLatestPartnerFormConfig({
                featureName: "FeatureNameSample",
            })
        );

        expect(std.warn).toBeCalledWith(
            "useGetLatestPartnerFormConfig fetch error: there is no partner-form-config"
        );
    });
});
