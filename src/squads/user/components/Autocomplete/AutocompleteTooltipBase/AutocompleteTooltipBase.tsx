import { useCallback, forwardRef, Ref, ReactNode, HTMLAttributes, Fragment } from "react";

import get from "lodash/get";
import { FormSize } from "src/common/constants/enum";
import { convertString } from "src/common/constants/helper";
import { genId } from "src/common/utils/id-generator";
import { toShortenStr } from "src/common/utils/other";

import {
    Grid,
    CircularProgress,
    Box,
    Autocomplete,
    AutocompleteRenderGetTagProps,
    AutocompleteProps,
    AutocompleteRenderOptionState,
    Tooltip,
} from "@mui/material";
import ChipAutocomplete from "src/components/Chips/ChipAutocomplete";
import Avatar from "src/components/RelatedUser/Avatar";
import TextFieldBase from "src/components/TextFields/TextFieldBase";
import TypographyBase from "src/components/Typographys/TypographyBase";

import isEqual from "lodash/isEqual";
import useTextEllipsis from "src/hooks/useTextEllipsis";

export interface AutocompleteTooltipBaseProps<T>
    extends Omit<AutocompleteProps<T, boolean, boolean, boolean>, "renderInput"> {
    label?: string;
    required?: boolean;
    placeholder?: string;
    matchedElements?: T[];
    optionLabelKey: string | ((x: T) => string);
    helperText?: string;
    size?: FormSize;
    optionImage?: string;
    optionHelperText?: string;
    error?: boolean;
    name?: string;
    startAdornment?: ReactNode;
    limitChipText?: "Ellipsis" | number;
    getOptionSelectedField: string;
    ListboxProps?: AutocompleteProps<T, boolean, boolean, boolean>["ListboxProps"] & {
        "data-testid": string;
    };
}

