import { useMemo } from "react";

import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Box from "@mui/material/Box";
import TextFieldHF from "src/components/TextFields/TextFieldHF";
import TypographyBase from "src/components/Typographys/TypographyBase";
import TextFieldPercentageHF from "src/squads/lesson/components/TextFields/TextFieldPercentageHF";
import SelectIconHF from "src/squads/lesson/pages/LessonManagement/components/Selects/SelectIconHF";
import TooltipWithIcon from "src/squads/lesson/pages/LessonManagement/components/Tooltips/TooltipWithIcon";

import {
    DynamicFieldComponent,
    DynamicField,
} from "src/squads/lesson/pages/LessonManagement/common/types";
import useGetDynamicFieldProps from "src/squads/lesson/pages/LessonManagement/hooks/useGetDynamicFieldProps";

export interface DynamicFieldBaseV2Props {
    componentType: DynamicFieldComponent;
    dynamicField: DynamicField;
    nameHF?: string;
}

const DynamicFieldBaseV2 = (props: DynamicFieldBaseV2Props) => {
    const { componentType, dynamicField, nameHF } = props;

    const {
        getLabel,
        getTypographyProps,
        getTextFieldProps,
        getTextFieldPercentageProps,
        getSelectIconProps,
        getTextFieldAreaProps,
    } = useGetDynamicFieldProps({ nameHF });

    const dynamicComponent = useMemo(() => {
        switch (componentType) {
            case DynamicFieldComponent.TEXT_FIELD: {
                const { componentProps } = getTextFieldProps(dynamicField);
                return <TextFieldHF {...componentProps} />;
            }

            case DynamicFieldComponent.TEXT_FIELD_PERCENTAGE: {
                const { componentProps } = getTextFieldPercentageProps(dynamicField);
                return <TextFieldPercentageHF {...componentProps} />;
            }

            case DynamicFieldComponent.TEXT_FIELD_AREA: {
                const { componentProps, questionMark } = getTextFieldAreaProps(dynamicField);

                if (questionMark) {
                    return (
                        <TextFieldHF
                            {...componentProps}
                            InputProps={{
                                ...componentProps.InputProps,
                                endAdornment: (
                                    <TooltipWithIcon
                                        tooltipTitle={questionMark.message}
                                        icon={<HelpOutlineIcon />}
                                        position="textarea"
                                    />
                                ),
                            }}
                        />
                    );
                }

                return <TextFieldHF {...componentProps} />;
            }

            case DynamicFieldComponent.SELECT_ICON: {
                const { componentProps } = getSelectIconProps(dynamicField);
                return <SelectIconHF {...componentProps} />;
            }

            case DynamicFieldComponent.TYPOGRAPHY: {
                const { componentProps } = getTypographyProps(dynamicField);

                return (
                    <Box display="flex" alignItems="center" height="100%">
                        <TypographyBase {...componentProps}>
                            {getLabel(dynamicField.label)}
                        </TypographyBase>
                    </Box>
                );
            }

            default:
                return null;
        }
    }, [
        componentType,
        dynamicField,
        getLabel,
        getSelectIconProps,
        getTextFieldAreaProps,
        getTextFieldPercentageProps,
        getTextFieldProps,
        getTypographyProps,
    ]);

    return dynamicComponent;
};

export default DynamicFieldBaseV2;
