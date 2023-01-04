import { Radio as MaterialRadio, RadioProps as MaterialRadioProps } from "@mui/material";

export interface RadioBaseProps extends MaterialRadioProps {}

const RadioBase = (props: RadioBaseProps) => {
    return <MaterialRadio {...props} />;
};

export default RadioBase;
