import { ArrayElement } from "src/common/constants/types";
import { Features } from "src/squads/communication/common/constants/feature-keys";
import {
    Communication_GetQuestionnaireByQuestionnaireIdQuery,
    Communication_GetQuestionnaireByQuestionnaireIdQueryVariables,
    Communication_GetUserAnswersByQuestionIdsQuery,
} from "src/squads/communication/service/bob/bob-types";
import { inferQuery } from "src/squads/communication/service/infer-query";

import { arrayHasItem } from "@manabie-com/mana-utils";
import groupBy from "lodash/groupBy";
import useFeatureToggle from "src/squads/communication/hooks/useFeatureToggle";
import useShowSnackbar from "src/squads/communication/hooks/useShowSnackbar";
import useTranslate from "src/squads/communication/hooks/useTranslate";
import { CustomCommunication_GetQuestionnaireQuestionsByQuestionnaireIdQuery } from "src/squads/communication/service/bob/questionnaire-questions-service/questionnaire-questions-bob.query";

export interface UseQuestionnaireQuestionDetailProps {
    questionnaireId: Communication_GetQuestionnaireByQuestionnaireIdQueryVariables["questionnaire_id"];
}

export interface UseQuestionnaireQuestionDetailReturn {
    questionnaire:
        | ArrayElement<Communication_GetQuestionnaireByQuestionnaireIdQuery["questionnaires"]>
        | undefined;
    questionnaireQuestions:
        | CustomCommunication_GetQuestionnaireQuestionsByQuestionnaireIdQuery["questionnaire_questions"]
        | undefined;
    questionnaireUserAnswers:
        | Record<
              string,
              Communication_GetUserAnswersByQuestionIdsQuery["questionnaire_user_answers"]
          >
        | undefined;
    isFetchingQuestionnaire: boolean;
}

const useQuestionnaireQuestionDetail = ({
    questionnaireId,
}: UseQuestionnaireQuestionDetailProps): UseQuestionnaireQuestionDetailReturn => {
    // TODO: remove after questionnaire is released
    const { isEnabled: isShowNotificationQuestionnaire } = useFeatureToggle(
        Features.NOTIFICATION_QUESTIONNAIRE
    );

    // TODO: remove after questionnaire with consolidated result is released
    const { isEnabled: isShowNotificationConsolidatedQuestionnaire } = useFeatureToggle(
        Features.NOTIFICATION_CONSOLIDATED_STATISTIC
    );

    const showSnackbar = useShowSnackbar();
    const t = useTranslate();

    const { data: questionnaire, isFetching: isFetchingQuestionnaires } = inferQuery({
        entity: "questionnaires",
        action: "communicationGetQuestionnaireByQuestionnaireId",
    })(
        {
            questionnaire_id: questionnaireId,
        },
        {
            enabled: isShowNotificationQuestionnaire && Boolean(questionnaireId),
            onError: (error) => {
                showSnackbar(t("ra.manabie-error.unknown"), "error");
                window.warner?.warn("useNotificationDetail notification questionnaires", error);
            },
        }
    );

    const { data: questionnaireQuestions, isFetching: isFetchingQuestionnaireQuestions } =
        inferQuery({
            entity: "questionnaireQuestions",
            action: "communicationGetQuestionnaireQuestionsByQuestionnaireId",
        })(
            { questionnaire_id: questionnaireId },
            {
                enabled: isShowNotificationQuestionnaire && Boolean(questionnaireId),
                onError: (error) => {
                    showSnackbar(t("ra.manabie-error.unknown"), "error");
                    window.warner?.warn(
                        "useNotificationDetail notification questionnaire questions",
                        error
                    );
                },
            }
        );

    const questionIds = questionnaireQuestions?.map(
        (questionnaireQuestion) => questionnaireQuestion.questionnaire_question_id
    );

    const { data: questionnaireUserAnswers, isFetching: isFetchingQuestionnaireUserAnswers } =
        inferQuery({
            entity: "questionnaireUserAnswers",
            action: "communicationGetAnswersByQuestionIds",
        })(
            {
                questionIds,
            },
            {
                enabled: isShowNotificationConsolidatedQuestionnaire && arrayHasItem(questionIds),
                selector: (data) => {
                    return groupBy(data, "questionnaire_question_id");
                },
                onError: (error) => {
                    showSnackbar(t("ra.manabie-error.unknown"), "error");
                    window.warner?.warn(
                        "useNotificationDetail notification questionnaire user answers",
                        error
                    );
                },
            }
        );

    return {
        questionnaire,
        questionnaireQuestions,
        questionnaireUserAnswers,
        isFetchingQuestionnaire:
            isFetchingQuestionnaires ||
            isFetchingQuestionnaireQuestions ||
            isFetchingQuestionnaireUserAnswers,
    };
};

export default useQuestionnaireQuestionDetail;
