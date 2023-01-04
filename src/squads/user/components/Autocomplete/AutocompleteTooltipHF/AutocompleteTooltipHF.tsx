import { useMemo } from "react";

import get from "lodash/get";
import { Controller, UseControllerProps, useFormContext } from "react-hook-form";
import { UseFormRules } from "src/typings/react-hook-form";

import { FormControl } from "@mui/material";

import AutocompleteTooltipBase, {
    AutocompleteTooltipBaseProps,
} from "../AutocompleteTooltipBase/AutocompleteTooltipBase";

export interface AutocompleteTooltipHFProps<T>
    extends AutocompleteTooltipBaseProps<T>,
        UseFormRules {
    name: UseControllerProps["name"];
    shouldShowHelperText?: boolean;
}

const AutocompleteTooltipHF = <T extends any>({
    size = "small",
    rules,
    defaultValue: originDefaultValue,
    required,
    optionLabelKey,
    disableClearable,
    multiple,
    name,
    onChange: onSelectOption,
    shouldShowHelperText = true,
    ...rest
}: AutocompleteTooltipHFProps<T>) => {
    const {
        control,
        formState: { errors },
    } = useFormContext();

    const defaultValue = useMemo(
        () =>
            typeof originDefaultValue !== "undefined" ? originDefaultValue : multiple ? [] : null,
        [multiple, originDefaultValue]
    );

    const fieldError = get(errors, name);

    return (
        <FormControl variant="outlined" fullWidth size={size}>
            <Controller
                name={name}
                rules={rules}
                control={control}
                render={({ field: { onChange, value, ...restField } }) => {
                    return (
                        <AutocompleteTooltipBase<T>
                            required={required}
                            multiple={multiple}
                            value={value ?? null} //avoid undefined, when init useForm
                            size={size}
                            defaultValue={defaultValue}
                            optionLabelKey={optionLabelKey}
                            disableClearable={disableClearable}
                            error={Boolean(fieldError)}
                            helperText={
                                Boolean(fieldError) && shouldShowHelperText && fieldError["message"]
                            }
                            onChange={(_event, value, reason) => {
                                if (multiple && reason === "createOption") return;
                                // this function is used to pass value option to the parent to handle by using onChange
                                onSelectOption && onSelectOption(_event, value, reason);
                                return onChange(value);
                            }}
                            {...rest}
                            {...restField}
                        />
                    );
                }}
            />
        </FormControl>
    );
};

export default AutocompleteTooltipHF;
