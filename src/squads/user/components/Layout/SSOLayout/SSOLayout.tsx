import { HtmlHTMLAttributes } from "react";

import authManager from "src/internals/auth-manager";
import { ProviderTypes } from "src/packages/abstract-auth";

import History from "@mui/icons-material/History";
import { styled } from "@mui/material/styles";
import ButtonBase from "src/components/Buttons/ButtonBase";
import Loading from "src/components/Loading";
import NotFound from "src/components/NotFound";
import TypographyBase from "src/components/Typographys/TypographyBase";
import SpacingGroup from "src/components/Utilities/SpacingGroup";
import Fullscreen from "src/squads/user/components/Fullscreen";

import i18nProvider from "src/i18n";

const StyledSpacingGroup = styled(SpacingGroup)({
    display: "flex",
    flexDirection: "column",
});
StyledSpacingGroup.displayName = "StyledSpacingGroup";

export interface SSOLayoutProps extends HtmlHTMLAttributes<HTMLDivElement> {
    loading?: boolean;
    error?: boolean;

    onBack: () => void;
}

const SSOLayout = (props: SSOLayoutProps) => {
    const { className, loading, error, children, onBack, ...rest } = props;

    if (authManager.getType() !== ProviderTypes.oidc) {
        return <NotFound data-testid="SSOLayout__notfound" />;
    }

    return (
        <Fullscreen className={className} center {...rest}>
            <StyledSpacingGroup spacing={24}>
                {loading ? <Loading loading data-testid="SSOLayout__loading" /> : null}
                <TypographyBase
                    variant="body1"
                    sx={(theme) => ({ fontSize: theme.typography.h2.fontSize })}
                    color={error ? "error" : undefined}
                >
                    {children}
                </TypographyBase>
                {error ? (
                    <ButtonBase
                        variant="contained"
                        color="primary"
                        size="large"
                        data-testid="SSOLayout__backBtn"
                        startIcon={<History />}
                        onClick={onBack}
                    >
                        {i18nProvider.translate("ra.common.back")}
                    </ButtonBase>
                ) : null}
            </StyledSpacingGroup>
        </Fullscreen>
    );
};

SSOLayout.defaultProps = {
    onBack: () => {
        window.location.assign("/login");
    },
};

export default SSOLayout;
