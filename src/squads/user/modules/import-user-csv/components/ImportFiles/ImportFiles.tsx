import { useMemo } from "react";

import { ERPModules, MIMETypes } from "src/common/constants/enum";
import { MAX_FILE_SIZE_CSV } from "src/squads/user/common/constants/file-size";

import DialogFooterConfirm from "src/components/Dialogs/DialogFooterConfirm";
import { DialogFooterConfirmProps } from "src/components/Dialogs/types";
import ListMediaChipsBase from "src/components/ListMediaChipsBase";
import WrapperPortalDialogFooter from "src/components/Wrappers/WrapperPortalDialogFooter";
import UploadInput from "src/squads/user/components/UploadInput";

import type { UseDialogReturn } from "src/squads/user/hooks/useDialog";
import useResourceTranslate from "src/squads/user/hooks/useResourceTranslate";
import type { UseFilesReturn } from "src/squads/user/modules/import-user-csv/hooks/useFiles";

export interface ImportFilesProps
    extends Pick<UseDialogReturn, "onClose">,
        Pick<DialogFooterConfirmProps, "onSave">,
        UseFilesReturn {
    multiple?: boolean;
    disabled?: boolean;
}

export const ImportFiles = ({
    onClose,
    onSave,
    multiple = false,
    onChange,
    files,
    onRemove,
    disabled,
}: ImportFilesProps) => {
    const tResource = useResourceTranslate(ERPModules.STUDENTS);

    const isShow = useMemo(() => {
        return multiple ? true : !files.length;
    }, [files.length, multiple]);

    return (
        <>
            <ListMediaChipsBase medias={files} onDelete={onRemove} shouldConfirmDelete={false} />
            {isShow ? (
                <UploadInput
                    multiple={multiple}
                    maxSize={MAX_FILE_SIZE_CSV}
                    description={tResource("descriptions.maxFileRecordsIs", {
                        fileRecords: 1000,
                    })}
                    accept={[MIMETypes.CSV]}
                    onChange={onChange}
                    disabled={disabled}
                />
            ) : null}
            <WrapperPortalDialogFooter>
                <DialogFooterConfirm
                    onSave={onSave}
                    onClose={onClose}
                    footerConfirmButtonProps={{
                        disabled,
                    }}
                    textSave={tResource("labels.import")}
                />
            </WrapperPortalDialogFooter>
        </>
    );
};

export default ImportFiles;
