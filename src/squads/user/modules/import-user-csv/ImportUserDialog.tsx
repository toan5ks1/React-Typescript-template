import { useMemo } from "react";

import { useDispatch, useSelector } from "react-redux";
import { ERPModules } from "src/common/constants/enum";
import { handleUnknownError } from "src/common/utils/error";
import { fileToPayload } from "src/common/utils/file";
import { arrayHasItem } from "src/common/utils/other";
import { ModeImportUserTypes } from "src/squads/user/common/types";
import { ImportUserActions } from "src/store/import-user";
import { RootState } from "src/store/store-types";

import DownloadOutlined from "@mui/icons-material/DownloadOutlined";
import Box from "@mui/material/Box";
import ButtonPrimaryContained from "src/components/Buttons/ButtonPrimaryContained";
import DialogWithHeaderFooter from "src/components/Dialogs/DialogWithHeaderFooter";
import ImportFiles from "src/squads/user/modules/import-user-csv/components/ImportFiles";

import type { UseDialogReturn } from "src/squads/user/hooks/useDialog";
import useResourceTranslate from "src/squads/user/hooks/useResourceTranslate";
import useShowSnackbar from "src/squads/user/hooks/useShowSnackbar";
import useTranslate from "src/squads/user/hooks/useTranslate";
import useUserFeatureFlag from "src/squads/user/hooks/useUserFeatureFlag";
import useFiles from "src/squads/user/modules/import-user-csv/hooks/useFiles";
import useGenerateTemplateFile from "src/squads/user/modules/import-user-csv/hooks/useGenerateTemplateFile";

export interface ImportUsersDialogProps extends Pick<UseDialogReturn, "open" | "onClose"> {
    mode: ModeImportUserTypes;
}

export default function ImportUserDialog({ onClose, open, mode }: ImportUsersDialogProps) {
    const dispatch = useDispatch();
    const { isStudentImporting, isParentImporting } = useSelector<
        RootState,
        RootState["importUser"]
    >((state) => state.importUser);
    const tResource = useResourceTranslate(ERPModules.STUDENTS);
    const showSnackbar = useShowSnackbar();
    const t = useTranslate();
    const displayImproveErrorMessage = useUserFeatureFlag(
        "STUDENT_MANAGEMENT_IMPROVE_MESSAGE_IMPORT_STUDENT_AND_IMPORT_PARENT"
    );

    const { generateTemplate } = useGenerateTemplateFile(mode);

    const { files, onChange, onRemove } = useFiles();

    const handleDownloadImportTemplate = async () => {
        await generateTemplate();
    };

    const handleImport = async () => {
        if (!arrayHasItem(files)) return;
        try {
            const result = await fileToPayload(files[0]);
            switch (mode) {
                case "IMPORT_STUDENT_CSV":
                    dispatch(
                        ImportUserActions.importStudent(result, { displayImproveErrorMessage })
                    );
                    break;
                case "IMPORT_PARENT_CSV":
                    dispatch(
                        ImportUserActions.importParent(result, { displayImproveErrorMessage })
                    );
                    break;
                default:
                    break;
            }
            onClose();
        } catch (error) {
            const err = handleUnknownError(error);
            showSnackbar(t(err.message), "error");
        }
    };

    const isImporting = useMemo(() => {
        if (mode === "IMPORT_STUDENT_CSV") {
            return isStudentImporting;
        }

        return isParentImporting;
    }, [mode, isStudentImporting, isParentImporting]);

    const dialogTitle = useMemo(() => {
        return tResource(
            mode === "IMPORT_STUDENT_CSV" ? "titles.dialogImport" : "titles.dialogImportParents"
        );
    }, [mode, tResource]);

    return (
        <DialogWithHeaderFooter
            data-testid="ImportUserDialog__root"
            open={open}
            onClose={onClose}
            title={dialogTitle}
            maxWidth="md"
            minWidthBox="sm"
            footer="portal"
        >
            <Box
                sx={(theme) => ({
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "start",
                    p: theme.spacing(1, 0, 2),
                })}
            >
                <ButtonPrimaryContained
                    aria-label="ButtonDownloadTemplateFile"
                    startIcon={<DownloadOutlined />}
                    variant="outlined"
                    onClick={handleDownloadImportTemplate}
                    data-testid="ImportDataDialog__buttonDownload"
                >
                    {tResource("labels.downloadTemplateFile")}
                </ButtonPrimaryContained>
            </Box>
            <ImportFiles
                onClose={onClose}
                files={files}
                onRemove={onRemove}
                onChange={onChange}
                onSave={handleImport}
                disabled={isImporting}
            />
        </DialogWithHeaderFooter>
    );
}
