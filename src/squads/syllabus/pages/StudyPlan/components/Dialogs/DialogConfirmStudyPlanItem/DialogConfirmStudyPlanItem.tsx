import { Entities } from "src/common/constants/enum";

import DialogWithHeaderFooter from "src/components/Dialogs/DialogWithHeaderFooter";
import TypographyTextSecondary from "src/components/Typographys/TypographyTextSecondary";

import DialogFooterConfirmStudyPlanItem from "../DialogFooterConfirmStudyPlanItem";
import { DialogConfirmStudyPlanItemProps } from "../types";

import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";
import useTranslate from "src/squads/syllabus/hooks/useTranslate";

const DialogConfirmStudyPlanItem = (props: DialogConfirmStudyPlanItemProps) => {
    const {
        children,
        footerConfirmButtonProps,
        textProceed,
        textSave,
        onClose,
        onProceed,
        onSave,
        ...rest
    } = props;
    const t = useTranslate();
    const tCourse = useResourceTranslate(Entities.COURSES);

    return (
        <DialogWithHeaderFooter
            title={t("ra.common.save_change")}
            footer={
                <DialogFooterConfirmStudyPlanItem
                    footerConfirmButtonProps={footerConfirmButtonProps}
                    textClose={t("ra.common.action.cancel")}
                    textProceed={textProceed}
                    textSave={textSave}
                    onClose={onClose}
                    onProceed={onProceed}
                    onSave={onSave}
                />
            }
            onClose={onClose}
            {...rest}
        >
            <TypographyTextSecondary variant="body1">
                {children} {tCourse("studyPlan.dialog.changesWillBeLostMessage")}
            </TypographyTextSecondary>
        </DialogWithHeaderFooter>
    );
};

export default DialogConfirmStudyPlanItem;
