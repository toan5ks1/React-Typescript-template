import { useMemo } from "react";

import { uniqBy } from "lodash";
import get from "lodash/get";
import { Controller, UseControllerProps, useFormContext } from "react-hook-form";
import { firstOptionsChoice } from "src/common/helpers/helpers";
import { UseFormRules } from "src/squads/communication/typings/react-hook-form";

import { FormControl } from "@mui/material";
import AutocompleteBase, {
    AutocompleteBaseProps,
} from "src/components/Autocompletes/AutocompleteBase";

import { ChoiceType } from "src/squads/communication/hooks/useAutocompleteReference";

export interface CreatableAutocompleteHFProps<T> extends AutocompleteBaseProps<T>, UseFormRules {
    name: UseControllerProps["name"];
    shouldShowHelperText?: boolean;
    onAddOption?: (value: string) => void;
    addOptionMessagePrefix?: string;
    addedOption?: T;
    inputValue: string;
}

const CreatableAutocompleteHF = <T extends any>({
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
    options,
    onAddOption,
    addOptionMessagePrefix = "",
    getOptionSelectedField,
    inputValue,
    addedOption,
    ...rest
}: CreatableAutocompleteHFProps<T>) => {
    const {
        control,
        formState: { errors },
        clearErrors,
    } = useFormContext();

    const defaultValue = useMemo(() => {
        if (typeof originDefaultValue !== "undefined") return originDefaultValue;

        return multiple ? [] : null;
    }, [multiple, originDefaultValue]);

    const fieldError = get(errors, name);

    const renderOptions = useMemo(() => {
        if (!options.length && inputValue.trim() && typeof optionLabelKey === "string") {
            return [
                firstOptionsChoice<ChoiceType<T>>({
                    firstChoiceLabel: `${addOptionMessagePrefix} "${inputValue}"`,
                    keyValue: optionLabelKey,
                    key: getOptionSelectedField,
                }),
            ];
        }

        if (!addedOption) return options;

        return uniqBy([addedOption, ...options], getOptionSelectedField);
    }, [
        addOptionMessagePrefix,
        addedOption,
        getOptionSelectedField,
        inputValue,
        optionLabelKey,
        options,
    ]);

    return (
        <FormControl variant="outlined" fullWidth size={size}>
            <Controller
                name={name}
                rules={rules}
                control={control}
                render={({ field: { onChange, value, ...restField } }) => {
                    return (
                        <AutocompleteBase<T>
                            required={required}
                            multiple={multiple}
                            value={value ?? null} // avoid undefined, when init useForm
                            size={size}
                            defaultValue={defaultValue}
                            optionLabelKey={optionLabelKey} // If this causes bug you should try to pass in optionLabelKey="value"
                            disableClearable={disableClearable}
                            error={Boolean(fieldError)}
                            helperText={
                                Boolean(fieldError) && shouldShowHelperText && fieldError["message"]
                            }
                            onChange={(_event, onChangeValue, reason) => {
                                clearErrors(name);
                                onSelectOption && onSelectOption(_event, onChangeValue, reason);

                                if (
                                    reason === "createOption" ||
                                    (reason === "selectOption" && !options.length)
                                ) {
                                    return onAddOption && onAddOption(inputValue);
                                }

                                return onChange(onChangeValue);
                            }}
                            options={renderOptions}
                            getOptionSelectedField={getOptionSelectedField}
                            {...rest}
                            {...restField}
                        />
                    );
                }}
            />
        </FormControl>
    );
};

export default CreatableAutocompleteHF;
