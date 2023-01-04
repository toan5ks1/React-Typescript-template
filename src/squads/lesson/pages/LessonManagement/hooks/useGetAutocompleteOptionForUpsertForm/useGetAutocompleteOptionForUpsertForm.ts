import { useCallback } from "react";

import { arrayHasItem } from "src/common/utils/other";
import {
    DynamicFieldProps,
    DynamicAutocompleteOptionProps,
    DynamicSection,
    DynamicAutocompleteOptionInConfig,
} from "src/squads/lesson/common/types";

import useDynamicFieldLabel from "src/squads/lesson/hooks/useDynamicFieldLabel";

type GetAutocompleteProps = {
    fieldId: DynamicFieldProps["field_id"];
    fieldValue: DynamicAutocompleteOptionProps["key"];
    formSections: DynamicSection[];
};

export type UseGetAutocompleteValueForUpsertFormReturn = (
    props: GetAutocompleteProps
) => DynamicAutocompleteOptionProps | undefined;

/**
 * @returns the function to convert string value to autocomplete option
 * @example { key: type, value: translated_fieldValue }
 *
 * @param fieldId field id match with partner form config section field
 * @param fieldValue string value
 * @param formSections sections of "partner form config" - Example: "mockDataConfig" from {@link src/squads/lesson/test-utils/lesson-report.ts}
 */
const useGetAutocompleteOptionForUpsertForm = (): UseGetAutocompleteValueForUpsertFormReturn => {
    const { convertToAutocompleteOptionProps } = useDynamicFieldLabel();

    const getAutocompleteOption = useCallback(
        ({ fieldId, fieldValue, formSections }: GetAutocompleteProps) => {
            if (!formSections || !arrayHasItem(formSections)) return undefined;

            let value: DynamicAutocompleteOptionProps | undefined = undefined;

            const allSectionFields = formSections.flatMap((section) => section.fields);

            const targetField = allSectionFields.find((field) => field.field_id === fieldId);
            const options: DynamicAutocompleteOptionInConfig[] | undefined =
                targetField?.component_props["options"];

            if (options && arrayHasItem(options)) {
                const valueOption = options.find((option) => option.key === fieldValue);
                if (valueOption) {
                    value = convertToAutocompleteOptionProps(valueOption);
                }
            }

            return value;
        },
        [convertToAutocompleteOptionProps]
    );

    return getAutocompleteOption;
};

export default useGetAutocompleteOptionForUpsertForm;
