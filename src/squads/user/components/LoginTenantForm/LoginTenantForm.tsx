import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useToggle } from "react-use";
import { FORGOT_PASSWORD_ROUTE_TENANT } from "src/squads/user/common/constants/routers";
import reactiveStorage from "src/squads/user/internals/reactive-storage";

import { Box, Grid, Theme } from "@mui/material";
import { styled } from "@mui/material/styles";
import ButtonBase from "src/components/Buttons/ButtonBase";
import HookForm from "src/components/Forms/HookForm";
import TextFieldHF from "src/components/TextFields/TextFieldHF";
import TypographyBase from "src/components/Typographys/TypographyBase";
import { HidePassIcon, ShowPassIcon } from "src/squads/user/components/SvgIcons";

import { LoginFormProps } from "../LoginFormV2/types";

import useTranslate from "src/squads/user/hooks/useTranslate";

const sx = {
    buttonShowPass: {
        border: "none",
        padding: 0,
        ["&:hover"]: {
            backgroundColor: "transparent",
        },
        color: (theme: Theme) => theme.palette.other!.body!,
    },

    header: {
        fontWeight: "bold",
    },

    input: (theme: Theme) => ({
        backgroundColor: theme.palette.background.paper!,
    }),

    passwordInput: (theme: Theme) => ({
        backgroundColor: theme.palette.background.paper!,
        paddingRight: 0,
    }),

    formHelperText: (theme: Theme) => ({
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(2),
    }),
};

const LinkStyled = styled(Link)(({ theme }) => ({
    color: theme.palette.primary.main,
    textDecoration: "none",
    fontSize: theme.spacing(2),
}));

type FormLoginTenantValues = {
    organizationName: string;
    username: string;
    password: string;
};

const LoginTenantForm = (props: LoginFormProps) => {
    const t = useTranslate();
    const [visibility, toggleVisibility] = useToggle(true);
    const { onLogin, loading } = props;
    const organizationInfo = reactiveStorage.get("ORGANIZATION_INFO");
    const saved_organization = organizationInfo?.saved_organization;

    const methods = useForm<FormLoginTenantValues>({
        mode: "onChange",
        defaultValues: {
            organizationName: saved_organization,
        },
    });

    const {
        handleSubmit,
        formState: { isValid },
    } = methods;

    const handleLogin = async (data: FormLoginTenantValues) => {
        const { organizationName, username, password } = data;

        onLogin({
            tenantName: organizationName,
            username,
            password,
        });
    };

    return (
        <HookForm methods={methods} formProps={{ onSubmit: handleSubmit(handleLogin) }}>
            <Grid container spacing={4} direction="column">
                <Grid item>
                    <TypographyBase sx={sx.header} variant="h4">
                        {t("ra.auth.sign_in")}
                    </TypographyBase>
                </Grid>

                <Grid item>
                    <TextFieldHF
                        size="medium"
                        fullWidth
                        autoFocus
                        name="organizationName"
                        label={t("ra.auth.organizationID")}
                        rules={{ required: t("resources.input.error.required") }}
                        required
                        inputProps={{
                            placeholder: t("ra.auth.enterOrganizationID"),
                            "data-testid": "LoginTenantForm__textFieldOrganizations",
                        }}
                        InputProps={{ sx: sx.input }}
                        FormHelperTextProps={{ sx: sx.formHelperText }}
                    />
                </Grid>
                <Grid item>
                    <TextFieldHF
                        size="medium"
                        fullWidth
                        autoFocus
                        name="username"
                        label={t("ra.auth.username")}
                        rules={{ required: t("resources.input.error.required") }}
                        required
                        inputProps={{
                            placeholder: t("ra.auth.enterEmail"),
                            "data-testid": "LoginTenantForm__textFieldUsername",
                        }}
                        InputProps={{ sx: sx.input }}
                        FormHelperTextProps={{ sx: sx.formHelperText }}
                    />
                </Grid>
                <Grid item>
                    <TextFieldHF
                        size="medium"
                        fullWidth
                        autoFocus
                        name="password"
                        label={t("ra.auth.password")}
                        type={visibility ? "password" : "text"}
                        autoComplete="current-password"
                        required
                        rules={{ required: t("resources.input.error.required") }}
                        inputProps={{
                            placeholder: t("ra.auth.enterPassword"),
                            "data-testid": "LoginTenantForm__textFieldPassword",
                        }}
                        InputProps={{
                            sx: sx.passwordInput,
                            endAdornment: (
                                <ButtonBase
                                    sx={sx.buttonShowPass}
                                    onClick={toggleVisibility}
                                    data-testid="LoginTenantForm__buttonShowPass"
                                    disableRipple
                                >
                                    {visibility ? <HidePassIcon /> : <ShowPassIcon />}
                                </ButtonBase>
                            ),
                        }}
                        FormHelperTextProps={{ sx: sx.formHelperText }}
                    />
                </Grid>
                <Grid item>
                    <Box mb={2}>
                        <LinkStyled
                            to={`/${FORGOT_PASSWORD_ROUTE_TENANT}`}
                            data-testid="LoginTenantForm__buttonForgot"
                        >
                            {t("ra.auth.forgotPassword")}
                        </LinkStyled>
                    </Box>
                </Grid>
                <Grid container item justifyContent="flex-end">
                    <ButtonBase
                        data-testid="LoginTenantForm__buttonLogin"
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={loading || !isValid}
                        onClick={handleSubmit(handleLogin)}
                        color="primary"
                    >
                        {t("ra.auth.sign_in")}
                    </ButtonBase>
                </Grid>
            </Grid>
        </HookForm>
    );
};

export default LoginTenantForm;
