import { HtmlHTMLAttributes } from "react";

import { useHistory } from "react-router-dom";

import History from "@mui/icons-material/History";
import ErrorIcon from "@mui/icons-material/Report";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import ButtonBase from "src/components/Buttons/ButtonBase";

import sanitizer from "../../internals/sanitizer";
import SpacingGroup from "../Utilities/SpacingGroup";

import useTranslate from "src/hooks/useTranslate";

const sx = {
    root: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
    },

    notFound: {
        fontSize: "1.25rem",
    },
};

const StyledSpacingGroup = styled(SpacingGroup)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(3),
}));
StyledSpacingGroup.displayName = "StyledSpacingGroup";
export interface NotFoundProps extends HtmlHTMLAttributes<HTMLDivElement> {
    redirect?: string;
}

const NotFound = ({ redirect: redirectPath, className, ...rest }: NotFoundProps) => {
    const t = useTranslate();
    const history = useHistory();

    const redirectTo = redirectPath ? sanitizer.forURL(redirectPath) : "/";

    return (
        <Box sx={sx.root} className={className} data-testid={rest["data-testid"]}>
            <StyledSpacingGroup component="h2" direction="horizontal">
                <ErrorIcon />
                <Box component="span" sx={sx.notFound}>
                    {t("ra.common.thisPageIsNotFound")}.
                </Box>
            </StyledSpacingGroup>
            <div>
                <ButtonBase
                    variant="contained"
                    color="primary"
                    startIcon={<History />}
                    onClick={() => history.push(redirectTo)}
                >
                    {t("ra.common.backToHomePage")}
                </ButtonBase>
            </div>
        </Box>
    );
};

export default NotFound;
