import { LabelComponentType, LabelComponentTypeRecord } from "src/squads/lesson/common/constants";
import { DynamicFieldProps, DynamicLabelValue } from "src/squads/lesson/common/types";

import TypographyBase from "src/components/Typographys/TypographyBase";
import TypographyWithValue, {
    TypographyWithValueProps,
} from "src/components/Typographys/TypographyWithValue";

import useDynamicFieldLabel from "src/squads/lesson/hooks/useDynamicFieldLabel";
import useGetTranslatedValueFromDynamicFieldLabel from "src/squads/lesson/hooks/useGetTranslatedValueFromDynamicFieldLabel";

// add generic if want to pass prop labelComponentType
export interface DynamicLabelBaseProps {
    field: DynamicFieldProps;
    labelComponentType: LabelComponentType;
    dynamicData: DynamicLabelValue[];
}

type CommonDynamicLabelBaseProps = Pick<
    TypographyWithValueProps,
    "label" | "value" | "variant" | "dataTestidLabel" | "dataTestidValue"
>;

const DynamicLabelBase = (props: DynamicLabelBaseProps) => {
    const { field, dynamicData, labelComponentType } = props;

    const { getDynamicFieldLabel } = useDynamicFieldLabel();
    const getValueDynamicFormField = useGetTranslatedValueFromDynamicFieldLabel();

    const labelVariant: TypographyWithValueProps["variant"] = "horizontal";

    const commonProps: CommonDynamicLabelBaseProps = {
        label: getDynamicFieldLabel(field.label),
        value: getValueDynamicFormField(field, dynamicData),
        variant: labelVariant,
        dataTestidLabel: "DynamicLabelBase__typographyLabel",
        dataTestidValue: "DynamicLabelBase__typographyValue",
    };

    switch (labelComponentType) {
        case LabelComponentType.TYPOGRAPHY:
            const typographyProps: LabelComponentTypeRecord["TYPOGRAPHY"] = {
                children: getDynamicFieldLabel(field.label),
            };

            return <TypographyBase {...typographyProps} />;

        case LabelComponentType.TYPOGRAPHY_WITH_VALUE:
            const labelProps: LabelComponentTypeRecord["TYPOGRAPHY_WITH_VALUE"] = {
                hasDoubleDash: true,
                ...commonProps,
            };
            //TODO: refactor later, for now we need to add condition to check size of field so that it can be aligned with the fields above
            if (field.display_config.size.md === 12 && field.display_config.size.xs === 12) {
                return <TypographyWithValue xsLabel={3} xsValue={9} {...labelProps} />;
            }
            return <TypographyWithValue {...labelProps} />;

        case LabelComponentType.TYPOGRAPHY_WITH_VALUE_PERCENTAGE:
            const props: LabelComponentTypeRecord["TYPOGRAPHY_WITH_VALUE_PERCENTAGE"] = {
                hasPercentage: true,
                ...commonProps,
            };

            return <TypographyWithValue {...props} />;
        default:
            return <></>;
    }
};

export default DynamicLabelBase;
