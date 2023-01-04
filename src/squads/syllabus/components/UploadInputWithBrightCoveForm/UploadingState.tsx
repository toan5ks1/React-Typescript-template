import { UploadState } from "src/common/constants/enum";

import { Box, LinearProgress, Theme } from "@mui/material";
import DeleteIcon from "src/squads/syllabus/components/SvgIcons/DeleteIcon";
import RetryIcon from "src/squads/syllabus/components/SvgIcons/RetryIcon";

import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";

const sx = {
    loadingContainer: {
        display: "flex",
        alignItem: "center",
        padding: "10px 0px",
    },
    loadingText: {
        flex: "1",
    },
    stateIcon: {
        cursor: "pointer",
        marginLeft: "5px",
    },
    failedText: (theme: Theme) => ({
        flex: "1",
        color: theme.palette.error.main,
    }),
    fileName: {
        fontWeight: "bold",
    },
};

export interface UploadingStateProps {
    state: UploadState;
    files?: File[];
    onRetry?: () => void;
    onDelete?: () => void;
}

const UploadingState = ({ state, files, onRetry, onDelete }: UploadingStateProps) => {
    const t = useResourceTranslate("input");
    return (
        <div>
            <Box sx={sx.loadingContainer}>
                {state == UploadState.LOADING && (
                    <Box
                        component="span"
                        data-testid="UploadingState__loadingText"
                        sx={sx.loadingText}
                    >
                        {t("uploading")}
                    </Box>
                )}
                {state == UploadState.FAILED && (
                    <>
                        <Box
                            component="span"
                            data-testid="UploadingState__failedText"
                            sx={sx.failedText}
                        >
                            {t("cannotUpload")}
                        </Box>
                        <RetryIcon
                            data-testid="UploadingState__retryIcon"
                            sx={sx.stateIcon}
                            onClick={onRetry}
                        />
                    </>
                )}
                <DeleteIcon
                    data-testid="UploadingState__deleteIcon"
                    onClick={onDelete}
                    sx={sx.stateIcon}
                />
            </Box>
            {state == UploadState.LOADING && (
                <LinearProgress data-testid="UploadingState__linearProgress" />
            )}
            {state == UploadState.FAILED &&
                files?.map((file, index) => (
                    <Box data-testid="UploadingState__filename" key={index} sx={sx.fileName}>
                        {file.name}
                    </Box>
                ))}
        </div>
    );
};

export default UploadingState;
