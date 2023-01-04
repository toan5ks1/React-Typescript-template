import { useFormContext } from "react-hook-form";
import {
    CallableQueryHandler,
    QueryAction,
    QueryEntity,
} from "src/squads/communication/service/infer-query-types";

import AutocompleteHF, { AutocompleteHFProps } from "src/components/Autocompletes/AutocompleteHF";

import useAutocompleteReference, {
    UseAutocompleteReferenceProps,
} from "src/squads/communication/hooks/useAutocompleteReference";
import useTranslate from "src/squads/communication/hooks/useTranslate";

export interface AutocompleteReferenceHFProps<E extends QueryEntity, A extends QueryAction<E>>
    extends Pick<
            AutocompleteHFProps<unknown>,
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
    getOptionSelectedField,
    ...rest
}: AutocompleteReferenceHFProps<E, A>) => {
    const translate = useTranslate();
    const { setError, clearErrors } = useFormContext();

    const { isFetching, options, setInputVal } = useAutocompleteReference({
        entity,
        action,
        params,
        selector,
        getOptionSelectedField,
        onError: () => {
            setError(name, {
                type: "manual",
                message: translate("ra.message.unableToLoadData"),
            });

            return onError;
        },
    });

    return (
        <AutocompleteHF<R>
            data-testid="AutocompleteReferenceHF"
            getOptionSelectedField={getOptionSelectedField}
            {...rest}
            name={name}
            multiple={multiple}
            loading={isFetching}
            optionLabelKey={optionLabelKey} // If this causes bug you should try to pass in optionLabelKey="value"
            options={options}
            onInputChange={(_e, val, reason) => {
                clearErrors(name);
                setInputVal(val);
                onInputChange && onInputChange(_e, val, reason);
            }}
            filterOptions={(options: R[]) => {
                return options; // hack to search by option: helperText or value
            }}
            filterSelectedOptions
        />
    );
};

export default AutocompleteReferenceHF;
