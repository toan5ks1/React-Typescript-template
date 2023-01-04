import { ForwardedRef, forwardRef } from "react";

import { toShortenStr } from "src/common/utils/other";

import { Avatar, Box, ChipTypeMap, Stack, Tooltip } from "@mui/material";
import ChipAutocomplete from "src/components/Chips/ChipAutocomplete";
import TextFieldBase, { TextFieldBaseProps } from "src/components/TextFields/TextFieldBase";
import TypographyBase from "src/components/Typographys/TypographyBase";
import TypographyTextSecondary from "src/components/Typographys/TypographyTextSecondary";

import MAutocompleteBase, { MAutocompleteBaseProps } from "../MAutocompleteBase";

import useTextEllipsis from "src/hooks/useTextEllipsis";

//https://dev.to/pffigueiredo/typescript-utility-keyof-nested-object-2pa3
type NestedKeyOf<ObjectType> = ObjectType extends object
    ? {
          [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
              ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
              : `${Key}`;
      }[keyof ObjectType & (string | number)]
    : never;

const getStringAttr = <T extends unknown>(option: T, path: NestedKeyOf<T>): string => {
    const result = path.split(".").reduce((optionAttr, optionKey) => {
        return optionAttr[optionKey];
    }, option);

    return typeof result === "object" || typeof result === "undefined" ? "--" : `${result}`;
};

export interface MAutocompleteCustomExtendedProps<TData> {
    optionLabelKey: NestedKeyOf<TData>; // All options are rendered as option[optionLabelKey]
    optionId: NestedKeyOf<TData>; // This is used for the comparison between autocomplete options
}

// Designers wants to have these limits, depends on the width of the Autocomplete
// It is possible for us to have different sets of limits for different languages in the future
// More discussion: https://manabie.slack.com/archives/CMKRH8FQA/p1658822445705749?thread_ts=1656931758.491419&cid=CMKRH8FQA
type ChipsLimitsVariants = "large" | "medium" | "small";
type ChipLimitsType = Record<
    "ja" | "en",
    Record<
        ChipsLimitsVariants,
        {
            MAX_CHIP_TEXT_LENGTH: number;
            LIMIT_TAGS: number;
        }
    >
>;
const CHIPS_LIMITS_SUPPORTED_LANGUAGE = "ja"; // TODO: support en in future tickets
const CHIPS_LENGTHS_MAPS_BASED_ON_LANGUAGE: ChipLimitsType = {
    ja: {
        large: {
            MAX_CHIP_TEXT_LENGTH: 4,
            LIMIT_TAGS: 4,
        },
        medium: {
            MAX_CHIP_TEXT_LENGTH: 7,
            LIMIT_TAGS: 1,
        },
        small: {
            MAX_CHIP_TEXT_LENGTH: 5,
            LIMIT_TAGS: 1,
        },
    },
    en: {
        large: {
            MAX_CHIP_TEXT_LENGTH: 4,
            LIMIT_TAGS: 4,
        },
        medium: {
            MAX_CHIP_TEXT_LENGTH: 7,
            LIMIT_TAGS: 1,
        },
        small: {
            MAX_CHIP_TEXT_LENGTH: 5,
            LIMIT_TAGS: 1,
        },
    },
};
export interface MAutocompleteCustomProps<
    TOption,
    Multiple extends boolean | undefined,
    DisableClearable extends boolean | undefined,
    FreeSolo extends boolean | undefined,
    ChipComponent extends React.ElementType = ChipTypeMap["defaultComponent"]
> extends Omit<
            MAutocompleteBaseProps<TOption, Multiple, DisableClearable, FreeSolo, ChipComponent>,
            "renderInput"
        >,
        MAutocompleteCustomExtendedProps<TOption> {
    optionHelperTextKey?: NestedKeyOf<TOption>;
    optionImageKey?: NestedKeyOf<TOption>;
    TextFieldPropsOverride?: TextFieldBaseProps;
    chipsLimitsVariant?: ChipsLimitsVariants; // Please ask your designers for this value
    renderInput?: MAutocompleteBaseProps<
        TOption,
        Multiple,
        DisableClearable,
        FreeSolo,
        ChipComponent
    >["renderInput"];
}

const AVATAR_SIZE_LARGE = 40;
const AVATAR_SIZE_LARGE_SPACING = 16;

const AVATAR_SIZE_SMALL = 24;
const AVATAR_SIZE_SMALL_SPACING = 8;

const CHIP_MIN_WIDTH_WITH_AVATAR = "70px";
const CHIP_MIN_WIDTH_WITHOUT_AVATAR = "50px";

const shortenChipTextLength = (chipText: string, limit: number) => {
    return toShortenStr(chipText, limit);
};

const MAutocompleteCustom = <
    TOption,
    Multiple extends boolean | undefined,
    DisableClearable extends boolean | undefined,
    FreeSolo extends boolean | undefined,
    ChipComponent extends React.ElementType = ChipTypeMap["defaultComponent"]
>(
    {
        TextFieldPropsOverride = {},
        renderInput = (params) => {
            return <TextFieldBase {...params} {...TextFieldPropsOverride} />;
        },
        optionId,
        optionLabelKey,
        optionHelperTextKey,
        optionImageKey,
        options = [],
        getOptionLabel = (option) => {
            if (typeof option === "string") {
                return option;
            } else {
                return getStringAttr(option, optionLabelKey);
            }
        },
        chipsLimitsVariant = "large",
        renderTags = (options, getTagProps) => {
            return options.map((option, index) => {
                const avatar = optionImageKey ? (
                    <Avatar
                        src={getStringAttr(option, optionImageKey)}
                        alt={getStringAttr(option, optionLabelKey)}
                    />
                ) : undefined;

                // This is to make sure we don't use the style for tags in the theme
                const { className, ...tagProps } = getTagProps({ index });

                const originalLabel = getStringAttr(option, optionLabelKey);
                const shortenLabel = shortenChipTextLength(
                    originalLabel,
                    CHIPS_LENGTHS_MAPS_BASED_ON_LANGUAGE[CHIPS_LIMITS_SUPPORTED_LANGUAGE][
                        chipsLimitsVariant
                    ].MAX_CHIP_TEXT_LENGTH
                );
                return (
                    <ChipAutocomplete
                        label={shortenLabel}
                        aria-label={originalLabel} //https://manabie.slack.com/archives/CPC6Y9BJN/p1659501466218789
                        {...tagProps}
                        key={tagProps.key}
                        avatar={avatar}
                        sx={{
                            // Results in 4px spacing between each chip tag just like designer alignment
                            margin: "2px",
                            maxWidth: "100%",
                            minWidth: optionImageKey
                                ? CHIP_MIN_WIDTH_WITH_AVATAR
                                : CHIP_MIN_WIDTH_WITHOUT_AVATAR,
                        }}
                    />
                );
            });
        },
        renderOption = (props, option, _state) => {
            const optionKey = getStringAttr(option, optionId);
            const optionLabel = getStringAttr(option, optionLabelKey);
            const optionCaption = optionHelperTextKey
                ? getStringAttr(option, optionHelperTextKey)
                : null;

            // We don't want this gap to change even if theme spacing changes from 8 to 4 so I don't use theme.spacing here
            const avatarSize = optionHelperTextKey ? AVATAR_SIZE_LARGE : AVATAR_SIZE_SMALL;
            const gap = optionHelperTextKey ? AVATAR_SIZE_LARGE_SPACING : AVATAR_SIZE_SMALL_SPACING;
            const optionLabelsMaxWidth = optionImageKey
                ? `calc(100% - ${avatarSize}px - ${gap}px)`
                : "100%";

            return (
                <Box
                    {...props}
                    component="li"
                    key={optionKey}
                    data-testid="AutocompleteBase__option"
                >
                    <Tooltip
                        placement="top"
                        title={
                            <div>
                                {optionLabel}
                                <br />
                                {optionCaption}
                            </div>
                        }
                    >
                        <Stack direction="row" spacing={`${gap}px`} sx={{ maxWidth: "100%" }}>
                            {optionImageKey && (
                                <Avatar
                                    sx={{ width: `${avatarSize}px`, height: `${avatarSize}px` }}
                                    src={getStringAttr(option, optionImageKey)}
                                    alt={getStringAttr(option, optionLabelKey)}
                                />
                            )}
                            <Stack
                                direction="column"
                                justifyContent="center"
                                sx={{
                                    maxWidth: optionLabelsMaxWidth,
                                }}
                            >
                                <TypographyBase variant="body1" sx={useTextEllipsis}>
                                    {optionLabel}
                                </TypographyBase>
                                {optionCaption && (
                                    <TypographyTextSecondary variant="caption" sx={useTextEllipsis}>
                                        {optionCaption}
                                    </TypographyTextSecondary>
                                )}
                            </Stack>
                        </Stack>
                    </Tooltip>
                </Box>
            );
        },
        size = "small", // This is the most common in our system at the moment
        ...restAutocompleteProps
    }: MAutocompleteCustomProps<TOption, Multiple, DisableClearable, FreeSolo, ChipComponent>,
    forwardedRef: ForwardedRef<HTMLInputElement>
) => {
    return (
        <MAutocompleteBase
            ref={forwardedRef}
            renderInput={renderInput}
            getOptionLabel={getOptionLabel}
            limitTags={
                CHIPS_LENGTHS_MAPS_BASED_ON_LANGUAGE[CHIPS_LIMITS_SUPPORTED_LANGUAGE][
                    chipsLimitsVariant
                ].LIMIT_TAGS
            }
            renderTags={renderTags}
            renderOption={renderOption}
            options={options}
            size={size}
            isOptionEqualToValue={(option, value) =>
                option[optionId as unknown as keyof TOption] ===
                value[optionId as unknown as keyof TOption]
            }
            // https://manabie.atlassian.net/browse/LT-17189?focusedCommentId=62841
            // The user has to click out the dropdown list in order to close the dropdown list when choosing options
            disableCloseOnSelect={true}
            {...restAutocompleteProps}
        />
    );
};

export default forwardRef(MAutocompleteCustom) as unknown as typeof MAutocompleteCustom;
