import { useFormContext } from "react-hook-form";
import {
    CallableQueryHandler,
    QueryAction,
    QueryEntity,
} from "src/squads/communication/service/infer-query-types";

import { AutocompleteReferenceHFProps } from "src/squads/communication/pages/Notification/components/Autocompletes/AutocompleteReferenceHF";
import CreatableAutocompleteHF, {
    CreatableAutocompleteHFProps,
} from "src/squads/communication/pages/Notification/components/Autocompletes/CreatableAutocompleteHF";

import useAutocompleteReference from "src/squads/communication/hooks/useAutocompleteReference";
import useTranslate from "src/squads/communication/hooks/useTranslate";

export interface CreatableAutocompleteReferenceHFProps<
    E extends QueryEntity,
    A extends QueryAction<E>
> extends AutocompleteReferenceHFProps<E, A>,
        Pick<
            CreatableAutocompleteHFProps<Awaited<ReturnType<CallableQueryHandler<E, A>>>[0]>,
            "addOptionMessagePrefix" | "onAddOption" | "addedOption"
        > {}

const CreatableAutocompleteReferenceHF = <
    E extends QueryEntity,
    A extends QueryAction<E>,
    R = Awaited<ReturnType<CallableQueryHandler<E, A>>>
>({
    getOptionSelectedField,
    optionLabelKey = "name",
    multiple = true,
    name,
    entity,
    action,
    onInputChange,
    params,
    selector,
    onError,
    addedOption,
    ...rest
}: CreatableAutocompleteReferenceHFProps<E, A>) => {
    const translate = useTranslate();
    const { setError, clearErrors } = useFormContext();

    const { inputVal, isFetching, options, setInputVal } = useAutocompleteReference({
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
        <CreatableAutocompleteHF<R>
            inputValue={inputVal}
            data-testid="CreatableAutocompleteReferenceHF"
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
            filterSelectedOptions
            addedOption={addedOption}
        />
    );
};

export default CreatableAutocompleteReferenceHF;
