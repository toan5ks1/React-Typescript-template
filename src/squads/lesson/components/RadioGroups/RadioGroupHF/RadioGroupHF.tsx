import { Controller } from "react-hook-form";
import { FormSize } from "src/common/constants/enum";
import { OptionSelectType } from "src/common/constants/types";
import { HookFormControllerOptionProps } from "src/typings/react-hook-form";

import { FormControl, FormControlLabel, FormHelperText, Grid, GridProps } from "@mui/material";
import RadioGroupBase, {
    RadioGroupBaseProps,
} from "src/squads/lesson/components/RadioGroups/RadioGroupBase";
import RadioBase, { RadioBaseProps } from "src/squads/lesson/components/Radios/RadioBase";

interface RadioGroupHFProps
    extends RadioGroupBaseProps,
        Pick<HookFormControllerOptionProps, "rules"> {
    name: string;
    options: OptionSelectType[];
    size?: FormSize;
    sxRadio?: RadioBaseProps["sx"];
    disabled?: boolean;
    directionGird?: GridProps["direction"];
}

const RadioGroupHF = ({ size = "small", sxRadio, ...props }: RadioGroupHFProps) => {
    const {
        defaultValue = "",
        name,
        onChange: handleOnChange,
        options,
        rules,
        disabled,
        directionGird = "row",
        ...rest
    } = props;

    return (
        <FormControl variant="outlined" fullWidth size={size} disabled={disabled}>
            <Controller
                rules={rules}
                defaultValue={defaultValue}
                name={name}
                render={({ field: { onChange, value }, fieldState: { error: fieldError } }) => (
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
                            <Grid container spacing={1} direction={directionGird}>
                                {options.map((option) => (
                                    <Grid item key={option.id}>
                                        <FormControlLabel
                                            control={
                                                <RadioBase
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
                        {fieldError && (
                            <FormHelperText variant="standard" error={true}>
                                {fieldError.message}
                            </FormHelperText>
                        )}
                    </div>
                )}
            />
        </FormControl>
    );
};

export default RadioGroupHF;
