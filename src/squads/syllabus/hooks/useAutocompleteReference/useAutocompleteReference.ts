import { useState, useMemo } from "react";

import debounce from "lodash/debounce";
import { DEFAULT_DEBOUNCE_AUTOCOMPLETE_TIME } from "src/squads/syllabus/common/constants/const";
import { UseQueryBaseOptions } from "src/squads/syllabus/hooks/data/data-types";
import {
    inferQuery,
    QueryAction,
    QueryEntity,
    CallableQueryHandler,
} from "src/squads/syllabus/services/infer-query";

import logger from "../../internals/logger";

export type ChoiceType<T> = T & {
    value: string;
};

export type ArrayElement<ArrayType> = ArrayType extends readonly (infer ElementType)[]
    ? ElementType
    : ArrayType;

export interface UseAutocompleteReferenceProps<
    E extends QueryEntity,
    A extends QueryAction<E>,
    R = Awaited<ReturnType<CallableQueryHandler<E, A>>>
> extends Pick<
        UseQueryBaseOptions<R, ChoiceType<ArrayElement<R>>[]>,
        "onError" | "selector" | "onSuccess"
    > {
    optionLabelKey?: string;
    entity: E;
    action: A;
    params: (input: string) => Parameters<CallableQueryHandler<E, A>>[0];
}
export interface UseAutocompleteReferenceReturns<T> {
    options: ChoiceType<T>[];
    isFetching: boolean;
    setInputVal: (arg: string) => void;
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
    onSuccess,
    onError,
}: UseAutocompleteReferenceProps<E, A, R>): UseAutocompleteReferenceReturns<ArrayElement<R>> => {
    const [inputVal, setInputVal] = useState("");

    const setInputValDebounced = useMemo(
        () => debounce(setInputVal, DEFAULT_DEBOUNCE_AUTOCOMPLETE_TIME),
        [setInputVal]
    );

    const filter = useMemo(() => {
        return params(inputVal);
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
                logger.warn(`[useAutocompleteReference] ${entity}-${String(action)}`, error);

                onError && onError(error);
            },
        }
    );

    return {
        isFetching,
        options: data,
        setInputVal: setInputValDebounced,
    };
};

export default useAutocompleteReference;
