import appConfigs from "src/internals/configuration";

import { Box } from "@mui/material";
import ButtonPrimaryContained from "src/components/Buttons/ButtonPrimaryContained";
import TypographyBase from "src/components/Typographys/TypographyBase";

import { LoginFormProps } from "./types";

import useTranslate from "src/squads/user/hooks/useTranslate";

const LoginFormSSO = ({ onLogin, loading }: LoginFormProps) => {
    const t = useTranslate();

    return (
        <Box>
            <Box mb={5}>
                <TypographyBase variant="h4" gutterBottom>
                    {t("ra.common.welcomeTo")}
                    <TypographyBase component="div" variant="h4">
                        {t("ra.common.contentManagementSystem")}
                    </TypographyBase>
                </TypographyBase>
            </Box>
            <ButtonPrimaryContained
                disabled={loading}
                size="large"
                aria-label="Log in"
                onClick={onLogin}
            >
                {`${t("ra.common.signInWith")} ${appConfigs
                    .getCurrentPjOwner()
                    .toLocaleUpperCase()}`}
            </ButtonPrimaryContained>
        </Box>
    );
};

export default LoginFormSSO;
