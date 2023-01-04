import { useMemo } from "react";

import {
    DynamicFieldsComponentType,
    DynamicFieldProps,
    DynamicAutocompleteOptionProps,
    DynamicAutocompleteOptionInConfig,
} from "src/squads/lesson/common/types";

import { Box } from "@mui/material";
import AutocompleteHF, { AutocompleteHFProps } from "src/components/Autocompletes/AutocompleteHF";
import TextFieldHF, { TextFieldHFProps } from "src/components/TextFields/TextFieldHF";
import TypographyBase, { TypographyBaseProps } from "src/components/Typographys/TypographyBase";
import TextFieldPercentageHF, {
    TextFieldPercentageHFProps,
} from "src/squads/lesson/components/TextFields/TextFieldPercentageHF";

import useDynamicFieldLabel from "src/squads/lesson/hooks/useDynamicFieldLabel";
import useTranslate from "src/squads/lesson/hooks/useTranslate";

export interface DynamicFieldBaseProps {
    componentType: DynamicFieldsComponentType;
    fieldProps: DynamicFieldProps;
    name: string;
}

type DynamicFieldMapToPropType = {
    [DynamicFieldsComponentType.TYPOGRAPHY]: TypographyBaseProps;
    [DynamicFieldsComponentType.TEXT_FIELD_PERCENTAGE]: TextFieldPercentageHFProps;
    [DynamicFieldsComponentType.AUTOCOMPLETE]: AutocompleteHFProps<DynamicAutocompleteOptionProps>;
    [DynamicFieldsComponentType.TEXT_FIELD]: TextFieldHFProps;
    [DynamicFieldsComponentType.TEXT_FIELD_AREA]: TextFieldHFProps;
};

const DynamicFieldBase = (props: DynamicFieldBaseProps) => {
    const { componentType, fieldProps, name } = props;

    const t = useTranslate();
    const { getDynamicFieldLabel, convertToAutocompleteOptionProps } = useDynamicFieldLabel();

    const commonProps = useMemo(
        () => ({
            name,
            label: getDynamicFieldLabel(fieldProps.label),
            required: fieldProps.is_required,
            rules: {
                required: {
                    value: fieldProps.is_required,
                    message: t("resources.input.error.required"),
                },
            },
        }),
        [fieldProps, name, t, getDynamicFieldLabel]
    );

    const coreElement = () => {
        switch (componentType) {
            case DynamicFieldsComponentType.AUTOCOMPLETE: {
                const autocompleteProps: DynamicFieldMapToPropType["AUTOCOMPLETE"] = {
                    options: fieldProps.component_props?.options?.map(
                        (option: DynamicAutocompleteOptionInConfig) =>
                            convertToAutocompleteOptionProps(option)
                    ),
                    optionLabelKey: fieldProps.component_props?.optionLabelKey,
                    getOptionSelectedField: "key",
                    ...commonProps,
                };

                return (
                    <AutocompleteHF
                        id={`DynamicFieldBase__autocomplete__${fieldProps.field_id}`}
                        data-testid={`DynamicFieldBase__autocomplete__${fieldProps.field_id}`}
                        {...autocompleteProps}
                    />
                );
            }

            case DynamicFieldsComponentType.TEXT_FIELD_AREA: {
                const textAreaProps: DynamicFieldMapToPropType["TEXT_FIELD_AREA"] = {
                    InputProps: fieldProps.component_props?.InputProps,
                    ...commonProps,
                };

                return (
                    <TextFieldHF
                        id={`DynamicFieldBase__textFieldArea__${fieldProps.field_id}`}
                        data-testid={`DynamicFieldBase__textFieldArea__${fieldProps.field_id}`}
                        {...textAreaProps}
                    />
                );
            }

            case DynamicFieldsComponentType.TYPOGRAPHY: {
                const typographyProps: DynamicFieldMapToPropType["TYPOGRAPHY"] = {
                    children: getDynamicFieldLabel(fieldProps.label),
                };
                return (
                    <Box display="flex" alignItems="center" height="100%">
                        <TypographyBase
                            id={`DynamicFieldBase__typography__${fieldProps.field_id}`}
                            data-testid={`DynamicFieldBase__typography__${fieldProps.field_id}`}
                            {...typographyProps}
                        />
                    </Box>
                );
            }

            case DynamicFieldsComponentType.TEXT_FIELD_PERCENTAGE: {
                return (
                    <TextFieldPercentageHF
                        id={`DynamicFieldBase__textFieldPercentage__${fieldProps.field_id}`}
                        data-testid={`DynamicFieldBase__textFieldPercentage__${fieldProps.field_id}`}
                        {...commonProps}
                    />
                );
            }

            case DynamicFieldsComponentType.TEXT_FIELD:
            default:
                return (
                    <TextFieldHF
                        id={`DynamicFieldBase__textField__${fieldProps.field_id}`}
                        data-testid={`DynamicFieldBase__textField__${fieldProps.field_id}`}
                        {...commonProps}
                    />
                );
        }
    };

    return (
        <Box data-testid="DynamicFieldBase__container" height="100%">
            {coreElement()}
        </Box>
    );
};

export default DynamicFieldBase;
