import { FC } from "react";

import { Entities } from "src/common/constants/enum";

import DialogWithHeaderFooter from "src/components/Dialogs/DialogWithHeaderFooter";
import { DialogWithHeaderFooterProps } from "src/components/Dialogs/types";

import useTranslate from "src/squads/syllabus/hooks/useTranslate";

export interface ConfirmDialog extends DialogWithHeaderFooterProps {}

const ConfirmDialog: FC<ConfirmDialog> = ({ ...rest }) => {
    const t = useTranslate();
    return (
        <DialogWithHeaderFooter
            {...rest}
            data-testid="QuizTypeSelect__confirmDialog"
            title={t(`resources.${Entities.QUIZZES}.changeQuestionType`)}
            textSave={t("ra.common.action.confirm")}
            footerConfirmButtonProps={{
                color: "error",
            }}
        >
            {t(`resources.${Entities.QUIZZES}.alertChangeQuestionType`)}
        </DialogWithHeaderFooter>
    );
};

export default ConfirmDialog;
