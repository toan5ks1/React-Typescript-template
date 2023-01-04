import { KeyboardEvent, useEffect, useMemo } from "react";

import { useFormContext } from "react-hook-form";
import { useToggle } from "react-use";
import { COUNTRY_INFO, KEY_CODE } from "src/common/constants/const";
import { OptionSelectType } from "src/common/constants/types";
import { HookFormControllerOptionProps } from "src/squads/user/typings/react-hook-form";

import { Grid, InputAdornment, GridSize, SelectProps, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import SelectHF from "src/components/Select/SelectHF";
import FlagJapanIcon from "src/components/SvgIcons/FlagJapanIcon";
import FlagVietnamIcon from "src/components/SvgIcons/FlagVietnamIcon";
import { TextFieldBaseProps } from "src/components/TextFields/TextFieldBase";
import TextFieldHF from "src/components/TextFields/TextFieldHF";

import { Country } from "manabuf/common/v1/enums_pb";

import MenuItemCountry from "./MenuItemCountry";

import useTranslate from "src/squads/user/hooks/useTranslate";

const PREFIX = "PhoneInputHF";

const classes = {
    outlined: `${PREFIX}-outlined`,
};

const StyledGrid = styled(Grid)({
    [`& .${classes.outlined}`]: {
        transform: "translate(50px, 12px) scale(1)",
        lineHeight: 1,
    },
});

interface PhoneInputHFProps
    extends Omit<TextFieldBaseProps, "onChange">,
        Pick<HookFormControllerOptionProps, "rules"> {
    label: string;
    name: string;
    nameCountryCode: string;
    xsFlag?: boolean | GridSize;
    SelectProps?: SelectProps;
}

export interface PhoneOption extends OptionSelectType {
    id: number;
    label: JSX.Element;
}

const COUNTRY_INFO_IMAGE = {
    [Country.COUNTRY_JP]: <FlagJapanIcon />,
    [Country.COUNTRY_VN]: <FlagVietnamIcon />,
};

const PhoneInputHF = (props: PhoneInputHFProps) => {
    const {
        name,
        nameCountryCode,
        label,
        xsFlag = 3, // We can custom size layout for select flag
        rules,
        InputProps,
        SelectProps,
        variant,
    } = props;

    const t = useTranslate();

    const [shrink, setShrink] = useToggle(false);

    const { trigger, getValues } = useFormContext();

    const countryCode = getValues(nameCountryCode);
    const phone = getValues(name);

    useEffect(() => {
        if (phone?.length > 0) setShrink(true);
    }, [phone, setShrink]);

    const choiceCountries: PhoneOption[] = useMemo(
        () => [
            {
                id: Country.COUNTRY_JP,
                value: "resources.configs.choices.countries.COUNTRY_JP",
                label: (
                    <MenuItemCountry
                        image={COUNTRY_INFO_IMAGE[Country.COUNTRY_JP]}
                        title={t("resources.configs.choices.countries.COUNTRY_JP")}
                    />
                ),
            },
            {
                id: Country.COUNTRY_VN,
                value: "resources.configs.choices.countries.COUNTRY_VN",
                label: (
                    <MenuItemCountry
                        image={COUNTRY_INFO_IMAGE[Country.COUNTRY_VN]}
                        title={t("resources.configs.choices.countries.COUNTRY_VN")}
                    />
                ),
            },
        ],
        [t]
    );

    const handleChangePhone = (event: KeyboardEvent) => {
        const keyCode = event.keyCode || event.which;
        if (keyCode < KEY_CODE.KEY_0 || KEY_CODE.KEY_9 < keyCode) event.preventDefault();
    };

    const renderValueSelectFlag = (select: unknown) => {
        const countryInfoImage =
            COUNTRY_INFO_IMAGE[select as number] || COUNTRY_INFO_IMAGE[Country.COUNTRY_JP];
        return (
            <Box
                sx={{
                    height: "20px",
                    width: "24px",
                    marginTop: "-1px",
                }}
            >
                {countryInfoImage}
            </Box>
        );
    };

    const handleCountryChange = () => {
        const timeout = setTimeout(async () => {
            await trigger(name);

            clearTimeout(timeout);
        }, 0);
    };

    return (
        <StyledGrid container spacing={2}>
            <Grid item xs={xsFlag}>
                <SelectHF<PhoneOption>
                    data-testid="PhoneInputHF__selectCountry"
                    name={nameCountryCode}
                    options={choiceCountries}
                    renderValue={renderValueSelectFlag}
                    renderLabel={(option) => {
                        return option.label;
                    }}
                    {...SelectProps}
                    variant={variant}
                    onChange={handleCountryChange}
                />
            </Grid>
            <Grid item xs>
                <TextFieldHF
                    name={name}
                    label={label}
                    sx={shrink ? { backgroundColor: "#FAFAFA" } : {}}
                    InputLabelProps={{
                        shrink,
                        className: shrink ? undefined : classes.outlined,
                    }}
                    rules={rules}
                    data-testid="PhoneInputHF__root"
                    inputProps={{
                        "data-testid": "PhoneInputHF__inputPhoneNumber",
                        onKeyPress: handleChangePhone,
                        maxLength: 15,
                        onFocus: () => setShrink(true),
                        onBlur: (event: any) => {
                            if (event.target.value.length === 0) setShrink(false);
                        },
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment
                                position="start"
                                data-testid="PhoneInputHF__inputAdornmentCountry"
                            >
                                {
                                    (COUNTRY_INFO[countryCode] || COUNTRY_INFO[Country.COUNTRY_JP])
                                        .code
                                }
                            </InputAdornment>
                        ),
                        ...InputProps,
                    }}
                    variant={variant}
                />
            </Grid>
        </StyledGrid>
    );
};

export default PhoneInputHF;
