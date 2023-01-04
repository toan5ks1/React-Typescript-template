import { PropsWithChildren } from "react";

import { LOGIN_BG } from "src/squads/user/common/constants/const";

import { Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import { LogoIcon } from "src/components/SvgIcons";
import LocaleSwitcher from "src/squads/user/components/Layout/LocaleSwitcher";

import useUserFeatureToggle from "src/squads/user/hooks/useUserFeatureFlag";

const PREFIX = "AuthLayout";

const classes = {
    root: `${PREFIX}-root`,
    logo: `${PREFIX}-logo`,
    loginBg: `${PREFIX}-loginBg`,
    intro: `${PREFIX}-intro`,
    header: `${PREFIX}-header`,
    localSwitcher: `${PREFIX}-localSwitcher`,
};

const StyledGrid = styled(Grid)(({ theme }) => {
    return {
        [`&.${classes.root}`]: {
            backgroundColor: theme.palette.other?.backgroundGrey,
        },
        [`& .${classes.logo}`]: {
            display: "flex",
            justifyContent: "center",
        },
        [`& .${classes.loginBg}`]: {
            backgroundImage: `url(${LOGIN_BG})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            width: "100%",
            height: "100vh",
            padding: theme.spacing(5, 2),
            maxWidth: 300,
            [theme.breakpoints.down("md")]: {
                backgroundPosition: "top center",
                height: "100%",
                minHeight: 600,
                maxWidth: "unset",
            },
        },
        [`& .${classes.intro}`]: {
            color: "white",
            paddingBottom: theme.spacing(7),
            "& > h1": {
                fontSize: theme.spacing(5),
                [theme.breakpoints.down("md")]: {
                    fontSize: theme.spacing(4),
                },
            },
            "& > h5": {
                fontWeight: "normal",
                fontSize: theme.spacing(2),
            },
        },
        [`& .${classes.header}`]: {
            marginBottom: theme.spacing(4),
            "& > h3": {
                fontSize: theme.spacing(4),
                [theme.breakpoints.down("md")]: {
                    fontSize: theme.spacing(3),
                },
            },
            "& > h5": {
                fontWeight: "normal",
                fontSize: theme.spacing(2),
            },
        },
        [`& .${classes.localSwitcher}`]: {
            position: "absolute",
            right: theme.spacing(5),
            bottom: theme.spacing(4),
        },
    };
});

const AuthLayout = ({ children }: PropsWithChildren<{}>) => {
    const isEnabledLoginMultiTenant = useUserFeatureToggle("USER_MULTI_TENANT_LOGIN");

    return (
        <StyledGrid container spacing={0} className={classes.root}>
            <Grid item md={3} className={classes.loginBg} data-testid="AuthLayout__background">
                {!isEnabledLoginMultiTenant ? (
                    <div className={classes.logo} data-testid="AuthLayout__logo">
                        <LogoIcon variant="secondary" />
                    </div>
                ) : null}
            </Grid>
            <Grid item md={9}>
                {children}
                <div className={classes.localSwitcher}>
                    <LocaleSwitcher />
                </div>
            </Grid>
        </StyledGrid>
    );
};

export default AuthLayout;
