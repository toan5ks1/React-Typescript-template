import { ForwardedRef, forwardRef, useState } from "react";

import {
    AutocompleteRenderInputParams,
    ChipTypeMap,
    CircularProgress,
    CircularProgressProps,
} from "@mui/material";
import TextFieldBase, { TextFieldBaseProps } from "src/components/TextFields/TextFieldBase";

import MAutocompleteCustom, {
    MAutocompleteCustomExtendedProps,
    MAutocompleteCustomProps,
} from "../MAutocompleteCustom";

const CircularProgressAutocomplete = (props: CircularProgressProps) => {
    return (
        <CircularProgress
            size={20}
            color={"inherit"}
            data-testid="AutocompleteLoading__root"
            {...props}
        />
    );
};
const TextFieldAutocompleteService = ({
    params,
    isFetching,
    TextFieldPropsOverride = {},
}: {
    params: AutocompleteRenderInputParams;
    isFetching: boolean;
    TextFieldPropsOverride?: TextFieldBaseProps;
}) => {
    return (
        <TextFieldBase
            {...params}
            {...TextFieldPropsOverride}
            InputProps={{
                ...params.InputProps,
                ...TextFieldPropsOverride.InputProps,
                endAdornment: (
                    <>
                        {isFetching ? <CircularProgressAutocomplete /> : null}
                        {params.InputProps.endAdornment}
                    </>
                ),
            }}
        />
    );
};

export type MAutocompleteServiceHookReturn<TData> = {
    isFetching: boolean;
    data: TData[] | undefined;
};
export type MAutocompleteServiceHook<TData, TQueryVariables> = ({
    searchText,
    queryVariables,
}: {
    searchText: string;
    queryVariables: TQueryVariables;
    onSuccess?: (data: TData[]) => void;
}) => MAutocompleteServiceHookReturn<TData>;

interface MAutocompleteServiceExtendedProps<TData, TQueryVariables>
    extends MAutocompleteCustomExtendedProps<TData> {
    useService: MAutocompleteServiceHook<TData, TQueryVariables>;
    queryVariables: TQueryVariables;
    onSuccess?: (data: TData[]) => void;
}

export interface MAutocompleteServiceProps<
    TData,
    TQueryVariables,
    Multiple extends boolean | undefined,
    DisableClearable extends boolean | undefined,
    FreeSolo extends boolean | undefined,
    ChipComponent extends React.ElementType = ChipTypeMap["defaultComponent"]
> extends Omit<
            MAutocompleteCustomProps<TData, Multiple, DisableClearable, FreeSolo, ChipComponent>,
            "renderInput" | "optionLabelKey" | "options"
        >,
        MAutocompleteServiceExtendedProps<TData, TQueryVariables> {}

const MAutocompleteService = <
    TData,
    TQueryVariables,
    Multiple extends boolean | undefined,
    DisableClearable extends boolean | undefined,
    FreeSolo extends boolean | undefined,
    ChipComponent extends React.ElementType = ChipTypeMap["defaultComponent"]
>(
    {
        useService,
        queryVariables,
        onSuccess,
        TextFieldPropsOverride,
        ...restAutocompleteProps
    }: MAutocompleteServiceProps<
        TData,
        TQueryVariables,
        Multiple,
        DisableClearable,
        FreeSolo,
        ChipComponent
    >,
    forwardedRef: ForwardedRef<HTMLInputElement>
) => {
    const [inputTextValue, setInputTextValue] = useState<string>("");

    const { isFetching, data } = useService({
        searchText: inputTextValue,
        queryVariables,
        onSuccess,
    });

    return (
        <MAutocompleteCustom
            ref={forwardedRef}
            loading={isFetching}
            renderInput={(params) => (
                <TextFieldAutocompleteService
                    params={params}
                    isFetching={isFetching}
                    TextFieldPropsOverride={TextFieldPropsOverride}
                />
            )}
            options={data || []}
            onInputChange={(_event, value, _reason) => {
                setInputTextValue(value);
            }}
            filterOptions={(options) => options} // https://mui.com/material-ui/react-autocomplete/#search-as-you-type
            {...restAutocompleteProps}
        />
    );
};

export default forwardRef(MAutocompleteService) as unknown as typeof MAutocompleteService;
