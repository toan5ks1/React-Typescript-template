import { IErrorBoundary } from "src/squads/lesson/internals/errors";

import History from "@mui/icons-material/History";
import ErrorIcon from "@mui/icons-material/Report";
import ButtonBase from "src/components/Buttons/ButtonBase";
import SpacingGroup from "src/components/Utilities/SpacingGroup";

import useTranslate from "src/squads/lesson/hooks/useTranslate";

const getErrorKey = (error: IErrorBoundary["error"]) => {
    if (!error) return "";

    if (error.message.includes("dynamically imported module")) {
        return "resources.common.netWorkUnstable";
    }

    return ["ChunkLoadError", "resources.common.cannotLoadPage"].includes(error.name)
        ? "resources.common.cannotLoadPage"
        : error.toString();
};

const ErrorBoundary = ({ error, errorInfo }: IErrorBoundary) => {
    const t = useTranslate();

    if (!error || !errorInfo) {
        return null;
    }

    return (
        <SpacingGroup spacing={16} data-testid="ErrorBoundary">
            {import.meta.env.VITE_ENV !== "production" && <h2>LESSON</h2>}
            <SpacingGroup
                sx={{
                    display: "flex",
                    alignItems: "center",
                }}
                component="h2"
                direction="horizontal"
            >
                <ErrorIcon />
                <span>{t("resources.common.somethingWentWrong")}.</span>
            </SpacingGroup>
            <div>{t("resources.common.pleaseHelpUsReport")}.</div>
            <details>
                <summary>{t("resources.common.details")}</summary>
                <h3>{t(getErrorKey(error))}</h3>
                {import.meta.env.VITE_ENV !== "production" && errorInfo.componentStack}
            </details>
            <div data-testid="ErrorBoundary__action">
                <ButtonBase
                    variant="contained"
                    startIcon={<History />}
                    onClick={() => window.history.go(-1)}
                >
                    {t("resources.common.back")}
                </ButtonBase>
            </div>
        </SpacingGroup>
    );
};

export default ErrorBoundary;
