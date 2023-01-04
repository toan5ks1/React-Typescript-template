import { Entities } from "src/common/constants/enum";

import DialogCancelConfirm from "src/components/Dialogs/DialogCancelConfirm";

import useResourceTranslate from "src/squads/user/hooks/useResourceTranslate";
import useTranslate from "src/squads/user/hooks/useTranslate";

export interface DialogTimesheetConfigProp {
    open: boolean;
    isEnable: boolean;
    onClose: () => void;
    onSave: (...args: any[]) => void;
}

const DialogTimesheetConfig = (props: DialogTimesheetConfigProp) => {
    const { isEnable, ...rest } = props;
    const tCommon = useTranslate();
    const t = useResourceTranslate(Entities.STAFF);

    return (
        <DialogCancelConfirm
            data-testid="DialogTimesheetConfig"
            textSave={tCommon("ra.action.confirm")}
            title={`${t(
                `titles.${isEnable ? "enableTimesheetConfig" : "disableTimesheetConfig"}`
            )}`}
            textCancelDialog={`${t(
                `descriptions.${isEnable ? "confirmEnable" : "confirmDisable"}`
            )}`}
            {...rest}
        />
    );
};

export default DialogTimesheetConfig;
