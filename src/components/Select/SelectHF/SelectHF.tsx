import { Controller, useFormContext } from "react-hook-form";
import { FormSize } from "src/common/constants/enum";
import { OptionSelectType } from "src/common/constants/types";
import { HookFormControllerOptionProps } from "src/typings/react-hook-form";

import { InputLabel, FormControl, FormHelperText } from "@mui/material";

import SelectBase, { SelectBaseProps } from "../SelectBase";

export interface SelectHFProps<T>
    extends SelectBaseProps<T>,
        Pick<HookFormControllerOptionProps, "rules"> {
    name: string;
    options: T[];
    size?: FormSize;
}

const SelectHF = <T extends OptionSelectType>(props: SelectHFProps<T>) => {
    const {
        size = "small",
        defaultValue = "",
        name,
        label,
        options,
        rules,
        onChange: handleChange,
        required,
        ...rest
    } = props;

    const {
        control,
        formState: { errors },
    } = useFormContext();

    return (
        <FormControl variant="outlined" size={size} fullWidth>
            <InputLabel required={required} error={!!(errors && errors[name])}>
                {label}
            </InputLabel>
            <Controller
                control={control}
                name={name}
                defaultValue={defaultValue}
                rules={rules}
                render={({ field: { onChange, value } }) => (
                    <SelectBase
                        data-testid="SelectHF__select"
                        label={label}
                        options={options}
                        error={!!(errors && errors[name])}
                        onChange={(event, selected) => {
                            onChange(event);
                            handleChange && handleChange(event, selected);
                        }}
                        value={value}
                        name={name}
                        {...rest}
                    />
                )}
            />
            {errors && errors[name] && (
                <FormHelperText
                    variant="standard"
                    data-testid="SelectHF__formHelperText"
                    error={true}
                >
                    {errors[name].message}
                </FormHelperText>
            )}
        </FormControl>
    );
};

export default SelectHF;
