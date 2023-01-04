import { Controller, UseControllerProps, FieldPath } from "react-hook-form";

import { AutocompleteValue } from "@mui/material";
import MAutocompleteService, {
    MAutocompleteServiceProps,
} from "src/components/Autocompletes/MAutocompleteService";

export interface MAutocompleteServiceHFProps<
    TFieldValues,
    TData,
    TQueryVariables,
    Multiple extends boolean | undefined = boolean,
    DisableClearable extends boolean | undefined = boolean,
    FreeSolo extends boolean | undefined = boolean,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends MAutocompleteServiceProps<TData, TQueryVariables, Multiple, DisableClearable, FreeSolo> {
    controllerProps: UseControllerProps<TFieldValues, TName>;
}

const MAutocompleteServiceHF = <
    TFieldValues,
    TData,
    TQueryVariables,
    Multiple extends boolean | undefined = boolean,
    DisableClearable extends boolean | undefined = boolean,
    FreeSolo extends boolean | undefined = boolean,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
    controllerProps,
    ...mAutocompleteServiceProps
}: MAutocompleteServiceHFProps<
    TFieldValues,
    TData,
    TQueryVariables,
    Multiple,
    DisableClearable,
    FreeSolo,
    TName
>) => {
    return (
        <Controller
            {...controllerProps}
            render={({ field: { onChange, onBlur, value, ref }, fieldState: { error } }) => {
                return (
                    <MAutocompleteService
                        {...mAutocompleteServiceProps}
                        TextFieldPropsOverride={{
                            error: Boolean(error),
                            helperText: error
                                ? error.message
                                : mAutocompleteServiceProps.TextFieldPropsOverride?.helperText,
                            ...mAutocompleteServiceProps.TextFieldPropsOverride,
                        }}
                        onBlur={onBlur}
                        ref={ref}
                        value={
                            // Make sure this component is always controlled
                            // If you have problems with isDirty, consider setting default value of the field to null
                            (typeof value === "undefined" ? null : value) as AutocompleteValue<
                                TData,
                                Multiple,
                                DisableClearable,
                                FreeSolo
                            >
                        }
                        onChange={(event, value, reason, details) => {
                            onChange(value);
                            mAutocompleteServiceProps.onChange?.(event, value, reason, details);
                        }}
                    />
                );
            }}
        />
    );
};

export default MAutocompleteServiceHF;
