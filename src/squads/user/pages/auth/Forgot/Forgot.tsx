import { FormHTMLAttributes, useState } from "react";

import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { FirebaseError, handleUnknownError } from "src/common/utils/error";
import { inferMutation } from "src/squads/user/service/infer-service";

import { Box } from "@mui/material";
import ButtonDefaultOutlined from "src/components/Buttons/ButtonDefaultOutlined";
import ButtonPrimaryContained from "src/components/Buttons/ButtonPrimaryContained";
import CircularProgressBase from "src/components/CicularProgress/CicularProgressBase";
import HookForm from "src/components/Forms/HookForm";
import TextFieldHF from "src/components/TextFields/TextFieldHF";
import TypographyBase from "src/components/Typographys/TypographyBase";
import AuthLayout from "src/squads/user/components/Layout/AuthLayout";
import RenewPassIcon from "src/squads/user/components/SvgIcons/RenewPassIcon";
import ResendIcon from "src/squads/user/components/SvgIcons/ResendIcon";
import TranslationProvider from "src/squads/user/providers/TranslationProvider";

import useLocale from "src/squads/user/hooks/useLocale";
import useShowSnackbar from "src/squads/user/hooks/useShowSnackbar";
import useTranslate from "src/squads/user/hooks/useTranslate";

export interface ForgotPasswordForm {
    email: string;
}

const FormForgot = ({
    onRedirect,
    onSubmitForm,
    isLoading,
}: {
    isLoading: boolean;
    onRedirect: () => void;
    onSubmitForm: (formValues: ForgotPasswordForm) => void;
}) => {
    const t = useTranslate();

    const validationRules = {
        email: { required: { value: true, message: t("resources.input.error.required") } },
    };

    const methodsHF = useForm<ForgotPasswordForm>();

    return (
        <HookForm
            methods={methodsHF}
            formProps={
                {
                    onSubmit: methodsHF.handleSubmit(onSubmitForm),
                    ["data-testid"]: "Forgot__form",
                } as FormHTMLAttributes<HTMLFormElement>
            }
        >
            <Box mb={4}>
                <Box mb={2}>
                    <TypographyBase variant="h3">{t("ra.auth.forgotPassword")}</TypographyBase>
                </Box>
                <Box mb={4}>
                    <TypographyBase variant="body1">
                        {t("ra.auth.theLinkToRenewPasswordWillBeSentToYourEmail")}
                    </TypographyBase>
                </Box>
            </Box>
            <Box mt={0} mb={5}>
                <TextFieldHF
                    required
                    fullWidth
                    name="email"
                    label={t("ra.auth.username")}
                    rules={validationRules.email}
                    placeholder={t("ra.auth.enterEmail")}
                    size="medium"
                />
            </Box>
            <Box display="flex" justifyContent="flex-end" alignItems="center" width="100%">
                <Box mr={2}>
                    <ButtonDefaultOutlined onClick={onRedirect} data-testid="BackToSignIn__button">
                        {t("ra.auth.backToLogin")}
                    </ButtonDefaultOutlined>
                </Box>
                <ButtonPrimaryContained
                    disabled={isLoading || !methodsHF.formState.isDirty}
                    onClick={methodsHF.handleSubmit(onSubmitForm)}
                    data-testid="ForgotForm__reset__button"
                >
                    {t("ra.auth.resetPassword")}
                </ButtonPrimaryContained>
            </Box>
        </HookForm>
    );
};

const FormResendEmail = ({
    isResending,
    defaultValues,
    onRedirect,
    onSubmit,
}: {
    isResending: boolean;
    defaultValues: ForgotPasswordForm;
    onRedirect: () => void;
    onSubmit: (values: ForgotPasswordForm) => void;
}) => {
    const t = useTranslate();

    const methodsHF = useForm<ForgotPasswordForm>({
        defaultValues,
    });

    return (
        <HookForm
            formProps={
                { ["data-testid"]: "ResendEmail__form" } as FormHTMLAttributes<HTMLFormElement>
            }
        >
            <Box display="flex" justifyContent="center" mb={7.5}>
                <RenewPassIcon />
            </Box>
            <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
                <Box mb={2}>
                    <TypographyBase component="p" variant="h3">
                        {t("ra.auth.theLinkHasBeenSent")}
                    </TypographyBase>
                </Box>
                <TypographyBase component="p" variant="body1">
                    {t("ra.auth.pleaseCheckYourEmailToRenewYourPassword")}
                </TypographyBase>
                {isResending ? <CircularProgressBase /> : null}
            </Box>
            <Box display="flex" justifyContent="flex-end" alignItems="center" width="100%">
                <Box mr={2}>
                    <ButtonDefaultOutlined
                        disabled={isResending}
                        onClick={methodsHF.handleSubmit(onSubmit)}
                    >
                        <Box display="flex" mr={1}>
                            <ResendIcon />
                        </Box>
                        <span>{t("ra.common.action.resend")}</span>
                    </ButtonDefaultOutlined>
                </Box>
                <ButtonDefaultOutlined onClick={onRedirect} data-testid="BackToSignIn__button">
                    {t("ra.auth.backToLogin")}
                </ButtonDefaultOutlined>
            </Box>
        </HookForm>
    );
};

export const ForgotPage = () => {
    const showSnackbar = useShowSnackbar();
    const t = useTranslate();
    const locale = useLocale();
    const [isResending, setIsResending] = useState(false);

    const { push } = useHistory();

    const { mutateAsync, isLoading } = inferMutation({
        action: "userResetPassword",
        entity: "passwordFirebase",
    })({});

    const sendForgotPasswordRequest = async (values: ForgotPasswordForm) => {
        try {
            await mutateAsync({ ...values, locale });
            setIsResending(true);
            push("/forgot");
        } catch (error) {
            const err = handleUnknownError(error);
            showSnackbar(t(err.message), "error");
            if (error instanceof FirebaseError) {
                throw new FirebaseError(error);
            }
        }
    };

    const redirectToLoginPage = () => {
        push("/login");
    };

    const [valuesToResendRequest, setValuesToResendRequest] = useState<ForgotPasswordForm>();

    return (
        <AuthLayout>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                width="100%"
                height="100%"
                minHeight="100vh"
            >
                <Box p={3} minWidth="300px" maxWidth="600px" width="70%">
                    {isResending && valuesToResendRequest ? (
                        <FormResendEmail
                            defaultValues={valuesToResendRequest}
                            onSubmit={sendForgotPasswordRequest}
                            onRedirect={redirectToLoginPage}
                            isResending={isLoading}
                        />
                    ) : (
                        <FormForgot
                            isLoading={isLoading}
                            onRedirect={redirectToLoginPage}
                            onSubmitForm={async (formValues) => {
                                setValuesToResendRequest(formValues);
                                await sendForgotPasswordRequest(formValues);
                            }}
                        />
                    )}
                </Box>
            </Box>
        </AuthLayout>
    );
};

export default () => (
    <TranslationProvider>
        <ForgotPage />
    </TranslationProvider>
);
