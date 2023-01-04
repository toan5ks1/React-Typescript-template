import {
    CallableQueryHandler,
    QueryAction,
    QueryEntity,
} from "src/squads/syllabus/services/infer-query";

import AutocompleteHF, { AutocompleteHFProps } from "src/components/Autocompletes/AutocompleteHF";

import useAutocompleteReference, {
    UseAutocompleteReferenceProps,
} from "src/squads/syllabus/hooks/useAutocompleteReference";

export interface AutocompleteReferenceHFProps<E extends QueryEntity, A extends QueryAction<E>>
    extends Pick<
            AutocompleteHFProps<{}>,
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
            | "optionHelperText"
            | "name"
        >,
        UseAutocompleteReferenceProps<E, A> {}

const AutocompleteReferenceHF = <
    E extends QueryEntity,
    A extends QueryAction<E>,
    R = Awaited<ReturnType<CallableQueryHandler<E, A>>>
>({
    optionLabelKey = "name",
    multiple = true,
    name,
    entity,
    action,
    onInputChange,
    params,
    selector,
    onError,
    ...rest
}: AutocompleteReferenceHFProps<E, A>) => {
    const { isFetching, options, setInputVal } = useAutocompleteReference({
        entity,
        action,
        params,
        selector,
        onError,
    });

    return (
        <AutocompleteHF<R>
            data-testid="AutocompleteReferenceHF"
            {...rest}
            name={name}
            multiple={multiple}
            loading={isFetching}
            optionLabelKey={optionLabelKey}
            options={options}
            onInputChange={(_e, val, reason) => {
                setInputVal(val);
                onInputChange && onInputChange(_e, val, reason);
            }}
            filterSelectedOptions
        />
    );
};

export default AutocompleteReferenceHF;
