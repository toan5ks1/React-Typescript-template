import { useCallback } from "react";

import ExpandMore from "@mui/icons-material/ExpandMore";
import Button, { buttonClasses } from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import ButtonBase from "src/components/Buttons/ButtonBase";
import MenuComponent from "src/components/Menus/MenuComponent";

import useLocale from "src/squads/user/hooks/useLocale";
import useSetLocale from "src/squads/user/hooks/useSetLocale";
import useTranslate from "src/squads/user/hooks/useTranslate";
import { LanguageEnums } from "src/squads/user/typings/i18n-provider";

const StyledMenuComponent = styled(MenuComponent)({
    "& ul": {
        paddingTop: 0,
        paddingBottom: 0,
    },
});
StyledMenuComponent.displayName = "StyledMenuComponent";

const StyledButtonBase = styled(ButtonBase)(({ theme }) => ({
    color: theme.palette.text.primary,
    fontWeight: 500,
    fontSize: 14,
    height: theme.spacing(5),
    padding: theme.spacing(0, 2),
    wordBreak: "keep-all",
    [`& .${buttonClasses.endIcon}`]: {
        height: "100%",
        display: "flex",
        alignItems: "center",
        borderLeft: `1px solid ${theme.palette.border?.main}`,
        paddingLeft: theme.spacing(1),
    },
}));

StyledButtonBase.displayName = "StyledButtonBase";

export const LANGUAGES = [
    {
        key: LanguageEnums.JA,
        name: "日本語",
    },
    {
        key: LanguageEnums.VI,
        name: "Tiếng Việt",
    },
    {
        key: LanguageEnums.EN,
        name: "English",
    },
];

const LocaleSwitcher = () => {
    const t = useTranslate();
    const locale = useLocale();
    const setLocale = useSetLocale();

    const handleChange = useCallback(
        async (selectedLanguage: LanguageEnums) => {
            if (selectedLanguage === locale) return;
            await setLocale(selectedLanguage);
        },
        [setLocale, locale]
    );

    return (
        <StyledMenuComponent
            id="language-menu"
            label={locale}
            data-testid="LocaleSwitcher"
            iconAction={
                <StyledButtonBase
                    size="large"
                    variant="outlined"
                    endIcon={<ExpandMore />}
                    data-testid="LocaleSwitcher"
                >
                    {t(`resources.languages.${locale}`)}
                </StyledButtonBase>
            }
        >
            {LANGUAGES.map((e) => {
                return (
                    <Button
                        key={e.key}
                        data-testid={`LocaleButton-${e.key}`}
                        disabled={locale === e.key}
                        onClick={() => handleChange(e.key)}
                        sx={(theme) => ({
                            "&:hover": {
                                backgroundColor: "unset",
                            },
                            fontSize: 12,
                            color: theme.palette.text.primary,
                            textTransform: "uppercase",
                        })}
                        disableRipple
                    >
                        {e.name}
                    </Button>
                );
            })}
        </StyledMenuComponent>
    );
};

export default LocaleSwitcher;
