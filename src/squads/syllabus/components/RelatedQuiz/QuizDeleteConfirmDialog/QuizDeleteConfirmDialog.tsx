import { Entities } from "src/common/constants/enum";

import DialogWithHeaderFooter from "src/components/Dialogs/DialogWithHeaderFooter";
import TypographyTextSecondary from "src/components/Typographys/TypographyTextSecondary";

import useTranslate from "src/squads/syllabus/hooks/useTranslate";

export interface QuizDeleteConfirmDialogProps {
    open: boolean;
    onClose: () => void;
    onSave: () => void;
    disable?: boolean;
}

const QuizDeleteConfirmDialog = ({ disable, ...props }: QuizDeleteConfirmDialogProps) => {
    const t = useTranslate();

    return (
        <DialogWithHeaderFooter
            title={t("ra.common.deleteDialogTitle", {
                smart_count: t(`resources.${Entities.QUIZZES}.question`),
            })}
            textSave={t("ra.common.action.delete")}
            footerConfirmButtonProps={{
                color: "error",
                variant: "contained",
                disabled: disable,
            }}
            {...props}
        >
            <TypographyTextSecondary variant="body2">
                {t(`resources.${Entities.QUIZZES}.dialogDeleteConfirm`)}
            </TypographyTextSecondary>
        </DialogWithHeaderFooter>
    );
};

export default QuizDeleteConfirmDialog;
