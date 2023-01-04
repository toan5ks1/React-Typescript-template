import { Entities } from "src/common/constants/enum";
import { isMaterialConverting } from "src/store/lesson-convert";
import { FileImportMaster } from "src/store/master/types";

import { Box, LinearProgress } from "@mui/material";
import BaseDialog, {
    BaseDialogProps,
} from "src/squads/syllabus/components/LegacyDialogs/BaseDialog";

import { arrayHasItem } from "../../common/utils/other";
import { Material } from "../../store/lesson-convert/lesson-convert-types";
import { MasterImportItem, MaterialItem } from "./Item";

type ItemType = Material | FileImportMaster;
export interface NotificationTaskbarModalProps extends BaseDialogProps {
    items?: ItemType[];
}

function isMaterial(item: ItemType): item is Material {
    return "name" in item;
}

function isImportedMasterFile(item: ItemType): item is FileImportMaster {
    const typeTaskbar = item.id.split("_")?.[0];

    return typeTaskbar === Entities.MASTERS;
}

function shouldRenderNotificationItem(item: ItemType) {
    if (isImportedMasterFile(item)) return true;

    if (!isMaterial(item)) return false;
    if (!("status" in item)) return false;

    if (isMaterial(item) && !isMaterialConverting(item.status)) return false;

    return true;
}

export const NotificationTaskbarModal = ({
    items = [],
    ...rest
}: NotificationTaskbarModalProps) => {
    if (!arrayHasItem(items)) return null;

    return (
        <BaseDialog {...rest}>
            <div data-testid="NotificationTaskbarModal__list">
                {items.map((item: ItemType, index) => {
                    if (!shouldRenderNotificationItem(item)) return null;

                    return (
                        <Box sx={(theme) => ({ marginBottom: theme.spacing(3) })} key={index}>
                            <Box
                                sx={(theme) => ({
                                    display: "flex",
                                    alignItems: "center",
                                    marginBottom: theme.spacing(1),
                                })}
                            >
                                {isMaterial(item) && <MaterialItem {...item} />}
                                {isImportedMasterFile(item) && (
                                    <MasterImportItem fileName={item.file.name} />
                                )}
                            </Box>

                            <LinearProgress data-testid="NotificationTaskbarModal__progress" />
                        </Box>
                    );
                })}
            </div>
        </BaseDialog>
    );
};

export default NotificationTaskbarModal;
