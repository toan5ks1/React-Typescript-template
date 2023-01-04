import { ReactNode } from "react";

import QuestionAccordion from "src/squads/communication/pages/Notification/components/QuestionAccordion";
import QuestionnaireDetailAnswers from "src/squads/communication/pages/Notification/components/QuestionnaireDetailAnswers";

import { arrayHasItem } from "@manabie-com/mana-utils";
import { UseCheckExpandingQuestionnaireDetailReturn } from "src/squads/communication/pages/Notification/hooks/useCheckExpandingQuestionnaireDetail";

export interface QuestionItemProps {
    choicesList: ReactNode[];
    isExpand: boolean;
    toggleListAnswers: UseCheckExpandingQuestionnaireDetailReturn["toggleViewMoreLess"];
    summaryContent: ReactNode;
}

const QuestionItem = ({
    choicesList,
    isExpand,
    toggleListAnswers,
    summaryContent,
}: QuestionItemProps) => {
    return (
        <>
            {arrayHasItem(choicesList) ? (
                <QuestionAccordion
                    summaryContent={summaryContent}
                    onChange={toggleListAnswers}
                    expanded={isExpand}
                >
                    <QuestionnaireDetailAnswers choicesList={choicesList} />
                </QuestionAccordion>
            ) : (
                summaryContent
            )}
        </>
    );
};

export default QuestionItem;
