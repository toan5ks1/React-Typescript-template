import { ERPModules, Features } from "src/common/constants/enum";
import { calculateQuestionnaireResultPercentage } from "src/squads/communication/common/utils/questionnaire-utils";

import TypographyBase from "src/components/Typographys/TypographyBase";
import TypographyWordBreak from "src/squads/communication/pages/Notification/components/TypographyWordBreak";

import useFeatureToggle from "src/squads/communication/hooks/useFeatureToggle";
import useResourceTranslate from "src/squads/communication/hooks/useResourceTranslate";

export interface QuestionSummaryProps {
    questionIndex: number;
    questionTitle: string;
    numberOfResponder: number;
    numberOfRecipient: number;
}

const QuestionSummary = ({
    numberOfRecipient,
    numberOfResponder,
    questionTitle,
    questionIndex,
}: QuestionSummaryProps) => {
    const tNotification = useResourceTranslate(ERPModules.NOTIFICATIONS);

    // TODO: remove after questionnaire with consolidated result is released
    const { isEnabled: isShowNotificationConsolidatedQuestionnaire } = useFeatureToggle(
        Features.NOTIFICATION_CONSOLIDATED_STATISTIC
    );

    const renderTextContentRespondents = () => {
        const questionnaireResultPercentage = calculateQuestionnaireResultPercentage(
            numberOfResponder,
            numberOfRecipient
        );
        const responderPercentage = questionnaireResultPercentage
            ? `(${questionnaireResultPercentage})`
            : "";

        return `${tNotification(
            "label.numberOfRespondents"
        )} ${numberOfResponder}/${numberOfRecipient} ${responderPercentage}`;
    };

    return (
        <>
            <TypographyWordBreak
                variant="subtitle2"
                color="textPrimary"
                data-testid="QuestionSummary__title"
            >
                {`${tNotification("label.question")} ${questionIndex + 1}: ${questionTitle}`}
            </TypographyWordBreak>
            {isShowNotificationConsolidatedQuestionnaire ? (
                <TypographyBase variant="caption" data-testid="QuestionSummary__respondents">
                    {renderTextContentRespondents()}
                </TypographyBase>
            ) : null}
        </>
    );
};

export default QuestionSummary;
