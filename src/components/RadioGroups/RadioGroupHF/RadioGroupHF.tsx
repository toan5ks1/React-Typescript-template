import { useFormContext, Controller } from "react-hook-form";
import { FormSize } from "src/common/constants/enum";
import { OptionSelectType } from "src/common/constants/types";
import { HookFormControllerOptionProps } from "src/typings/react-hook-form";

import {
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    Radio,
    RadioProps,
} from "@mui/material";

import RadioGroupBase, { RadioGroupBaseProps } from "../RadioGroupBase";

interface RadioGroupHFProps
    extends RadioGroupBaseProps,
        Pick<HookFormControllerOptionProps, "rules"> {
    name: string;
    options: OptionSelectType[];
    size?: FormSize;
    sxRadio?: RadioProps["sx"];
}

const RadioGroupHF = ({ size = "small", sxRadio, ...props }: RadioGroupHFProps) => {
    const { defaultValue = "", name, onChange: handleOnChange, options, rules, ...rest } = props;

    const {
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <FormControl variant="outlined" fullWidth size={size} error={!!(errors && errors[name])}>
            <Controller
                rules={rules}
                control={control}
                defaultValue={defaultValue}
                name={name}
                render={({ field: { onChange, value } }) => (
                    <div>
                        <RadioGroupBase
                            onChange={(event, selected) => {
                                onChange(event);
                                handleOnChange && handleOnChange(event, selected);
                            }}
                            row
                            defaultValue={`${defaultValue}`}
                            value={value}
                            {...rest}
                        >
                            <Grid container spacing={1}>
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
                                            label={option.value}
                                            name={option.value}
                                            value={`${option.id}`}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </RadioGroupBase>
                        {errors && errors[name] && (
                            <FormHelperText variant="standard" error={true}>
                                {errors[name].message}
                            </FormHelperText>
                        )}
                    </div>
                )}
            />
        </FormControl>
    );
};

export default RadioGroupHF;
