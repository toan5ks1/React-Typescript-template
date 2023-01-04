import { DynamicFieldsComponentType, DynamicLabelValue } from "src/squads/lesson/common/types";
import { generateDynamicFieldProps } from "src/squads/lesson/test-utils/lesson-management";

import { renderHook, RenderHookResult } from "@testing-library/react-hooks";
import useGetTranslatedValueFromDynamicFieldLabel, {
    UseGetTranslatedValueFromDynamicFieldLabelReturn,
} from "src/squads/lesson/hooks/useGetTranslatedValueFromDynamicFieldLabel";
import useLocale from "src/squads/lesson/hooks/useLocale";
import { LanguageEnums } from "src/squads/lesson/typings/i18n-provider";

jest.mock("src/squads/lesson/hooks/useLocale", () => jest.fn());

const mockLanguageMode = (lang: LanguageEnums) => {
    (useLocale as jest.Mock).mockReset().mockImplementation(() => lang);
};

describe("useGetTranslatedValueFromDynamicFieldLabel testing", () => {
    it("should return value of autocomplete option", () => {
        const language = LanguageEnums.JA;
        mockLanguageMode(language);

        const componentType = DynamicFieldsComponentType.AUTOCOMPLETE;
        const fieldProps = generateDynamicFieldProps(componentType);
        const dynamicData: DynamicLabelValue[] = [
            {
                field_id: fieldProps.field_id,
                value: "INCOMPLETE",
            },
        ];

        const {
            result,
        }: RenderHookResult<undefined, UseGetTranslatedValueFromDynamicFieldLabelReturn> =
            renderHook(() => useGetTranslatedValueFromDynamicFieldLabel());

        expect(result.current(fieldProps, dynamicData)).toEqual("未完了");
    });

    it("should return value by default", () => {
        const language = LanguageEnums.JA;
        mockLanguageMode(language);

        const componentType = DynamicFieldsComponentType.TYPOGRAPHY;
        const fieldProps = generateDynamicFieldProps(componentType);
        const dynamicData: DynamicLabelValue[] = [
            {
                field_id: fieldProps.field_id,
                value: "INCOMPLETE",
            },
        ];

        const {
            result,
        }: RenderHookResult<undefined, UseGetTranslatedValueFromDynamicFieldLabelReturn> =
            renderHook(() => useGetTranslatedValueFromDynamicFieldLabel());

        expect(result.current(fieldProps, dynamicData)).toEqual("INCOMPLETE");
    });

    it("should return undefined value cause data does not contain field value", () => {
        const language = LanguageEnums.JA;
        mockLanguageMode(language);

        const componentType = DynamicFieldsComponentType.TYPOGRAPHY;
        const fieldProps = generateDynamicFieldProps(componentType);
        const dynamicData: DynamicLabelValue[] = [
            {
                field_id: "NON_FIELD_ID",
                value: "INCOMPLETE",
            },
        ];

        const {
            result,
        }: RenderHookResult<undefined, UseGetTranslatedValueFromDynamicFieldLabelReturn> =
            renderHook(() => useGetTranslatedValueFromDynamicFieldLabel());

        expect(result.current(fieldProps, dynamicData)).toBeUndefined();
    });
});
