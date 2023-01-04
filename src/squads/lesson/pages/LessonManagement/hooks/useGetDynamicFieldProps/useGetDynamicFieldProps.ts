import { cloneElement, useCallback } from "react";

import { ERPModules } from "src/common/constants/enum";

import { TextFieldHFProps } from "src/components/TextFields/TextFieldHF";
import { TypographyBaseProps } from "src/components/Typographys/TypographyBase";
import { AutocompleteHFProps } from "src/squads/lesson/components/Autocompletes/AutocompleteHF";
import { TextFieldPercentageHFProps } from "src/squads/lesson/components/TextFields/TextFieldPercentageHF";
import { SelectIconHFProps } from "src/squads/lesson/pages/LessonManagement/components/Selects/SelectIconHF";

import useLocale from "src/squads/lesson/hooks/useLocale";
import useResourceTranslate from "src/squads/lesson/hooks/useResourceTranslate";
import useTranslate from "src/squads/lesson/hooks/useTranslate";
import {
    SelectIconOption,
    AutocompleteTextOption,
    DynamicField,
    DynamicFieldSelectIconOption,
    DynamicFieldAutocompleteTextOption,
    DynamicFieldLabel,
    ToggleTableLessonReport,
} from "src/squads/lesson/pages/LessonManagement/common/types";
import lessonReportIcons from "src/squads/lesson/pages/LessonManagement/hooks/useGetDynamicFieldProps/LessonReportIcons";

export interface CommonHFProps {
    name: string;
    label: string;
    required: boolean;
    rules: {
        required: {
            value: boolean;
            message: string;
        };
    };
    placeholder: string | undefined;
    id: string;
    "data-testid": string;
}

export interface DynamicFieldComponentProps<T> {
    componentProps: T;
    questionMark?: { message: string };
}

export interface UseGetDynamicFieldPropsReturn {
    getLabel: (label?: DynamicFieldLabel, isInternal?: boolean) => string;
    getPlaceholder: (placeholder?: DynamicFieldLabel) => string | undefined;
    getTypographyProps: (
        dynamicField: DynamicField
    ) => DynamicFieldComponentProps<TypographyBaseProps>;
    getTextFieldProps: (dynamicField: DynamicField) => DynamicFieldComponentProps<TextFieldHFProps>;
    getTextFieldPercentageProps: (
        dynamicField: DynamicField
    ) => DynamicFieldComponentProps<TextFieldPercentageHFProps>;
    getTextFieldAreaProps: (
        dynamicField: DynamicField
    ) => DynamicFieldComponentProps<TextFieldHFProps>;
    getAutocompleteTextProps: (
        dynamicField: DynamicField
    ) => DynamicFieldComponentProps<AutocompleteHFProps<AutocompleteTextOption>>;
    getSelectIconProps: (
        dynamicField: DynamicField
    ) => DynamicFieldComponentProps<SelectIconHFProps<SelectIconOption>>;
    getToggleTableProps: (dynamicField: DynamicField) => ToggleTableLessonReport;
}

export interface UseGetDynamicFieldPropsProps {
    nameHF?: string;
}

