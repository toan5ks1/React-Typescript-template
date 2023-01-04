import { isDynamicAutocompleteOptionProps } from "src/squads/lesson/common/utils";
import { mockDataConfig } from "src/squads/lesson/test-utils/lesson-report";

import { renderHook, RenderHookResult } from "@testing-library/react-hooks";
import useLocale from "src/squads/lesson/hooks/useLocale";
import useGetAutocompleteOptionForUpsertForm, {
    UseGetAutocompleteValueForUpsertFormReturn,
} from "src/squads/lesson/pages/LessonManagement/hooks/useGetAutocompleteOptionForUpsertForm";
import { LanguageEnums } from "src/squads/lesson/typings/i18n-provider";

jest.mock("src/squads/lesson/hooks/useLocale", () => jest.fn());

const mockLanguageMode = (lang: LanguageEnums) => {
    (useLocale as jest.Mock).mockReset().mockImplementation(() => lang);
};

const mockReturnHook = (language: LanguageEnums) => {
    mockLanguageMode(language);
    const { result }: RenderHookResult<undefined, UseGetAutocompleteValueForUpsertFormReturn> =
        renderHook(() => useGetAutocompleteOptionForUpsertForm());

    return result;
};

describe("useDynamicFieldLabel testing for truthy", () => {
    it("should return autocomplete option based on the language mode", () => {
        const hook = mockReturnHook(LanguageEnums.EN);

        const value = hook.current({
            fieldId: "homework_submission_status",
            fieldValue: "COMPLETED",
            formSections: mockDataConfig.form_config_data.sections,
        });

        expect(isDynamicAutocompleteOptionProps(value)).toEqual(true);
        expect(value).toMatchObject({ key: "COMPLETED", label: "Completed" });
    });

    it("should return autocomplete option based on the language mode", () => {
        const hook = mockReturnHook(LanguageEnums.JA);

        const value = hook.current({
            fieldId: "homework_submission_status",
            fieldValue: "COMPLETED",
            formSections: mockDataConfig.form_config_data.sections,
        });

        expect(isDynamicAutocompleteOptionProps(value)).toEqual(true);
        expect(value).toMatchObject({ key: "COMPLETED", label: "完了" });
    });
});

describe("useDynamicFieldLabel testing for falsy", () => {
    it("should return undefined if config doesn't contain field id match with props", () => {
        const hook = mockReturnHook(LanguageEnums.EN);

        const value = hook.current({
            fieldId: "homework_submission_status",
            fieldValue: "COMPLETED",
            formSections: [],
        });

        expect(value).toBeUndefined();
    });
});
