import { ChangeEvent } from "react";

import get from "lodash/get";
import { toShortenStr } from "src/squads/syllabus/common/utils/string";

import { TextField, Autocomplete, AutocompleteProps } from "@mui/material";
import { useFormProps } from "src/squads/syllabus/providers/FormPropsProvider";

import Tag from "./Tag";

export interface BaseAutocompleteProps<T>
    extends Omit<AutocompleteProps<T, true, undefined, undefined>, "renderInput"> {
    options: any[];
    label?: string;
    required?: boolean;
    placeholder?: string;
    matchedElements?: T[];
    optionLabelKey: string | ((x: T) => string);
    onChange: (e: ChangeEvent<{}>, selected: T[]) => void;
}

const BaseAutocomplete = <T extends any>(props: BaseAutocompleteProps<T>) => {
    const {
        label,
        options,
        required,
        onChange,
        placeholder,
        defaultValue,
        optionLabelKey,
        matchedElements,
        ...rest
    } = props;
    const { readOnly } = useFormProps();

    return (
        <Autocomplete
            multiple
            disabled={readOnly}
            options={options}
            filterSelectedOptions
            getOptionLabel={(option) => getLabel<T>(option, optionLabelKey)}
            renderTags={(value: T[], getTagProps) => {
                const batchValues = matchedElements || value;
                return batchValues.map((option: T, index: number) => {
                    const label = toShortenStr(getLabel<T>(option, optionLabelKey) || "", 30);
                    return <Tag {...getTagProps({ index })} key={index} label={label} />;
                });
            }}
            {...rest}
            renderInput={(params) => (
                <TextField
                    {...params}
                    required={required}
                    variant="outlined"
                    label={label}
                    placeholder={placeholder}
                />
            )}
            onChange={onChange}
        />
    );
};

function getLabel<T>(option: T, optionLabel: BaseAutocompleteProps<T>["optionLabelKey"]) {
    if (typeof optionLabel === "function") return optionLabel(option);

    return get(option, optionLabel);
}

export default BaseAutocomplete;
