import { ERPModules } from "src/common/constants/enum";

import DialogWithHeaderFooter from "src/components/Dialogs/DialogWithHeaderFooter";
import { DialogWithHeaderFooterProps } from "src/components/Dialogs/types";
import TypographyTextSecondary from "src/components/Typographys/TypographyTextSecondary";

import useResourceTranslate from "src/squads/lesson/hooks/useResourceTranslate";
import useTranslate from "src/squads/lesson/hooks/useTranslate";

export interface DialogDeleteLessonProps
    extends Pick<DialogWithHeaderFooterProps, "open" | "onSave" | "onClose"> {
    isDeleting: boolean;
}

const DialogDeleteLesson = ({ isDeleting, ...rest }: DialogDeleteLessonProps) => {
    const t = useTranslate();
    const tLessonManagement = useResourceTranslate(ERPModules.LESSON_MANAGEMENT);

    return (
        <DialogWithHeaderFooter
            {...rest}
            textSave={t("ra.action.delete")}
            title={tLessonManagement("deleteLesson")}
            footerConfirmButtonProps={{ color: "error", disabled: isDeleting }}
            data-testid="DialogDeleteLesson__dialog"
        >
            <TypographyTextSecondary variant="body1">
                {tLessonManagement("areYouSureDeleteTheLesson")}
                <br />
                {tLessonManagement("ifYouDeleteThisLessonV2")}
            </TypographyTextSecondary>
        </DialogWithHeaderFooter>
    );
};

export default DialogDeleteLesson;