const AutocompleteTooltipBase = forwardRef(
    <T extends any>(props: AutocompleteTooltipBaseProps<T>, _ref?: Ref<HTMLInputElement>) => {
        const {
            label,
            options,
            loading,
            disabled,
            required,
            helperText,
            placeholder,
            optionLabelKey,
            onChange,
            renderTags,
            error,
            name,
            optionImage,
            optionHelperText,
            disableCloseOnSelect = false,
            size = "small",
            limitChipText = 10,
            startAdornment,
            renderOption,
            getOptionSelectedField,

            ...rest
        } = props;

        const shouldDisableShortenStr = limitChipText === "Ellipsis";
        const _renderTags = useCallback(
            (tagValue: T[], getTagProps: AutocompleteRenderGetTagProps) => {
                if (typeof renderTags === "function") {
                    return renderTags(tagValue, getTagProps);
                }
                return (
                    <>
                        {tagValue.map((option, index) => {
                            const label = getLabel<T>(option, optionLabelKey, true);
                            return (
                                <Box
                                    key={`${label}-${index}`}
                                    p={0.25}
                                    maxWidth="100%"
                                    data-testid="AutocompleteTooltipBase__tagBox"
                                >
                                    <ChipAutocomplete
                                        avatar={renderAvatar<T>(
                                            option,
                                            optionLabelKey,
                                            optionImage
                                        )}
                                        label={
                                            limitChipText === "Ellipsis"
                                                ? label
                                                : toShortenStr(
                                                      getLabel<T>(option, optionLabelKey),
                                                      limitChipText
                                                  )
                                        }
                                        {...getTagProps({ index })}
                                    />
                                </Box>
                            );
                        })}
                    </>
                );
            },
            [limitChipText, optionImage, optionLabelKey, renderTags]
        );

        const _renderOption = useCallback(
            (
                props: HTMLAttributes<HTMLLIElement>,
                option: T,
                state: AutocompleteRenderOptionState
            ) => {
                if (renderOption) return renderOption(props, option, state);
                const optionLabel = getLabel<T>(option, optionLabelKey, shouldDisableShortenStr);
                return (
                    <Box
                        component="li"
                        display="flex"
                        alignItems="center"
                        gap={2}
                        data-testid="AutocompleteTooltipBase__option"
                        {...props}
                        key={genId()}
                    >
                        {optionImage ? (
                            <Grid item>
                                <Avatar
                                    size="huge"
                                    src={get(option, optionImage)}
                                    text={getLabel<T>(
                                        option,
                                        optionLabelKey,
                                        shouldDisableShortenStr
                                    )}
                                />
                            </Grid>
                        ) : null}
                        <Grid item>
                            <TypographyBase variant="body1" sx={useTextEllipsis}>
                                {optionLabel}
                            </TypographyBase>
                            {optionHelperText ? (
                                <Tooltip
                                    placement="top"
                                    title={
                                        <Fragment>
                                            <TypographyBase variant="body2">
                                                {optionLabel}
                                            </TypographyBase>
                                            <TypographyBase variant="inherit" component="p">
                                                {get(
                                                    option,
                                                    optionHelperText,
                                                    shouldDisableShortenStr
                                                )}
                                            </TypographyBase>
                                        </Fragment>
                                    }
                                >
                                    <Box>
                                        <TypographyBase
                                            variant="caption"
                                            sx={{
                                                display: "-webkit-box",
                                                WebkitLineClamp: 1,
                                                WebkitBoxOrient: "vertical",
                                                overflow: "hidden",
                                            }}
                                            data-testid={`AutocompleteSuggestionItem__helperText__${optionLabel}`}
                                        >
                                            {get(option, optionHelperText, shouldDisableShortenStr)}
                                        </TypographyBase>
                                    </Box>
                                </Tooltip>
                            ) : null}
                        </Grid>
                    </Box>
                );
            },
            [optionHelperText, optionImage, optionLabelKey, renderOption, shouldDisableShortenStr]
        );

        const getOptionSelectedCallback = useCallback(
            (option: T, value: T) => getOptionSelected(getOptionSelectedField)(option, value),
            [getOptionSelectedField]
        );

        return (
            <Autocomplete
                disableClearable
                isOptionEqualToValue={getOptionSelectedCallback}
                {...rest}
                fullWidth
                disableCloseOnSelect={disableCloseOnSelect}
                disabled={disabled}
                options={options}
                loading={loading}
                getOptionLabel={(option) =>
                    getLabel<T>(option, optionLabelKey, shouldDisableShortenStr)
                }
                renderOption={_renderOption}
                renderTags={_renderTags}
                ListboxProps={{
                    "data-testid": "AutocompleteTooltipBase__listBox",
                    ...rest.ListboxProps,
                }}
                renderInput={(params) => (
                    <TextFieldBase
                        {...params}
                        fullWidth
                        size={size}
                        helperText={helperText}
                        error={error}
                        required={required}
                        variant="outlined"
                        label={label}
                        name={name}
                        placeholder={placeholder}
                        inputProps={{
                            "data-testid": "AutocompleteTooltipBase__input",
                            ...params.inputProps,
                        }}
                        FormHelperTextProps={{
                            variant: "standard",
                        }}
                        InputProps={{
                            ...params.InputProps,
                            startAdornment: startAdornment
                                ? startAdornment
                                : params.InputProps.startAdornment,
                            endAdornment: (
                                <>
                                    {loading ? (
                                        <CircularProgress
                                            data-testid="AutocompleteTooltipBase__loading"
                                            color="inherit"
                                            size={15}
                                        />
                                    ) : (
                                        params.InputProps.endAdornment
                                    )}
                                </>
                            ),
                        }}
                    />
                )}
                onChange={onChange}
            />
        );
    }
);

export function getLabel<T>(
    option: T,
    optionLabel: AutocompleteTooltipBaseProps<T>["optionLabelKey"],
    disableShortenStr?: boolean
): string {
    if (typeof optionLabel === "function") return optionLabel(option);

    if (disableShortenStr) return get(option, optionLabel);

    return convertString(toShortenStr(get(option, optionLabel), 30));
}

export function getOptionSelected<T>(field: string = "id") {
    return (option: T, value: T | string | number): boolean => {
        return isEqual(get(option, field, option), get(value, field, value));
    };
}

export function renderAvatar<T>(
    option: T,
    optionLabel: AutocompleteTooltipBaseProps<T>["optionLabelKey"],
    optionImage?: string
) {
    if (!optionImage) return undefined;

    return <Avatar src={get(option, optionImage)} text={getLabel<T>(option, optionLabel)} />;
}

export default AutocompleteTooltipBase as <T extends any>(
    props: AutocompleteTooltipBaseProps<T>,
    ref?: Ref<HTMLInputElement>
) => JSX.Element;
