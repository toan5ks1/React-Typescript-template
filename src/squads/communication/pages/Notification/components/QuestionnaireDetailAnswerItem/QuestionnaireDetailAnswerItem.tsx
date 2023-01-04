import { ERPModules } from "src/common/constants/enum";
import {
    calculateQuestionnaireResultPercentage,
    getAnswerItemContent,
} from "src/squads/communication/common/utils/questionnaire-utils";

import { Box } from "@mui/material";
import DotCharacter from "src/squads/communication/pages/Notification/components/DotCharacter";

import useResourceTranslate from "src/squads/communication/hooks/useResourceTranslate";

export interface QuestionnaireDetailAnswerItemProps {
    answerIndex: number;
    answer: string;
    numberOfVotes: number;
    totalVotes: number;
}

const QuestionnaireDetailAnswerItem = ({
    answerIndex,
    answer,
    numberOfVotes,
    totalVotes,
}: QuestionnaireDetailAnswerItemProps) => {
    const tNotification = useResourceTranslate(ERPModules.NOTIFICATIONS);

    const numberOfVotesLabel = tNotification("label.votes", {
        smart_count: numberOfVotes === 1 ? 1 : 2, // singular and not-singular
        numberOfVotes,
    });

    const renderPercentageVoteAnswer = () => {
        const percentage = calculateQuestionnaireResultPercentage(numberOfVotes, totalVotes);

        if (percentage !== "") {
            return (
                <>
                    <DotCharacter />
                    <Box>{percentage}</Box>
                </>
            );
        }
        return null;
    };

    return (
        <Box display="flex" alignItems="center" data-testid="QuestionnaireDetailAnswerItem__root">
            <Box>{getAnswerItemContent(answerIndex, answer, numberOfVotesLabel)}</Box>
            {renderPercentageVoteAnswer()}
        </Box>
    );
};

export default QuestionnaireDetailAnswerItem;