const useGetDynamicFieldProps = ({
    nameHF,
}: UseGetDynamicFieldPropsProps): UseGetDynamicFieldPropsReturn => {
    const t = useTranslate();
    const locale = useLocale();

    const tLessonReport = useResourceTranslate(ERPModules.LESSON_REPORTS);
    const tLessonManagement = useResourceTranslate(ERPModules.LESSON_MANAGEMENT);

    const getLabel: UseGetDynamicFieldPropsReturn["getLabel"] = useCallback(
        (label, isInternal) => {
            if (!label) return tLessonManagement("missingTranslation");

            const translationOptions = label.i18n.translations;

            const translatedLabel = translationOptions[locale];
            const fallbackLabel = translationOptions[label.i18n.fallback_language];

            const resultLabel = translatedLabel || fallbackLabel;

            if (isInternal && resultLabel) {
                return `${resultLabel} (${tLessonReport("internalOnly")})`;
            }

            return resultLabel;
        },
        [locale, tLessonManagement, tLessonReport]
    );

    const getPlaceholder: UseGetDynamicFieldPropsReturn["getPlaceholder"] = useCallback(
        (placeholder) => {
            if (!placeholder) return undefined;

            const translationOptions = placeholder.i18n.translations;

            const translatedLabel = translationOptions[locale];
            const fallbackLabel = translationOptions[placeholder.i18n.fallback_language];

            return translatedLabel || fallbackLabel;
        },
        [locale]
    );

    const getCommonProps = useCallback(
        (dynamicField: DynamicField): DynamicFieldComponentProps<CommonHFProps> => {
            const {
                field_id,
                label,
                is_required,
                is_internal,
                component_config: { type, question_mark },
            } = dynamicField;

            const translatedLabel = getLabel(label, is_internal);

            const commonProps = {
                name: nameHF ? nameHF : field_id,
                label: translatedLabel,
                required: is_required,
                rules: {
                    required: {
                        value: is_required,
                        message: t("resources.input.error.required"),
                    },
                },
                placeholder: !translatedLabel
                    ? getPlaceholder(dynamicField.component_props?.placeholder)
                    : undefined,
                id: `DynamicFieldBase__${type}__${field_id}`,
                "data-testid": `DynamicFieldBase__${type}__${field_id}`,
            };

            if (question_mark) {
                return {
                    componentProps: commonProps,
                    questionMark: {
                        message: getLabel(question_mark.message),
                    },
                };
            }

            return { componentProps: commonProps };
        },
        [getLabel, getPlaceholder, nameHF, t]
    );

    const getTypographyProps: UseGetDynamicFieldPropsReturn["getTypographyProps"] = useCallback(
        (dynamicField) => {
            const { questionMark } = getCommonProps(dynamicField);

            const typographyProps: TypographyBaseProps = {
                variant: dynamicField.component_props?.variant,
            };

            return { componentProps: typographyProps, questionMark };
        },
        [getCommonProps]
    );

    const getTextFieldProps: UseGetDynamicFieldPropsReturn["getTextFieldProps"] = useCallback(
        (dynamicField) => {
            const { componentProps: commonProps, questionMark } = getCommonProps(dynamicField);
            const textFieldProps: TextFieldHFProps = { ...commonProps };

            return { componentProps: textFieldProps, questionMark };
        },
        [getCommonProps]
    );

    const getTextFieldPercentageProps: UseGetDynamicFieldPropsReturn["getTextFieldPercentageProps"] =
        useCallback(
            (dynamicField) => {
                const { componentProps: commonProps, questionMark } = getCommonProps(dynamicField);
                const textFieldProps: TextFieldHFProps = { ...commonProps };

                return { componentProps: textFieldProps, questionMark };
            },
            [getCommonProps]
        );

    const getTextFieldAreaProps: UseGetDynamicFieldPropsReturn["getTextFieldAreaProps"] =
        useCallback(
            (dynamicField) => {
                const { componentProps: commonProps, questionMark } = getCommonProps(dynamicField);

                const textFieldAreaProps: TextFieldHFProps = {
                    ...commonProps,
                    InputProps: dynamicField?.component_props?.InputProps,
                };

                return { componentProps: textFieldAreaProps, questionMark };
            },
            [getCommonProps]
        );

    const getAutocompleteTextProps: UseGetDynamicFieldPropsReturn["getAutocompleteTextProps"] =
        useCallback(
            (dynamicField) => {
                const { component_props } = dynamicField;
                const {
                    options = [],
                    optionLabelKey = "",
                    getOptionSelectedField = "",
                } = component_props || {};

                const { componentProps: commonProps, questionMark } = getCommonProps(dynamicField);

                const convertedOptions: AutocompleteTextOption[] = options.map(
                    ({ key, label }: DynamicFieldAutocompleteTextOption) => {
                        return { key, label: getLabel(label) };
                    }
                );

                const autocompleteProps: AutocompleteHFProps<AutocompleteTextOption> = {
                    ...commonProps,
                    options: convertedOptions,
                    optionLabelKey: typeof optionLabelKey === "string" ? optionLabelKey : "",
                    getOptionSelectedField,
                };

                return { componentProps: autocompleteProps, questionMark };
            },
            [getCommonProps, getLabel]
        );

    const getSelectIconProps: UseGetDynamicFieldPropsReturn["getSelectIconProps"] = useCallback(
        (dynamicField) => {
            const { component_props } = dynamicField;
            const { options = [], optionIconLabelKey = "", valueKey = "" } = component_props || {};

            const { componentProps: commonProps, questionMark } = getCommonProps(dynamicField);

            const convertedOptions: SelectIconOption[] = options.map(
                ({ key, icon }: DynamicFieldSelectIconOption) => {
                    return {
                        key,
                        icon: cloneElement(lessonReportIcons[icon], { fontSize: "small" }),
                    };
                }
            );

            const autocompleteProps: SelectIconHFProps<SelectIconOption> = {
                ...commonProps,
                options: convertedOptions,
                optionIconLabelKey,
                valueKey,
            };

            return { componentProps: autocompleteProps, questionMark };
        },
        [getCommonProps]
    );

    const getToggleTableProps: UseGetDynamicFieldPropsReturn["getToggleTableProps"] = useCallback(
        (dynamicField) => {
            const { component_props } = dynamicField;
            const { toggleButtons = [], dynamicFields = [] } = component_props || {};

            const convertedToggleButtons: ToggleTableLessonReport["toggleButtons"] =
                toggleButtons.map(({ field_id, label }) => {
                    return {
                        tableKey: field_id,
                        label: getLabel(label),
                    };
                });

            return {
                dynamicFields,
                toggleButtons: convertedToggleButtons,
            };
        },
        [getLabel]
    );

    return {
        getLabel,
        getPlaceholder,
        getTypographyProps,
        getTextFieldProps,
        getTextFieldPercentageProps,
        getAutocompleteTextProps,
        getSelectIconProps,
        getToggleTableProps,
        getTextFieldAreaProps,
    };
};

export default useGetDynamicFieldProps;
