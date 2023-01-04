import { FormHTMLAttributes, useState } from "react";

import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { ArrayElement } from "src/common/constants/types";
import { FirebaseError, handleUnknownError } from "src/common/utils/error";
import reactiveStorage from "src/squads/user/internals/reactive-storage";
import { Users_OrganizationsManyReferenceQuery } from "src/squads/user/service/bob/bob-types";
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

import useGetTenantId from "src/squads/user/hooks/useGetTenantId";
import useLocale from "src/squads/user/hooks/useLocale";
import useShowSnackbar from "src/squads/user/hooks/useShowSnackbar";
import useTranslate from "src/squads/user/hooks/useTranslate";

export interface ForgotPasswordForm {
    email: string;
    organizationName: string;
}

const FormForgotTenant = ({
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

    const organizationInfo = reactiveStorage.get("ORGANIZATION_INFO");
    const saved_organization = organizationInfo?.saved_organization;

    const methodsHF = useForm<ForgotPasswordForm>({
        defaultValues: {
            organizationName: saved_organization,
        },
    });

    return (
        <HookForm
            methods={methodsHF}
            formProps={
                {
                    onSubmit: methodsHF.handleSubmit(onSubmitForm),
                    ["data-testid"]: "ForgotPasswordTenant__form",
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
                    size="medium"
                    fullWidth
                    autoFocus
                    name="organizationName"
                    label={t("ra.auth.organizationID")}
                    rules={{ required: t("resources.input.error.required") }}
                    required
                    inputProps={{
                        placeholder: t("ra.auth.enterOrganizationID"),
                        "data-testid": "ForgotPasswordTenant__textFieldOrganizations",
                    }}
                />
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
                    inputProps={{
                        "data-testid": "ForgotPasswordTenant__textFieldUsername",
                    }}
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
                    data-testid="ForgotPasswordTenant__buttonReset"
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

export const ForgotTenantPage = () => {
    const showSnackbar = useShowSnackbar();
    const t = useTranslate();
    const { getTenantIdByTenantName } = useGetTenantId();
    const { push } = useHistory();
    const locale = useLocale();

    const { mutateAsync, isLoading } = inferMutation({
        entity: "passwordFirebase",
        action: "userResetPassword",
    })({});
    const [isResending, setIsResending] = useState(false);

    const sendForgotPasswordRequest = async (values: ForgotPasswordForm) => {
        const { email, organizationName } = values;

        let tenantId: ArrayElement<
            Users_OrganizationsManyReferenceQuery["organizations"]
        >["tenant_id"] = "";

        if (organizationName) {
            tenantId = await getTenantIdByTenantName(organizationName);
            if (!tenantId) return;
        }

        try {
            await mutateAsync({ email, locale, tenantId });
            setIsResending(true);
            push("/forgot-tenant");
        } catch (error) {
            const err = handleUnknownError(error);
            showSnackbar(t(err.message), "error");
            if (error instanceof FirebaseError) {
                throw new FirebaseError(error);
            }
        }
    };

    const redirectToLoginPage = () => {
        push("/login-tenant");
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
                <Box data-testid="forgot-form" p={3} minWidth="300px" maxWidth="600px" width="70%">
                    {isResending && valuesToResendRequest ? (
                        <FormResendEmail
                            defaultValues={valuesToResendRequest}
                            onSubmit={sendForgotPasswordRequest}
                            onRedirect={redirectToLoginPage}
                            isResending={isLoading}
                        />
                    ) : (
                        <FormForgotTenant
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
        <ForgotTenantPage />
    </TranslationProvider>
);
