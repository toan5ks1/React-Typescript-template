import { ERPModules } from "src/common/constants/enum";

import BackdropLoading from "src/components/Backdrops/BackdropLoading";
import DialogFullScreenHF from "src/components/Dialogs/DialogFullScreenHF";
import NotificationQuestionnaireResult from "src/squads/communication/pages/Notification/components/NotificationQuestionnaireResult";

import useResourceTranslate from "src/squads/communication/hooks/useResourceTranslate";
import useQuestionnaireUserAnswersList, {
    UseQuestionnaireUserAnswersListProps,
} from "src/squads/communication/pages/Notification/hooks/useQuestionnaireUserAnswersList/useQuestionnaireUserAnswersList";

export interface NotificationQuestionnaireResultDialogProps {
    onClose: () => void;
    questionnaireId: UseQuestionnaireUserAnswersListProps["questionnaireId"];
}

const NotificationQuestionnaireResultDialog = ({
    onClose,
    questionnaireId,
}: NotificationQuestionnaireResultDialogProps) => {
    const tNotification = useResourceTranslate(ERPModules.NOTIFICATIONS);

    const { isLoadingAnswer, onSearch, answers, pagination, keyword } =
        useQuestionnaireUserAnswersList({
            questionnaireId,
        });

    if (isLoadingAnswer && !answers)
        return (
            <BackdropLoading data-testid="NotificationQuestionnaireResultDialog__loading" open />
        );

    return (
        <DialogFullScreenHF
            data-testid="NotificationQuestionnaireResultDialog__dialog"
            onClose={onClose}
            title={tNotification("title.questionnaireResult")}
            open
        >
            <NotificationQuestionnaireResult
                onSearch={onSearch}
                answersFilter={answers!}
                pagination={pagination}
                isLoadingAnswer={isLoadingAnswer}
                keyword={keyword}
            />
        </DialogFullScreenHF>
    );
};

export default NotificationQuestionnaireResultDialog;
