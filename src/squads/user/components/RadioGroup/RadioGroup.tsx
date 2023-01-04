import { FormSize } from "src/common/constants/enum";
import { OptionSelectType } from "src/common/constants/types";

import { FormControl, FormControlLabel, Grid, Radio, RadioProps } from "@mui/material";

import RadioGroupBase, { RadioGroupBaseProps } from "./RadioGroupBase";

interface RadioGroupProps extends RadioGroupBaseProps {
    spacing?: number;
    size?: FormSize;
    sxRadio?: RadioProps["sx"];
    sxLabel?: RadioProps["sx"];
    options: OptionSelectType[];
}

const RadioGroup = ({ size = "small", sxRadio, sxLabel, ...props }: RadioGroupProps) => {
    const { defaultValue = "", value = "", spacing = 1, options, ...rest } = props;

    return (
        <FormControl variant="outlined" fullWidth size={size}>
            <RadioGroupBase row defaultValue={defaultValue} value={value} {...rest}>
                <Grid container spacing={spacing}>
                    {options.map((option) => (
                        <Grid item key={option.id}>
                            <FormControlLabel
                                control={
                                    <Radio
                                        sx={sxRadio}
                                        data-testid={`Radio__${option.id}`}
                                        size={size}
                                        color="primary"
                                    />
                                }
                                sx={sxLabel}
                                label={option.value}
                                name={option.value}
                                value={`${option.id}`}
                            />
                        </Grid>
                    ))}
                </Grid>
            </RadioGroupBase>
        </FormControl>
    );
};

export default RadioGroup;
