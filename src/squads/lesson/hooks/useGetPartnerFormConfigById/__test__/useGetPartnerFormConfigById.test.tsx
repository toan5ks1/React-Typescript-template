import { UseQueryBaseOptions } from "src/squads/lesson/hooks/data/data-types";
import {
    PartnerFormConfigByIdQuery,
    PartnerFormConfigByIdQueryVariables,
} from "src/squads/lesson/service/bob/bob-types";
import { inferQuery } from "src/squads/lesson/service/infer-query";
import { mockDataConfig } from "src/squads/lesson/test-utils/lesson-report";
import { mockWarner } from "src/squads/lesson/test-utils/warner";

import { renderHook } from "@testing-library/react-hooks";
import isEqual from "lodash/isEqual";
import useGetPartnerFormConfigById from "src/squads/lesson/hooks/useGetPartnerFormConfigById";
import useShowSnackbar from "src/squads/lesson/hooks/useShowSnackbar";

jest.mock("src/squads/lesson/hooks/useShowSnackbar", () => jest.fn());
jest.mock("src/squads/lesson/hooks/useTranslate", () => () => jest.fn());

const formConfigId = "formConfigId";

jest.mock("src/squads/lesson/service/infer-query", () => ({
    __esModule: true,
    inferQuery: jest.fn(),
}));

describe("<useGetPartnerFormConfigById />", () => {
    mockWarner();

    it("should return data correctly when query success", () => {
        (inferQuery as jest.Mock).mockImplementation(
            (__: { entity: "partnerDynamicFormFieldValues"; action: "partnerFormConfigsGetOne" }) =>
                () => {
                    return {
                        data: mockDataConfig,
                    };
                }
        );
        const { result } = renderHook(() => useGetPartnerFormConfigById({ formConfigId }));
        const dataExpectReturn = mockDataConfig?.form_config_data?.sections;

        expect(isEqual(result.current.dataConfig, dataExpectReturn)).toBe(true);
    });
    it("should show snackbar when query fail", () => {
        const showSnackbar = jest.fn();

        (inferQuery as jest.Mock).mockImplementation(
            (__: { entity: "partnerDynamicFormFieldValues"; action: "partnerFormConfigsGetOne" }) =>
                (
                    _params: PartnerFormConfigByIdQueryVariables,
                    options: UseQueryBaseOptions<PartnerFormConfigByIdQuery | undefined>
                ) => {
                    options.onError?.(Error("message"));
                }
        );

        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);
        renderHook(() => useGetPartnerFormConfigById({ formConfigId }));
        expect(showSnackbar).toHaveBeenCalledWith(expect.anything(), "error");
    });
});
