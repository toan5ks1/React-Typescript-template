import { useMemo } from "react";

import { Controller, UseControllerProps } from "react-hook-form";
import { UseFormRules } from "src/typings/react-hook-form";

import { FormControl } from "@mui/material";
import AutocompleteBase, {
    AutocompleteBaseProps,
} from "src/squads/calendar/domains/Calendar/components/Autocompletes/AutocompleteBase";

export interface AutocompleteHFProps<T> extends AutocompleteBaseProps<T>, UseFormRules {
    name: UseControllerProps["name"];
    shouldShowHelperText?: boolean;
    translateFLag?: boolean;
}

const AutocompleteHF = <T extends any>({
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
}: AutocompleteHFProps<T>) => {
    const defaultValue = useMemo(
        () =>
            typeof originDefaultValue !== "undefined" ? originDefaultValue : multiple ? [] : null,
        [multiple, originDefaultValue]
    );

    return (
        <FormControl variant="outlined" fullWidth size={size}>
            <Controller
                name={name}
                rules={rules}
                render={({
                    field: { onChange, value, ...restField },
                    fieldState: { error: fieldError },
                }) => {
                    return (
                        <AutocompleteBase<T>
                            required={required}
                            multiple={multiple}
                            value={value ?? null} //avoid undefined, when init useForm
                            size={size}
                            defaultValue={defaultValue}
                            optionLabelKey={optionLabelKey}
                            disableClearable={disableClearable}
                            error={Boolean(fieldError)}
                            helperText={
                                fieldError && shouldShowHelperText ? fieldError.message : undefined
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

export default AutocompleteHF;
