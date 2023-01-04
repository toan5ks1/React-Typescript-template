import { IErrorBoundary } from "src/internals/errors";

import History from "@mui/icons-material/History";
import ErrorIcon from "@mui/icons-material/Report";
import ButtonBase from "src/components/Buttons/ButtonBase";

import useTranslate from "../../hooks/useTranslate";
import SpacingGroup from "../Utilities/SpacingGroup";

// doesn't apply?
// root: {
//     width: "100%",
//     display: "flex",
//     justifyContent: "center",
// },

const getErrorKey = (error: IErrorBoundary["error"]) => {
    if (!error) return "";

    if (error.message.includes("dynamically imported module")) {
        return "resources.common.netWorkUnstable";
    }

    return ["ChunkLoadError", "ra.common.cannotLoadPage"].includes(error.name)
        ? "ra.common.cannotLoadPage"
        : error.toString();
};

const ErrorBoundary = ({ error, errorInfo }: IErrorBoundary) => {
    const translate = useTranslate();

    if (!error || !errorInfo) {
        return null;
    }

    return (
        <SpacingGroup spacing={16} data-testid="ErrorBoundary">
            <SpacingGroup
                sx={{
                    display: "flex",
                    alignItems: "center",
                }}
                component="h2"
                direction="horizontal"
            >
                <ErrorIcon />
                <span>{translate("ra.common.someThingWentWrong")}.</span>
            </SpacingGroup>
            <div>{translate("ra.common.pleaseHelpUsReport")}.</div>
            <details>
                <summary>{translate("ra.message.details")}</summary>
                <h3>{translate(getErrorKey(error))}</h3>
                {import.meta.env.VITE_ENV !== "production" && errorInfo.componentStack}
            </details>
            <div data-testid="ErrorBoundary__action">
                <ButtonBase
                    variant="contained"
                    startIcon={<History />}
                    onClick={() => window.history.go(-1)}
                >
                    {translate("ra.common.back")}
                </ButtonBase>
            </div>
        </SpacingGroup>
    );
};

export default ErrorBoundary;
