import { useState, useEffect, useRef, useMemo } from "react";

import debounce from "lodash/debounce";
import set from "lodash/set";
import { FieldValues, useFormContext, useWatch } from "react-hook-form";
import { useToggle, useUnmount } from "react-use";
import { DEFAULT_DEBOUNCE_AUTOCOMPLETE_TIME } from "src/common/constants/const";
import { ProviderTypes, FormSize } from "src/common/constants/enum";
import { AutocompleteRecord } from "src/common/constants/types";
import { arrayHasItem } from "src/common/utils/other";
import { RaSortOrder, TypeEntity } from "src/typings/react-admin";

import { getLabel } from "src/squads/lesson/components/Autocompletes/AutocompleteBase";
import { AutocompleteHFProps } from "src/squads/lesson/components/Autocompletes/AutocompleteHF";

import useDataProvider from "src/hooks/useDataProvider";
import useTranslate from "src/squads/lesson/hooks/useTranslate";

export type ChoiceType<T> = T & {
    value: string;
};
export interface UseAutocompleteReferenceProps<T>
    extends Pick<
        AutocompleteHFProps<ChoiceType<T>>,
        "optionHelperText" | "multiple" | "limitChipText"
    > {
    setDefaultValue?: boolean;
    name: string;
    resource: TypeEntity;
    optionLabelKey?: string;
    size?: FormSize;
    firstOptions?: ChoiceType<T>[];
    searchFields?: string[];
    filterFields?: object;
    providerTypes?: ProviderTypes;
}
export interface UseAutocompleteReferenceReturns<T> {
    options: ChoiceType<T>[];
    loading: boolean;
    setInputVal: (arg: string) => void;
    defaultValue: ChoiceType<T>[] | ChoiceType<T> | null | string | number;
}

function getFirstOption<T>(options: ChoiceType<T>[], multiple: boolean) {
    const first = options[0];
    if (!first) {
        return multiple ? [] : null;
    }

    return multiple ? [first] : first;
}

function firstOptionIsEmpty<T>(value: ChoiceType<T>[] | ChoiceType<T>, multiple: boolean) {
    return !(multiple && Array.isArray(value) ? value.length : value);
}

function generateFilter({
    searchFields,
    optionHelperText,
    optionLabelKey,
    inputVal,
    filterFields,
}: {
    searchFields?: string[];
    optionHelperText?: string;
    optionLabelKey: string;
    inputVal?: string;
    filterFields?: object;
}) {
    let filterField = optionHelperText ? optionHelperText : optionLabelKey;
    let filter = set({}, filterField, inputVal);

    if (arrayHasItem(searchFields)) {
        searchFields?.forEach((key) => {
            filter = set(filter, key, inputVal);
        });
    }
    if (filterFields && Object.keys(filterFields).length) {
        filter = { ...filter, ...filterFields };
    }
    return filter;
}
const useAutocompleteReference = <T extends AutocompleteRecord>({
    optionLabelKey = "name",
    resource,
    optionHelperText,
    firstOptions = [],
    multiple = true,
    name,
    setDefaultValue,
    searchFields,
    limitChipText,
    filterFields,
    providerTypes = ProviderTypes.MANY_REFERENCE,
}: UseAutocompleteReferenceProps<T>): UseAutocompleteReferenceReturns<T> => {
    const [inputVal, setInputVal] = useState("");
    const [data, setData] = useState<ChoiceType<T>[]>([]);
    const [loading, setLoading] = useToggle(true);
    const t = useTranslate();
    const {
        setValue,
        formState: { isDirty },
        clearErrors,
        setError,
    } = useFormContext();

    const setInputValDebounced = useMemo(
        () => debounce(setInputVal, DEFAULT_DEBOUNCE_AUTOCOMPLETE_TIME),
        [setInputVal]
    );
    const provider = useDataProvider();
    const unMountedRef = useRef<boolean>(false);

    useUnmount(() => {
        unMountedRef.current = true;
    });

    const filter = useMemo(() => {
        return generateFilter({
            searchFields,
            optionLabelKey,
            optionHelperText,
            inputVal,
            filterFields,
        });
    }, [filterFields, inputVal, optionHelperText, optionLabelKey, searchFields]);

    useEffect(() => {
        void (async () => {
            try {
                clearErrors(name);
                setLoading(true);

                const { data: choices = [] } = await provider(providerTypes, resource, {
                    target: "target_id", //TODO: to make consistent with TS
                    id: "id", //TODO: to make consistent with TS
                    filter,
                    pagination: {
                        perPage: 30,
                        page: 1,
                    },
                    sort: {
                        order: RaSortOrder.DESC,
                        field: "created_at",
                    },
                });
                if (!choices || !choices.length || !Array.isArray(choices)) return;

                const newChoices: ChoiceType<T>[] = choices.map((e: T) => {
                    return {
                        value: getLabel(e, optionLabelKey, limitChipText === "Ellipsis"),
                        ...e,
                    };
                });
                if (!unMountedRef.current) setData(newChoices);
            } catch (err) {
                window.warner?.log("useAutocompleteReference", err);
                if (!unMountedRef.current) {
                    setError(name, {
                        type: "manual",
                        message: t(`ra.message.unableToLoadData`),
                    });
                }
            } finally {
                if (!unMountedRef.current) setLoading(false);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        t,
        clearErrors,
        inputVal,
        optionLabelKey,
        provider,
        resource,
        optionHelperText,
        setLoading,
        setError,
        name,
        // eslint-disable-next-line react-hooks/exhaustive-deps
        JSON.stringify(filter),
    ]);

    const options = useMemo(() => [...firstOptions, ...data], [firstOptions, data]);

    const defaultValue = useMemo(() => getFirstOption(options, multiple), [options, multiple]);

    const value = useWatch<FieldValues, string>({
        defaultValue: defaultValue,
        name: name,
    });

    useEffect(() => {
        const shouldSetDefaultValue =
            firstOptionIsEmpty(value, multiple) &&
            name &&
            defaultValue &&
            setDefaultValue &&
            !isDirty;

        if (!shouldSetDefaultValue) return;

        if (!unMountedRef.current) {
            setValue(name, defaultValue, {
                shouldValidate: true,
                shouldDirty: false, //because we set defaultValue
            });
        }
    }, [defaultValue, setDefaultValue, multiple, name, setValue, value, isDirty]);

    return {
        loading,
        options,
        setInputVal: setInputValDebounced,
        defaultValue,
    };
};

export default useAutocompleteReference;
