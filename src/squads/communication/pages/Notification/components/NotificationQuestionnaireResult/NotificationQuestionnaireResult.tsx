import Box from "@mui/material/Box";
import FormFilterAdvanced from "src/components/Forms/FormFilterAdvanced";
import PaperSectionWrapper from "src/components/Papers/PaperSectionWrapper";
import QuestionnaireResultTable from "src/squads/communication/pages/Notification/components/Tables/QuestionnaireResultTable";

import { GetAnswersByFilterResponse } from "manabuf/bob/v1/notifications_pb";

import { UseQuestionnaireUserAnswersListReturn } from "src/squads/communication/pages/Notification/hooks/useQuestionnaireUserAnswersList/useQuestionnaireUserAnswersList";

export interface NotificationQuestionnaireResultProps
    extends Pick<
        UseQuestionnaireUserAnswersListReturn,
        "onSearch" | "pagination" | "isLoadingAnswer" | "keyword"
    > {
    answersFilter: GetAnswersByFilterResponse.AsObject;
}

const NotificationQuestionnaireResult = ({
    onSearch,
    ...props
}: NotificationQuestionnaireResultProps) => (
    <PaperSectionWrapper>
        <Box mb={3}>
            <FormFilterAdvanced onEnterSearchBar={onSearch} />
        </Box>
        <QuestionnaireResultTable {...props} />
    </PaperSectionWrapper>
);

export default NotificationQuestionnaireResult;
