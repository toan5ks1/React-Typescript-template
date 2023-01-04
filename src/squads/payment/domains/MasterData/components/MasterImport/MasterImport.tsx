import { MIMETypes } from "src/common/constants/enum";
import { MAX_FILE_SIZE_CSV } from "src/common/constants/file-size";
import { convertByte } from "src/common/utils/file";
import { MasterCategoryType } from "src/squads/payment/constants/master";

import { Box } from "@mui/material";
import DialogFooterConfirm from "src/components/Dialogs/DialogFooterConfirm";
import UploadInput from "src/components/Inputs/UploadInput";
import ListMediaChipsBase from "src/components/ListMediaChipsBase";
import WrapperPortalDialogFooter from "src/components/Wrappers/WrapperPortalDialogFooter";

import useFiles from "src/squads/payment/domains/MasterData/hooks/useFiles";
import useImport from "src/squads/payment/domains/MasterData/hooks/useImport";
import { UseDialogReturn } from "src/squads/payment/hooks/useDialog";
import useTranslate from "src/squads/payment/hooks/useTranslate";

export interface MasterImportProps extends Pick<UseDialogReturn, "onClose"> {
    category: MasterCategoryType;
}

export const MasterImport = ({ onClose, category }: MasterImportProps) => {
    const t = useTranslate();

    const { size, unit } = convertByte(MAX_FILE_SIZE_CSV);

    const { files, onChange, onRemove } = useFiles();
    const { onImportFiles } = useImport();

    const handleSave = async () => {
        await onImportFiles(files, category);
        onClose();
    };

    return (
        <>
            <Box mb={2}>
                <ListMediaChipsBase medias={files} onDelete={onRemove} />
            </Box>
            <UploadInput
                multiple
                maxSize={MAX_FILE_SIZE_CSV}
                description={t("ra.message.maxFileSizeIs", {
                    fileSize: size,
                    fileUnit: unit,
                })}
                accept={[MIMETypes.CSV]}
                onChange={onChange}
            />
            <WrapperPortalDialogFooter>
                <DialogFooterConfirm
                    onSave={handleSave}
                    onClose={onClose}
                    footerConfirmButtonProps={{
                        disabled: files.length === 0,
                    }}
                    textSave={t("ra.common.action.uploadFile")}
                />
            </WrapperPortalDialogFooter>
        </>
    );
};

export default MasterImport;
