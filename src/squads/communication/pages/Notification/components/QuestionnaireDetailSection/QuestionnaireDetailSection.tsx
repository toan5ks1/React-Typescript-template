import { formatDate } from "src/common/utils/time";
import {
    NonNullableObject,
    QuestionnaireQuestionType,
} from "src/squads/communication/common/constants/types";
import {
    getNumberResponderOfQuestion,
    isShortAnswerTypeQuestion,
} from "src/squads/communication/common/utils/questionnaire-utils";
import { addAlphabetToArrayString } from "src/squads/communication/common/utils/utils";
import { Communication_GetUserAnswersByQuestionIdsQuery } from "src/squads/communication/service/bob/bob-types";

import { Box, Grid, Stack } from "@mui/material";
import TypographyBase from "src/components/Typographys/TypographyBase";
import QuestionItem from "src/squads/communication/pages/Notification/components/QuestionItem";
import QuestionSummary from "src/squads/communication/pages/Notification/components/QuestionSummary";
import QuestionnaireDetailAnswerItem from "src/squads/communication/pages/Notification/components/QuestionnaireDetailAnswerItem";
import GeneralInfoRow from "src/squads/communication/pages/Notification/components/Tables/GeneralInfoRow";
import ToggleViewButton from "src/squads/communication/pages/Notification/components/ToggleViewButton";

import groupBy from "lodash/groupBy";
import useCheckExpandingQuestionnaireDetail from "src/squads/communication/pages/Notification/hooks/useCheckExpandingQuestionnaireDetail";
import { UseQuestionnaireQuestionDetailReturn } from "src/squads/communication/pages/Notification/hooks/useQuestionnaireQuestionDetail";

export interface QuestionnaireDetailSectionProps
    extends NonNullableObject<
        Omit<
            UseQuestionnaireQuestionDetailReturn,
            "isFetchingQuestionnaire" | "questionnaireUserAnswers"
        >
    > {
    numberOfRecipient: number;
    questionnaireUserAnswers: UseQuestionnaireQuestionDetailReturn["questionnaireUserAnswers"];
}

const createAnswerListFromQuestionChoice = (
    questionType: QuestionnaireQuestionType,
    questionChoices: string[],
    userAnswers:
        | Communication_GetUserAnswersByQuestionIdsQuery["questionnaire_user_answers"]
        | undefined
) => {
    if (isShortAnswerTypeQuestion(questionType)) {
        return [];
    }

    if (typeof userAnswers === "undefined") {
        return addAlphabetToArrayString(questionChoices);
    }

    const groupedUserAnswer = groupBy(userAnswers, "answer");

    const answerItemList = questionChoices.map((questionChoice, index) => {
        const numberOfVotes = groupedUserAnswer[questionChoice]?.length ?? 0;
        const totalVotes = typeof userAnswers !== "undefined" ? userAnswers.length : 0;

        return (
            <QuestionnaireDetailAnswerItem
                key={questionChoice}
                answerIndex={index}
                answer={questionChoice}
                numberOfVotes={numberOfVotes}
                totalVotes={totalVotes}
            />
        );
    });

    return answerItemList;
};

const QuestionnaireDetailSection = ({
    questionnaire,
    questionnaireQuestions,
    questionnaireUserAnswers,
    numberOfRecipient,
}: QuestionnaireDetailSectionProps) => {
    const { listStatusQuestions, expandEachQuestion, toggleViewMoreLess, isExpandingAll } =
        useCheckExpandingQuestionnaireDetail({
            questionnaireQuestions,
        });

    return (
        <Grid container spacing={2} data-testid="QuestionnaireDetailSection__container">
            <GeneralInfoRow label="label.expirationDate">
                <Box pl={1}>
                    <TypographyBase variant="body2">
                        {formatDate(questionnaire.expiration_date, "yyyy/LL/dd")}
                    </TypographyBase>
                </Box>
            </GeneralInfoRow>
            <GeneralInfoRow label="label.listQuestion">
                {questionnaireQuestions.map((question, index) => {
                    const choicesList = createAnswerListFromQuestionChoice(
                        question.type,
                        question.choices,
                        questionnaireUserAnswers?.[question.questionnaire_question_id]
                    );

                    const numberOfResponder = getNumberResponderOfQuestion(
                        questionnaireUserAnswers?.[question.questionnaire_question_id]
                    );
                    return (
                        //discussed & confirmed with designer
                        <Stack key={index} pl={1} mb={1.5}>
                            <QuestionItem
                                choicesList={choicesList}
                                isExpand={listStatusQuestions[index].expanding}
                                toggleListAnswers={() => expandEachQuestion(index)}
                                summaryContent={
                                    <QuestionSummary
                                        questionIndex={index}
                                        questionTitle={question.title}
                                        numberOfRecipient={numberOfRecipient}
                                        numberOfResponder={numberOfResponder}
                                    />
                                }
                            />
                        </Stack>
                    );
                })}
                <Box pl={1} mt={2}>
                    <ToggleViewButton
                        isExpandingAll={isExpandingAll}
                        toggleViewMoreLess={toggleViewMoreLess}
                    />
                </Box>
            </GeneralInfoRow>
        </Grid>
    );
};

export default QuestionnaireDetailSection;
