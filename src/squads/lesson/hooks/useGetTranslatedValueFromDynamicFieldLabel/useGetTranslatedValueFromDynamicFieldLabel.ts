import { arrayHasItem } from "src/common/utils/other";
import {
    DynamicAutocompleteOptionInConfig,
    DynamicFieldProps,
    DynamicFieldsComponentType,
    DynamicLabelValue,
} from "src/squads/lesson/common/types";

import useDynamicFieldLabel from "src/squads/lesson/hooks/useDynamicFieldLabel";

export type UseGetTranslatedValueFromDynamicFieldLabelReturn = (
    formField: DynamicFieldProps,
    dynamicData: DynamicLabelValue[]
) => string | number | undefined;

const useGetTranslatedValueFromDynamicFieldLabel =
    (): UseGetTranslatedValueFromDynamicFieldLabelReturn => {
        const { getDynamicFieldLabel } = useDynamicFieldLabel();

        const getValueDynamicFormField = (
            formField: DynamicFieldProps,
            dynamicData: DynamicLabelValue[]
        ) => {
            const fieldValue = dynamicData.find(
                (data) => data.field_id === formField.field_id
            )?.value;

            if (!fieldValue) return undefined;

            const isAutocompleteField =
                formField.component_config.type === DynamicFieldsComponentType.AUTOCOMPLETE;

            if (isAutocompleteField) {
                const autocompleteOptions = formField.component_props["options"];

                if (arrayHasItem(autocompleteOptions)) {
                    const optionOfFieldValue: DynamicAutocompleteOptionInConfig =
                        autocompleteOptions.find(
                            (option: DynamicAutocompleteOptionInConfig) => option.key === fieldValue
                        );

                    if (optionOfFieldValue) {
                        return getDynamicFieldLabel(optionOfFieldValue.label);
                    }
                }
            }

            return fieldValue;
        };

        return getValueDynamicFormField;
    };

export default useGetTranslatedValueFromDynamicFieldLabel;
