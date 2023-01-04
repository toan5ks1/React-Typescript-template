import {
    RadioGroup as MaterialRadioGroup,
    RadioGroupProps as MaterialRadioGroupProps,
} from "@mui/material";

export interface RadioGroupBaseProps extends MaterialRadioGroupProps {}

const RadioGroupBase = (props: RadioGroupBaseProps) => {
    return <MaterialRadioGroup {...props} />;
};

export default RadioGroupBase;
