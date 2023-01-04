import { forwardRef, HTMLAttributes, ReactNode, Ref, useCallback } from "react";

import get from "lodash/get";
import { FormSize } from "src/common/constants/enum";
import { convertString } from "src/common/constants/helper";
import { genId } from "src/common/utils/id-generator";
import { toShortenStr } from "src/common/utils/other";

import {
    Autocomplete,
    AutocompleteProps,
    AutocompleteRenderGetTagProps,
    AutocompleteRenderInputParams,
    AutocompleteRenderOptionState,
    Box,
    CircularProgress,
    Grid,
} from "@mui/material";
import ChipAutocomplete from "src/components/Chips/ChipAutocomplete";
import Avatar from "src/components/RelatedUser/Avatar";
import TextFieldBase from "src/components/TextFields/TextFieldBase";
import TypographyBase from "src/components/Typographys/TypographyBase";
import TypographyTextSecondary from "src/components/Typographys/TypographyTextSecondary";

import isEqual from "lodash/isEqual";
import useTextEllipsis from "src/hooks/useTextEllipsis";

export interface AutocompleteBaseProps<T>
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

const AutocompleteBase = forwardRef(
    <T extends any>(props: AutocompleteBaseProps<T>, _ref?: Ref<HTMLInputElement>) => {
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
                            const { className, ...tagsProps } = getTagProps({ index });
                            return (
                                <Box
                                    key={`${label}-${index}`}
                                    sx={{
                                        // Results in 4px spacing between each chip tag just like designer alignment
                                        padding: "2px",
                                    }}
                                    maxWidth="100%"
                                    data-testid="AutocompleteBase__tagBox"
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
                                        {...tagsProps}
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
                        data-testid="AutocompleteBase__option"
                        {...props}
                        sx={{ height: optionHelperText ? "68px" : "36px" }}
                        key={genId()}
                    >
                        {optionImage && (
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
                        )}

                        <Grid item>
                            <TypographyBase variant="body1" sx={useTextEllipsis}>
                                {optionLabel}
                            </TypographyBase>
                            {optionHelperText && (
                                <TypographyTextSecondary
                                    variant="body2"
                                    component="p"
                                    sx={useTextEllipsis}
                                    data-testid={`AutocompleteSuggestionItem__helperText__${optionLabel}`}
                                >
                                    {get(option, optionHelperText, shouldDisableShortenStr)}
                                </TypographyTextSecondary>
                            )}
                        </Grid>
                    </Box>
                );
            },
            [optionHelperText, optionImage, optionLabelKey, renderOption, shouldDisableShortenStr]
        );

        const _renderInput = (params: AutocompleteRenderInputParams) => (
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
                    "data-testid": "AutocompleteBase__input",
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
                                    data-testid="AutocompleteBase__loading"
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
                    "data-testid": "AutocompleteBase__listBox",
                    ...rest.ListboxProps,
                }}
                renderInput={_renderInput}
                onChange={onChange}
            />
        );
    }
);

export function getLabel<T>(
    option: T,
    optionLabel: AutocompleteBaseProps<T>["optionLabelKey"],
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
    optionLabel: AutocompleteBaseProps<T>["optionLabelKey"],
    optionImage?: string
) {
    if (!optionImage) return undefined;

    return <Avatar src={get(option, optionImage)} text={getLabel<T>(option, optionLabel)} />;
}

export default AutocompleteBase as <T extends any>(
    props: AutocompleteBaseProps<T>,
    ref?: Ref<HTMLInputElement>
) => JSX.Element;
