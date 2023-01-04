import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useToggle } from "react-use";
import { LOGIN_TENANT, FORGOT_PASSWORD_ROUTE } from "src/squads/user/common/constants/routers";

import { Box, Grid, Theme } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { inputBaseClasses } from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";
import ButtonBase from "src/components/Buttons/ButtonBase";
import HookForm from "src/components/Forms/HookForm";
import TextFieldHF from "src/components/TextFields/TextFieldHF";
import TypographyBase from "src/components/Typographys/TypographyBase";
import { HidePassIcon, ShowPassIcon } from "src/squads/user/components/SvgIcons";

import useUserFeatureToggle from "../../hooks/useUserFeatureFlag";
import { LoginFormProps } from "./types";

import useTranslate from "src/squads/user/hooks/useTranslate";

const StyledTextField = styled(TextFieldHF)({
    [`& .${inputBaseClasses.root}`]: {
        backgroundColor: "white",
    },
});

const sx = {
    header: {
        fontWeight: "bold",
    },
    wrapTextInput: (theme: Theme) => ({
        height: theme.spacing(9),
    }),
    forgotText: (theme: Theme) => ({
        display: "block",
        "& > a": {
            color: theme.palette.primary.main,
            textDecoration: "none",
            fontSize: theme.spacing(2),
        },
    }),
    buttonShowPass: {
        border: "none",
        padding: 0,
        "&:hover": {
            backgroundColor: "transparent",
        },
        "& > span": {
            display: "none",
        },
        color: (theme: Theme) => theme.palette.other!.body!,
    },
    inputAdornment: (theme: Theme) => ({
        width: theme.spacing(6),
    }),
    redirectLoginTenantText: (theme: Theme) => ({
        display: "block",
        "& > a": {
            color: theme.palette.primary.main,
            textDecoration: "none",
            fontSize: "1rem",
        },
    }),
};

type FormLoginValues = {
    username: string;
    password: string;
};

const LoginForm = (props: LoginFormProps) => {
    const isEnabledLoginMultiTenant = useUserFeatureToggle("USER_MULTI_TENANT_LOGIN");

    const t = useTranslate();
    const [visibility, toggleVisibility] = useToggle(true);
    const { onLogin, loading } = props;

    const methods = useForm<FormLoginValues>({
        mode: "onChange",
    });

    const {
        handleSubmit,
        formState: { isValid },
    } = methods;

    const handleLogin = async (data: FormLoginValues) => {
        const { username, password } = data;

        onLogin({
            username,
            password,
        });
    };

    return (
        <HookForm
            data-testid="Login__form"
            methods={methods}
            formProps={{ onSubmit: handleSubmit(handleLogin) }}
        >
            <Grid container spacing={2} direction="column">
                <Grid item>
                    <TypographyBase sx={sx.header} variant="h4">
                        {t("resources.auth.button.sign_in")}
                    </TypographyBase>
                </Grid>
                <Grid item>
                    <Box mt={4} mb={2} sx={sx.wrapTextInput}>
                        <StyledTextField
                            size="medium"
                            fullWidth
                            autoFocus
                            name="username"
                            label={t("resources.auth.label.username")}
                            rules={{ required: t("resources.input.error.required") }}
                            required
                            inputProps={{
                                placeholder: t("resources.auth.descriptions.enterEmail"),
                                "data-testid": "LoginForm__textFieldUsername",
                            }}
                        />
                    </Box>
                </Grid>
                <Grid item>
                    <Box sx={sx.wrapTextInput}>
                        <StyledTextField
                            size="medium"
                            fullWidth
                            autoFocus
                            name="password"
                            label={t("resources.auth.label.password")}
                            type={visibility ? "password" : "text"}
                            autoComplete="current-password"
                            required
                            rules={{ required: t("resources.input.error.required") }}
                            InputProps={{
                                placeholder: t("resources.auth.descriptions.enterPassword"),
                                endAdornment: (
                                    <InputAdornment sx={sx.inputAdornment} position="end">
                                        <ButtonBase
                                            sx={sx.buttonShowPass}
                                            onClick={toggleVisibility}
                                            data-testid="LoginForm__togglePassword"
                                        >
                                            {visibility ? <HidePassIcon /> : <ShowPassIcon />}
                                        </ButtonBase>
                                    </InputAdornment>
                                ),
                            }}
                            inputProps={{
                                "data-testid": "LoginForm__textFieldPassword",
                            }}
                        />
                    </Box>
                </Grid>
                <Grid item>
                    <Box mb={2} sx={sx.forgotText}>
                        <Link
                            to={`/${FORGOT_PASSWORD_ROUTE}`}
                            data-testid="LoginForm__buttonForgot"
                        >
                            {t("resources.auth.button.forgotPassword")}
                        </Link>
                    </Box>

                    {isEnabledLoginMultiTenant ? (
                        <Box sx={sx.redirectLoginTenantText}>
                            <Link
                                to={`/${LOGIN_TENANT}`}
                                data-testid="LoginForm__redirectLoginTenant"
                            >
                                {t("resources.auth.button.redirectToTenantLogin")}
                            </Link>
                        </Box>
                    ) : null}
                </Grid>
                <Grid container item justifyContent="flex-end">
                    <Box mr={3}>
                        <ButtonBase
                            data-testid="LoginForm__buttonLogin"
                            type="submit"
                            variant="contained"
                            size="large"
                            disabled={loading || !isValid}
                            onClick={handleSubmit(handleLogin)}
                            color="primary"
                        >
                            {t("resources.auth.button.sign_in")}
                        </ButtonBase>
                    </Box>
                </Grid>
            </Grid>
        </HookForm>
    );
};

export default LoginForm;
