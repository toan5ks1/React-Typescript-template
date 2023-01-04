import {
    DynamicAutocompleteOptionInConfig,
    DynamicFormFieldLabel,
} from "src/squads/lesson/common/types";

import { renderHook, RenderHookResult } from "@testing-library/react-hooks";
import useDynamicFieldLabel, {
    UseDynamicFieldLabelReturn,
} from "src/squads/lesson/hooks/useDynamicFieldLabel";
import useLocale from "src/squads/lesson/hooks/useLocale";
import { LanguageEnums } from "src/squads/lesson/typings/i18n-provider";

jest.mock("src/squads/lesson/hooks/useLocale", () => jest.fn());

const mockLanguageMode = (lang: LanguageEnums) => {
    (useLocale as jest.Mock).mockReset().mockImplementation(() => lang);
};

const testRenderLabelBaseOnLanguageMode = (language: LanguageEnums) => {
    mockLanguageMode(language);

    const { result }: RenderHookResult<undefined, UseDynamicFieldLabelReturn> = renderHook(() =>
        useDynamicFieldLabel()
    );

    const labelFromConfig: DynamicFormFieldLabel = {
        i18n: {
            fallback_language: LanguageEnums.JA,
            translations: {
                en: "Attend",
                ja: "出席",
                vi: "Attend",
            },
        },
    };

    const autocompleteOption: DynamicAutocompleteOptionInConfig = {
        key: "ATTEND",
        label: labelFromConfig,
    };

    expect(result.current.getDynamicFieldLabel(labelFromConfig)).toEqual(
        labelFromConfig.i18n.translations[language]
    );

    expect(result.current.convertToAutocompleteOptionProps(autocompleteOption).label).toEqual(
        labelFromConfig.i18n.translations[language]
    );
};

describe("useDynamicFieldLabel testing", () => {
    it("should render labels based on the current language mode", () => {
        testRenderLabelBaseOnLanguageMode(LanguageEnums.EN);
        testRenderLabelBaseOnLanguageMode(LanguageEnums.JA);
        testRenderLabelBaseOnLanguageMode(LanguageEnums.VI);
    });

    it("should render the label based on fallback language when the translation for the current language mode is unavailable", () => {
        mockLanguageMode(LanguageEnums.EN);
        const { result }: RenderHookResult<undefined, UseDynamicFieldLabelReturn> = renderHook(() =>
            useDynamicFieldLabel()
        );

        const fallBackLanguage = LanguageEnums.JA;

        const labelFromConfig: DynamicFormFieldLabel = {
            i18n: {
                fallback_language: fallBackLanguage,
                translations: {
                    en: undefined,
                    ja: "出席",
                    vi: "Attend",
                },
            },
        };

        const autocompleteOption: DynamicAutocompleteOptionInConfig = {
            key: "ATTEND",
            label: labelFromConfig,
        };

        // Return fallback_language
        expect(result.current.getDynamicFieldLabel(labelFromConfig)).toEqual(
            labelFromConfig.i18n.translations[fallBackLanguage]
        );

        expect(result.current.convertToAutocompleteOptionProps(autocompleteOption).label).toEqual(
            labelFromConfig.i18n.translations[fallBackLanguage]
        );
    });

    it("should render missing translation", () => {
        mockLanguageMode(LanguageEnums.EN);
        const { result }: RenderHookResult<undefined, UseDynamicFieldLabelReturn> = renderHook(() =>
            useDynamicFieldLabel()
        );

        const fallBackLanguage = LanguageEnums.JA;

        const labelFromConfig: DynamicFormFieldLabel = {
            i18n: {
                fallback_language: fallBackLanguage,
                translations: {},
            },
        };

        const autocompleteOption: DynamicAutocompleteOptionInConfig = {
            key: "ATTEND",
            label: labelFromConfig,
        };

        // Return fallback_language
        const textResult = result.current.getDynamicFieldLabel(labelFromConfig);
        expect(textResult).toEqual("resources.lesson_management.missingTranslation");

        const optionLabelResult =
            result.current.convertToAutocompleteOptionProps(autocompleteOption).label;
        expect(optionLabelResult).toEqual("resources.lesson_management.missingTranslation");
    });
});
