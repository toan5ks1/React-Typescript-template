import { useMemo, useState } from "react";

import { uniqBy } from "lodash";
import debounce from "lodash/debounce";
import { DEFAULT_DEBOUNCE_AUTOCOMPLETE_TIME } from "src/common/constants/const";
import { inferQuery } from "src/squads/communication/service/infer-query";
import {
    CallableQueryHandler,
    QueryAction,
    QueryEntity,
} from "src/squads/communication/service/infer-query-types";

import { UseQueryBaseOptions } from "@manabie-com/react-utils";

export type ChoiceType<T> = T & {
    value: string;
};

export type ArrayElementChoice<ArrayType> = ArrayType extends readonly (infer ElementType)[]
    ? ElementType
    : ArrayType;

export interface UseAutocompleteReferenceProps<
    E extends QueryEntity,
    A extends QueryAction<E>,
    R = Awaited<ReturnType<CallableQueryHandler<E, A>>>
> extends Pick<
        UseQueryBaseOptions<R, ChoiceType<ArrayElementChoice<R>>[]>,
        "onError" | "selector" | "onSuccess"
    > {
    optionLabelKey?: string;
    getOptionSelectedField: string;
    entity: E;
    action: A;
    params: (input: string) => Parameters<CallableQueryHandler<E, A>>[0];
}
export interface UseAutocompleteReferenceReturns<T> {
    options: ChoiceType<T>[];
    isFetching: boolean;
    setInputVal: (arg: string) => void;
    inputVal: string;
}

const useAutocompleteReference = <
    E extends QueryEntity,
    A extends QueryAction<E>,
    R = Awaited<ReturnType<CallableQueryHandler<E, A>>>
>({
    entity,
    action,
    params,
    selector,
    getOptionSelectedField,
    onSuccess,
    onError,
}: UseAutocompleteReferenceProps<E, A, R>): UseAutocompleteReferenceReturns<
    ArrayElementChoice<R>
> => {
    const [inputVal, setInputVal] = useState("");

    const setInputValDebounced = useMemo(
        () => debounce(setInputVal, DEFAULT_DEBOUNCE_AUTOCOMPLETE_TIME),
        [setInputVal]
    );

    const filter: Parameters<CallableQueryHandler<E, A>>[0] = useMemo(() => {
        return { limit: 30, offset: 0, ...params(inputVal) };
    }, [inputVal, params]);

    const { isFetching, data = [] } = inferQuery({
        entity,
        action,
    })(
        {
            ...(typeof filter === "object" ? filter : {}),
        },
        {
            enabled: true,
            onSuccess,
            selector,
            onError: (error) => {
                window.warner?.log(`[useAutocompleteReference] ${entity}-${String(action)}`, error);
                onError && onError(error);
            },
        }
    );

    // Use uniqBy with getOptionSelectedField to filter out duplicated options because of response options
    const options = useMemo(
        () => uniqBy([...data], getOptionSelectedField),
        [data, getOptionSelectedField]
    );

    return {
        isFetching,
        options,
        setInputVal: setInputValDebounced,
        inputVal,
    };
};

export default useAutocompleteReference;
