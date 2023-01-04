import { ForwardedRef, forwardRef } from "react";

import { Autocomplete, AutocompleteProps, ChipTypeMap, TextField } from "@mui/material";

export interface MAutocompleteBaseProps<
    T,
    Multiple extends boolean | undefined,
    DisableClearable extends boolean | undefined,
    FreeSolo extends boolean | undefined,
    ChipComponent extends React.ElementType = ChipTypeMap["defaultComponent"]
> extends AutocompleteProps<T, Multiple, DisableClearable, FreeSolo, ChipComponent> {}

const MAutocompleteBase = <
    T,
    Multiple extends boolean | undefined,
    DisableClearable extends boolean | undefined,
    FreeSolo extends boolean | undefined,
    ChipComponent extends React.ElementType = ChipTypeMap["defaultComponent"]
>(
    {
        renderInput = (params) => <TextField {...params} />,
        options = [],
        ...restAutocompleteProps
    }: MAutocompleteBaseProps<T, Multiple, DisableClearable, FreeSolo, ChipComponent>,
    ref: ForwardedRef<HTMLInputElement>
) => {
    return (
        <Autocomplete
            renderInput={renderInput}
            options={options}
            {...restAutocompleteProps}
            ref={ref}
        />
    );
};

export default forwardRef(MAutocompleteBase) as typeof MAutocompleteBase;
