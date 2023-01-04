import { Entities } from "src/common/constants/enum";
import { MasterCategoryType } from "src/squads/payment/constants/master";

import DialogWithHeaderFooter from "src/components/Dialogs/DialogWithHeaderFooter";
import MasterImport from "src/squads/payment/domains/MasterData/components/MasterImport";

import { UseDialogReturn } from "src/squads/payment/hooks/useDialog";
import useResourceTranslate from "src/squads/payment/hooks/useResourceTranslate";

export interface MasterImportDialogProps extends Pick<UseDialogReturn, "open" | "onClose"> {
    category: MasterCategoryType;
}

export const MasterImportDialog = ({ open, onClose, category }: MasterImportDialogProps) => {
    const tMaster = useResourceTranslate(Entities.MASTERS);

    return (
        <DialogWithHeaderFooter
            data-testid="MasterImportDialog__root"
            open={open}
            onClose={onClose}
            title={tMaster("title.import")}
            maxWidth="md"
            minWidthBox="sm"
            footer="portal"
        >
            <MasterImport category={category} onClose={onClose} />
        </DialogWithHeaderFooter>
    );
};

export default MasterImportDialog;
