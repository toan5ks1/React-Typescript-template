import { AutocompleteRecord } from "src/common/constants/types";

import AutocompleteHF, { AutocompleteHFProps } from "../AutocompleteHF";

import useAutocompleteReference, {
    UseAutocompleteReferenceProps,
    ChoiceType,
} from "src/hooks/useAutocompleteReference";

export interface AutocompleteReferenceHFProps<T>
    extends Pick<
            AutocompleteHFProps<ChoiceType<T>>,
            | "optionImage"
            | "disableClearable"
            | "disableCloseOnSelect"
            | "freeSolo"
            | "open"
            | "id"
            | "required"
            | "label"
            | "multiple"
            | "placeholder"
            | "rules"
            | "limitChipText"
            | "filterSelectedOptions"
            | "isOptionEqualToValue"
            | "getOptionDisabled"
            | "disabled"
            | "onInputChange"
            | "onChange"
            | "getOptionSelectedField"
            | "startAdornment"
            | "readOnly"
        >,
        UseAutocompleteReferenceProps<T> {}

const AutocompleteReferenceHFBase = <T extends AutocompleteRecord>({
    optionLabelKey = "name",
    resource,
    optionHelperText,
    firstOptions = [],
    multiple = true,
    name,
    rules,
    setDefaultValue,
    searchFields,
    limitChipText,
    filterFields,
    onInputChange,
    providerTypes,
    ...rest
}: AutocompleteReferenceHFProps<T>) => {
    const { options, setInputVal, loading } = useAutocompleteReference({
        optionHelperText,
        optionLabelKey,
        firstOptions,
        resource,
        name,
        multiple,
        setDefaultValue,
        searchFields,
        limitChipText,
        filterFields,
        providerTypes,
    });

    return (
        <AutocompleteHF<ChoiceType<T>>
            data-testid="AutocompleteReferenceHF"
            {...rest}
            limitChipText={limitChipText}
            name={name}
            multiple={multiple}
            loading={loading}
            optionHelperText={optionHelperText}
            optionLabelKey={optionLabelKey} //If this causes bug you should try to pass in optionLabelKey="value"
            options={options}
            onInputChange={(_e, val, reason) => {
                setInputVal(val);
                onInputChange && onInputChange(_e, val, reason);
            }}
            rules={rules}
            filterOptions={(options: ChoiceType<T>[]) => {
                return options; // hack to search by option: helperText or value
            }}
            filterSelectedOptions
        />
    );
};

const AutocompleteReferenceHF = <T extends AutocompleteRecord = AutocompleteRecord>(
    props: AutocompleteReferenceHFProps<T>
) => {
    return <AutocompleteReferenceHFBase {...props} />;
};

export default AutocompleteReferenceHF;
